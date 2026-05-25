/**
 * Art Engine v4 – Premium procedural GLSL shaders. Gallery-level quality upgrade.
 * All 7 styles substantially enhanced: richer detail, dramatic lighting,
 * superior composition, modern aesthetics, better depth and micro-detail.
 */

import type { ArtParameters } from '../../types';

function hslToRgb01(h: number, s: number, l: number): [number, number, number] {
  h /= 360; s /= 100; l /= 100;
  let r: number, g: number, b: number;
  if (s === 0) { r = g = b = l; }
  else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [r!, g!, b!];
}

function buildFragmentShader(params: ArtParameters): string {
  const [r,  g,  b]  = hslToRgb01(params.hue, params.saturation, params.brightness * 0.45);
  const [r2, g2, b2] = hslToRgb01((params.hue + 135) % 360, params.saturation * 0.85, params.brightness * 0.38);
  const [r3, g3, b3] = hslToRgb01((params.hue + 225) % 360, params.saturation * 0.75, params.brightness * 0.28);
  const cx = params.complexity / 100;
  const ix = params.animationIntensity / 100;
  const h0 = (params.hue / 360).toFixed(4);
  const h1 = ((params.hue + 135) % 360 / 360).toFixed(4);
  const h2 = ((params.hue + 225) % 360 / 360).toFixed(4);

  // ─── SHARED UTILS ───
  const UTILS = /* glsl */`
    precision highp float;
    uniform float u_time;
    uniform vec2  u_resolution;
    uniform float u_complexity;
    uniform float u_intensity;

    #define PI    3.14159265359
    #define TAU   6.28318530718
    #define PHI   1.61803398875
    #define EPS   0.0001

    // ── Noise primitives ──────────────────────────────────────────────────────
    float rand(vec2 n) {
      return fract(sin(dot(n, vec2(12.9898, 78.233))) * 43758.5453);
    }
    vec2 rand2(vec2 p) {
      return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
    }
    // Quintic-interpolated smooth noise
    float noise(vec2 p) {
      vec2 i=floor(p), f=fract(p);
      f=f*f*f*(f*(f*6.0-15.0)+10.0); // quintic
      return mix(mix(rand(i),         rand(i+vec2(1,0)), f.x),
                 mix(rand(i+vec2(0,1)),rand(i+vec2(1,1)),f.x), f.y);
    }
    // Curl-rotated FBM
    float fbm(vec2 p, float oct) {
      float v=0., a=.5;
      mat2 m = mat2(0.8, 0.6, -0.6, 0.8);
      for(int i=0;i<12;i++){
        if(float(i)>=oct)break;
        v+=a*noise(p); p=m*p*2.17+vec2(PHI*2.0, 9.27); a*=.46;
      }
      return v;
    }
    // Full domain warp: two levels of indirection
    float domainWarp(vec2 p, float oct, out vec2 q, out vec2 r) {
      q = vec2(fbm(p + vec2(0.0, 0.0), oct),
               fbm(p + vec2(5.2, 1.3), oct));
      r = vec2(fbm(p + 4.2*q + vec2(1.7, 9.2), oct),
               fbm(p + 4.2*q + vec2(8.3, 2.8), oct));
      return fbm(p + 4.2*r, oct);
    }
    // Gradient noise (returns analytical derivative alongside value)
    vec3 noiseGrad(vec2 p) {
      vec2 i=floor(p), f=fract(p);
      vec2 u=f*f*f*(f*(f*6.0-15.0)+10.0);
      vec2 du=30.0*f*f*(f*(f-2.0)+1.0);
      float a=rand(i), b=rand(i+vec2(1,0)), c=rand(i+vec2(0,1)), d=rand(i+vec2(1,1));
      float k0=a, k1=b-a, k2=c-a, k3=a-b-c+d;
      return vec3(k0+k1*u.x+k2*u.y+k3*u.x*u.y,
                  du*(vec2(k1,k2)+k3*u.yx));
    }

    // ── Geometry ──────────────────────────────────────────────────────────────
    mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
    float sdBox(vec2 p,vec2 b){vec2 d=abs(p)-b;return length(max(d,0.))+min(max(d.x,d.y),0.);}
    float sdRing(vec2 p, float r, float w){return abs(length(p)-r)-w;}
    float sdHex(vec2 p, float r){
      const vec3 k=vec3(-0.866025,0.5,0.577350);
      p=abs(p); p-=2.0*min(dot(k.xy,p),0.0)*k.xy;
      p-=vec2(clamp(p.x,-k.z*r,k.z*r),r);
      return length(p)*sign(p.y);
    }

    // ── Color ─────────────────────────────────────────────────────────────────
    vec3 hsl2rgb(float h,float s,float l){
      vec3 rgb=clamp(abs(mod(h*6.+vec3(0,4,2),6.)-3.)-1.,0.,1.);
      return l+s*(rgb-.5)*(1.-abs(2.*l-1.));
    }
    // ACES filmic tonemapping
    vec3 aces(vec3 x){
      return clamp((x*(2.51*x+0.03))/(x*(2.43*x+0.59)+0.14),0.0,1.0);
    }
    // Oklab perceptual blend (approximate)
    vec3 oklabMix(vec3 a, vec3 b, float t){
      a=pow(max(a,0.0),vec3(2.2)); b=pow(max(b,0.0),vec3(2.2));
      return pow(mix(a,b,t),vec3(1.0/2.2));
    }

    // ── Voronoi ───────────────────────────────────────────────────────────────
    vec2 voronoiFull(vec2 p) {
      vec2 i=floor(p), f=fract(p); float d1=8.,d2=8.;
      for(int y=-2;y<=2;y++) for(int x=-2;x<=2;x++){
        vec2 g=vec2(x,y), o=rand2(i+g);
        o=0.5+0.5*sin(u_time*0.15*u_intensity+TAU*o);
        vec2 r=g+o-f; float d=dot(r,r);
        if(d<d1){d2=d1;d1=d;}else if(d<d2){d2=d;}
      }
      return vec2(sqrt(d1),sqrt(d2));
    }
    float voronoi(vec2 p){return voronoiFull(p).x;}
    float voronoiEdge(vec2 p){vec2 v=voronoiFull(p);return v.y-v.x;}

    // ── Utility ───────────────────────────────────────────────────────────────
    float glow(float d, float str){return str/(max(d,EPS)*str+0.0012);}
    float softglow(float d, float r){return exp(-max(d-r,0.0)*28.0);}
    float dither(vec2 uv){
      vec2 fc = mod(floor(gl_FragCoord.xy), 4.0);
      float x = fc.x, y = fc.y;
      float v =
        (y<1.0 ? (x<1.0 ? 0.0  : x<2.0 ? 8.0  : x<3.0 ? 2.0  : 10.0) :
         y<2.0 ? (x<1.0 ? 12.0 : x<2.0 ? 4.0  : x<3.0 ? 14.0 : 6.0 ) :
         y<3.0 ? (x<1.0 ? 3.0  : x<2.0 ? 11.0 : x<3.0 ? 1.0  : 9.0 ) :
                 (x<1.0 ? 15.0 : x<2.0 ? 7.0  : x<3.0 ? 13.0 : 5.0 ));
      return (v/16.0 - 0.5)*0.018;
    }
    float luma(vec3 c){return dot(c,vec3(0.2126,0.7152,0.0722));}
  `;

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── CYBERPUNK v4 ──────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  const CYBERPUNK = /* glsl */`
    void main(){
      vec2 uv=gl_FragCoord.xy/u_resolution;
      float ar=u_resolution.x/u_resolution.y;
      float t=u_time*${(ix * 0.35).toFixed(3)};
      float cx=${cx.toFixed(3)};

      vec3 c1=vec3(${r.toFixed(4)},${g.toFixed(4)},${b.toFixed(4)});
      vec3 c2=vec3(${r2.toFixed(4)},${g2.toFixed(4)},${b2.toFixed(4)});
      vec3 c3=vec3(${r3.toFixed(4)},${g3.toFixed(4)},${b3.toFixed(4)});
      vec3 cAcc = vec3(c3.z, c3.x, c3.y)*1.4;

      // ── Sky gradient with haze bands ──────────────────────────────────────
      float skyFog = fbm(vec2(uv.x*3.0, uv.y*1.5)+t*0.04, 3.0)*0.5;
      vec3 col = mix(vec3(0.003,0.001,0.008), c1*0.18+c2*0.08, pow(uv.y,0.6)+skyFog*0.12);
      col = mix(col, c2*0.25, smoothstep(0.75,1.0,uv.y));
      float horizBand = exp(-abs(uv.y-0.42)*18.0);
      col += (c1*0.3+c2*0.15)*horizBand*0.6;

      // ── Perspective grid floor ────────────────────────────────────────────
      float horizon = 0.41 + sin(t*0.06)*0.006;
      if(uv.y < horizon){
        float py = max(horizon - uv.y, EPS);
        float persp = 0.06/(py + 0.01);
        vec2 gp;
        gp.x = (uv.x - 0.5)*persp;
        gp.y = persp*0.55 - t*0.52;

        float gcx = 6.0 + cx*5.0;
        float gcy = 5.0 + cx*4.0;
        float gx = smoothstep(0.06,0.0,abs(fract(gp.x*gcx)-0.5));
        float gy = smoothstep(0.05,0.0,abs(fract(gp.y*gcy)-0.5));
        float grid = max(gx, gy);

        float wet = fbm(vec2(uv.x*10.0, py*60.0)+t*0.2, 3.0)*0.65+0.35;
        float depthFade = smoothstep(horizon, horizon-0.38, uv.y);
        vec3 gridCol = mix(c1*1.1, c3*1.2, sin(gp.y*0.4)*0.5+0.5);
        col += gridCol * grid * wet * (0.55+cx*0.35) * depthFade;

        float sgx=smoothstep(0.04,0.0,abs(fract(gp.x*gcx*4.0)-0.5))*0.3;
        float sgy=smoothstep(0.04,0.0,abs(fract(gp.y*gcy*4.0)-0.5))*0.3;
        col += c2 * max(sgx,sgy) * depthFade * 0.25;
      }

      // ── Cyberpunk Car (Back View) ────────────────────────────────────────
      float carY = horizon * 0.92;
      vec2 carCenter = vec2(0.5 + sin(t*0.3)*0.012, carY);

      // Car body (wide aggressive sports car)
      float bodyW = 0.28 + cx*0.03;
      float bodyH = 0.16;
      float body = sdBox(uv - carCenter, vec2(bodyW, bodyH));
      body = 1.0 - smoothstep(0.0, 0.008, body);

      // Cabin / rear window
      float cabin = sdBox(uv - (carCenter + vec2(0.0, 0.055)), vec2(bodyW*0.68, 0.065));
      cabin = 1.0 - smoothstep(0.0, 0.006, cabin);

      // Rear spoiler
      float spoiler = sdBox(uv - (carCenter + vec2(0.0, bodyH + 0.028)), vec2(bodyW*0.95, 0.008));
      spoiler = 1.0 - smoothstep(0.0, 0.005, spoiler);

      vec3 carCol = mix(vec3(0.008,0.008,0.012), c1*0.7, 0.6);
      col = mix(col, carCol, body);
      col = mix(col, c1*0.25, cabin);
      col = mix(col, c3*1.8, spoiler);

      // Taillights
      float leftLight  = sdBox(uv - (carCenter + vec2(-bodyW*0.78, 0.015)), vec2(0.028, 0.045));
      float rightLight = sdBox(uv - (carCenter + vec2( bodyW*0.78, 0.015)), vec2(0.028, 0.045));
      float lights = (1.0 - smoothstep(0.0, 0.008, min(leftLight, rightLight)));

      float lightFlick = 0.9 + 0.1*sin(t*25.0);
      col = mix(col, vec3(1.0, 0.15, 0.08)*2.8, lights * lightFlick);
      col += vec3(1.0, 0.4, 0.2) * exp(-max(leftLight, rightLight)*35.0) * 1.5; // glow

      // Exhausts
      vec2 exh1 = carCenter + vec2(-0.11, -0.06);
      vec2 exh2 = carCenter + vec2( 0.11, -0.06);
      float exh = min(length(uv-exh1), length(uv-exh2)) - 0.018;
      col += c3*2.2 * exp(-exh*60.0) * (0.6 + 0.4*sin(t*8.0));

      // Rim highlights
      float rim = sdBox(uv - carCenter, vec2(bodyW*0.75, bodyH*0.4));
      col += c2*1.6 * (1.0 - smoothstep(0.0, 0.02, abs(rim - 0.035)));

      // ── Neon signs (kept but moved higher) ─────────────────────────────────
      float signCount = 4.0 + cx*4.0;
      for(int i=0;i<8;i++){
        if(float(i)>=signCount) break;
        float fi=float(i);
        vec2 sc = vec2(0.12+fi*0.11+sin(t*0.05+fi)*0.01, 0.68+rand(vec2(fi,3.2))*0.22);
        float sw = 0.06+rand(vec2(fi,4.1))*0.08;
        float sh = 0.012+rand(vec2(fi,5.0))*0.01;
        vec3 sCol = mix(c1,cAcc,fi/7.0)*2.2;
        float flick = 0.82+0.18*sin(t*9.0*rand(vec2(fi+1.0)))*step(0.6,rand(vec2(floor(t*3.5),fi)));

        float bar = smoothstep(sh+0.001,sh-0.001,abs(uv.y-sc.y))
                  * smoothstep(sw,sw-0.004,abs(uv.x-sc.x));
        col += sCol * bar * flick;

        float d = length((uv-sc)*vec2(1.0,3.0));
        col += sCol*0.35 * exp(-d*22.0) * flick;
      }

      // ── Cinematic rain streaks ────────────────────────────────────────────
      float rainCount = 40.0 + cx*30.0;
      for(int i=0;i<70;i++){
        if(float(i)>=rainCount) break;
        float fi=float(i);
        float rSpeed = 0.75+rand(vec2(fi,1.1))*1.1;
        float rx = fract(fi*0.0713+t*0.04+rand(vec2(fi,0.5))*0.5);
        float ry = fract(-t*rSpeed + fi*PHI + uv.y*0.18);
        float rLen = 0.06+rand(vec2(fi,2.2))*0.13;
        float rW = 0.0018+rand(vec2(fi,3.3))*0.001;
        float streak = smoothstep(rW+0.0005,rW-0.0003,abs(uv.x - rx - ry*0.025));
        streak *= smoothstep(0.0,0.03,ry)*smoothstep(rLen,rLen*0.1,ry);
        float rAlpha = 0.15+rand(vec2(fi,4.0))*0.2;
        col += mix(c2,vec3(0.6,0.8,1.0),0.4)*streak*rAlpha;
      }

      // ── Post-process ──────────────────────────────────────────────────────
      float edge = length(uv-0.5);
      float ca = edge*edge*0.04*(1.0+cx*0.5);
      vec2 caDir = normalize(uv-0.5+EPS)*ca;
      col.r += fbm(uv+caDir, 2.0)*0.04;
      col.b -= fbm(uv-caDir, 2.0)*0.04;

      float scanline = 0.88+0.12*sin(uv.y*u_resolution.y*1.0);
      col *= scanline;

      col *= 1.0 - smoothstep(0.45,0.85,edge)*0.82;

      col += dither(uv);
      gl_FragColor = vec4(aces(col*1.15), 1.0);
    }
  `;

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── COSMIC v4 ─────────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  const COSMIC = /* glsl */`
    void main(){
      vec2 uv=(gl_FragCoord.xy-u_resolution*0.5)/min(u_resolution.x,u_resolution.y);
      float t=u_time*${(ix * 0.10).toFixed(3)};
      float cx=${cx.toFixed(3)};

      float radius=length(uv);
      float angle=atan(uv.y,uv.x);

      vec3 c1=vec3(${r.toFixed(4)},${g.toFixed(4)},${b.toFixed(4)});
      vec3 c2=vec3(${r2.toFixed(4)},${g2.toFixed(4)},${b2.toFixed(4)});
      vec3 c3=vec3(${r3.toFixed(4)},${g3.toFixed(4)},${b3.toFixed(4)});

      // ── Galactic core ─────────────────────────────────────────────────────
      float coreR = 5.5 - cx*2.0;
      float core  = exp(-radius*coreR);
      float core2 = exp(-radius*(coreR*3.0));
      vec3 coreCol = mix(vec3(1.0,0.92,0.75)*2.5, c1*3.0, 0.4);
      float lensRing = exp(-pow(radius-0.07,2.0)*800.0)*0.8;
      lensRing *= 0.5+0.5*sin(angle*12.0+t*2.0);

      vec3 col = coreCol*core2*4.0 + c1*core*2.5 + mix(c2,c3,0.5)*exp(-radius*1.4)*0.7;
      col += vec3(1.0,0.98,0.88)*lensRing;

      // ── Spiral arms ───────────────────────────────────────────────────────
      float arms = 2.0 + floor(cx*3.0);
      for(int arm=0;arm<5;arm++){
        if(float(arm)>=arms) break;
        float fa=float(arm);
        float nArms=float(arms);
        float winding = 3.8 + cx*4.5;
        float armAngle = angle + TAU*fa/nArms + log(max(radius,0.02))*winding - t*0.25;
        float spine = exp(-pow(mod(armAngle+PI,TAU)-PI,2.0)*(18.0-cx*5.0));
        float cloud = exp(-pow(mod(armAngle+PI,TAU)-PI,2.0)*(5.0-cx*1.5));
        float radFade = smoothstep(0.01,0.18,radius)*exp(-radius*1.2);

        vec3 armColSpine = mix(c1*1.8, vec3(1.0,0.96,0.85)*2.0, 0.3);
        vec3 armColCloud = mix(c2*0.9, c3*0.6, fa/nArms);
        col += armColSpine * spine * radFade * (1.0+cx*0.4);
        col += armColCloud * cloud * radFade * 0.6;
      }

      // ── Nebula layers ─────────────────────────────────────────────────────
      vec2 q1, r1, q2, r2;
      vec2 wuv1 = uv*rot(t*0.03);
      vec2 wuv2 = uv*rot(-t*0.02+0.8)*1.4;
      float neb1 = domainWarp(wuv1*(1.8+cx*1.5), 4.0+cx*2.0, q1, r1);
      float neb2 = domainWarp(wuv2*(2.2+cx),     3.0+cx*2.0, q2, r2);

      col += c1 * neb1 * 0.9 * smoothstep(1.1, 0.05, radius) * smoothstep(0.1,0.5,radius);
      col += c2 * neb2 * 0.55 * smoothstep(0.95, 0.05, radius);
      col += c3 * length(q1) * 0.45 * smoothstep(0.7,0.0,radius);
      col += c2 * length(r1) * 0.28;
      col += mix(c3,c1,0.5) * neb2 * length(q2) * 0.3;

      // ── Stars ─────────────────────────────────────────────────────────────
      vec2 uvn = gl_FragCoord.xy/u_resolution;
      for(int i=0;i<32;i++){
        if(float(i)>=18.0+cx*14.0) break;
        float fi=float(i);
        vec2 sp = rand2(vec2(fi,fi*PHI));
        vec2 sUV = (uv - (sp*2.0-1.0)*0.82);
        float sd = length(sUV);
        float sBrightness = 0.6+rand(vec2(fi,7.0))*1.2;
        float twinkle = 0.75+0.25*sin(t*(2.0+rand(vec2(fi,3.0))*4.0)+rand(vec2(fi,5.0))*TAU);
        col += vec3(sBrightness)*exp(-sd*600.0)*twinkle;
        col += vec3(sBrightness*0.3)*exp(-abs(sUV.x)*220.0)*exp(-sd*40.0)*twinkle;
        col += vec3(sBrightness*0.3)*exp(-abs(sUV.y)*220.0)*exp(-sd*40.0)*twinkle;
        vec3 starTint = hsl2rgb(rand(vec2(fi,6.0)),0.6,0.7);
        col += starTint * exp(-sd*180.0) * sBrightness * 0.4 * twinkle;
      }
      float sf = pow(max(0.0,rand(floor(uvn*520.0*(1.0+cx*0.5)))-0.3),5.0)*3.5;
      col += vec3(sf)*0.9;
      float sm = pow(max(0.0,rand(floor(uvn*230.0))-0.28),4.5)*2.2;
      float tw = 0.6+0.4*sin(t*2.5+rand(floor(uvn*230.0))*TAU);
      col += mix(vec3(1.0),c1,0.4)*sm*tw;

      // ── Dark dust lanes ───────────────────────────────────────────────────
      float dust1 = fbm(uv*(2.2+cx*2.0)+vec2(t*0.018, t*0.009), 6.0);
      float dust2 = fbm(uv*(3.0+cx)+vec2(-t*0.012, t*0.015)+0.5, 5.0);
      float dustMask = smoothstep(0.28,0.72,dust1)*smoothstep(0.08,0.65,radius);
      col *= mix(1.0, 0.08, dustMask*0.75);
      col += c1*0.35 * smoothstep(0.75,0.55,dust2) * smoothstep(0.05,0.4,radius) * (1.0-dustMask);

      col *= 1.0 - smoothstep(0.38,0.78,radius)*0.75;
      col += dither(uvn);
      gl_FragColor = vec4(aces(col*1.05), 1.0);
    }
  `;

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── SURREAL v4 ────────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  const SURREAL = /* glsl */`
    void main(){
      vec2 uv=gl_FragCoord.xy/u_resolution;
      float t=u_time*${(ix * 0.20).toFixed(3)};
      float cx=${cx.toFixed(3)};

      vec2 p=uv-0.5;
      p.x*=u_resolution.x/u_resolution.y;

      // ── IFS fractal space fold ────────────────────────────────────────────
      vec2 fp = p;
      float foldScale=1.0;
      float iterations = 5.0 + cx*5.0;
      float foldHash = 0.0;
      for(int i=0;i<10;i++){
        if(float(i)>=iterations) break;
        fp = abs(fp) - vec2(0.255+cx*0.05, 0.235+cx*0.04);
        fp *= rot(t*0.10 + float(i)*PHI + foldHash*0.3);
        fp *= 1.18;
        foldScale *= 1.18;
        foldHash += rand(fp)*0.12;
      }
      float foldDist = length(fp)/foldScale;
      float foldBands = sin(foldDist*38.0 - t*0.5)*0.5+0.5;

      // ── Domain warp fields ────────────────────────────────────────────────
      vec2 q, r_dw;
      float wf1 = domainWarp(uv*(2.5+cx*3.5)+vec2(0.0,-t*0.09), 6.0, q, r_dw);
      float wf2 = domainWarp(uv*(1.4+cx)+vec2(t*0.04, 0.0)+vec2(q)*0.8, 4.0, q, r_dw);

      // ── Dynamic color palette ─────────────────────────────────────────────
      vec3 c1 = hsl2rgb(${h0}+wf1*0.18+t*0.015,  0.92, 0.52);
      vec3 c2 = hsl2rgb(${h1}-length(q)*0.14+t*0.01, 0.84, 0.42);
      vec3 c3 = hsl2rgb(${h2}+r_dw.x*0.12-t*0.008, 0.78, 0.32);
      vec3 cMid= hsl2rgb(${h0}+0.5+wf2*0.1, 0.7, 0.55);

      // ── Base field composition ────────────────────────────────────────────
      vec3 col = mix(c3*0.6, c2*0.8, wf1);
      col = mix(col, c1, smoothstep(0.35, 0.0, foldDist)*0.85);
      col = mix(col, cMid*0.6, foldBands*smoothstep(0.2,0.05,foldDist)*0.35);

      // ── Procedural lit sphere ensemble ───────────────────────────────────
      float sphereCount = 3.0+cx*3.0;
      for(int si=0;si<6;si++){
        if(float(si)>=sphereCount) break;
        float fi=float(si);
        float freqX=1.1+fi*0.37; float freqY=0.9+fi*0.41;
        vec2 sc = vec2(sin(t*freqX+fi*1.9)*0.28, cos(t*freqY+fi*2.4)*0.21);
        float sR = 0.065+rand(vec2(fi,1.0))*0.06;
        vec2 sp = p - sc;
        float sDist = length(sp) - sR;

        if(sDist < 0.08){
          vec3 sNorm = normalize(vec3(sp, sqrt(max(0.0,sR*sR-dot(sp,sp)))));
          vec3 lightDir = normalize(vec3(0.6,0.8,1.0));
          float diff = max(0.0, dot(sNorm, lightDir));
          float spec = pow(max(0.0, dot(reflect(-lightDir,sNorm),vec3(0,0,1))),18.0);
          float sss = exp(-max(0.0,sDist+sR)*12.0) * 0.5;

          vec3 sCol = hsl2rgb(${h0}+fi*0.16+t*0.01, 0.9, 0.5);
          float mask = smoothstep(0.004, 0.0, sDist);
          col = mix(col, sCol*(0.3+diff*1.2) + vec3(1.0)*spec*0.6 + sCol*sss, mask);

          float rim = 1.0-max(0.0,dot(sNorm,vec3(0,0,1)));
          col += sCol * pow(rim,3.0) * mask * 0.8;
        }

        col += hsl2rgb(${h1}+fi*0.13,0.85,0.55) * exp(-length(p-sc)*22.0) * 0.15;
      }

      // ── Voronoi cell membranes ────────────────────────────────────────────
      float vorS = 5.0+cx*6.0;
      vec2 vWarp = uv*(vorS) + r_dw*1.5 + q*0.8;
      vec2 vFull = voronoiFull(vWarp);
      float vEdge = vFull.y - vFull.x;
      float vInner = vFull.x;
      col = mix(col, c2*1.4, smoothstep(0.08,0.0,vEdge)*0.5);
      col += c1 * smoothstep(0.04,0.0,vEdge) * 0.35;
      col *= mix(1.0, 0.72, smoothstep(0.0,0.55,vInner)*0.4);

      // ── Impasto texture overlay ───────────────────────────────────────────
      vec3 ng = noiseGrad(uv*24.0+t*0.1);
      float brushDir = ng.x;
      float brushTex = 0.88 + brushDir*0.12 + fbm(uv*32.0, 2.0)*0.08;
      col *= brushTex;

      col += (rand(uv+t)-0.5)*0.022;
      gl_FragColor = vec4(aces(col*1.1), 1.0);
    }
  `;

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── MINIMALIST v4 ─────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  const MINIMALIST = /* glsl */`
    void main(){
      vec2 uv=gl_FragCoord.xy/u_resolution;
      float ar=u_resolution.x/u_resolution.y;
      float t=u_time*${(ix * 0.09).toFixed(3)};
      float cx=${cx.toFixed(3)};

      vec2 p=uv-0.5;
      p.x*=ar;

      vec3 c1=vec3(${r.toFixed(4)},${g.toFixed(4)},${b.toFixed(4)});
      vec3 c2=vec3(${r2.toFixed(4)},${g2.toFixed(4)},${b2.toFixed(4)});
      vec3 c3=vec3(${r3.toFixed(4)},${g3.toFixed(4)},${b3.toFixed(4)});
      vec3 bg = mix(vec3(0.010,0.010,0.013), vec3(0.016,0.015,0.020), uv.y);

      // ── Breathing ambient light ───────────────────────────────────────────
      float breath = sin(t*0.52)*0.5+0.5;
      float grd = 1.0-length(p)*1.4;
      vec3 col = bg + c1*0.04*grd*breath + c2*0.02*(1.0-grd);

      float pw = fwidth(length(p));

      // ── Primary circle arc ────────────────────────────────────────────────
      float r1 = 0.285+sin(t*0.24)*0.012;
      float d1 = abs(length(p)-r1);
      float startA1 = -PI*0.98 + sin(t*0.08)*0.04;
      float endA1   =  PI*0.72 + cos(t*0.06)*0.03;
      float a1 = atan(p.y, p.x);
      float arcMask1 = smoothstep(startA1-0.04, startA1+0.04, a1)
                     * smoothstep(endA1+0.04,   endA1-0.04,   a1);
      float arcLine1 = smoothstep(0.009+pw, 0.001, d1);
      float arcGlow1 = smoothstep(0.055, 0.0, d1);
      col += c1 * arcLine1 * arcMask1 * 1.4;
      col += c1 * arcGlow1 * arcMask1 * 0.12;

      // ── Secondary circle ──────────────────────────────────────────────────
      float r2 = r1 * (1.0/PHI);
      vec2 p2 = p * rot(t*0.07);
      float d2 = abs(length(p2)-r2);
      float a2 = atan(p2.y, p2.x);
      float arcMask2 = smoothstep(-PI+0.3,-PI+0.6,a2)*smoothstep(PI*0.55,PI*0.35,a2)
                     + smoothstep(-0.6,-0.3,a2)*smoothstep(0.3,-0.05,a2)*0.5;
      arcMask2 = clamp(arcMask2,0.0,1.0);
      float arcLine2 = smoothstep(0.007+pw,0.0005,d2);
      col += c2 * arcLine2 * arcMask2 * 0.9;
      col += c2 * smoothstep(0.04,0.0,d2) * arcMask2 * 0.07;

      // ── Tertiary golden-ratio ring ────────────────────────────────────────
      if(cx>0.25){
        float r3 = r2 * (1.0/PHI);
        float d3 = abs(length(p*rot(-t*0.04))-r3);
        float arcLine3 = smoothstep(0.005+pw,0.0003,d3);
        col += c3*0.7 * arcLine3;
      }

      // ── Accent dot cluster ────────────────────────────────────────────────
      float dotCount = 1.0+cx*4.0;
      for(int i=0;i<5;i++){
        if(float(i)>=dotCount) break;
        float fi=float(i);
        float da = fi*TAU*PHI;
        float dr = r1*(0.25+fi*0.18);
        vec2 dp = vec2(cos(da+t*0.04),sin(da+t*0.04))*dr;
        float dd = length(p-dp);
        float dotR = 0.008+fi*0.002-cx*0.002;
        float dotMask = smoothstep(dotR+pw, dotR-pw*0.5, dd);
        col += mix(c1,c2,fi/4.0)*dotMask*1.6;
        col += mix(c1,c2,fi/4.0)*exp(-dd*90.0)*0.18;
      }

      // ── Thin horizon line ─────────────────────────────────────────────────
      float lineY = sin(t*0.13)*0.025;
      float lineLen = 0.32 + cx*0.08;
      float horizLine = smoothstep(0.0012+pw, 0.0, abs(p.y-lineY))
                      * smoothstep(lineLen, lineLen-0.02, abs(p.x));
      col += c2*0.55*horizLine;

      // ── Vertical complementary line ───────────────────────────────────────
      if(cx>0.5){
        float lineX = cos(t*0.11)*0.02;
        float vertLine = smoothstep(0.0012+pw, 0.0, abs(p.x-lineX))
                       * smoothstep(0.18, 0.15, abs(p.y));
        col += c3*0.4*vertLine;
      }

      col += (rand(uv+t)-0.5)*0.008;
      col *= 1.0-smoothstep(0.48,0.82,length(p)*1.1)*0.55;

      gl_FragColor = vec4(pow(clamp(col,0.,1.),vec3(0.92)), 1.0);
    }
  `;

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── IMPRESSIONIST v4 ──────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  const IMPRESSIONIST = /* glsl */`
    void main(){
      vec2 uv=gl_FragCoord.xy/u_resolution;
      float t=u_time*${(ix * 0.13).toFixed(3)};
      float cx=${cx.toFixed(3)};

      // ── Sun position ──────────────────────────────────────────────────────
      vec2 sunPos = vec2(0.62+sin(t*0.07)*0.04, 0.72+cos(t*0.05)*0.025);
      float sunDist = length(uv-sunPos);

      // ── Physically-derived paint-stroke normals ───────────────────────────
      float eps = 0.006;
      vec2 q0, r0, q1, r1, q2, r2, q3, r3, q4, r4;
      float pC = domainWarp(uv*(3.5+cx*4.0)+t*0.025, 6.0, q0, r0);
      float pL = domainWarp(uv+vec2(-eps,0.0), 4.0, q1, r1);
      float pR = domainWarp(uv+vec2( eps,0.0), 4.0, q2, r2);
      float pB = domainWarp(uv+vec2(0.0,-eps), 4.0, q3, r3);
      float pT = domainWarp(uv+vec2(0.0, eps), 4.0, q4, r4);
      vec3 strokeNormal = normalize(vec3((pL-pR)/(2.0*eps), (pB-pT)/(2.0*eps), 0.18));

      vec3 lightDir = normalize(vec3(sunPos-uv, 0.45));
      float diff = max(0.0, dot(strokeNormal, lightDir));
      float spec = pow(max(0.0, dot(reflect(-lightDir,strokeNormal), vec3(0,0,1))),12.0);

      // ── Color palette ─────────────────────────────────────────────────────
      vec3 warm = vec3(${r.toFixed(4)},${g.toFixed(4)},${b.toFixed(4)})*1.5;
      vec3 cool = vec3(${r2.toFixed(4)},${g2.toFixed(4)},${b2.toFixed(4)})*1.1;
      vec3 deep = vec3(${r3.toFixed(4)},${g3.toFixed(4)},${b3.toFixed(4)})*0.55;
      vec3 sky1 = mix(cool*0.65, warm*0.5, pow(uv.y,0.6));
      vec3 sunTint = vec3(1.12,0.95,0.72)*2.0;

      // ── Scene zones ───────────────────────────────────────────────────────
      float horizY = 0.44 + q0.x*0.04;
      float ground = smoothstep(horizY+0.04, horizY-0.04, uv.y);
      float water  = smoothstep(0.36, 0.30, uv.y)*(1.0-ground);

      // Sky with altocumulus cloud brushwork
      vec3 col = sky1;
      float cloud = fbm(uv*vec2(4.0,2.5)+vec2(t*0.06,0.0), 6.0);
      float cloud2= fbm(uv*vec2(6.0,3.0)+vec2(-t*0.04,0.3), 5.0);
      vec3 cloudCol = mix(vec3(0.95,0.93,0.88), warm*1.2, smoothstep(0.4,0.8,cloud));
      col = mix(col, cloudCol, smoothstep(0.38,0.65,cloud)*smoothstep(0.42,0.95,uv.y)*0.75);
      col = mix(col, warm*0.85, smoothstep(0.52,0.70,cloud2)*smoothstep(0.55,0.90,uv.y)*0.4);

      // Sun halo + corona
      col += sunTint*exp(-sunDist*9.0)*0.55;
      col  = mix(col, sunTint*1.8, smoothstep(0.032,0.012,sunDist));
      float rayAngle = atan(uv.y-sunPos.y, uv.x-sunPos.x);
      float rays = pow(max(0.0,fbm(vec2(rayAngle*3.0, sunDist*2.0)+t*0.08, 3.0)-0.38),1.5);
      col += sunTint*rays*exp(-sunDist*3.5)*0.35;

      // Ground / meadow
      float groundNoise = fbm(uv*(4.0+cx*3.0)+vec2(t*0.02,0.0), 6.0);
      vec3 groundCol = mix(deep*0.8, warm*0.55, groundNoise*(0.5+cx*0.4));
      groundCol += warm*diff*0.45 + vec3(1.0)*spec*0.18;
      col = mix(col, groundCol, ground);

      // Water surface
      if(uv.y < 0.40){
        float shimmerNoise = noise(vec2(uv.x*28.0, uv.y*68.0+t*3.5));
        float shimmer = pow(shimmerNoise, 2.5)*1.4;
        vec2 reflUV = vec2(uv.x+noise(uv*16.0+t*0.6)*0.018, 1.0-uv.y*2.2+0.42);
        float reflCloud = fbm(reflUV*4.0+t*0.06, 4.0);
        vec3 reflCol = mix(cool*0.5, cloudCol*0.65, smoothstep(0.38,0.65,reflCloud));
        reflCol += sunTint*0.3*exp(-length(reflUV-sunPos)*10.0);
        col = mix(col, reflCol*0.65+warm*shimmer*0.2, smoothstep(0.40,0.28,uv.y)*0.72);

        // Lily pads
        for(int li=0;li<32;li++){
          if(float(li)>=3.0+cx*4.0) break;
          float fl=float(li);
          vec2 lc=vec2(rand(vec2(fl,1.0))*0.8+0.1, rand(vec2(fl,2.0))*0.1+0.22);
          vec2 lp=(uv-lc)/vec2(0.032+rand(vec2(fl,3.0))*0.02, 0.015);
          float lily=smoothstep(1.0,0.85,length(lp));
          vec3 lilyCol=mix(deep*1.4, warm*0.5, rand(vec2(fl,4.0)));
          col=mix(col,lilyCol,lily*0.8);
          col+=warm*0.4*smoothstep(0.9,1.0,lp.y+0.5)*lily;
        }
      }

      // ── Pollen / mist particles ───────────────────────────────────────────
      for(int pi=0;pi<32;pi++){
        if(float(pi)>=12.0+cx*10.0) break;
        float fp=float(pi);
        vec2 pPos=vec2(
          fract(fp*0.0812+sin(t*0.12+fp)*0.04),
          fract(fp*PHI-t*(0.04+rand(vec2(fp,1.1))*0.06))
        );
        float pd=length(uv-pPos);
        col+=warm*0.15*exp(-pd*180.0)*smoothstep(0.55,0.95,uv.y);
      }

      col *= 1.0-0.28*pow(length(uv-0.5)*1.35,2.0);
      gl_FragColor = vec4(aces(col*1.08), 1.0);
    }
  `;

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── ABSTRACT v4 ───────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  const ABSTRACT = /* glsl */`
    void main(){
      vec2 uv = gl_FragCoord.xy / u_resolution;
      float t = u_time * ${(ix * 0.26).toFixed(3)};
      float cx = ${cx.toFixed(3)};
      vec2 p = uv - 0.5;
      p.x *= u_resolution.x / u_resolution.y;

      // ── High-frequency domain warp cascade ───────────────────────────────
      vec2 q0, r0;
      float flow0 = domainWarp(uv * (0.8 + cx * 1.2) + vec2(t * 0.015, -t * 0.011), 3.0, q0, r0);
      vec2 q, r_dw;
      float flow1 = domainWarp(uv * (1.8 + cx * 3.2) + q0 * 0.7 + vec2(t * 0.045, -t * 0.028), 7.0, q, r_dw);
      vec2 q2, r2;
      float flow2 = domainWarp(uv * (3.1 + cx * 2.0) + q * 1.1 + vec2(-t * 0.035, t * 0.022), 6.0, q2, r2);
      vec2 q3, r3;
      float flow3 = domainWarp(uv * (5.5 + cx * 1.5) + q2 * 0.6 + vec2(t * 0.02, -t * 0.016), 4.0, q3, r3);

      // ── Enhanced curl noise ───────────────────────────────────────────────
      vec3 gN1 = noiseGrad(uv * (7.0 + cx * 5.5) + t * 0.07);
      vec3 gN2 = noiseGrad(uv * (7.0 + cx * 5.5) + t * 0.07 + vec2(3.7, 2.1));
      vec3 gN3 = noiseGrad(uv * (12.0 + cx * 4.0) + t * 0.04 + vec2(1.3, 4.9));
      vec2 curl  = vec2(gN1.z, -gN2.y);
      vec2 curl2 = vec2(gN2.z, -gN3.y) * 0.5;

      // ── Multi-source wave interference (12-source) ────────────────────────
      float wave = 0.0, wave2 = 0.0;
      float waveSrc = 6.0 + cx * 6.0;
      for(int i = 0; i < 12; i++){
        if(float(i) >= waveSrc) break;
        float fi = float(i);
        vec2 src = 0.42 * vec2(
          sin(t * 0.31 * PHI + fi * 1.5 + fi * fi * 0.3),
          cos(t * 0.24 * PHI + fi * 2.3 + fi * fi * 0.2)
        );
        float d = length(p - src);
        float d2 = length(p - src * 0.6 + curl2 * 0.2);
        float freq  = 28.0 + cx * 22.0 + fi * 2.1;
        float freq2 = 14.0 + cx * 10.0 + fi * 1.4;
        float phase = t * (1.4 + fi * 0.38);
        wave  += sin(d  * freq  - phase) * exp(-d  * 2.2);
        wave2 += sin(d2 * freq2 - phase * 0.7) * exp(-d2 * 3.5) * 0.6;
      }
      wave  /= float(waveSrc);
      wave2 /= float(waveSrc);

      // ── Radial interference rings ─────────────────────────────────────────
      float r = length(p);
      float theta = atan(p.y, p.x);
      float rings = sin(r * (40.0 + cx * 30.0) - t * 2.0 + flow1 * 3.0)
                  * cos(theta * (3.0 + cx * 5.0) + t * 0.3)
                  * exp(-r * 1.8);

      // ── Kaleidoscopic symmetry (enhanced) ─────────────────────────────────
      float kSegs  = floor(4.0 + cx * 8.0);
      float kAng   = TAU / kSegs;
      float kRot   = t * 0.045 + flow1 * 0.08;
      float kFoldR = abs(mod((theta + kRot) / kAng, 1.0) - 0.5) * 2.0;
      float kFoldR2= abs(mod((theta - kRot * 0.7 + PI / kSegs) / kAng, 1.0) - 0.5) * 2.0;

      float kPat  = fbm(vec2(kFoldR  * 5.5, r * 6.5 - t * 0.35 + flow1 * 0.7), 6.0);
      float kPat2 = fbm(vec2(kFoldR2 * 4.0, r * 4.0 + t * 0.25 + flow2 * 0.5), 5.0);
      float kEdge = smoothstep(0.02, 0.0, abs(kFoldR - 0.5) - 0.44);
      float kEdge2= smoothstep(0.015, 0.0, abs(kFoldR2 - 0.5) - 0.46);

      // ── Layered Voronoi ───────────────────────────────────────────────────
      vec2 vPos1 = q  * 3.5 + r_dw * 2.0 + curl  * 0.6;
      vec2 vPos2 = q2 * 2.5 + r2   * 1.5 + curl2 * 0.8;
      vec2 vPos3 = q3 * 5.0 + r3   * 1.0;

      float vEdge1 = voronoiEdge(vPos1 * (4.5 + cx * 3.5));
      float vEdge2 = voronoiEdge(vPos2 * (3.5 + cx * 3.0));
      float vEdge3 = voronoiEdge(vPos3 * (7.0 + cx * 2.0));
      float vInner1= voronoi(vPos1 * (4.5 + cx * 3.5));
      float vInner2= voronoi(vPos2 * (3.5 + cx * 3.0));

      // ── Richly-modulated color palette ────────────────────────────────────
      float hShift = flow1 * 0.18 + curl.x * 0.07 + wave * 0.05 + rings * 0.04;
      vec3 c1 = hsl2rgb(${h0} + hShift,                          0.98, 0.55);
      vec3 c2 = hsl2rgb(${h1} + wave  * 0.12 + curl.y  * 0.06,  0.95, 0.48);
      vec3 c3 = hsl2rgb(${h2} + kPat  * 0.15 + flow2   * 0.09,  0.90, 0.38);
      vec3 c4 = hsl2rgb(${h0} + 0.33  + wave2 * 0.09,            0.88, 0.62);
      vec3 c5 = hsl2rgb(${h1} + 0.18  + kPat2 * 0.11 + rings * 0.07, 0.82, 0.72);
      vec3 cDark = hsl2rgb(${h2} + flow3 * 0.12,                 0.70, 0.10);
      vec3 cBright = hsl2rgb(${h0} + wave * 0.08 + curl.x * 0.04, 0.99, 0.88);

      // ── Multi-stage color composition ─────────────────────────────────────
      vec3 col = oklabMix(c1, c2, wave * 0.5 + 0.5);
      col = oklabMix(col, c3, kPat * 0.65);
      col = oklabMix(col, c4, smoothstep(-0.3, 0.3, flow2 - 0.5) * 0.38);
      col = oklabMix(col, c5, kPat2 * 0.30 + rings * 0.20);
      col = oklabMix(col, cDark, smoothstep(0.5, 0.8, vInner1) * 0.55);

      // ── Contrast sculpting via Voronoi topology ────────────────────────────
      col += c1 * 1.4 * smoothstep(0.025, 0.0, vEdge1) * 0.65;
      col += c4 * 1.1 * smoothstep(0.018, 0.0, vEdge2) * 0.45;
      col += cBright   * smoothstep(0.012, 0.0, vEdge3) * 0.30;
      col *= 0.72 + 0.28 * smoothstep(0.0, 0.6, 1.0 - vInner1);
      col *= 0.85 + 0.15 * smoothstep(0.0, 0.5, 1.0 - vInner2);

      // ── Kaleidoscopic edge accents ─────────────────────────────────────────
      col += c4 * kEdge  * 0.45 * (0.5 + wave * 0.5);
      col += c5 * kEdge2 * 0.25 * (0.5 + kPat * 0.5);

      // ── Radial vignette + centre bloom ────────────────────────────────────
      float vignette = 1.0 - smoothstep(0.30, 0.85, r);
      float bloom    = smoothstep(0.25, 0.0, r) * 0.35;
      col *= 0.15 + 0.85 * vignette;
      col += cBright * bloom * (0.4 + wave * 0.6);

      // ── High-contrast micro-detail ─────────────────────────────────────────
      float fine   = fbm(uv * 48.0 + t * 0.06, 3.0);
      float coarse = fbm(uv * 12.0 + t * 0.02, 4.0);
      float tooth  = 0.75 + fine * 0.15 + coarse * 0.10;
      col *= tooth;

      // ── Specular sparkle (crisp) ───────────────────────────────────────────
      float sparkle1 = pow(max(0.0, wave),   5.0) * 0.55;
      float sparkle2 = pow(max(0.0, wave2),  6.0) * 0.35;
      float sparkle3 = pow(max(0.0, rings),  4.0) * 0.25;
      col += vec3(sparkle1) + cBright * sparkle2 + c5 * sparkle3 * 0.7;

      // ── Contrast ramp: deep blacks, bright whites ──────────────────────────
      float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
      float contrastBoost = 1.0 + 0.4 * smoothstep(0.2, 0.8, lum);
      col = mix(col * 0.0, col, pow(lum + 0.02, 0.72));
      col *= contrastBoost;

      // ── Chromatic micro-shift (lateral fringe) ─────────────────────────────
      float fringe = smoothstep(0.4, 0.85, r) * 0.012;
      vec2 shiftR = uv + p * fringe;
      vec2 shiftB = uv - p * fringe;
      float fbmR = fbm(shiftR * (5.5 + cx * 4.5) + t * 0.065, 5.0);
      float fbmB = fbm(shiftB * (5.5 + cx * 4.5) + t * 0.065, 5.0);
      col.r = mix(col.r, fbmR, 0.06);
      col.b = mix(col.b, fbmB, 0.06);

      col += dither(uv);
      gl_FragColor = vec4(aces(col * 1.25), 1.0);
    }
  `;

  // ═══════════════════════════════════════════════════════════════════════════
  // ─── NEON NOIR v4 ──────────────────────────────────────────────────────────
  // ═══════════════════════════════════════════════════════════════════════════
  const NEON_NOIR = /* glsl */`
    void main(){
      vec2 uv=gl_FragCoord.xy/u_resolution;
      float ar=u_resolution.x/u_resolution.y;
      float t=u_time*${(ix * 0.17).toFixed(3)};
      float cx=${cx.toFixed(3)};

      vec3 c1=vec3(${r.toFixed(4)},${g.toFixed(4)},${b.toFixed(4)});
      vec3 c2=vec3(${r2.toFixed(4)},${g2.toFixed(4)},${b2.toFixed(4)});
      vec3 c3=vec3(${r3.toFixed(4)},${g3.toFixed(4)},${b3.toFixed(4)});

      // ── Background fog ────────────────────────────────────────────────────
      vec2 q, r_dw;
      float fog = domainWarp(uv*(1.8+cx*0.8)+vec2(t*0.03,0.0), 4.0, q, r_dw);
      float fog2= fbm(uv*3.5+vec2(-t*0.025,0.0), 4.0);
      vec3 col = vec3(0.003, 0.003, 0.007)
               + c1*fog*0.05*smoothstep(0.5,1.0,uv.y)
               + c2*fog2*0.03;

      // ── Overhead spotlight ────────────────────────────────────────────────
      vec2 lampPos = vec2(0.5+sin(t*0.14)*0.025, 1.01);
      vec2 ld = uv - lampPos;
      float coneHalfAngle = 0.42 + cx*0.08;
      float coneAngle = abs(ld.x / (ld.y - 0.0005));
      float cone = smoothstep(coneHalfAngle+0.04, coneHalfAngle-0.06, coneAngle)
                 * step(0.0, -ld.y);
      float coneDepth = 1.0 - smoothstep(0.0, 1.02, length(ld));
      float coneFog = fbm(uv*8.0+t*0.08, 3.0)*0.5+0.5;
      col += c1 * cone * coneDepth * (0.42+fog*0.35) * (0.7+coneFog*0.3);
      col += c1 * 0.25 * exp(-abs(coneAngle-coneHalfAngle)*22.0) * step(0.0,-ld.y) * coneDepth;

      // ── Wet floor reflections ─────────────────────────────────────────────
      float floorY = 0.155 + sin(t*0.07)*0.004;
      if(uv.y < floorY + 0.08){
        float floorDist = abs(uv.y - floorY);
        float onFloor = smoothstep(0.055, 0.0, floorDist);
        vec2 ripple = vec2(noise(uv*18.0+t*0.9)*0.014, noise(uv*22.0+t*1.1)*0.006);
        vec2 reflUV = vec2(uv.x, floorY*2.0 - uv.y) + ripple;

        vec2 rLamp = reflUV - lampPos;
        float rConeA = abs(rLamp.x/(rLamp.y-EPS));
        float rCone = smoothstep(coneHalfAngle*1.3, 0.0, rConeA) * step(0.0,-rLamp.y);
        col += c1 * rCone * exp(-length(rLamp)*3.5) * onFloor * 0.7 * (fog*0.5+0.5);

        col += c1 * glow(length(uv-vec2(lampPos.x+sin(t*0.1)*0.05, floorY)), 0.0025) * onFloor;
      }

      // ── Neon signs ────────────────────────────────────────────────────────
      float signCount = 4.0 + cx*4.0;
      for(int i=0;i<8;i++){
        if(float(i)>=signCount) break;
        float fi=float(i);

        vec2 sc = vec2(0.10+fi*0.12+sin(t*0.06+fi*1.3)*0.012,
                       0.50+rand(vec2(fi,1.2))*0.30);
        float sw  = 0.055+rand(vec2(fi,2.3))*0.07;
        float sh  = 0.010+rand(vec2(fi,3.4))*0.008;
        vec3 sCol = mix(c1*2.0, c2*2.2, fi/7.0);
        float flickRate = 6.0+rand(vec2(fi+1.0))*8.0;
        float flick = mix(0.9, 0.0, step(0.92, rand(vec2(floor(t*flickRate), fi))));
        flick *= 0.75+0.25*sin(t*18.0*rand(vec2(fi,6.0)));

        float tube = smoothstep(sh+0.0015, sh-0.0005, abs(uv.y-sc.y))
                   * smoothstep(sw,        sw-0.006,  abs(uv.x-sc.x));
        col += sCol * tube * flick;

        vec2 haloD = (uv-sc)*vec2(1.0, 3.5);
        col += sCol * 0.22 * exp(-dot(haloD,haloD)*90.0) * flick;

        col += sCol * 0.08 * exp(-length((uv-sc)*vec2(1.0,1.8))*10.0) * fog * flick;

        if(uv.y < floorY){
          float reflD = abs(uv.x-sc.x);
          float reflFade = exp(-abs(uv.y-floorY)*28.0)*exp(-reflD*16.0);
          reflFade *= (0.4+noise(uv*20.0+t)*0.6);
          col += sCol*0.28*reflFade*flick;
        }
      }

      // ── Silhouette figure with rim-light ──────────────────────────────────
      float figX = 0.41+sin(t*0.055)*0.022;
      float figBW= 0.014;
      float inBody = step(abs(uv.x-figX), figBW) * step(0.155,uv.y) * step(uv.y,0.50);
      float inHead = smoothstep(0.018, 0.0, length(uv-vec2(figX, 0.535)));
      float totalFig = max(inBody, inHead);
      col = mix(col, vec3(0.001,0.001,0.003), totalFig*0.97);
      float rimW = abs(uv.x-figX)-figBW;
      float rimLight = exp(-max(0.0,rimW)*160.0)*step(0.155,uv.y)*step(uv.y,0.545)*(1.0-totalFig);
      col += c1*rimLight*0.55*(cone*0.5+0.5);

      // ── Rain droplet lenses ───────────────────────────────────────────────
      float dropCount = 20.0+cx*20.0;
      for(int i=0;i<40;i++){
        if(float(i)>=dropCount) break;
        float fi=float(i);
        float dSpeed = 0.18+rand(vec2(fi,1.0))*0.25;
        vec2 dPos = vec2(
          fract(fi*0.0617+rand(vec2(fi,2.0))*0.5),
          fract(fi*PHI - t*dSpeed)
        );
        float dDist = length(uv - dPos);
        float dR = 0.007+rand(vec2(fi,3.0))*0.006;
        vec2 refr = (uv-dPos)/(dR+EPS)*0.012*smoothstep(dR,0.0,dDist);
        vec2 refUV = uv + refr;
        vec3 rLampCol = c1 * exp(-length(refUV-lampPos)*6.0)*0.6
                      + c2 * 0.2 * exp(-length(refUV-lampPos)*12.0);
        col += rLampCol * smoothstep(dR+0.001, dR-0.001, dDist)*0.7;
        col += vec3(0.6,0.75,0.9)*exp(-dDist*280.0)*0.25;
      }

      col *= 1.0 - smoothstep(0.38, 0.88, length(uv-0.5)*1.55)*0.88;
      col += dither(uv);
      gl_FragColor = vec4(aces(col*1.2), 1.0);
    }
  `;

  const MAINS: Record<string, string> = {
    cyberpunk:     CYBERPUNK,
    cosmic:        COSMIC,
    surreal:       SURREAL,
    minimalist:    MINIMALIST,
    impressionist: IMPRESSIONIST,
    abstract:      ABSTRACT,
    'neon-noir':   NEON_NOIR,
  };

  return UTILS + '\n' + (MAINS[params.style] ?? ABSTRACT);
}

// ─── Vertex shader ────────────────────────────────────────────────────────────
const VERTEX_SHADER = /* glsl */`
  attribute vec2 a_position;
  void main(){gl_Position=vec4(a_position,0.0,1.0);}
`;

// ─── ArtEngine class ──────────────────────────────────────────────────────────
export class ArtEngine {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram | null = null;
  private startTime = Date.now();
  private animFrame = 0;
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true });
    if (!gl) throw new Error('WebGL not supported');
    this.gl = gl;
  }

  private resizeCanvas(): void {
    const dpr = window.devicePixelRatio || 1;
    const w = Math.floor(this.canvas.clientWidth * dpr);
    const h = Math.floor(this.canvas.clientHeight * dpr);
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
  }

  private compileShader(type: number, src: string): WebGLShader {
    const gl = this.gl;
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(shader);
      console.error('Shader error:', log);
      throw new Error(log ?? 'Shader compile error');
    }
    return shader;
  }

  render(params: ArtParameters): void {
    const gl = this.gl;
    if (this.program) gl.deleteProgram(this.program);
    this.resizeCanvas();
    const vs = this.compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = this.compileShader(gl.FRAGMENT_SHADER, buildFragmentShader(params));
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(prog) ?? 'Link error');
    }
    this.program = prog;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    this.startTime = Date.now();
    this.loop(params);
  }

  private loop(params: ArtParameters): void {
    const gl = this.gl;
    const prog = this.program;
    if (!prog) return;
    const draw = () => {
      this.resizeCanvas();
      gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      gl.uniform1f(gl.getUniformLocation(prog, 'u_time'), (Date.now() - this.startTime) / 1000);
      gl.uniform2f(gl.getUniformLocation(prog, 'u_resolution'), this.canvas.width, this.canvas.height);
      gl.uniform1f(gl.getUniformLocation(prog, 'u_complexity'), params.complexity / 100);
      gl.uniform1f(gl.getUniformLocation(prog, 'u_intensity'), params.animationIntensity / 100);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      this.animFrame = requestAnimationFrame(draw);
    };
    cancelAnimationFrame(this.animFrame);
    draw();
  }

  snapshot(): string { return this.canvas.toDataURL('image/png'); }
  destroy(): void {
    cancelAnimationFrame(this.animFrame);
    if (this.program) this.gl.deleteProgram(this.program);
  }
}

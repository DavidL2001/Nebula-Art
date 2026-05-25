import{a as e,t,u as n}from"./index-Cb2TBVQV.js";import{a as r,i,n as a,o,r as s,s as c,t as l}from"./ParticleBackground-Dm0zJB4d.js";var u=n(e(),1),d={card:`_card_1iqq2_36`,"glow-cyan":`_glow-cyan_1iqq2_60`,"glow-magenta":`_glow-magenta_1iqq2_65`,"glow-violet":`_glow-violet_1iqq2_70`},f=t();function p({children:e,className:t=``,glow:n=`none`,onClick:r}){return(0,f.jsx)(o.div,{className:`${d.card} ${d[`glow-${n}`]} ${t}`,onClick:r,initial:{opacity:0,y:12},animate:{opacity:1,y:0},transition:{duration:.4,ease:[.4,0,.2,1]},children:e})}var m={wrapper:`_wrapper_xx9lz_36`,inputWrap:`_inputWrap_xx9lz_42`,icon:`_icon_xx9lz_58`,textarea:`_textarea_xx9lz_71`,suggestions:`_suggestions_xx9lz_92`,suggestion:`_suggestion_xx9lz_92`},h=[`neon lights in the rain, Tokyo at night, cyberpunk`,`deep space, stardust, celestial glow, cosmic`,`floating objects, dreamlike landscape, surreal`,`soft brushstrokes, golden sunlight, impressionist`,`fluid forms, expressive color splashes, abstract`];function g({value:e,onChange:t,onGenerate:n}){let[r,i]=(0,u.useState)(!1);return(0,f.jsxs)(`div`,{className:m.wrapper,children:[(0,f.jsxs)(o.div,{className:`${m.inputWrap} ${r?m.focused:``}`,animate:{boxShadow:r?`0 0 0 1px rgba(0,245,255,0.5), 0 0 30px rgba(0,245,255,0.15)`:`0 0 0 1px rgba(255,255,255,0.08)`},transition:{duration:.2},children:[(0,f.jsx)(`span`,{className:m.icon,children:`✦`}),(0,f.jsx)(`textarea`,{className:m.textarea,value:e,onChange:e=>t(e.target.value),onFocus:()=>i(!0),onBlur:()=>i(!1),onKeyDown:e=>{e.key===`Enter`&&e.metaKey&&n()},placeholder:`Beskriv ditt konstverk... (⌘+Enter för att generera)`,rows:3})]}),(0,f.jsx)(`div`,{className:m.suggestions,children:h.map((e,n)=>(0,f.jsx)(o.button,{className:m.suggestion,onClick:()=>t(e),whileHover:{scale:1.02},whileTap:{scale:.98},initial:{opacity:0,x:-10},animate:{opacity:1,x:0},transition:{delay:n*.05},children:e},n))})]})}var _={wrapper:`_wrapper_7k3kw_36`,section:`_section_7k3kw_42`,sectionLabel:`_sectionLabel_7k3kw_48`,styleGrid:`_styleGrid_7k3kw_55`,styleBtn:`_styleBtn_7k3kw_61`,active:`_active_7k3kw_79`,styleIcon:`_styleIcon_7k3kw_84`,styleLabel:`_styleLabel_7k3kw_88`,moodGrid:`_moodGrid_7k3kw_126`,moodBtn:`_moodBtn_7k3kw_132`,activeMood:`_activeMood_7k3kw_152`},v=[{id:`cyberpunk`,label:`Cyberpunk`,icon:`⚡`},{id:`cosmic`,label:`Cosmic`,icon:`✦`},{id:`surreal`,label:`Surreal`,icon:`◈`},{id:`impressionist`,label:`Impressionist`,icon:`◎`},{id:`abstract`,label:`Abstract`,icon:`◇`},{id:`neon-noir`,label:`Neon Noir`,icon:`◐`},{id:`minimalist`,label:`Minimal`,icon:`○`}],y=[{id:`mysterious`,label:`Mystisk`},{id:`energetic`,label:`Energisk`},{id:`ethereal`,label:`Eterisk`},{id:`chaotic`,label:`Kaotisk`},{id:`serene`,label:`Lugn`},{id:`melancholic`,label:`Melankolisk`}];function b({selectedStyle:e,selectedMood:t,onStyleChange:n,onMoodChange:r}){return(0,f.jsxs)(`div`,{className:_.wrapper,children:[(0,f.jsxs)(`div`,{className:_.section,children:[(0,f.jsx)(`p`,{className:_.sectionLabel,children:`STIL`}),(0,f.jsx)(`div`,{className:_.styleGrid,children:v.map((t,r)=>(0,f.jsxs)(o.button,{className:`${_.styleBtn} ${e===t.id?_.active:``}`,onClick:()=>n(t.id),whileHover:{scale:1.05},whileTap:{scale:.95},initial:{opacity:0,y:8},animate:{opacity:1,y:0},transition:{delay:r*.04},children:[(0,f.jsx)(`span`,{className:_.styleIcon,children:t.icon}),(0,f.jsx)(`span`,{className:_.styleLabel,children:t.label})]},t.id))})]}),(0,f.jsxs)(`div`,{className:_.section,children:[(0,f.jsx)(`p`,{className:_.sectionLabel,children:`MOOD`}),(0,f.jsx)(`div`,{className:_.moodGrid,children:y.map(e=>(0,f.jsx)(o.button,{className:`${_.moodBtn} ${t===e.id?_.activeMood:``}`,onClick:()=>r(e.id),whileHover:{scale:1.04},whileTap:{scale:.96},children:e.label},e.id))})]})]})}var x={wrapper:`_wrapper_wb82h_36`,header:`_header_wb82h_42`,label:`_label_wb82h_48`,value:`_value_wb82h_56`,cyan:`_cyan_wb82h_63`,magenta:`_magenta_wb82h_67`,violet:`_violet_wb82h_71`,gold:`_gold_wb82h_75`,track:`_track_wb82h_80`,fill:`_fill_wb82h_87`,input:`_input_wb82h_113`};function S({label:e,value:t,min:n=0,max:r=100,onChange:i,color:a=`cyan`,unit:o=``}){let s=(t-n)/(r-n)*100;return(0,f.jsxs)(`div`,{className:x.wrapper,children:[(0,f.jsxs)(`div`,{className:x.header,children:[(0,f.jsx)(`span`,{className:x.label,children:e}),(0,f.jsxs)(`span`,{className:`${x.value} ${x[a]}`,children:[t,o]})]}),(0,f.jsxs)(`div`,{className:x.track,children:[(0,f.jsx)(`div`,{className:`${x.fill} ${x[a]}`,style:{width:`${s}%`}}),(0,f.jsx)(`input`,{type:`range`,min:n,max:r,value:t,onChange:e=>i(Number(e.target.value)),className:`${x.input} ${x[a]}`})]})]})}var C={wrapper:`_wrapper_r5284_36`,ambientGlow:`_ambientGlow_r5284_46`,canvas:`_canvas_r5284_54`,overlay:`_overlay_r5284_60`,idleContent:`_idleContent_r5284_70`,idleIcon:`_idleIcon_r5284_77`,idleText:`_idleText_r5284_83`,loadingContent:`_loadingContent_r5284_92`,progressRing:`_progressRing_r5284_99`,trackCircle:`_trackCircle_r5284_110`,fillCircle:`_fillCircle_r5284_116`,progressPct:`_progressPct_r5284_125`,loadingLabel:`_loadingLabel_r5284_136`,corner:`_corner_r5284_143`,tl:`_tl_r5284_166`,tr:`_tr_r5284_110`,bl:`_bl_r5284_177`,br:`_br_r5284_183`};function w({canvasRef:e}){let{generatorState:t,params:n}=s();return(0,f.jsxs)(`div`,{className:C.wrapper,children:[(0,f.jsx)(`div`,{className:C.ambientGlow,style:{background:`radial-gradient(ellipse at center, hsl(${n.hue},60%,30%) 0%, transparent 70%)`}}),(0,f.jsx)(`canvas`,{ref:e,width:800,height:600,className:C.canvas}),t.status===`idle`&&(0,f.jsx)(o.div,{className:C.overlay,initial:{opacity:0},animate:{opacity:1},children:(0,f.jsxs)(`div`,{className:C.idleContent,children:[(0,f.jsx)(o.div,{className:C.idleIcon,animate:{rotate:360},transition:{duration:8,repeat:1/0,ease:`linear`},children:`✦`}),(0,f.jsx)(`p`,{className:C.idleText,children:`Beskriv ditt konstverk och tryck Generera`})]})}),(t.status===`parsing`||t.status===`generating`)&&(0,f.jsx)(o.div,{className:C.overlay,initial:{opacity:0},animate:{opacity:1},children:(0,f.jsxs)(`div`,{className:C.loadingContent,children:[(0,f.jsxs)(`div`,{className:C.progressRing,children:[(0,f.jsxs)(`svg`,{viewBox:`0 0 80 80`,children:[(0,f.jsx)(`circle`,{cx:`40`,cy:`40`,r:`34`,className:C.trackCircle}),(0,f.jsx)(`circle`,{cx:`40`,cy:`40`,r:`34`,className:C.fillCircle,strokeDasharray:`${2*Math.PI*34}`,strokeDashoffset:`${2*Math.PI*34*(1-t.progress/100)}`})]}),(0,f.jsxs)(`span`,{className:C.progressPct,children:[t.progress,`%`]})]}),(0,f.jsx)(`p`,{className:C.loadingLabel,children:t.status===`parsing`?`ANALYSERAR PROMPT...`:`GENERERAR...`})]})}),(0,f.jsx)(`div`,{className:`${C.corner} ${C.tl}`}),(0,f.jsx)(`div`,{className:`${C.corner} ${C.tr}`}),(0,f.jsx)(`div`,{className:`${C.corner} ${C.bl}`}),(0,f.jsx)(`div`,{className:`${C.corner} ${C.br}`})]})}var T={backdrop:`_backdrop_k5xbh_36`,modal:`_modal_k5xbh_48`,header:`_header_k5xbh_56`,meta:`_meta_k5xbh_63`,badge:`_badge_k5xbh_70`,badge2:`_badge2_k5xbh_70`,promptSnip:`_promptSnip_k5xbh_88`,actions:`_actions_k5xbh_95`,closeBtn:`_closeBtn_k5xbh_101`,canvasWrap:`_canvasWrap_k5xbh_121`,img:`_img_k5xbh_130`,corner:`_corner_k5xbh_138`,tl:`_tl_k5xbh_161`,tr:`_tr_k5xbh_166`,bl:`_bl_k5xbh_172`,br:`_br_k5xbh_178`,hint:`_hint_k5xbh_184`};function E({thumbnailUrl:e,artStyle:t,artMood:n,prompt:r,onClose:a,onExport:s}){return(0,u.useEffect)(()=>{let e=e=>{e.key===`Escape`&&a()};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[a]),(0,u.useEffect)(()=>(document.body.style.overflow=`hidden`,()=>{document.body.style.overflow=``}),[]),(0,f.jsx)(c,{children:(0,f.jsx)(o.div,{className:T.backdrop,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.25},onClick:a,children:(0,f.jsxs)(o.div,{className:T.modal,initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},exit:{scale:.9,opacity:0},transition:{duration:.3,ease:[.4,0,.2,1]},onClick:e=>e.stopPropagation(),children:[(0,f.jsxs)(`div`,{className:T.header,children:[(0,f.jsxs)(`div`,{className:T.meta,children:[t&&(0,f.jsx)(`span`,{className:T.badge,children:t}),n&&(0,f.jsx)(`span`,{className:T.badge2,children:n}),r&&(0,f.jsxs)(`span`,{className:T.promptSnip,children:[`"`,r.slice(0,50),r.length>50?`…`:``,`"`]})]}),(0,f.jsxs)(`div`,{className:T.actions,children:[(0,f.jsx)(i,{color:`cyan`,variant:`outline`,size:`sm`,onClick:s,children:`↓ PNG`}),(0,f.jsx)(`button`,{className:T.closeBtn,onClick:a,children:`✕`})]})]}),(0,f.jsxs)(`div`,{className:T.canvasWrap,children:[(0,f.jsx)(`img`,{src:e,alt:`fullscreen artwork`,className:T.img}),(0,f.jsx)(`div`,{className:`${T.corner} ${T.tl}`}),(0,f.jsx)(`div`,{className:`${T.corner} ${T.tr}`}),(0,f.jsx)(`div`,{className:`${T.corner} ${T.bl}`}),(0,f.jsx)(`div`,{className:`${T.corner} ${T.br}`})]}),(0,f.jsx)(`p`,{className:T.hint,children:`ESC för att stänga`})]})})})}function D(e,t,n){e/=360,t/=100,n/=100;let r,i,a;if(t===0)r=i=a=n;else{let o=n<.5?n*(1+t):n+t-n*t,s=2*n-o,c=(e,t,n)=>(n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e);r=c(s,o,e+1/3),i=c(s,o,e),a=c(s,o,e-1/3)}return[r,i,a]}function O(e){let[t,n,r]=D(e.hue,e.saturation,e.brightness*.45),[i,a,o]=D((e.hue+135)%360,e.saturation*.85,e.brightness*.38),[s,c,l]=D((e.hue+225)%360,e.saturation*.75,e.brightness*.28),u=e.complexity/100,d=e.animationIntensity/100,f=(e.hue/360).toFixed(4),p=((e.hue+135)%360/360).toFixed(4),m=((e.hue+225)%360/360).toFixed(4),h=`
    void main(){
      vec2 uv=gl_FragCoord.xy/u_resolution;
      float ar=u_resolution.x/u_resolution.y;
      float t=u_time*${(d*.35).toFixed(3)};
      float cx=${u.toFixed(3)};

      vec3 c1=vec3(${t.toFixed(4)},${n.toFixed(4)},${r.toFixed(4)});
      vec3 c2=vec3(${i.toFixed(4)},${a.toFixed(4)},${o.toFixed(4)});
      vec3 c3=vec3(${s.toFixed(4)},${c.toFixed(4)},${l.toFixed(4)});
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
  `,g=`
    void main(){
      vec2 uv=(gl_FragCoord.xy-u_resolution*0.5)/min(u_resolution.x,u_resolution.y);
      float t=u_time*${(d*.1).toFixed(3)};
      float cx=${u.toFixed(3)};

      float radius=length(uv);
      float angle=atan(uv.y,uv.x);

      vec3 c1=vec3(${t.toFixed(4)},${n.toFixed(4)},${r.toFixed(4)});
      vec3 c2=vec3(${i.toFixed(4)},${a.toFixed(4)},${o.toFixed(4)});
      vec3 c3=vec3(${s.toFixed(4)},${c.toFixed(4)},${l.toFixed(4)});

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
  `,_=`
    void main(){
      vec2 uv=gl_FragCoord.xy/u_resolution;
      float t=u_time*${(d*.2).toFixed(3)};
      float cx=${u.toFixed(3)};

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
      vec3 c1 = hsl2rgb(${f}+wf1*0.18+t*0.015,  0.92, 0.52);
      vec3 c2 = hsl2rgb(${p}-length(q)*0.14+t*0.01, 0.84, 0.42);
      vec3 c3 = hsl2rgb(${m}+r_dw.x*0.12-t*0.008, 0.78, 0.32);
      vec3 cMid= hsl2rgb(${f}+0.5+wf2*0.1, 0.7, 0.55);

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

          vec3 sCol = hsl2rgb(${f}+fi*0.16+t*0.01, 0.9, 0.5);
          float mask = smoothstep(0.004, 0.0, sDist);
          col = mix(col, sCol*(0.3+diff*1.2) + vec3(1.0)*spec*0.6 + sCol*sss, mask);

          float rim = 1.0-max(0.0,dot(sNorm,vec3(0,0,1)));
          col += sCol * pow(rim,3.0) * mask * 0.8;
        }

        col += hsl2rgb(${p}+fi*0.13,0.85,0.55) * exp(-length(p-sc)*22.0) * 0.15;
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
  `,v=`
    void main(){
      vec2 uv=gl_FragCoord.xy/u_resolution;
      float ar=u_resolution.x/u_resolution.y;
      float t=u_time*${(d*.09).toFixed(3)};
      float cx=${u.toFixed(3)};

      vec2 p=uv-0.5;
      p.x*=ar;

      vec3 c1=vec3(${t.toFixed(4)},${n.toFixed(4)},${r.toFixed(4)});
      vec3 c2=vec3(${i.toFixed(4)},${a.toFixed(4)},${o.toFixed(4)});
      vec3 c3=vec3(${s.toFixed(4)},${c.toFixed(4)},${l.toFixed(4)});
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
  `,y=`
    void main(){
      vec2 uv=gl_FragCoord.xy/u_resolution;
      float t=u_time*${(d*.13).toFixed(3)};
      float cx=${u.toFixed(3)};

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
      vec3 warm = vec3(${t.toFixed(4)},${n.toFixed(4)},${r.toFixed(4)})*1.5;
      vec3 cool = vec3(${i.toFixed(4)},${a.toFixed(4)},${o.toFixed(4)})*1.1;
      vec3 deep = vec3(${s.toFixed(4)},${c.toFixed(4)},${l.toFixed(4)})*0.55;
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
  `,b=`
    void main(){
      vec2 uv = gl_FragCoord.xy / u_resolution;
      float t = u_time * ${(d*.26).toFixed(3)};
      float cx = ${u.toFixed(3)};
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
      vec3 c1 = hsl2rgb(${f} + hShift,                          0.98, 0.55);
      vec3 c2 = hsl2rgb(${p} + wave  * 0.12 + curl.y  * 0.06,  0.95, 0.48);
      vec3 c3 = hsl2rgb(${m} + kPat  * 0.15 + flow2   * 0.09,  0.90, 0.38);
      vec3 c4 = hsl2rgb(${f} + 0.33  + wave2 * 0.09,            0.88, 0.62);
      vec3 c5 = hsl2rgb(${p} + 0.18  + kPat2 * 0.11 + rings * 0.07, 0.82, 0.72);
      vec3 cDark = hsl2rgb(${m} + flow3 * 0.12,                 0.70, 0.10);
      vec3 cBright = hsl2rgb(${f} + wave * 0.08 + curl.x * 0.04, 0.99, 0.88);

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
  `;return`
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
  
`+({cyberpunk:h,cosmic:g,surreal:_,minimalist:v,impressionist:y,abstract:b,"neon-noir":`
    void main(){
      vec2 uv=gl_FragCoord.xy/u_resolution;
      float ar=u_resolution.x/u_resolution.y;
      float t=u_time*${(d*.17).toFixed(3)};
      float cx=${u.toFixed(3)};

      vec3 c1=vec3(${t.toFixed(4)},${n.toFixed(4)},${r.toFixed(4)});
      vec3 c2=vec3(${i.toFixed(4)},${a.toFixed(4)},${o.toFixed(4)});
      vec3 c3=vec3(${s.toFixed(4)},${c.toFixed(4)},${l.toFixed(4)});

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
  `}[e.style]??b)}var k=`
  attribute vec2 a_position;
  void main(){gl_Position=vec4(a_position,0.0,1.0);}
`,A=class{gl;program=null;startTime=Date.now();animFrame=0;canvas;constructor(e){this.canvas=e;let t=e.getContext(`webgl`,{preserveDrawingBuffer:!0});if(!t)throw Error(`WebGL not supported`);this.gl=t}resizeCanvas(){let e=window.devicePixelRatio||1,t=Math.floor(this.canvas.clientWidth*e),n=Math.floor(this.canvas.clientHeight*e);(this.canvas.width!==t||this.canvas.height!==n)&&(this.canvas.width=t,this.canvas.height=n)}compileShader(e,t){let n=this.gl,r=n.createShader(e);if(n.shaderSource(r,t),n.compileShader(r),!n.getShaderParameter(r,n.COMPILE_STATUS)){let e=n.getShaderInfoLog(r);throw console.error(`Shader error:`,e),Error(e??`Shader compile error`)}return r}render(e){let t=this.gl;this.program&&t.deleteProgram(this.program),this.resizeCanvas();let n=this.compileShader(t.VERTEX_SHADER,k),r=this.compileShader(t.FRAGMENT_SHADER,O(e)),i=t.createProgram();if(t.attachShader(i,n),t.attachShader(i,r),t.linkProgram(i),!t.getProgramParameter(i,t.LINK_STATUS))throw Error(t.getProgramInfoLog(i)??`Link error`);this.program=i,t.useProgram(i);let a=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,a),t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),t.STATIC_DRAW);let o=t.getAttribLocation(i,`a_position`);t.enableVertexAttribArray(o),t.vertexAttribPointer(o,2,t.FLOAT,!1,0,0),this.startTime=Date.now(),this.loop(e)}loop(e){let t=this.gl,n=this.program;if(!n)return;let r=()=>{this.resizeCanvas(),t.viewport(0,0,this.canvas.width,this.canvas.height),t.uniform1f(t.getUniformLocation(n,`u_time`),(Date.now()-this.startTime)/1e3),t.uniform2f(t.getUniformLocation(n,`u_resolution`),this.canvas.width,this.canvas.height),t.uniform1f(t.getUniformLocation(n,`u_complexity`),e.complexity/100),t.uniform1f(t.getUniformLocation(n,`u_intensity`),e.animationIntensity/100),t.drawArrays(t.TRIANGLE_STRIP,0,4),this.animFrame=requestAnimationFrame(r)};cancelAnimationFrame(this.animFrame),r()}snapshot(){return this.canvas.toDataURL(`image/png`)}destroy(){cancelAnimationFrame(this.animFrame),this.program&&this.gl.deleteProgram(this.program)}};function j(e){let t=(0,u.useRef)(null),{setGeneratorState:n,setCurrentArtwork:r}=s();return(0,u.useEffect)(()=>()=>{t.current?.destroy()},[]),{generate:(0,u.useCallback)(async i=>{if(e.current){n({status:`parsing`,progress:10}),await new Promise(e=>setTimeout(e,300)),n({status:`generating`,progress:40}),await new Promise(e=>setTimeout(e,400));try{t.current||=new A(e.current),n({progress:70}),t.current.render(i),n({progress:100}),await new Promise(e=>setTimeout(e,200)),r({id:crypto.randomUUID(),parameters:{...i},createdAt:Date.now()}),n({status:`done`,progress:100})}catch(e){n({status:`error`,error:String(e)})}}},[e,n,r]),snapshot:(0,u.useCallback)(()=>t.current?.snapshot(),[])}}var M={cyberpunk:[`cyber`,`neon`,`city`,`urban`,`dystopia`,`tech`,`rain`,`tokyo`,`blade`],impressionist:[`impressi`,`monet`,`brush`,`stroke`,`light`,`garden`,`soft`],surreal:[`surreal`,`dream`,`dali`,`melting`,`strange`,`bizarre`,`fantasy`],minimalist:[`minimal`,`simple`,`clean`,`zen`,`sparse`,`empty`,`void`],abstract:[`abstract`,`chaos`,`pattern`,`geometric`,`fractal`,`shape`],"neon-noir":[`noir`,`dark`,`shadow`,`mystery`,`detective`,`crime`,`gritty`],cosmic:[`space`,`galaxy`,`star`,`nebula`,`cosmos`,`universe`,`planet`,`aurora`]},N={energetic:[`energi`,`power`,`explosion`,`fast`,`wild`,`intense`,`fire`],melancholic:[`sad`,`lonely`,`empty`,`melanchol`,`sorrow`,`rain`,`grey`],mysterious:[`mystery`,`secret`,`hidden`,`dark`,`unknown`,`mist`,`fog`],serene:[`calm`,`peace`,`still`,`quiet`,`gentle`,`soft`,`zen`],chaotic:[`chaos`,`wild`,`random`,`storm`,`turbulent`,`explosion`],ethereal:[`angel`,`heaven`,`light`,`glow`,`divine`,`spirit`,`float`,`cloud`]},P=[[[`red`,`fire`,`blood`,`rose`,`crimson`],0],[[`orange`,`sunset`,`warm`,`amber`],30],[[`yellow`,`gold`,`sun`,`bright`],55],[[`green`,`forest`,`nature`,`emerald`],120],[[`cyan`,`teal`,`ocean`,`aqua`],185],[[`blue`,`sky`,`water`,`ice`,`cold`],220],[[`violet`,`purple`,`lavender`,`magenta`],280],[[`pink`,`rose`,`blossom`,`cherry`],330]];function F(e,t){let n=e.toLowerCase();return Object.entries(t).map(([e,t])=>[e,t.reduce((e,t)=>e+ +!!n.includes(t),0)])}function I(e){let t=e.toLowerCase(),n=t.split(/\s+/),r=F(e,M).sort((e,t)=>t[1]-e[1])[0],i=r[1]>0?r[0]:void 0,a=F(e,N).sort((e,t)=>t[1]-e[1])[0],o=a[1]>0?a[0]:void 0,s=P.filter(([e])=>e.some(e=>t.includes(e))).map(([,e])=>e),c=Math.min(100,30+n.length*3);return{dominantColors:s.length?s:[260],suggestedStyle:i,suggestedMood:o,complexity:c,keywords:n.filter(e=>e.length>3)}}function L(e,t){let n={};return t.suggestedStyle&&(n.style=t.suggestedStyle),t.suggestedMood&&(n.mood=t.suggestedMood),t.dominantColors.length&&(n.hue=t.dominantColors[0]),n.complexity=Math.round((e.complexity+t.complexity)/2),n}var R=[`red`,`orange`,`golden`,`green`,`cyan`,`blue`,`violet`,`pink`,`white`,`crimson`],z={cyberpunk:[`cyberpunk city`,`neon rain`,`tokyo night`,`blade runner`],cosmic:[`deep space`,`galaxy spiral`,`nebula storm`,`aurora`],surreal:[`melting clocks`,`dreamscape`,`impossible geometry`,`dali vision`],minimalist:[`zen void`,`single light`,`empty horizon`,`pure form`],impressionist:[`golden sunset`,`monet garden`,`soft brushstrokes`,`warm light`],abstract:[`chaos waves`,`electric flow`,`fractal energy`,`color explosion`],"neon-noir":[`rainy detective`,`shadow figure`,`dark alley`,`film noir`]};function B(){let e=Object.keys(z),t=e[Math.floor(Math.random()*e.length)],n=z[t],r=n[Math.floor(Math.random()*n.length)];return{prompt:`${R[Math.floor(Math.random()*R.length)]} ${r}`,style:t}}function V(e,t=`nebula-art`){let n=new Date().toISOString().slice(0,19).replace(/[:T]/g,`-`),r=document.createElement(`a`);r.href=e,r.download=`${t}-${n}.png`,r.click()}function H(e){let t=document.createElement(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);return n.drawImage(e,0,0),n.font=`${Math.floor(t.width*.018)}px monospace`,n.fillStyle=`rgba(255,255,255,0.25)`,n.textAlign=`right`,n.fillText(`✦ NEBULA ART`,t.width-16,t.height-12),t.toDataURL(`image/png`)}var U={page:`_page_1puc5_36`,bgGrid:`_bgGrid_1puc5_43`,main:`_main_1puc5_52`,header:`_header_1puc5_69`,title:`_title_1puc5_73`,titleAccent:`_titleAccent_1puc5_87`,subtitle:`_subtitle_1puc5_92`,layout:`_layout_1puc5_106`,mobileTabs:`_mobileTabs_1puc5_125`,mobileTab:`_mobileTab_1puc5_125`,activeTab:`_activeTab_1puc5_153`,controls:`_controls_1puc5_159`,controlsHidden:`_controlsHidden_1puc5_166`,cardLabel:`_cardLabel_1puc5_171`,sliders:`_sliders_1puc5_179`,canvasSection:`_canvasSection_1puc5_185`,canvasHidden:`_canvasHidden_1puc5_192`,actions:`_actions_1puc5_197`,statsBar:`_statsBar_1puc5_208`};function W(){let e=(0,u.useRef)(null),{params:t,setParam:n,setParams:c,generatorState:d,currentArtwork:m,randomize:h}=s(),{addItem:_}=a(),{generate:v,snapshot:y}=j(e),[x,C]=(0,u.useState)(!1),T=d.status===`parsing`||d.status===`generating`,D=d.status===`done`,O=async()=>{if(!t.prompt.trim())return;let e=L(t,I(t.prompt));c(e),await v({...t,...e})},k=()=>{if(!m)return;let t=e.current?H(e.current):y();_({...m,thumbnail:t})},A=()=>{e.current&&V(H(e.current),`nebula-${t.style}`)};return(0,f.jsxs)(`div`,{className:U.page,children:[(0,f.jsx)(r,{}),(0,f.jsx)(`div`,{className:U.bgGrid}),(0,f.jsx)(l,{}),(0,f.jsxs)(`main`,{className:U.main,children:[(0,f.jsxs)(o.header,{className:U.header,initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.1},children:[(0,f.jsxs)(`h1`,{className:U.title,children:[(0,f.jsx)(`span`,{className:U.titleAccent,children:`✦`}),` NEBULA ART`]}),(0,f.jsx)(`p`,{className:U.subtitle,children:`AI-driven generativ konstgenerator`})]}),(0,f.jsxs)(`div`,{className:U.layout,children:[(0,f.jsxs)(o.aside,{className:U.controls,initial:{opacity:0,x:-24},animate:{opacity:1,x:0},transition:{duration:.5,delay:.2},children:[(0,f.jsxs)(p,{glow:`cyan`,children:[(0,f.jsx)(`p`,{className:U.cardLabel,children:`PROMPT`}),(0,f.jsx)(g,{value:t.prompt,onChange:e=>n(`prompt`,e),onGenerate:O})]}),(0,f.jsxs)(p,{glow:`violet`,children:[(0,f.jsx)(`p`,{className:U.cardLabel,children:`STIL & MOOD`}),(0,f.jsx)(b,{selectedStyle:t.style,selectedMood:t.mood,onStyleChange:e=>n(`style`,e),onMoodChange:e=>n(`mood`,e)})]}),(0,f.jsxs)(p,{children:[(0,f.jsx)(`p`,{className:U.cardLabel,children:`PARAMETRAR`}),(0,f.jsxs)(`div`,{className:U.sliders,children:[(0,f.jsx)(S,{label:`Nyans (Hue)`,value:t.hue,min:0,max:360,onChange:e=>n(`hue`,e),color:`cyan`,unit:`°`}),(0,f.jsx)(S,{label:`Komplexitet`,value:t.complexity,onChange:e=>n(`complexity`,e),color:`magenta`}),(0,f.jsx)(S,{label:`Animationsintensitet`,value:t.animationIntensity,onChange:e=>n(`animationIntensity`,e),color:`violet`}),(0,f.jsx)(S,{label:`Mättnad`,value:t.saturation,onChange:e=>n(`saturation`,e),color:`gold`}),(0,f.jsx)(S,{label:`Ljusstyrka`,value:t.brightness,onChange:e=>n(`brightness`,e),color:`cyan`})]})]})]}),(0,f.jsxs)(o.section,{className:U.canvasSection,initial:{opacity:0,x:24},animate:{opacity:1,x:0},transition:{duration:.5,delay:.3},children:[(0,f.jsx)(w,{canvasRef:e}),(0,f.jsxs)(`div`,{className:U.actions,children:[(0,f.jsx)(i,{color:`cyan`,size:`lg`,onClick:O,loading:T,disabled:!t.prompt.trim(),children:T?`Genererar...`:`✦ Generera`}),(0,f.jsx)(i,{color:`violet`,variant:`outline`,onClick:()=>{let{prompt:e,style:t}=B();h(),c({style:t,prompt:e})},disabled:T,children:`◈ Surprise Me`}),D&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(i,{color:`magenta`,variant:`outline`,onClick:k,children:`◎ Spara`}),(0,f.jsx)(i,{color:`gold`,variant:`outline`,onClick:A,children:`↓ PNG`}),(0,f.jsx)(i,{color:`cyan`,variant:`ghost`,onClick:()=>C(!0),children:`⊕ Fullscreen`})]})]}),D&&(0,f.jsxs)(o.div,{className:U.statsBar,initial:{opacity:0,y:10},animate:{opacity:1,y:0},children:[(0,f.jsxs)(`span`,{children:[`Stil: `,(0,f.jsx)(`b`,{children:t.style})]}),(0,f.jsxs)(`span`,{children:[`Mood: `,(0,f.jsx)(`b`,{children:t.mood})]}),(0,f.jsxs)(`span`,{children:[`Hue: `,(0,f.jsxs)(`b`,{children:[t.hue,`°`]})]}),(0,f.jsxs)(`span`,{children:[`Komplexitet: `,(0,f.jsx)(`b`,{children:t.complexity})]})]})]})]})]}),x&&D&&(0,f.jsx)(E,{thumbnailUrl:e.current?e.current.toDataURL(`image/png`):``,artStyle:t.style,artMood:t.mood,prompt:t.prompt,onClose:()=>C(!1),onExport:A})]})}export{W as default};
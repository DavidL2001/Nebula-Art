import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGeneratorStore } from '../../store';

// ─── Particle system ─────────────────────────────────────────────
function Particles({ count = 1800 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const { params, generatorState } = useGeneratorStore();

  // Build positions + random data once
  const { positions, randoms, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const randoms   = new Float32Array(count);
    const speeds    = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      randoms[i]  = Math.random();
      speeds[i]   = 0.2 + Math.random() * 0.8;
    }
    return { positions, randoms, speeds };
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t   = clock.getElapsedTime();
    const ix  = params.animationIntensity / 100;
    const cx  = params.complexity / 100;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    const isDone = generatorState.status === 'done';

    for (let i = 0; i < count; i++) {
      const r   = randoms[i];
      const spd = speeds[i];
      const base = i * 3;

      // Drift upward slowly, wrap
      pos[base + 1] += spd * ix * 0.012 * (isDone ? 1.6 : 1.0);
      if (pos[base + 1] > 8.5) pos[base + 1] = -8.5;

      // Lateral sine wave
      pos[base] += Math.sin(t * spd * 0.4 + r * Math.PI * 2) * 0.004 * ix * (1 + cx);

      // Gentle z pulse when art is done
      if (isDone) {
        pos[base + 2] += Math.sin(t * spd * 0.3 + r * 6.28) * 0.006 * ix;
        pos[base + 2] = Math.max(-5, Math.min(5, pos[base + 2]));
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;

    // Slow rotation always, faster when generating
    const rotSpeed = generatorState.status === 'generating' ? 0.06 : 0.018;
    mesh.current.rotation.y += rotSpeed * ix * 0.01;
    mesh.current.rotation.x += rotSpeed * ix * 0.004;
  });

  // Hue → color
  const hsl = new THREE.Color();
  hsl.setHSL(params.hue / 360, 0.85, 0.65);

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color={hsl}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Connecting lines between nearby particles ────────────────────
function ParticleLines({ count = 220 }: { count?: number }) {
  const mesh = useRef<THREE.LineSegments>(null);
  const { params } = useGeneratorStore();

  const { positions } = useMemo(() => {
    const positions = new Float32Array(count * 6); // 2 pts per line
    for (let i = 0; i < count; i++) {
      const spread = 12;
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread * 0.6;
      const z = (Math.random() - 0.5) * 6;
      const len = 0.3 + Math.random() * 1.5;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 6]     = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;
      positions[i * 6 + 3] = x + Math.cos(angle) * len;
      positions[i * 6 + 4] = y + Math.sin(angle) * len;
      positions[i * 6 + 5] = z;
    }
    return { positions };
  }, [count]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t  = clock.getElapsedTime();
    const ix = params.animationIntensity / 100;
    mesh.current.rotation.z = Math.sin(t * 0.07) * 0.04 * ix;
    mesh.current.material instanceof THREE.LineBasicMaterial &&
      (mesh.current.material.opacity = 0.08 + Math.sin(t * 0.5) * 0.04);
  });

  const hsl = new THREE.Color();
  hsl.setHSL((params.hue + 30) / 360, 0.7, 0.6);

  return (
    <lineSegments ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        color={hsl}
        transparent
        opacity={0.1}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

// ─── Floating orbs (large soft glows) ────────────────────────────
function FloatingOrbs() {
  const group = useRef<THREE.Group>(null);
  const { params } = useGeneratorStore();

  const orbs = useMemo(() => Array.from({ length: 5 }, () => ({
    x: (Math.random() - 0.5) * 18,
    y: (Math.random() - 0.5) * 10,
    z: -3 - Math.random() * 4,
    r: 0.2 + Math.random() * 0.5,
    phase: Math.random() * Math.PI * 2,
    speed: 0.15 + Math.random() * 0.25,
  })), []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t  = clock.getElapsedTime();
    const ix = params.animationIntensity / 100;
    group.current.children.forEach((child, i) => {
      const o = orbs[i];
      child.position.y = o.y + Math.sin(t * o.speed + o.phase) * 0.8 * ix;
      child.position.x = o.x + Math.cos(t * o.speed * 0.7 + o.phase) * 0.5 * ix;
      const mesh = child as THREE.Mesh;
      if (mesh.material instanceof THREE.MeshBasicMaterial) {
        mesh.material.opacity = 0.04 + Math.sin(t * o.speed + o.phase) * 0.02;
      }
    });
  });

  return (
    <group ref={group}>
      {orbs.map((o, i) => {
        const hsl = new THREE.Color();
        hsl.setHSL((params.hue / 360 + i * 0.13) % 1, 0.9, 0.6);
        return (
          <mesh key={i} position={[o.x, o.y, o.z]}>
            <sphereGeometry args={[o.r * 4, 16, 16]} />
            <meshBasicMaterial
              color={hsl}
              transparent
              opacity={0.05}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// ─── Scene wrapper ────────────────────────────────────────────────
function Scene() {
  const { params } = useGeneratorStore();
  const cx = params.complexity / 100;

  return (
    <>
      <Particles count={Math.floor(1200 + cx * 1000)} />
      <ParticleLines count={Math.floor(150 + cx * 150)} />
      <FloatingOrbs />
    </>
  );
}

// ─── Exported component ───────────────────────────────────────────
export default function ParticleBackground() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

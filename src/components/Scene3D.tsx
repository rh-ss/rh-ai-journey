import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function Particles() {
  const meshRef = useRef<THREE.Points>(null!);
  const count = 1200;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const purpleR = 0.486, purpleG = 0.228, purpleB = 0.929;
    const blueR = 0.231, blueG = 0.510, blueB = 0.965;
    const cyanR = 0.024, cyanG = 0.714, cyanB = 0.831;

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;

      const t = Math.random();
      if (t < 0.33) {
        col[i * 3] = purpleR; col[i * 3 + 1] = purpleG; col[i * 3 + 2] = purpleB;
      } else if (t < 0.66) {
        col[i * 3] = blueR; col[i * 3 + 1] = blueG; col[i * 3 + 2] = blueB;
      } else {
        col[i * 3] = cyanR; col[i * 3 + 1] = cyanG; col[i * 3 + 2] = cyanB;
      }
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.015;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    meshRef.current.rotation.x += state.pointer.y * 0.005;
    meshRef.current.rotation.y += state.pointer.x * 0.005;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function WireframeShapes() {
  const torusRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.15;
      torusRef.current.rotation.y = t * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh ref={torusRef} position={[4, 1, -3]}>
        <torusGeometry args={[1.2, 0.15, 16, 40]} />
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.2} />
      </mesh>
    </Float>
  );
}

function GlowOrbs() {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.04;
    group.current.children.forEach((child, i) => {
      child.position.y += Math.sin(state.clock.elapsedTime * 0.4 + i * 1.5) * 0.002;
    });
  });

  const orbs = useMemo(() => [
    { pos: [3.5, 0.5, -2] as [number, number, number], color: '#7c3aed', scale: 0.8 },
    { pos: [-4.5, 1.5, -3] as [number, number, number], color: '#3b82f6', scale: 0.5 },
    { pos: [0, -1, -5] as [number, number, number], color: '#06b6d4', scale: 0.6 },
  ], []);

  return (
    <group ref={group}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.pos} scale={orb.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color={orb.color} transparent opacity={0.08} />
        </mesh>
      ))}
    </group>
  );
}

export default function Scene3D() {
  // Disable 3D on low-end mobile devices to avoid gray background
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) {
    return (
      <div className="absolute inset-0 z-0 bg-background">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 50% 40%, hsl(260 100% 65% / 0.15), transparent 60%), radial-gradient(ellipse at 80% 20%, hsl(220 100% 60% / 0.1), transparent 50%), radial-gradient(ellipse at 20% 80%, hsl(175 100% 50% / 0.08), transparent 50%)',
        }} />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.15} />
        <Particles />
        <WireframeShapes />
        <GlowOrbs />
      </Canvas>
    </div>
  );
}

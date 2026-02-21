import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGrid() {
  const ref = useRef<THREE.Points>(null!);
  const count = 400;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const grid = Math.sqrt(count);
    for (let i = 0; i < count; i++) {
      const x = (i % grid) / grid * 10 - 5;
      const z = Math.floor(i / grid) / grid * 10 - 5;
      pos[i * 3] = x;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const posArray = ref.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;
    const grid = Math.sqrt(count);
    for (let i = 0; i < count; i++) {
      const x = (i % grid) / grid * 10 - 5;
      const z = Math.floor(i / grid) / grid * 10 - 5;
      posArray[i * 3 + 1] = Math.sin(x * 0.5 + t * 0.5) * Math.cos(z * 0.5 + t * 0.3) * 0.5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = t * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#7c3aed" transparent opacity={0.4} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function RotatingWireframe({ color, shape }: { color: string; shape: 'torus' | 'dodeca' | 'ico' }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.1;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh ref={ref}>
        {shape === 'torus' && <torusKnotGeometry args={[1, 0.3, 100, 16]} />}
        {shape === 'dodeca' && <dodecahedronGeometry args={[1.2, 0]} />}
        {shape === 'ico' && <icosahedronGeometry args={[1, 1]} />}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.15} />
      </mesh>
    </Float>
  );
}

interface MiniScene3DProps {
  variant: 'grid' | 'torusKnot' | 'dodeca' | 'ico';
  className?: string;
}

export default function MiniScene3D({ variant, className = '' }: MiniScene3DProps) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.1} />
        {variant === 'grid' && <FloatingGrid />}
        {variant === 'torusKnot' && <RotatingWireframe color="#7c3aed" shape="torus" />}
        {variant === 'dodeca' && <RotatingWireframe color="#3b82f6" shape="dodeca" />}
        {variant === 'ico' && <RotatingWireframe color="#06b6d4" shape="ico" />}
      </Canvas>
    </div>
  );
}

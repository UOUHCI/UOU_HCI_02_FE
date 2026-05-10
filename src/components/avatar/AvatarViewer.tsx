import { Html, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, type ReactElement } from 'react';
import type { ClothingColors, ClothingVisibility } from '../../types/avatar';
import { AvatarModel } from './AvatarModel';

type AvatarViewerProps = {
  visibility: ClothingVisibility;
  colors: ClothingColors;
};

export const AvatarViewer = ({ visibility, colors }: AvatarViewerProps): ReactElement => (
  <div className="h-full w-full overflow-hidden bg-[#f7f7f7]">
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.2, 4.8], fov: 34 }}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={['#f7f7f7']} />
      <ambientLight intensity={0.9} />
      <directionalLight castShadow position={[3.5, 5, 2.5]} intensity={1.35} />
      <Suspense
        fallback={
          <Html center className="whitespace-nowrap text-sm font-bold text-neutral-500">
            아바타 로딩 중
          </Html>
        }
      >
        <AvatarModel visibility={visibility} colors={colors} />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]}>
          <circleGeometry args={[1.2, 64]} />
          <shadowMaterial transparent opacity={0.16} />
        </mesh>
      </Suspense>
      <OrbitControls
        enableDamping
        enablePan={false}
        target={[0, 0.03, 0]}
        minDistance={2.6}
        maxDistance={6}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.75}
      />
    </Canvas>
  </div>
);

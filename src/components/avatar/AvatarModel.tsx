import { useGLTF } from '@react-three/drei';
import { useEffect, useLayoutEffect, useMemo, useRef, type ReactElement } from 'react';
import { Box3, Color, Vector3, type Group, type Material, type Object3D } from 'three';
import type { ClothingColors, ClothingKey, ClothingVisibility } from '../../types/avatar';

type AvatarModelProps = {
  visibility: ClothingVisibility;
  colors: ClothingColors;
};

const meshNames: Record<ClothingKey, string[]> = {
  tanktop: ['Tanktop'],
  shorts: ['Shorts'],
};

const findNode = (nodes: Record<string, Object3D>, names: string[]): Object3D | null => {
  for (const name of names) {
    if (nodes[name]) {
      return nodes[name];
    }
  }

  return null;
};

const tintMaterial = (material: Material, color: string): Material => {
  const nextMaterial = material.clone() as Material & {
    color?: Color;
    roughness?: number;
    metalness?: number;
  };

  if (nextMaterial.color instanceof Color) {
    nextMaterial.color.set(color);
  }

  if (typeof nextMaterial.roughness === 'number') {
    nextMaterial.roughness = 0.72;
  }

  if (typeof nextMaterial.metalness === 'number') {
    nextMaterial.metalness = 0.02;
  }

  return nextMaterial;
};

const tintNode = (node: Object3D, color: string): void => {
  node.traverse((child) => {
    const mesh = child as Object3D & { material?: Material | Material[] };

    if (!mesh.material) {
      return;
    }

    mesh.material = Array.isArray(mesh.material)
      ? mesh.material.map((material) => tintMaterial(material, color))
      : tintMaterial(mesh.material, color);
  });
};

export const AvatarModel = ({ visibility, colors }: AvatarModelProps): ReactElement => {
  const groupRef = useRef<Group>(null);
  const { nodes, scene } = useGLTF('/avatar/avatar.glb');

  useEffect(() => {
    console.log(nodes);
  }, [nodes]);

  const parts = useMemo(
    () =>
      (Object.keys(meshNames) as ClothingKey[]).map((key) => ({
        key,
        node: findNode(nodes as Record<string, Object3D>, meshNames[key]),
      })),
    [nodes],
  );

  useEffect(() => {
    parts.forEach(({ key, node }) => {
      if (node) {
        node.visible = visibility[key];
      }
    });
  }, [parts, visibility]);

  useEffect(() => {
    scene.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });

    parts.forEach(({ key, node }) => {
      if (node) {
        tintNode(node, colors[key]);
      }
    });
  }, [colors, parts, scene]);

  useLayoutEffect(() => {
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    const scale = size.y > 0 ? 2.35 / size.y : 1;

    scene.position.set(-center.x, -box.min.y, -center.z);
    groupRef.current?.scale.setScalar(scale);
  }, [scene]);

  return (
    <group ref={groupRef} position={[0, -1.18, 0]} dispose={null}>
      <primitive object={scene} />
    </group>
  );
};

useGLTF.preload('/avatar/avatar.glb');

import '@react-three/drei';
import { Object3D } from 'three';

type Slice1<T> = T extends [unknown, ...infer R] ? R : never;

declare module '@react-three/drei' {
  function useHelper<T extends new (...args: any[]) => any>(
    object3D: React.MutableRefObject<Object3D | null>,
    helperConstructor: T,
    ...args: Slice1<ConstructorParameters<T>>
  ): React.MutableRefObject<Helper | undefined>;
}

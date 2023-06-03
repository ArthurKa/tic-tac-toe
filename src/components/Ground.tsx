import { groundColor } from '../constants';

export const Ground: React.FC = () => {
  return (
    <mesh {...{
      'rotation-x': -Math.PI / 2,
      receiveShadow: true,
    }}
    >
      <planeGeometry {...{ args: [300, 300] }} />
      <meshStandardMaterial {...{ color: groundColor }} />
    </mesh>
  );
};

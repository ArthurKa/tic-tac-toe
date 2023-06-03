import { cupColor1, cupColor2 } from '../constants';
import { bigCupOuterDiameter, Cup, CupProps, cupSizeMultiplier } from './Cup';

export const Cups: React.FC = () => {
  const gap = 0.1;

  const getSideCupX = (size: CupProps['size']) => (
    bigCupOuterDiameter * cupSizeMultiplier[size] + gap
  );
  const getCupY = (size: CupProps['size']) => {
    const k = {
      big: 1,
      medium: 0,
      small: -1,
    } satisfies Record<typeof size, number>;

    return k[size] * (bigCupOuterDiameter * (cupSizeMultiplier[size] + cupSizeMultiplier.medium) / 2 + gap);
  };

  const cupColors = [cupColor1, cupColor2] as const;
  const sizes = ['big', 'medium', 'small'] satisfies Array<CupProps['size']>;

  return (
    <>
      {
        cupColors.map((color, i) => {
          const k = (-1) ** (i + 1);

          return (
            <group {...{
              key: i,
              position: [k, 0, 4.5 * -k],
              scale: [1, 1, -k],
            }}
            >
              {
                sizes.flatMap((size, i) => (
                  Array.from({ length: 3 }, (_, j) => (
                    <Cup {...{
                      key: `${i}-${j}`,
                      size,
                      color,
                      position: [getSideCupX(size) * (j - 1), getCupY(size)],
                    }}
                    />
                  ))
                ))
              }
            </group>
          );
        })
      }
    </>
  );
};

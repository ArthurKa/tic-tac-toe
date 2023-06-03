import { Stats } from '@react-three/drei';
import { NODE_ENV } from '../envVariables';

export const DevHelpers: React.FC = () => (
  <>
    {NODE_ENV !== 'production' && <Stats />}
    {
      NODE_ENV === 'development' && (
        <>
          <axesHelper {...{ args: [10] }} />
          <gridHelper {...{ args: [20, 20] }} />
        </>
      )
    }
  </>
);

import 'ldrs/orbit';
import { orbit } from 'ldrs';

export const Loading = () => {
  orbit.register();

  // @ts-expect-error
  return <l-orbit color="white" size="35" speed="1.5"></l-orbit>;
};

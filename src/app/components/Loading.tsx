import 'ldrs/orbit';
import { orbit } from 'ldrs';

export const Loading = () => {
  orbit.register();

  // @ts-expect-error - works but types are not defined correctly have to correct it.
  return <l-orbit color="white" size="35" speed="1.5"></l-orbit>;
};

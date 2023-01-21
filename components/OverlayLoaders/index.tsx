// @ts-nocheck
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';

export default function OverlayLoaders({ active = false, children }: any) {
  return (
    <LoadingOverlay active={active} spinner={<BounceLoader />}>
      {children}
    </LoadingOverlay>
  );
}

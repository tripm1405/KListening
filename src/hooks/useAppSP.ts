import { useSearchParams } from 'next/navigation';
import { KObj } from '@krotohmi/k-ts';

const useAppSP = <IParams extends KObj>(params: IParams) => {
  const sp = useSearchParams();
  return Object.keys(params).reduce((r, c) => ({
    ...r,
    [c]: sp.get(c) ?? params[c],
  }), {} as IParams);
};

export default useAppSP;

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { KObj } from '@krotohmi/k-ts';

type Primitive = string | number | boolean | bigint | symbol | null | undefined;

type DataParseRecurse<T> =
  [T] extends [Primitive]
    ? string | null
    : { [K in keyof T]-?: DataParseRecurse<T[K]> } | null;

type DataParse<T> = {
  [K in keyof T]-?: DataParseRecurse<T[K]>;
}

const useAppSP = <T extends KObj>(format: (data: DataParse<T>) => T): T => {
  const sp = useSearchParams();

  const data = React.useMemo(() => {
    const res = {} as DataParse<T>;
    sp.forEach((value, key) => {
      const keys = key.match(/[^\[\]]+/g) as string[];
      let tmp: KObj = res;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!tmp[k]) tmp[k] = {};
        tmp = tmp[k] as KObj;
      }
      tmp[keys[keys.length - 1]] = value === null ? undefined : value;
    });
    return res;
  }, [sp]);

  return format?.(data);
};

export default useAppSP;

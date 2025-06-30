'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAppSelector from '~/redux/hooks/useAppSelector';
import RouterUtil from '~/utils/router.util';

interface IProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: IProps) => {
  const router = useRouter();
  const { profile } = useAppSelector((e) => e.identity);

  useEffect(() => {
    if (profile === undefined || profile !== null) return;
    router.push(RouterUtil.genSignIn());
  }, [router, profile]);

  return children;
};

export default AuthProvider;
'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { KSignInPage } from @krotohmi/k-client';
import RouterUtil from '~/utils/router.util';

const SignInPage = () => {
  const router = useRouter();

  return (
    <KSignInPage
      onSuccess={() => {
        router.push(RouterUtil.genHome());
      }}
    />
  );
};

export default SignInPage;

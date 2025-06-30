'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { KSignUpPage } from @krotohmi/k-client';
import RouterUtil from '~/utils/router.util';

const SignUpPage = () => {
  const router = useRouter();

  return (
    <KSignUpPage
      onSuccess={() => {
        router.push(RouterUtil.genHome());
      }}
    />
  );
};

export default SignUpPage;

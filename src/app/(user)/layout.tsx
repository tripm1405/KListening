'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { KLayout } from 'k-client';
import { ILayoutProps } from '~/app.type';
import { Menu, MenuProps } from 'antd';
import RouterUtil from '~/utils/router.util';
import AuthProvider from '~/app/Auth.Provider';

const SiderMenu = [
  { label: 'Group', key: 'Group' },
] as const satisfies MenuProps['items'];

type SiderMenuKey = (typeof SiderMenu)[number]['key'];

const SiderMenuPaths: Record<SiderMenuKey, string> = {
  Group: RouterUtil.Group.genList(),
};

const UserLayout = ({ children }: ILayoutProps) => {
  const router = useRouter();

  return (
    <AuthProvider>
      <KLayout
        header={{
          actions: [
            // ToDo: remove key
            <KLayout.UserButton
              key={0}
              items={[]}
              signOutSuccess={() => router.push(RouterUtil.genHome())}
              onClick={() => {}}
            />,
            <KLayout.LanguageButton key={1} />,
          ],
        }}
        siderMenu={
          <Menu
            mode="inline"
            theme={'dark'}
            className={'h-full border-r-0 overflow-auto'}
            items={SiderMenu}
            onClick={({ key }) =>
              router.push(SiderMenuPaths[key as SiderMenuKey])
            }
          />
        }
        onManagerRedirect={() => {}}
      >
        {children}
      </KLayout>
    </AuthProvider>
  );
};

export default UserLayout;

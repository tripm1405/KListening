'use client';

import React from 'react';
import { KButton, KFlex, KTable } from '@krotohmi/k-react';
import { GroupQueryKey } from '~/modules/group/group.constant';
import GroupApi, { GroupUrl } from '~/modules/group/group.api';
import KTs from '@krotohmi/k-ts';
import { IGroup } from '~/modules/group/group.type';
import { useRouter } from 'next/navigation';
import RouterUtil from '~/utils/router.util';
import { KTranslation, useKClientContext } from 'k-client';
import TranslationUtil from '~/utils/translation.util';
import { useQueryClient } from '@tanstack/react-query';

const GroupListPage = () => {
  const router = useRouter();
  const { handleApi } = useKClientContext();
  const query = useQueryClient();

  const callDel = async (id: string) => {
    const data = await handleApi(GroupApi.del(id));

    if (!data.success) return;

    await query.refetchQueries({
      queryKey: [GroupQueryKey.List],
    });
  };

  return (
    <KFlex vertical>
      <KFlex>
        <KButton.Create
          onClick={() => router.push(RouterUtil.Group.genCreation())}
        />
      </KFlex>
      <KTable.Api<IGroup>
        query={{
          queryKey: [GroupQueryKey.List],
        }}
        request={{
          url: GroupUrl.genList(),
        }}
        columns={[
          {
            key: KTs.nameof<IGroup>((e) => e.name),
            dataIndex: KTs.nameof<IGroup>((e) => e.name),
            title: (
              <KTranslation
                code={TranslationUtil.genCode<IGroup>('Group', 'name')}
              />
            ),
          },
          {
            width: 80,
            render: (rowData: IGroup) => (
              <KFlex>
                <KButton.Detail
                  onClick={() =>
                    router.push(RouterUtil.Group.genDetail(rowData.id))
                  }
                />
                <KButton.Delete onClick={() => callDel(rowData.id)} />
              </KFlex>
            ),
          },
        ]}
        className={'w-full'}
      />
    </KFlex>
  );
};

export default GroupListPage;

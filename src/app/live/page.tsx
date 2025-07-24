import React from 'react';
import { liveIndex } from '@/api/live';
import type { ResponseType } from '@/types';
import Header from './header/Header';
import LiveBanner from './banner/Banner';
import Live from './Live';
import styles from './page.module.scss';

const props = {
  banner: [],
  list: []
};

const getLiveIndex = async (): Promise<void> => {
  const res: ResponseType = await liveIndex();
  if (res?.code !== 0) {
    return;
  }

  props.banner = res.data?.module_list?.[0]?.list ?? [];
  props.list = res.data?.module_list?.slice?.(1) ?? [];
};

async function Page(): Promise<React.ReactElement> {
  await getLiveIndex();

  return (
    <div className={styles.page}>
      <Header />
      <LiveBanner list={props.banner} />
      <Live list={props.list} />
    </div>
  );
}

export default Page;

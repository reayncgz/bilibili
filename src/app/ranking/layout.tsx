import { rankNav } from '@/api/ranking';
import type { ResponseType } from '@/types';
import Header from './header/Header';
import styles from './layout.module.scss';

const props = {
  tabbar: []
};

const getTabBar = async (): Promise<void> => {
  const res: ResponseType = await rankNav();
  if (res?.code !== 0) {
    return;
  }

  props.tabbar = res.data ?? [];
};

async function Layout({ children }: { children: React.ReactNode }) {
  await getTabBar();

  return (
    <div className={styles.layout}>
      <Header list={props.tabbar} />
      {children}
    </div>
  );
}

export default Layout;

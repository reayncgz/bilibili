import React from 'react';
import { videoDetail, videoPlayurl, videoRecommend, videoComment } from '@/api/video';
import type { ResponseType } from '@/types';
import Header from '@/components/header/Header';
import VideoPlayer from './player/Player';
import VideoDetail from './VideoDetail';
import VideoRecommend from './recommend/Recommend';
import VideoComment from './comment/Comment';

type SearchParams = Promise<{ aid: string }>;

const props = {
  detail: {
    cid: undefined
  },
  url: '',
  recommend: [],
  comment: {
    replies: [],
    count: 0
  }
};

const getVideoDetail = async ({ aid }: { aid: string }): Promise<void> => {
  const res: ResponseType = await videoDetail({ aid });
  if (res?.code !== 0) {
    return;
  }

  props.detail = res.data ?? {};
};

const getVideoPlayurl = async ({ aid }: { aid: string }): Promise<void> => {
  const res: ResponseType = await videoPlayurl({ aid, cid: props.detail.cid });
  if (res?.code !== 0) {
    return;
  }

  props.url = res.data?.durl?.[0]?.url ?? '';
};

const getVideoRecommend = async ({ aid }: { aid: string }): Promise<void> => {
  const res: ResponseType = await videoRecommend({ aid });
  if (res?.code !== 0) {
    return;
  }

  props.recommend = res.data?.slice?.(0, 4) ?? [];
};

const getVideoComment = async ({ aid }: { aid: string }): Promise<void> => {
  const res: ResponseType = await videoComment({ aid, page: 1 });
  if (res?.code !== 0) {
    return;
  }

  props.comment.count = res.data?.page?.count ?? 0;
  props.comment.replies = res.data?.replies ?? [];
};

async function Page({ searchParams }: { searchParams: SearchParams }) {
  const { aid } = await searchParams;
  await getVideoDetail({ aid });
  await getVideoPlayurl({ aid });
  await getVideoRecommend({ aid });
  await getVideoComment({ aid });

  return (
    <>
      <Header />
      <VideoPlayer url={props.url} detail={props.detail} />
      <VideoDetail detail={props.detail} />
      <VideoRecommend list={props.recommend} />
      <VideoComment list={props.comment.replies} count={props.comment.count} />
    </>
  );
}

export default Page;

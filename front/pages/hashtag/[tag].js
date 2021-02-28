import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import {
  loadHashtagPostsRequestAction,
  loadUserPostsRequestAction
} from '../../reducers/post';
import PostCard from '../../components/PostCard';
import AppLayout from '../../components/AppLayout';
import wrapper from '../../store/configureStore';
import {
  loadMyInfoRequestAction,
  loadUserRequestAction
} from '../../reducers/user';

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );
  const { userInfo, me } = useSelector((state) => state.user);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch(
            loadUserPostsRequestAction(
              tag,
              mainPosts[mainPosts.length - 1] &&
                mainPosts[mainPosts.length - 1].id
            )
          );
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePosts, tag, loadPostsLoading]);

  return (
    <AppLayout>
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch(loadMyInfoRequestAction());
    context.store.dispatch(loadHashtagPostsRequestAction(context.params.tag));
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Hashtag;

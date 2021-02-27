import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import {
  loadFollowersRequestAction,
  loadFollowingsRequestAction,
  loadMyInfoRequestAction
} from '../reducers/user';
import wrapper from '../store/configureStore';
import { loadPostsRequestAction } from '../reducers/post';

const Profile = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadFollowersRequestAction());
    dispatch(loadFollowingsRequestAction());
  }, []);

  const router = useRouter();
  useEffect(() => {
    if (!(me && me.id)) {
      router.push('/');
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={me.Followings} />
        <FollowList header="팔로워" data={me.Followers} />
      </AppLayout>
    </>
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
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default Profile;

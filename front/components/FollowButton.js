import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { followRequestAction, unFollowRequestAction } from '../reducers/user';

const FollowButton = ({ post }) => {
  const dispatch = useDispatch();
  const {
    me,
    followLoadingId,
    followLoading,
    unFollowLoadingId,
    unFollowLoading
  } = useSelector((state) => state.user);
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);
  const onClickButton = useCallback(() => {
    if (isFollowing) {
      dispatch(unFollowRequestAction(post.User.id));
    } else {
      dispatch(followRequestAction(post.User.id));
    }
  });
  return (
    <Button
      loading={
        (post.User.id === followLoadingId && followLoading) ||
        (post.User.id === unFollowLoadingId && unFollowLoading)
      }
      onClick={onClickButton}
    >
      {isFollowing ? '언팔로우' : '팔로우'}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.shape({
      id: PropTypes.number,
      nickname: PropTypes.string
    }),
    content: PropTypes.string,
    Image: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string
      })
    ),
    Comments: PropTypes.arrayOf(
      PropTypes.shape({
        User: PropTypes.shape({
          id: PropTypes.number,
          nickname: PropTypes.string
        }),
        content: PropTypes.string
      })
    )
  }).isRequired
};

export default FollowButton;

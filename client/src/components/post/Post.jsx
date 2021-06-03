import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/posts';
import { PostItem } from '../posts/PostItem';
import CommentItem from '../post/CommentItem';

import { useHistory } from 'react-router-dom';
import CommentForm from './CommentForm';

export const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  let history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <button onClick={goToPreviousPath} className='btn btn-light'>
        Back to post
      </button>
      <PostItem post={post} showActions={false}></PostItem>
      <CommentForm postId={post._id}></CommentForm>
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

const mapDispatchToProps = {
  getPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);

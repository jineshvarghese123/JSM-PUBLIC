import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { addLike, removeLike, deletePost } from '../../actions/posts';
export const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  addLike,
  removeLike,
  deletePost,
  showActions,
}) => {
  return (
    <Fragment>
      <div className='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profile/${user}`}>
            <img className='round-img' src={avatar} alt='' />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p className='my-1'>{text}</p>
          <p className='post-date'>
            Posted on {<Moment format='DD/MM/YYYY '>{date}</Moment>}
          </p>
          {showActions && (
            <Fragment>
              <button
                onClick={(e) => {
                  addLike(_id);
                }}
                type='button'
                className='btn btn-light'
              >
                <i className='fas fa-thumbs-up'></i>
                {likes.length > 0 && <span>{likes.length}</span>}
              </button>
              <button
                onClick={(e) => {
                  removeLike(_id);
                }}
                type='button'
                className='btn btn-light'
              >
                <i className='fas fa-thumbs-down'></i>
              </button>
              <Link to={`/posts/${_id}`} className='btn btn-primary'>
                Discussion{' '}
                {comments.length > 0 && (
                  <span className='comment-count'>{comments.length}</span>
                )}
              </Link>
              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={(e) => {
                    deletePost(_id);
                  }}
                  type='button'
                  className='btn btn-danger'
                >
                  <i className='fas fa-times'></i>
                </button>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object,
  addLike: PropTypes.func,
  removeLike: PropTypes.func,
  deletePost: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  addLike,
  removeLike,
  deletePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);

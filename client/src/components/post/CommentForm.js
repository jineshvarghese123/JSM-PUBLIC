import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/posts';
import { Fragment } from 'react';

export const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <Fragment>
      <div className='post-form'>
        <div className='bg-primary p'>
          <h3>Leave Comment</h3>
        </div>
        <form
          className='form my-1'
          onSubmit={(e) => {
            e.preventDefault();
            addComment(postId, { text });
            setText('');
          }}
        >
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='post a comment'
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <input type='submit' className='btn btn-dark my-1' value='Submit' />
        </form>
      </div>
    </Fragment>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  addComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);

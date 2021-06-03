import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

export const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description },
}) => {
  return (
    <div>
      <h3 className='text-dark'>{school}</h3>
      <p>
        {<Moment format='MM YYYY'>{from}</Moment>} -{' '}
        {current ? 'Now' : to && <Moment format='MM YYYY'>{to}</Moment>}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({});

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(ProfileEducation);

import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

export const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => {
  return (
    <div>
      <h3 className='text-dark'>{company}</h3>
      <p>
        {<Moment format='MM YYYY'>{from}</Moment>} -{' '}
        {current ? 'Now' : to && <Moment format='MM YYYY'>{to}</Moment>}
      </p>
      <p>
        <strong>Location: </strong>
        {location}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({});
ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(ProfileExperience);

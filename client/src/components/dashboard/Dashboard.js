import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary-custom'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions></DashboardActions>
          <Experience experience={profile.experience}></Experience>
          <Education education={profile.education}></Education>
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus'></i>Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>you have not setup a profile,please add some info</p>
          <Link to='/create-profile' className='btn btn-primary-custom my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);

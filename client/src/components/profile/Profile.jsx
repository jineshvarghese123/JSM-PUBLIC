import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { Link, useHistory } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';

export const Profile = ({
  getProfileById,
  match,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);

  let history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner></Spinner>
      ) : (
        <Fragment>
          {/* <Link to='/profiles' className='btn btn-light'>
            Back to Profile
          </Link> */}
          <button onClick={goToPreviousPath} className='btn btn-light'>
            {' '}
            Back
          </button>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>

              {profile.experience.length > 0 ? (
                <Fragment>
                  <div className='posts'>
                    {profile.experience.map((exp) => (
                      <ProfileExperience
                        key={exp._id}
                        experience={exp}
                      ></ProfileExperience>
                    ))}
                  </div>
                </Fragment>
              ) : (
                <h4>No Experience Credentials</h4>
              )}
            </div>
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((edu) => (
                    <ProfileEducation
                      key={edu._id}
                      education={edu}
                    ></ProfileEducation>
                  ))}
                </Fragment>
              ) : (
                <h4>No Experience Credentials</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

const mapDispatchToProps = {
  getProfileById,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

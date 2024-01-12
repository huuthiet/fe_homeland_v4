/**
 *
 * ProfileUpdate
 *
 */
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PhoneIcon from '@material-ui/icons/Phone';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
// eslint-disable-next-line import/named
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { Formik } from 'formik';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router';
import Select from 'react-select';
import { Alert, Button, Col, Container, Row } from 'reactstrap';
import * as Yup from 'yup';
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import InputForm from '../../components/InputForm';
import {
  changeStoreData,
  getProfileUpdate,
  postUpdateProfile,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectProfileUpdate from './selectors';
import './style.scss';

const REGEX_PASSWORD = /\S.*\S/;
const validateForm = Yup.object().shape({
  firstName: Yup.string().required(
    <FormattedMessage {...messages.firstName} />,
  ),
  // gender: Yup.string().required(<FormattedMessage {...messages.gender} />),
  lastName: Yup.string().required(<FormattedMessage {...messages.lastName} />),
  // phoneNumber: Yup.string().required(
  //   <FormattedMessage {...messages.phoneNumber} />,
  // ),
  email: Yup.string().required(<FormattedMessage {...messages.email} />),
  address: Yup.string().required(<FormattedMessage {...messages.address} />),
  nationalId: Yup.string()
    .min(9, <FormattedMessage {...messages.nationalId} />)
    .required(<FormattedMessage {...messages.nationalId} />)
    .matches(REGEX_PASSWORD, <FormattedMessage {...messages.nationalId} />),
});

const options = [
  {
    key: 'female',
    value: 'female',
    label: <FormattedMessage {...messages.female} />,
  },
  {
    key: 'male',
    value: 'male',
    label: <FormattedMessage {...messages.male} />,
  },
  {
    key: 'n/a',
    value: 'n/a',
    label: <FormattedMessage {...messages.Other} />,
  },
];

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    justifyContent: 'center',
    alignItems: 'center',
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
  input: {
    display: 'none',
  },
}));
export function ProfileUpdate(props) {
  const classes = useStyles();

  useInjectReducer({ key: 'profileUpdate', reducer });
  useInjectSaga({ key: 'profileUpdate', saga });
  const { id = '' } = useParams();
  const { profile = {}, error } = props.profileUpdate;
  useEffect(() => {
    props.getProfileUpdate(id);
  }, []);

  const { dob = '01/01/1990', nationalId = '', address = '' } = profile;

  // Not form
  const [gender, setGender] = useState({
    key: profile.gender,
    value: profile.gender,
    label:
      // eslint-disable-next-line no-nested-ternary
      profile.gender === 'female' ? (
        <FormattedMessage {...messages.female} />
      ) : profile.gender === 'male' ? (
        <FormattedMessage {...messages.male} />
      ) : (
        <FormattedMessage {...messages.Other} />
      ),
  });

  const [avatarFile, setAvatarFile] = useState('');
  const [avatarAction, setAvatarAction] = useState('');

  const [frontIdFile, setFrontIdFile] = useState('');
  const [frontIdAction, setFrontIdAction] = useState('');

  const [backIdFile, setBackIdFile] = useState('');
  const [backIdAction, setBackIdAction] = useState('');

  const [dobAction, setDobAction] = useState('01/01/1990');

  const TenMegaBytes = 10 * 1024 * 1024;

  const handleFileInputChange = e => {
    const abcfile = e.target.files[0];
    // check mb file size
    if (abcfile.size <= TenMegaBytes) {
      const formData = new FormData();
      formData.append('file', abcfile);
      try {
        const data = {
          // eslint-disable-next-line no-underscore-dangle
          id: profile._id,
          formData,
        };
        setAvatarAction(data);
        setAvatarFile(URL.createObjectURL(abcfile));
        // eslint-disable-next-line no-empty
      } catch (error) {}
    }
  };

  const handleFileInputChangeFront = e => {
    const abcfile = e.target.files[0];
    // check mb file size
    if (abcfile.size <= TenMegaBytes) {
      const formData = new FormData();
      formData.append('file', abcfile);
      try {
        const data = {
          // eslint-disable-next-line no-underscore-dangle
          id: profile._id,
          formData,
        };
        setFrontIdAction(data);
        setFrontIdFile(URL.createObjectURL(abcfile));
        // eslint-disable-next-line no-empty
      } catch (error) {}
    }
  };

  const handleFileInputChangeBack = e => {
    const abcfile = e.target.files[0];
    // check mb file size
    if (abcfile.size <= TenMegaBytes) {
      const formData = new FormData();
      formData.append('file', abcfile);
      try {
        const data = {
          // eslint-disable-next-line no-underscore-dangle
          id: profile._id,
          formData,
        };
        setBackIdAction(data);
        setBackIdFile(URL.createObjectURL(abcfile));
        // eslint-disable-next-line no-empty
      } catch (error) {}
    }
  };

  const handleChangeGender = e => {
    const bankValue = e.value;
    // eslint-disable-next-line no-plusplus
    for (let k = 0; k < options.length; k++) {
      const item = options[k];
      if (item.value === bankValue) {
        setGender(item);
      }
    }
  };

  return (
    <div className="user-profileUpdate-wrapper container">
      <Helmet>
        <title>ProfileUpdate</title>
        <meta name="description" content="Description of ProfileUpdate" />
      </Helmet>
      <div className="user-profileUpdate">
        <div className="list-motel">
          <PaperWrapper
            className="header-profile-paper"
            style={{ paddingBottom: 0 }}
          >
            <Typography className="header-profile" component="h2" variant="h5">
              <FormattedMessage {...messages.profile} />
            </Typography>
            {/* Thông Tin  */}
            <Formik
              initialValues={{
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                nationalId: profile.nationalId ? profile.nationalId : '',
                address: profile.address ? profile.address : '',
                dobAction: profile.dob,
                gender: {
                  key: profile.gender,
                  value: profile.gender,
                  label:
                    // eslint-disable-next-line no-nested-ternary
                    profile.gender === 'female' ? (
                      <FormattedMessage {...messages.female} />
                    ) : profile.gender === 'male' ? (
                      <FormattedMessage {...messages.male} />
                    ) : (
                      <FormattedMessage {...messages.Other} />
                    ),
                },
              }}
              enableReinitialize
              validationSchema={validateForm}
              onSubmit={evt => {
                const body = {
                  ...evt,
                  gender,
                  avatarAction,
                  frontIdAction,
                  backIdAction,
                  dobAction,
                  _id: id,
                };
                // submit
                props.postUpdateProfile(body);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => (
                <div>
                  <form onSubmit={handleSubmit}>
                    <Row className="infor" style={{ paddingTop: '20px' }}>
                      <Col md={12}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <PhoneIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              profile.phoneNumber != null &&
                              `${profile.phoneNumber.countryCode} ${
                                profile.phoneNumber.number
                              }`
                            }
                            // secondary={`${profile.phoneNumber.countryCode} ${
                            //   profile.phoneNumber.number
                            // }`}
                          />
                        </ListItem>
                      </Col>
                      <Col md={4}>
                        {
                          <FormattedMessage {...messages.firstNameenter}>
                            {msg => (
                              <InputForm
                                label={
                                  <FormattedMessage
                                    {...messages.firstNameenter}
                                  />
                                }
                                placeholder={msg}
                                name="firstName"
                                icon="fa fa-user"
                                value={values.firstName}
                                touched={touched.firstName}
                                error={errors.firstName}
                                autoComplete="firstName"
                                onChange={evt => {
                                  handleChange(evt);
                                }}
                                onBlur={handleBlur}
                              />
                            )}
                          </FormattedMessage>
                        }
                      </Col>
                      <Col md={4}>
                        {
                          <FormattedMessage {...messages.lastNameenter}>
                            {msg => (
                              <InputForm
                                label={
                                  <FormattedMessage
                                    {...messages.lastNameenter}
                                  />
                                }
                                placeholder={msg}
                                name="lastName"
                                icon="fa fa-user"
                                value={values.lastName}
                                touched={touched.lastName}
                                error={errors.lastName}
                                autoComplete="lastName"
                                onChange={evt => {
                                  handleChange(evt);
                                }}
                                onBlur={handleBlur}
                              />
                            )}
                          </FormattedMessage>
                        }
                      </Col>
                      <Col md={4}>
                        <span style={{ fontWeight: 'bold' }}>
                          <FormattedMessage {...messages.gender} />
                        </span>
                        {
                          <FormattedMessage {...messages.gender}>
                            {msg => (
                              <Select
                                key={options}
                                placeholder={msg}
                                value={values.gender}
                                options={options}
                                className="mb-3"
                                onChange={evt => {
                                  setFieldValue(
                                    'gender',
                                    handleChangeGender(evt),
                                  );
                                }}
                              />
                            )}
                          </FormattedMessage>
                        }
                      </Col>
                      <Col md={12}>
                        {
                          <FormattedMessage {...messages.emailenter}>
                            {msg => (
                              <InputForm
                                label={
                                  <FormattedMessage {...messages.emailenter} />
                                }
                                placeholder={msg}
                                name="email"
                                icon="fa fa-envelope"
                                touched={touched.email}
                                value={values.email}
                                error={errors.email}
                                autoComplete="email"
                                onChange={evt => {
                                  handleChange(evt);
                                }}
                                onBlur={handleBlur}
                                type="email"
                              />
                            )}
                          </FormattedMessage>
                        }
                      </Col>
                      <Col md={6}>
                        {
                          <FormattedMessage {...messages.nationalId}>
                            {msg => (
                              <InputForm
                                label={
                                  <FormattedMessage {...messages.nationalId} />
                                }
                                placeholder={msg}
                                name="nationalId"
                                icon="fa fa-lock"
                                value={values.nationalId}
                                touched={touched.nationalId}
                                error={errors.nationalId}
                                autoComplete="nationalId"
                                onChange={evt => {
                                  handleChange(evt);
                                }}
                                onBlur={handleBlur}
                              />
                            )}
                          </FormattedMessage>
                        }
                      </Col>
                      <Col md={6}>
                        {
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            showMonthDropdown
                            showYearDropdown
                            selected={moment(values.dobAction).toDate()}
                            onChange={date => {
                              setDobAction(moment(date).format('DD/MM/YYYY'));
                              setFieldValue('dobAction', date);
                            }}
                            customInput={
                              <InputForm
                                label={<FormattedMessage {...messages.dob} />}
                                icon="fa fa-calendar"
                              />
                            }
                          />
                        }
                      </Col>
                      <Col md={12}>
                        {
                          <FormattedMessage {...messages.address}>
                            {msg => (
                              <InputForm
                                label={
                                  <FormattedMessage {...messages.address} />
                                }
                                placeholder={msg}
                                name="address"
                                icon="fa fa-home"
                                type="address"
                                value={values.address}
                                touched={touched.address}
                                error={errors.address}
                                autoComplete="address"
                                onChange={evt => {
                                  handleChange(evt);
                                }}
                                onBlur={handleBlur}
                              />
                            )}
                          </FormattedMessage>
                        }
                      </Col>
                      <Col md={4}>
                        {
                          <FormattedMessage {...messages.uploadAvata}>
                            {msg => (
                              <InputForm
                                label={
                                  <FormattedMessage {...messages.uploadAvata} />
                                }
                                placeholder={msg}
                                name="uploadAvata"
                                accept=".png, .jpg"
                                type="file"
                                onChange={evt => {
                                  handleFileInputChange(evt);
                                }}
                                onBlur={handleBlur}
                              />
                            )}
                          </FormattedMessage>
                        }
                      </Col>
                      <Col md={4}>
                        {
                          <FormattedMessage {...messages.frontId}>
                            {msg => (
                              <InputForm
                                label={
                                  <FormattedMessage {...messages.frontId} />
                                }
                                placeholder={msg}
                                name="frontId"
                                accept=".png, .jpg"
                                type="file"
                                autoComplete="frontId"
                                onChange={evt => {
                                  handleFileInputChangeFront(evt);
                                }}
                                onBlur={handleBlur}
                              />
                            )}
                          </FormattedMessage>
                        }
                      </Col>
                      <Col md={4}>
                        {
                          <FormattedMessage {...messages.backId}>
                            {msg => (
                              <InputForm
                                label={
                                  <FormattedMessage {...messages.backId} />
                                }
                                placeholder={msg}
                                name="backId"
                                accept=".png, .jpg"
                                type="file"
                                autoComplete="backId"
                                onChange={evt => {
                                  handleFileInputChangeBack(evt);
                                }}
                                onBlur={handleBlur}
                              />
                            )}
                          </FormattedMessage>
                        }
                      </Col>
                      {/* Image */}
                      <Col md={4}>
                        {avatarFile ? (
                          <Avatar
                            style={{
                              width: '100%',
                              height: '200px',
                              margin: '10px auto',
                            }}
                            variant="square"
                            alt="Avatar"
                            src={avatarFile}
                          />
                        ) : (
                          <Avatar
                            style={{
                              width: '100%',
                              height: '200px',
                              margin: '10px auto',
                            }}
                            variant="square"
                            alt="Avatar"
                            src={profile.avatar}
                          >
                            N
                          </Avatar>
                        )}
                      </Col>
                      <Col md={4}>
                        {frontIdFile ? (
                          <Avatar
                            style={{
                              width: '100%',
                              height: '200px',
                              margin: '10px auto',
                            }}
                            variant="square"
                            alt="Avatar"
                            src={frontIdFile}
                          />
                        ) : (
                          <Avatar
                            style={{
                              width: '100%',
                              height: '200px',
                              margin: '10px auto',
                            }}
                            variant="square"
                            alt="Avatar"
                            src={profile.frontId}
                          >
                            N
                          </Avatar>
                        )}
                      </Col>
                      <Col md={4}>
                        {backIdFile ? (
                          <Avatar
                            style={{
                              width: '100%',
                              height: '200px',
                              margin: '10px auto',
                            }}
                            variant="square"
                            alt="Avatar"
                            src={backIdFile}
                          />
                        ) : (
                          <Avatar
                            style={{
                              width: '100%',
                              height: '200px',
                              margin: '10px auto',
                            }}
                            variant="square"
                            alt="Avatar"
                            src={profile.backId}
                          >
                            N
                          </Avatar>
                        )}
                      </Col>
                    </Row>
                    {error.length > 0 && (
                      <Container>
                        <Alert color="danger">
                          <FormattedMessage {...messages.dobMax} />
                        </Alert>
                      </Container>
                    )}
                    <div className="login" style={{ padding: '20px 0' }}>
                      <Button
                        className="button-class"
                        color="primary"
                        type="submit"
                      >
                        <FormattedMessage {...messages.update} />
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </Formik>
          </PaperWrapper>
        </div>
      </div>
    </div>
  );
}

ProfileUpdate.propTypes = {
  dispatch: PropTypes.func,
  changeStoreData: PropTypes.func,
  postUpdateProfile: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profileUpdate: makeSelectProfileUpdate(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },

    getProfileUpdate: id => {
      dispatch(getProfileUpdate(id));
    },
    postUpdateProfile: data => {
      dispatch(postUpdateProfile(data));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProfileUpdate);

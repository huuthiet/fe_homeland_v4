/**
 *
 * Profile
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  Avatar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AddIcon from '@material-ui/icons/Add';
import ContactsIcon from '@material-ui/icons/Contacts';
import DeleteIcon from '@material-ui/icons/Delete';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from '@material-ui/icons/Room';
import TocIcon from '@material-ui/icons/Toc';
import ReportIcon from '@material-ui/icons/Report';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import localStore from 'local-storage';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import AlertDialog from '../../components/AlertDialog/Loadable';
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';
import Money from '../../helper/format';
import {
  changeStoreData,
  deleteJob,
  deleteMotel,
  getJobs,
  getMotelList,
  getProfile,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectProfile from './selectors';
import './style.scss';
import { urlLink } from '../../helper/route';
import axios from 'axios';
import localStoreService from 'local-storage';

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
export function Profile(props) {
  const classes = useStyles();
  useInjectReducer({ key: 'profile', reducer });
  useInjectSaga({ key: 'profile', saga });
  const [urlImgCloud, setUrlImgCloud] = useState('');
  const currentUser = localStore.get('user') || {};
  const {
    _id = '',
    lastName = '',
    firstName = '',
    role = [],
    phoneNumber = {},
  } = currentUser;
  const history = useHistory();

  const {
    jobs = [],
    profile = {},
    showAlert = false,
    alert = {},
  } = props.profile;
  console.log("jobs", jobs);
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
        apiPostImg(data);
      } catch (error) {}
    }
  };
  const apiPostImg = async payload => {
    const { id, formData } = payload;
    // eslint-disable-next-line no-useless-concat
    const requestUrl =
      `${urlLink.api.serverUrl}/v1/uploadimg` + `/img/${id}/user`;
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStoreService.get('user').token}`,
      },
    };
    try {
      const response = await axios.post(requestUrl, formData, config);
      if (response.data.data.images) {
        setUrlImgCloud(response.data.data.images.imageUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = id => {
    props.changeStoreData('alert', {
      title: <FormattedMessage {...messages.cancellation} />,
      content: <FormattedMessage {...messages.cancellationtext} />,
      callBack: () => {
        props.deleteJob(id);
      },
    });
    props.changeStoreData('showAlert', true);
  };

  useEffect(() => {
    props.getMotelList();
    props.getJobs();
    props.getProfile();
  }, [urlImgCloud]);
  const {
    motelList,
    error,
    showSuccessPopup,
    showErrorPopup,
    showWarningPopup,
  } = props.profile;
  const [id, setId] = useState('');



  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Description of Profile" />
      </Helmet>
      <div className="user-profile">
        {role.length === 1 && role[0] === 'customer' ? (
          <PaperWrapper style={{ paddingBottom: 0 }}>
            <Typography component="h1" variant="h5">
              <FormattedMessage {...messages.profile} />
            </Typography>
            <Row>
              <Col md={4}>
                <div className={classes.root}>
                  <Avatar
                    alt="Avatar"
                    src={profile.avatar}
                    className={classes.large}
                  />
                </div>
              </Col>
              <Col md={8}>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PermIdentityIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      // primary={<FormattedMessage {...messages.name} />}
                      secondary={`${lastName} ${firstName}`}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PhoneIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      // primary={<FormattedMessage {...messages.sdt} />}
                      secondary={`${phoneNumber.countryCode} ${
                        phoneNumber.number
                      }`}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <AccountBalanceWalletIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      // primary={<FormattedMessage {...messages.wallet} />}
                      secondary={Money(Number(profile.wallet))}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="comments"
                        onClick={() => {
                          history.push('/recharge');
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Row
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Col md={4} style={{ padding: '0' }}>
                      <div className={classes.root}>
                        <input
                          accept=".png, .jpg"
                          className={classes.input}
                          id="contained-button-file"
                          type="file"
                          onChange={e => {
                            handleFileInputChange(e);
                          }}
                        />
                        <label htmlFor="contained-button-file">
                          <Button
                            variant="contained"
                            color="primary"
                            component="span"
                          >
                            {<FormattedMessage {...messages.uploadAvata} />}
                          </Button>
                        </label>
                      </div>
                    </Col>
                    <Col
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      md={4}
                    >
                      <Button
                        style={{ margin: 'auto' }}
                        onClick={() => {
                          history.push('/');
                        }}
                      >
                        <RoomIcon color="primary" />
                        {<FormattedMessage {...messages.aboutmap} />}
                      </Button>
                    </Col>
                    <Col
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      md={4}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        style={{ margin: 'auto' }}
                        onClick={() => {
                          history.push(`/profile/${_id}`);
                        }}
                      >
                        {<FormattedMessage {...messages.profile} />}
                      </Button>
                    </Col>
                  </Row>
                </List>
              </Col>
            </Row>
          </PaperWrapper>
        ) : (
          <div className="list-motel">
            <PaperWrapper style={{ paddingBottom: 0 }}>
              <Typography component="h1" variant="h5">
                {<FormattedMessage {...messages.profile} />}
              </Typography>
              <Row>
                <Col md={4}>
                  <div className={classes.root}>
                    <Avatar
                      alt="Avatar"
                      src={profile.avatar}
                      className={classes.large}
                    />
                  </div>
                </Col>
                <Col md={8}>
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ContactsIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText secondary="Quản lý phong thuê" />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="comments"
                          onClick={() => {
                            history.push('/roomManage');
                          }}
                        >
                          <ViewComfyIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <PermIdentityIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        // primary={<FormattedMessage {...messages.name} />}
                        secondary={`${lastName} ${firstName}`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <PhoneIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        // primary={<FormattedMessage {...messages.sdt} />}
                        secondary={`${phoneNumber.countryCode} ${
                          phoneNumber.number
                        }`}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <AccountBalanceWalletIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        // primary={<FormattedMessage {...messages.wallet} />}
                        secondary={Money(Number(profile.wallet))}
                      />
                    </ListItem>

                    <Row
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Col md={4} style={{ padding: '0' }}>
                        <div className={classes.root}>
                          <input
                            accept=".png, .jpg"
                            className={classes.input}
                            id="contained-button-file"
                            type="file"
                            onChange={e => {
                              handleFileInputChange(e);
                            }}
                          />
                          <label htmlFor="contained-button-file">
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                            >
                              {<FormattedMessage {...messages.uploadAvata} />}
                            </Button>
                          </label>
                        </div>
                      </Col>
                      <Col
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        md={4}
                      >
                        <Button
                          style={{ margin: 'auto' }}
                          onClick={() => {
                            history.push('/');
                          }}
                        >
                          <RoomIcon color="primary" />
                          {<FormattedMessage {...messages.aboutmap} />}
                        </Button>
                      </Col>
                      <Col
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        md={4}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          style={{ margin: 'auto' }}
                          onClick={() => {
                            history.push(`/profile/${_id}`);
                          }}
                        >
                          {<FormattedMessage {...messages.profile} />}
                        </Button>
                      </Col>
                    </Row>
                  </List>
                </Col>
              </Row>
            </PaperWrapper>
            <ul>
              {(role[1] !== 'master') & (role[0] !== 'master') ? (
                <li>
                  <div className="motel">
                    <div
                      className="motel-new"
                      onClick={() => {
                        history.push('/create-motel');
                      }}
                    >
                      <div>
                        <i className="fa fa-plus" aria-hidden="true" />
                      </div>
                      <div>{<FormattedMessage {...messages.addnew} />}</div>
                    </div>
                  </div>
                </li>
              ) : (
                ''
              )}
              {motelList.length > 0 &&
                motelList.map((motel, key) => (
                  <li key={key}>
                    <Row className="motel">
                      <Col xs={5} className="motel-name">
                        {motel.name}
                      </Col>
                      <Col xs={4} className="motel-edit">
                        <div
                          onClick={() => {
                            history.push(`/motel/${motel._id}`);
                          }}
                        >
                          <div>
                            <i className="fa fa-cog" aria-hidden="true" />
                          </div>
                          <div>{<FormattedMessage {...messages.edit} />}</div>
                        </div>
                      </Col>
                      <Col xs={3} className="motel-remove">
                        <div
                          onClick={() => {
                            setId(motel._id);
                            props.changeStoreData('showWarningPopup', true);
                          }}
                        >
                          <div>
                            <i className="fa fa-trash" aria-hidden="true" />
                          </div>
                          <div>{<FormattedMessage {...messages.delete} />}</div>
                        </div>
                      </Col>
                    </Row>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      <Grid container align="center">
        {jobs.map(job => (
          <Grid item xs={12} key={job._id}>
            <PaperWrapper style={{ marginTop: 0 }}>
              <Grid container justify="center" alignItems="center">
                <Grid item xs={6}>
                  <Typography style={{ fontWeight: 'bold' }}>
                    {job.fullName}
                  </Typography>
                  <Typography>{job.phoneNumber}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Grid container>
                    <Grid item xs={6}>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          history.push(`/job-detail/${job._id}`);
                        }}
                      >
                        <TocIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          history.push(`/report-problem/${job._id}`);
                        }}
                      >
                        <ReportIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          props.changeStoreData('showAlert', true);
                          handleDelete(job._id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </PaperWrapper>
          </Grid>
        ))}
      </Grid>
      <SuccessPopup
        visible={showSuccessPopup}
        content={<FormattedMessage {...messages.detelesuccess} />}
        toggle={() => {
          props.changeStoreData('showSuccessPopup', !showSuccessPopup);
        }}
      />
      <SuccessPopup
        visible={showErrorPopup}
        content={<FormattedMessage {...messages.errorMessage} />}
        toggle={() => {
          props.changeStoreData('showErrorPopup', !showErrorPopup);
        }}
      />
      <WarningPopup
        visible={showWarningPopup}
        content={<FormattedMessage {...messages.reallyMessage} />}
        callBack={() => props.deleteMotel(id)}
        toggle={() => {
          props.changeStoreData('showWarningPopup', false);
        }}
      />
      <AlertDialog
        open={showAlert}
        alert={alert}
        handleClose={() => {
          props.changeStoreData('showAlert', false);
        }}
      />
    </div>
  );
}

Profile.propTypes = {
  dispatch: PropTypes.func,
  getRoomList: PropTypes.func,
  deleteMotel: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMotelList: () => {
      dispatch(getMotelList());
    },
    deleteMotel: id => {
      dispatch(deleteMotel(id));
    },
    getJobs: () => {
      dispatch(getJobs());
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    deleteJob: id => {
      dispatch(deleteJob(id));
    },
    getProfile: () => {
      dispatch(getProfile());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Profile);

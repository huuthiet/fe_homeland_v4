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
  colors,
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
  getJobs,
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
export function ManagerEnergyRoomsUser(props) {
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

  useEffect(() => {
    props.getJobs();
  }, [urlImgCloud]);
  const {
    motelList,
    error,
    showSuccessPopup,
    showErrorPopup,
    showWarningPopup,
  } = props.profile;
  const [id, setId] = useState('');

  // jobs.map(job => (
  //   console.log("job.room.idElectricMetter", job.room.idElectricMetter)
  // ))



  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Description of Profile" />
      </Helmet>
      <Grid container align="center">
        {jobs.map(job => (
          <Grid item xs={12} key={job._id}>
            <PaperWrapper style={{ marginTop: 0 }}>
              <Grid container justify="center" alignItems="center">
                <Grid item xs={5}>
                  <Typography style={{ fontWeight: 'bold' }}>
                    Người thuê: {job.fullName}
                  </Typography>
                  <Typography>Số điện thoại: {job.phoneNumber}</Typography>
                  <Typography>{job.room.name}</Typography>
                  {(job.room.idElectricMetter === "0" || job.room.idElectricMetter === undefined) ? (
                    <>
                      <Typography style={{ color: 'red', fontWeight: 'bold'}}>Phòng chưa được đặt mã số đồng hồ điện.</Typography>
                      <Typography style={{ color: 'red', fontWeight: 'bold'}}>Vui lòng liên hệ chủ nhà!</Typography>
                    </>
                  ) : (
                    <Typography>Mã đồng hồ điện: {job.room.idElectricMetter}</Typography>
                  )}
                </Grid>
                <Grid item xs={2}>
                  <Grid container>
                    <Grid item xs={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        onClick={() => {
                          history.push(`/follow-energy/${job.room.idElectricMetter}/${job.room.name}`);
                        }}
                        disabled={job.room.idElectricMetter === "0" || job.room.idElectricMetter === undefined}
                      >
                        Chi tiết
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </PaperWrapper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

ManagerEnergyRoomsUser.propTypes = {
  dispatch: PropTypes.func,
  getRoomList: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    getJobs: () => {
      dispatch(getJobs());
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ManagerEnergyRoomsUser);

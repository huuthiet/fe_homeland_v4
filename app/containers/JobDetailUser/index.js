/**
 *
 * JobDetailUser
 *
 */

import { makeStyles } from '@material-ui/core/styles';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DateRangeIcon from '@material-ui/icons/DateRange';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import TodayIcon from '@material-ui/icons/Today';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
//

import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormattedMessage } from 'react-intl';
import Modal from 'react-modal';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import Money from '../../helper/format';
import { changeAppStoreData } from '../App/actions';
import { getProfile } from '../Profile/actions';
import {
  changeStoreData,
  getJob,
  putActive,
  putDeposit,
  putCheckOut,
  putJob,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectJobDetailUser from './selectors';
import './style.scss';

const useStyles = makeStyles(theme => ({
  content: {
    marginTop: '10px',
  },
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(0, 0, 0, .25)',
    paddingBottom: '8px',
  },
  text: {
    display: 'flex',
  },
  label: {
    fontWeight: 'bold',
    paddingRight: '5px',
  },
  button: {
    marginLeft: '5px',
  },
}));

export function JobDetailUser(props) {
  useInjectReducer({ key: 'jobDetailUser', reducer });
  useInjectSaga({ key: 'jobDetailUser', saga });
  const classes = useStyles();
  const { id = '' } = useParams();
  const history = useHistory();
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const {
    job,
    profile: { wallet = '' },
    flagDeposit,
  } = props.jobDetailUser;

  const {
    fullName = '',
    deposit = '',
    phoneNumber = '',
    motelRoom = {},
    checkInTime = new Date(),
    price = '',
    bail = '',
    afterCheckInCost = '',
    currentOrder = {},
    returnRoomDate = '',
    images = [],
    rentalPeriod = '',
    isActived = false,
    roomPassword = '',
    status = '',
    isUpdatedReturnRoomDate = false,
    room = {},
  } = job;

  const [datepicker, setDatepicker] = useState(returnRoomDate);

  const checkOutDate = new Date(checkInTime).setMonth(
    new Date(checkInTime).getMonth() + Number(rentalPeriod),
  );

  const minDate = new Date(checkInTime).setMonth(
    new Date(checkInTime).getMonth() + 1,
  );
  const dateStay = Math.ceil(Math.abs(lastDay - today) / (24 * 3600 * 1000));

  const handleCheckOut = date => {
    if (moment(date).isBefore(moment(checkOutDate))) {
      // Trả ngày trước ngày hợp đồng
      props.changeAppStoreData('showAlert', true);
      props.changeAppStoreData('alert', {
        title: <FormattedMessage {...messages.CheckOutRoom} />,
        content: `Ngày trả phòng sớn hơn so với hợp đồng, bạn sẽ mất cọc khi trả phòng. Bạn thực sự muốn chọn ngày ${moment(
          date,
        ).format('DD/MM/YYYY')} để trả phòng?`,
        callBack: () => {
          props.putCheckOut(id, moment(date).format('MM/DD/YYYY'));
        },
      });
    } else {
      // Gia Hạn Thêm Hợp Đồng
      props.changeAppStoreData('showAlert', true);
      props.changeAppStoreData('alert', {
        title: <FormattedMessage {...messages.CheckOutRoom} />,
        content: `Bạn thực sự muốn chọn ngày ${moment(date).format(
          'DD/MM/YYYY',
        )} để trả phòng?`,
        callBack: () => {
          props.putCheckOut(id, moment(date).format('MM/DD/YYYY'));
        },
      });
    }

    // if (datepicker < checkOutDate) {
    // 	props.changeAppStoreData('showAlert', true);
    // 	props.changeAppStoreData('alert', {
    // 		title: <FormattedMessage {...messages.CheckOutRoom} />,
    // 		content: `Ngày trả phòng sớn hơn so với hợp đồng, bạn sẽ mất cọc khi trả phòng. Bạn thực sự muốn chọn ngày ${moment(
    // 			datepicker,
    // 		).format('DD/MM/YYYY')} để trả phòng?`,
    // 		callBack: () => {
    // 			props.putCheckOut(id, moment(datepicker).format('MM/DD/YYYY'));
    // 		},
    // 	});
    // } else {
    // 	props.changeAppStoreData('showAlert', true);
    // 	props.changeAppStoreData('alert', {
    // 		title: <FormattedMessage {...messages.CheckOutRoom} />,
    // 		content: `Bạn thực sự muốn chọn ngày ${moment(date).format(
    // 			'DD/MM/YYYY',
    // 		)} để trả phòng?`,
    // 		callBack: () => {
    // 			props.putCheckOut(id, moment(date).format('MM/DD/YYYY'));
    // 		},
    // 	});
    // }
  };

  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  function SubmitModal() {
    setIsOpen(!isOpen);
    props.putJob(id);
  }
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const [moneyWaill, setMoneyWaill] = useState();
  useEffect(() => {
    props.getJob(id);
    props.getProfile();
  }, []);
  const ExampleCustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      <i className="fa fa-calendar" aria-hidden="true" />
      {value}
    </button>
  );

  return (
    <div className="job-detail-wapper">
      <Helmet>
        <title>JobDetailUser</title>
        <meta name="description" content="Description of JobDetailUser" />
      </Helmet>
      <Container maxWidth="md">
        <PaperWrapper>
          <Typography component="h1" variant="h5">
            <FormattedMessage {...messages.InformationRoom} />
          </Typography>
          <Grid container justify="center" alignItems="center" spacing={1}>
            {images &&
              images.map((imageId, index) => (
                <Grid item xs={6} key={index}>
                  {/* <Image
                    cloudName="nghia2589"
                    publicId={imageId}
                    width="250"
                    crop="scale"
                  /> */}
                  <Avatar
                    style={{
                      width: '140px',
                      height: '140px',
                    }}
                    variant="square"
                    alt="Avatar"
                    src={imageId}
                  >
                    N
                  </Avatar>
                </Grid>
              ))}
          </Grid>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<FormattedMessage {...messages.PeopleRomSet} />}
                secondary={fullName}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AttachMoneyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<FormattedMessage {...messages.Deposited} />}
                secondary={Money(deposit)}
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
                primary={<FormattedMessage {...messages.Phone} />}
                secondary={phoneNumber}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <HomeWorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<FormattedMessage {...messages.Motel} />}
                // secondary={name}
              />
              {flagDeposit === true && (
                <FormattedMessage {...messages.PaymentDeposit} />
              )}
              {status === 'pendingDepositPayment' && (
                <Button
                  className={classes.button}
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // eslint-disable-next-line react/prop-types, no-underscore-dangle
                    const payload = {
                      jobId: id,
                      orderId: currentOrder._id,
                    };
                    props.putDeposit(payload);
                  }}
                >
                  <FormattedMessage {...messages.Deposit} />
                </Button>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <MeetingRoomIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<FormattedMessage {...messages.Room} />}
                secondary={room.name}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EventAvailableIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<FormattedMessage {...messages.CheckinDate} />}
                secondary={moment(checkInTime).format('DD/MM/YYYY')}
              />
              <Button
                className={classes.button}
                size="small"
                variant="contained"
                color="primary"
                disabled={moment(checkInTime) > moment(new Date()) || isActived}
                onClick={() => {
                  if (images.length > 1) {
                    // đã có thông tin xác nhân kích hoạt phòng luôn
                    props.putActive(id);
                  } else {
                    history.push(`/job-verify/${id}`);
                  }
                }}
              >
                {isActived ? (
                  <FormattedMessage {...messages.Activated} />
                ) : (
                  <FormattedMessage {...messages.Activate} />
                )}
              </Button>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AttachMoneyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<FormattedMessage {...messages.PriceRoom} />}
                secondary={Money(price)}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AttachMoneyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<FormattedMessage {...messages.BondMoney} />}
                secondary={Money(bail)}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AttachMoneyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<FormattedMessage {...messages.PaymentUponCheckIn} />}
                secondary={Money(afterCheckInCost)}
              />
              <Button
                className={classes.button}
                size="small"
                variant="contained"
                color="primary"
                disabled={
                  !isActived || currentOrder.type !== 'afterCheckInCost'
                }
                onClick={() => {
                  setMoneyWaill(Money(afterCheckInCost));
                  toggleModal();
                  // history.push(`/payment/${id}`);
                  // props.putJob(id);
                }}
              >
                {!isActived || currentOrder.type !== 'afterCheckInCost' ? (
                  <FormattedMessage {...messages.Paid} />
                ) : (
                  <FormattedMessage {...messages.Pay} />
                )}
              </Button>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <VpnKeyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<FormattedMessage {...messages.RoomLockCode} />}
                secondary={roomPassword}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AssignmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<FormattedMessage {...messages.RentalContract} />}
                secondary={`${rentalPeriod} tháng`}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <TodayIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<FormattedMessage {...messages.CheckOutDate} />}
                secondary={moment(returnRoomDate || checkOutDate).format(
                  'DD/MM/YYYY',
                )}
              />
              <DatePicker
                dateFormat="dd/MM/yyyy"
                minDate={minDate}
                onChange={handleCheckOut}
                customInput={<ExampleCustomInput />}
                // customInput={
                // 	<InputForm
                // 		// icon="fa fa-calendar"
                // 		style={{width:'10px'}}
                // 	/>
                // }
              />
              {/* <ListItemText
								primary="Ngày trả phòng"
								secondary={moment(
									returnRoomDate ? returnRoomDate : checkOutDate,
								).format('DD/MM/YYYY')}
							/>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									className="date-custom"
									required
									disablePast
									// maxDate={moment().add(7, 'days')}
									minDate={minDate}
									id="date-picker-dialog"
									placeholder="Nhập ngày"
									format="dd/MM/yyyy"
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
									disabled={isUpdatedReturnRoomDate}
									value={returnRoomDate ? returnRoomDate : checkOutDate}
									onChange={handleCheckOut}
									size="small"
								/>
							</MuiPickersUtilsProvider> */}
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DateRangeIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<FormattedMessage {...messages.NumberOfDays} />}
                secondary={dateStay}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <InsertInvitationIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<FormattedMessage {...messages.PaymentDate} />}
                secondary={moment(lastDay).format('DD/MM/YYYY')}
              />
              <Button
                className={classes.button}
                size="small"
                variant="contained"
                color="primary"
                disabled={
                  !isActived ||
                  currentOrder.type !== 'monthly' ||
                  currentOrder.isCompleted
                }
                onClick={() => {
                  // history.push(`/payment/${id}`);

                  setMoneyWaill(Money(job.currentOrder.amount));
                  toggleModal();
                }}
              >
                {!isActived ||
                currentOrder.type !== 'monthly' ||
                currentOrder.isCompleted ? (
                  <FormattedMessage {...messages.Paid} />
                ) : (
                  <FormattedMessage {...messages.Pay} />
                )}
              </Button>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountBalanceWalletIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<FormattedMessage {...messages.BalanceInWallet} />}
                secondary={Money(wallet)}
              />
            </ListItem>
          </List>
        </PaperWrapper>
        <Modal
          isOpen={isOpen}
          onRequestClose={toggleModal}
          contentLabel="My dialog"
          style={customStyles}
        >
          <div className="deposit">
            <h5>
              {<FormattedMessage {...messages.AmountOfMoney} />} {moneyWaill}{' '}
              {<FormattedMessage {...messages.AmountOfMoneyDec} />}
            </h5>
          </div>
          <button className="btn btn-primary mr-2" onClick={SubmitModal}>
            {<FormattedMessage {...messages.Accept} />}
          </button>
          <button className="btn btn-secondary" onClick={toggleModal}>
            {<FormattedMessage {...messages.Cancel} />}
          </button>
        </Modal>
      </Container>
    </div>
  );
}

JobDetailUser.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  jobDetailUser: makeSelectJobDetailUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getJob: id => {
      dispatch(getJob(id));
    },
    getProfile: () => {
      dispatch(getProfile());
    },
    putActive: id => {
      dispatch(putActive(id));
    },
    putDeposit: payload => {
      dispatch(putDeposit(payload));
    },
    putCheckOut: (id, returnRoomDate) => {
      dispatch(putCheckOut(id, returnRoomDate));
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    changeAppStoreData: (key, value) => {
      dispatch(changeAppStoreData(key, value));
    },
    putJob: id => {
      dispatch(putJob(id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(JobDetailUser);

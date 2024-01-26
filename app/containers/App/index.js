/**
 *
 * App
 *
 */

import 'bootstrap/dist/css/bootstrap.css';
import AddMoney from 'containers/AddMoney/Loadable';
import Auth from 'containers/Auth/Loadable';
import ChangePassword from 'containers/ChangePassword/Loadable';
import CreateMotel from 'containers/CreateMotel/Loadable';
import CreateRoom from 'containers/CreateRoom/Loadable';
import HistoryFloorsRoomHost from 'containers/HistoryFloorsRoomHost/Loadable';
import HistoryRoomHostDetail from 'containers/HistoryFloorsRoomHostDetail/Loadable';
import HistoryRoomHost from 'containers/HistoryRoomHost/Loadable';
import HistoryRoomHostAdmin from 'containers/HistoryRoomHostAdmin/Loadable';
import HostMotelRoom from 'containers/HostMotelRoom/Loadable';
import HostMotelRoomDetail from 'containers/HostMotelRoomDetail/Loadable';
import HostMotelRoomDetailUser from 'containers/HostMotelRoomDetailUser/Loadable';
// import HostMotelRoomUser from 'containers/HostMotelRoomUser/Loadable';
import BillList from 'containers/BillList/Loadable';
import BillListAdmin from 'containers/BillListAdmin/Loadable';
import Job from 'containers/Job/Loadable';
import MapsPage from 'containers/MapsPage/Loadable';
import Motel from 'containers/Motel/Loadable';
import MotelDetail from 'containers/MotelDetail/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import OrderDetail from 'containers/OrderDetail/Loadable';
import OrderList from 'containers/OrderList/Loadable';
import OrderListHost from 'containers/OrderListHost/Loadable';
import OrderPay from 'containers/OrderPay/Loadable';
import Payment from 'containers/Payment/Loadable';
import PaymentReturn from 'containers/PaymentReturn/Loadable';
import Profile from 'containers/Profile/Loadable';
import ProfileUpdate from 'containers/ProfileUpdate/Loadable';
import ReportProblem from 'containers/ReportProblem/Loadable';
import ReportProblemList from 'containers/ReportProblemList/Loadable';
import ReportProblemListAdmin from 'containers/ReportProblemListAdmin/Loadable';
import RoomDetail from 'containers/RoomDetail/Loadable';
import RoomDetailUpdate from 'containers/RoomDetailUpdate/Loadable';
import RoomDetailUpdateAdmin from 'containers/RoomDetailUpdateAdmin/Loadable';
import TransactionLog from 'containers/TransactionLog/Loadable';
import TransactionPayMentList from 'containers/TransactionPayMentList/Loadable';
import TransactionPayMentListHost from 'containers/TransactionPayMentListHost/Loadable';
import TransactionPayMentUserList from 'containers/TransactionPayMentUserList/Loadable';
import UpdateMotel from 'containers/UpdateMotel/Loadable';
import UpdateRoom from 'containers/UpdateRoom/Loadable';

//note 
import ManagerEnergyRooms from 'containers/ManagerEnergyRooms/Loadable';
import ManagerEnergyBuildings from 'containers/ManagerEnergyBuildings/Loadable';
import EnergyDetail from 'containers/EnergyDetail/Loadable';
import ScadaElectricEMS from 'containers/ScadaElectricEMS/Loadable';
import FollowEnergyAdmin from 'containers/FollowEnergyAdmin/Loadable';
import FollowEnergyUser from 'containers/FollowEnergyUser/Loadable';

//----------------------------
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import axios from 'axios';
import About from 'containers/About/Loadable';
import AdminUsers from 'containers/AdminUsers/Loadable';
import AdminUsersDetail from 'containers/AdminUsersDetail/Loadable';
import JobDetail from 'containers/JobDetail/Loadable';
import JobDetailUser from 'containers/JobDetailUser/Loadable';
import JobList from 'containers/JobList/Loadable';
import JobListUser from 'containers/JobListUser/Loadable';
import JobVerify from 'containers/JobVerify/Loadable';
import MoneyInformation from 'containers/MoneyInformation/Loadable';
import MoneyInformationDetail from 'containers/MoneyInformationDetail/Loadable';
import RoomBill from 'containers/RoomBill/Loadable';
import RoomManage from 'containers/RoomManager/Loadable';
import Terms from 'containers/Terms/Loadable';
import localStore from 'local-storage';
import { FormattedMessage } from 'react-intl';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import AlertDialog from '../../components/AlertDialog/Loadable';
import LoadingIndicator from '../../components/LoadingIndicator';
import Navbar from '../../components/Navbar';
import messages from '../../components/Navbar/messages';
import WarningPopup from '../../components/WarningPopup';
import { changeLocale } from '../LanguageProvider/actions';
import {
  Search_Addresses,
  changeAppStoreData,
  getLogout,
  saveCurrentUser,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectApp from './selectors';
import './style.scss';

axios.defaults.headers.common.Authorization = `Bearer ${localStore.get(
  'token',
)}`;
export function App(props) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });
  const {
    loading,
    currentUser,
    showLogout,
    showAlert = false,
    alert = {},
    listroom,
  } = props.app;
  console.log("currentUser app", currentUser);
  useEffect(() => {
    props.saveCurrentUser(localStore.get('user') || {});
  }, []);
  return (
    <div className="app-wrapper">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar
        currentUser={currentUser}
        changeStoreData={props.changeStoreData}
        changeLocale={props.changeLocale}
        Search_Addresses={props.Search_Addresses}
        listroom={listroom}
      />
      <Switch>
        <Route exact path="/" component={MapsPage} />
        <Route path="/auth" component={Auth} />
        <Route path="/bill-list" component={BillList} />
        <Route path="/report-problem/:id" component={ReportProblem} />
        <Route path="/admin/bill-list" component={BillListAdmin} />
        <Route
          path="/admin/report-problem-list"
          component={ReportProblemListAdmin}
        />
        <Route path="/report-problem-list" component={ReportProblemList} />
        <Route path="/motel/:id" component={Motel} />
        <Route path="/motel-detail/:id" component={MotelDetail} />
        <Route path="/room-detail/:id" component={RoomDetail} />
        <Route
          path="/room-detail-update-admin/:id"
          component={RoomDetailUpdateAdmin}
        />
        <Route path="/room-detail-update/:id" component={RoomDetailUpdate} />
        <Route path="/create-motel" component={CreateMotel} />
        <Route path="/update-room/:id" component={UpdateRoom} />
        <Route path="/update-motel/:id" component={UpdateMotel} />
        <Route path="/payment" component={Payment} />
        <Route path="/recharge" component={AddMoney} />
        <Route path="/job/:id" component={Job} />
        <Route path="/terms" component={Terms} />
        <Route path="/about" component={About} />
        <Route path="/roomManage" component={RoomManage} />
        <Route path="/job-detail/:id" component={JobDetailUser} />
        <Route path="/job-verify/:id" component={JobVerify} />
        <Route path="/payment-return" component={PaymentReturn} />
        <Route path="/order-pay/:id" component={OrderPay} />
        <Route path="/admin/users/:id" component={AdminUsersDetail} />
        <Route path="/admin/users" component={AdminUsers} />
        <Route
          path="/admin/money-information/:id"
          component={MoneyInformationDetail}
        />
        <Route path="/admin/money-information" component={MoneyInformation} />
        <Route path="/admin/job/list" component={JobList} />
        <Route path="/admin/user/job/list/:id" component={JobListUser} />
        <Route path="/admin/job/detail/:id" component={JobDetail} />
        <Route path="/admin/order/list" component={OrderList} />
        <Route path="/order/list" component={OrderListHost} />
        <Route
          path="/host/transaction/list"
          component={TransactionPayMentListHost}
        />
        <Route
          path="/admin/transaction/list"
          component={TransactionPayMentList}
        />
        <Route
          path="/transaction/user/list"
          component={TransactionPayMentUserList}
        />
        <Route path="/admin/order/detail/:id" component={OrderDetail} />
        <Route path="/profile/:id" component={ProfileUpdate} />
        <Route path="/profile" component={Profile} />
        <Route path="/changePassword" component={ChangePassword} />
        <Route
          path="/bill/motel/:id/room/:idroom/user/:idUser"
          component={RoomBill}
        />
        <Route path="/createroom/:id" component={CreateRoom} />
        <Route path="/transactionLog" component={TransactionLog} />
        {/* <Route path="/user/hostMotelRoom" component={HostMotelRoomUser} /> */}
        <Route path="/admin/hostMotelRoom" component={HostMotelRoom} />
        <Route path="/hostMotelRoom/:id" component={HostMotelRoomDetail} />
        <Route path="/user/hostMotelRoom" component={HostMotelRoomDetailUser} />
        <Route
          path="/historyRoomHost/room/:id/roomdetail/:idroom"
          component={HistoryRoomHostDetail}
        />
        <Route
          path="/historyRoomHost/room/:id"
          component={HistoryFloorsRoomHost}
        />

        <Route path="/historyRoomHost" component={HistoryRoomHost} />
        <Route path="/admin/historyRoomHost" component={HistoryRoomHostAdmin} />

        {/* note */}
        <Route
          path="/admin/manager-energy-rooms"
          component={ManagerEnergyRooms}
          />

        <Route path="/admin/manager-energy-buildings" component={ManagerEnergyBuildings} />

        <Route path="/admin/manager-energy-detail" component={EnergyDetail} />
        <Route
          path="/admin/scada-electric-ems"
          component={ScadaElectricEMS}
        />
        <Route path="/admin/follow-energy/:id/:name" component={FollowEnergyAdmin} />
        <Route path="/follow-energy/" component={FollowEnergyUser} />

        {/* /////////////////////// */}
        
        <Route component={NotFoundPage} />
      </Switch>
      {loading && <LoadingIndicator />}
      <WarningPopup
        visible={showLogout}
        content={<FormattedMessage {...messages.question_logout} />}
        callBack={() => props.getLogout()}
        toggle={() => {
          props.changeStoreData('showLogout', false);
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

App.propTypes = {
  getLogout: PropTypes.func,
  saveCurrentUser: PropTypes.func,
  changeStoreData: PropTypes.func,
  app: PropTypes.object,
  changeLocale: PropTypes.func,
  Search_Addresses: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLogout: () => {
      dispatch(getLogout());
    },
    saveCurrentUser: user => {
      dispatch(saveCurrentUser(user));
    },
    changeStoreData(key, value) {
      dispatch(changeAppStoreData(key, value));
    },
    changeLocale: value => {
      dispatch(changeLocale(value));
    },
    Search_Addresses: value => {
      dispatch(Search_Addresses(value));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);

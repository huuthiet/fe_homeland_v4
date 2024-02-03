// /**
//  *
//  * Profile
//  *
//  */

// import PropTypes from 'prop-types';
// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';

// import {
//   Avatar,
//   Button,
//   Divider,
//   IconButton,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemSecondaryAction,
//   ListItemText,
// } from '@material-ui/core';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
// import AddIcon from '@material-ui/icons/Add';
// import ContactsIcon from '@material-ui/icons/Contacts';
// import DeleteIcon from '@material-ui/icons/Delete';
// import PermIdentityIcon from '@material-ui/icons/PermIdentity';
// import PhoneIcon from '@material-ui/icons/Phone';
// import RoomIcon from '@material-ui/icons/Room';
// import TocIcon from '@material-ui/icons/Toc';
// import ReportIcon from '@material-ui/icons/Report';
// import ViewComfyIcon from '@material-ui/icons/ViewComfy';
// import localStore from 'local-storage';
// import { FormattedMessage } from 'react-intl';
// import { useHistory } from 'react-router-dom';
// import { Col, Row } from 'reactstrap';
// import { useInjectReducer } from 'utils/injectReducer';
// import { useInjectSaga } from 'utils/injectSaga';
// import Money from '../../helper/format';
// import {
//   getMotelList,
// } from './actions';
// import messages from './messages';
// import reducer from './reducer';
// import saga from './saga';
// import makeSelectManagerBuildingHost from './selectors';
// import './style.scss';
// import { urlLink } from '../../helper/route';
// import axios from 'axios';
// import localStoreService from 'local-storage';

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   large: {
//     width: theme.spacing(25),
//     height: theme.spacing(25),
//   },
//   input: {
//     display: 'none',
//   },
// }));
// export function ManagerEnergyBuildingsHost(props) {
//   const classes = useStyles();
//   useInjectReducer({ key: 'profile', reducer });
//   useInjectSaga({ key: 'motelprofileList', saga });

//   const currentUser = localStore.get('user') || {};
//   const {
//     _id = '',
//     lastName = '',
//     firstName = '',
//     role = [],
//     phoneNumber = {},
//   } = currentUser;
//   const history = useHistory();

//   useEffect(() => {
//     props.getMotelList();
//   }, []);
//   const {
//     motelList,
//   } = props.profile;
//   const [id, setId] = useState('');

//   console.log("motelList", motelList);

//   return (
//     <div className="user-profile-wrapper container">
//       <Helmet>
//         <title>Profile</title>
//         <meta name="description" content="Description of Profile" />
//       </Helmet>
//       <div className="title-abc">Quản lý năng lượng các tòa nhà</div>
//       <div className="user-profile">
//         {role.length === 2 && role[0] === 'host' ? (
//           <div className="list-motel">
//             <></>
//             <ul>
//               {motelList.length > 0 &&
//                 motelList.map((motel, key) => (
//                   <>
//                   <li key={key}>
//                     <Row className="motel">
//                       <Col xs={5} className="motel-name">
//                         {motel.name}
//                       </Col>
//                       <Col xs={4} className="motel-edit">
//                         <div
//                           onClick={() => {
//                             history.push(`/manager-energy-rooms-host/${motel._id}/${motel.name}`);
//                           }}
//                         >
//                           <div>
//                             <i className="fa fa-cog" aria-hidden="true" />
//                           </div>
//                           <div>{<FormattedMessage {...messages.edit} />}</div>
//                         </div>
//                       </Col>
//                     </Row>
//                   </li>
//                 </>
//                 ))}
//             </ul>
//           </div>
//         ) : (
//           ''
//         )}
//       </div>
//     </div>
//   );
// }

// ManagerEnergyBuildingsHost.propTypes = {
//   dispatch: PropTypes.func,
//   getRoomList: PropTypes.func,
//   changeStoreData: PropTypes.func,
// };

// const mapStateToProps = createStructuredSelector({
//   profile: makeSelectManagerBuildingHost(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     getMotelList: () => {
//       dispatch(getMotelList());
//     },
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

// export default compose(withConnect)(ManagerEnergyBuildingsHost);

// import PropTypes from 'prop-types';
// import React, { useEffect, useState } from 'react';
// import { Helmet } from 'react-helmet';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';

// import {
//   Avatar,
//   Button,
//   Divider,
//   IconButton,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemSecondaryAction,
//   ListItemText,
// } from '@material-ui/core';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import { HomeRounded } from '@material-ui/icons';

// import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
// import AddIcon from '@material-ui/icons/Add';
// import ContactsIcon from '@material-ui/icons/Contacts';
// import DeleteIcon from '@material-ui/icons/Delete';
// import PermIdentityIcon from '@material-ui/icons/PermIdentity';
// import PhoneIcon from '@material-ui/icons/Phone';
// import RoomIcon from '@material-ui/icons/Room';
// import TocIcon from '@material-ui/icons/Toc';
// import ReportIcon from '@material-ui/icons/Report';
// import ViewComfyIcon from '@material-ui/icons/ViewComfy';
// import localStore from 'local-storage';
// import { FormattedMessage } from 'react-intl';
// import { useHistory } from 'react-router-dom';
// import { Col, Row } from 'reactstrap';
// import { useInjectReducer } from 'utils/injectReducer';
// import { useInjectSaga } from 'utils/injectSaga';
// import Money from '../../helper/format';
// import { getMotelList } from './actions';
// import messages from './messages';
// import reducer from './reducer';
// import saga from './saga';
// import makeSelectManagerBuildingHost from './selectors';
// import './style.scss';
// import { urlLink } from '../../helper/route';
// import axios from 'axios';
// import localStoreService from 'local-storage';

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   large: {
//     width: theme.spacing(25),
//     height: theme.spacing(25),
//   },
//   input: {
//     display: 'none',
//   },
// }));
// export function ManagerEnergyBuildingsHost(props) {
//   const classes = useStyles();
//   useInjectReducer({ key: 'profile', reducer });
//   useInjectSaga({ key: 'motelprofileList', saga });

//   const currentUser = localStore.get('user') || {};
//   const {
//     _id = '',
//     lastName = '',
//     firstName = '',
//     role = [],
//     phoneNumber = {},
//   } = currentUser;
//   const history = useHistory();

//   useEffect(() => {
//     props.getMotelList();
//   }, []);
//   const { motelList } = props.profile;
//   const [id, setId] = useState('');

//   console.log('motelList', motelList);

//   return (
//     <div className="user-profile-wrapper container">
//       <Helmet>
//         <title>Profile</title>
//         <meta name="description" content="Description of Profile" />
//       </Helmet>
//       <div className="title-abc">Quản lý năng lượng các tòa nhà</div>

//       {role.length === 2 && role[0] === 'host' ? (
//         <>
//           <div className="container">
//             <div className="host-card">
//               {motelList.length > 0 &&
//                 motelList.map((motel, key) => (
//                   <>
//                     <div>
//                       <div className="icon-card">
//                         <HomeRounded style={{ color: 'white' }} />
//                       </div>
//                       <Card variant="outlined" className="card-container">
//                         <div className="title">Thông tin tòa nhà</div>
//                         <p>
//                           <strong>Tên tòa nhà:</strong> {motel.name}
//                         </p>
//                         <div
//                           className="detail-button"
//                           onClick={() => {
//                             history.push(
//                               `/manager-energy-rooms-host/${motel._id}/${motel.name
//                               }`,
//                             );
//                           }}
//                         >
//                           <p className="detail-text">Xem chi tiết</p>
//                         </div>
//                       </Card>
//                     </div>
//                   </>
//                 ))}
//             </div>
//           </div>
//         </>
//       ) : (
//         ''
//       )}
//     </div>
//   );
// }

// ManagerEnergyBuildingsHost.propTypes = {
//   dispatch: PropTypes.func,
//   getRoomList: PropTypes.func,
//   changeStoreData: PropTypes.func,
// };

// const mapStateToProps = createStructuredSelector({
//   profile: makeSelectManagerBuildingHost(),
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     getMotelList: () => {
//       dispatch(getMotelList());
//     },
//   };
// }

// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

// export default compose(withConnect)(ManagerEnergyBuildingsHost);

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
import Card from '@material-ui/core/Card';
import { HomeRounded, LocationOn } from '@material-ui/icons';

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
import Money from '../../helper/format';
import { getMotelList } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectManagerBuildingHost from './selectors';
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
export function ManagerEnergyBuildingsHost(props) {
  const classes = useStyles();
  useInjectReducer({ key: 'profile', reducer });
  useInjectSaga({ key: 'motelprofileList', saga });

  const currentUser = localStore.get('user') || {};
  const {
    _id = '',
    lastName = '',
    firstName = '',
    role = [],
    phoneNumber = {},
  } = currentUser;
  const history = useHistory();

  useEffect(() => {
    props.getMotelList();
  }, []);
  const { motelList } = props.profile;
  const [id, setId] = useState('');

  console.log('motelList', motelList);

  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Description of Profile" />
      </Helmet>
      <div className="title-abc">Quản lý năng lượng các tòa nhà</div>

      {role.length === 2 && role[0] === 'host' ? (
        <>
          <div className="card-wrap">
            {motelList.length > 0 &&
              motelList.map((motel, key) => (
                <>
                  <div className="motel-card">
                    <div className="icon-card">
                      <HomeRounded style={{ color: 'white' }} />
                    </div>
                    <Card variant="outlined" className="card-container">
                      <div className="card-content">
                        <div className="card-motel-name">
                          <HomeRounded
                            style={{
                              color: 'gray',
                              height: '22px',
                              width: '22px',
                            }}
                          />
                          <span className="motel-name">Tên tòa nhà: </span>
                          {motel.name.toUpperCase()}
                        </div>

                        <br />
                        <LocationOn
                          style={{
                            color: 'gray',
                            height: '22px',
                            width: '22px',
                          }}
                        />
                        {motel.address.address}
                      </div>
                      <div
                        className="detail-button"
                        onClick={() => {
                          history.push(
                            `/manager-energy-rooms-host/${motel._id}/${motel.name
                            }`,
                          );
                        }}
                      >
                        <p className="detail-text">Xem chi tiết</p>
                      </div>
                    </Card>
                  </div>
                </>
              ))}
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

ManagerEnergyBuildingsHost.propTypes = {
  dispatch: PropTypes.func,
  getRoomList: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectManagerBuildingHost(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMotelList: () => {
      dispatch(getMotelList());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ManagerEnergyBuildingsHost);

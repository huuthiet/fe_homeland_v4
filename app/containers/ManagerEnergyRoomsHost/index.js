/**
 *
 * Manager Energy
 *
 */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import _ from 'lodash';
import localStore from 'local-storage';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import {
  Grid,
  Paper,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { HomeRounded, AccessTime } from '@material-ui/icons';

import axios, { AxiosResponse } from 'axios';

import './style.scss';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { urlLink } from '../../helper/route';
import messages from './messages';

import reducer from '../Motel/reducer';
import saga from '../Motel/saga';
import makeSelectMotel from '../Motel/selectors';

import { getMotel } from '../Motel/actions';

const ManagerEnergyRoomsHost = props => {
  const currentUser = localStore.get('user') || {};

  const { id, name } = useParams();

  useInjectReducer({ key: 'motel', reducer });
  useInjectSaga({ key: 'motel', saga });

  // const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    props.getMotel(id);
  }, []);

  const { motel = {} } = props.motel;

  const { floors = [] } = motel;

  console.log('id motel', motel);
  console.log('id floors', floors);

  // const {
  //   totalRoom = '',
  //   rentedRoom = '',
  //   availableRoom = '',
  //   depositedRoom = '',
  // } = motel;

  // useEffect(() => {
  //   props.getListDeviceEnergy();
  // }, []);

  // console.log("listDeviceEnergy", listDeviceEnergy)

  const layouts = [
    { i: '1', x: 0, y: 0, w: 1, h: 1 },
    { i: '2', x: 1, y: 0, w: 1, h: 1 },
    { i: '3', x: 2, y: 0, w: 1, h: 1 },
    // Thêm các ô khác tương tự
  ];

  const cardStyle = {
    border: 'none',
    boxShadow: 'none',
    background: '#FAFAFA',
    maxWidth: 345,
    borderRadius: '10px',
    top: '30px',
    padding: '20px 0px 10px 0px',
  };

  const cardIcon = {
    color: '#7B7B7B',
    borderRadius: '50%',
    height: '50px',
    width: '50px',
    backgroundColor: '#18c3a5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '2px 2px 8px 1px rgba(24, 195, 65, 0.35)',
    position: 'relative',
    zIndex: '1',
    top: '25px',
    left: '25px',
  };

  const StyledButton = styled.button`
    display: flex;
    background-color: white;
    border: 1px solid #18c3a5;
    color: #189e86;
    font-weight: bold;
    padding: 5px 30px;
    transition: background-color 0.5s;
    border-radius: 20px;
    margin: 10px 0;

    &:hover {
      background-color: #189e86;
      color: white;
      transition: background-color 0.5s;
    }
  `;

  const cardNameStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#7B7B7B',
    fontSize: '20px',
    fontWeight: 'bold',
  };

  const inlineStyles = {
    color: 'blue',
    fontSize: '16px',
    border: '1px solid #ccc',
    padding: '10px',
    backgroundColor: 'lightgray',
    height: '100px',
  };

  return (
    <div className="container">
      {/* {!_.isEmpty(currentUser) ? ( */}
      <>
        <Helmet>
          <title>Energy</title>
          <meta name="description" content="Description of Energy" />
        </Helmet>
        <div className="title-abc">Quản lý năng lượng các phòng tòa {name}</div>
        {currentUser.role.length === 2 && currentUser.role[0] === 'master' ? (
        <Grid lg={12} container spacing={2}>
          {floors.map(
            (floor, floorIndex) => (
              console.log('floor', floor),
              floor.rooms.map((room, roomIndex) => (
                <>
                  <Grid key={roomIndex} item lg={3} md={4} sm={6} xs={12}>
                    <div div style={cardIcon}>
                      <AccessTime style={{ color: 'white' }} />
                    </div>
                    <Card style={cardStyle}>
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          style={cardNameStyle}
                        >
                          {room.name}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          ID đồng hồ: &nbsp;
                          <span
                            style={{
                              color:
                                room.idElectricMetter === '0' ||
                                room.idElectricMetter === undefined
                                  ? 'red'
                                  : 'green',
                              fontWeight:
                                room.idElectricMetter === '0' ||
                                room.idElectricMetter === undefined
                                  ? 'bold'
                                  : 'bold',
                              border:
                                room.idElectricMetter === '0' ||
                                room.idElectricMetter === undefined
                                  ? '1px solid red'
                                  : '1px solid green',
                              padding:
                                room.idElectricMetter === '0' ||
                                room.idElectricMetter === undefined
                                  ? '5px'
                                  : '5px',
                              borderRadius:
                                room.idElectricMetter === '0' ||
                                room.idElectricMetter === undefined
                                  ? '5px'
                                  : '5px',
                              backgroundColor:
                                room.idElectricMetter === '0' ||
                                room.idElectricMetter === undefined
                                  ? 'rgba(255, 0, 0, 0.1)'
                                  : '#DAFFE9',
                            }}
                          >
                            {room.idElectricMetter === '0' ||
                            room.idElectricMetter === undefined ? (
                                <span style={{ fontWeight: 'bold' }}>
                                Chưa được đặt
                                </span>
                              ) : (
                                room.idElectricMetter
                              )}
                          </span>
                        </Typography>
                      </CardContent>
                      <CardActions style={{ justifyContent: 'center' }}>
                        <Link
                          to={`/host/follow-energy/${room.idElectricMetter}/${
                            room.name
                          }`}
                          style={{ textDecoration: 'none' }}
                        >
                          <StyledButton>Xem chi tiết</StyledButton>
                        </Link>
                      </CardActions>
                    </Card>
                  </Grid>
                </>
              ))
            ),
          )}
        </Grid>
        ) : (
          ''
        )}
      </>
      {/* ) : (
        <h1>Không có quyền truy cập</h1>
      )} */}
    </div>
  );
};

ManagerEnergyRoomsHost.propTypes = {
  dispatch: PropTypes.func,
  getMotel: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  motel: makeSelectMotel(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMotel: id => {
      dispatch(getMotel(id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default ManagerEnergyRooms;
export default compose(withConnect)(ManagerEnergyRoomsHost);

// {floors.map((floor, floorIndex) => (
//   <div key={floorIndex}>
//     {floor.rooms.map((room, roomIndex) => (
//       <>
//       <h2>{room.name}</h2>
//       <Grid key={roomIndex} item lg={3} md={4} sm={6} xs={12}>
//         <Card sx={{ maxWidth: 345 }}>
//           <CardMedia
//             component="img"
//             alt="green iguana"
//             height="140"
//             image="../../images/air_conditioner.png"
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               {room.Name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Id đồng hồ: {room.idElectricMetter === (undefined || "0") ? "Chưa được đặt": room.idElectricMetter}
//             </Typography>
//           </CardContent>
//           <CardActions style={{ justifyContent: 'center' }}>
//             <Link to={`/admin/follow-energy/${room.Id}/${room.name}`}>
//               <Button variant="contained" size="small">Xem chi tiết</Button>
//             </Link>
//           </CardActions>
//         </Card>
//       </Grid>
//       </>
//     ))}
//   </div>
// ))}

{
  /* <Grid item lg={3} md={4} sm={6} xs={12}>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      image="../../images/air_conditioner.png"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Tên phòng
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Id đồng hồ: 
                      </Typography>
                    </CardContent>
                    <CardActions style={{ justifyContent: 'center' }}>
                      <Link to={`/admin/follow-energy/${room.Id}/${room.name}`}>
                        <Button variant="contained" size="small">Xem chi tiết</Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid> */
}

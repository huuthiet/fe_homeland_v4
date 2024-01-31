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

import {
  Grid, 
  Paper,
  Card, 
  CardActions,
  CardContent,
  CardMedia, 
  Button,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { NavLink, useHistory } from 'react-router-dom';

import axios, { AxiosResponse } from 'axios';

import messages from './messages';
import { urlLink } from '../../helper/route';
import './style.scss';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

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

  console.log("id motel", motel);
  console.log("id floors", floors);

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
      {/* {currentUser.role.includes('host') && ( */}
      <Grid lg={12} container spacing={2}>
        {floors.map((floor, floorIndex) => (
          console.log("floor", floor),
          floor.rooms.map((room, roomIndex) => (
            
            <Grid key={roomIndex} item lg={3} md={4} sm={6} xs={12}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image="../../images/air_conditioner.png"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {room.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" 
                    style={{ color: room.idElectricMetter === "0" || room.idElectricMetter === undefined ? 'red' : 'inherit',
                                fontWeight: room.idElectricMetter === "0" || room.idElectricMetter === undefined ? 'bold' : 'normal' }}>
                    Id đồng hồ: {(room.idElectricMetter === "0" || room.idElectricMetter === undefined) ? "Chưa được đặt" : room.idElectricMetter}
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                  <Link to={`/host/follow-energy/${room.idElectricMetter}/${room.name}`}>
                    <Button variant="contained" size="small">Xem chi tiết</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))
        ))}
      </Grid>

      {/* )} */}
        </>
      {/* ) : (
        <h1>Không có quyền truy cập</h1>
      )} */}
    </div>
  );
}

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

{/* <Grid item lg={3} md={4} sm={6} xs={12}>
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
                </Grid> */}
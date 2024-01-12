/**
 *
 * MapsPage
 *
 */

import { Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import GoogleMaps from '../../components/GoogleMaps';
import { urlLink } from '../../helper/route';
import Money from '../App/format';
import { changeStoreData, getListRoom } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectMapsPage from './selectors';
import './style.scss';

export function MapsPage(props) {
  const history = useHistory();
  useInjectReducer({ key: 'mapsPage', reducer });
  useInjectSaga({ key: 'mapsPage', saga });
  useEffect(() => {
    props.getListRoom();
  }, []);
  const [windowHeight, setWindowHeight] = useState(0);
  const resizeWindow = () => {
    if (window.innerWidth < 576) {
      setWindowHeight(window.innerHeight * 0.01 - 57 * 0.01);
    } else {
      setWindowHeight(window.innerHeight * 0.01 - 100 * 0.01);
    }
  };
  useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    // loadImage();
    return () => window.removeEventListener('resize', resizeWindow);
  }, []);
  document.documentElement.style.setProperty('--vh', `${windowHeight}px`);
  const { listRoom = [], action1 } = props.mapsPage;

  const [room, setRoom] = useState({});

  // get img upload
  const [imageIds, setImageIds] = useState([]);

  const loadImage = async () => {
    const requestUrl = urlLink.api.serverUrl + urlLink.api.getuploadimg;
    try {
      const res = await fetch(requestUrl);
      const dataImg = await res.json();
      setImageIds(dataImg.data);
    } catch (err) {
      console.error(err);
    }
  };
  const aa = 0;
  return (
    <div className="maps-page-wrapper">
      <Helmet>
        <title>MapsPage</title>
        <meta name="description" content="Description of MapsPage" />
      </Helmet>
      <GoogleMaps
        listRoom={listRoom}
        setRoom={setRoom}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDU2f_gq1_kog47QeWuZrBuiTvNHFH2wUs&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />

      <div className="status-wrapper container">
        <div className="status">
          <div className="green-box" />
          Còn phòng
        </div>
        <div className="status">
          <div className="red-box" />
          Hết phòng
        </div>
        <div className="status">
          <div className="orange-box" />
          Sắp hết hạn
        </div>
      </div>
      {Object.keys(room).length !== 0 && (
        <div className="detail-wrapper">
          <div className="container">
            <button
              onClick={() => {
                setRoom({});
              }}
              type="button"
              className="close"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <div
              className="row"
              onClick={() => {
                /* eslint no-underscore-dangle: 0 */
                history.push(`/motel/${room._id}`);
              }}
              role="presentation"
            >
              <div className="col-4 full-image">
                {room.images ? (
                  <Avatar
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    variant="square"
                    alt="Avatar"
                    src={room.images}
                  >
                    N
                  </Avatar>
                ) : (
                  <Avatar
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    variant="square"
                    alt="Avatar"
                    src="./defaul-room.jpg"
                  >
                    N
                  </Avatar>
                )}
              </div>
              <div className="col-8">
                <div className="title">{room.name}</div>
                <div className="address">{room.address.address}</div>
                <div className="price">{Money(room.price || 0)}</div>
                <div className="phone">{room.contactPhone}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

MapsPage.propTypes = {
  getListRoom: PropTypes.func,
  mapsPage: PropTypes.object,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  mapsPage: makeSelectMapsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListRoom: () => {
      dispatch(getListRoom());
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

export default compose(withConnect)(MapsPage);

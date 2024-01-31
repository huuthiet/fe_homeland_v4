/**
 *
 * ForgotPassword
 *
 */

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Avatar } from '@material-ui/core';
import { Alert, Button, Col, Container, Row } from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import './style.scss';

import axios from 'axios';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import makeSelectRoomDetail from './selectors';
import saga from './saga';
import reducer from './reducer';
import CheckBox from '../../components/CheckBox';
import InputForm from '../../components/InputForm';
import { urlLink } from '../../helper/route';
import { changeStoreData, postMotel, putRoomDetailUpdate } from './actions';
import messages from './messages';
export function RoomDetail(props) {
  useInjectReducer({ key: 'roomDetail', reducer });
  useInjectSaga({ key: 'roomDetail', saga });
  const { id } = useParams();

  const { room = {} } = props.roomDetail;

  const utils = room.utilities;
  const { status } = room;

  let statusRoom = '';
  if (status) {
    if (status.toString() === 'available') {
      statusRoom = <FormattedMessage {...messages.available} />;
    } else if (status.toString() === 'rented') {
      statusRoom = <FormattedMessage {...messages.rented} />;
    } else if (status.toString() === 'deposited') {
      statusRoom = <FormattedMessage {...messages.deposited} />;
    } else {
      statusRoom = <FormattedMessage {...messages.unknown} />;
    }
  }

  // const [utilities, setUtilities] = useState([]);
  const [utilities, setUtilities] = useState(utils || []);

  // if (!Array.isArray(utilities)) {
  //   console.log(utils);
  //   setUtilities([]);
  // }

  const options = [
    { value: 'available', label: <FormattedMessage {...messages.available} /> },
    { value: 'rented', label: <FormattedMessage {...messages.rented} /> },
    { value: 'unknown', label: <FormattedMessage {...messages.unknown} /> },
    { value: 'deposited', label: <FormattedMessage {...messages.deposited} /> },
    {
      value: 'monthlyPayment',
      label: <FormattedMessage {...messages.monthlyPayment} />,
    },
    {
      value: 'roomedPayment',
      label: <FormattedMessage {...messages.roomedPayment} />,
    },
  ];
  const history = useHistory();

  const handleFileInputChange = async e => {
    const dataOptions = e.value;
    const requestUrl = urlLink.api.serverUrl + urlLink.api.editStatus + id;
    try {
      await fetch(`${requestUrl}`, {
        method: 'POST',
        body: JSON.stringify({ data: dataOptions }),
        headers: { 'Content-Type': 'application/json' },
      });
      // feth data
      history.push(`/room-detail/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  let availableDateRoom = '';
  if (room.availableDate) {
    availableDateRoom = moment(room.availableDate).format('MM/DD/YYYY');
  } else {
    availableDateRoom = new Date();
  }

  // Edit utilities
  const [utiWifi, setUtiWifi] = useState(utilities.indexOf('wifi') !== -1);

  // eslint-disable-next-line camelcase
  const [giat_ui, setGiat_ui] = useState(utilities.indexOf('giat_ui') !== -1);

  // eslint-disable-next-line camelcase
  const [utigiu_xe, setUtigiu_xe] = useState(
    utilities.indexOf('giu_xe') !== -1,
  );
  // eslint-disable-next-line camelcase
  const [truyen_hinh, settruyen_hinh] = useState(
    utilities.indexOf('truyen_hinh') !== -1,
  );
  // eslint-disable-next-line camelcase
  const [dieu_hoa, setdieu_hoa] = useState(
    utilities.indexOf('dieu_hoa') !== -1,
  );
  // eslint-disable-next-line camelcase
  const [utibon_cau, setUtibon_cau] = useState(
    utilities.indexOf('bon_cau') !== -1,
  );

  // eslint-disable-next-line camelcase
  const [utigac_lung, setUtigac_lung] = useState(
    utilities.indexOf('gac_lung') !== -1,
  );
  // eslint-disable-next-line camelcase
  const [bon_rua_mat, setbon_rua_mat] = useState(
    utilities.indexOf('bon_rua_mat') !== -1,
  );

  // eslint-disable-next-line camelcase
  const [utidon_phong, setUtidon_phong] = useState(
    utilities.indexOf('don_phong') !== -1,
  );
  // eslint-disable-next-line camelcase
  const [san_go, setsan_go] = useState(utilities.indexOf('san_go') !== -1);

  // eslint-disable-next-line camelcase
  const [utitu_quan_ao, setUtitu_quan_ao] = useState(
    utilities.indexOf('tu_quan_ao') !== -1,
  );
  // eslint-disable-next-line camelcase
  const [voi_hoa_sen, setvoi_hoa_sen] = useState(
    utilities.indexOf('voi_hoa_sen') !== -1,
  );
  // eslint-disable-next-line camelcase
  const [utigio_giac_tu_do, setUtigio_giac_tu_do] = useState(
    utilities.indexOf('gio_giac_tu_do') !== -1,
  );
  // eslint-disable-next-line camelcase
  const [loi_di_rieng, setloi_di_rieng] = useState(
    utilities.indexOf('loi_di_rieng') !== -1,
  );
  // end

  // Data Submut
  const [electricityPrice, setElectricityPrice] = useState(
    room.electricityPrice,
  );
  const [name, setname] = useState(room.name);
  const [idElectricMetter, setIdElectricMetter] = useState(
    room.idElectricMetter === '0' ? null : room.idElectricMetter
  );
  const [price, setprice] = useState(room.price);
  const [waterPrice, setwaterPrice] = useState(room.waterPrice);
  const [minimumMonths, setMinimumMonths] = useState(room.minimumMonths);
  const [availableDate, setAvailableDate] = useState(availableDateRoom);
  const [acreage, setAcreage] = useState(room.acreage);

  const [depositPrice, setDepositPrice] = useState(room.depositPrice);
  const [roomPassword, setRoomPassword] = useState(room.roomPassword);

  // New
  const [wifiPrice, setWifiPrice] = useState(room.wifiPrice);
  const [garbagePrice, setGarbagePrice] = useState(room.garbagePrice);
  const [arrayCallImg, setArrayCallImg] = useState([]);
  const [arrayRemoveImg, setArrayRemoveImg] = useState([]);

  const [arrayImg, setArrayImg] = useState(room.images || []);

  const handleFileInputChangeFile = async e => {
    const dataFile = e.target.files;
    setArrayCallImg([]);
    const newArr = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < dataFile.length; i++) {
      const formData = new FormData();
      formData.append('file', dataFile[i]);
      const data = {
        id,
        formData,
      };
      // view image
      let viewImage = [];
      viewImage = arrayImg;
      if (dataFile[i]) {
        viewImage.push(URL.createObjectURL(dataFile[i]));
      } else {
        viewImage.push('');
      }
      newArr.push(data);
    }

    setArrayCallImg(newArr);
  };
  const handleCallImages = () => {
    const n = arrayCallImg.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < n; i++) {
      apiPostImg(arrayCallImg[i]);
    }
  };
  const handleRemoveClick = (value, index) => {
    const newArr = arrayRemoveImg;
    newArr.push(value);
    setArrayRemoveImg(newArr);
    setArrayImg(prevImages => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const apiPostImg = async payload => {
    // eslint-disable-next-line no-shadow
    const { id, formData } = payload;
    const requestUrl = `${urlLink.api.serverUrl +
      urlLink.api.motelDetail}imgs/${id}`;

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    try {
      const response = await axios.post(requestUrl, formData, config);
      if (response.data.data.images) {
        return response.data.data.images.imageUrl;
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>RoomDetailUpdate</title>
        <meta name="description" content="Description of ForgotPassword" />
      </Helmet>
      <Container>
        <div className="title mb-3">
          <h3>
            <FormattedMessage {...messages.UpdateRoom} />{' '}
          </h3>
        </div>
        <Row>
          <Col md={6}>
            <h5>
              <FormattedMessage {...messages.AutoUpdate} />
            </h5>
            <Select
              placeholder={statusRoom}
              options={options}
              className="mb-3"
              onChange={e => {
                handleFileInputChange(e);
              }}
            />
          </Col>
          <Col md={3}>
            <InputForm
              label={<FormattedMessage {...messages.MinMonthRented} />}
              type="number"
              min={1}
              max={12}
              placeholder="Tháng"
              value={minimumMonths}
              name="minimumMonths"
              autoComplete="description"
              onChange={evt => {
                // eslint-disable-next-line radix
                const month = parseInt(evt.target.value);

                if (month > 12) {
                  setMinimumMonths(1);
                } else {
                  setMinimumMonths(month);
                }
              }}
            />
          </Col>
          <Col md={3} className="PickerCol">
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={moment(availableDate, 'MM/DD/YYYY').toDate()}
              onChange={date => {
                setAvailableDate(moment(date).format('MM/DD/YYYY'));
              }}
              customInput={
                <InputForm
                  label={<FormattedMessage {...messages.CheckInDate} />}
                  icon="fa fa-calendar"
                />
              }
            />
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <InputForm
              label={<FormattedMessage {...messages.NameRoom} />}
              type="text"
              min={0}
              name="name"
              value={name}
              autoComplete="description"
              onChange={evt => {
                setname(evt.target.value);
              }}
            />
          </Col>
          <Col md={3}>
            <InputForm
              label={<FormattedMessage {...messages.AcreageRoom} />}
              type="text"
              min={15}
              name="acreage"
              value={acreage}
              autoComplete="description"
              onChange={evt => {
                setAcreage(evt.target.value);
              }}
            />
          </Col>
          <Col md={3}>
            <InputForm
              type="text"
              label={<FormattedMessage {...messages.electricMetter} />}
              // min={0}
              name="electricMetter"
              value={idElectricMetter}
              onChange={evt => {
                setIdElectricMetter(evt.target.value);
              }}
            />
          </Col>
          <Col md={3}>
            <InputForm
              type="number"
              label={<FormattedMessage {...messages.PriceName} />}
              min={0}
              name="minPrice"
              value={price}
              onChange={evt => {
                setprice(evt.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3} xs={6}>
            <InputForm
              label={<FormattedMessage {...messages.electricityPrice} />}
              type="number"
              min={0}
              placeholder="VND"
              value={electricityPrice}
              name="electricityPrice"
              autoComplete="description"
              onChange={evt => {
                setElectricityPrice(evt.target.value);
              }}
            />
          </Col>
          <Col md={3} xs={6}>
            <InputForm
              label={<FormattedMessage {...messages.waterPrice} />}
              type="number"
              min={0}
              placeholder="VND"
              name="waterPrice"
              value={waterPrice}
              autoComplete="waterPrice"
              onChange={evt => {
                setwaterPrice(evt.target.value);
              }}
            />
          </Col>
          <Col md={3} xs={6}>
            <InputForm
              label="Mã Khóa Phòng"
              type="number"
              min={100000}
              max={999999}
              value={roomPassword}
              name="roomPassword"
              autoComplete="roomPassword"
              disabled={room.status === 'rented'}
              onChange={evt => {
                setRoomPassword(evt.target.value);
              }}
            />
          </Col>
          <Col md={3} xs={6}>
            <InputForm
              label="Tiền Thế Chân"
              type="number"
              min={0}
              placeholder="VND"
              name="depositPrice"
              value={depositPrice}
              autoComplete="depositPrice"
              onChange={evt => {
                setDepositPrice(evt.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {roomPassword > 999999 && (
              <Alert color="danger" className="mt-3">
                Mã Phòng Phải từ 100.000 đến 999.999
              </Alert>
            )}
            {roomPassword < 100000 && (
              <Alert color="danger" className="mt-3">
                Mã Phòng Phải từ 100.000 đến 999.999
              </Alert>
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={3}>
            <InputForm
              label={<FormattedMessage {...messages.wifiPrice} />}
              type="number"
              min={0}
              placeholder="VND"
              value={wifiPrice}
              name="wifiPrice"
              autoComplete="wifiPrice"
              onChange={evt => {
                setWifiPrice(evt.target.value);
              }}
            />
          </Col>
          <Col xs={6} md={3}>
            <InputForm
              label={<FormattedMessage {...messages.garbagePrice} />}
              type="number"
              min={0}
              placeholder="VND"
              value={garbagePrice}
              name="garbagePrice"
              autoComplete="description"
              onChange={evt => {
                setGarbagePrice(evt.target.value);
              }}
            />
          </Col>
          <Col xs={12}>
            <input
              type="file"
              id="fileupload"
              accept=".png, .jpg"
              multiple="multiple"
              onChange={e => {
                handleFileInputChangeFile(e);
              }}
            />
          </Col>
        </Row>
        <Row>
          {arrayImg.length > 0 &&
            arrayImg.map((value, index) => (
              <Col xs={6} md={3} className="text-center">
                <Avatar
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  style={{
                    width: '100%',
                    height: '200px',
                    margin: '10px auto',
                    position: 'relative',
                  }}
                  variant="square"
                  alt="Avatar"
                  src={value}
                />
                <Button
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '15px',
                  }}
                  className="remove-button"
                  onClick={() => {
                    handleRemoveClick(value, index);
                  }}
                  color="primary"
                >
                  X
                </Button>
              </Col>
            ))}
        </Row>
        <Row>
          <Col md={12}>
            <h4 className="text-center">
              {<FormattedMessage {...messages.ListRoomAcc} />}
            </h4>
          </Col>
          <Col xs={4}>
            <CheckBox
              label="Internet"
              onChange={e => {
                setUtiWifi(false);
                const index = utilities.indexOf('wifi');
                if (e.target.checked) {
                  if (index === -1) {
                    const newArr = [...utilities];
                    newArr.push('wifi');
                    setUtilities(newArr);
                    setUtiWifi(true);
                  }
                } else if (index !== -1) {
                  const newArr = [...utilities];
                  newArr.splice(index, 1);
                  setUtilities(newArr);
                }
              }}
              checked={utiWifi}
            />
          </Col>
          <Col xs={4}>
            <CheckBox
              label={<FormattedMessage {...messages.washingDrying} />}
              onChange={e => {
                setGiat_ui(false);
                const index = utilities.indexOf('giat_ui');
                if (e.target.checked) {
                  if (index === -1) {
                    const newArr = [...utilities];
                    newArr.push('giat_ui');
                    setUtilities(newArr);
                    setGiat_ui(true);
                  }
                } else if (index !== -1) {
                  const newArr = [...utilities];
                  newArr.splice(index, 1);
                  setUtilities(newArr);
                }
              }}
              checked={giat_ui}
            />
          </Col>
          <Col xs={4}>
            <CheckBox
              label={<FormattedMessage {...messages.parkingLot} />}
              onChange={e => {
                setUtigiu_xe(false);
                const index = utilities.indexOf('giu_xe');
                if (e.target.checked) {
                  if (index === -1) {
                    const newArr = [...utilities];
                    newArr.push('giu_xe');
                    setUtilities(newArr);
                    setUtigiu_xe(true);
                  }
                } else if (index !== -1) {
                  const newArr = [...utilities];
                  newArr.splice(index, 1);
                  setUtilities(newArr);
                }
              }}
              checked={utigiu_xe}
            />
          </Col>
          <Col xs={4}>
            <CheckBox
              label={<FormattedMessage {...messages.television} />}
              onChange={e => {
                const index = utilities.indexOf('truyen_hinh');
                settruyen_hinh(false);
                if (e.target.checked) {
                  if (index === -1) {
                    const newArr = [...utilities];
                    newArr.push('truyen_hinh');
                    setUtilities(newArr);
                    settruyen_hinh(true);
                  }
                } else if (index !== -1) {
                  const newArr = [...utilities];
                  newArr.splice(index, 1);
                  setUtilities(newArr);
                  e.checked = false;
                }
              }}
              checked={truyen_hinh}
            />
          </Col>
          <Col xs={4}>
            <CheckBox
              label={<FormattedMessage {...messages.AirConditioner} />}
              onChange={e => {
                setdieu_hoa(false);
                const index = utilities.indexOf('dieu_hoa');
                if (e.target.checked) {
                  if (index === -1) {
                    const newArr = [...utilities];
                    newArr.push('dieu_hoa');
                    setUtilities(newArr);
                    setdieu_hoa(true);
                  }
                } else if (index !== -1) {
                  const newArr = [...utilities];
                  newArr.splice(index, 1);
                  setUtilities(newArr);
                }
              }}
              checked={dieu_hoa}
            />
          </Col>
          <Col xs={4}>
            <CheckBox
              label={<FormattedMessage {...messages.toiletBowl} />}
              onChange={e => {
                setUtibon_cau(false);
                const index = utilities.indexOf('bon_cau');
                if (e.target.checked) {
                  if (index === -1) {
                    const newArr = [...utilities];
                    newArr.push('bon_cau');
                    setUtilities(newArr);
                    setUtibon_cau(true);
                  }
                } else if (index !== -1) {
                  const newArr = [...utilities];
                  newArr.splice(index, 1);
                  setUtilities(newArr);
                }
              }}
              checked={utibon_cau}
            />
          </Col>
          <Col xs={4}>
            <CheckBox
              label={<FormattedMessage {...messages.Mezzanine} />}
              onChange={e => {
                setUtigac_lung(false);
                const index = utilities.indexOf('gac_lung');
                if (e.target.checked) {
                  if (index === -1) {
                    const newArr = [...utilities];
                    newArr.push('gac_lung');
                    setUtilities(newArr);
                    setUtigac_lung(true);
                  }
                } else if (index !== -1) {
                  const newArr = [...utilities];
                  newArr.splice(index, 1);
                  setUtilities(newArr);
                }
              }}
              checked={utigac_lung}
            />
          </Col>
          <Col xs={4}>
            <CheckBox
              label={<FormattedMessage {...messages.washstand} />}
              onChange={e => {
                setbon_rua_mat(false);
                const index = utilities.indexOf('bon_rua_mat');
                if (e.target.checked) {
                  if (index === -1) {
                    const newArr = [...utilities];
                    newArr.push('bon_rua_mat');
                    setUtilities(newArr);
                    setbon_rua_mat(true);
                  }
                } else if (index !== -1) {
                  const newArr = [...utilities];
                  newArr.splice(index, 1);
                  setUtilities(newArr);
                }
              }}
              checked={bon_rua_mat}
            />
          </Col>
          <Col xs={4}>
            <CheckBox
              label={<FormattedMessage {...messages.clearTheRoom} />}
              onChange={e => {
                setUtidon_phong(false);
                const index = utilities.indexOf('don_phong');
                if (e.target.checked) {
                  if (index === -1) {
                    const newArr = [...utilities];
                    newArr.push('don_phong');
                    setUtilities(newArr);
                    setUtidon_phong(true);
                  }
                } else if (index !== -1) {
                  const newArr = [...utilities];
                  newArr.splice(index, 1);
                  setUtilities(newArr);
                }
              }}
              checked={utidon_phong}
            />
          </Col>
          <Col xs={4}>
            <CheckBox
              label={<FormattedMessage {...messages.WoodFloor} />}
              onChange={e => {
                setsan_go(false);
                const index = utilities.indexOf('san_go');
                if (e.target.checked) {
                  if (index === -1) {
                    const newArr = [...utilities];
                    newArr.push('san_go');
                    setUtilities(newArr);
                    setsan_go(true);
                  }
                } else if (index !== -1) {
                  const newArr = [...utilities];
                  newArr.splice(index, 1);
                  setUtilities(newArr);
                }
              }}
              checked={san_go}
            />
          </Col>
          <Col xs={4}>
            <CheckBox
              label={<FormattedMessage {...messages.Wardrobe} />}
              onChange={e => {
                setUtitu_quan_ao(false);
                const index = utilities.indexOf('tu_quan_ao');
                if (e.target.checked) {
                  if (index === -1) {
                    const newArr = [...utilities];
                    newArr.push('tu_quan_ao');
                    setUtilities(newArr);
                    setUtitu_quan_ao(true);
                  }
                } else if (index !== -1) {
                  const newArr = [...utilities];
                  newArr.splice(index, 1);
                  setUtilities(newArr);
                }
              }}
              checked={utitu_quan_ao}
            />
          </Col>
          <Col xs={4}>
            <CheckBox
              label={<FormattedMessage {...messages.shower} />}
              onChange={e => {
                setvoi_hoa_sen(false);
                const index = utilities.indexOf('voi_hoa_sen');
                if (e.target.checked) {
                  if (index === -1) {
                    const newArr = [...utilities];
                    newArr.push('voi_hoa_sen');
                    setUtilities(newArr);
                    setvoi_hoa_sen(true);
                  }
                } else if (index !== -1) {
                  const newArr = [...utilities];
                  newArr.splice(index, 1);
                  setUtilities(newArr);
                }
              }}
              checked={voi_hoa_sen}
            />
          </Col>
          <Col xs={4}>
            <CheckBox
              label={<FormattedMessage {...messages.FreeTime} />}
              onChange={e => {
                setUtigio_giac_tu_do(false);
                const index = utilities.indexOf('gio_giac_tu_do');
                if (e.target.checked) {
                  if (index === -1) {
                    const newArr = [...utilities];
                    newArr.push('gio_giac_tu_do');
                    setUtilities(newArr);
                    setUtigio_giac_tu_do(true);
                  }
                } else if (index !== -1) {
                  const newArr = [...utilities];
                  newArr.splice(index, 1);
                  setUtilities(newArr);
                }
              }}
              checked={utigio_giac_tu_do}
            />
          </Col>
          <Col xs={4}>
            <CheckBox
              label={<FormattedMessage {...messages.PrivateEntrance} />}
              onChange={e => {
                setloi_di_rieng(false);
                const index = utilities.indexOf('loi_di_rieng');
                if (e.target.checked) {
                  if (index === -1) {
                    const newArr = [...utilities];
                    newArr.push('loi_di_rieng');
                    setUtilities(newArr);
                    setloi_di_rieng(true);
                  }
                } else if (index !== -1) {
                  const newArr = [...utilities];
                  newArr.splice(index, 1);
                  setUtilities(newArr);
                }
              }}
              checked={loi_di_rieng}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12}>
            <Button
              color="primary"
              className="btn-block mt-3"
              type="submit"
              onClick={() => {
                if (roomPassword <= 999999 && roomPassword >= 100000) {
                  const data = {
                    utilities,
                    id,
                    name,
                    idElectricMetter,
                    electricityPrice,
                    price,
                    waterPrice,
                    minimumMonths,
                    availableDate,
                    acreage,
                    roomPassword,
                    wifiPrice,
                    garbagePrice,
                    depositPrice,
                    arrayRemoveImg,
                  };
                  handleCallImages();
                  props.putRoomDetailUpdate(data);
                }
              }}
            >
              {<FormattedMessage {...messages.UpdateRoom} />}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

RoomDetail.propTypes = {
  dispatch: PropTypes.func,
  postMotel: PropTypes.func,
  roomDetail: PropTypes.object,
  changeStoreData: PropTypes.func,
  putRoomDetailUpdate: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  roomDetail: makeSelectRoomDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    postMotel: data => {
      dispatch(postMotel(data));
    },
    putRoomDetailUpdate: data => {
      dispatch(putRoomDetailUpdate(data));
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

export default compose(withConnect)(RoomDetail);

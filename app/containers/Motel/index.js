/**
 *
 * Motel
 *
 */

import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import localStore from 'local-storage';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Button, Col, Container, Row, UncontrolledCarousel } from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';
import Money from '../App/format';
import { changeStoreData, getMotel, postFloor } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectMotel from './selectors';
import './style.scss';

export function Motel(props) {
  const { id } = useParams();
  const history = useHistory();
  useInjectReducer({ key: 'motel', reducer });
  useInjectSaga({ key: 'motel', saga });
  useEffect(() => {
    props.getMotel(id);
  }, []);
  const [formData, setFormData] = useState('');
  const {
    motel = {},
    showSuccessPopup,
    showErrorPopup,
    showWarningPopup,
  } = props.motel;
  const isEdit =
    localStore.get('user') === null
      ? false
      : motel.owner === localStore.get('user')._id;
  const { images = [] } = motel;
  const items = [];
  //   images.map((item, key) => {
  //     items.push({
  //       key,
  //       src: item,
  //       altText: '',
  //       caption: '',
  //       header: '',
  //     });
  //   });
  const {
    _id,
    name = '',
    totalFloor = '',
    totalRoom = '',
    price = '',
    description = '',
    address = {},
  } = motel;
  return (
    <div className="motel-wrapper">
      <Helmet>
        <title>Motel</title>
        <meta name="description" content="Description of Motel" />
      </Helmet>
      <UncontrolledCarousel className="image-slider" items={items} />
      <Container>
        <div className="content">
          <Row>
            <Col xs={4}>
              <div className="name bold">{name}</div>
            </Col>
            {isEdit && (
              <Fragment>
                <Col xs={4}>
                  <div
                    className="edit-button"
                    onClick={() => {
                      history.push(`/update-motel/${_id}`);
                    }}
                  >
                    <img src="/edit.png" />
                  </div>
                </Col>
                <Col xs={4}>
                  <div
                    className="add-button"
                    onClick={() => {
                      const data = {
                        motelRoomId: id,
                        name: `Tầng ${totalFloor + 1}`,
                        description: '',
                      };
                      setFormData(data);
                      props.changeStoreData('showWarningPopup', true);
                    }}
                  >
                    <img src="/icon_add.png" />
                  </div>
                </Col>
              </Fragment>
            )}
          </Row>
          <div className="details">
            <div className="detail totalFloor">
              <FormattedMessage {...messages.NumberofFloors} />{' '}
              <span className="bold">{totalFloor}</span>{' '}
              <FormattedMessage {...messages.Floor} />
            </div>
            <div className="detail totalRoom">
              <FormattedMessage {...messages.All} />{' '}
              <span className="bold">{totalRoom}</span>{' '}
              <FormattedMessage {...messages.Room} />
            </div>
          </div>
          <div className="price">
            <FormattedMessage {...messages.PriceFluctuates} />{' '}
            <span className="red-price">{Money(price)}</span>
          </div>
          <div className="description">
            <FormattedMessage {...messages.description} /> {description}
          </div>
          <div className="address">
            <FormattedMessage {...messages.address} /> {address.address}
          </div>
        </div>
        <Button
          color="primary"
          className="btn-block"
          onClick={() => {
            history.push(`/motel-detail/${_id}`);
          }}
        >
          <FormattedMessage {...messages.Detail} />
        </Button>
      </Container>
      <SuccessPopup
        visible={showSuccessPopup}
        content={<FormattedMessage {...messages.AddedFloorSuccessfully} />}
        toggle={() => {
          props.changeStoreData('showSuccessPopup', !showSuccessPopup);
        }}
      />
      <WarningPopup
        visible={showWarningPopup}
        content={<FormattedMessage {...messages.addFloor} />}
        callBack={() => props.postFloor(id, formData)}
        toggle={() => {
          props.changeStoreData('showWarningPopup', false);
        }}
      />
    </div>
  );
}

Motel.propTypes = {
  dispatch: PropTypes.func,
  getMotel: PropTypes.func,
  postFloor: PropTypes.func,
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
    postFloor: (id, formData) => {
      dispatch(postFloor(id, formData));
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

export default compose(withConnect)(Motel);

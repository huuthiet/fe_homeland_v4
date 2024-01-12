/**
 *
 * FloorDetail
 *
 */

import React, { useState } from 'react';
import './style.scss';
import ClassNames from 'classnames';
import { Row, Col } from 'reactstrap';
import localStore from 'local-storage';
import _ from 'lodash';
import Room from '../Room';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import localStoreService from 'local-storage';

function FloorDetail(props) {
  const { floors = [] } = props.motelDetail.motel;
  const [index, setIndex] = useState(0);
  const isEdit =
    localStore.get('user') === null
      ? false
      : props.owner === localStore.get('user')._id
      ? true
      : localStore.get('user').role.length == 1
      ? true
      : false;
  let isHost = false;
  if (localStore.get('user') && localStore.get('user').role) {
    if (localStore.get('user').role.length) {
      for (let index = 0; index < localStore.get('user').role.length; index++) {
        const element = localStore.get('user').role[index];
        if (element == 'host') {
          isHost = true;
        }
      }
    }
  }
  // console.log(localStore.get('user').role.length);
  const history = useHistory();
  return (
    <div className="floor-detail-wrapper">
      <div className="topnav">
        {floors.map((item, key) => (
          <div
            key={key}
            className={ClassNames('item', { active: index === key })}
            onClick={() => {
              index !== key && setIndex(key);
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="room-list">
        {localStoreService.get('user') === null
          ? history.push(`/auth/login`)
          : localStoreService.get('user').role.length > 1 && (
              <div
                className={ClassNames('button-add', { hidden: !isEdit })}
                onClick={() => {
                  // console.log(floors[index]._id,

                  history.push(`/createroom/${floors[index]._id}`);
                }}
              >
                <img src="/icon_add.png" />
              </div>
            )}

        <Row>
          {floors[index] &&
            floors[index].rooms &&
            floors[index].rooms.map((item, key) => (
              <Col xs={6} key={key}>
                <Room
                  isHost={isHost}
                  isEdit={isEdit}
                  item={item}
                  status={props.status}
                />
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}

FloorDetail.propTypes = {};

export default FloorDetail;

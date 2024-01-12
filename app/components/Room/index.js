/**
 *
 * Room
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import './style.scss';
import { useHistory } from 'react-router-dom';
import useLongPress from './longpress';

function Room(props) {
  const { item = {}, status = '', isEdit, isHost } = props;
  const history = useHistory();
  /* eslint no-underscore-dangle: 0 */
  const backspaceLongPress = useLongPress(() => {
    history.push(`/update-room/${item._id}`);
  }, 500);
  return (
    <div
      role="presentation"
      {...isEdit && {
        ...backspaceLongPress,
      }}
      className={ClassNames(
        'room-box',
        { available: status === '2' && item.status === 'available' },
        { rented: status === '1' && item.status === 'rented' },
        { deposited: status === '3' && item.status === 'deposited' },
        status === '0' && item.status,
      )}
      onClick={() => {
        if (isHost) {
          history.push(`/room-detail/${item._id}`);
        } else if (isEdit === false) {
          history.push('/auth/login');
        } else {
          /* eslint no-underscore-dangle: 0 */
          history.push(`/room-detail/${item._id}`);
        }
      }}
    >
      <div className="name">
        {item.status === 'unknown' ? 'Chưa cập nhật' : item.name}
      </div>
      <div className="price">
        {item.status === 'unknown' ? 'unknown' : `${item.acreage} m2`}
      </div>
    </div>
  );
}

Room.propTypes = {
  item: PropTypes.object,
  status: PropTypes.string,
  isEdit: PropTypes.bool,
  isHost: PropTypes.bool,
};

export default Room;

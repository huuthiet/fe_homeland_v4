/**
 *
 * AdminUsers
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { DataGrid } from '@mui/x-data-grid';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import InputForm from '../../components/InputForm';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';
import Money from '../App/format';
import Modal from 'react-modal';
import {
  changeStoreData,
  deleteAdminUser,
  getAdminUsers,
  postUpdateUser,
  resetPWAdminUser,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectAdminUsers from './selectors';

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
export function AdminUsers(props) {
  useInjectReducer({ key: 'adminUsers', reducer });
  useInjectSaga({ key: 'adminUsers', saga });
  const history = useHistory();
  useEffect(() => {
    props.getAdminUsers();
    Modal.setAppElement('body');
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const [id, setId] = useState('');
  const [dataReq, setDataReq] = useState('');
  const [idReq, setIdReq] = useState('');
  const {
    users,
    showSuccessPopup,
    showWarningPopup,
    showSuccessPopupWall,
    showWarningPopupWall,
    showSuccessResetPW,
    PwNew,
    showWarningResetPW,
  } = props.adminUsers;

  const [wallet, setWallet] = useState();
  const [userProfile, setUserProfile] = useState({});

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'fullName',
      headerName: 'Họ và Tên',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'phoneNumber',
      headerName: 'Số điện thoại',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'wallet',
      headerName: 'Số tiền trong ví',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      valueGetter: params => {
        return `${Money(params.value)} đ`;
      },
    },
    {
      field: 'edit',
      headerName: 'Sự Kiện',
      headerAlign: 'center',
      width: 600,
      headerClassName: 'header-bold',
      renderCell: params => {
        // eslint-disable-next-line no-unused-expressions
        return (
          <>
            <Button
              style={{ marginRight: '10px' }}
              color="primary"
              onClick={() => {
                setUserProfile(params.row);
                setWallet('');
                setWallet(params.row.wallet);
                toggleModal();
              }}
            >
              <i className="fa fa-edit" aria-hidden="true">
                Update
              </i>
            </Button>
            <Button
              color="success"
              onClick={() => {
                /* eslint no-underscore-dangle: 0 */
                history.push(`/admin/users/${params.row._id}`);
              }}
            >
              <i className="fa fa-edit" aria-hidden="true">
                Edit
              </i>
            </Button>
            <Button
              style={{ margin: '0 10px' }}
              color="success"
              onClick={() => {
                /* eslint no-underscore-dangle: 0 */
                history.push(`/admin/user/job/list/${params.row._id}`);
              }}
            >
              <i className="fa fa-edit" aria-hidden="true">
                Đơn hàng
              </i>
            </Button>
            <Button
              style={{ marginRight: '10px' }}
              onClick={() => {
                /* eslint no-underscore-dangle: 0 */
                setId(params.row._id);

                props.changeStoreData('showWarningPopup', true);
              }}
            >
              <i className="fa fa-trash-o" aria-hidden="true" />
            </Button>
            <Button
              color="danger"
              onClick={() => {
                /* eslint no-underscore-dangle: 0 */
                setId(params.row._id);

                props.changeStoreData('showWarningResetPW', true);
              }}
            >
              <i className="fa fa-refresh" aria-hidden="true">
                Reset PW
              </i>
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Helmet>
        <title>AdminUsers</title>
        <meta name="description" content="Description of AdminUsers" />
      </Helmet>
      <div
        className="admin-users-wrapper container-fulid"
        style={{ margin: '15px' }}
      >
        <Modal
          isOpen={isOpen}
          onRequestClose={toggleModal}
          contentLabel="My dialog"
          style={customStyles}
        >
          <div className="deposit">
            <InputForm
              name={`wallet${userProfile._id}`}
              autoComplete={`wallet${userProfile._id}`}
              icon="fa fa-money"
              value={wallet}
              placeholder={wallet}
              onChange={e => {
                setWallet(e.target.value);
              }}
            />
          </div>
          <Button
            color="primary"
            onClick={() => {
              // eslint-disable-next-line camelcase
              const id_user = userProfile._id;
              const data = wallet;
              setDataReq(data);
              setIdReq(id_user);
              props.changeStoreData('showWarningPopupWall', true);
            }}
          >
            <i className="fa fa-edit" aria-hidden="true">
              Update
            </i>
          </Button>
        </Modal>
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={users}
            columns={columns}
            pageSize={10}
            autoHeight
            isCellEditable={params => params.key}
          />
        </div>
      </div>
      <SuccessPopup
        visible={showSuccessPopup}
        content="Xóa thành công"
        toggle={() => {
          props.changeStoreData('showSuccessPopup', !showSuccessPopup);
        }}
      />

      <SuccessPopup
        visible={showSuccessResetPW}
        content={`Rest PW: ${PwNew}`}
        toggle={() => {
          props.changeStoreData('showSuccessResetPW', !showSuccessResetPW);
        }}
      />

      <SuccessPopup
        visible={showSuccessPopupWall}
        content="Cập nhật thành công"
        toggle={() => {
          props.changeStoreData('showSuccessPopupWall', !showSuccessPopupWall);
        }}
      />

      <WarningPopup
        visible={showWarningPopup}
        content="Bạn thực sự muốn xóa?"
        callBack={() => props.deleteAdminUser(id, '')}
        toggle={() => {
          props.changeStoreData('showWarningPopup', false);
        }}
      />

      <WarningPopup
        visible={showWarningResetPW}
        content="Bạn thực sự muốn reset PW?"
        callBack={() => props.resetPWAdminUser(id, '')}
        toggle={() => {
          props.changeStoreData('showWarningResetPW', false);
        }}
      />

      <WarningPopup
        visible={showWarningPopupWall}
        content="Bạn thực sự muốn cập nhật số tiền?"
        callBack={() => {
          props.postUpdateUser(idReq, dataReq);
          toggleModal();
          props.getAdminUsers();
        }}
        toggle={() => {
          props.changeStoreData('showWarningPopupWall', false);
        }}
      />
    </div>
  );
}

AdminUsers.propTypes = {
  getAdminUsers: PropTypes.func,
  adminUsers: PropTypes.object,
  deleteAdminUser: PropTypes.func,
  resetPWAdminUser: PropTypes.func,
  changeStoreData: PropTypes.func,
  postUpdateUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminUsers: makeSelectAdminUsers(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAdminUsers: () => {
      dispatch(getAdminUsers());
    },
    deleteAdminUser: (userId, reason) => {
      dispatch(deleteAdminUser(userId, reason));
    },
    resetPWAdminUser: (userId, reason) => {
      dispatch(resetPWAdminUser(userId, reason));
    },
    postUpdateUser: (userId, reason) => {
      dispatch(postUpdateUser(userId, reason));
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

export default compose(withConnect)(AdminUsers);

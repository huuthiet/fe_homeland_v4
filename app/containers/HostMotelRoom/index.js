/**
 *
 * HostMotelRoom
 *
 */
import { DataGrid } from '@mui/x-data-grid';
import localStore from 'local-storage';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getListRoom } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectHostMotelRoom from './selectors';
import './style.scss';
export function HostMotelRoom(props) {
  useInjectReducer({ key: 'hostMotelRoom', reducer });
  useInjectSaga({ key: 'hostMotelRoom', saga });
  const history = useHistory();
  const { listRoom = [] } = props.hostMotelRoom;
  const currentUser = localStore.get('user') || {};
  const { _id } = currentUser;
  useEffect(() => {
    props.getListRoom();
  }, []);

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'hostName',
      headerName: 'Tên Chủ Trọ',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'addressFull',
      headerName: 'Địa Chỉ',
      headerAlign: 'center',
      width: 550,
      headerClassName: 'header-bold',
    },
    {
      field: 'contactPhone',
      headerName: 'SDT',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
    },
    {
      field: '_id',
      headerName: 'Link Danh Sách Phòng',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params => (
        // eslint-disable-next-line no-unused-expressions
        <Button
          color="primary"
          onClick={() => {
            history.push(`/hostMotelRoom/${params.value}`);
          }}
        >
          Chi tiết
        </Button>
      ),
    },
    {
      field: 'sumOrder',
      headerName: 'Tổng Doanh Thu',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
  ];
  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>HostMotelRoom</title>
        <meta name="description" content="Description of HostMotelRoom" />
      </Helmet>
      <div className="title">Danh Sách Chủ Trọ</div>
      <div className="job-list-wrapper container-fluid">
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={listRoom}
            columns={columns}
            pageSize={10}
            autoHeight
            isCellEditable={params => params.key}
          />
        </div>
      </div>
    </div>
  );
}

HostMotelRoom.propTypes = {
  getListRoom: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  hostMotelRoom: makeSelectHostMotelRoom(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListRoom: _id => {
      dispatch(getListRoom(_id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HostMotelRoom);

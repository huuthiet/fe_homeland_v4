/**
 *
 * OrderList
 *
 */

import { DataGrid } from '@mui/x-data-grid';
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
import { getOrderList } from './actions';
import reducer from './reducer';
import axios from 'axios';
import saga from './saga';
import makeSelectOrderList from './selectors';
import './style.scss';
import localStoreService from 'local-storage';
import { urlLink } from '../../helper/route';
export function OrderList(props) {
  useInjectReducer({ key: 'orderList', reducer });
  useInjectSaga({ key: 'orderList', saga });
  const history = useHistory();
  useEffect(() => {
    props.getOrderList();
  }, []);
  const { orders, orderArrNone } = props.orderList;

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'description',
      headerName: 'Nội dung thanh toán',
      headerAlign: 'center',
      width: 450,
      headerClassName: 'header-bold',
    },
    {
      field: 'type',
      headerName: 'Trạng thái',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'amount',
      headerName: 'Số tiền',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'paymentMethod',
      headerName: 'Loại thanh toán',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'nameMotelRoom',
      headerName: 'Tên Khu Trọ',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'nameRoom',
      headerName: 'Tên Trọ',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'nameUser',
      headerName: 'Khách Thuê',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'phoneNumberUser',
      headerName: 'Số Điện Thoại',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'action',
      headerName: 'Sự Kiện',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
      renderCell: params => (
        // eslint-disable-next-line no-unused-expressions
        <Button
          color="primary"
          onClick={() => {
            history.push(`/admin/order/detail/${params.row._id}`);
          }}
        >
          Chi tiết
        </Button>
      ),
    },
    {
      field: 'action1',
      headerName: 'Sự Kiện',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
      renderCell: params => (
        // eslint-disable-next-line no-unused-expressions
        <>
          <Button
            color="primary"
            onClick={() => {
              history.push(`/order-pay/${params.row._id}`);
            }}
          >
            UNC
          </Button>

          <div
            style={{ margin: '0 20px' }}
            className="edit-button"
            onClick={() => {
              history.push(`/admin/job/detail/${params.row.job._id}`);
            }}
          >
            <img src="/edit.png" />
          </div>
        </>
      ),
    },
  ];
  const columnNonePayment = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'description',
      headerName: 'Nội dung thanh toán',
      headerAlign: 'center',
      width: 450,
      headerClassName: 'header-bold',
    },
    {
      field: 'type',
      headerName: 'Trạng thái',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'amount',
      headerName: 'Số tiền',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'paymentMethod',
      headerName: 'Loại thanh toán',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'nameMotelRoom',
      headerName: 'Tên Khu Trọ',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'nameRoom',
      headerName: 'Tên Trọ',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'nameUser',
      headerName: 'Khách Thuê',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'phoneNumberUser',
      headerName: 'Số Điện Thoại',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'action',
      headerName: 'Sự Kiện',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
      renderCell: params => (
        // eslint-disable-next-line no-unused-expressions
        <Button
          color="primary"
          onClick={() => {
            history.push(`/admin/order/detail/${params.row._id}`);
          }}
        >
          Chi tiết
        </Button>
      ),
    },
    {
      field: 'action1',
      headerName: 'Sự Kiện',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
      renderCell: params => (
        // eslint-disable-next-line no-unused-expressions
        <>
          <Button
            color="primary"
            onClick={() => {
              history.push(`/order-pay/${params.row._id}`);
            }}
          >
            UNC
          </Button>

          <div
            style={{ margin: '0 20px' }}
            className="edit-button"
            onClick={() => {
              history.push(`/admin/job/detail/${params.row.job._id}`);
            }}
          >
            <img src="/edit.png" />
          </div>
        </>
      ),
    },
    {
      field: 'action2',
      headerName: 'Sự Kiện',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params => (
        // eslint-disable-next-line no-unused-expressions
        <>
          <Button
            color="success"
            onClick={() => {
              handleChangeRoom(params.row.job.room, params.row);
            }}
          >
            Chấp nhận
          </Button>
          <Button
            className="ml-2"
            style={{ color: 'white', backgroundColor: 'orange' }}
            color="warning"
            onClick={() => {
              handleDeleteJob(params.row.job._id);
            }}
          >
            Xóa job
          </Button>
        </>
      ),
    },
  ];

  const handleChangeRoom = async (e, data) => {
    const idRoom = e;
    const type = data.typeAction;
    let dataOptions = '';
    if (type == 'deposit') {
      dataOptions = 'deposited';
    } else if (type == 'afterCheckInCost') {
      dataOptions = 'roomedPayment';
    } else if (type == 'monthly') {
      dataOptions = 'monthlyPayment';
    }
    const requestUrl = urlLink.api.serverUrl + urlLink.api.editStatus + idRoom;
    try {
      await fetch(`${requestUrl}`, {
        method: 'POST',
        body: JSON.stringify({ data: dataOptions }),
        headers: { 'Content-Type': 'application/json' },
      });
      // feth data
      props.getOrderList();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteJob = async e => {
    const idJob = e;
    const requestUrl =
      urlLink.api.serverUrl + urlLink.api.adminJobDetail + idJob;
    try {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${localStoreService.get('user').token}`,
        },
      };
      await axios.delete(requestUrl, config);
      // feth data
      props.getOrderList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>OrderList</title>
        <meta name="description" content="Description of OrderList" />
      </Helmet>
      <div className="title">Nhật Ký Giao Dịch</div>
      <div className="job-list-wrapper container-fluid">
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={orders}
            columns={columns}
            pageSize={10}
            autoHeight
            isCellEditable={params => params.key}
          />
        </div>
      </div>

      <div className="title">Nhật Ký Chưa Thanh Toán</div>
      <div className="job-list-wrapper container-fluid">
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={orderArrNone}
            columns={columnNonePayment}
            pageSize={10}
            autoHeight
            isCellEditable={params => params.key}
          />
        </div>
      </div>
    </div>
  );
}

OrderList.propTypes = {
  getOrderList: PropTypes.func,
  orderList: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  orderList: makeSelectOrderList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getOrderList: () => {
      dispatch(getOrderList());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(OrderList);

/**
 *
 * ReportProblemListAdmin
 *
 */
import { Avatar } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import InputForm from '../../components/InputForm';
import { getListReportProblem, postStatusReportProblem } from './actions';
import reducer from './reducer';
import saga from './saga';
import localStoreService from 'local-storage';
import makeSelectReportProblemListAdmin from './selectors';
import './style.scss';
export function ReportProblemListAdmin(props) {
  useInjectReducer({ key: 'reportProblemListAdmin', reducer });
  useInjectSaga({ key: 'reportProblemListAdmin', saga });
  const { listReportProblem = [], action2 = 0 } = props.reportProblemListAdmin;
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (_.isArray(localStoreService.get('user').role)) {
      for (
        let index = 0;
        index < localStoreService.get('user').role.length;
        index++
      ) {
        const element = localStoreService.get('user').role[index];
        if (element === 'master') {
          setIsAdmin(true);
        }
      }
    }
    // const data = {
    //   startDate,
    //   endDate,
    //   isAdmin,
    // };
    // props.getListReportProblem(data);
  }, [action2]);
  const dateNow = new Date();
  const beforeNow = dateNow.setDate(dateNow.getDate() - 1);
  const [startDate, setStartDate] = useState(new Date(beforeNow));
  const [endDate, setEndDate] = useState(new Date());

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'idReportProblem',
      headerName: 'Mã Báo Cáo',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'dateReportProblem',
      headerName: 'Ngày Lập Báo Cáo',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'status',
      headerName: 'Trạng Thái',
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
    },
    {
      field: 'nameMotel',
      headerName: 'Khu Trọ',
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
    },
    {
      field: 'nameRoom',
      headerName: 'Tên Phòng',
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
    },
    {
      field: 'nameUser',
      headerName: 'Khách Thuê',
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
    },
    {
      field: 'image',
      headerName: 'Ảnh Khu Trọ',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params => {
        // eslint-disable-next-line no-unused-expressions
        return (
          <>
            <Avatar
              style={{
                width: '250px',
              }}
              variant="square"
              alt="Avatar"
              src={params.value}
            />
          </>
        );
      },
    },
    {
      field: 'processing',
      headerName: 'Đang xử lý',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      // eslint-disable-next-line consistent-return
      renderCell: params => {
        // eslint-disable-next-line no-unused-expressions
        return (
          <Button
            color="primary"
            onClick={() => {
              const data = {
                id: params.row._id,
                status: 'processing',
              };
              props.postStatusReportProblem(data);
            }}
          >
            <i className="fa fa-check" aria-hidden="true">
              Đang xử lý
            </i>
          </Button>
        );
      },
    },
    {
      field: 'success',
      headerName: 'Đã xử lý',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      // eslint-disable-next-line consistent-return
      renderCell: params => {
        // eslint-disable-next-line no-unused-expressions
        return (
          <Button
            color="success"
            onClick={() => {
              const data = {
                id: params.row._id,
                status: 'success',
              };
              props.postStatusReportProblem(data);
            }}
          >
            <i className="fa fa-check" aria-hidden="true">
              Đã xử lý
            </i>
          </Button>
        );
      },
    },
  ];

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>ReportProblemListAdmin</title>
        <meta
          name="description"
          content="Description of ReportProblemListAdmin"
        />
      </Helmet>
      <div className="title">Danh Sách Báo Cáo Sự Cố</div>
      <div className="job-list-wrapper container-fluid">
        <Row>
          <Col md={4}>
            <Row>
              <Col md={6}>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  selected={startDate}
                  onChange={date => {
                    setStartDate(date);
                  }}
                  customInput={<InputForm label="Từ" icon="fa fa-calendar" />}
                />
              </Col>
              <Col md={6}>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  selected={endDate}
                  onChange={date => {
                    setEndDate(date);
                  }}
                  customInput={<InputForm label="Đến" icon="fa fa-calendar" />}
                />
              </Col>
            </Row>
          </Col>
          <Col md={2}>
            <Button
              color="primary"
              className="btn-block mt-4"
              onClick={() => {
                const data = {
                  startDate,
                  endDate,
                  isAdmin,
                };
                props.getListReportProblem(data);
              }}
            >
              Tìm
            </Button>
          </Col>
        </Row>
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={listReportProblem}
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

ReportProblemListAdmin.propTypes = {
  getListReportProblem: PropTypes.func,
  postStatusReportProblem: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  reportProblemListAdmin: makeSelectReportProblemListAdmin(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListReportProblem: payload => {
      dispatch(getListReportProblem(payload));
    },
    postStatusReportProblem: payload => {
      dispatch(postStatusReportProblem(payload));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ReportProblemListAdmin);

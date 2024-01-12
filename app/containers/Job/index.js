/**
 *
 * Job
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Formik } from 'formik';
import localStore from 'local-storage';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormattedMessage } from 'react-intl';
import Modal from 'react-modal';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { Alert, Button, Col, Container, Row } from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as Yup from 'yup';
import InputForm from '../../components/InputForm';
import Money from '../App/format';
import { getRoom } from '../RoomDetail/actions';
import { changeStoreData, postJob } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectJob from './selectors';
import './style.scss';

const validateForm = Yup.object().shape({
  checkInTime: Yup.string().required(
    <FormattedMessage {...messages.ErrrCheckInDate} />,
  ),
  fullName: Yup.string().required(
    <FormattedMessage {...messages.ErrrFullName} />,
  ),
  phoneNumber: Yup.string().required(
    <FormattedMessage {...messages.ErrrPhone} />,
  ),
  rentalPeriod: Yup.number()
    .required(<FormattedMessage {...messages.ErrrMonth} />)
    .integer(),
});

const optionsRentalPeriod = [
  {
    label: '1',
    value: '1',
    isDisabled: false,
  },
  {
    label: '2',
    value: '2',
    isDisabled: false,
  },
  {
    label: '3',
    value: '3',
    isDisabled: false,
  },
  {
    label: '4',
    value: '4',
    isDisabled: false,
  },
  {
    label: '5',
    value: '5',
    isDisabled: false,
  },
  {
    label: '6',
    value: '6',
    isDisabled: false,
  },
  {
    label: '7',
    value: '7',
    isDisabled: false,
  },
  {
    label: '8',
    value: '8',
    isDisabled: false,
  },
  {
    label: '9',
    value: '9',
    isDisabled: false,
  },
  {
    label: '10',
    value: '10',
    isDisabled: false,
  },
  {
    label: '11',
    value: '11',
    isDisabled: false,
  },
  {
    label: '12',
    value: '12',
    isDisabled: false,
  },
];

export function Job(props) {
  const history = useHistory();
  const { id } = useParams();
  const [type, setType] = useState('wallet');
  useInjectReducer({ key: 'job', reducer });
  useInjectSaga({ key: 'job', saga });
  const { room = {}, jobError, jobErrorNuber } = props.job;
  const {
    name = '',
    price = 0,
    availableDate = new Date(),
    minimumMonths = 0,
    depositPrice = 0,
  } = room;
  useEffect(() => {
    props.getRoom(id);
    Modal.setAppElement('body');
  }, []);

  for (let index = 0; index < optionsRentalPeriod.length; index++) {
    const element = optionsRentalPeriod[index];
    if (element.value < minimumMonths) {
      element.isDisabled = true;
    }
  }

  const user = localStore.get('user') || {};

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

  const [rentalPeriodAction, setRentalPeriodAction] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState({});

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const handleChangeGender = e => {
    const bankValue = e.value;
    // eslint-disable-next-line no-plusplus
    for (let k = 0; k < optionsRentalPeriod.length; k++) {
      const item = optionsRentalPeriod[k];
      if (item.value === bankValue) {
        setRentalPeriodAction(item.value);
        return item;
      }
    }
  };

  const [checkMonth, setCheckMonth] = useState(false);

  function SubmitModal() {
    setIsOpen(!isOpen);

    if (isSubmitted.rentalPeriod >= minimumMonths) {
      setCheckMonth(false);
      props.postJob(isSubmitted);
    } else {
      setCheckMonth(true);
    }
  }

  return (
    <div>
      <Helmet>
        <title>Job</title>
        <meta name="description" content="Description of Job" />
      </Helmet>
      <div className="job-wrapper">
        <Container>
          <div className="payments">
            <div className="name">{name}</div>
            <div className="price">{Money(price)} đ</div>
            <div className="title">
              <FormattedMessage {...messages.ErrrPayment} />
            </div>
            <Row className="type-wrapper">
              <Col>
                <div
                  className="type"
                  onClick={() => {
                    setType('vnpay');
                  }}
                  role="presentation"
                >
                  <div>
                    <span style={{ color: '#D01E26' }}>VN</span>
                    <span style={{ color: '#00519F' }}>PAY</span>
                  </div>
                  {type === 'vnpay' && (
                    <div className="checked">
                      <img src="/checked.png" alt="checked" />
                    </div>
                  )}
                </div>
              </Col>
              <Col>
                <div
                  className="type"
                  onClick={() => {
                    setType('wallet');
                  }}
                  role="presentation"
                >
                  <div>
                    <FormattedMessage {...messages.InternalWallet} />
                  </div>
                  {type === 'wallet' && (
                    <div className="checked">
                      <img src="/checked.png" alt="checked" />
                    </div>
                  )}
                </div>
              </Col>
              <Col>
                <div
                  className="type"
                  onClick={() => {
                    setType('cash');
                  }}
                  role="presentation"
                >
                  <div>
                    <FormattedMessage {...messages.InternalCash} />
                  </div>
                  {type === 'cash' && (
                    <div className="checked">
                      <img src="/checked.png" alt="checked" />
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>
          <Formik
            initialValues={{
              roomId: id,
              checkInTime: moment(new Date()).isBefore(availableDate)
                ? moment(availableDate).format('DD/MM/YYYY')
                : moment(new Date()).format('DD/MM/YYYY'),
              fullName: !_.isEmpty(user)
                ? `${user.lastName} ${user.firstName}`
                : '',
              phoneNumber: !_.isEmpty(user)
                ? `${user.phoneNumber.countryCode}${user.phoneNumber.number}`
                : '',
              price,
              bail: depositPrice == 0 ? price : depositPrice,
              total: (
                Number(price) + Number(depositPrice == 0 ? price : depositPrice)
              ).toString(),
              deposit: (Number(price) / 2).toString(),
              afterCheckInCost: (
                Number(price) * 0.5 +
                Number(depositPrice == 0 ? price : depositPrice)
              ).toString(),
              availableDate: moment(new Date()).isBefore(availableDate)
                ? moment(availableDate).format('DD/MM/YYYY')
                : moment(new Date()).format('DD/MM/YYYY'),
              rentalPeriod: minimumMonths,
            }}
            enableReinitialize
            validationSchema={validateForm}
            onSubmit={evt => {
              const formData = { ...evt, type };
              if (rentalPeriodAction > 0) {
                formData.rentalPeriod = rentalPeriodAction;
              }

              if (type === 'wallet' || type === 'cash') {
                setIsSubmitted(formData);
                toggleModal();
                // props.postJob(formData)
              } else {
                console.log('Chưa Xử Lý Phần VNPay');
                alert('Chưa Xử Lý Phần VNPay');
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <div>
                <form onSubmit={handleSubmit}>
                  <Modal
                    isOpen={isOpen}
                    onRequestClose={toggleModal}
                    contentLabel="My dialog"
                    style={customStyles}
                  >
                    <div className="deposit">
                      <h5>
                        <FormattedMessage {...messages.AmountOfMoney} />
                        {Money(values.deposit)} đ.
                        {/* <FormattedMessage {...messages.Deposited} />. */}
                        <FormattedMessage {...messages.AmountOfMoneyDec} />
                      </h5>
                    </div>
                    <button
                      className="btn btn-primary mr-2"
                      onClick={SubmitModal}
                    >
                      <FormattedMessage {...messages.Accept} />
                    </button>
                    <button className="btn btn-secondary" onClick={toggleModal}>
                      <FormattedMessage {...messages.Cancel} />
                    </button>
                  </Modal>

                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={moment(values.checkInTime, 'DD/MM/YYYY').toDate()}
                    onChange={date => {
                      setFieldValue(
                        'checkInTime',
                        moment(date).format('DD/MM/YYYY'),
                      );
                    }}
                    minDate={moment(
                      values.availableDate,
                      'DD/MM/YYYY',
                    ).toDate()}
                    customInput={
                      <InputForm
                        label={<FormattedMessage {...messages.CheckinDate} />}
                        icon="fa fa-calendar"
                      />
                    }
                  />
                  {
                    <FormattedMessage {...messages.FullName}>
                      {msg => (
                        <InputForm
                          label={
                            <FormattedMessage {...messages.PeopleRomSet} />
                          }
                          placeholder={msg}
                          name="fullName"
                          icon="fa fa-user"
                          value={values.fullName}
                          touched={touched.fullName}
                          error={errors.fullName}
                          autoComplete="fullName"
                          onChange={evt => {
                            handleChange(evt);
                          }}
                          onBlur={handleBlur}
                        />
                      )}
                    </FormattedMessage>
                  }
                  {
                    <FormattedMessage {...messages.EnterPhone}>
                      {msg => (
                        <InputForm
                          label={<FormattedMessage {...messages.Phone} />}
                          placeholder={msg}
                          name="phoneNumber"
                          icon="fa fa-phone"
                          value={values.phoneNumber}
                          touched={touched.phoneNumber}
                          error={errors.phoneNumber}
                          autoComplete="phoneNumber"
                          onChange={evt => {
                            handleChange(evt);
                          }}
                          onBlur={handleBlur}
                        />
                      )}
                    </FormattedMessage>
                  }

                  <InputForm
                    label={<FormattedMessage {...messages.PriceRentedMonth} />}
                    name="price"
                    icon="fa fa-usd"
                    value={Money(values.price)}
                    touched={touched.price}
                    error={errors.price}
                    autoComplete="price"
                    onChange={evt => {
                      handleChange(evt);
                    }}
                    onBlur={handleBlur}
                    readOnly
                  />
                  {/* <InputForm
                    label={<FormattedMessage {...messages.RentalContract} />}
                    name="rentalPeriod"
                    icon="fa fa-usd"
                    value={values.rentalPeriod}
                    touched={touched.rentalPeriod}
                    error={errors.rentalPeriod}
                    autoComplete="rentalPeriod"
                    onChange={evt => {
                      handleChange(evt);
                    }}
                    onBlur={handleBlur}
                  /> */}

                  <FormattedMessage {...messages.RentalContract}>
                    {msg => (
                      <>
                        <label
                          style={{
                            fontSize: '14px',
                            marginBottom: '2px',
                            fontWeight: 'bold',
                          }}
                        >
                          <span>{msg}</span>
                        </label>
                        <Select
                          placeholder={values.rentalPeriod}
                          defaultValue={
                            optionsRentalPeriod[values.rentalPeriod]
                          }
                          icon="fa fa-usd"
                          value={values.rentalPeriod}
                          options={optionsRentalPeriod}
                          className="mb-3"
                          onChange={evt => {
                            setFieldValue(
                              'rentalPeriod',
                              handleChangeGender(evt),
                            );
                            setFieldValue(
                              'total',
                              // evt.value * values.price + values.bail,
                              values.price + values.bail,
                            );
                          }}
                        />
                      </>
                    )}
                  </FormattedMessage>

                  <InputForm
                    label={<FormattedMessage {...messages.BondMoney} />}
                    name="bail"
                    icon="fa fa-usd"
                    value={Money(values.bail)}
                    touched={touched.bail}
                    error={errors.bail}
                    autoComplete="new-password"
                    onChange={evt => {
                      handleChange(evt);
                    }}
                    onBlur={handleBlur}
                    readOnly
                  />
                  <InputForm
                    label={<FormattedMessage {...messages.TotalMoney} />}
                    name="total"
                    icon="fa fa-usd"
                    value={Money(values.total)}
                    touched={touched.total}
                    error={errors.total}
                    autoComplete="total"
                    onChange={evt => {
                      handleChange(evt);
                    }}
                    onBlur={handleBlur}
                    readOnly
                  />
                  <InputForm
                    label={<FormattedMessage {...messages.Deposited} />}
                    name="deposit"
                    icon="fa fa-usd"
                    value={Money(values.deposit)}
                    touched={touched.deposit}
                    error={errors.deposit}
                    autoComplete="deposit"
                    onChange={evt => {
                      handleChange(evt);
                    }}
                    onBlur={handleBlur}
                    readOnly
                  />
                  <InputForm
                    label={
                      <FormattedMessage {...messages.PaymentUponCheckIn} />
                    }
                    name="afterCheckInCost"
                    icon="fa fa-usd"
                    value={Money(values.afterCheckInCost)}
                    touched={touched.afterCheckInCost}
                    error={errors.afterCheckInCost}
                    autoComplete="afterCheckInCost"
                    onChange={evt => {
                      handleChange(evt);
                    }}
                    onBlur={handleBlur}
                    readOnly
                  />
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={moment(
                      values.availableDate,
                      'DD/MM/YYYY',
                    ).toDate()}
                    customInput={
                      <InputForm
                        label={<FormattedMessage {...messages.BlankFromDate} />}
                        icon="fa fa-calendar"
                      />
                    }
                    readOnly
                  />

                  {jobErrorNuber === 1 && (
                    <Container>
                      <Alert color="danger">
                        {jobError.errorMessage}
                        {/* {props.changeStoreData('jobErrorNuber', 0)} */}
                      </Alert>
                    </Container>
                  )}

                  {jobErrorNuber === 2 && (
                    <div className="link">
                      {props.changeStoreData('jobErrorNuber', 0)}
                      {/* {history.push(`/job-verify/${room.data.data.job}`)} */}
                      {history.push(`/profile`)}
                    </div>
                  )}
                  <Row>
                    <Col xs={12}>
                      {checkMonth === true && (
                        <Alert color="danger" className="mt-3">
                          Hợp đồng cho thuê >= {minimumMonths}
                        </Alert>
                      )}
                    </Col>
                  </Row>
                  <div className="login">
                    <Button color="primary" type="submit" className="btn-block">
                      {<FormattedMessage {...messages.Finish} />}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </Formik>

          {/* <button onClick={toggleModal}>Open modal</button> */}
        </Container>
      </div>
    </div>
  );
}

Job.propTypes = {
  getRoom: PropTypes.func,
  job: PropTypes.object,
  postJob: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  job: makeSelectJob(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRoom: id => {
      dispatch(getRoom(id));
    },
    postJob: formData => {
      dispatch(postJob(formData));
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

export default compose(withConnect)(Job);

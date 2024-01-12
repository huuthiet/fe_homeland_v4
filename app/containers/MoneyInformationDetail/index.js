/**
 *
 * MoneyInformationDetail
 *
 */

import { Avatar } from '@material-ui/core';
import axios from 'axios';
import localStoreService from 'local-storage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import Select from 'react-select';
import { Alert, Button, Col, Container, Row } from 'reactstrap';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import InputForm from '../../components/InputForm';
import { urlLink } from '../../helper/route';
import {
  addBank,
  changeStoreData,
  editBank,
  getDetailBank,
  getMasterDataBank,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectMoneyInformationDetail from './selectors';
import './style.scss';

export function MoneyInformationDetail(props) {
  useInjectReducer({ key: 'moneyInformationDetail', reducer });
  useInjectSaga({ key: 'moneyInformationDetail', saga });

  const { id = '' } = useParams();
  const [flagAddAndEdit, setFlagAddAndEdit] = useState(false);
  const {
    moneyInformationDetail = {},
    options = [],
  } = props.moneyInformationDetail;
  const [submitAction, setSubmitAction] = useState(false);
  const TenMegaBytes = 10 * 1024 * 1024;
  const [loading, setLoading] = useState(false);
  const [urlImgCloud, setUrlImgCloud] = useState('');
  const [previewSource, setPreviewSource] = useState();
  const [dataView, setDataView] = useState('');

  const apiPostImg = async payload => {
    const { id, formData } = payload;
    const requestUrl = `${urlLink.api.serverUrl}/v1/uploadimg` + `/img/${id}`;
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStoreService.get('user').token}`,
      },
    };
    try {
      const response = await axios.post(requestUrl, formData, config);
      if (response.data.data.images) {
        setUrlImgCloud(response.data.data.images.imageUrl);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileInputChange = e => {
    setSubmitAction(true);
    const abcfile = e.target.files[0];
    // check mb file size
    if (abcfile.size <= TenMegaBytes) {
      setSubmitAction(false);
      const formData = new FormData();
      formData.append('file', abcfile);
      setLoading(true);
      try {
        const data = {
          id,
          formData,
        };
        apiPostImg(data);
      } catch (error) {}
    }
  };

  const {
    stk = '',
    nameTk = '',
    bank = '',
    branch = '',
    nameTkLable = '',
    imgView = '',
    images = [],
  } = moneyInformationDetail;

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    props.getMasterDataBank();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (id === 'add') {
      // no call
      setFlagAddAndEdit(true);
      moneyInformationDetail.stk = '';
      moneyInformationDetail.nameTk = '';
      moneyInformationDetail.bank = '';
      moneyInformationDetail.branch = '';
      moneyInformationDetail.images = [];
    } else {
      setFlagAddAndEdit(false);
      // call detail
      props.getDetailBank(id);
      // eslint-disable-next-line func-names
    }
  }, []);

  return (
    <div className="motel-detail-wrapper">
      <Helmet>
        <title>MoneyInformationDetail</title>
        <meta
          name="description"
          content="Description of MoneyInformationDetail"
        />
      </Helmet>

      <Container>
        <div className="title mb-3">
          <h3>
            {flagAddAndEdit ? (
              <FormattedMessage {...messages.addBank} />
            ) : (
              <FormattedMessage {...messages.updateBank} />
            )}
          </h3>
        </div>
        <Row className="infor">
          <Col xs={7}>
            {
              <FormattedMessage {...messages.stk}>
                {msg => (
                  <InputForm
                    placeholder={msg}
                    name="stk"
                    value={stk}
                    icon="fa fa-user"
                    autoComplete="stk"
                    onChange={evt => {
                      props.changeStoreData('moneyInformationDetail', {
                        ...moneyInformationDetail,
                        stk: evt.target.value,
                      });
                    }}
                  />
                )}
              </FormattedMessage>
            }
          </Col>
          <Col xs={5}>
            {
              <FormattedMessage {...messages.nameTk}>
                {msg => (
                  <InputForm
                    placeholder={msg}
                    name="nameTk"
                    value={nameTk}
                    icon="fa fa-user"
                    autoComplete="nameTk"
                    onChange={evt => {
                      props.changeStoreData('moneyInformationDetail', {
                        ...moneyInformationDetail,
                        nameTk: evt.target.value,
                      });
                    }}
                  />
                )}
              </FormattedMessage>
            }
          </Col>
          <Col xs={12}>
            {
              <FormattedMessage {...messages.bank}>
                {msg => (
                  <Select
                    key={options}
                    placeholder={nameTkLable}
                    value={bank}
                    options={options}
                    className="mb-3"
                    onChange={evt => {
                      props.changeStoreData('moneyInformationDetail', {
                        ...moneyInformationDetail,
                        bank: evt.value,
                        nameTkLable: evt.label,
                      });
                    }}
                  />
                )}
              </FormattedMessage>
            }
          </Col>
          <Col xs={12}>
            {
              <FormattedMessage {...messages.branch}>
                {msg => (
                  <InputForm
                    placeholder={msg}
                    name="branch"
                    icon="fa fa-user"
                    value={branch}
                    autoComplete="branch"
                    onChange={evt => {
                      props.changeStoreData('moneyInformationDetail', {
                        ...moneyInformationDetail,
                        branch: evt.target.value,
                      });
                    }}
                  />
                )}
              </FormattedMessage>
            }
          </Col>

          <Col xs={12}>
            <input
              type="file"
              id="fileupload"
              accept=".png, .jpg"
              onChange={e => {
                handleFileInputChange(e);
              }}
            />
            {urlImgCloud !== '' ? (
              <div>
                {loading ? (
                  <h3>Loading...</h3>
                ) : (
                  <div className="img" style={{ width: '100%' }}>
                    <Avatar
                      style={{
                        width: '100%',
                        height: '200px',
                        margin: '10px auto',
                      }}
                      variant="square"
                      alt="Avatar"
                      src={urlImgCloud}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="img" style={{ width: '100%' }}>
                {imgView ? (
                  <Avatar
                    style={{
                      width: '100%',
                      height: '200px',
                      margin: '10px auto',
                    }}
                    variant="square"
                    alt="Avatar"
                    src={imgView}
                  />
                ) : (
                  <Avatar
                    style={{
                      width: '100%',
                      height: '200px',
                      margin: '10px auto',
                    }}
                    variant="square"
                    alt="Avatar"
                    src={imgView}
                  >
                    N
                  </Avatar>
                )}
              </div>
            )}
            {submitAction === true ? (
              <Alert color="danger" className="mt-3">
                {<FormattedMessage {...messages.SizeImage} />}
              </Alert>
            ) : (
              ''
            )}
          </Col>
          <Col xs={12}>
            <Button
              color="primary"
              className="btn-block mt-3"
              type="submit"
              onClick={() => {
                const temp = { ...moneyInformationDetail, id, urlImgCloud };
                // eslint-disable-next-line no-unused-expressions
                flagAddAndEdit ? props.addBank(temp) : props.editBank(temp);
              }}
            >
              {flagAddAndEdit ? (
                <FormattedMessage {...messages.addBank} />
              ) : (
                <FormattedMessage {...messages.updateBank} />
              )}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

MoneyInformationDetail.propTypes = {
  dispatch: PropTypes.func,
  addBank: PropTypes.func,
  getMasterDataBank: PropTypes.func,
  editBank: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  moneyInformationDetail: makeSelectMoneyInformationDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    addBank: data => {
      dispatch(addBank(data));
    },
    getMasterDataBank: data => {
      dispatch(getMasterDataBank(data));
    },
    editBank: data => {
      dispatch(editBank(data));
    },
    getDetailBank: data => {
      dispatch(getDetailBank(data));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MoneyInformationDetail);

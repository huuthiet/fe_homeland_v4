import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import {
  GET_JOB,
  PUT_ACTIVE,
  PUT_DEPOSIT,
  PUT_CHECKOUT,
  PUT_JOB,
} from './constants';
import { urlLink } from '../../helper/route';
import {
  getJobSuccess,
  getJobFail,
  putActiveSuccess,
  putDepositSuccess,
  putDepositFail,
  putActiveFail,
  getJob,
  putCheckOutSuccess,
  putCheckOutFail,
  putJobFail,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';
import { GET_PROFILE } from '../Profile/constants';
import { apiGetProfile } from '../Profile/saga';

export function* apiGetJob(payload) {
  const { id } = payload;
  const requestUrl = `${urlLink.api.serverUrl + urlLink.api.job}/${id}`;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getJobSuccess(response.data.data));
  } catch (error) {
    yield put(getJobFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPutActive(payload) {
  const { id } = payload;
  const requestUrl = `${urlLink.api.serverUrl + urlLink.api.job}/${id}/active`;
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl);
    yield put(putActiveSuccess(response.data.data));
    yield put(getJob(id));
  } catch (error) {
    yield put(putActiveFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
function isEmpty(str) {
  return !str || str.length === 0;
}

export function* apiPutDeposit(payload) {
  const { jobId, orderId } = payload.payload;
  const requestUrlPayWallet = urlLink.api.serverUrl + urlLink.api.pay;
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrlPayWallet, { orderId });
    try {
      const requestUrlProfile = urlLink.api.serverUrl + urlLink.api.profile;
      const responseProfile = yield axios.get(requestUrlProfile);
      if (responseProfile.data.data) {
        const profile = responseProfile.data.data;
        // eslint-disable-next-line eqeqeq
        if (!isEmpty(profile.backId) && !isEmpty(profile.frontId)) {
          // have NID- update NID to jobModel
          try {
            const requestUrlUpdateModel = `${urlLink.api.serverUrl +
              urlLink.api.job}/${response.data.data.job}/images/profile`;
            yield axios.put(requestUrlUpdateModel, null);
            yield put(putDepositSuccess(response.data.data));
            yield put(getJob(jobId));
            // eslint-disable-next-line no-empty
          } catch (error) {}
        } else {
          yield put(putDepositSuccess(response.data.data));
          yield put(getJob(jobId));
          yield put(push(`/job-verify/${jobId}`));
        }
      }
      // eslint-disable-next-line no-empty
    } catch (error) {}
  } catch (error) {
    yield put(putDepositFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPutCheckOut(payload) {
  const { id, returnRoomDate } = payload;
  const requestUrl = `${urlLink.api.serverUrl +
    urlLink.api.job}/${id}/updateReturnRoomDate`;
  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, {
      returnRoomDate,
    });
    yield put(putCheckOutSuccess(response.data.data));
    yield put(getJob(id));
  } catch (error) {
    yield put(putCheckOutFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export function* apiPutJob(payload) {
  const { id } = payload;
  const requestUrlPayWallet = urlLink.api.serverUrl + urlLink.api.pay;

  const requestUrl = `${urlLink.api.serverUrl + urlLink.api.job}/${id}`;

  const response = yield axios.get(requestUrl);

  const order = response.data.data.orders;
  let orderId = null;
  for (let i = 0; i < order.length; i++) {
    if (order[i].paymentMethod === 'none') {
      orderId = order[i]._id;
    }
  }
  yield put(loadRepos());
  try {
    yield axios.put(requestUrlPayWallet, {
      orderId,
    });
    yield put(getJob(id));
    yield put(reposLoaded());
  } catch (error) {
    yield put(putJobFail(error.response.data.errors[0]));
  } finally {
    yield put(reposLoaded());
  }
}
export default function* jobDetailSaga() {
  yield takeLatest(GET_JOB, apiGetJob);
  yield takeLatest(GET_PROFILE, apiGetProfile);
  yield takeLatest(PUT_ACTIVE, apiPutActive);
  yield takeLatest(PUT_DEPOSIT, apiPutDeposit);
  yield takeLatest(PUT_CHECKOUT, apiPutCheckOut);
  yield takeLatest(PUT_JOB, apiPutJob);
}

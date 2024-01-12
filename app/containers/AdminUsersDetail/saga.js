import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'react-router-redux';
import localStoreService from 'local-storage';
import { urlLink } from '../../helper/route';
import { POST_USER_DETAIL, PUT_PROFILE } from './constants';
import { loadRepos, reposLoaded } from '../App/actions';
import {
  getAdminUserDetailSuccess,
  getAdminUserDetailFail,
  putProfileSuccess,
  putProfileFail,
} from './actions';

// Individual exports for testing

export function* apiGetProfile(payload) {
  const { id } = payload;
  const requestUrl = `${urlLink.api.serverUrl +
    urlLink.api.profileDetail}/${id}`;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getAdminUserDetailSuccess(response.data.data));
  } catch (error) {
    yield put(getAdminUserDetailFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

export function* apiPutProfile(payload) {
  const requestUrl = urlLink.api.serverUrl + urlLink.api.profile;
  const payloadBody = payload.payload;

  // Image
  const payloadAvata = payloadBody.avatarAction;
  const payloadFrontId = payloadBody.frontIdAction;
  const payloadBackId = payloadBody.backIdAction;

  if (!isEmpty(payloadAvata)) {
    apiPostImg(payloadAvata);
  }
  if (!isEmpty(payloadFrontId)) {
    apiPostImgFront(payloadFrontId);
  }
  if (!isEmpty(payloadBackId)) {
    apiPostImgBack(payloadBackId);
  }

  const data = {
    // eslint-disable-next-line no-underscore-dangle
    _id: payloadBody._id,
    address: payloadBody.address,
    dobAction: payloadBody.dobAction,
    email: payloadBody.email,
    firstName: payloadBody.firstName,
    lastName: payloadBody.lastName,
    nationalId: payloadBody.nationalId,
    phoneNumberFull: payloadBody.phoneNumberFull,
    gender: payloadBody.gender.key,
  };

  yield put(loadRepos());
  try {
    const response = yield axios.put(requestUrl, data);
    yield put(putProfileSuccess(response.data.data));
    yield put(push(`/admin/users`));
  } catch (error) {
    yield put(putProfileFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

const apiPostImg = async payload => {
  const { id, formData } = payload;
  // eslint-disable-next-line no-useless-concat
  const requestUrl = `${urlLink.api.serverUrl}/v1/uploadimg/img/${id}/user`;
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${localStoreService.get('user').token}`,
    },
  };
  try {
    const response = await axios.post(requestUrl, formData, config);
    if (response.data.data.images) {
      return 1;
    }
  } catch (err) {
    console.error(err);
  }
  return 0;
};
const apiPostImgFront = async payload => {
  const { id, formData } = payload;
  // eslint-disable-next-line no-useless-concat
  const requestUrl = `${
    urlLink.api.serverUrl
  }/v1/uploadimg/img/${id}/user/front`;
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${localStoreService.get('user').token}`,
    },
  };
  try {
    const response = await axios.post(requestUrl, formData, config);
    if (response.data.data.images) {
      return 1;
    }
  } catch (err) {
    console.error(err);
  }
  return 0;
};
const apiPostImgBack = async payload => {
  const { id, formData } = payload;
  // eslint-disable-next-line no-useless-concat
  const requestUrl = `${
    urlLink.api.serverUrl
  }/v1/uploadimg/img/${id}/user/back`;
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${localStoreService.get('user').token}`,
    },
  };
  try {
    const response = await axios.post(requestUrl, formData, config);
    if (response.data.data.images) {
      return 1;
    }
  } catch (err) {
    console.error(err);
  }
  return 0;
};

export default function* jobDetailSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(POST_USER_DETAIL, apiGetProfile);
  yield takeLatest(PUT_PROFILE, apiPutProfile);
}

import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { GET_ROOM } from '../RoomDetail/constants';
import { apiGeRoom } from '../RoomDetail/saga';
// import { take, call, put, select } from 'redux-saga/effects';
import { urlLink } from '../../helper/route';
import { loadRepos, reposLoaded } from '../App/actions';
import { postJobFail, postJobSuccess } from './actions';
import { POST_JOB } from './constants';
// import { GET_ROOM } from '../RoomPage/constants';
export function* apiPostJob(payload) {
  const { formData } = payload;

  const requestUrl = urlLink.api.serverUrl + urlLink.api.job;

  const requestUrlPayWallet = urlLink.api.serverUrl + urlLink.api.pay;

  yield put(loadRepos());
  try {
    // eslint-disable-next-line camelcase
    const response_job = yield axios.post(requestUrl, formData);

    try {
      if (formData.type === 'wallet' || formData.type === 'cash') {
        // eslint-disable-next-line no-underscore-dangle
        const id = response_job.data.data.currentOrder._id;
        const payloadOder = {
          orderId: id,
          type: formData.type,
        };
        const response = yield axios.put(requestUrlPayWallet, payloadOder);
        if (formData.type === 'cash') {
          // ủy nhiệm chi
          yield put(postJobSuccess(response));
          yield put(push('/TransactionLog'));
        } else {
          // check user havev NID
          try {
            const requestUrlProfile =
              urlLink.api.serverUrl + urlLink.api.profile;
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
                  yield put(push('/profile'));
                } catch (error) {
                  yield put(postJobSuccess(response));
                }
              } else {
                yield put(postJobSuccess(response));
              }
            }
          } catch (error) {
            yield put(postJobSuccess(response));
          }
        }
      }
    } catch (error) {
      yield put(postJobFail(error.response.data));
    } finally {
      yield put(reposLoaded());
    }
  } catch (error) {
    yield put(postJobFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}
function isEmpty(str) {
  return !str || str.length === 0;
}
// Individual exports for testing
export default function* jobSaga() {
  yield takeLatest(GET_ROOM, apiGeRoom);
  yield takeLatest(POST_JOB, apiPostJob);
}

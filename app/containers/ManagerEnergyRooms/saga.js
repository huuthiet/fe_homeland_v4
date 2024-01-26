import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    GET_LIST_DEVICE_ENERGY,
  } from './constants';
import { urlLink } from '../../helper/route';
import {
    getListDeviceEnergyFail,
    getListDeviceEnergySuccess,
} from './actions';
import { loadRepos, reposLoaded } from '../App/actions';

export function* apiListDeviceEnergy() {
  const requestUrl = `http://localhost:5502/api/v1/homeKey/energy/devices`;
  yield put(loadRepos());
  try {
    const response = yield axios.get(requestUrl);
    yield put(getListDeviceEnergySuccess(response.data.data));
  } catch (error) {
    yield put(getListDeviceEnergyFail(error.response.data));
  } finally {
    yield put(reposLoaded());
  }
}

export default function* deviceEnergySaga() {
  yield takeLatest(GET_LIST_DEVICE_ENERGY, apiListDeviceEnergy);
}
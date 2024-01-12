/*
 *
 * Job actions
 *
 */

import {
    DEFAULT_ACTION,
    POST_JOB,
    POST_JOB_SUCCESS,
    POST_JOB_FAIL,
    CHANGE_STORE_DATA,
} from './constants';

export function defaultAction() {
    return {
        type: DEFAULT_ACTION,
    };
}
export function postJob(formData) {
    return {
        type: POST_JOB,
        formData,
    };
}

export function postJobSuccess(response) {
    return {
        type: POST_JOB_SUCCESS,
        response,
    };
}

export function postJobFail(error) {
    return {
        type: POST_JOB_FAIL,
        error,
    };
}


export function changeStoreData(key, value) {
    return {
        type: CHANGE_STORE_DATA,
        key,
        value,
    };
}
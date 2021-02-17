import { all, delay, fork, put, takeEvery } from 'redux-saga/effects';
// import axios from 'axios';
import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UN_FOLLOW_FAILURE,
  UN_FOLLOW_REQUEST,
  UN_FOLLOW_SUCCESS
} from '../reducers/user';

/*
function logInAPI(data) {
  return axios.post('/api/login', data);
}
*/

function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      data: err.response.data
    });
  }
}

/*
function logOutAPI() {
  return axios.post('/api/logout');
}
*/

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      data: err.response.data
    });
  }
}

/*
function signUpAPI() {
  return axios.post('/api/signup');
}
*/

function* signUp() {
  try {
    // const result = yield call(signUpAPI);
    yield delay(1000);
    yield put({
      type: SIGN_UP_SUCCESS
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      data: err.response.data
    });
  }
}

/*
function followAPI() {
  return axios.post('/api/followw');
}
*/

function* follow(action) {
  try {
    // const result = yield call(followAPI);
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      data: err.response.data
    });
  }
}

/*
function unFollowAPI() {
  return axios.post('/api/unFollow');
}
*/

function* unFollow(action) {
  try {
    // const result = yield call(unFollowAPI);
    yield delay(1000);
    yield put({
      type: UN_FOLLOW_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: UN_FOLLOW_FAILURE,
      data: err.response.data
    });
  }
}

function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
  yield takeEvery(FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
  yield takeEvery(UN_FOLLOW_REQUEST, unFollow);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnFollow)
  ]);
}

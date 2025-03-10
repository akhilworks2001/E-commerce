import { takeLatest, put } from "redux-saga/effects"
import { ADD_USER_START, DELETE_USER_START, EDIT_PROFILE_USER_START, GET_USER_START, LOGIN_USER_START, LOGOUT_USER_START, UPDATE_USER_START } from "../constants/user.constant"
import { addUserError, deleteUserError, editProfileUserError, editProfileUserSuccess, getUserError, getUserStart, getUserSuccess, loginUserError, loginUserStart, loginUserSuccess, logoutUserError, logoutUserSuccess, updateUserError } from "../actions/user.action"
import { addUserToFirebase, deleteUserToFirebase, getUserFromFirebase, updateUserToFirebase } from "../services/user.service"

function* getUser() {
    try {
        let result = yield getUserFromFirebase()
        yield put(getUserSuccess(result))
    } catch (error) {
        yield put(getUserError(error.message))
    }
}

function* addUser({payload}) {
    try {
        yield addUserToFirebase(payload)
        yield put(getUserStart())
    } catch (error) {
        yield put(addUserError(error.message))
    }   
}

function* deleteUser({payload}) {
    try {
        yield deleteUserToFirebase(payload)
        yield put(getUserStart())
    } catch (error) {
        yield put(deleteUserError(error.message))
    }   
}

function* updateUser({payload}) {
    try {
        yield updateUserToFirebase(payload)
        yield put(getUserStart())
    } catch (error) {
        yield put(updateUserError(error.message))
    }   
}

function* loginUser({payload}) {
    try {
        yield put(loginUserSuccess(payload))
    } catch (error) {
        yield put(loginUserError(error.message))
    }   
}

function* editProfileUser({payload}) {
    try {
        yield put(getUserStart())
        yield updateUserToFirebase(payload)
        yield put(editProfileUserSuccess(payload))
    } catch (error) {
        yield put(editProfileUserError(error.message))
    }   
}

function* logoutUser() {
    try {
        yield put(logoutUserSuccess())
    } catch (error) {
        yield put(logoutUserError(error.message))
    }   
}

export default function* user() {
    yield takeLatest(GET_USER_START, getUser);
    yield takeLatest(ADD_USER_START, addUser);
    yield takeLatest(DELETE_USER_START, deleteUser);
    yield takeLatest(UPDATE_USER_START, updateUser);
    yield takeLatest(LOGIN_USER_START, loginUser);
    yield takeLatest(EDIT_PROFILE_USER_START, editProfileUser);
    yield takeLatest(LOGOUT_USER_START, logoutUser);
}
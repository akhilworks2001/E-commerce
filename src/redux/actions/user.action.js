import { ADD_USER_ERROR, ADD_USER_START, ADD_USER_SUCCESS, DELETE_USER_ERROR, DELETE_USER_START, DELETE_USER_SUCCESS, EDIT_PROFILE_USER_ERROR, EDIT_PROFILE_USER_START, EDIT_PROFILE_USER_SUCCESS, GET_USER_ERROR, GET_USER_START, GET_USER_SUCCESS, LOGIN_USER_ERROR, LOGIN_USER_START, LOGIN_USER_SUCCESS, LOGOUT_USER_ERROR, LOGOUT_USER_START, LOGOUT_USER_SUCCESS, UPDATE_USER_ERROR, UPDATE_USER_START, UPDATE_USER_SUCCESS } from "../constants/user.constant"

// get
export const getUserStart = () => ({
    type: GET_USER_START
})

export const getUserSuccess = (users) => ({
    type: GET_USER_SUCCESS,
    payload: users
})

export const getUserError = (error) => ({
    type: GET_USER_ERROR,
    payload: error
})

// add
export const addUserStart = (user) => ({
    type: ADD_USER_START,
    payload: user
})

export const addUserSuccess = (user) => ({
    type: ADD_USER_SUCCESS,
    payload: user
})

export const addUserError = (error) => ({
    type: ADD_USER_ERROR,
    payload: error
})

// delete
export const deleteUserStart = (user) => ({
    type: DELETE_USER_START,
    payload: user
})

export const deleteUserSuccess = (user) => ({
    type: DELETE_USER_SUCCESS,
    payload: user
})

export const deleteUserError = (error) => ({
    type: DELETE_USER_ERROR,
    payload: error
})

// update
export const updateUserStart = (user) => ({
    type: UPDATE_USER_START,
    payload: user
})

export const updateUserSuccess = (user) => ({
    type: UPDATE_USER_SUCCESS,
    payload: user
})

export const updateUserError = (error) => ({
    type: UPDATE_USER_ERROR,
    payload: error
})

// login
export const loginUserStart = (user) => ({
    type: LOGIN_USER_START,
    payload: user
})

export const loginUserSuccess = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user
})

export const loginUserError = (error) => ({
    type: LOGIN_USER_ERROR,
    payload: error
})

// edit profile
export const editProfileUserStart = (user) => ({
    type: EDIT_PROFILE_USER_START,
    payload: user
})

export const editProfileUserSuccess = (user) => ({
    type: EDIT_PROFILE_USER_SUCCESS,
    payload: user
})

export const editProfileUserError = (error) => ({
    type: EDIT_PROFILE_USER_ERROR,
    payload: error
})

// logout
export const logoutUserStart = (user) => ({
    type: LOGOUT_USER_START,
    payload: user
})

export const logoutUserSuccess = (user) => ({
    type: LOGOUT_USER_SUCCESS,
    payload: user
})

export const logoutUserError = (error) => ({
    type: LOGOUT_USER_ERROR,
    payload: error
})
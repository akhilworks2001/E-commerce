import {
  EDIT_PROFILE_USER_SUCCESS,
  GET_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
} from "../constants/user.constant";

const storedUser = localStorage.getItem("currentLoginedUser");
let parsedUser = {
  name: "",
  email: "",
  password: "",
  image: "",
  contact: "",
};

if (storedUser) {
  try {
    parsedUser = JSON.parse(storedUser);
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }
}

const initialState = {
  users: [],
  currentLoginedUser: parsedUser,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        users: [...action.payload],
      };
    case LOGIN_USER_SUCCESS:
    case EDIT_PROFILE_USER_SUCCESS:
      localStorage.setItem(
        "currentLoginedUser",
        JSON.stringify(action.payload)
      );
      return {
        ...state,
        currentLoginedUser: { ...action.payload },
      };
    case LOGOUT_USER_SUCCESS:
        localStorage.removeItem(
            "currentLoginedUser"
          );
          return {
              ...state,
              currentLoginedUser: {
                name: "",
                email: "",
                password: "",
                image: "",
                contact: "",
              }
          }
    default:
      return state;
  }
};

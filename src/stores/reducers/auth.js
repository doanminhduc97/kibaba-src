import { LOGIN, REGISTER, LOGIN_PAGE_FAIL } from "../constants/actionTypes";
const INITIAL_STATE = {
  token: null,
  userData: {},
  inProgress: false,
  errors: null,
  statusCode: 0,
};

export default async (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // set state
    case LOGIN:
      return {
        ...state,
        token: action?.payload?.data?.token,
      };

    case REGISTER:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null,
      };
    case LOGIN_PAGE_FAIL:
      return {
        ...state,
        statusCode: action?.payload,
      };
    default:
      return state;
  }
};

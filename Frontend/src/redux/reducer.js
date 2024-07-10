import { LOGIN, LOGOUT } from "./action";
const initialState = {
  isLoggedIn: true,
  userId: "",
  firstName: "User",
  LastName: "",
  email: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log("logging in", action.payload);
      return action.payload;

    case LOGOUT:
      return {
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
      };

    default:
      return state;
  }
};

export default userReducer;

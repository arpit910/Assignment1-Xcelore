export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (data) => ({
  type: LOGIN,
  payload: { ...data, isLoggedIn: true },
});

export const logout = () => ({
  type: LOGIN,
  payload: {
    isLoggedIn: false,
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
  },
});

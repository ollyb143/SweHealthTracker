import axios from "axios";
import { toast } from "react-toastify";
import { signupUser, loginUser } from "../store/appUserSlice.js";

const REGISTERURL = "http://localhost:3000/api/auth/register";
const LOGINURL = "http://localhost:3000/api/auth/login";

// Sign up controller
const signupController = (userData, navigate) => async (dispatch) => {
  try {
    console.log("Sending request to:", REGISTERURL);
    const response = await axios.post(REGISTERURL, userData);

    const user = { ...response.data.user, token: response.data.token };
    localStorage.setItem('appUser', JSON.stringify(user));
    dispatch(signupUser(user));

    toast.success('Account created successfully!');
    navigate(user.role === "admin" ? '/dashboard' : '/dashboard');

  } catch (error) {
    const errorMessage = error?.response?.data?.error || 'Registration failed!';
    toast.error(errorMessage);
  }
};

// Login controller
const loginController = (userData, navigate) => async (dispatch) => {
    try {
      const response = await axios.post(LOGINURL, userData);
  
      const user = { ...response.data.user, token: response.data.token };
      localStorage.setItem('appUser', JSON.stringify(user));
      dispatch(loginUser(user));
  
      toast.success('Logged in successfully!');
      navigate(user.role === "admin" ? '/dashboard' : '/dashboard');
      return { success: true };
    } catch (error) {
      const errorMessage = error?.response?.data?.error || 'Login failed!';
      toast.error(errorMessage);
      return { success: false, message: errorMessage }; 
    }
  };
  

export { signupController, loginController };
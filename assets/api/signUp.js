import axios from "axios";
import addressPrefix from "./tempServerAddress";

const signUp = async (signUpData) => {
  try {
    const response = await axios.post(`${addressPrefix}/actions/signup/`, signUpData);
    if (response.status === 200) {return true;}
  } catch (error) {
    return false
  }
};

export default signUp;
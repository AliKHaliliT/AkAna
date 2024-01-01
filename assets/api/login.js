import axios from "axios";
import addressPrefix from "./tempServerAddress";

const login = async (loginData) => {
  try {
    const response = await axios.post(`${addressPrefix}/actions/login/`, loginData);
    if (response.status === 200) {return true;}
  } catch (error) {
    return false
  }
};

export default login;
import axios from "axios";

const url = 'https://apidemo.trackingpremium.us/publicapi/v1/search_username?username=trackingpremium';

export const getCompany = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
    return false;
  }
}
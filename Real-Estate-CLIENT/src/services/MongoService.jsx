import axios from 'axios';

const interestHouse = async ({name, email, phone, houseAddress}) => {
  return axios({
    method: 'post',
    url: `${process.env.API_HTTP_PROVIDER}/update/interested-user`,
    headers: {'Content-Type': `application/json`},
    data: {
      name: name,
      email: email,
      phone: phone,
      houseAddress: houseAddress,
      userAddress: web3.eth.defaultAccount
    }
  });
};

const removeInterestHouse = async ({houseAddress}) => {
  return axios({
    method: 'delete',
    url: `${process.env.API_HTTP_PROVIDER}/interested-users/`,
    headers: {'Content-Type': `application/json`},
    params: {
      houseAddress: houseAddress,
      userAddress: web3.eth.defaultAccount
    }
  });
};

const getInterestUsers = async ({houseAddress}) => {
  return axios({
    method: 'get',
    url: `${process.env.API_HTTP_PROVIDER}/interested-users/house`,
    headers: {'Content-Type': `application/json`},
    params: {
      address: houseAddress
    }
  }).then(res => {
    return res.data;
  }).catch(error => {
    console.log(error);
    return [];
  });
};

export {
  interestHouse, removeInterestHouse, getInterestUsers
};

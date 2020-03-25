import axios from 'axios';

const getListUserTransaction = async (userAddresses) => {
  return axios({
    method: 'post',
    url: `${process.env.API_HTTP_PROVIDER}/users/transactions`,
    headers: {'Content-Type': `application/json`},
    data: {
      userAddresses: userAddresses
    }
  }).then(res => {
    return res.data;
  }).catch(error => {
    console.log(error);
    return [];
  });
};

const getUserInfo = async (userAddress) => {
  return axios({
    method: 'post',
    url: `${process.env.API_HTTP_PROVIDER}/user/info`,
    headers: {'Content-Type': `application/json`},
    data: {
      userAddress: userAddress || web3.eth.defaultAccount
    }
  }).then(res => {
    return res.data;
  }).catch(error => {
    console.log(error);
    return {};
  });
};

const getListUserInfo = async (userAddresses) => {
  return axios({
    method: 'post',
    url: `${process.env.API_HTTP_PROVIDER}/users/info`,
    headers: {'Content-Type': `application/json`},
    data: {
      userAddresses: userAddresses
    }
  }).then(res => {
    return res.data;
  }).catch(error => {
    console.log(error);
    return [];
  });
};

const updateUserInfo = async ({name, email, phone}) => {
  return axios({
    method: 'patch',
    url: `${process.env.API_HTTP_PROVIDER}/user/info`,
    headers: {'Content-Type': `application/json`},
    data: {
      name: name,
      email: email,
      phone: phone,
      userAddress: web3.eth.defaultAccount
    }
  });
};

const getInterestUsers = async ({houseAddress}) => {
  return axios({
    method: 'post',
    url: `${process.env.API_HTTP_PROVIDER}/house/requests`,
    headers: {'Content-Type': `application/json`},
    data: {
      houseAddress: houseAddress
    }
  }).then(res => {
    return res.data;
  }).catch(error => {
    console.log(error);
    return [];
  });
};

const interestHouse = async ({houseAddress}) => {
  return axios({
    method: 'patch',
    url: `${process.env.API_HTTP_PROVIDER}/house/request`,
    headers: {'Content-Type': `application/json`},
    data: {
      houseAddress: houseAddress,
      userAddress: web3.eth.defaultAccount
    }
  });
};

const removeInterestHouse = async ({houseAddress}) => {
  return axios({
    method: 'delete',
    url: `${process.env.API_HTTP_PROVIDER}/house/request`,
    headers: {'Content-Type': `application/json`},
    data: {
      houseAddress: houseAddress,
      userAddress: web3.eth.defaultAccount
    }
  });
};

export {
  getListUserTransaction,
  getUserInfo, getListUserInfo, updateUserInfo,
  interestHouse, getInterestUsers, removeInterestHouse
};

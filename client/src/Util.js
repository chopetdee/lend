import axios from "axios";
const baseUrl = "http://localhost:8080/api";
async function getTransaction({ filterName, filterType }) {
  try {
    const params = { filterName, filterType };
    const transaction = await axios
      .get(`${baseUrl}/transactions`, { params })
      .then((res) => res.data);
    return transaction;
  } catch {
    return [];
  }
}

async function addTransaction(params){
  try {
    const transaction = await axios
      .post(`${baseUrl}/transactions`, params)
      .then((res) => res.data);
    return transaction;
  } catch {
    return [];
  }
}

async function getAllUsers(){
  try {
    const users = await axios
      .get(`${baseUrl}/transactions/allUser`)
      .then((res) => res.data);
    return users;
  } catch {
    return [];
  }
}

async function getUserRalation(userName) {
  try {
    const transaction = await axios
      .get(`${baseUrl}/transactions/user/${userName}`)
      .then((res) => res.data);
    return transaction;
  } catch (err) {
    return [];
  }
}

async function getAllBalance() {
  try {
    const transaction = await axios
      .get(`${baseUrl}/transactions/allBalance`)
      .then((res) => res.data);
    return transaction;
  } catch (err) {
    return [];
  }
}

export {
  getTransaction,
  addTransaction,
  getAllUsers,
  getUserRalation,
  getAllBalance,
}
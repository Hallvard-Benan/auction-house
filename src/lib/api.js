import axios from "axios";

export const baseUrl = import.meta.env.VITE_API_URL;

export async function fetchAllListings() {
  const res = await axios.get(`${baseUrl}/listings?_bids=true&_seller=true`);
  return res.data;
}

export async function fetchOneListing(id) {
  try {
    const res = await axios.get(`${baseUrl}/listings/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function registerUser(email, name, password, avatar) {
  const res = await axios.post(`${baseUrl}/auth/register`, {
    name,
    email,
    password,
    avatar,
  });
  return res.data;
}

export async function loginUser({ email, password }) {
  const res = await axios.post(`${baseUrl}/auth/login`, {
    email,
    password,
  });
  return res.data;
}

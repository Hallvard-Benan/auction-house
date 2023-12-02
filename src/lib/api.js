import axios from "axios";

export const baseUrl = import.meta.env.VITE_API_URL;
const accessToken = window.localStorage.getItem("access_token");
export async function fetchAllListings() {
  const res = await axios.get(
    `${baseUrl}/listings?_bids=true&_seller=true&sort=created&sortOrder=desc`
  );
  return res.data;
}

export async function fetchAllListingsByUser(name) {
  const res = await axios.get(
    `${baseUrl}/profiles/${name}/listings?_bids=true&_seller=true&sort=created&sortOrder=desc`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
}

export async function fetchOneListing(id) {
  const res = await axios.get(
    `${baseUrl}/listings/${id}?_bids=true&_seller=true`
  );
  return res.data;
}

export async function registerUser({ email, name, password, avatar }) {
  const res = await axios.post(`${baseUrl}/auth/register`, {
    name,
    email,
    password,
    avatar,
  });
  return res.data;
}

export async function getProfile(name) {
  const res = await axios.get(`${baseUrl}/profiles/${name}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(res.data);
  return res.data;
}

export async function loginUser({ email, password }) {
  const res = await axios.post(`${baseUrl}/auth/login`, {
    email,
    password,
  });
  return res.data;
}

export async function createListing({
  title,
  description,
  tags,
  media,
  endsAt,
}) {
  try {
    const res = await axios.post(
      `${baseUrl}/listings`,
      {
        title,
        description,
        tags,
        media,
        endsAt,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error; // Rethrow the error to let the calling code handle it
  }
}

export async function updateProfileImage(avatar, name) {
  const res = await axios.put(
    `${baseUrl}/profiles/${name}/media`,
    {
      avatar,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
}

export async function makeBid(amount) {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  const res = await axios.post(
    `${baseUrl}/listings/${id}/bids`,
    {
      amount,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.data;
}

export async function getBidsByProfile(name) {
  const res = await axios.get(
    `${baseUrl}/profiles/${name}/bids?_listings=true&_bids=true&_seller=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  console.log(res.data);
  return res.data;
}

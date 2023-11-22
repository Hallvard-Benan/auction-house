export const baseUrl = import.meta.env.VITE_API_URL;

export async function fetchAllListings() {
  try {
    const res = await fetch(`${baseUrl}/listings`);
    return res.json();
  } catch (error) {
    return error;
  }
}

export async function fetchOneListing(id) {
  try {
    const res = await fetch(`${baseUrl}/listings/${id}`);
    return res.json();
  } catch (error) {
    return error;
  }
}

export async function registerUser(email, name, password, avatar) {
  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify({
      name,
      email,
      password,
      avatar,
    });

    const options = {
      method: "POST",
      headers,
      body,
      redirect: "follow",
    };

    const res = await fetch(`${baseUrl}/auth/register`, options);
    return res.json();
  } catch (error) {
    return error;
  }
}

export async function loginUser(email, password) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const body = JSON.stringify({
    email,
    password,
  });

  const options = {
    method: "POST",
    headers,
    body,
    redirect: "follow",
  };
  const res = await fetch(`${baseUrl}/auth/login`, options);

  return res.json();
}

const baseUrl = "http://localhost:3001";

const handleServerResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);

// PUBLIC — no token
export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(handleServerResponse);
};

// PROTECTED — requires token
export function addItem({ name, imageUrl, weather }, token) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(handleServerResponse);
}

// PROTECTED — requires token
export function removeItem(itemID, token) {
  return fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
}

// get current user profile
export const getCurrentUser = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

// Update Profile
export const updateProfile = (data, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
};

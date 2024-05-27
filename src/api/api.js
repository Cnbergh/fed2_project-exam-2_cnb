import { API_URL, Login_URL, SignUp_URL, Profile_URL } from './constants';

/**
 * REST API
 * Here are all the API functions and helpers.
 * Section 1: User update, user login, user sign up.
 * Section 2: Data fetching, listings, credit.
 */

/**
 * -------- Section 1 --------
 */

/**
 * Helper function to add the
 * @param {Object} options - HTTP header options
 * @returns {Object} - HTTP header options with Authorization header
 */

function updateOptions(options) {
  const update = { ...options };
  if (localStorage.getItem('token')) {
    update.headers = {
      ...update.headers,
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  }
  return update;
}

/**
 * Wrapper around fetch to add Authorization header
 * @returns {Promise} - fetch promise
 */
export default function fetcher(url, options) {
  return fetch(url, updateOptions(options));
}

function handleResponse(response) {
  if (!response.ok) {
    console.error(`Error: ${response.statusText} (status: ${response.status})`);
    throw new Error(response.statusText);
  }
  return response.json();
}

function handleError(error) {
  console.error('API call failed:', error);
  throw new Error('An error occurred. Please try again later.');
}

function saveUserData(data) {
  localStorage.setItem('token', data.accessToken);
  localStorage.setItem('user_name', data.name);
  localStorage.setItem('user_email', data.email);
  localStorage.setItem('avatar', data.avatar);
}

/**
 * *Register user - (signUp page)
 */
export async function registerUser({ email, password, username }) {
  const url = new URL(SignUp_URL);
  const userData = { name: username, email, password };

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  };

  try {
    const data = await fetch(url, options).then(handleResponse);
    saveUserData(data);
    return data;
  } catch (error) {
    handleError(error);
  }
}

/** *Login user - login page*/
export async function loginUser({ email, password }) {
  const url = new URL(Login_URL);
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify({ email, password }),
  };

  try {
    const data = await fetcher(url, options).then(handleResponse);
    saveUserData(data);
    return data;
  } catch (error) {
    handleError(error);
  }
}

export function logoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user_email');
  localStorage.removeItem('user_name');
  localStorage.removeItem('avatar');
}

/**
 * -------- Section 2 --------
 */

export async function fetchApiListings({
  offset = 0,
  limit = 9,
  searchTerm = '',
  isActive = true,
  tag = '',
  sortBy = 'newest',
}) {
  let url = `${API_URL}/listings?offset=${offset}&limit=${limit}`;
  if (tag) url += `&_tag=${tag}`;
  if (!isActive) url += `&_active=false`;

  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const data = await fetch(url, options).then(handleResponse);
    if (!Array.isArray(data)) throw new Error('Invalid data format received');
    return filterAndSortListings(data, searchTerm, sortBy);
  } catch (error) {
    handleError(error);
  }
}

function filterAndSortListings(data, searchTerm, sortBy) {
  const filteredData = searchTerm
    ? data.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      )
    : data;

  return sortBy === 'newest'
    ? filteredData.sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      )
    : filteredData.sort(
        (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
      );
}

export async function fetchUserListings(offset = 0, limit = 12) {
  const username = localStorage.getItem('user_name');
  if (!username) throw new Error('No username found in storage.');

  const url = new URL(
    `${Profile_URL}/${username}/listings?offset=${offset}&limit=${limit}`
  );
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const data = await fetcher(url, options).then(handleResponse);
    if (!Array.isArray(data)) throw new Error('Invalid data format received');
    return data;
  } catch (error) {
    handleError(error);
  }
}

export async function fetchUserProfile() {
  const username = localStorage.getItem('user_name');
  const url = new URL(`${Profile_URL}/${username}`);
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  try {
    const data = await fetcher(url, options).then(handleResponse);
    if (!data) throw new Error('Invalid data format received');
    return data;
  } catch (error) {
    handleError(error);
  }
}

export async function createAPIKey() {
  const accessToken = localStorage.getItem('token');
  const url = 'https://v2.api.noroff.dev/auth/create-api-key';
  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
      name: localStorage.getItem('name'),
    },
  };

  try {
    const data = await fetch(url, options).then(handleResponse);
    localStorage.setItem('apiKey', data.data.key);
  } catch (error) {
    handleError(error);
  }
}

export async function fetchVenueById(venueId) {
  const url = new URL(`${API_URL}/${venueId}`);
  url.searchParams.append('_owner', 'true');
  url.searchParams.append('_bookings', 'true');

  try {
    return await fetch(url.href).then(handleResponse);
  } catch (error) {
    handleError(error);
  }
}

export async function createNewVenue(newVenue) {
  const url = new URL(`https://v2.api.noroff.dev/holidaze/venues`);
  const accessToken = localStorage.getItem('token');
  const apiKey = localStorage.getItem('apiKey');

  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': apiKey,
    },
    body: JSON.stringify(newVenue),
  };

  try {
    return await fetch(url, options).then(handleResponse);
  } catch (error) {
    handleError(error);
  }
}

export async function updateProfile(putProfile) {
  const profileName = localStorage.getItem('name');
  const url = `https://v2.api.noroff.dev/holidaze/profiles/${profileName}`;
  const accessToken = localStorage.getItem('token');
  const apiKey = localStorage.getItem('apiKey');

  const options = {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': apiKey,
    },
    body: JSON.stringify(putProfile),
  };

  try {
    return await fetch(url, options).then(handleResponse);
  } catch (error) {
    handleError(error);
  }
}

export async function venuesByProfile(profileName) {
  const url = new URL(
    `https://v2.api.noroff.dev/holidaze/profiles/${profileName}/venues`
  );
  const accessToken = localStorage.getItem('token');
  const apiKey = localStorage.getItem('apiKey');

  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': apiKey,
    },
  };

  try {
    return await fetch(url, options).then(handleResponse);
  } catch (error) {
    handleError(error);
  }
}

export async function updateVenue(venueId, putVenue) {
  const url = new URL(`https://v2.api.noroff.dev/holidaze/venues/${venueId}`);
  const accessToken = localStorage.getItem('token');
  const apiKey = localStorage.getItem('apiKey');

  const options = {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': apiKey,
    },
    body: JSON.stringify(putVenue),
  };

  try {
    return await fetch(url, options).then(handleResponse);
  } catch (error) {
    handleError(error);
  }
}

export async function deleteVenue(venueId) {
  const url = new URL(`https://v2.api.noroff.dev/holidaze/venues/${venueId}`);
  const accessToken = localStorage.getItem('token');
  const apiKey = localStorage.getItem('apiKey');

  const options = {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Noroff-API-Key': apiKey,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response
      .text()
      .then((text) => (text ? JSON.parse(text) : null));
  } catch (error) {
    handleError(error);
  }
}

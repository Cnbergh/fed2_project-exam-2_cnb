import { SignUp_URL, Login_URL, ApiKey_URL, Profile_URL } from './constants';
import fetcher from '../lib/fetcher';
import { useAuth } from '../components/providers/auth_context';

export function useApi() {
  const { authState, saveUserData, logoutUser } = useAuth();

  async function registerUser({ email, password, name, venueManager }) {
    const url = SignUp_URL;
    const userData = { name, email, password, venueManager };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    };

    try {
      const data = await fetcher(url, options);
      saveUserData(data);
      await createApiKey(data.accessToken);
      return data;
    } catch (error) {
      handleError(error);
    }
  }

  async function createApiKey(accessToken) {
    const url = ApiKey_URL;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name: 'API Key' }),
    };

    try {
      const data = await fetcher(url, options);
      saveApiKey(data.data.key);
      return data;
    } catch (error) {
      handleError(error);
    }
  }

  function saveApiKey(apiKey) {
    saveUserData({ ...authState, apiKey });
  }

  async function loginUser({ email, password }) {
    const url = Login_URL;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ email, password }),
    };

    try {
      const data = await fetcher(url, options);
      saveUserData(data);
      return data;
    } catch (error) {
      handleError(error);
    }
  }

  async function updateProfile(username, profileData) {
    const url = `${Profiles_URL}/${username}`;

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authState.token}`,
        'X-Noroff-API-Key': authState.apiKey,
      },
      body: JSON.stringify(profileData),
    };

    try {
      const response = await fetcher(url, options);
      return response;
    } catch (error) {
      handleError(error);
    }
  }

  return {
    registerUser,
    loginUser,
    updateProfile,
  };
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

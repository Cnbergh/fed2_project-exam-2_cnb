import {
  SignUp_URL,
  Login_URL,
  ApiKey_URL,
  Profile_URL,
  Venues_URL,
  Bookings_URL,
} from './constants';
import fetcher from '../lib/fetcher';
import { useAuth } from '../components/providers/auth_context';

export function useApi() {
  const { authState, saveUserData, logoutUser } = useAuth();

  async function fetchWithAuth(url, options = {}, retry = true) {
    console.log('Auth State before API call:', authState);

    if (!authState.token || !authState.apiKey) {
      console.log(
        'Authorization token or API key not found. Attempting to create a new API key...'
      );
      try {
        const apiKeyData = await createApiKey(authState.token);
        saveUserData({ apiKey: apiKeyData.data.key });
        // Retry the original request
        const headers = {
          ...options.headers,
          Authorization: `Bearer ${authState.token}`,
          'X-Noroff-API-Key': apiKeyData.data.key,
        };
        return await fetcher(url, { ...options, headers });
      } catch (error) {
        throw new Error(
          'Authorization token or API key not found. Please login.'
        );
      }
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${authState.token}`,
      'X-Noroff-API-Key': authState.apiKey,
    };

    try {
      return await fetcher(url, { ...options, headers });
    } catch (error) {
      if (
        retry &&
        error.message.includes('Authorization token or API key not found')
      ) {
        console.log('Retrying with new API key...');
        const apiKeyData = await createApiKey(authState.token);
        saveUserData({ apiKey: apiKeyData.data.key });
        const headers = {
          ...options.headers,
          Authorization: `Bearer ${authState.token}`,
          'X-Noroff-API-Key': apiKeyData.data.key,
        };
        return await fetcher(url, { ...options, headers });
      } else {
        throw error;
      }
    }
  }

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
      saveUserData({ ...data.data, apiKey: null });
      return data;
    } catch (error) {
      handleError(error);
    }
  }

  async function createApiKey(accessToken) {
    const url = ApiKey_URL;
    console.log('Creating API Key with accessToken:', accessToken);

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
      console.log('API Key Created:', data);
      saveApiKey(data.data.key);
      return data;
    } catch (error) {
      handleError(error);
    }
  }

  function saveApiKey(apiKey) {
    console.log('Saving API Key:', apiKey);
    saveUserData({ apiKey });
    localStorage.setItem('authState', JSON.stringify({ ...authState, apiKey }));
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
      console.log('User Logged In:', data);
      const apiKeyData = await createApiKey(data.data.accessToken);
      const userData = {
        token: data.data.accessToken,
        user: {
          name: data.data.name,
          email: data.data.email,
          avatar: data.data.avatar,
        },
        apiKey: apiKeyData.data.key,
      };

      console.log('User Data to be saved:', userData);
      saveUserData(userData);
      return data;
    } catch (error) {
      handleError(error);
    }
  }

  async function updateProfile(username, profileData) {
    const url = `${Profile_URL}/${username}`;

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authState.token}`,
        'X-Noroff-API-Key': authState.apiKey,
      },
      body: JSON.stringify(profileData),
    };

    console.log('Updating profile with data:', profileData);

    try {
      const response = await fetcher(url, options);
      return response;
    } catch (error) {
      handleError(error);
    }
  }

  // Venues related functions
  async function fetchVenues() {
    const url = Venues_URL;

    try {
      const response = await fetcher(url, { method: 'GET' });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function fetchVenueById(venueId) {
    const url = `${Venues_URL}/${venueId}?_bookings=true`;

    try {
      const response = await fetcher(url, { method: 'GET' });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function createVenue(venueData) {
    const url = Venues_URL;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(venueData),
    };

    try {
      const response = await fetchWithAuth(url, options);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function updateVenue(venueId, venueData) {
    const url = `${Venues_URL}/${venueId}`;

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(venueData),
    };

    try {
      const response = await fetchWithAuth(url, options);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function deleteVenue(venueId) {
    const url = `${Venues_URL}/${venueId}`;

    const options = {
      method: 'DELETE',
    };

    try {
      const response = await fetchWithAuth(url, options);
      return response;
    } catch (error) {
      handleError(error);
    }
  }

  async function searchVenues({ location, dateFrom, dateTo, guests }) {
    const searchParams = new URLSearchParams();
    searchParams.append('q', location); // Use location for the 'where' query
    if (dateFrom) searchParams.append('dateFrom', dateFrom);
    if (dateTo) searchParams.append('dateTo', dateTo);
    if (guests) searchParams.append('guests', guests);

    const url = `${Venues_URL}/search?${searchParams.toString()}`;

    try {
      const response = await fetcher(url, { method: 'GET' });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  // Bookings related functions
  async function fetchBookings() {
    const url = Bookings_URL;

    try {
      const response = await fetchWithAuth(url, { method: 'GET' });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function fetchBookingById(bookingId) {
    const url = `${Bookings_URL}/${bookingId}`;

    try {
      const response = await fetchWithAuth(url, { method: 'GET' });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function createBooking(bookingData) {
    const url = Bookings_URL;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    };

    try {
      const response = await fetchWithAuth(url, options);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function updateBooking(bookingId, bookingData) {
    const url = `${Bookings_URL}/${bookingId}`;

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    };

    try {
      const response = await fetchWithAuth(url, options);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function deleteBooking(bookingId) {
    const url = `${Bookings_URL}/${bookingId}`;

    const options = {
      method: 'DELETE',
    };

    try {
      const response = await fetchWithAuth(url, options);
      return response;
    } catch (error) {
      handleError(error);
    }
  }

  // Profiles related functions
  async function fetchProfiles() {
    const url = Profile_URL;

    try {
      const response = await fetchWithAuth(url, { method: 'GET' });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function fetchProfileById(profileId) {
    const url = `${Profile_URL}/${profileId}`;

    try {
      const response = await fetchWithAuth(url, { method: 'GET' });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function fetchBookingsByProfile(profileName) {
    const url = `${Profile_URL}/${profileName}/bookings`;
    console.log('Fetching bookings with URL:', url);

    try {
      const response = await fetchWithAuth(url, { method: 'GET' });
      console.log('FetchBookingsByProfile response:', response);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function fetchVenuesByProfile(profileName) {
    const url = `${Profile_URL}/${profileName}/venues`;

    try {
      const response = await fetchWithAuth(url, { method: 'GET' });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  return {
    registerUser,
    loginUser,
    updateProfile,
    fetchProfiles,
    fetchProfileById,
    fetchBookingsByProfile,
    fetchVenuesByProfile,
    fetchVenues,
    fetchVenueById,
    createVenue,
    updateVenue,
    deleteVenue,
    searchVenues,
    fetchBookings,
    fetchBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
  };
}

function handleError(error) {
  console.error('API call failed:', error);
  throw new Error(
    error.message || 'An error occurred. Please try again later.'
  );
}

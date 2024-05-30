const fetcher = async (url, options = {}, token = null, apiKey = null) => {
  const updateOptions = (options) => {
    const updatedOptions = { ...options };
    if (token) {
      updatedOptions.headers = {
        ...updatedOptions.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    if (apiKey) {
      updatedOptions.headers = {
        ...updatedOptions.headers,
        'X-Noroff-API-Key': apiKey,
      };
    }
    return updatedOptions;
  };

  const response = await fetch(url, updateOptions(options));
  return handleResponse(response);
};

const handleResponse = (response) => {
  if (!response.ok) {
    console.error(`Error: ${response.statusText} (status: ${response.status})`);
    throw new Error(response.statusText);
  }
  return response.json();
};

export default fetcher;

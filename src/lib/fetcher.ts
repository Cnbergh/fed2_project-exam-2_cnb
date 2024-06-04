export default async function fetcher(url: string, options = {}) {
  const response = await fetch(url, options);

  // Check if the response status is 204 No Content
  if (response.status === 204) {
    return {}; // Return an empty object or any suitable response
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred.');
  }

  return data;
}

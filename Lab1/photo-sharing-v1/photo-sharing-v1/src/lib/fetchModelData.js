/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
async function fetchModel(url) {
  const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:8081";
  const response = await fetch(`${baseUrl}${url}`);
  if (!response.ok) {
    throw new Error(`Không thể tải dữ liệu (${response.status}).`);
  }
  return response.json();
}

export default fetchModel;

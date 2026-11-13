/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
async function fetchModel(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Không thể tải dữ liệu (${response.status}).`);
  }
  return response.json();
}

export default fetchModel;

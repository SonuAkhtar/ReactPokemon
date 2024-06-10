export const fetchApiData = async (url) => {
  let response = await fetch(url);
  let apiData = await response.json();
  return apiData;
};

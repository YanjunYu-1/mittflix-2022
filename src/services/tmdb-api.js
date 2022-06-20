const API_KEY = "98c449f0cb1986bc3644e7d02ded8e81";
const BASE_URL = `https://api.themoviedb.org/3`;
const discoverEndpoint = "/discover/tv";
const searchEndpoint = "/search/tv";
const detailsEndpoint = "/tv";

const getShowsByProviderId = async (id) => {
  const request = await fetch(
    BASE_URL +
      discoverEndpoint +
      `?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_watch_providers=${id}&watch_region=CA`
  );
  const response = await request.json();
  const shows = await response.results;
  return shows;
};

export const getShowsByAllProviders = (providers) => {
  const responses = [];
  Object.keys(providers).forEach((provider) => {
    responses.push(
      getShowsByProviderId(providers[provider].id).then((shows) => [
        providers[provider].displayName,
        shows,
      ])
    );
  });
  return Promise.all(responses);
};

export const searchShows = async (query) => {
  const URL =
    BASE_URL +
    searchEndpoint +
    `?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${query}`;
  const request = await fetch(URL);
  const response = await request.json();
  const shows = await response.results;
  return shows;
};

export const getShowDetails = async (id) => {
  const URL =
    BASE_URL + detailsEndpoint + `/${id}?api_key=${API_KEY}&language=en-US`;
  const request = await fetch(URL);
  const response = await request.json();
  const details = response;
  return details;
};

// https://api.themoviedb.org/3/watch/providers/tv?api_key=98c449f0cb1986bc3644e7d02ded8e81&language=en-US
// BASE_URL+/watch/providers/tv?api_key=${API_KEY }&language=en-US

export const getProviders = async () => {
  const URL = BASE_URL + `/watch/providers/tv?api_key=${API_KEY}&language=en-U`;
  const request = await fetch(URL);
  const response = await request.json();
  const details = response;
  return details;
};

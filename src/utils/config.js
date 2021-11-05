const APP_NAME = "REACTMON";
const API_BASE_URL = "https://pokeapi.co/api/v2/";
const API_TIMEOUT = 6000;

const HOME_ROUTE = "/";
const DETAIL_ROUTE = "/detail/:id";
const MY_LIST_ROUTE = "/my-list";

const NAV_ITEMS = [
  {
    title: "My List",
    path: MY_LIST_ROUTE,
  },
]
export { APP_NAME, API_BASE_URL, API_TIMEOUT, HOME_ROUTE, DETAIL_ROUTE, MY_LIST_ROUTE, NAV_ITEMS };

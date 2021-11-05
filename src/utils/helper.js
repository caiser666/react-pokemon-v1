import store from "../redux/store";

// redux
export const state = {
  POKEMON: "pokemon",
};

export const getReduxState = (state) => {
  return store.getState()[state];
};


// localstorage
export const local = {
  POKEMON: "pokemon",
};


export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorage = (key) => {
  if (window !== "undefined") {
    return localStorage.getItem(key);
  }
};

export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};
export const numberWithCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const HOME_URL = "/";
export const PREDICT_URL = "/predict";
export const NEWS_LETTER_URL = "/newsletter";
export const COMMUNITY_URL = "/community";
export const LOGIN_URL = "/signin";
export const REGISTER_URL = "/register";

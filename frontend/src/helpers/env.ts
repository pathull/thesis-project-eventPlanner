export const env = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN as string,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID as string,
  baseUrl: process.env.REACT_APP_BASE_URL as string,
  eventImgPlaceholder: process.env.REACT_LOADING_IMAGE_PLACEHOLDER,
  userImgPlaceholder: process.env.REACT_IMAGE_PLACEHOLDER_USER,
};

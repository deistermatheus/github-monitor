export function mapAxiosErrorToRedux({ error, action, dispatch }) {
  const errorMessage = typeof error.response.data === 'string' ? error.response.data : error.response.data.detail;
  dispatch(action('errorMessage', errorMessage));
}
export function omitUndefined(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => typeof v !== 'undefined'));
}

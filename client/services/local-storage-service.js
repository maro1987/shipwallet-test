export function saveAppState(state) {
  sessionStorage.setItem('state', JSON.stringify(state));
}

export function getAppState() {
  return JSON.parse(sessionStorage.getItem('state'));
}

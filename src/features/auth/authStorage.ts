const AUTH_KEY = "notes_app_is_authed";

export function getStoredAuth(): boolean {
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function setStoredAuth(value: boolean): void {
  localStorage.setItem(AUTH_KEY, String(value));
}

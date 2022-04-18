export function setUserProfile(data) {
  return localStorage.setItem("profile", JSON.stringify(data));
}

export function getUserProfile() {
  return JSON.parse(localStorage.getItem("profile"));
}

export function deleteUserProfile() {
  localStorage.removeItem("profile");
}

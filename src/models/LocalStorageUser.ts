import AppUser from "./AppUser";

export interface LocalStorageUser {
  isLoggedIn: boolean;
  appUser: AppUser;
}

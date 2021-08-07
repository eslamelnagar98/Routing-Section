export class AuthService {
  IsAuthenticated() {
    const promise = new Promise(
      (resolve, rejects) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 800);
      }
    )
    return promise;
  }
  loggedIn: boolean = false;
  Login() {
    this.loggedIn = true;
  }
  Logout() {
    this.loggedIn = false;
  }
}

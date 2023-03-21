import ApiBase from '@/api/base';
import StorageHelper from '@/helpers/localStorageHelper';
import notify from '@/helpers/notify';
import router from '@/router';

const authTokenTimeKey = 'auth_token_time';

class AuthAPI {
  static authTokenTimeKey() {
    return authTokenTimeKey;
  }

  static login(self) {
    const { form } = self;
    self
      .http('post', `${ApiBase.baseAuthUrl()}/sign-in`, form)
      .then((response) => {
        AuthAPI.setAuthToken(response.token);
        notify(self, 'success', 'Successful login!')
        setTimeout(() => router.push({path: "/dashboard"}), 500)
        
      })
      .catch((error) => {
        console.error(error);
        notify(self, 'error', error.message)
      });
  }

  static register(self) {
    const { form } = self;
    self
      .http('post', `${ApiBase.baseAuthUrl()}/sign-up`, form)
      .then(response => {
        AuthAPI.setAuthToken(response.token);
        notify(self, 'success', 'Successful signup!')
        setTimeout(() => router.push({path: "/dashboard"}), 500)
      })
      .catch((error) => {
        console.error(error);
        notify(self, 'error', error.message)
      });
  }

  static async setAuthToken(token, isRememberMe = true) {
    const addedSeconds = isRememberMe ? 20160 * 60000 : 15 * 60000;
    let date = new Date();
    date = new Date(date.getTime() + addedSeconds);
    await StorageHelper.set(authTokenTimeKey, date.getTime());
    await StorageHelper.set(ApiBase.authTokenKey(), token);
  }
}

export default AuthAPI;

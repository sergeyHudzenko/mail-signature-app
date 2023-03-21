import store from '@/store';
import router from '@/router';
import StorageHelper from '@/helpers/localStorageHelper';

const authTokenKey = 'token-key';
const authTokenTimeKey = 'auth_token_time';

class ApiBase {
  static baseUrl() {
    return '/';
  }

  static baseAuthUrl() {
    return 'http://localhost:30001/api/auth';
  }

  static baseProfileUrl() {
    return 'http://localhost:30002/api/profile';
  }

  static baseMailUrl() {
    return 'http://localhost:30003/api/mail';
  }

  static defaultLang() {
    return 'en';
  }

  static authTokenKey() {
    return authTokenKey;
  }

  static authHeaders(token = null) {
    return {
      Authorization: `Bearer ${token || StorageHelper.get(authTokenKey)}`,
    };
  }

  static setToStore(
    self,
    name,
    data,
    callBack
  ) {
    store.dispatch(name, data);
    if (callBack) {
      callBack();
    }
  }

  static authoriseUser(redirectTo = '/dashboard') {
    if (redirectTo) {
      router.push(redirectTo);
    }
  }

  static unauthoriseUser(redirectTo = '/auth') {
    StorageHelper.remove(authTokenKey);
    StorageHelper.remove(authTokenTimeKey);
    if (redirectTo) {
      router.push(redirectTo);
    }
  }
}

export default ApiBase;

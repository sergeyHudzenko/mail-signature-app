import ApiBase from '@/api/base';

class UserAPI {
  static getProfile(self) { 
    self
      .http('get', `${ApiBase.baseProfileUrl()}/user`, null, ApiBase.authHeaders())
      .then((response) => {
        ApiBase.setToStore(null, 'setUserDataList', response);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

export default UserAPI;

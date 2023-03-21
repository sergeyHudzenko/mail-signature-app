import ApiBase from "./base";

export default class MailAPI {
  /**
   *
   */
  static getSignatures(self) {
    self
      .http(
        "get",
        `${ApiBase.baseMailUrl()}/signatures`,
        null,
        ApiBase.authHeaders()
      )
      .then((response) => {
        ApiBase.setToStore(null, "setUserSignatureList", response);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  /**
   *
   */
   static getSignature(self) {
    self
      .http(
        "get",
        `${ApiBase.baseMailUrl()}/signature`,
        null,
        ApiBase.authHeaders()
      )
      .then((response) => {
        ApiBase.setToStore(null, "setUserSignature", response);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  /**
   *
   */
   static saveSignature(self, data) {
    self
      .http(
        "post",
        `${ApiBase.baseMailUrl()}/signature`,
        data,
        ApiBase.authHeaders()
      )
      .then((response) => {
        ApiBase.setToStore(null, "addToSignatureList", response.data);
        self.clearForm();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  /**
   * 
   */
  static removeSignatures(self, data) {
    self
      .http(
        "delete",
        `${ApiBase.baseMailUrl()}/signature`,
        data,
        ApiBase.authHeaders()
      )
      .then(() => {
        ApiBase.setToStore(null, "removeSingature", data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

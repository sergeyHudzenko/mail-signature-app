/* eslint-disable indent */
import Vue from 'vue';
import axios from 'axios';
import ApiBase from '@/api/base';
import AuthAPI from '@/api/auth';
import StorageHelper from '@/helpers/localStorageHelper';


Vue.mixin({
  data: () => ({
    tokenTimeout: null,
  }),
  methods: {
    checkToken() {
      return new Promise((resolve, reject) => {
        const authTokenTimeFromLS = StorageHelper.get(
          AuthAPI.authTokenTimeKey()
        );
        if (authTokenTimeFromLS) {
          if (authTokenTimeFromLS <= new Date().getTime()) {
            const self = this;
            if (self.tokenTimeout) clearTimeout(self.tokenTimeout);
            self.tokenTimeout = window.setTimeout(() => {
              axios({
                method: 'post',
                url: `${ApiBase.baseUrl()}/token`,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                  ...ApiBase.authHeaders(),
                },
              })
                .then((response) => {
                  AuthAPI.setAuthToken(response.data.token).then(() => {
                    resolve(true);
                  });
                })
                .catch((error) => {
                  console.error(error);
                  ApiBase.unauthoriseUser();
                });
            }, 100);
          } else {
            resolve(true);
          }
        } else {
          resolve(true);
        }
      });
    },

    async http(method, url, params, header) {
      if (header && header.Authorization) {
        await (this).checkToken().then(() => {
          header = {
            ...header,
            ...ApiBase.authHeaders(),
          };
        });
      }

      method = method.toLowerCase();
      const config = {
        method,
        url,
      };

      if (method === 'get') {
        config.params = params;
        config.headers = Object.assign(header || {}, {
          'Content-Type': 'application/x-www-form-urlencoded',
        });
      } else if (
        method === 'post' ||
        method === 'put' ||
        method === 'delete' ||
        method === 'patch'
      ) { 
        config.data = params;
        config.headers = Object.assign(header || {}, {
          'Content-Type': 'application/x-www-form-urlencoded',
        });
      }

      return new Promise((resolve, reject) =>
        // eslint-disable-next-line no-promise-executor-return
        axios(config)
          .then((response) => resolve(response.data))
          .catch((error) => {
            if (error.response) {
              switch (error.response.status) {
                case 400:
                  reject(error.response.data);
                  break;
                case 413:
                  // eslint-disable-next-line prefer-promise-reject-errors
                  reject({
                    message: 'The file is too large',
                  });
                  break;
                case 401:
                  reject(error.response.data);
                  ApiBase.unauthoriseUser();
                  break;
                case 404:
                  reject(error.response.data);
                  break;
                case 500:
                  // notify(this, 'error', error.response.data.message);
                  reject(error);
                  break;
                default:
                  console.error('error', error.response);
                  reject(error);
                  break;
              }
            } else {
              console.error(error);
              reject(error);
            }
          })
      );
    },
  },
});

import StorageHelper from '@/helpers/localStorageHelper';
import ApiBase from '@/api/base';

export default function auth( to, from, next ) {
  if (!StorageHelper.get(ApiBase.authTokenKey())) {
    return next({
      name: 'Auth',
    });
  }

  return next();
}

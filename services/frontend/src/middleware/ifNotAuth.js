import StorageHelper from '@/helpers/localStorageHelper';
import ApiBase from '@/api/base';

export default function ifNotAuth( to , from ,  next ) {
  if (StorageHelper.get(ApiBase.authTokenKey())) {
    return next({
      name: 'Dashboard',
    });
  }
  return next();
}

import Database from './database';

// a week
const LOGIN_VALID_LIMIT = 7 * 24 * 60 * 60 * 1000;

const isLoginValid = diff => {
  return diff < LOGIN_VALID_LIMIT;
};

const getTimeDiff = timestamp => {
  const now = Date.now();
  return now - timestamp;
};

export const checkLoginStatus = ({token}) =>
  new Promise((resolve, reject) => {
    Database.CheckSession(token)
      .then(res => {
        if (res[0] && isLoginValid(getTimeDiff(res[0].timestamp))) {
          resolve({isLoggedIn: true});
        } else {
          Database.Logout(token);
          resolve({isLoggedIn: false});
        }
      })
      .catch(err => {
        Raven.captureException(err);
        reject(err);
      });
  });

export const normalizeUpdateData = ({oldData, newData, keyArr}) => {
  return keyArr.map(key => {
    return newData[key] || oldData[key];
  });
};

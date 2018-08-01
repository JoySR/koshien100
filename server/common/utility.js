import Database from './database'

export const checkLoginStatus =  ({token}) => new Promise((resolve, reject) => {
  Database.CheckSession(token).then(res => {
    if (res[0]) {
      resolve({isLoggedIn: true});
    } else {
      resolve({isLoggedIn: false});
    }
  }).catch(err => {
    reject(err);
  })
})

export const normalizeUpdateData = ({oldData, newData, keyArr}) => {
  return keyArr.map(key => {
    return newData[key] || oldData[key];
  })
}

import Database from '../common/database';
import {checkLoginStatus, normalizeUpdateData} from '../common/utility'
import {prefectureKeys} from '../config/constants'

const Prefectures = {
  getPrefecture: (request, response, next) => {
    if (request.body) {
      const id = request.body.id;
      Database.GetPrefecture(id).then(res => {
        if (res) {
          response.send(200, {
            success: true,
            message: 'GetPrefecture is OK.',
            date: res,
          })
        }
      }).catch(err => {
        response.send(500, err);
      })
    }
  },

  addPrefecture: (request, response, next) => {
    if (request.body) {
      const token = request.body.token;
      checkLoginStatus({token}).then(res => {
        if (res.isLoggedIn) {
          const prefecture = request.body.prefecture;
          const prefectureArr = Object.keys(prefecture).map(key => prefecture[key])
          Database.AddPrefecture(prefectureArr).then(res => {
            if (res) {
              response.send(200, {
                success: true,
                message: 'AddPrefecture is OK.',
                id: res.insertId
              })
            }
          }).catch(err => {
            response.send(500, err);
          })
        } else {
          response.send(200, {
            success: false,
            message: 'You are not logged in.'
          })
        }
      }).catch(err => {
        response.send(500, {
          message: err,
        })
      })
    }
  },

  editPrefecture: (request, response, next) => {
    if (request.body) {
      const token = request.body.token;
      checkLoginStatus({token}).then(res => {
        if (res.isLoggedIn) {
          const prefecture = request.body.prefecture;
          const id = prefecture.id;
          Database.GetPrefecture(id).then(res => {
            if (res) {
              const oldPrefecture = res[0];
              return normalizeUpdateData({
                oldData: oldPrefecture,
                newData: prefecture,
                keyArr: prefectureKeys
              });
            }
          }).then((dateArr) => {
            Database.UpdatePrefecture(id, dateArr).then(res => {
              if (res) {
                response.send(200, {
                  success: true,
                  message: 'UpdatePrefecture is OK.'
                });
              }
            }).catch(err => {
              response.send(500, err);
            })
          }).catch(err => {
            response.send(500, err);
          })
        } else {
          response.send(200, {
            success: false,
            message: 'You are not logged in.'
          })
        }
      }).catch(err => {
        response.send(500, {
          message: err,
        })
      })
    }
  },

  removePrefecture: (request, response, next) => {
    if (request.body) {
      const token = request.body.token;
      checkLoginStatus({token}).then(res => {
        if (res.isLoggedIn) {
          const id = request.body.prefecture.id;
          Database.RemovePrefecture(id).then(res => {
            if (res) {
              response.send(200, {
                success: true,
                message: 'RemovePrefecture is OK.'
              });
            }
          }).catch(err => {
            response.send(500, err);
          })
        } else {
          response.send(200, {
            success: false,
            message: 'You are not logged in.'
          })
        }
      }).catch(err => {
        response.send(500, {
          message: err,
        })
      })
    }
  },
};

export default Prefectures;

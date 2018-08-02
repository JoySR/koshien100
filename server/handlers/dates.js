import Database from '../common/database';
import {checkLoginStatus, normalizeUpdateData} from '../common/utility'
import {dateKeys} from '../config/constants'

const Dates = {
  getDates: (request, response, next) => {
    Database.GetDates().then(res => {
      if (res) {
        response.send(200, {
          success: true,
          message: 'GetDates is OK.',
          dates: res,
        })
      }
    }).catch(err => {
      response.send(500, err);
    })
  },

  addDate: (request, response, next) => {
    if (request.body) {
      const token = request.body.token;
      checkLoginStatus({token}).then(res => {
        if (res.isLoggedIn) {
          const date = request.body.date;
          const dateArr = Object.keys(date).map(key => date[key])
          Database.AddDate(dateArr).then(res => {
            if (res) {
              response.send(200, {
                success: true,
                message: 'AddDate is OK.',
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

  editDate: (request, response, next) => {
    if (request.body) {
      const token = request.body.token;
      checkLoginStatus({token}).then(res => {
        if (res.isLoggedIn) {
          const date = request.body.date;
          const id = date.id;
          Database.GetDate(id).then(res => {
            if (res) {
              const oldDate = res[0];
              return normalizeUpdateData({
                oldData: oldDate,
                newData: date,
                keyArr: dateKeys,
              });
            }
          }).then((dateArr) => {
            Database.UpdateDate(id, dateArr).then(res => {
              if (res) {
                response.send(200, {
                  success: true,
                  message: 'UpdateDate is OK.'
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

  removeDate: (request, response, next) => {
    if (request.body) {
      const token = request.body.token;
      checkLoginStatus({token}).then(res => {
        if (res.isLoggedIn) {
          const id = request.body.date.id;
          Database.RemoveDate(id).then(res => {
            if (res) {
              response.send(200, {
                success: true,
                message: 'RemoveDate is OK.'
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

export default Dates;

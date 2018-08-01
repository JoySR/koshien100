import Database from '../common/database';
import {checkLoginStatus, normalizeUpdateData} from '../common/utility'
import {schoolKeys} from '../config/constants'

const Schools = {
  getSchool: (request, response, next) => {
    if (request.body) {
      const id = request.body.id;
      Database.GetSchool(id).then(res => {
        if (res) {
          response.send(200, {
            success: true,
            message: 'GetSchool is OK.',
            date: res,
          })
        }
      }).catch(err => {
        response.send(500, err);
      })
    }
  },

  addSchool: (request, response, next) => {
    if (request.body) {
      const token = request.body.token;
      checkLoginStatus({token}).then(res => {
        if (res.isLoggedIn) {
          const school = request.body.school;
          const schoolArr = Object.keys(school).map(key => school[key])
          Database.AddSchool(schoolArr).then(res => {
            if (res) {
              response.send(200, {
                success: true,
                message: 'AddSchool is OK.',
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

  editSchool: (request, response, next) => {
    if (request.body) {
      const token = request.body.token;
      checkLoginStatus({token}).then(res => {
        if (res.isLoggedIn) {
          const school = request.body.school;
          const id = school.id;
          Database.GetSchool(id).then(res => {
            if (res) {
              const oldSchool = res[0];
              return normalizeUpdateData({
                oldData: oldSchool,
                newData: school,
                keyArr: schoolKeys
              });
            }
          }).then((dateArr) => {
            Database.UpdateSchool(id, dateArr).then(res => {
              if (res) {
                response.send(200, {
                  success: true,
                  message: 'UpdateSchool is OK.'
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

  removeSchool: (request, response, next) => {
    if (request.body) {
      const token = request.body.token;
      checkLoginStatus({token}).then(res => {
        if (res.isLoggedIn) {
          const id = request.body.school.id;
          Database.RemoveSchool(id).then(res => {
            if (res) {
              response.send(200, {
                success: true,
                message: 'RemoveSchool is OK.'
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

export default Schools;

import Database from '../common/database';
import {checkLoginStatus, normalizeUpdateData} from '../common/utility';
import {areaKeys} from '../config/constants';

const Areas = {
  getAreas: (request, response, next) => {
    Database.GetAreas()
      .then(res => {
        if (res) {
          response.send(200, {
            success: true,
            message: 'GetAreas is OK.',
            areas: res,
          });
        }
      })
      .catch(err => {
        response.send(500, err);
      });
  },

  getArea: (request, response, next) => {
    if (request.body) {
      const id = request.body.id;
      Database.GetArea(id)
        .then(res => {
          if (res) {
            response.send(200, {
              success: true,
              message: 'GetArea is OK.',
              area: res,
            });
          }
        })
        .catch(err => {
          response.send(500, err);
        });
    }
  },

  addArea: (request, response, next) => {
    if (request.body) {
      const token = request.body.token;
      checkLoginStatus({token})
        .then(res => {
          if (res.isLoggedIn) {
            const area = request.body.area;
            const areaArr = Object.keys(area).map(key => area[key]);
            Database.AddArea(areaArr)
              .then(res => {
                if (res) {
                  response.send(200, {
                    success: true,
                    message: 'AddArea is OK.',
                    id: res.insertId,
                  });
                }
              })
              .catch(err => {
                response.send(500, err);
              });
          } else {
            response.send(200, {
              success: false,
              message: 'You are not logged in.',
            });
          }
        })
        .catch(err => {
          response.send(500, {
            message: err,
          });
        });
    }
  },

  editArea: (request, response, next) => {
    if (request.body) {
      const token = request.body.token;
      checkLoginStatus({token})
        .then(res => {
          if (res.isLoggedIn) {
            const area = request.body.area;
            const id = area.id;
            Database.GetArea(id)
              .then(res => {
                if (res) {
                  const oldArea = res[0];
                  return normalizeUpdateData({
                    oldData: oldArea,
                    newData: area,
                    keyArr: areaKeys,
                  });
                }
              })
              .then(dateArr => {
                Database.UpdateArea(id, dateArr)
                  .then(res => {
                    if (res) {
                      response.send(200, {
                        success: true,
                        message: 'UpdateArea is OK.',
                      });
                    }
                  })
                  .catch(err => {
                    response.send(500, err);
                  });
              })
              .catch(err => {
                response.send(500, err);
              });
          } else {
            response.send(200, {
              success: false,
              message: 'You are not logged in.',
            });
          }
        })
        .catch(err => {
          response.send(500, {
            message: err,
          });
        });
    }
  },

  removeArea: (request, response, next) => {
    if (request.body) {
      const token = request.body.token;
      checkLoginStatus({token})
        .then(res => {
          if (res.isLoggedIn) {
            const id = request.body.area.id;
            Database.RemoveArea(id)
              .then(res => {
                if (res) {
                  response.send(200, {
                    success: true,
                    message: 'RemoveArea is OK.',
                  });
                }
              })
              .catch(err => {
                response.send(500, err);
              });
          } else {
            response.send(200, {
              success: false,
              message: 'You are not logged in.',
            });
          }
        })
        .catch(err => {
          response.send(500, {
            message: err,
          });
        });
    }
  },
};

export default Areas;

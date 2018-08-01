import Database from '../common/database';
import {checkLoginStatus, normalizeUpdateData} from '../common/utility'
import {gameKeys} from '../config/constants'

const Games = {
  getGame: (request, response, next) => {
    if (request.body) {
      const id = request.body.id;
      Database.GetGame(id).then(res => {
        if (res) {
          response.send(200, {
            success: true,
            message: 'GetGame is OK.',
            date: res,
          })
        }
      }).catch(err => {
        response.send(500, err);
      })
    }
  },

  addGame: (request, response, next) => {
    if (request.body) {
      const token = request.body.token;
      checkLoginStatus({token}).then(res => {
        if (res.isLoggedIn) {
          const game = request.body.game;
          const gameArr = Object.keys(game).map(key => game[key])
          Database.AddGame(gameArr).then(res => {
            if (res) {
              response.send(200, {
                success: true,
                message: 'AddGame is OK.',
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

  editGame: (request, response, next) => {
    if (request.body) {
      const token = request.body.token;
      checkLoginStatus({token}).then(res => {
        if (res.isLoggedIn) {
          const game = request.body.game;
          const id = game.id;
          Database.GetGame(id).then(res => {
            if (res) {
              const oldGame = res[0];
              return normalizeUpdateData({
                oldData: oldGame,
                newData: game,
                keyArr: gameKeys
              });
            }
          }).then((dateArr) => {
            Database.UpdateGame(id, dateArr).then(res => {
              if (res) {
                response.send(200, {
                  success: true,
                  message: 'UpdateGame is OK.'
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

  removeGame: (request, response, next) => {
    if (request.body) {
      const token = request.body.token;
      checkLoginStatus({token}).then(res => {
        if (res.isLoggedIn) {
          const id = request.body.game.id;
          Database.RemoveGame(id).then(res => {
            if (res) {
              response.send(200, {
                success: true,
                message: 'RemoveGame is OK.'
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

export default Games;

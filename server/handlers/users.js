import randomToken from 'random-token';
import Database from '../common/database';

const Users = {
  register: (request, response, next) => {
    if (request.body) {
      const user = request.body;
      const userArr = Object.keys(user).map(key => user[key]);
      Database.Register(userArr).then(res => {
        if (res) {
          response.send(200, {
            success: true,
            message: 'Register is OK.',
            id: res.insertId
          })
        }
      }).catch(err => {
        response.send(500, err);
      })
    }

  },

  login: (request, response, next) => {
    if (request.body) {
      const username = request.body.username;
      Database.Login(username).then(res => {
        if (res) {
          if (res[0]) {
            const password = res[0].password;
            if (password !== request.body.password) {
              response.send(500, {
                success: false,
                message: 'Password is false.'
              });
            } else {
              const token = randomToken(16);
              Database.CreateSession([username, token]).then(res => {
                if (res) {
                  response.send(200, {
                    success: true,
                    message: 'Login OK.',
                    token,
                  });
                }
              });
            }
          } else {
            response.send(500, {
              success: false,
              message: 'User not exist'
            });
          }
        } else {
          response.send(500, {
            success: false,
            message: 'There is some problem with server, please try again later.'
          });
        }
      }).catch(err => {
        response.send(500, err);
      })
    }
  },

  logout: (request, response, next) => {
    if (request.body) {
      const token = request.body.token;
      Database.Logout(token).then(res => {
        if (res) {
          response.send(200, {
            success: true,
            message: 'Logout is OK.'
          });
        }
      }).catch(err => {
        response.send(500, err);
      })
    }
  },
};

export default Users;

import mysql from 'mysql';
import db from '../config/db'

const pool = mysql.createPool(db);

const Database = {
  Register: user => {
    const sql = 'INSERT INTO users (username, password) VALUES (?)';
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        [user],
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  Login: username => {
    const sql = 'SELECT * FROM `users` WHERE `username` = ' + pool.escape(username);
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  Logout: token => {
    const sql = 'DELETE FROM `sessions` WHERE `token` = ' + pool.escape(token);
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  CreateSession: user => {
    const sql = `INSERT INTO sessions (username, token) VALUES (?)`;
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        [user],
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  CheckSession: token => {
    const sql = 'SELECT * FROM `sessions` WHERE `token` = ' + pool.escape(token);
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  GetDates: () => {
    const sql = 'SELECT * FROM `dates`';
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  GetDate: id => {
    const sql = 'SELECT * FROM `dates` WHERE `id` = ' + pool.escape(id);
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  AddDate: date => {
    const sql = 'INSERT INTO dates (date_id, game_date, status) VALUES (?)';
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        [date],
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  UpdateDate: (id, date) => {
    const sql = 'UPDATE dates set date_id = ? , game_date = ? , status = ? WHERE id = ' + pool.escape(id);
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        date,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  RemoveDate: id => {
    const sql = 'DELETE FROM `dates` WHERE `id` = ' + pool.escape(id);
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  GetAreas: () => {
    const sql = 'SELECT * FROM `areas`';
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  GetArea: id => {
    const sql = 'SELECT * FROM `areas` WHERE `area_id` = ' + pool.escape(id);
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  AddArea: area => {
    const sql = 'INSERT INTO areas (area_id, name, code) VALUES (?)';
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        [area],
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  UpdateArea: (id, area) => {
    const sql = 'UPDATE areas set area_id = ? , name = ? , code = ?  WHERE id = ' + pool.escape(id);
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        area,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  RemoveArea: id => {
    const sql = 'DELETE FROM `areas` WHERE `id` = ' + pool.escape(id);
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  GetGames: () => {
    const sql = 'SELECT * FROM `games`';
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  GetGame: id => {
    const sql = 'SELECT * FROM `games` WHERE `game_id` = ' + pool.escape(id);
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  AddGame: game => {
    const sql = 'INSERT INTO games (game_id, date_id, round, time, is_first_home, first_id, third_id, first_scores, third_scores) VALUES (?)';
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        [game],
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  UpdateGame: (id, game) => {
    const sql = 'UPDATE games set game_id = ? , date_id = ? , round = ? , time = ? , is_first_home = ? , first_id = ? , third_id = ? , first_scores = ? , third_scores = ?  WHERE id = ' + pool.escape(id);
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        game,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  RemoveGame: id => {
    const sql = 'DELETE FROM `games` WHERE `game_id` = ' + pool.escape(id);
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  GetPrefectures: () => {
    const sql = 'SELECT * FROM `prefectures`';
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  GetPrefecture: id => {
    const sql = 'SELECT * FROM `prefectures` WHERE `prefecture_id` = ' + pool.escape(id);
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  AddPrefecture: prefecture => {
    const sql = 'INSERT INTO prefectures (prefecture_id, name, area_id, code) VALUES (?)';
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        [prefecture],
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  UpdatePrefecture: (id, prefecture) => {
    const sql = 'UPDATE prefectures set prefecture_id = ? , name = ? , code = ? , area_id = ?  WHERE id = ' + pool.escape(id);
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        prefecture,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  RemovePrefecture: id => {
    const sql = 'DELETE FROM `prefectures` WHERE `prefecture_id` = ' + pool.escape(id);
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  GetSchools: () => {
    const sql = 'SELECT * FROM `schools`';
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  GetSchool: id => {
    const sql = 'SELECT * FROM `schools` WHERE `id` = ' + pool.escape(id);
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  AddSchool: school => {
    const sql = 'INSERT INTO schools (school_id, prefecture_id, name, short_name, is_continual, last_count, total_count, win_count, lose_count, best_result, games) VALUES (?)';
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        [school],
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  UpdateSchool: (id, school) => {
    const sql = 'UPDATE schools set school_id = ? , prefecture_id = ? , name = ? , short_name = ? , is_continual = ? , last_count = ?, total_count = ? , win_count = ? , lose_count = ? , best_result = ? , games = ? WHERE id = ' + pool.escape(id);
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        school,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },

  RemoveSchool: id => {
    const sql = 'DELETE FROM `schools` WHERE `id` = ' + pool.escape(id);
    return new Promise((resolve, reject) => {
      pool.query(
        sql,
        (err, rows, fields) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  },
}

export default Database;

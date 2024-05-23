import sqlite3 from "sqlite3";
const db = new sqlite3.Database("mydatabase.db");

db.run(`CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	age INTEGER NOT NULL
)`);

export default {
  async getUsers() {
    try {
      const users = await new Promise((resolve, reject) => {
        db.all("SELECT * FROM users", [], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });

      return users;
    } catch (err) {
      return null;
    }
  },
  async addUser(user) {
    const lastId = await new Promise((resolve, reject) => {
      db.run("INSERT INTO users (name, age) VALUES (?, ?)", [user.name, user.age], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });

    return { ...user, id: lastId };
  },
  async getUserById(id) {
    const user = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    return user;
  },
  async updateUser(id, updatedData) {
    const changes = await new Promise((resolve, reject) => {
      db.run("UPDATE users SET name = ?, age = ? WHERE id = ?", [updatedData.name, updatedData.age, id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });

    if (changes === 0) {
      return null;
    }

    return this.getUserById(id);
  },
  async deleteUser(id) {
    const changes = await new Promise((resolve, reject) => {
      db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });

    return changes > 0;
  },
};

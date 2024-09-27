const db = require('../config');
const bcrypt = require('bcryptjs');

class User {
  static async register(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      `INSERT INTO users (username, password) VALUES (?, ?)`,
      [username, hashedPassword]
    );
    return result;
  }

  static async login(username, password) {
    const [rows] = await db.query(`SELECT * FROM users WHERE username = ?`, [username]);
    if (rows.length === 0) return null;
    
    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) return null;
    
    return user;
  }
}

module.exports = User;

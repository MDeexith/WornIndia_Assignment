const db = require('../config');

class Train {
  static async addTrain(name, source, destination, totalSeats) {
    const [result] = await db.query(
      `INSERT INTO trains (name, source, destination, totalSeats, availableSeats) VALUES (?, ?, ?, ?, ?)`,
      [name, source, destination, totalSeats, totalSeats]
    );
    return result;
  }

  static async getAvailableTrains(s, d) {
    const [rows] = await db.query(`SELECT * FROM trains WHERE source = ? AND destination = ?`, [s, d]);
    return rows;
  }

  static async getBookingDetails(userId, trainId) {
    const [rows] = await db.query(
      `SELECT * FROM bookings WHERE userId = ? AND trainId = ?`,
      [userId, trainId]
    );
    return rows.length ? rows[0] : null;
  }

  static async bookSeat(trainId, userId) {
    const [rows] = await db.query(`SELECT availableSeats FROM trains WHERE id = ?`, [trainId]);
    const availableSeats = rows[0].availableSeats;
    
    if (availableSeats > 0) {
      await db.query(`UPDATE trains SET availableSeats = availableSeats - 1 WHERE id = ?`, [trainId]);

    await db.query(`INSERT INTO bookings (userId, trainId) VALUES (?, ?)`, [userId, trainId]);
      return true;
    } else {
      return false;
    }
  }
}

module.exports = Train;

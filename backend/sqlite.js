const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

// Crée la table events si elle n’existe pas
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    summary TEXT,
    description TEXT,
    date TEXT,
    images TEXT,
    mainImage TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    summary TEXT,
    description TEXT,
    date TEXT,
    images TEXT,
    mainImage TEXT
  )`);
});

module.exports = db;

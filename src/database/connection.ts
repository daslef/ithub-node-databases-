import path from "node:path";
import sqlite3 from "sqlite3";

export default function getDbConnection() {
	/**
	 *  https://github.com/TryGhost/node-sqlite3/wiki/API
	 */
	try {
		const dbFile = process.env.DB_FILE;
		if (!dbFile) {
			throw new Error("Couldn't find DB_FILE enviroment variable");
		}
		const dbPath = path.join(import.meta.dirname, "..", dbFile);
		return new sqlite3.Database(dbPath);
	} catch (error) {
		console.log(error);
		throw error;
	}
}

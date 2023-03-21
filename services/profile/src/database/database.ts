/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-use-before-define */

import { Pool } from 'pg';
import Config from '../config/config';

export default class DB {
	private static dbInstance: DB;

	public static client: any;

	public static instance() {
		if (this.dbInstance) {
			return this.dbInstance;
		}

		this.dbInstance = new DB();
		return this.dbInstance;
	}

	public async createPool() {
		const pool = new Pool(Config.database);
		DB.client = await pool.connect();
	}

	public async initialSchema() {
		try {
			await DB.client.query(`
                CREATE TABLE IF NOT EXISTS "signatures" (
                    id SERIAL PRIMARY KEY,
					full_name VARCHAR(255) NOT NULL,
					title VARCHAR(255) NOT NULL,
					company VARCHAR(255) NOT NULL,
					email VARCHAR(255) NOT NULL,
					phone VARCHAR(255) NOT NULL,
					address VARCHAR(255) NOT NULL,
					template_id INTEGER NOT NULL,
					user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE
                );
            `);
			console.log('Signatures table created successfully');
		} catch (error) {
			console.error('Error creating Signatures table: ', error);
		} 
	}
}

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
                CREATE TABLE IF NOT EXISTS "users" (
                    user_id SERIAL PRIMARY KEY,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
					fullname VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                    updated_at TIMESTAMP
                );
            `);
			console.log('User table created successfully');
		} catch (error) {
			console.error('Error creating User table: ', error);
		} 
	}
}

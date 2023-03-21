import DB from '../database/database';

export default class Signatures {
    public static async removeSignature(id: number) {
        await DB.client.query(
			'DELETE FROM signatures WHERE id = $1',
			[id],
		);
    }

	public static async getSignaturesByUserId(userId: number | string) {
		const signaturesResult = await DB.client.query(
			'SELECT * FROM signatures WHERE user_id = $1',
			[userId],
		);

		return signaturesResult.rows;
	}

	public static async getSignatureById(id: number | string) {
		const signatureResult = await DB.client.query(
			'SELECT * FROM signatures WHERE id = $1',
			[id],
		);

		return signatureResult.rows[0];
	}

	public static async save(
		full_name: string,
		title: string,
		company: string,
		email: string,
		phone: string,
		address: string,
		template_id: number,
		user_id: any,
        render: string
	) { 
		try {
			await DB.client.query('BEGIN');
			await DB.client.query(
				`INSERT INTO signatures(full_name,title,company,email,phone,address,template_id,user_id,render) 
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
				[
					full_name,
					title,
					company,
					email,
					phone,
					address,
					template_id,
					user_id,
                    render
				],
			);
			await DB.client.query('COMMIT');
		} catch (error) {
			console.error(error.message);
			await DB.client.query('ROLLBACK');
		}
	}
}

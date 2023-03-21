import DB from "../database/database";

export default class Users {
    public static async getUserByEmail(email: string) {
        const userResult = await DB.client.query(
            'SELECT * FROM users WHERE email = $1',
            [email],
        );
        return userResult.rows[0]
    }
}
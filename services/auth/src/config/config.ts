export default class Config {
    public static database = {
        user: process.env.POSTGRES_USER || 'postgres',
        host: process.env.POSTGRES_HOST || 'postgresql',
        database: process.env.POSTGRES_DATABASE || 'mailing',
        password:  process.env.POSTGRES_PASSWORD || 'password',
        port: 5432,
    };

    public static jwtSecret = process.env.JWT_SECRET || 'secret';
}
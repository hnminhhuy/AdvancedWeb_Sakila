import { registerAs } from "@nestjs/config";

export default registerAs('dbconfig', () => ({
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    logging: true,
    synchronize: false, // Set this to false, it makes sure that TypeORM don't modify the existing database.
    entities: ['dist/database/entities/*.js']
}));
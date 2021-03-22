const env = process.env.NODE_ENV || "development";
const uppercaseENV = env.toUpperCase();

if (env === "development" || env === "test") {
    require("dotenv").config();
}

const username = process.env["DB_USERNAME_" + uppercaseENV];
const password = process.env["DB_PASSWORD_" + uppercaseENV];
const database = process.env["DB_NAME_" + uppercaseENV];
const host = process.env["DB_HOST_" + uppercaseENV];
const dialect = process.env["DB_DIALECT_" + uppercaseENV];

module.exports = {
    development: {
        username,
        password,
        database,
        host,
        dialect,
    },
    test: {
        username,
        password,
        database,
        host,
        dialect,
    },
    production: {
        use_env_variable: "DATABASE_URL",
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
    },
};

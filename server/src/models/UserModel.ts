import { pool } from "../config/db";

export class UserModel {

    // Get user by login
    getByLogin = async (login: string) => {

        const query = "SELECT * FROM users WHERE login = ?";

        try {
            const [rows]: any = await pool.promise().query(query, [login]);

            if (rows.length > 0) {
                return rows[0];
            } else {
                return null;
            }
        } catch (err) {
            throw err;
        }

    };

    // Create user
    create = async (name: string, login: string, password: string) => {
        const query = "INSERT INTO users (name, login, password) VALUES (?, ?, ?)";

        const alreadyExists = await this.getByLogin(login);
        if (alreadyExists) return { message: "This login already exists", success: false };

        try {
            const [result]: any = await pool.promise().query(query, [name, login, password]);

            if (result.affectedRows > 0) {
                return { message: "User created", success: true };
            } else {
                return { message: "User not created", success: false };
            }

        } catch (err) {
            throw err;
        }

    };
}
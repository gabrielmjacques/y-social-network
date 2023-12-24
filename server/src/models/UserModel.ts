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

    // Get user by name
    getByName = async (name: string) => {

        const query = "SELECT * FROM users WHERE name = ?";

        try {
            const [rows]: any = await pool.promise().query(query, [name]);

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

        const alreadyLoginExists = await this.getByLogin(login);
        if (alreadyLoginExists) return { message: "This login already exists", success: false };

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

    // Edit user
    edit = async (id: number, name: string, login: string, birthdate: string, bio: string, local: string) => {
        const query = "UPDATE users SET name = ?, login = ?, birthdate = ?, bio = ?, local = ? WHERE id = ?";

        try {
            // Check if login or name already exists
            const alreadyLoginExists = await this.getByLogin(login);
            if (alreadyLoginExists && alreadyLoginExists.id !== id) return { message: "This login already in use", success: false };

            const alreadyNameExists = await this.getByName(name);
            if (alreadyNameExists && alreadyNameExists.id !== id) return { message: "This name already in use", success: false };

            // Update user
            const [result]: any = await pool.promise().query(query, [name, login, birthdate, bio, local, id]);

            // Check if user was updated
            if (result.affectedRows > 0) {
                return { message: "Your profile has been updated successfully!", success: true };
            } else {
                return { message: "An error occurred while updating your profile", success: false };
            }

        } catch (err) {
            throw err;
        }
    };

    uploadAvatar = async (id: number, filePath: string) => {
        const query = "UPDATE users SET avatar = ? WHERE id = ?";

        try {
            const [result]: any = await pool.promise().query(query, [filePath, id]);

            if (result.affectedRows > 0) {
                return { message: "Avatar uploaded successfully!", success: true };
            } else {
                return { message: "An error occurred while uploading your avatar", success: false };
            }

        } catch (err) {
            throw err;
        }
    };

    uploadBanner = async (id: number, filePath: string) => {
        const query = "UPDATE users SET banner = ? WHERE id = ?";

        try {
            const [result]: any = await pool.promise().query(query, [filePath, id]);

            if (result.affectedRows > 0) {
                return { message: "Banner uploaded successfully!", success: true };
            } else {
                return { message: "An error occurred while uploading your banner", success: false };
            }

        } catch (err) {
            throw err;
        }
    };
};
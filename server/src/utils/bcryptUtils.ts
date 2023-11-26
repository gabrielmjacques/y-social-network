import bcrypt from "bcrypt";

export = {

    hashPassword: async (password: string) => {
        return bcrypt.hash(password, 10);
    },

    comparePassword: async (password: string, hash: string) => {
        return bcrypt.compare(password, hash);
    }

};
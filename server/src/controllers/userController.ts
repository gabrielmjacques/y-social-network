import { Request } from "express";
import { IUser } from "../interfaces/IUser";
import { UserModel } from "../models/UserModel";
import bcryptUtils from "../utils/bcryptUtils";

const userModel: UserModel = new UserModel();

export = {

    newUser: async (req: Request, res: any) => {
        const name: string = req.body.name;
        const login: string = req.body.login;
        const password: string = req.body.password;

        const hashedPassword = await bcryptUtils.hashPassword(password);

        const result = await userModel.create(name, login, hashedPassword);
        res.status(200).json(result);
    },



};
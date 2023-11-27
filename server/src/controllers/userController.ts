import { Request } from "express";
import { IUser } from "../interfaces/IUser";
import { UserModel } from "../models/UserModel";
import bcryptUtils from "../utils/bcryptUtils";
import statusCodes from "../utils/statusCodes";

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

    login: async (req: Request, res: any) => {
        const login: string = req.body.login;
        const password: string = req.body.password;

        const user: IUser | null = await userModel.getByLogin(login);

        if (!user) {
            res.status(statusCodes.UNAUTHORIZED).json({ res: "Incorrect login or password", success: false });

        } else {

            const isPasswordCorrect = await bcryptUtils.comparePassword(password, user.password);

            if (!isPasswordCorrect)
                res.status(statusCodes.UNAUTHORIZED).json({ res: "Incorrect login or password", success: false });
            else
                res.status(statusCodes.OK).json({ res: user, success: true });

        }
    }

};
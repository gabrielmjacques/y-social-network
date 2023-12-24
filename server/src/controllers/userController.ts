import { Request, Response } from "express";
import { IUser } from "../interfaces/IUser";
import { UserModel } from "../models/UserModel";
import bcryptUtils from "../utils/bcryptUtils";
import statusCodes from "../utils/statusCodes";
import sizeOf from "image-size";
import path from "path";
import fs from "fs";

const userModel: UserModel = new UserModel();

export = {
    // Create a new user
    newUser: async (req: Request, res: any) => {
        const name: string = req.body.name;
        const login: string = req.body.login;
        const password: string = req.body.password;

        const hashedPassword = await bcryptUtils.hashPassword(password);

        const result = await userModel.create(name, login, hashedPassword);
        res.status(200).json(result);
    },

    // Login a user
    login: async (req: Request, res: Response) => {
        const login: string = req.body.login;
        const password: string = req.body.password;

        let user: IUser | null = await userModel.getByLogin(login);

        if (!user) {
            res.status(statusCodes.UNAUTHORIZED).json({ res: "Incorrect login or password", success: false });

        } else {

            const isPasswordCorrect = await bcryptUtils.comparePassword(password, user.password);

            if (!isPasswordCorrect) {
                res.status(statusCodes.UNAUTHORIZED).json({ res: "Incorrect login or password", success: false });
            } else {
                user.password = "";
                res.status(statusCodes.OK).json({ res: user, success: true });
            }
        }
    },

    // Get user by login
    getUserByLogin: async (req: Request, res: any) => {
        const login: string = req.params.login;

        const user: IUser | null = await userModel.getByLogin(login);

        if (!user) {
            res.status(statusCodes.NOT_FOUND).json({ message: "User not found", success: false });

        } else {
            if (fs.existsSync(user.avatar)) {
                const avatar = fs.readFileSync(user.avatar);
                user.avatar = avatar;
            }

            if (fs.existsSync(user.banner)) {
                const banner = fs.readFileSync(user.banner);
                user.banner = banner;
            }

            user.password = "";

            res.status(statusCodes.OK).json({ user: user, success: true });
        }
    },

    // Edit user
    editUser: async (req: Request, res: any) => {
        const id: number = parseInt(req.params.id);
        const name: string = req.body.name;
        const login: string = req.body.login;
        const birthdate: string = req.body.birthdate;
        const bio: string = req.body.bio;
        const local: string = req.body.local;

        const result = await userModel.edit(id, name, login, birthdate, bio, local);

        res.status(200).json(result);
    },

    // Upload avatar of user
    uploadAvatar: async (req: Request, res: any) => {
        const file = req.file;

        // Check file proportion
        const fileProps = sizeOf(file!.buffer);
        const proportion = fileProps.width! / fileProps.height!;
        const requiredProportion = 1;
        const tolerance = 0.4;

        if (Math.abs(proportion - requiredProportion) > tolerance)
            return res.status(400).json({ message: "Invalid image proportion!", success: false });
        // ----------------------------

        const id: number = parseInt(req.params.id);
        const destination = path.join(__dirname, `../../storage/users/${id}/avatar`);

        // Create the directory if it doesn't exist
        if (!fs.existsSync(destination))
            fs.mkdirSync(destination, { recursive: true });

        // Check if file is present
        if (!file) {
            return res.status(400).json({ message: "Please upload a file", success: false });
        }

        // Writing file to disk
        const filePath = path.join(destination, `avatar${path.extname(file.originalname)}`);
        fs.writeFileSync(filePath, file.buffer);

        // Inserting avatar path into database
        await userModel.uploadAvatar(id, filePath);

        res.status(200).json({ message: "Avatar uploaded successfully!", success: true });
    },

    // Upload banner of user
    uploadBanner: async (req: Request, res: any) => {
        const file = req.file;

        // Check file proportion
        const fileProps = sizeOf(file!.buffer);
        const proportion = fileProps.width! / fileProps.height!;
        const requiredProportion = 2;
        const tolerance = 0.4;

        if (Math.abs(proportion - requiredProportion) > tolerance)
            return res.status(400).json({ message: "Invalid image proportion!", success: false });
        // ----------------------------

        const id: number = parseInt(req.params.id);
        const destination = path.join(__dirname, `../../storage/users/${id}/banner`);

        // Create the directory if it doesn't exist
        if (!fs.existsSync(destination))
            fs.mkdirSync(destination, { recursive: true });

        // Check if file is present
        if (!file) {
            return res.status(400).json({ message: "Please upload a file", success: false });
        }

        // Writing file to disk
        const filePath = path.join(destination, `banner${path.extname(file.originalname)}`);
        fs.writeFileSync(filePath, file.buffer);

        // Inserting banner path into database
        await userModel.uploadBanner(id, filePath);

        res.status(200).json({ message: "Banner uploaded successfully", success: true });
    }
};

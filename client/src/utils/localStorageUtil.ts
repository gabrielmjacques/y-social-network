import IUser from "../interfaces/IUser";

export const fromLocalStorage = {
    get: {
        user: (): IUser => {
            const user = localStorage.getItem("user");
            return user ? JSON.parse(user) : null;
        }
    },

    set: {
        /**
         * 
         * @param user User object automatically stringified
         */
        user: (user: IUser): void => {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }
};
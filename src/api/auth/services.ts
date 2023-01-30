import userSchema from "../user/model";
import jwt from "jsonwebtoken";
import config from "../../config";

export default {
    async findUser(email:string){
        return await userSchema.findOne({
            email
        });
    },

    async createTokens(user:object){

        const accessToken = jwt.sign(user, config.server.jwt as string, {
            expiresIn: config.server.accessTokenExpiration as string
        });

        const refreshToken = jwt.sign(user, config.server.jwt as string, {
            expiresIn: config.server.refreshTokenExpirtaion as string
        });

       return { accessToken };
    }
}

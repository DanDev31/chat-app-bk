import { config } from "dotenv";

config();

export default {
    server:{
        port:process.env.PORT,
        jwt:process.env.JWT_SECRET,
        accessTokenExpiration:process.env.ACCESS_TOKEN_EXPIRATION,
        refreshTokenExpirtaion:process.env.REFRESH_TOKEN_EXPIRATION
    }
}
import bcrypt from "bcrypt";


export const hashPassword = async(password:string) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export const ValidatePassword = async(userPass:string, hashedPass:string) => {
    return await bcrypt.compare(userPass, hashedPass);
}

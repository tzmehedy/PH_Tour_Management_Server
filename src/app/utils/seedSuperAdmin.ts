import { envVars } from "../config/env"
import { IAuthProvider, IRole, IUser } from "../modules/user/user.interface";
import { USER } from "../modules/user/user.model"
import bcrypt from "bcryptjs"


export const seedSuperAdmin = async() =>{
    try {
        const isSuperAdminExist = await USER.findOne({
          email: envVars.SUPER_ADMIN_EMAIL,
        });

        if(isSuperAdminExist){
            console.log("Super admin already exist")
            return
        }

        console.log("creating super admin...")

        const hashPassword = await bcrypt.hash(envVars.SUPER_ADMIN_PASSWORD,Number(envVars.SALT_COUNT))

        const authProvider:IAuthProvider = {
            provider: "Credentials",
            providerId: envVars.SUPER_ADMIN_EMAIL
            
        }

        const payload: IUser = {
            name: "super admin",
            email: envVars.SUPER_ADMIN_EMAIL,
            password: hashPassword,
            role: IRole.SUPER_ADMIN,
            isVerified: true,
            auths: [authProvider]
        }

        const superAdmin = await USER.create(payload)

        console.log("Successfully created super admin!! \n");
        console.log(superAdmin)
        
        
    } catch (error) {
        console.log(error)
        
    }

}
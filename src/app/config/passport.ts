import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { envVars } from "./env";
import { USER } from "../modules/user/user.model";
import { IRole } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs"

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField:"password"
},async(email:string, password:string, done)=>{
    try {
        const isExistUser = await USER.findOne({ email });
        
        if (!isExistUser) {
          return done("User Does Not Exist!!!");
        }

        if(!isExistUser.isVerified){
            return done("User is not verified")
        }

        const isUserGoogleAuthenticate = isExistUser.auths.some(
          (authsObject) => authsObject.provider === "Google"
        );

        if (isUserGoogleAuthenticate) {
          return done(
            "Your are google authenticate. If you want to login with credentials, then you need to login first through google and set a password to login again through email and password!!!"
          );
        }

        const isPasswordMatch = await bcrypt.compare(
          password as string,
          isExistUser.password as string
        );


        if (!isPasswordMatch) {
          return done("Password Does not match");
        }

        return done(null, isExistUser);
        
    } catch (error) {
        console.log(error)
        done(error)
        
    }

}))

passport.use(new GoogleStrategy({
    clientID: envVars.GOOGLE_CLIENT_ID,
    clientSecret:envVars.GOOGLE_CLIENT_SECRET,
    callbackURL:envVars.GOOGLE_CALLBACK_URL
},async(accessToken:string, refreshToken:string, profile:Profile, done:VerifyCallback)=>{
    try {

        const email = profile.emails?.[0].value

        if(!email){
            return done(null,false,{message:"Email Does not exist!!!"})
        }

        let user = await USER.findOne({email})

        if(!user){
            user = await USER.create({
                email,
                name:profile.displayName,
                photo:profile.photos?.[0].value,
                role: IRole.USER,
                isVerified: true,
                auths: [
                    {
                        provider: "Google",
                        providerId: profile.id
                    }
                ]
            })
        }

        return done(null, user)
        
    } catch (error) {
        return done(error)
        
    }

}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, done: (err: any, id?: unknown) => void) =>{
    done(null, user._id)
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser(async (id: string, done: any) => {
    try {
        const user = await USER.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});
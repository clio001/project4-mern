import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import * as dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

// console.log("jwtOptions", jwtOptions);

const jwtStrategy = new JwtStrategy(jwtOptions, function (jwt_payload, done) {
  User.findById(jwt_payload.sub, function (error, user) {
    console.log("user in passport.js", user);
    if (error) {
      console.log("ERROR when trying to ID in database. (jwtStrategy)");
      return done(error, false);
    }
    if (user) {
      console.log("SUCCESS: User found! (jwtStrategy");
      return done(null, user);
    } else {
      console.log("ERROR: User ID not found. Create new account. (jwtStrategy");
      return done(null, false);
      // Or direct to creating new account
    }
  });
});

const passportConfig = (passport) => {
  passport.use(jwtStrategy);
  console.log(jwtStrategy);
};

export default passportConfig;

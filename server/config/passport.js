import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as dotenv from "dotenv";
import User from "../models/userModel.js";
import passport from "passport";

dotenv.config();

// * Google strategy

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const googleOptions = {
  clientID:
    "655593629376-f7hb6vqfdmjpfef0h7bfcs3ugv51miaj.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:5001/users/google/callback",
};

passport.use(
  new GoogleStrategy(googleOptions, function (accessToken, profile, done) {
    // use profile info (mainly profile id) from google to check if the user is registered in your database
    User.find;
    return done(null, profile);
    /* User.findOrCreate({ googleId: profile.id }, function (err, user) {}); */
  })
);

// * JWT strategy

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

// console.log("jwtOptions", jwtOptions);

const jwtStrategy = new JwtStrategy(jwtOptions, function (jwt_payload, done) {
  User.findById(jwt_payload.sub, function (error, user) {
    console.log("USER: ", user);
    if (error) {
      console.log("ERROR when trying to ID in database. (jwtStrategy)");
      return done(error, false);
    }
    if (user) {
      console.log("SUCCESS: User found! (jwtStrategy)");
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
};

export default passportConfig;

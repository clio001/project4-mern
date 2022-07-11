import passport from "passport";

const jwtAuth = passport.authenticate("jwt", { session: false });

const googleAuth = passport.authenticate("google");

export default jwtAuth;
export { googleAuth };

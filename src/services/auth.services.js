import passport from 'passport';
import LocalStrategy from 'passport-local';
import moment from "moment";
import {Strategy as JWTStrategy, ExtractJwt} from 'passport-jwt';

import User from '../modules/users/user.model';
import constants from '../config/constants';

//Local Stragtegy
const localOptions = {
	usernameField: 'email',
};

const localStrategy = new LocalStrategy(localOptions, async (email,password,done) => {
	try{
		const user = await User.findOne({email});
		if(!user){
			return done(null,false);
		}else if(!user.authenticateUser(password)){
			return done(null,false);
		}
		return done(null,user);
	}catch (e){
		return done(e,false); // error but no user so false
	}
});

//JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: constants.JWT_SECRET,
	expiresIn:  "1h",
};

/*
audience: {
		exp: moment().utc().add({ hours: 6 }).unix(),
	},
*/
const jwtStrategy = new JWTStrategy(jwtOptions, async(payload,done)=>{
	try{
		const user = await User.findById(payload._id);
		if(!user){
			return done(null,false);
		}
		return done(null,user);
	}catch(e){
		return done(e,false);
	}
});

passport.use(localStrategy);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local', {session:false});
export const authJwt = passport.authenticate('jwt', {session:false});

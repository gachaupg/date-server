import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as FacebookStrategy } from "passport-facebook";
import passport from "passport";

const GOOGLE_CLIENT_ID =
  "791771021134-vq27h8kcqjhik4ip8omqld00hiko2l7k.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const GITHUB_CLIENT_ID = "0ced635fca656a7f1154";
const GITHUB_CLIENT_SECRET = "367b385c84ef6b65573a7ae21fc6f78bc9c86b6f";

const FACEBOOK_APP_ID = "1458150278298908";
const FACEBOOK_APP_SECRET = "d224c0837dcfec751fb0590b552db9ec";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

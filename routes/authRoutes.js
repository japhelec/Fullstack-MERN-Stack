const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      //kick in OAuth flow by passport
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"), // passport.authenticate is a middleware, grab code in url and fetch user information
    (req, res) => res.redirect("/surveys")
  );

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout(); // req is processed by app.use so it has logout function
    res.redirect("/");
  });
};

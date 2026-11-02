const jwt = require("jsonwebtoken");
const DBHelper = require("../utils/db-helper");
const logger = require("../utils/logger");
const { SIGN_KEY } = require("../utils/constants");

function requirePageAuth({ adminOnly = false } = {}) {
  return (req, res, next) => {
    const token = req.cookies && req.cookies.novelToken;
    let identity;
    try {
      if (!token) throw new Error("Authentication required");
      identity = jwt.verify(token, SIGN_KEY, { algorithms: ["HS256"] });
    } catch (error) {
      res.redirect(`/login?returnTo=${encodeURIComponent(req.originalUrl)}`);
      return;
    }

    if (!identity.name) {
      res.redirect(`/login?returnTo=${encodeURIComponent(req.originalUrl)}`);
      return;
    }

    DBHelper(
      "SELECT id, email, role FROM user WHERE email = ?",
      (err, results) => {
        if (err) {
          logger.error(err);
          next(err);
          return;
        }
        if (!results.length) {
          res.redirect(`/login?returnTo=${encodeURIComponent(req.originalUrl)}`);
          return;
        }
        if (adminOnly && String(results[0].role || "").toLowerCase() !== "admin") {
          res.status(403).send("Administrator access required");
          return;
        }
        req.currentUser = results[0];
        next();
      },
      [identity.name]
    );
  };
}

module.exports = { requirePageAuth };

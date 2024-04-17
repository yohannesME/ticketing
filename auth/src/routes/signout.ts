import express from "express";

const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  // signout the user by removing the jwt token from the session
  req.session = null;
  res.send({});
});

export { router as signoutRouter };

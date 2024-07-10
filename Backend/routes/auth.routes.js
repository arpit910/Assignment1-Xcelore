const router = require("express").Router();
const { User, validate } = require("../model/user.model.js");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }

    const token = user.generateAuthToken();
    console.log(token);
    console.log(user);
    res.status(200).send({
      token: token,
      user: user,
      role: user.role,
      message: "Logged in Successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("E-mail"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

router.post("/register", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(409).send({ message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User Created Successfully" });
  } catch (error) {
    res.status(501).send({ message: "Internal server error", error });
  }
});

module.exports = router;

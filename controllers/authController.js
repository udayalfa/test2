// const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { loginSchema, registerSchema } = require("../middlewares/schemaValidator");
const User = require("../models/user");

const login = async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { email, password } = value;
  const userExists = await User.findOne({ email });
  if (!userExists) {
    return res.status(400).json({ error: "Your Email is Invalid" });
  }
  const isMatch = password === userExists.password;
  if (!isMatch) {
    return res.status(400).json({ error: "Your Password is Invalid" });
  }
  const userData = {
    id: userExists._id,
    name: userExists.name,
    email: userExists.email,
    role: userExists.role,
  };
  const token = jwt.sign(userData, process.env.SECRET, { expiresIn: "3h" });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });

  return res.status(200).json({
    message: "Login successful",
    user: userData,
  });
};

const register = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const { email, name, password } = value;
    const user = new User({ name, email, password });
    await user.save();
    const userData = {
      id: user._id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(userData, process.env.SECRET, { expiresIn: "3h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: userData,
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

const verify = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = decoded;
    return res.status(200).json({ success: true, user: decoded });
  });
};

module.exports = {
  login,
  register,
  logout,
  verify,
};

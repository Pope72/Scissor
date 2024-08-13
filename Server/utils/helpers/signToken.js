import JWT from "jsonwebtoken";
const SignToken = async (id, hashedPassword, res) => {
  const refreshToken = JWT.sign(
    {
      data1: id,
      data2: hashedPassword,
    },
    process.env.JWTSECRET,
    { expiresIn: 6048000 }
  );
  const accessToken = JWT.sign(
    { data1: id, data2: hashedPassword },
    process.env.JWTSECRET,
    { expiresIn: 60 * 1000 }
  );
  res.cookie("RefreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: "true",
    maxAge: 6048000,
  });
  res.cookie("AccessToken", accessToken, {
    httpOnly: true,
    sameSite: "none",
    secure: "true",
    maxAge: 60 * 1000,
  });
};
export default SignToken;

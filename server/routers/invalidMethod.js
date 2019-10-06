const invalidMethod = (req, res, next) => {
  res.status(405).send({ msg: "Invalid Method" });
};

module.exports = invalidMethod;

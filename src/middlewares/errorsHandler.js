/* eslint-disable no-unused-vars */
const errorsHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  return res.status(statusCode).send({
    message: statusCode === 500 ? 'Server responded with an error' : message,
  });
};

module.exports = {
  errorsHandler,
};

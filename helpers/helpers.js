const tryCatchWrapper = (enpointFn) => {
  return async (req, res, next) => {
    try {
      await enpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};

const throwError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

module.exports = {
  tryCatchWrapper,
  throwError,
};

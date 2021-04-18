exports.register = (req, res, next) => {
  const { email, password } = req.body;

  const validationErrors = [];
  // Validate the input fields
  if (!email) {
    // Define the shape of error object
    // for the whole application
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "email",
      message: "You must provide an email address",
    });
  }

  const isEmailValid = validateEmail(email);
  if (email && !isEmailValid) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "email",
      message: "Email is not valid",
    });
  }

  if (!password) {
    validationErrors.push({
      code: "VALIDATION_ERROR",
      field: "password",
      message: "You must provide a password",
    });
  }

  if (validationErrors.length) {
    const errorObject = {
      error: true,
      errors: validationErrors,
    };
    res.send(errorObject);
    return;
  }
};

exports.login = (req, res, next) => {};

exports.logout = (req, res, next) => {};

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

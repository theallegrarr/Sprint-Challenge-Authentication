const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  }
  const options = {
    expiresIn: '1d',
  }
  const result = jwt.sign(
    payload,
    'secret key',
    options
  )

  return result;
}

module.exports = generateToken;
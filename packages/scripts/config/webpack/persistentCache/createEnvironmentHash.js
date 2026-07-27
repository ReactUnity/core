const { createHash } = require('node:crypto');

module.exports = (env) => {
  const hash = createHash('md5');
  hash.update(JSON.stringify(env));

  return hash.digest('hex');
};

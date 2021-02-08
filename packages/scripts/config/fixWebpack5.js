const replace = require('replace-in-file');

const fixFormatWebpackMessages = async () => {
  try {
    const results = await replace({
      files: 'node_modules/react-dev-utils/formatWebpackMessages.js',
      from: `let lines = message.split('\\n');`,
      to: `let lines = [];

  if (typeof message === 'string' || message instanceof String) {
    lines = message.split('\\n');
  } else if ('message' in Object.keys(message)) {
    lines = message['message'].split('\\n');
  }`,
    });

  } catch (e) {
    console.log('error while trying to fix  "formatWebpackMessages.js"', e);
  }
};

fixFormatWebpackMessages();

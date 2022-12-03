const fs = require('fs');
const path = require('path');

const getData = (customPath, options) => {
	return fs.readFileSync(path.resolve(`${customPath}`), options);
};

module.exports = {
	getData,
};

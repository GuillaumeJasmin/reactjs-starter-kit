const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

/* global global, window, document */
enzyme.configure({ adapter: new Adapter() });

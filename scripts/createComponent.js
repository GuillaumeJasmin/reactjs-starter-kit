function ucfirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function template(str, data) {
  const matched = str.match(/{{(.+?)}}/g);

  if (!matched) return str;

  let output = str;

  for (let i = 0; i < matched.length; i += 1) {
    const match = matched[i];
    const key = match.replace('{{', '').replace('}}', '').trim();

    const res = data[key];

    if (res !== undefined) {
      output = output.replace(match, res);
    }
  }

  return output;
}

const fs = require('fs');

const args = process.argv;

// create folder
let componentLocalPath = args[3];

if (componentLocalPath.startsWith('/')) {
  componentLocalPath = componentLocalPath.slice(1);
}

const componentLocalPathArr = componentLocalPath.split('/').map(item => ucfirst(item));
const componentName = componentLocalPathArr[componentLocalPathArr.length - 1];

componentLocalPath = componentLocalPathArr.join('/');

const folderName = args[2];

const componentsPath = `./src/${folderName}/`;
const path = componentsPath + componentLocalPath;

fs.mkdirSync(path);


function createFile(extension) {
  const templateStr = fs.readFileSync(`./scripts/templates/Component.${extension}`, 'utf-8');

  // create .jsx
  fs.writeFileSync(`${path}/${componentName}.${extension}`, template(templateStr, { componentName }));
}

createFile('jsx');
createFile('css');
// createFile('md');

// create index.js
const templateStrIndex = fs.readFileSync('./scripts/templates/index.js', 'utf-8');
fs.writeFileSync(`${path}/index.js`, template(templateStrIndex, { componentName }));

const fs = require('fs');

const args = process.argv;

const ucfirst = str => str.charAt(0).toUpperCase() + str.slice(1);

const template = (str, data) => {
  const matched = str.match(/{{(.+?)}}/g);
  if (!matched) return str;
  let output = str;
  matched.forEach((match) => {
    const key = match.replace('{{', '').replace('}}', '').trim();
    const res = data[key];
    if (res !== undefined) {
      output = output.replace(match, res);
    }
  });

  return output;
};

const recurseCreateTemplatesFiles = (basePath, destPath, data) => {
  fs.readdirSync(`${basePath}`).forEach((fileName) => {
    const fileDestPath = `${destPath}/${fileName}`;
    const fileSrcPath = `${basePath}/${fileName}`;
    const statFile = fs.statSync(fileSrcPath);
    if (statFile.isDirectory()) {
      fs.mkdirSync(template(fileDestPath, data));
      recurseCreateTemplatesFiles(`${basePath}/${fileName}`, fileDestPath, data);
    } else {
      const templateContent = fs.readFileSync(fileSrcPath, 'utf-8');
      fs.writeFileSync(template(fileDestPath, data), template(templateContent, data));
    }
  });
};

const init = () => {
  // components, containers or pages
  const componentType = args[2];
  let componentLocalPath = args[3];

  // remove first char slash
  if (componentLocalPath.startsWith('/')) {
    componentLocalPath = componentLocalPath.slice(1);
  }

  // ucfirst
  const componentLocalPathArr = componentLocalPath.split('/').map(item => ucfirst(item));
  componentLocalPath = componentLocalPathArr.join('/');

  // get component name
  const componentName = componentLocalPathArr[componentLocalPathArr.length - 1];

  const componentTypePath = `./app/${componentType}/`;
  const destPath = componentTypePath + componentLocalPath;
  const data = { componentName };

  fs.mkdirSync(destPath);

  recurseCreateTemplatesFiles(`./scripts/templates/${componentType}`, destPath, data);
};

init();

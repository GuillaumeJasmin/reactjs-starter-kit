Env settings outside repository
---

### Motivation
We often need to store env settings outside the repository, because the app can be deploy on different domains, development, preproduction, production, etc. This settings must be apply independantly of the build process. To do that, we can store the settings on the `window` objet, and include a external js file, even after the build.

**Use case example**: you build your app, and you want to deploy it on preproduction server first, and then on production server, without rebuild it. The app do not need to be rebuild, but the settings of each domain are differents.

### Config
1. install `html-webpack-include-assets-plugin`:
  ```bash
  npm install html-webpack-include-assets-plugin --save-dev
  ```

2. In `webpack.config.js`:
  * import the package
    ```js
    const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
    ```

  * add the plugin to your `webpack.config.js`
    ```js
    const config = {
      plugings: [
        ...
        new HtmlWebpackIncludeAssetsPlugin({ assets: ['env.js'], append: false })
      ]
    }
    ...
    module.exports = config;
    ```

3. Create `env.js` local file with window var:
  ```js
  window.PROJECT_ENV = {
    apiURL: 'http://api.site.com'
  };
  ```

4. Add `env.js` in your `.gitignore`

5. When you will deploy your app, don't forget to create a `env.js` file and place it in the `build` directory, a the same level of your index.html

Then, you can access to `window.PROJECT_ENV.apiURL` in you app. But I recommand you an additionnal step. Create a settings file:

settings.js
```js
const settings = {
  env: Object.freeze(window.PROJECT_ENV), // avoid someone to override the settings in the browser console
};

export default settings;
```

in your component:
```js
import settings from 'path/to/settings.js';
console.log(settings.env.apiURL);
```

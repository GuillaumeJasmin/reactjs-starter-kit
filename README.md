ReactJS Starter Kit
===================

* React 16
* React Router 4
* Webpack 4
* ESLint with Airbnb rules
* CSS Modules
* PostCSS
  * autoprefixer
  * nested css

# Build

### install dependencies
```yarn install```

### start local (watch)
```yarn start```

### build dev
```yarn build:dev```

### build prod
```yarn build```

# Env settings

You often need to have settings store outside the repository, like api url, etc. Simply add it on the global `window` var in a separate js file.
It usefull when you want to deploy your app on multiple domain (development, preproduction, production) without hardcode the settings in the git repository. 
To enable that:
1.  rename `env.example.js` to `env.js`, and store your env variable here, in `PROJECT_ENV` key.
2.  uncomment the following lines in webpack.config.js (line 9 and 34):
  ```js
  const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
  ```
  ```js
  plugins.push(new HtmlWebpackIncludeAssetsPlugin({ assets: ['env.js'], append: false }));
  ```
3.  import settings and use `env` in your component
  ```js
  import settings from 'core/settings';
  console.log(settings.env);
  ```


*** Note: if you want to change the env var name on `window`, rename it in [src/core/settings](./src/core/settings/index.js) ***


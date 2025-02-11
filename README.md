## Premise
This package is made to understand / verify the declaring a dependency on a vite built project from a package that is built with webpack.
This package has the following set up:
- A consuming package that is built with webpack, named "webpack-project"
- A library package that is built with vite, named "vite-project". This package is consumed by webpack-project. 
- vite-project also provides some static assets that is made available to the consuming package in its node_modules subfolder. It is up to the consuming package to rellocate these assets for the final build.

To test it end to end:
- The function `printFileContent` is defined in vite-project and made available to be called by the consuming package.
- In the consuming package, this function is called with path to an asset that is made available by vite-project. 
- cd into `webpack-project` and run `npm run build`.
- Run the bundled js file via `node dist/index.js` and observe that stdout is printing out the content of the aforementioned static file provided by vite-project.

## Note worthy points (that are new to me)
**Before you build**:
- Remove from webpack project `dist/`, `node_modules/`, and `package-lock.json`. 

### webpack project set up
This is the consuming package (i.e. flare) and it has the following responsibilities: 
- Declare dependencies on the vite package.
- Construct a folder for distribution. This includes moving the necessary assets. 
- Produce a single bundled js files.

#### Moving relevant files for distribution
Though these static assets originated from the dependency (i.e. vite-project), it is still the responsibility of the consuming package to move it to an appropriate location. This is done in `webpack.config.js`:
```js
{
    test: /[\\/]node_modules[\\/]vite-project[\\/]dist[\\/]some_file$/,
    use: {
        loader: 'file-loader',
        options: {
            name: '[name]',
            outputPath: 'assets/'
        }
    }
}
```

Because webpack also "shakes" away dependencies that are not needed, you would need to make sure you make an explicit reference to this file:
```js
import 'vite-project/some_file';
```
### vite project set up
This is the library package (i.e. vector lib) and it has the following responsibilities:
- Produce a cjs file to be consumed. 
- Exports relevant static assets to the consuming packge (which would then need to be referenced by the consuming package's build logic).

#### Simulating normal dependency declaration
To simulate a normal project building between a package and its dependencies where the dependencies output is downloaded from a registry (such as npm) and into the consuming package's `node_modules`, the following happens during building of the webpack package:
- Building of the vite project
- `npm pack` to collect all the exported artifacts
- And to supplement all of this, the way the dependency of this vite package is declared in the webpack package is via `file:../vite-project/vite-project-0.0.0.tgz`

#### Properly exporting assets
Formally declare an intent to export the static assets in `package.json`:
```json
  "exports": {
    ".": {
      "types": "./dist/types/my-lib.d.ts",
      "import": "./dist/my-lib.js",
      "require": "./dist/my-lib.umd.cjs"
    },
    "./some_file": "./dist/some_file"
  },
```
Note that vite advises users to place static assets in `root/public/` (see [doc](https://vite.dev/guide/assets.html#the-public-directory)).
Files in this directory will be copied to `dist/` as is (this would save us from having to write a bunch of config using `viteStaticCopy` in vite config).

# Plasmic codegen into HTML with Vite

## Summary

This repo allows you to build component in Plasmic, sync their source code to the project, and bundle them for usage in plain HTML pages.

The configuration in this repo allows you to register custom code components, use them in Plasmic studio and have them be part of your bundled final components, letting you use Plasmic as a component design tool for parts of Plain HTML pages, with it's full power available

## Why not use Plasmic's built-in methods for rendering components into HTML pages?

Plasmic has other methods for rendering designs into html pages using javascript, however these cannot include custom code components that you've registered in Plasmic, so is not appropriate for some use-cases.

## Overview
`./src/main.tsx` is the entry point for the Vite build.

It imports React components and attaches them to the browser window.

WHen you run `npm run build`, Vite (using library mode as per `vite.config.ts`) vite will:
1. Bundle components with all necessary dependencies into a single file called `customComponents.js`
2. Add Javascript code that inserts `<style>` tags into your HTML document's `<head>` tag with the necessary CSS imported by your components

If you follow the setup instructions, the `dist` folder is auto-deployed to Netlify, so you can load it into external HTML projects easily.

Loading the `customComponents.js` file into your HTML page will make the components available to use in your HTML. See `./test.html` for example of loading.

## How to use

### Basic setup:
1. Clone this repo
2. Update the package name in `package.json` to whatever you want
3. Run `npm install` to install dependencies
4. Run `npm run build` to build the project for the first time, using example components already defined
5. Open `./test.html` in your browser (using VS code live server or directly from the file system). You should see a page with a black "Hello" `<h2>` tag and then smaller pink text "Hello Peter" below it. This means that the basic setup is working and bundling react components for rendering in plain HTML pages.

### Configuring Plasmic: 
(Based on [Plasmic codegen docs](https://docs.plasmic.app/learn/codegen-guide/#install-the-plasmic-cli))
1. Make sure you have the plasmic CLI installed globally first:
```bash
npm install -g @plasmicapp/cli
```
2. Authenticate to plasmic:
```bash
plasmic auth
```
3. Create a new Plasmic project using Plasmic studio
4. Get the project ID from the URL of the project in Plasmic studio
5. Sync your project down to the project `./src/components` folder:
```bash
plasmic sync -p YOUR_PROJECT_ID
```
6. Accept all the default choices during the sync process

### Syncing updated components from Plasmic after initial Plasmic setup
1. At any time, run `plasmic sync` in terminal. This syncs the latest components from Plasmic to your project

### Configuring your Plasmic app to use this repo as it's custom app host
This is only required if you want to register custom code components for use in Plasmic studio, for eventual bundling for use in plain html pages
1. Start your dev server via `npm run dev`
2. In your browser navigate to [http://localhost:5173/plasmic-host](http://localhost:5173/plasmic-host). You should see a page titled `Your app is ready to host in Plasmic Studio!`
3. In Plasmic studio, [configure your custom app host](https://docs.plasmic.app/learn/app-hosting/#3-set-your-plasmic-project-to-use-your-app-host) to point to `http://localhost:5173/plasmic-host`
4. If Plasmic studio still loads, then it works!

### Registering custom components for use in Plasmic studio:
1. Add your components eg in `./src/components/codeComponents` folder. 
  * Follow the example format where each component has:
    * it's own folder
    * an `index.tsx` entry-point that exports a React component
    * a `registerComponentMeta` file that exports a plasmic code component registration object. y
    * optionally: `.css` or `.module.css` styles imported into `index.tsx`
2. Register the component for use in Plasmic studio following the example in `./src/plasmic-host.tsx`
3. Make sure your dev server is running via `npm run dev`
4. Load Plasmic studio. You should see any custom code components registered there.
5. Now you can build your components in Plasmic studio (including making use of your code components) until you're happy with them!

### Development workflow
1. Build your components either directly in React and/or in Plasmic studio
2. Run `plasmic sync` to sync the latest components from Plasmic to your project
3. Import your components into `./src/main.tsx` and attach them to the browser window using the example code there. Configure as needed. 
  * Note: if using entire components or pages from Plasmic, it's usually best to import the component that is auto-generated by Plasmic in root `./src/components` folder, rather than the raw component that Plasmic generates in `./src/components/plasmic`.
4. To test:
  * Run `npm run build` to build the project
  * Make sure the bundled components are imported into `./test.html` and that the `<script>` tag in the body of the document renders the custom components you want to test (see example code in `./test.html`)
  * Open `test.html` in the browser (direct from filesystem or using VS Code live server). If your component loads into that html page, it works!

### Configuring Netlify deployment
1. Make sure this project is deploying to a github repo
2. Create a new Netlify site and connect it to your gitub repo. Because of the configuration in `netlify.toml` it should automatically deploy the `dist` folder to Netlify every time you push to the main branch of github

### Deployment
1. Ensure the Netlify setup above is completed
2. Make sure everything is working in `test.html` (see above Developement workflow)
3. Push your changes to the main branch of your github repo
4. Wait for netlify to deploy the changes. (Netlify should build automatically as it deploys)
5. The contents of the `dist` folder should now be available at your Netlify site URL
6. Import the bundled JS file to wherever you need from your Netlify url eg `https://your-site.netlify.app/customComponent.js`


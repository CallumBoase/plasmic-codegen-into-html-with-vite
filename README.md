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

Basic setup:
1. Clone this repo
2. Update the package name in `package.json` to whatever you want
3. Run `npm install` to install dependencies
4. Run `npm run build` to build the project for the first time, using example components already defined
5. Open `./test.html` in your browser (using VS code live server or directly from the file system). You should see a page with a black "Hello" `<h2>` tag and then smaller pink text "Hello Peter" below it. This means that the basic setup is working and bundling react components for rendering in plain HTML pages.

Configuring Plasmic: 
1. Create a new Plasmic project
2. 


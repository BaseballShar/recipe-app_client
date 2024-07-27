# Overview
This is the frontend of the recipe-app, it uses Vite + React.

# Dependencies
- axios: Sane defaults for making http request
- react-cookie: Easily manages cookies
- react-router-dom: Manages routes in a single page application

# Project Structure
All react related code is located under the /src directory

## The src/components directory
It contains components that are used across pages in this application.
- Navbar.jsx: Represents the navigation bar component used to switch between pages.

## The src/pages directory
It contains pages that forms the application.
- Auth.jsx: Handles login and authentication
- CreateRecipe.jsx: Creates recipes
- Home.jsx: Displays all recipes
- SavedRecipes.jsx: Displays saved recipes

# Hosting
This frontend is hosted locally in port 3000. The port number can be changed via modifying the server.port configuration in vite.config.js

# Quick Start
1. Open your favourite terminal emulator
2. Clone this repo via `git clone https://github.com/BaseballShar/recipe-app_client`
3. Run `yarn` to install dependencies
4. Run `yarn dev` and visit `localhost:3000`

# Related Resources
The backend of this client can be found at [BaseballShar/recipe-app_server](https://github.com/BaseballShar/recipe-app_server)

# Credits
This project is inspired by the tutorial [MERN Recipe App With Authentication - PedroTech](https://www.youtube.com/watch?v=P43DW3HUUH8). However, I have made improvements to the code quality and continued developing the application beyond the video.

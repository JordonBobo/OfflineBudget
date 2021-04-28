# OfflineBudget

![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)

### Table of Contents
1. [Description](#description)
2. [How to Install](#how-to-install)
3. [Usage](#usage)
4. [Contribution Guidelines](#contribution-guidelines)
5. [Test Instructions](#test-instructions)
6. [License](#license)
7. [Questions?](#Questions?)

### Description
This is an App the allows the user to add and subtract money from their budget in order to chart their expenses and incomes. The app was specifically designed to work online and offline. Any amounts added or subtracted from the app while offline will be stored locally until a network connection is restored and then all data put into the app while offline will be pushed to the database in Heroku. This was achieved using a service-worker to cache the app so that it will continue to render the page and accept input from the user. It also uses the IndexedDB feature of many browsers to temporarily store input from the user while offline.

Deployed location:  [Heroku](https://pure-beyond-85092.herokuapp.com/).

GitHub Repo location: [GitHub](https://github.com/JordonBobo/OfflineBudget).

![screenshot](/public/screenshot1.JPG)

### How to Install
After forking the repo to your computer, make sure to install the required packages with `npm i` in the terminal. 

### Usage
Once the npm packages are installed, run the app with `node server.js`. 

### Contribution Guidelines
This project was made by Jordon Bobo.

### Test Instructions
There is not a testing module on this project. 

### License
This repo is under the MIT license.

### Questions?
Feel free to reach out with questions.

[https://www.github.com/JordonBobo](https://www.github.com/JordonBobo)


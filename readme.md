# Quotes App
This app allows searching and saving of interesting quotes from interesting people. The **why** and the **how** are explained in this [blog post](http://www.annyhe.com/quotes-app/).

### Video walkthrough 
[![Quote app](http://img.youtube.com/vi/8e7yGb7OFbI/0.jpg)](http://www.youtube.com/watch?v=8e7yGb7OFbI "Quote app")

# Table of Contents

- [Technology Used](#technology-used)
- [Setup in local machine](#setup-in-local-machine)
- [Contribution](#contribution)
- [Questions or feedback?](#questions-or-feedback)

## Technology Used
1. [React Native](https://facebook.github.io/react-native/)
2. [Expo](https://expo.io/@poshdev)

## Setup in local machine
1. If not installed, install [Node.js](https://nodejs.org/en/)

2. On terminal run command `npm i` it will check the app's package.json file and install all libraries

3. `npm start` will start expo and you can run in simulator or your device

## Contribution
To contribute to this project please fork the project and submit a pull request. 

## Questions or feedback

Feel free to open an issue, or find me [@annyhehe on Twitter](https://twitter.com/annyhehe).

## TODO
- add a settings icon, onclick shows modal, modal has button to delete all data
- add export functionality to settings modal
- render something when no results are returned
- add unit tests

## Data model assumption: 
- favorite authors can have quotes
- favorite quotes belong to favorite authors. quotes cannot exist by themselves
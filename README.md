# Project 2 - Vivapal
Welcome to Vivapal, the web app aiming to improve its users health by providing an element of accountability, letting them track their daily habits and see their progress.
  
  
To use Vivapal, Navigate to [Vivapal](https://vivapal.netlify.app/) and create an account or login.
  
## Changelog 🔁
  
### 29/07/2022
 - Finished and delivered presentation
 - Final merges  
  
### 28/07/2022
 - Tested functionality of the server
 - Made final styling decisions for the client side, completed the dark-mode toggle
  
### 27/07/2022
- Added chart in the client that displays the users previous data
- Allows users to add progress to their tracked habits and having this update to the server
- Have the server reset user data at midnight and reset any streaks if the user failed to meet their goal
  
### 26/07/2022
- Connected front-end to back-end to make sure data was being successfully transferred between them
- Deployed front-end on Netlify
- Created and started to style the user dashboard
### 25/07/2022
- Created basic back-end and front-end structure and functionality
- Created index, login, and signup page
- deployed back-end on Heroku
  
  
## Bugs 🪲
- [ ] Currently none discovered 🙏
  
## Wins & Challenges
  
### Wins 🏆
- App interface contains a dark mode button that fully transforms the page to a darker theme.
- Integrated a dynamic chart into the app that reads in the users past habit data and displays this as a stacked bar chart.
- User data is successfully stored and retrievable in a NoSQL database and all sensitive user data is fully encrypted.
  
### Challenges ⛳
- Creating an interface fully adaptable to different user data specifically between users with a different number of habits being tracked.
- Testing the application, specifically interactions between the server and the database and the use of [Mockingoose](https://www.npmjs.com/package/mockingoose) to help with this.
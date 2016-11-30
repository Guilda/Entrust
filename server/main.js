import { Meteor } from 'meteor/meteor';

// import { Circles } from '../collections/circles.js';


Meteor.startup(() => {
  // code to run on server at startup
});


// Generate user initials after Facebook login
Accounts.onCreateUser((options, user) => {
  user.token_balance = 0;

  return user;
});

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.jade';
import { Circles } from '../imports/api/circles.js';

Template.circles.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.circles.helpers({
  circles() { return Circles.find({}); }
});

Template.circles_form.events({
  'submit .new-circle'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const name = target.name.value;
    const description = target.description.value;

    if(!Meteor.userId())
    {
      sAlert.error('You need to sign up before you can create a new circle!');
      return false;
    }

    // Insert a task into the collection
    Circles.insert({
      name: name,
      description: description,
      createdAt: new Date(), // current time

    });

    // Clear form
    target.name.value = '';
    target.description.value = '';
  },
});

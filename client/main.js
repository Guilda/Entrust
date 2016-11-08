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

Template.circles.events({
  'submit .new-circle'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const name = target.name.value;

    console.log(name)

    // Insert a task into the collection
    Circles.insert({
      name: name,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.name.value = '';
  },
});

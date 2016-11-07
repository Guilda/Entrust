import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.jade';

Template.circles.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.circles.helpers({
  circles: [
      {
        name: 'Guilda',
        description: 'Enabling communities through the power of trust'
      },
      {
        name: 'Auckland ethereum developers',
        description: 'Local group of Ethereum developers'
      },
      {
        name: 'The Knife',
        description: 'a Swedish electronic music duo from Gothenburg formed in 1999. The group consisted of siblings Karin Dreijer Andersson and Olof Dreijer, who together also run their own record company, Rabid Records. The group gained a large international following in response to their 2003 album Deep Cuts.'
      },
  ]
});

Template.circles.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});

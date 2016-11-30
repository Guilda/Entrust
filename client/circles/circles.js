import { Template } from 'meteor/templating';

Meteor.subscribe('circles')


Template.circle_show.helpers({
  circleData: function() {
    var circle = Circles.findOne({_id: FlowRouter.getParam('id')});
    return circle;
  }
})
// var id = FlowRouter.getParam('id')
// Circles.findOne({_id: id})

Template.circles.helpers({
  circles: () => {
    return Circles.find({})
  }
})



// Messages
Template.messages.helpers({
    messages: function() {
        return Messages.find({}, { sort: { time: -1}});
    }
});

Template.input.events = {
  'keydown input#message' : function (event) {
    if (event.which == 13) { // 13 is the enter key event
      if (Meteor.user())
        var name = Meteor.user().emails[0].address;
      else
        var name = 'Anonymous';
      var message = document.getElementById('message');
      if (message.value != '') {
        Messages.insert({
          name: name,
          message: message.value,
          time: Date.now(),
        });

        document.getElementById('message').value = '';
        message.value = '';
      }
    }
  }
}

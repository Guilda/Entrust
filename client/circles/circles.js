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

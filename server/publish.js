Meteor.publish('messages')

Meteor.publish('circles', function(){
  return Circles.find({ author: this.user_id })
})


Meteor.publish('singleCircle', function(id){
  check(id, String)
  return Circles.find({_id: id})
})

Circles = new Mongo.Collection('circles');

Circles.allow({
  insert: function(userId, doc){
    
    return !!userId;
  }
});

CircleSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  description: {
    type: String,
    label: "Description"
  },
  author:{
    type: String,
    label: "Author",
    autoValue: function(){
      return this.userId
    },
    autoform: {
      type: "hidden"
    }
  },
  createdAt:{
    type: Date,
    label: "Created At",
    autoValue: function(){
      return new Date()
    },
    autoform: {
      type: "hidden"
    }
  }
})

Circles.attachSchema(CircleSchema);

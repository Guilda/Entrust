
FlowRouter.route('/', {
  name: 'home',
  action: function(params, queryParams) {
    BlazeLayout.render("layout_main", {main: "circles"});
  }
});



FlowRouter.route('/circles/:id', {
  name: 'show_circle',
  action: function(){
    BlazeLayout.render("layout_main", {main: "circle_show"});
  }
});

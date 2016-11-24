
FlowRouter.route('/', {
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {main: "circles"});
  }
});


FlowRouter.route('/circles/:circle_id', {
    action: function(params, queryParams) {
      BlazeLayout.render("mainLayout", {main: "circle_show"});
    }
});

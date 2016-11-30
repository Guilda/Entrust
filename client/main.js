import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// import './main.jade';
// import { Circles } from '../collections/circles.js';

import d3 from 'd3';
import d3_hexbin from 'd3-hexbin';
d3.hexbin = d3_hexbin.hexbin;


Template.layout_main.onRendered( function(){

    //Function to call when you mouseover a node
    function mover(d) {
      var el = d3.select(this)
    		.transition()
    		.duration(10)
    		.style("fill-opacity", 0.3)
        .style("stroke-width", "6px")
    		;
    }

    //Mouseout function
    function mout(d) {
    	var el = d3.select(this)
    	   .transition()
    	   .duration(300)
    	   .style("fill-opacity", 0.0)
         .style("stroke-width", "1px")
    	   ;
    };

    //svg sizes and margins
    var margin = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    var width = d3.select('.map-row').node().getBoundingClientRect().width;
    var height = d3.select('.map-row').node().getBoundingClientRect().height;

    //The number of columns and rows of the heatmap
    var MapColumns = 30,
    	MapRows = 20;

    //The maximum radius the hexagons can have to still fit the screen
    var hexRadius = d3.min([width/((MapColumns + 0.5) * Math.sqrt(3)),
    			height/((MapRows + 1/3) * 0.5)]);

    //Set the new height and width of the SVG based on the max possible
    width = MapColumns*hexRadius*Math.sqrt(3);
    heigth = MapRows*1.5*hexRadius+0.5*hexRadius;

    //Set the hexagon radius
    var hexbin = d3.hexbin()
        	       .radius(hexRadius);

    //Calculate the center positions of each hexagon
    var points = [];
    for (var i = 0; i < MapRows; i++) {
        for (var j = 0; j < MapColumns; j++) {
            points.push([hexRadius * j * 1.75, hexRadius * i * 1.5]);
        }//for j
    }//for i

    //Create SVG element
    var svg = d3.select("#map")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    //Start drawing the hexagons
    svg.append("g")
        .selectAll(".hexagon")
        .data(hexbin(points))
        .enter().append("path")
        .attr("class", "hexagon")
        .attr("d", function (d) {
    		return "M" + d.x + "," + d.y + hexbin.hexagon();
    	})
        .attr("stroke", function (d,i) {
    		return "#000";
    	})
        .attr("stroke-width", "1px")
        .attr("fill-opacity", 0.0)
        .attr("stroke-opacity", 0.4)
    	.on("mouseover", mover)
    	.on("mouseout", mout)
    	;

})

Template.circles.onCreated(function helloOnCreated() {
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

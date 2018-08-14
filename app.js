//data
var data = [
    {
      label: "Development Team Happiness",
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      y: [66, 67, 68, 68, 69, 70, 70, 75, 76, 78]
    },
    {
      label: "Research Team Happiness",
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      y: [80, 80, 85, 90, 90, 90, 89, 89, 92, 91]
    }
  ];

//reformat data
dataset = [];
for (i = 0; i < data[0].x.length; i++) {
  obj = {};
  obj['time'] = i;
  obj['development'] = data[0].y[i];
  obj['research'] = data[1].y[i];
  dataset.push(obj);
};

//Use the margin convention practice 
var margin = {top: 75, right: 300, bottom: 75, left: 300}
, width = window.innerWidth - margin.left - margin.right // Use the window's width 
, height = window.innerHeight - margin.top - margin.bottom - 100; // Use the window's height

//set scale of axes
var xScale = d3.scaleLinear()
  .domain([0, dataset.length-1])
  .range([0, width]);
 
var yScale = d3.scaleLinear()
  .domain([0, 100])
  .range([height, 0]);

//d3's line generator
var line1 = d3.line()
  .x(function(d) { return xScale(d.time); })
  .y(function(d) { return yScale(d.development); })

var line2 = d3.line()
  .x(function(d) { return xScale(d.time); })
  .y(function(d) { return yScale(d.research); }) 

//Add the SVG to the page
var svg = d3.select("#linegraph").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Add title  
svg.append("text")
.attr("x", (width / 2))             
.attr("y", -20)
.attr("text-anchor", "middle")  
.style("text-decoration", "underline")  
.text("Happiness Scores of Development & Research Teams over Time");

//Call the x axis in a group tag
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale));

// text label for the x axis
svg.append("text")             
  .attr("transform",
        "translate(" + (width/2) + " ," + 
                      (height + 40) + ")")
  .style("text-anchor", "middle")
  .text("Time Unit");

//Call the y axis in a group tag
svg.append("g")
  .attr("class", "y axis")
  .text("Happiness Score")
  .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// text label for the y axis
svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -60)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Happiness Score"); 

//Append the path, bind the data, and call the line generator 
svg.append("path")
  .datum(dataset)
  .attr("class", "line1")
  .attr("d", line1);

//Add dots to line graph
svg.selectAll(".dot")
  .data(dataset)
.enter().append("circle")
  .attr("class", "dot1")
  .attr("cx", function(d) { return xScale(d.time) })
  .attr("cy", function(d) { return yScale(d.development) })
  .attr("r", 5);

//label
svg.append("text")
  .attr("y", height - 330)
  .attr("x", width + 20)
  .attr("dy", "1em")
  .text("Development Team");

//Append the path, bind the data, and call the line generator
svg.append("path")
  .datum(dataset)
  .attr("class", "line2")
  .attr("d", line2);

//Add dots to line graph
svg.selectAll(".dot")
  .data(dataset)
.enter().append("circle")
  .attr("class", "dot2")
  .attr("cx", function(d) { return xScale(d.time) })
  .attr("cy", function(d) { return yScale(d.research) })
  .attr("r", 5);

//label
svg.append("text")
  .attr("y", height - 385)
  .attr("x", width + 20)
  .attr("dy", "1em")
  .text("Research Team");

// turns line graph blue  
function turnBlue() {
    svg.selectAll(".line1, .line2")
        .style("stroke", "blue");
    svg.selectAll("circle")
        .style("fill", "blue");
} 
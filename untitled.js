// make my own grager
/*https://stackoverflow.com/questions/35497551/d3-follow-mouse-coordinates*/

// make the board
var coordinate = [0, 0]
var w = 600, h = 400

var board = d3.select('body')
            .append("svg")
            .attr("width", w)
            .attr("height", h);

var drag = d3.behavior.drag()  
             .on('dragstart', function() { circle.style('fill', 'black'); })
             .on('drag', function() { circle.attr('cx', d3.event.x)
                                            .attr('cy', d3.event.y); })
             .on('dragend', function() { circle.style('fill', 'black'); });

// var circle = board.selectAll('.draggableCircle')  
//                 .data([{ x: (w / 2), y: (h / 2), r: 25 }])
//                 .enter()
//                 .append('svg:circle')
//                 .attr('class', 'draggableCircle')
//                 .attr('cx', function(d) { return d.x; })
//                 .attr('cy', function(d) { return d.y; })
//                 .attr('r', function(d) { return d.r; })
//                 .call(drag)
//                 .style('fill', 'black')

var circle = board.selectAll('.draggableCircle')  
                .data([{ x: (w / 2), y: (h / 2), r: 25 }])
                .enter()
                .append('svg:circle')
                .attr('class', 'draggableCircle')
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('r', function(d) { return d.r; })
                .call(drag)
                .style('fill', 'black')

var astroid = circle.selectAll('.draggableCircle')
                    .append("image")
                    .attr('src', 'asteroid.png')


// // make the astroids in svg
// d3.select('body').select('svg').append("image")
//   .attr("x", 150)
//   .attr("y", 100)
//   .attr("height", "50px")
//   .attr("width", "50px")
//   .attr("xlink:href", "asteroid.png")


var circles = board.selectAll('.enemySvg')  
                .data([{ x: (w / 2), y: (h / 2), r: 25 }])
                .enter()
                .append('svg:circle')
                .attr('class', 'draggableCircle')
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('r', function(d) { return d.r; })
                .call(drag)
                .style('fill', 'black')



// function draw_lines(coordinates) {
//   var x = coordinates[0]
//   var y = coordinates[1]

//   var data = [[x, y, x + 20, y - 40]]

//   //Selects all existing lines(Initially this will return empty array)
//   var lines = svg.selectAll("line");
  
//   //Binds the data array, create lines if does not exists 3(Data array length) lines (Creates the new lines only during the intial call to the function)
//   lines.data(data).enter().append("line");
 
//   //Updates the attributes using data bonded
//   lines.attr({
//     "x1": function(d) {
//       return d[0]
//     },
//     "y1": function(d) {
//       return d[1]
//     },
//     "x2": function(d) {
//       return d[2]
//     },
//     "y2": function(d) {
//       return d[3]
//     },
//   })
// }



// // enter them into the board
// d3.selectAll('div').data([18, 4, 7]).enter().append('div');
// Math.random();

// // make them move around

// // collision detected

// // update the numbers
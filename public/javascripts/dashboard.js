var svg = d3.select("svg"),
    margin = {top: 20, right: 300, bottom: 30, left: 300},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
  
var tooltip = d3.select("#container-svg").append("div").attr("class", "toolTip");
  
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleBand().range([height, 0]);

var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

console.log(data);
  	x.domain([0, d3.max(data, function(d) { return d.value; })]);
    y.domain(data.map(function(d) { return d.parameter; })).padding(0.1);

    g.append("g")
        .attr("class", "x axis")
       	.attr("transform", "translate(0," + height + ")")
      	.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d); }).tickSizeInner([-height]));

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    g.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .style("font-size", "34px times")
        .attr("class", "bar")
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("y", function(d) { return y(d.parameter); })
        .attr("width", function(d) { return x(d.value); })
        .on("mousemove", function(d){
            tooltip
              .style("left", d3.event.pageX - 100 + "px")
              .style("top", d3.event.pageY - 100 + "px")
              .style("display", "inline-block")
              .html((d.parameter) + "<br>" + "$" + (d.value));
        })
    		.on("mouseout", function(d){ tooltip.style("display", "none");});
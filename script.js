// Assuming d3.csv('data.csv') is the correct path to load your data
d3.csv('median_growth_by_sector.csv').then(function (data) {

  // Set dimensions and margins for the graph
  var margin = { top: 40, right: 20, bottom: 90, left: 80 },
    width = 600 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

  // Append SVG object to the body of the page
  var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom) // Make sure the height accommodates the title
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  // X axis
  var x = d3.scaleBand()
    .range([0, width])
    .domain(data.map(function (d) { return d.Sector; }))
    .padding(0.2);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) { return +d['Revenue Growth']; })])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Bars
  svg.selectAll("mybar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) { return x(d.Sector); })
    .attr("y", function (d) { return y(d['Revenue Growth']); })
    .attr("width", x.bandwidth())
    .attr("height", function (d) { return height - y(d['Revenue Growth']); })
    .attr("fill", "grey");

  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", -height / 4)
    .attr("y", -margin.left + 20) // Adjust this value to move label away from the axis
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Median Revenue Growth");

  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Median Revenue Growth by Sector");
});

var margin = {top: 30, right: 30, bottom: 30, left: 40},
    totalWidth = 960,
    totalHeight = 500,
    width = totalWidth - margin.left - margin.right,
    height = totalHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", totalWidth)
    .attr("height", totalHeight);

var chartgroup = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("assets/data/data.csv").then(data => {
    data.forEach(d => {
        d.healthcare = +d.healthcare;
        d.poverty = +d.poverty;
      });
    
    var x = d3.scaleLinear()
        .domain([d3.min(data, d => d.poverty)*0.98,d3.max(data, d => d.poverty) * 1.02])
        .range([0,width]);
        
    var y = d3.scaleLinear()
        .domain([d3.min(data, d => d.healthcare) * 0.87,d3.max(data, d => d.healthcare)*1.12])
        .range([height, 0]);

    chartgroup.append("g")
        .attr("transform", "translate(0," + height + ")")
        .classed("axis", true)
        .call(d3.axisBottom(x));
    
    chartgroup.append("g")
        .classed("axis", true)
        .call(d3.axisLeft(y));

    chartgroup.append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => { return x(d.poverty) })
        .attr("cy", d => { return y(d.healthcare) })
        .attr("r", 10)
        .style("fill","lightblue")
    chartgroup.selectAll("thing")
        .data(data)
        .enter()
        .append("text")
        .text(d => {return d.abbr })
        .attr("x", d => { return x(d.poverty) })
        .attr("y", d => { return y(d.healthcare)})
        .attr("text-anchor","middle")
        .attr("alignment-baseline","central")
        .style("font-size", "12px")
        .style("fill","white");
});
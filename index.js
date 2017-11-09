/*global d3*/

/* Voor het maken van de onderstaande grafiek heb gebruikt gemaakt van het voorbeeld Basic barchart https://bl.ocks.org/mbostock/3885304 van Mike Bostock*/

var svg = d3.select("svg"),
    margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select('body').append('div')
       .attr('class', 'tooltip')
       .style('opacity', 0);

d3.text('index.csv').get(onload);

function onload(err, doc) {

    if (err) {
        throw err

    }

    /*Omdat ik een ruwe dataset gekozen heb, heb ik die data met onderstaande code schoongemaakt. Allereerst zorg ik ervoor dat de header en de footer eruit gehaald worden.*/
    var header = doc.indexOf('Perioden');
    var footer = doc.indexOf('Centraal Bureau voor de Statistiek') - 2;
    var end = doc.indexOf('\n', header);
    doc = doc.substring(end, footer).trim();
    
    
// Met onderstaande code zorg ik ervoor dat ik de regels 10 tot en met 21 pak en daar verder mee ga werken.
    var data = d3.csvParseRows(doc, map).slice(10, 21);

// Met deze functie map geef ik een naam aan de d row die ik kies. En geef daarbij aan dat het een number is.     
    
    function map(d) {
        return {
            Perioden: Number(d[0]),
            Totaal: Number(d[1]) + Number(d[3]) + Number(d[2]) + Number(d[4]),
            Mannen: Number(d[1]) + Number(d[3]),
            Vrouwen: Number(d[2]) + Number(d[4])
        }

    }

    console.log(data);

// Hier maak ik het Y en X domein aan

    x.domain(data.map(function (d) {
        return d.Perioden;
    }));
    y.domain([0, 12000]);
    
    // Met onderstaande code maak ik de x as aan, de y as aan en de rectangles

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10))
        .append("text")
        .attr("y", 6)
        .attr("dy", "-1.8em")
        .attr("dx", "5em")
        .attr("text-anchor", "end")
        .text("Aantal overledenen");


    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.Perioden);
        })
        .attr("y", function (d) {
            return y(d.Totaal);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(d.Totaal);
        })
        .on('mousemove', function (d) {
           tooltip.transition()
               .duration(200)
               .style('opacity', .9)
           tooltip.html((d.Totaal))
               .style('left', (d3.event.pageX) + 'px')
               .style('top', (d3.event.pageY - 28) + 'px')
       })
       .on('mouseout', function (d) {
           tooltip.transition()
               .duration(500)
               .style('opacity', 0);
       })
    
    
    d3.select("input").on("change", change);

    d3.select("input").property("unchecked", true).each(change);


    function change() {


        var x0 = x.domain(data.sort(this.checked ? function (a, b) {
                    return b.Totaal - a.Totaal;
                } : function (a, b) {
                    return d3.ascending(a.Perioden, b.Perioden);
                })
                .map(function (d) {
                    return d.Perioden;
                }))
            .copy();

        svg.selectAll(".bar")
            .sort(function (a, b) {
                return x0(a.Perioden) - x0(b.Perioden);
            });

        var transition = svg.transition().duration(750),
            delay = function (d, i) {
                return i * 50;
            };

        transition.selectAll(".bar")
            .delay(delay)
            .ease(d3.easeBounce)
            .duration(1000)
            .attr("x", function (d) {
                return x0(d.Perioden);
            });

        transition.select(".axis--x")
            .call(d3.axisBottom(x0))
            .selectAll("g")
            .delay(delay);
    }


};



//////////////////////////////////////////////////////////
//GRAFIEK 2

/* Voor het maken van de 3 onderstaande grafiek heb gebruikt gemaakt van het voorbeeld Grouped Bar Chart https://bl.ocks.org/mbostock/3887051 van Mike Bostock*/

var svg2 = d3.select(".svgRight"),
    margin2 = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    width2 = +svg2.attr("width") - margin2.left - margin2.right,
    height2 = +svg2.attr("height") - margin2.top - margin2.bottom,
    g2 = svg2.append("g").attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

var x0 = d3.scaleBand()
    .rangeRound([0, width2])
    .paddingInner(0.1);

var x1 = d3.scaleBand()
    .padding(0.05);

var y2 = d3.scaleLinear()
    .rangeRound([height2, 0]);

var z2 = d3.scaleOrdinal()
    .range(["#00a8cf", "#330066"]);

var tooltip = d3.select('body').append('div')
       .attr('class', 'tooltip')
       .style('opacity', 0);

d3.csv("data.csv", function (d, i, columns) {
    for (var i = 2, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
}, function (error, data) {
    if (error) throw error;


    var keys = data.columns.slice(2); // Hiermee slice ik de eerste 2 rows er van af en ga ik verder met de laatste twee rows. 

    x0.domain(data.map(function (d) {
        return d.Risico;
    }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y2.domain([0, 100]);

    g2.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d) {
            return "translate(" + x0(d.Risico) + ",0)";
        })
        .selectAll("rect")
        .data(function (d) {
            return keys.map(function (key) {
                return {
                    key: key,
                    value: d[key]
                };
            });
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return x1(d.key);
        })
        .attr("y", function (d) {
            return y2(d.value);
        })
        .attr("width", x1.bandwidth())
        .attr("height", function (d) {
            return height2 - y2(d.value);
        })
        .attr("fill", function (d) {
            return z2(d.key);
        })
    //Met ondestaande code zorg ik ervoor dat wanneer de muis over een rectangle beweegt een tooltip zichtbaar wordt.
    .on('mousemove', function (d) {
           tooltip.transition()
               .duration(200)
               .style('opacity', .9)
           tooltip.html((d.value))
               .style('left', (d3.event.pageX) + 'px')
               .style('top', (d3.event.pageY - 28) + 'px')
       })
       .on('mouseout', function (d) {
           tooltip.transition()
               .duration(500)
               .style('opacity', 0);
       })

    g2.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height2 + ")")
        .call(d3.axisBottom(x0));

    g2.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y2).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y2(y2.ticks().pop()) + 0.5)
           .attr("dy", "-.8em")
        .attr("dx", "3em")
        .attr("text-anchor", "end")
        .text("Percentage");

    var legend = g2.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legend.append("rect")
        .attr("x", width2 - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z2);

    legend.append("text")
        .attr("x", width2 - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) {
            return d;
        });


});

//////////////////////////////////////////////////////////
//GRAFIEK 3


var svg3 = d3.select(".svg3"),
    margin3 = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    width3 = +svg3.attr("width") - margin3.left - margin3.right,
    height3 = +svg3.attr("height") - margin3.top - margin3.bottom,
    g3 = svg3.append("g").attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");

var x0 = d3.scaleBand()
    .rangeRound([0, width3])
    .paddingInner(0.1);

var x1 = d3.scaleBand()
    .padding(0.05);

var y3 = d3.scaleLinear()
    .rangeRound([height2, 0]);

var z3 = d3.scaleOrdinal()
    .range(["#00a8cf", "#330066"]);

var tooltip = d3.select('body').append('div')
       .attr('class', 'tooltip')
       .style('opacity', 0);



d3.csv("data2.csv", function (d, i, columns) {
    for (var i = 2, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
}, function (error, data) {
    if (error) throw error;


    var keys = data.columns.slice(2);

    x0.domain(data.map(function (d) {
        return d.Risico;
    }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y3.domain([0, 100]);

    g3.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d) {
            return "translate(" + x0(d.Risico) + ",0)";
        })
        .selectAll("rect")
        .data(function (d) {
            return keys.map(function (key) {
                return {
                    key: key,
                    value: d[key]
                };
            });
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return x1(d.key);
        })
        .attr("y", function (d) {
            return y3(d.value);
        })
        .attr("width", x1.bandwidth())
        .attr("height", function (d) {
            return height3 - y3(d.value);
        })
        .attr("fill", function (d) {
            return z3(d.key);
        })
    .on('mousemove', function (d) {
           tooltip.transition()
               .duration(200)
               .style('opacity', .9)
           tooltip.html((d.value))
               .style('left', (d3.event.pageX) + 'px')
               .style('top', (d3.event.pageY - 28) + 'px')
       })
       .on('mouseout', function (d) {
           tooltip.transition()
               .duration(500)
               .style('opacity', 0);
       })

    g3.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height3 + ")")
        .call(d3.axisBottom(x0));

    g3.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y3).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y3(y3.ticks().pop()) + 0.5)
           .attr("dy", "-.8em")
        .attr("dx", "3em")
        .attr("text-anchor", "end")
        .text("Percentage");

    var legend = g3.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legend.append("rect")
        .attr("x", width3 - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z3);

    legend.append("text")
        .attr("x", width3 - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) {
            return d;
        });



});


//////////////////////////////////////////////////////////
//GRAFIEK 4


var svg4 = d3.select(".svg4"),
    margin4 = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
    width4 = +svg4.attr("width") - margin4.left - margin4.right,
    height4 = +svg4.attr("height") - margin4.top - margin4.bottom,
    g4 = svg4.append("g").attr("transform", "translate(" + margin4.left + "," + margin4.top + ")");

var x0 = d3.scaleBand()
    .rangeRound([0, width4])
    .paddingInner(0.1);

var x1 = d3.scaleBand()
    .padding(0.05);

var y4 = d3.scaleLinear()
    .rangeRound([height4, 0]);

var z4 = d3.scaleOrdinal()
    .range(["#00a8cf", "#330066"]);

var tooltip = d3.select('body').append('div')
       .attr('class', 'tooltip')
       .style('opacity', 0);


d3.csv("data3.csv", function (d, i, columns) {
    for (var i = 2, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
}, function (error, data) {
    if (error) throw error;


    var keys = data.columns.slice(2);

    x0.domain(data.map(function (d) {
        return d.Risico;
    }));
    x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    y4.domain([0, 100]);

    g4.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d) {
            return "translate(" + x0(d.Risico) + ",0)";
        })
        .selectAll("rect")
        .data(function (d) {
            return keys.map(function (key) {
                return {
                    key: key,
                    value: d[key]
                };
            });
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return x1(d.key);
        })
        .attr("y", function (d) {
            return y4(d.value);
        })
        .attr("width", x1.bandwidth())
        .attr("height", function (d) {
            return height4 - y4(d.value);
        })
        .attr("fill", function (d) {
            return z4(d.key);
        })
    .on('mousemove', function (d) {
           tooltip.transition()
               .duration(200)
               .style('opacity', .9)
           tooltip.html((d.value))
               .style('left', (d3.event.pageX) + 'px')
               .style('top', (d3.event.pageY - 28) + 'px')
       })
       .on('mouseout', function (d) {
           tooltip.transition()
               .duration(500)
               .style('opacity', 0);
       })

    g4.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height4 + ")")
        .call(d3.axisBottom(x0));

    g4.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y4).ticks(null, "s"))
        .append("text")
        .attr("x", 2)
        .attr("y", y4(y4.ticks().pop()) + 0.5)
           .attr("dy", "-.8em")
        .attr("dx", "3em")
        .attr("text-anchor", "end")
        .text("Percentage");

    var legend = g4.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legend.append("rect")
        .attr("x", width4 - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z4);

    legend.append("text")
        .attr("x", width4 - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) {
            return d;
        });

});

(function() {
    "use strict";

    var year = 2013;
    var country = "United States";
    var ageGroups = new Array(10); // has 7 age groups, from 30's to 60's.

    // Executes anonymous function, after page has been entirely loaded.
    window.onload = function() {
        retrieveData();
        document.getElementById("list").onchange = countrySelect;
    };

    function countrySelect() {
        var list = document.getElementById("list");
        country = list.value;
        retrieveData();
    }

    // Gets prevalance percentage of selected country and year for males.
    function retrieveData() {
        d3.select("svg").remove();
        d3.csv("dataset.csv", function(data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].year == year && data[i].location_name == country){
                    if (data[i].metric == "overweight" && data[i].sex == "male") {
                        var percentage = Math.round(data[i].mean * 100);

                        if (data[i].age_group == "15 to 19 yrs") {
                            ageGroups[0] = percentage;   
                        } else if (data[i].age_group == "20 to 24 yrs") {
                            ageGroups[1] = percentage;   
                        } else if (data[i].age_group == "25 to 29 yrs") {
                            ageGroups[2] = percentage;
                        } else if (data[i].age_group == "30 to 34 yrs") {
                            ageGroups[3] = percentage;   
                        } else if (data[i].age_group == "35 to 39 yrs") {
                            ageGroups[4] = percentage;   
                        } else if (data[i].age_group == "40 to 44 yrs") {
                            ageGroups[5] = percentage;   
                        } else if (data[i].age_group == "45 to 49 yrs") {
                            ageGroups[6] = percentage;   
                        } else if (data[i].age_group == "50 to 54 yrs") {
                            ageGroups[7] = percentage;   
                        } else if (data[i].age_group == "55 to 59 yrs") {
                            ageGroups[8] = percentage;   
                        } else if (data[i].age_group == "60 to 64 yrs") {
                            ageGroups[9] = percentage;   
                        }
                    }
                }
            }
                      
            var w = 500;
            var h = 450;
            var data = [0, 1, 2];

            var xScale = d3.scaleLinear()
                .domain([0, d3.max(ageGroups)])
                .range([0,w-100]);
            var yScale = d3.scaleLinear()
                .domain([0,ageGroups.length])
                .range([0,h]);

            var svg = d3.select("div").append("svg")
                .attr("height", h)
                .attr("width", w);

                // Utilizes our dataset to create the individual bars.
                svg.selectAll("rect")
                    .data(ageGroups)
                    .enter()
                    .append("rect")
                        .attr("class", "bar")
                        .attr("fill", "#ADD8E6")
                        .attr("x", 0)
                        .attr("y", function(d,i){
                            return yScale(i);
                        })
                        .attr("width", function(d,i){
                            return xScale(d);

                        })
                        .attr("height", function(d,i){
                            return yScale(1)-1;
                        })

                svg.selectAll(".bar-label")
                    .data(ageGroups)
                    .enter()
                        .append("text")
                        .classed("bar-label", true)
                        .attr("x", function(d,i){
                            return xScale(d)
                        })
                        .attr("y", function(d,i){
                            return yScale(i);
                        })
                        .attr("dy", function(d,i){
                            return yScale(1)/1.5+2;
                        })
                        .text(function(d,i){
                            return d + "%";
                        });

                var age = 10;
                svg.selectAll(".bar-age")
                    .data(ageGroups)
                    .enter()
                        .append("text")
                        .classed(".bar-age", true)
                        .attr("x", 0)
                        
                        .attr("y", function(d,i){
                            return yScale(i);
                        })
                        .attr("dy", function(d,i){
                            return yScale(1)/1.5+2;
                        })
                        .text(function(d,i){
                            age += 5;
                            return age + " - " + (age + 4) + " yrs";
                        });            
        });                
    }

})();
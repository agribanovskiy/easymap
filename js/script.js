$(document).ready(function () {
    $("#textdata").keyup(function (event) {
        drawImage();

    });
});



function drawImage() {
    var textdata = $("#textdata").val();
    var data = d3.csv.parseRows(textdata);

    var width = $('#map').width();
    var height = $('#map').height();
    var svg = d3.select('#map svg');
    svg.selectAll('rect').remove();

    svg.attr('width', width).attr('height', height);
    svg.selectAll('rect')
      .data(data)
    .enter()
       .append("rect")
        .attr("x", function (d, i) {
            return i * (width / data.length);
        })
       .attr("y", function (d) { return height - d[1]})
.attr("width", width / data.length - 1)
.attr("height", function (d) {
    return d[1]*4;
});

}
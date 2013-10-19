$(document).ready(function () {
	$("#textdata").keyup(function (event) {
        drawImage();

    });
    
	$("#download-svg").click(function () {
		var html = d3.select("#map").select("svg")
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .node().parentNode.innerHTML;

          var blob = new Blob([html], { type: "data:image/svg+xml" });
          saveAs(blob, ("test.svg"));
	});
	
	$("#download-png").click(function () {
		var content = d3.select("body").append("canvas")
              .attr("id", "canvas");
              //.style("display","none");

          //var html = d3.select(".map").select("svg")
              //.node().parentNode.innerHTML;

          canvg('canvas', $("#map").children("svg")[0]);
          
		  /*
		  var canvas = document.getElementById("canvas");//, ctx = canvas.getContext("2d");
          canvas.toBlob(function(blob) {
              saveAs(blob, (element.find('input').val() || element.find('input').attr("placeholder")) + ".png");
          }, "image/png");

        d3.select("#canvas").remove();
		*/
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
			.attr("y", function (d) { return height - d[1] })
			.attr("width", width / data.length - 1)
			.attr("height", function (d) {
				return d[1] * 4;
			});
	}
});




$(document).ready(function () {
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
});
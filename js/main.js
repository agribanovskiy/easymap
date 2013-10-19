em = {};

$(document).ready(function () {
    function drawImage() {
        var textdata = $("#textdata").val(),
            data = d3.csv.parseRows(textdata),
            width = $('#map').width(),
            height = $('#map').height(),
            svg = d3.select('#map svg');
        
        svg.selectAll('rect').remove();

        svg.attr('width', width).attr('height', height);
        svg.selectAll('rect')
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d, i) {
                return i * (width / data.length);
            })
            .attr("y", function (d) { 
                return height - d[1] 
             })
            .attr("width", width / data.length - 1)
            .attr("height", function (d) {
                return d[1] * 4;
            });
    }
    
    // fuzzyset initialization
    var i = 0, max = em.TITLES.length;
    
    em.fuzzyset = Fuzzyset() 
    
    for (; i < max; i += 1) {
        em.fuzzyset.add(em.TITLES[i]);
    }
    
    // initialization

    var editor = CodeMirror.fromTextArea(document.getElementById("textdata"), {
        mode: "text/html"
    }).on("change", function () {
        drawImage();
    });

	$("#textdata1").keyup(function (event) {
        drawImage();
    });
    
	$("#download-svg").click(function () {
		downloader.downloadSVG("test");
	});
	
	$("#download-png").click(function () {
		downloader.downloadPNG("test");
	});
});

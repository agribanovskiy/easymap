var downloader = downloader || {
	_MAP_SELECTOR: "#map",
	_TEMP_CANVAS_ID: "temp-canvas",
	
	downloadSVG: function (fileName) {
		var html = d3.select(this._MAP_SELECTOR).select("svg")
				.attr("version", 1.1)
				.attr("xmlns", "http://www.w3.org/2000/svg")
				.node().parentNode.innerHTML,
			
			blob = new Blob([html], {
				type: "data:image/svg+xml"
			});
		
		saveAs(blob, fileName + ".svg");
	},
	
	downloadPNG: function (fileName) {
		var that = this,
			content = d3.select("body").append("canvas")
				.attr("id", that._TEMP_CANVAS_ID)
				.style("display","none"),
			canvas = document.getElementById(that._TEMP_CANVAS_ID);
		
		canvg(that._TEMP_CANVAS_ID, $(that._MAP_SELECTOR).html().trim());
		
		canvas.toBlob(function(blob) {
			saveAs(blob, fileName + ".png");
		}, "image/png");
		
		d3.select("#" + that._TEMP_CANVAS_ID).remove();
	}
}
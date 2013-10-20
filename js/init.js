$(document).ready(function () {
    // fuzzyset initialization
    var i = 0, max = em.TITLES.length,
        textarea;
    
    em.fuzzyset = em.Fuzzyset() 
    
    for (; i < max; i += 1) {
        em.fuzzyset.add(em.TITLES[i]);
    }
    // initialization
    textarea = em.CodeMirror.fromTextArea($("#data-text")[0], {
        mode: "text/html",
        lineNumbers: true
    });
    textarea.on("change", function (e) {
        var data = em.validator.getData(e.getValue());
        em.validator.showData(data);
    });
    
    $("#download-svg").click(function () {
        em.downloader.downloadSVG("test");
    });
    
    $("#download-png").click(function () {
        em.downloader.downloadPNG("test");
    });
    $('.draw').click(function () {
        var result = [];
        em.validator.getResult().forEach(function (item) {
            result.push({
                name : item.name,
                id : '',
                value  : item.value
            });
        });
        
        console.log('draw', result);
        easy_choropleth({
                colors: colors.Reds,
                width: 960,
                height: 600,    
                datasource: "oblasti.topo.json",
                data: result,
                selector: "#map_svg" 
        });
    })
});
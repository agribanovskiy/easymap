$(document).ready(function () {
    function textareaChanging(e) {
        var data = em.validator.getData(textarea.val());
        em.validator.showData(data);
    }
    // fuzzyset initialization
    var i = 0, max = em.TITLES.length,
        downloadSVG = $("#download-svg"),
        downloadPNG = $("#download-png"),
        draw = $('.draw'),
        insertDefault = $('.insert-default'),
        textarea = $("#data-text"); // comment if use CodeMirror plugin
       /**
        Uncomment to use CodeMirror plugin for numbers in textarea row 
        
        textarea = em.CodeMirror.fromTextArea($("#data-text")[0], {
            mode: "text/html",
            lineNumbers: true
        });*/
    
    em.fuzzyset = em.Fuzzyset() 
    
    for (; i < max; i += 1) {
        em.fuzzyset.add(em.TITLES[i]);
    }
    // initialization
    
    textarea.on("change", textareaChanging);
    textarea.bind('paste', textareaChanging);
    
    downloadSVG.click(function () {
        em.downloader.downloadSVG("test");
    });
    
    downloadPNG.click(function () {
        em.downloader.downloadPNG("test");
    });
    draw.click(function () {
        var result = [];
        em.validator.getResult().forEach(function (item) {
            result.push({
                name : item.name,
                id : '',
                value  : item.value
            });
        });
        
        easy_choropleth({
                colors: colors.Reds,
                width: 960,
                height: 600,    
                datasource: "oblasti.topo.json",
                data: result,
                selector: "#map_svg" 
        });
    });
    insertDefault.click(function () {
        textarea.val(em.TITLES.join(', 0\n'));
        textareaChanging(textarea);
    });
        
    
});
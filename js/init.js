$(document).ready(function () {
    // fuzzyset initialization
    var i = 0, max = em.TITLES.length,
        textarea;
    
    em.fuzzyset = em.Fuzzyset(); 
    
    for (; i < max; i += 1) {
        em.fuzzyset.add(em.TITLES[i]);
    }
    // initialization
    //textarea = em.CodeMirror.fromTextArea($("#textdata")[0], {
    //    mode: "text/html",
    //    lineNumbers: true
    //});
    //textarea.on("change", function (e) {
    //    var data = em.validator.getData(e.getValue());
    //    em.validator.showData(data);
    //});
    
    $("#download-svg").click(function () {
        em.downloader.downloadSVG("test");
    });
    
    $("#download-png").click(function () {
        em.downloader.downloadPNG("test");
    });
    
    $(".tab").click(function() {
        $(".activeTab").removeClass("activeTab");
        $(this).addClass("activeTab");
    });
    
    $("#upload-tab").click(function() {
       $("#upload").css("display", "block");
       $("#datainput").css("display", "none");
       $("#start").css("display", "none");
    });
    
    $("#input-tab").click(function() {
       $("#upload").css("display", "none");
       $("#datainput").css("display", "block");
       $("#start").css("display", "none");
    });
});
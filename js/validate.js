em.validatot = (function () {
    function _getDataArray(dataString) {
        var result, i = 0, max;
        
        result = dataString.split('\n');
            
        for (max = result.length; i < max; i += 1) {
            result[i] = result[i].split(',');
        }
        return _validateTitles(result);
    }
    function _validateTitles(resultArray) {
        var i = 0, max = resultArray.length, elem,
            result = [],
            fuzzyResult; 
        
        for (; i < max; i += 1) {
            fuzzyResult = em.fuzzyset(resultArray[i][0]);
            
            result.push({
                value : resultArray[i][1].replace(/^\s+|\s+$/g,''),    // trin string
                name :fuzzyResult[0] > PROBABILITY ? fuzzyResult[1] : '', 
                isError : fuzzyResult[0] > PROBABILITY ? false : true
            });
        }
    }
    
    var PROBABILITY = 0.5;
    
    return {
        getData : _getDataArray
    }
})

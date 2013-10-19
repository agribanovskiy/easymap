em = em || {};

em.validator = (function () {
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
            item,
            name,
            isError,
            fuzzyResult; 
        
        for (; i < max; i += 1) {
            console.log(resultArray[i][0]);
            
            fuzzyResult = em.fuzzyset.get(resultArray[i][0])[0];
            
            console.log('fuzzyResult', fuzzyResult);
            
            isError = fuzzyResult === null;  
            result.push({
                value : resultArray[i][1].replace(/^\s+|\s+$/g,''),    // trin string
                name : isError ? '' : fuzzyResult[1],
                isError : isError
            });
        }
        return result;
    }
    
    var PROBABILITY = 0.5;
    
    return {
        getData : _getDataArray
    }
})();

em = em || {};

em.validator = (function () {
    function _getDataArray(dataString) {
        var result, i = 0, max;
        
        result = dataString.split('\n');
            
        for (max = result.length; i < max; i += 1) {
            result[i] = result[i].split(',');
        }
        _result = _validateTitles(result);

         easy_choropleth({
            colors: '#999999',
            width: 960,
            height: 600,    
            datasource: "oblasti.topo.json",
            data: [{name:'', id:'', value:0}],
            selector: "#map_svg" 
        });

        return _result;
    }
    function _validateTitles(resultArray) {
        var i = 0, max = resultArray.length, elem,
            result = [],
            item,
            name,
            isError,
            fuzzyResult; 
        
        for (; i < max; i += 1) {
            fuzzyResult = em.fuzzyset.get(resultArray[i][0])[0];
            
            console.log('fuzzyResult',fuzzyResult, 'resultArray[i][0]', resultArray[i][0]);
            
            isError = (fuzzyResult === null || fuzzyResult[0] < PROBABILITY);
            result.push({
                value : resultArray[i][1].replace(/^\s+|\s+$/g,''),    // trin string
                name : isError ? '' : fuzzyResult[1],
                isError : isError
            });
        }
        return result;
    }
    function _showData(data) {
        //console.log('data', data);
        var i = 0, j = 0, max = data.length, len,
            row,
            cell,
            table = document.getElementById('table'),
            fragment = document.createDocumentFragment('div'),
            errorDom,
            prop;
        table.innerHTML = '';
        
        for (; i < max; i += 1) {
            row = document.createElement('div');
            number = document.createElement('div');
            number.classList.add('cell');
            number.classList.add('number');
            
            number.innerText = i + 1;
            row.appendChild(number);
            
            if (data[i].isError) {
                row.classList.add('error');
            }
            
            for (property in data[i]) {
                if (data[i].hasOwnProperty(property) && property !== 'isError') {
                    prop = data[i][property];
                    if (data[i].isError) {
                        cell = document.createElement('input');
                        cell.classList.add('errorValue');
                        _bindError(cell, i);
                    } else {
                        cell = document.createElement('div');
                        cell.innerText = prop;                        
                    }
                    cell.classList.add('cell');
                    cell.classList.add(property);
                    
                    row.appendChild(cell);
                }
            }
            row.classList.add('row');
            fragment.appendChild(row);
        }
        table.appendChild(fragment);
    }
    function _bindError(dom, index) {
        var name, value,
            regexpNumber = /^\d+$/,
            isError;
        
        $(dom).change(function (e) {
            console.log('this', this);
            if (this.classList.contains('name')) {
                name = em.fuzzyset.get(this.value)[0];
                console.log('name',name)
                
                if (name !== null && name[0] > PROBABILITY) {
                    console.log('if');
                    
                    _result[index].name = name[1];
                    this.value = name[1];
                    this.classList.remove('errorValue');
                }
            } else if (this.classList.contains('value') && regexpNumber.test(this.value)) {
                _result[index].value = this.value;
                this.classList.remove('errorValue');
            }
            if($(this.parentNode).children('.errorValue').length === 0) {
                _result[index].isError = false;
                _showData(_result);
                 
                 easy_choropleth({
                        colors: '#999999',
                        width: 960,
                        height: 600,    
                        datasource: "oblasti.topo.json",
                        data: em.validator.getResult(),
                        selector: "#map_svg" 
                });
            }
        });
    }
    
    var PROBABILITY = 0.5,
        _result;
    
    return {
        getData : _getDataArray,
        showData : _showData,
        getResult : function () {
            return _result;
        }
    }
})();

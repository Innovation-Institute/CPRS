    /*Helper functions to check for nulls, Strings to Arrays and empty responses. */
    module.exports={
        checkText: checkText,
        checkSelect: checkSelect,
        checkLink: checkLink
    }
    
    function checkText(val){
        if(val == null){
            val='';
            return val;
        }
        return val;
    }
    function checkSelect(val){
        if(val === ''){
            val=null;
            return val;
        }
        return val;
    }

    function checkLink(val){
        if (val instanceof Array) {
            return val;
        } else if(typeof val == 'string' || val instanceof String) {
          val= [ val ];
          return val;
        } else {
            val = [];
            return val;
        }
    }
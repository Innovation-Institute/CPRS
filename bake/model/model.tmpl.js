const checkInput=require('../models/components/checkInput');
const columnNames=require('../models/components/createColumnObjects');

class <%= model %> {
    constructor(object=null,id=null) {
         // "columnName","displayName","type"
        this._inputColumnNames= columnNames.setColumnNames(<%= JSON.stringify(inputColumnNames)%>);
        // "columnName","displayName"
        this._metadataColumnNames= columnNames.setMetadata(<%= JSON.stringify(metadataColumnNames)%>);
        // "variable name", "displayName","columnName","table","columnValueName" 
        this._referencedColumnNames= columnNames.setReferencedColumnNames(<%= JSON.stringify(referencedColumnNames)%>);
        this._id=id;
        if(object==null){
            return;
        }
        <% for(index in inputColumnNames){
            switch (inputColumnNames[index][2]) {
                case 'date' : %>
                this._<%= inputColumnNames[index][0] %>=checkInput.checkSelect(object.<%= inputColumnNames[index][0] %>);
                <% break;
                case 'number' : %>
                this._<%= inputColumnNames[index][0] %>=checkInput.checkNumber(object.<%= inputColumnNames[index][0] %>);
                <% break;
                default: %>
                this._<%= inputColumnNames[index][0] %>=checkInput.checkText(object.<%= inputColumnNames[index][0] %>);
            <% } %>
        <%  }  %>
        <% for(index in metadataColumnNames){ %>
        this._<%= metadataColumnNames[index][0] %>=checkInput.checkSelect(object.<%= metadataColumnNames[index][0] %>);
        <% } %>
        <% for(index in referencedColumnNames){ %>
        this._<%= referencedColumnNames[index][2] %>=checkInput.checkLink(object.<%= referencedColumnNames[index][2] %>);
        <% } %>
    }
    /**
     * Getters and Setters for columns/variables.
     * 
     */
    get inputColumnNames(){
        return this._inputColumnNames;
    }
    get metadataColumnNames(){
        return this._metadataColumnNames;
    }
    get referencedColumnNames(){
        return this._referencedColumnNames;
    }
    get id(){
        return this._id;
    }
    <% for(index in inputColumnNames){ %>
        
    get <%= inputColumnNames[index][0] %>(){
        return this._<%= inputColumnNames[index][0] %>;
    }
    set <%= inputColumnNames[index][0] %>(<%= inputColumnNames[index][0] %>){
            <% if(inputColumnNames[index][2]!="date"){ %>
        this._<%= inputColumnNames[index][0] %>=checkInput.checkText(<%= inputColumnNames[index][0] %>);
            <%    } else { %>
        this._<%= inputColumnNames[index][0] %>=checkInput.checkSelect(<%= inputColumnNames[index][0] %>);
            <%  }  %>
    }
   <% } %>
   <% for(index in metadataColumnNames){ %>
    get <%= metadataColumnNames[index][0] %>(){
        return this._<%= metadataColumnNames[index][0] %>;
    }
    set <%= metadataColumnNames[index][0] %>(<%= metadataColumnNames[index][0] %>){
            this._<%= metadataColumnNames[index][0] %>=checkInput.checkSelect(<%= metadataColumnNames[index][0] %>);
    }
   <% } %>
   <% for(index in referencedColumnNames){ %>
    get <%= referencedColumnNames[index][2] %>(){
        return this._<%= referencedColumnNames[index][2] %>;
    }
    set <%= referencedColumnNames[index][2] %>(<%= referencedColumnNames[index][2] %>){
        this._<%= referencedColumnNames[index][2] %>=checkInput.checkLink(<%= referencedColumnNames[index][2] %>);
    }
   <% } %>
   toJson(){
        return {
        <% for(index in inputColumnNames){ %>
            "<%= inputColumnNames[index][0] %>": this._<%= inputColumnNames[index][0] %>,
        <%  }  %>
        <% for(index in metadataColumnNames){ %>
            "<%= metadataColumnNames[index][0] %>": this._<%= metadataColumnNames[index][0] %>,
        <% } %>
        <% for(index in referencedColumnNames){ %>
            "<%= referencedColumnNames[index][2] %>": this._<%= referencedColumnNames[index][2] %>,
        <% } %>
        }
    }
}
module.exports= <%= model %>



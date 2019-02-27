const checkInput=require('../models/components/checkInput');
const columnNames=require('../models/components/createColumnObjects');

class team_category {
    constructor(object=null,id=null) {
         // "columnName","displayName","type"
        this._inputColumnNames= columnNames.setColumnNames([["Name_Text","Name","text"]]);
        // "columnName","displayName"
        this._metadataColumnNames= columnNames.setMetadata([["Sub_Category_Select","Sub Category"]]);
        // "variable name", "displayName","columnName","table","columnValueName" 
        this._referencedColumnNames= columnNames.setReferencedColumnNames([["teams","Teams","Team_Link","team","Team_Name"]]);
        this._id=id;
        if(object==null){
            return;
        }
        
                this._Name_Text=checkInput.checkText(object.Name_Text);
            
        
        
        this._Sub_Category_Select=checkInput.checkSelect(object.Sub_Category_Select);
        
        
        this._Team_Link=checkInput.checkLink(object.Team_Link);
        
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
    
        
    get Name_Text(){
        return this._Name_Text;
    }
    set Name_Text(Name_Text){
            
        this._Name_Text=checkInput.checkText(Name_Text);
            
    }
   
   
    get Sub_Category_Select(){
        return this._Sub_Category_Select;
    }
    set Sub_Category_Select(Sub_Category_Select){
            this._Sub_Category_Select=checkInput.checkSelect(Sub_Category_Select);
    }
   
   
    get Team_Link(){
        return this._Team_Link;
    }
    set Team_Link(Team_Link){
        this._Team_Link=checkInput.checkLink(Team_Link);
    }
   
   toJson(){
        return {
        
            "Name_Text": this._Name_Text,
        
        
            "Sub_Category_Select": this._Sub_Category_Select,
        
        
            "Team_Link": this._Team_Link,
        
        }
    }
}
module.exports= team_category;



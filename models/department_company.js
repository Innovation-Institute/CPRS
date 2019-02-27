const checkInput=require('../models/components/checkInput');
const columnNames=require('../models/components/createColumnObjects');

class department_company {
    constructor(object=null,id=null) {
         // "columnName","displayName","type"
        this._inputColumnNames= columnNames.setColumnNames([["Name_Text","Name","text"]]);
        // "columnName","displayName"
        this._metadataColumnNames= columnNames.setMetadata([["Part_Of_The_University_Select","Part of the University"],["Year_First_Represented_Select","Year First Represented"]]);
        // "variable name", "displayName","columnName","table","columnValueName" 
        this._referencedColumnNames= columnNames.setReferencedColumnNames([["members","Members","Member_Link","member","Member_Name"]]);
        this._id=id;
        if(object==null){
            return;
        }
        
                this._Name_Text=checkInput.checkText(object.Name_Text);
            
        
        
        this._Part_Of_The_University_Select=checkInput.checkSelect(object.Part_Of_The_University_Select);
        
        this._Year_First_Represented_Select=checkInput.checkSelect(object.Year_First_Represented_Select);
        
        
        this._Member_Link=checkInput.checkLink(object.Member_Link);
        
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
   
   
    get Part_Of_The_University_Select(){
        return this._Part_Of_The_University_Select;
    }
    set Part_Of_The_University_Select(Part_Of_The_University_Select){
            this._Part_Of_The_University_Select=checkInput.checkSelect(Part_Of_The_University_Select);
    }
   
    get Year_First_Represented_Select(){
        return this._Year_First_Represented_Select;
    }
    set Year_First_Represented_Select(Year_First_Represented_Select){
            this._Year_First_Represented_Select=checkInput.checkSelect(Year_First_Represented_Select);
    }
   
   
    get Member_Link(){
        return this._Member_Link;
    }
    set Member_Link(Member_Link){
        this._Member_Link=checkInput.checkLink(Member_Link);
    }
   
   toJson(){
        return {
        
            "Name_Text": this._Name_Text,
        
        
            "Part_Of_The_University_Select": this._Part_Of_The_University_Select,
        
            "Year_First_Represented_Select": this._Year_First_Represented_Select,
        
        
            "Member_Link": this._Member_Link,
        
        }
    }
}
module.exports= department_company



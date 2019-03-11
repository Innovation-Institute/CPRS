const checkInput=require('../models/components/checkInput');
const columnNames=require('../models/components/createColumnObjects');

class eir {
    constructor(object=null,id=null) {
         // "columnName","displayName","type"
        this._inputColumnNames= columnNames.setColumnNames([["Name_Text","Name","text"],["Phone_Text","Phone Number","text"],["Email_Text","Email Account","text"]]);
        // "columnName","displayName"
        this._metadataColumnNames= columnNames.setMetadata([["Gender_Select","Gender"],["non_white","Non White"]]);
        // "variable name", "displayName","columnName","table","columnValueName" 
        this._referencedColumnNames= columnNames.setReferencedColumnNames([["user","User Account","User_Link","ii_user","User_Name"],["team","Teams","Team_Link","team","Team_Name"]]);
        this._id=id;
        if(object==null){
            return;
        }
        
                this._Name_Text=checkInput.checkText(object.Name_Text);
            
        
                this._Phone_Text=checkInput.checkText(object.Phone_Text);
            
        
                this._Email_Text=checkInput.checkText(object.Email_Text);
            
        
        
        this._Gender_Select=checkInput.checkSelect(object.Gender_Select);
        
        this._non_white=checkInput.checkSelect(object.non_white);
        
        
        this._User_Link=checkInput.checkLink(object.User_Link);
        
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
   
        
    get Phone_Text(){
        return this._Phone_Text;
    }
    set Phone_Text(Phone_Text){
            
        this._Phone_Text=checkInput.checkText(Phone_Text);
            
    }
   
        
    get Email_Text(){
        return this._Email_Text;
    }
    set Email_Text(Email_Text){
            
        this._Email_Text=checkInput.checkText(Email_Text);
            
    }
   
   
    get Gender_Select(){
        return this._Gender_Select;
    }
    set Gender_Select(Gender_Select){
            this._Gender_Select=checkInput.checkSelect(Gender_Select);
    }
   
    get non_white(){
        return this._non_white;
    }
    set non_white(non_white){
            this._non_white=checkInput.checkSelect(non_white);
    }
   
   
    get User_Link(){
        return this._User_Link;
    }
    set User_Link(User_Link){
        this._User_Link=checkInput.checkLink(User_Link);
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
        
            "Phone_Text": this._Phone_Text,
        
            "Email_Text": this._Email_Text,
        
        
            "Gender_Select": this._Gender_Select,
        
            "non_white": this._non_white,
        
        
            "User_Link": this._User_Link,
        
            "Team_Link": this._Team_Link,
        
        }
    }
}
module.exports= eir



const checkInput=require('../models/components/checkInput');
const columnNames=require('../models/components/createColumnObjects');

class User {
    constructor(object=null,id=null) {
         // "columnName","displayName","type"
        this._inputColumnNames= columnNames.setColumnNames([["Username_Text","Username","text"],["Name_Text","Name","text"],["Phone_Text","Phone Number","text"],["Email_Text","Email Account","text"],["Password_Text","Password","password"],["Token_Text","Token","token"]]);
        // "columnName","displayName"
        this._metadataColumnNames= columnNames.setMetadata([["Role_Select","Role"]]);
        // "variable name", "displayName","columnName","table","columnValueName" 
        this._referencedColumnNames= columnNames.setReferencedColumnNames([["eir","Eir Name","Eir_Link","eir","Eir_Name"]]);
        this._id=id;
        if(object==null){
            return;
        }
        
                this._Username_Text=checkInput.checkText(object.Username_Text);
            
        
                this._Name_Text=checkInput.checkText(object.Name_Text);
            
        
                this._Phone_Text=checkInput.checkText(object.Phone_Text);
            
        
                this._Email_Text=checkInput.checkText(object.Email_Text);
            
        
                this._Password_Text=checkInput.checkText(object.Password_Text);
            
        
                this._Token_Text=checkInput.checkText(object.Token_Text);
            
        
        
        this._Role_Select=checkInput.checkSelect(object.Role_Select);
        
        
        this._Eir_Link=checkInput.checkLink(object.Eir_Link);
        
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
    
        
    get Username_Text(){
        return this._Username_Text;
    }
    set Username_Text(Username_Text){
            
        this._Username_Text=checkInput.checkText(Username_Text);
            
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
   
        
    get Password_Text(){
        return this._Password_Text;
    }
    set Password_Text(Password_Text){
            
        this._Password_Text=checkInput.checkText(Password_Text);
            
    }
   
        
    get Token_Text(){
        return this._Token_Text;
    }
    set Token_Text(Token_Text){
            
        this._Token_Text=checkInput.checkText(Token_Text);
            
    }
   
   
    get Role_Select(){
        return this._Role_Select;
    }
    set Role_Select(Role_Select){
            this._Role_Select=checkInput.checkSelect(Role_Select);
    }
   
   
    get Eir_Link(){
        return this._Eir_Link;
    }
    set Eir_Link(Eir_Link){
        this._Eir_Link=checkInput.checkLink(Eir_Link);
    }
   
   toJson(){
        return {
        
            "Username_Text": this._Username_Text,
        
            "Name_Text": this._Name_Text,
        
            "Phone_Text": this._Phone_Text,
        
            "Email_Text": this._Email_Text,
        
            "Password_Text": this._Password_Text,
        
            "Token_Text": this._Token_Text,
        
        
            "Role_Select": this._Role_Select,
        
        
            "Eir_Link": this._Eir_Link,
        
        }
    }
}
module.exports= User



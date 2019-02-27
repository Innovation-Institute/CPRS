const checkInput=require('../models/components/checkInput');
const columnNames=require('../models/components/createColumnObjects');

class Funding {
    constructor(object=null,id=null) {
         // "columnName","displayName","type"
        this._inputColumnNames= columnNames.setColumnNames([["Name_Text","Name","text"],["Amount_Received_Text","Amount Received","number"],["Budget_Request_Date_Text","Budget Date","date"],["Budget_Approval_Date_Text","Budget Approval","date"],["Issue_Award_Letter_Date_Text","Issue Award Letter","date"],["Received_Signed_Award_Letter_Date_Text","Received Signed Award Letter","date"],["Award_Begin_Date_Text","Award Begin Date","date"],["Award_End_Date_Text","Award End Date","date"],["Grant_Number_Text","Grant Number","number"],["Internal_Award_Number_Text","Internal Award","text"]]);
        // "columnName","displayName"
        this._metadataColumnNames= columnNames.setMetadata([["Funding_Class_Select","Funding Class"],["Calendar_Year_Select","Calendar Year"],["FY_Select","Fiscal Year"],["Grant_Type_Select","Grant Type"]]);
        // "variable name", "displayName","columnName","table","columnValueName" 
        this._referencedColumnNames= columnNames.setReferencedColumnNames([["events","Events","Event_Link","event","Event_Name"],["teams","Teams","Team_Link","team","Team_Name"]]);
        this._id=id;
        if(object==null){
            return;
        }
        
                this._Name_Text=checkInput.checkText(object.Name_Text);
            
        
                this._Amount_Received_Text=checkInput.checkNumber(object.Amount_Received_Text);
                
        
                this._Budget_Request_Date_Text=checkInput.checkSelect(object.Budget_Request_Date_Text);
                
        
                this._Budget_Approval_Date_Text=checkInput.checkSelect(object.Budget_Approval_Date_Text);
                
        
                this._Issue_Award_Letter_Date_Text=checkInput.checkSelect(object.Issue_Award_Letter_Date_Text);
                
        
                this._Received_Signed_Award_Letter_Date_Text=checkInput.checkSelect(object.Received_Signed_Award_Letter_Date_Text);
                
        
                this._Award_Begin_Date_Text=checkInput.checkSelect(object.Award_Begin_Date_Text);
                
        
                this._Award_End_Date_Text=checkInput.checkSelect(object.Award_End_Date_Text);
                
        
                this._Grant_Number_Text=checkInput.checkNumber(object.Grant_Number_Text);
                
        
                this._Internal_Award_Number_Text=checkInput.checkText(object.Internal_Award_Number_Text);
            
        
        
        this._Funding_Class_Select=checkInput.checkSelect(object.Funding_Class_Select);
        
        this._Calendar_Year_Select=checkInput.checkSelect(object.Calendar_Year_Select);
        
        this._FY_Select=checkInput.checkSelect(object.FY_Select);
        
        this._Grant_Type_Select=checkInput.checkSelect(object.Grant_Type_Select);
        
        
        this._Event_Link=checkInput.checkLink(object.Event_Link);
        
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
   
        
    get Amount_Received_Text(){
        return this._Amount_Received_Text;
    }
    set Amount_Received_Text(Amount_Received_Text){
            
        this._Amount_Received_Text=checkInput.checkText(Amount_Received_Text);
            
    }
   
        
    get Budget_Request_Date_Text(){
        return this._Budget_Request_Date_Text;
    }
    set Budget_Request_Date_Text(Budget_Request_Date_Text){
            
        this._Budget_Request_Date_Text=checkInput.checkSelect(Budget_Request_Date_Text);
            
    }
   
        
    get Budget_Approval_Date_Text(){
        return this._Budget_Approval_Date_Text;
    }
    set Budget_Approval_Date_Text(Budget_Approval_Date_Text){
            
        this._Budget_Approval_Date_Text=checkInput.checkSelect(Budget_Approval_Date_Text);
            
    }
   
        
    get Issue_Award_Letter_Date_Text(){
        return this._Issue_Award_Letter_Date_Text;
    }
    set Issue_Award_Letter_Date_Text(Issue_Award_Letter_Date_Text){
            
        this._Issue_Award_Letter_Date_Text=checkInput.checkSelect(Issue_Award_Letter_Date_Text);
            
    }
   
        
    get Received_Signed_Award_Letter_Date_Text(){
        return this._Received_Signed_Award_Letter_Date_Text;
    }
    set Received_Signed_Award_Letter_Date_Text(Received_Signed_Award_Letter_Date_Text){
            
        this._Received_Signed_Award_Letter_Date_Text=checkInput.checkSelect(Received_Signed_Award_Letter_Date_Text);
            
    }
   
        
    get Award_Begin_Date_Text(){
        return this._Award_Begin_Date_Text;
    }
    set Award_Begin_Date_Text(Award_Begin_Date_Text){
            
        this._Award_Begin_Date_Text=checkInput.checkSelect(Award_Begin_Date_Text);
            
    }
   
        
    get Award_End_Date_Text(){
        return this._Award_End_Date_Text;
    }
    set Award_End_Date_Text(Award_End_Date_Text){
            
        this._Award_End_Date_Text=checkInput.checkSelect(Award_End_Date_Text);
            
    }
   
        
    get Grant_Number_Text(){
        return this._Grant_Number_Text;
    }
    set Grant_Number_Text(Grant_Number_Text){
            
        this._Grant_Number_Text=checkInput.checkText(Grant_Number_Text);
            
    }
   
        
    get Internal_Award_Number_Text(){
        return this._Internal_Award_Number_Text;
    }
    set Internal_Award_Number_Text(Internal_Award_Number_Text){
            
        this._Internal_Award_Number_Text=checkInput.checkText(Internal_Award_Number_Text);
            
    }
   
   
    get Funding_Class_Select(){
        return this._Funding_Class_Select;
    }
    set Funding_Class_Select(Funding_Class_Select){
            this._Funding_Class_Select=checkInput.checkSelect(Funding_Class_Select);
    }
   
    get Calendar_Year_Select(){
        return this._Calendar_Year_Select;
    }
    set Calendar_Year_Select(Calendar_Year_Select){
            this._Calendar_Year_Select=checkInput.checkSelect(Calendar_Year_Select);
    }
   
    get FY_Select(){
        return this._FY_Select;
    }
    set FY_Select(FY_Select){
            this._FY_Select=checkInput.checkSelect(FY_Select);
    }
   
    get Grant_Type_Select(){
        return this._Grant_Type_Select;
    }
    set Grant_Type_Select(Grant_Type_Select){
            this._Grant_Type_Select=checkInput.checkSelect(Grant_Type_Select);
    }
   
   
    get Event_Link(){
        return this._Event_Link;
    }
    set Event_Link(Event_Link){
        this._Event_Link=checkInput.checkLink(Event_Link);
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
        
            "Amount_Received_Text": this._Amount_Received_Text,
        
            "Budget_Request_Date_Text": this._Budget_Request_Date_Text,
        
            "Budget_Approval_Date_Text": this._Budget_Approval_Date_Text,
        
            "Issue_Award_Letter_Date_Text": this._Issue_Award_Letter_Date_Text,
        
            "Received_Signed_Award_Letter_Date_Text": this._Received_Signed_Award_Letter_Date_Text,
        
            "Award_Begin_Date_Text": this._Award_Begin_Date_Text,
        
            "Award_End_Date_Text": this._Award_End_Date_Text,
        
            "Grant_Number_Text": this._Grant_Number_Text,
        
            "Internal_Award_Number_Text": this._Internal_Award_Number_Text,
        
        
            "Funding_Class_Select": this._Funding_Class_Select,
        
            "Calendar_Year_Select": this._Calendar_Year_Select,
        
            "FY_Select": this._FY_Select,
        
            "Grant_Type_Select": this._Grant_Type_Select,
        
        
            "Event_Link": this._Event_Link,
        
            "Team_Link": this._Team_Link,
        
        }
    }
}
module.exports= Funding



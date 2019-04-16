const checkInput=require('../models/components/checkInput');
const columnNames=require('../models/components/createColumnObjects');

class Team {
    constructor(object=null,id=null) {
         // "columnName","displayName","type"
        this._inputColumnNames= columnNames.setColumnNames([["Name_Text","Name","text"],["Description_Text","Description","text"],["Target_Spinout_Date","Target Spinout","date"],["Former_Names_Text","Former Names","text"],["Case_Number_Text","Case Number","text"],["Technology_Description_Helper","Technology Description","text"],["Notes_Text","Notes","text"],["Team_Webpage_External","Team Webpage","text"],["Milestones_Text","Milestones","text"],["Supporting_Docs_External","Supporting Docs","text"]]);
        // "columnName","displayName"
        this._metadataColumnNames= columnNames.setMetadata([["Portfolio_Stage_Select","Portfolio Stage"],["Portfolio_Sub_Stage_Select","Portfolio Sub Stage"],["FY_Launch_Select","FY Launch"]]);
        // "variable name", "displayName","columnName","table","columnValueName" 
        this._referencedColumnNames= columnNames.setReferencedColumnNames([["eirs","EIR","Eir_Link","eir","Eir_Name"],["licensingManagers","Licensing Manager","Licensing_Manager_Link","licensing_manager","Licensing_Manager_Name"],["events","Events","Event_Link","event","Event_Name"],["fundings","Fundings","Funding_Link","funding","Funding_Name"],["members","Members","Member_Link","member","Member_Name"],["teamCategories","Team Category","Team_Category_Link","team_category","Team_Category_Name"]]);
        this._id=id;
        if(object==null){
            return;
        }    
        this._Name_Text=checkInput.checkText(object.Name_Text);
            
        
            
        this._Description_Text=checkInput.checkText(object.Description_Text);
            
        
            
        this._Former_Names_Text=checkInput.checkText(object.Former_Names_Text);
            
        
            
        this._Case_Number_Text=checkInput.checkText(object.Case_Number_Text);
            
        
            
        this._Technology_Description_Helper=checkInput.checkText(object.Technology_Description_Helper);
            
        
            
        this._Notes_Text=checkInput.checkText(object.Notes_Text);
            
        
            
        this._Team_Webpage_External=checkInput.checkText(object.Team_Webpage_External);
            
        
            
        this._Milestones_Text=checkInput.checkText(object.Milestones_Text);
            
        
            
        this._Supporting_Docs_External=checkInput.checkText(object.Supporting_Docs_External);

        this._Target_Spinout_Date=checkInput.checkSelect(object.Target_Spinout_Date);
            
        
        
        this._Portfolio_Stage_Select=checkInput.checkSelect(object.Portfolio_Stage_Select);
        
        this._Portfolio_Sub_Stage_Select=checkInput.checkSelect(object.Portfolio_Sub_Stage_Select);
        
        this._FY_Launch_Select=checkInput.checkSelect(object.FY_Launch_Select);
        
        
        this._Eir_Link=checkInput.checkLink(object.Eir_Link);
        
        this._Licensing_Manager_Link=checkInput.checkLink(object.Licensing_Manager_Link);
        
        this._Event_Link=checkInput.checkLink(object.Event_Link);
        
        this._Funding_Link=checkInput.checkLink(object.Funding_Link);
        
        this._Member_Link=checkInput.checkLink(object.Member_Link);
        
        this._Team_Category_Link=checkInput.checkLink(object.Team_Category_Link);
        
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
   
        
    get Description_Text(){
        return this._Description_Text;
    }
    set Description_Text(Description_Text){
            
        this._Description_Text=checkInput.checkText(Description_Text);
            
    }
   
    get Target_Spinout_Date(){
        return this._Target_Spinout_Date;
    }
    set Target_Spinout_Date(Target_Spinout_Date){
        this._Target_Spinout_Date=checkInput.checkSelect(Target_Spinout_Date);
    }

    get Former_Names_Text(){
        return this._Former_Names_Text;
    }
    set Former_Names_Text(Former_Names_Text){
            
        this._Former_Names_Text=checkInput.checkText(Former_Names_Text);
            
    }
   
        
    get Case_Number_Text(){
        return this._Case_Number_Text;
    }
    set Case_Number_Text(Case_Number_Text){
            
        this._Case_Number_Text=checkInput.checkText(Case_Number_Text);
            
    }
   
        
    get Technology_Description_Helper(){
        return this._Technology_Description_Helper;
    }
    set Technology_Description_Helper(Technology_Description_Helper){
            
        this._Technology_Description_Helper=checkInput.checkText(Technology_Description_Helper);
            
    }
   
        
    get Notes_Text(){
        return this._Notes_Text;
    }
    set Notes_Text(Notes_Text){
            
        this._Notes_Text=checkInput.checkText(Notes_Text);
            
    }
   
        
    get Team_Webpage_External(){
        return this._Team_Webpage_External;
    }
    set Team_Webpage_External(Team_Webpage_External){
            
        this._Team_Webpage_External=checkInput.checkText(Team_Webpage_External);
            
    }
   
        
    get Milestones_Text(){
        return this._Milestones_Text;
    }
    set Milestones_Text(Milestones_Text){
            
        this._Milestones_Text=checkInput.checkText(Milestones_Text);
            
    }
   
        
    get Supporting_Docs_External(){
        return this._Supporting_Docs_External;
    }
    set Supporting_Docs_External(Supporting_Docs_External){
            
        this._Supporting_Docs_External=checkInput.checkText(Supporting_Docs_External);
            
    }
   
   
    get Portfolio_Stage_Select(){
        return this._Portfolio_Stage_Select;
    }
    set Portfolio_Stage_Select(Portfolio_Stage_Select){
            this._Portfolio_Stage_Select=checkInput.checkSelect(Portfolio_Stage_Select);
    }
   
    get Portfolio_Sub_Stage_Select(){
        return this._Portfolio_Sub_Stage_Select;
    }
    set Portfolio_Sub_Stage_Select(Portfolio_Sub_Stage_Select){
            this._Portfolio_Sub_Stage_Select=checkInput.checkSelect(Portfolio_Sub_Stage_Select);
    }
   
    get FY_Launch_Select(){
        return this._FY_Launch_Select;
    }
    set FY_Launch_Select(FY_Launch_Select){
            this._FY_Launch_Select=checkInput.checkSelect(FY_Launch_Select);
    }
   
   
    get Eir_Link(){
        return this._Eir_Link;
    }
    set Eir_Link(Eir_Link){
        this._Eir_Link=checkInput.checkLink(Eir_Link);
    }
   
    get Licensing_Manager_Link(){
        return this._Licensing_Manager_Link;
    }
    set Licensing_Manager_Link(Licensing_Manager_Link){
        this._Licensing_Manager_Link=checkInput.checkLink(Licensing_Manager_Link);
    }
   
    get Event_Link(){
        return this._Event_Link;
    }
    set Event_Link(Event_Link){
        this._Event_Link=checkInput.checkLink(Event_Link);
    }
   
    get Funding_Link(){
        return this._Funding_Link;
    }
    set Funding_Link(Funding_Link){
        this._Funding_Link=checkInput.checkLink(Funding_Link);
    }
   
    get Member_Link(){
        return this._Member_Link;
    }
    set Member_Link(Member_Link){
        this._Member_Link=checkInput.checkLink(Member_Link);
    }
   
    get Team_Category_Link(){
        return this._Team_Category_Link;
    }
    set Team_Category_Link(Team_Category_Link){
        this._Team_Category_Link=checkInput.checkLink(Team_Category_Link);
    }
   
   toJson(){
        return {
        
            "Name_Text": this._Name_Text,
        
            "Description_Text": this._Description_Text,
        
            "Former_Names_Text": this._Former_Names_Text,
        
            "Case_Number_Text": this._Case_Number_Text,

            "Target_Spinout_Date": this._Target_Spinout_Date,
        
            "Technology_Description_Helper": this._Technology_Description_Helper,
        
            "Notes_Text": this._Notes_Text,
        
            "Team_Webpage_External": this._Team_Webpage_External,
        
            "Milestones_Text": this._Milestones_Text,
        
            "Supporting_Docs_External": this._Supporting_Docs_External,
        
        
            "Portfolio_Stage_Select": this._Portfolio_Stage_Select,
        
            "Portfolio_Sub_Stage_Select": this._Portfolio_Sub_Stage_Select,
        
            "FY_Launch_Select": this._FY_Launch_Select,
        
        
            "Eir_Link": this._Eir_Link,
        
            "Licensing_Manager_Link": this._Licensing_Manager_Link,
        
            "Event_Link": this._Event_Link,
        
            "Funding_Link": this._Funding_Link,
        
            "Member_Link": this._Member_Link,
        
            "Team_Category_Link": this._Team_Category_Link,
        
        }
    }
}
module.exports=Team



const checkInput=require('../models/components/checkInput');
const columnNames=require('../models/components/createColumnObjects');

class Event {
    constructor(object=null,id=null) {
         // "columnName","displayName","type"
        this._inputColumnNames= columnNames.setColumnNames([["Name_Text","Name","text"],["Start_Date_Text","Start Date","date"],["End_Date_Text","End Date","date"],["Event_Date_Text","Event Date","date"],["App_Deadline_Text","Application Deadline","date"],["First_Prize_Text","First Prize Amount","number"],["Second_Prize_Text","Second Prize Amount","number"],["Third_Prize_Text","Third Prize Amount","number"],["Participant_Prize_Text","Participant Prize Amount","number"],["Notes_Text","Notes","text"],["Judge_Text","Judge Details/Response","text"]]);
        // "columnName","displayName"
        this._metadataColumnNames= columnNames.setMetadata([["Calendar_Year_Select","Calendar Year"]]);
        // "variable name", "displayName","columnName","table","columnValueName" 
        this._referencedColumnNames= columnNames.setReferencedColumnNames([["firstPlace","First Place Team","First_Place_Link","team","First_Place_Name"],["secondPlace","Second Place Team","Second_Place_Link","team","Second_Place_Name"],["thirdPlace","Third Place Team","Third_Place_Link","team","Third_Place_Name"],["teams","Teams","Team_Link","team","Team_Name"],["fundings","Fundings","Funding_Link","funding","Funding_Name"]]);
        this._id=id;
        if(object==null){
            return;
        }
        
                this._Name_Text=checkInput.checkText(object.Name_Text);
            
        
                this._Start_Date_Text=checkInput.checkSelect(object.Start_Date_Text);
                
        
                this._End_Date_Text=checkInput.checkSelect(object.End_Date_Text);
                
        
                this._Event_Date_Text=checkInput.checkSelect(object.Event_Date_Text);
                
        
                this._App_Deadline_Text=checkInput.checkSelect(object.App_Deadline_Text);
                
        
                this._First_Prize_Text=checkInput.checkNumber(object.First_Prize_Text);
                
        
                this._Second_Prize_Text=checkInput.checkNumber(object.Second_Prize_Text);
                
        
                this._Third_Prize_Text=checkInput.checkNumber(object.Third_Prize_Text);
                
        
                this._Participant_Prize_Text=checkInput.checkNumber(object.Participant_Prize_Text);
                
        
                this._Notes_Text=checkInput.checkText(object.Notes_Text);
            
        
                this._Judge_Text=checkInput.checkText(object.Judge_Text);
            
        
        
        this._Calendar_Year_Select=checkInput.checkSelect(object.Calendar_Year_Select);
        
        
        this._First_Place_Link=checkInput.checkLink(object.First_Place_Link);
        
        this._Second_Place_Link=checkInput.checkLink(object.Second_Place_Link);
        
        this._Third_Place_Link=checkInput.checkLink(object.Third_Place_Link);
        
        this._Team_Link=checkInput.checkLink(object.Team_Link);
        
        this._Funding_Link=checkInput.checkLink(object.Funding_Link);
        
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
   
        
    get Start_Date_Text(){
        return this._Start_Date_Text;
    }
    set Start_Date_Text(Start_Date_Text){
            
        this._Start_Date_Text=checkInput.checkSelect(Start_Date_Text);
            
    }
   
        
    get End_Date_Text(){
        return this._End_Date_Text;
    }
    set End_Date_Text(End_Date_Text){
            
        this._End_Date_Text=checkInput.checkSelect(End_Date_Text);
            
    }
   
        
    get Event_Date_Text(){
        return this._Event_Date_Text;
    }
    set Event_Date_Text(Event_Date_Text){
            
        this._Event_Date_Text=checkInput.checkSelect(Event_Date_Text);
            
    }
   
        
    get App_Deadline_Text(){
        return this._App_Deadline_Text;
    }
    set App_Deadline_Text(App_Deadline_Text){
            
        this._App_Deadline_Text=checkInput.checkSelect(App_Deadline_Text);
            
    }
   
        
    get First_Prize_Text(){
        return this._First_Prize_Text;
    }
    set First_Prize_Text(First_Prize_Text){
            
        this._First_Prize_Text=checkInput.checkText(First_Prize_Text);
            
    }
   
        
    get Second_Prize_Text(){
        return this._Second_Prize_Text;
    }
    set Second_Prize_Text(Second_Prize_Text){
            
        this._Second_Prize_Text=checkInput.checkText(Second_Prize_Text);
            
    }
   
        
    get Third_Prize_Text(){
        return this._Third_Prize_Text;
    }
    set Third_Prize_Text(Third_Prize_Text){
            
        this._Third_Prize_Text=checkInput.checkText(Third_Prize_Text);
            
    }
   
        
    get Participant_Prize_Text(){
        return this._Participant_Prize_Text;
    }
    set Participant_Prize_Text(Participant_Prize_Text){
            
        this._Participant_Prize_Text=checkInput.checkText(Participant_Prize_Text);
            
    }
   
        
    get Notes_Text(){
        return this._Notes_Text;
    }
    set Notes_Text(Notes_Text){
            
        this._Notes_Text=checkInput.checkText(Notes_Text);
            
    }
   
        
    get Judge_Text(){
        return this._Judge_Text;
    }
    set Judge_Text(Judge_Text){
            
        this._Judge_Text=checkInput.checkText(Judge_Text);
            
    }
   
   
    get Calendar_Year_Select(){
        return this._Calendar_Year_Select;
    }
    set Calendar_Year_Select(Calendar_Year_Select){
            this._Calendar_Year_Select=checkInput.checkSelect(Calendar_Year_Select);
    }
   
   
    get First_Place_Link(){
        return this._First_Place_Link;
    }
    set First_Place_Link(First_Place_Link){
        this._First_Place_Link=checkInput.checkLink(First_Place_Link);
    }
   
    get Second_Place_Link(){
        return this._Second_Place_Link;
    }
    set Second_Place_Link(Second_Place_Link){
        this._Second_Place_Link=checkInput.checkLink(Second_Place_Link);
    }
   
    get Third_Place_Link(){
        return this._Third_Place_Link;
    }
    set Third_Place_Link(Third_Place_Link){
        this._Third_Place_Link=checkInput.checkLink(Third_Place_Link);
    }
   
    get Team_Link(){
        return this._Team_Link;
    }
    set Team_Link(Team_Link){
        this._Team_Link=checkInput.checkLink(Team_Link);
    }
   
    get Funding_Link(){
        return this._Funding_Link;
    }
    set Funding_Link(Funding_Link){
        this._Funding_Link=checkInput.checkLink(Funding_Link);
    }
   
   toJson(){
        return {
        
            "Name_Text": this._Name_Text,
        
            "Start_Date_Text": this._Start_Date_Text,
        
            "End_Date_Text": this._End_Date_Text,
        
            "Event_Date_Text": this._Event_Date_Text,
        
            "App_Deadline_Text": this._App_Deadline_Text,
        
            "First_Prize_Text": this._First_Prize_Text,
        
            "Second_Prize_Text": this._Second_Prize_Text,
        
            "Third_Prize_Text": this._Third_Prize_Text,
        
            "Participant_Prize_Text": this._Participant_Prize_Text,
        
            "Notes_Text": this._Notes_Text,
        
            "Judge_Text": this._Judge_Text,
        
        
            "Calendar_Year_Select": this._Calendar_Year_Select,
        
        
            "First_Place_Link": this._First_Place_Link,
        
            "Second_Place_Link": this._Second_Place_Link,
        
            "Third_Place_Link": this._Third_Place_Link,
        
            "Team_Link": this._Team_Link,
        
            "Funding_Link": this._Funding_Link,
        
        }
    }
}
module.exports= Event



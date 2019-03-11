const checkInput=require('../models/components/checkInput');
const columnNames=require('../models/components/createColumnObjects');

class Member {
    constructor(member=null,id=null) {
            // "columnName","displayName","type"
            this._inputColumnNames= columnNames.setColumnNames([["Name_Text","Name","text"],["Last_Name_Text","Last Name","text"],["First_Name_Text","First Name","text"],["Phone_Text","Phone","text"],["Email_Text","Email","email"],["Last_Served","Last Served","text"],["Comments_Text","Comments","text"],["Personal_Website_External","Personal Website","text"]]);
            // "columnName","displayName"
            this._metadataColumnNames= columnNames.setMetadata([["Role_Select","Role"],["Role_Within_Univ_Select","Role within university"],["Gender_Select","Gender Select"],["Non_White_Select","Non White"],["Disability_Select","Disability"],["Veteran_Select","Veteran"],["Non_National_Select","Non National"],["Year_First_Participated_Select","Year First Participated"],["Fourth_Gear_Role_Select","4th Gear Role"]]);
            // "variable name", "displayName","columnName","table","columnValueName" 
            this._referencedColumnNames= columnNames.setReferencedColumnNames([["teams","Teams","Team_Link","team","Team_Name"],["departmentCompanies","Department Company","Department_Company_Link","department_company","Department_Company_Name"]]);
            // removed ,["events", "Member Data for Specific Event", "Event_Specific_Link", "event","Event_Specific_Name"]
            this._id=id;
            if(member==null){
                return;
            }
            this._Name_Text = checkInput.checkText(member.Name_Text);
            this._Last_Name_Text = checkInput.checkText(member.Last_Name_Text);
            this._Comments_Text=checkInput.checkText(member.Comments_Text);
            this._First_Name_Text=checkInput.checkText(member.First_Name_Text);
            this._Phone_Text=checkInput.checkText(member.Phone_Text);
            this._Email_Text=checkInput.checkText(member.Email_Text);
            this._Last_Served=checkInput.checkText(member.Last_Served);
            this._Personal_Website_External=checkInput.checkText(member.Personal_Website_External);
            this._Role_Select=checkInput.checkSelect(member.Role_Select);
            this._Role_Within_Univ_Select=checkInput.checkSelect(member.Role_Within_Univ_Select);
            this._Gender_Select=checkInput.checkSelect(member.Gender_Select);
            this._Non_White_Select=checkInput.checkSelect(member.Non_White_Select);
            this._Disability_Select=checkInput.checkSelect(member.Disability_Select);
            this._Veteran_Select=checkInput.checkSelect(member.Veteran_Select);
            this._Non_National_Select=checkInput.checkSelect(member.Non_National_Select);
            this._Fourth_Gear_Role_Select=checkInput.checkSelect(member.Fourth_Gear_Role_Select);
            this._Year_First_Participated_Select=checkInput.checkSelect(member.Year_First_Participated_Select);
            this._Team_Link=checkInput.checkLink(member.Team_Link);
            this._Department_Company_Link=checkInput.checkLink(member.Department_Company_Link);
          //  this._Event_Specific_Link=checkInput.checkLink(member.Event_Specific_Link);
    }
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
    set Name_Text(Name_Text){
        this._Name_Text=checkInput.checkText(Name_Text);
    }
    get Name_Text(){
        return this._Name_Text;
    }
    set Last_Name_Text(Last_Name_Text){
        this._Last_Name_Text=checkInput.checkText(Last_Name_Text);
    }
    get Last_Name_Text(){
        return this._Last_Name_Text;
    }
    set First_Name_Text(First_Name_Text){
        this._First_Name_Text=checkInput.checkText(First_Name_Text);
    }
    get First_Name_Text(){
        return this._First_Name_Text;
    }
    set Phone_Text(Phone_Text){
        this._Phone_Text=checkInput.checkNumber(Phone_Text);
    }
    get Phone_Text(){
        return this._Phone_Text;
    }
    set Email_Text(Email_Text){
        this._Email_Text=checkInput.checkText(Email_Text);
    }
    get Email_Text(){
        return this._Email_Text;
    }
    set Last_Served(Last_Served){
        this._Last_Served=checkInput.checkText(Last_Served);
    }
    get Last_Served(){
        return this._Last_Served;
    }
    set Comments_Text(Comments_Text){
        this._Comments_Text=checkInput.checkText(Comments_Text);
    }
    get Comments_Text(){
        return this._Comments_Text;
    }
    set Personal_Website_External(Personal_Website_External){
        this._Personal_Website_External=checkInput.checkText(Personal_Website_External);
    }
    get Personal_Website_External(){
        return this._Personal_Website_External;
    }
    get Role_Select(){
        return this._Role_Select;
    }
    set Role_Select(Role_Select){
        this._Role_Select=checkInput.checkSelect(Role_Select);
    }
    get Role_Within_Univ_Select(){
        return this._Role_Within_Univ_Select;
    }
    set Role_Within_Univ_Select(Role_Within_Univ_Select){
        this._Role_Within_Univ_Select=checkInput.checkSelect(Role_Within_Univ_Select);
    }
    get Gender_Select(){
        return this._Gender_Select;
    }
    set Gender_Select(Gender_Select){
        this._Gender_Select=checkInput.checkSelect(Gender_Select);
    }
    get Non_White_Select(){
        return this._Non_White_Select;
    }
    set Non_White_Select(Non_White_Select){
        this._Non_White_Select=checkInput.checkSelect(Non_White_Select);
    }
    get Disability_Select(){
        return this._Disability_Select;
    }
    set Disability_Select(Disability_Select){
        this._Disability_Select=checkInput.checkSelect(Disability_Select);
    }
    get Veteran_Select(){
        return this._Veteran_Select;
    }
    set Veteran_Select(Veteran_Select){
        this._Veteran_Select=checkInput.checkSelect(Veteran_Select);
    }
    get Non_National_Select(){
        return this._Non_National_Select;
    }
    set Non_National_Select(Non_National_Select){
        this._Non_National_Select=checkInput.checkSelect(Non_National_Select);
    }
    get Fourth_Gear_Role_Select(){
        return this._Fourth_Gear_Role_Select;
    }
    set Fourth_Gear_Role_Select(Fourth_Gear_Role_Select){
        this._Fourth_Gear_Role_Select=checkInput.checkSelect(Fourth_Gear_Role_Select);
    }
    get Year_First_Participated_Select(){
        return this._Year_First_Participated_Select;
    }
    set Year_First_Participated_Select(Year_First_Participated_Select){
        this._Year_First_Participated_Select=checkInput.checkSelect(Year_First_Participated_Select);
    }
    get Team_Link(){
        return this._Team_Link;
    }
    set Team_Link(Team_Link){
        this._Team_Link=checkInput.checkLink(Team_Link);
    }
    get Department_Company_Link(){
        return this._Department_Company_Link;
    }
    set Department_Company_Link(Department_Company_Link){
        this._Department_Company_Link=checkInput.checkLink(Department_Company_Link);
    }
   /* get Event_Specific_Link(){
        return this._Event_Specific_Link;
    }
    set Event_Specific_Link(Event_Specific_Link){
        this._Event_Specific_Link=checkInput.checkLink(Event_Specific_Link);
    }
    */

    toJson(){
        return {
            "Name_Text": this._Name_Text,
           // "Event_Specific_Link": this._Event_Specific_Link,
            "Last_Name_Text": this._Last_Name_Text,
            "Comments_Text": this._Comments_Text,
            "First_Name_Text": this._First_Name_Text,
            "Phone_Text": this._Phone_Text,
            "Email_Text": this._Email_Text,
            "Last_Served": this._Last_Served,
            "Personal_Website_External": this._Personal_Website_External,
            "Role_Select": this._Role_Select,
            "Role_Within_Univ_Select": this._Role_Within_Univ_Select,
            "Gender_Select": this._Gender_Select,
            "Non_White_Select": this._Non_White_Select,
            "Disability_Select": this._Disability_Select,
            "Veteran_Select": this._Veteran_Select,
            "Non_National_Select":this._Non_National_Select,
            "Fourth_Gear_Role_Select": this._Fourth_Gear_Role_Select,
            "Year_First_Participated_Select": this._Year_First_Participated_Select,
            "Team_Link": this._Team_Link,
            "Department_Company_Link": this._Department_Company_Link
        }
    }

}
module.exports= Member;
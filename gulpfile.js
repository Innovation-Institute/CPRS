const { task } = require('gulp');
const { src,dest } = require('gulp');
const template = require('gulp-template');
const rename = require('gulp-rename');

/**
 * Below is some sample data which can be used for the airtable model and controller generation
 */

// "columnName","displayName","type"
inputColumnNames= [
  ["Username_Text","Username","text"],
  ["Name_Text","Name","text"],
  ["Phone_Text","Phone Number","text"],
  ["Email_Text","Email Account","text"],
  ["Password_Text","Password","password"],
  ["Token_Text","Token","token"]
  ];
  
  // "columnName","displayName"
  metadataColumnNames= [
    ["Role_Select","Role"]
  ];
  // "variable name", "displayName","columnName","table","columnValueName"
  referencedColumnNames= [
    ["eir","Eir Name","Eir_Link","eir","Eir_Name"]
];
  


  table="ii_user";


  tableUrl="ii_users";


  model="User";
  modelFilename="ii_user";
  controllerFilename="UsersController"
  routerFilename="ii_users";

task('build-model', function(cb) {
  console.log(`Building a Model-> ${model}`);
  src('bake/model/model.tmpl.js')
  .pipe(template({model: model,
                  inputColumnNames: inputColumnNames,
                  metadataColumnNames: metadataColumnNames,
                  referencedColumnNames: referencedColumnNames}))
  .pipe(rename({
    basename: modelFilename,
    extname: ".js"
  }))
  .pipe(dest('baked/model/'));
  cb();
});

task('build-controller', function(cb) {
  console.log(`Building a Controller-> ${model}`);
  src('bake/controller/controller.tmpl.js')
  .pipe(template({model: model,
                  table: table,
                  tableUrl:tableUrl,
                  inputColumnNames: inputColumnNames,
                  metadataColumnNames: metadataColumnNames,
                  referencedColumnNames: referencedColumnNames}))
  .pipe(rename({
    basename: controllerFilename,
    extname: ".js"
  }))
  .pipe(dest('baked/controller/'));

  cb();
});

task('build-router', function(cb) {
  console.log(`Building a Router-> ${model}`);
  src('bake/route/route.tmpl.js')
  .pipe(template({controllerFilename: controllerFilename}))
  .pipe(rename({
    basename: routerFilename,
    extname: ".js"
  }))
  .pipe(dest('baked/route/'));
  cb();
});




/***
 * IGNORE BElOW DATA, 
 * 
 * 
 * 
 */

 /**
  * 
// "columnName","displayName","type"
inputColumnNames= [["Name_Text","Name","text"],["Last_Name_Text","Last Name","text"],["First_Name_Text","First Name","text"],["Phone_Text","Phone","text"],["Email_Text","Email","email"],["Last_Served","Last Served","text"],["Comments_Text","Comments","text"],["Personal_Website_External","Personal Website","text"]];
  
  // "columnName","displayName"
metadataColumnNames= [["Role_Select","Role"],["Role_Within_Univ_Select","Role within university"],["Gender_Select","Gender Select"],["Non_White_Select","Non White"],["Disability_Select","Disability"],["Veteran_Select","Veteran"],["Non_National_Select","Non National"],["Year_First_Participated_Select","Year First Participated"],["Fourth_Gear_Role_Select","4th Gear Role"]];
  // "variable name", "displayName","columnName","table","columnValueName"
referencedColumnNames= [["teams","Teams","Team_Link","team","Team_Name"],["departmentCompanies","Department Company","Department_Company_Link","department_company","Department_Company_Name"],["events", "Member Data for Specfic Event", "Event_Specific_Link", "event","Event_Specfic_Name"]];
  


table="member";


tableUrl="members";


model="Member";
modelFilename="member.js";

controllerFilename="MembersController.js"
  */


/** 
// "columnName","displayName","type"
inputColumnNames=[["Name_Text","Name","text"],
["Description_Text","Description","text"],
["Former_Names_Text","Former Names","text"],
["Case_Number_Text","Case Number","text"],
["Technology_Description_Helper","Technology Description","text"],
["Notes_Text","Notes","text"],
["Team_Webpage_External","Team Webpage","text"],
["Milestones_Text","Milestones","text"],
["Supporting_Docs_External","Supporting Docs","text"]];
// "columnName","displayName"
metadataColumnNames=[["Portfolio_Stage_Select","Portfolio Stage"],
["Portfolio_Sub_Stage_Select","Portfolio Stage"],
["FY_Launch_Select","FY Launch"]];
// "variable name", "displayName","columnName","table","columnValueName" 
referencedColumnNames=[["eirs","EIR","Eir_Link","eir","Eir_Name"],
["licensingManagers","Licensing Manager","Licensing_Manager_Link","licensing_manager","Licensing_Manager_Name"],
["events","Events","Event_Link","event","Event_Name"],
["fundings","Fundings","Funding_Link","funding","Funding_Name"],
["members","Members","Member_Link","member","Member_Name"],
["teamCategories","Team Category","Team_Category_Link","team_category","Team_Category_Name"]];

table="team";

tableUrl="teams";

model="Team";

modelFilename="team.js";

controllerFilename="TeamsController.js"
*/
/*
// "columnName","displayName","type"
inputColumnNames= [["Name_Text","Name","text"],["Amount_Received_Text","Amount Received","number"],["Budget_Request_Date_Text","Budget Date","date"],["Budget_Approval_Date_Text","Budget Approval","date"],["Issue_Award_Letter_Date_Text","Issue Award Letter","date"],["Received_Signed_Award_Letter_Date_Text","Received Signed Award Letter","date"],["Award_Begin_Date_Text","Award Begin Date","date"],["Award_End_Date_Text","Award End Date","date"],["Grant_Number_Text","Grant Number","number"],["Internal_Award_Number_Text","Internal Award","text"]];
  
  // "columnName","displayName"
metadataColumnNames= [["Funding_Class_Select","Funding Class"],["Calendar_Year_Select","Calendar Year"],["FY_Select","Fiscal Year"],["Grant_Type_Select","Grant Type"]];
  // "variable name", "displayName","columnName","table","columnValueName"
referencedColumnNames= [["events","Events","Event_Link","event","Event_Name"],["teams","Teams","Team_Link","team","Team_Name"]];
  


  table="funding";


  tableUrl="fundings";


  model="Funding";
  modelFilename="funding.js";

  controllerFilename="FundingsController.js"


// "columnName","displayName","type"
inputColumnNames= [
  ["Name_Text","Name","text"]
  ];
  
  // "columnName","displayName"
  metadataColumnNames= [
    ["Part_Of_The_University_Select","Part of the University"],
    ["Year_First_Represented_Select","Year First Represented"]
  ];
  // "variable name", "displayName","columnName","table","columnValueName"
  referencedColumnNames= [
    ["members","Members","Member_Link","member","Member_Name"]  
];
  


  table="department_company";


  tableUrl="department_companys";


  model="department_company";
  modelFilename="department_company";
  controllerFilename="DepartmentCompanysController"
  routerFilename="department_companys";

// "columnName","displayName","type"
inputColumnNames= [
  ["Name_Text","Name","text"],
  ["Phone_Text","Phone Number","text"],
  ["Email_Text","Email Account","text"],

  ];
  
  // "columnName","displayName"
  metadataColumnNames= [
    ["Gender_Select","Gender"],
    ["non_white","Non White"],
  ];
  // "variable name", "displayName","columnName","table","columnValueName"
  referencedColumnNames= [
    ["user","User Account","User_Link","ii_user","User_Name"],
    ["team","Teams","Team_Link","team","Team_Name"]
];
  


  table="eir";


  tableUrl="eirs";


  model="eir";
  modelFilename="eir";
  controllerFilename="EirsController"
  routerFilename="eirs";
*/
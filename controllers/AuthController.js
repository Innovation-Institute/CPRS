var bcrypt = require('bcrypt');
const async=require('async');
const airtable= require('../models/airtable');
const checkInput=require('../controllers/components/checkInput');
const App=require('../controllers/AppController');
const AppController=new App();
const saltRounds = 10;
/**
 * Check if authenticated
 */

exports.isAuthenticated = async function(req,res){
    return;
}
/**
 * Sign Up Page
 * 
 */
exports.signup = async function(req,res){
    res.render('user/login.ejs');
}
/**
 * Create a New Account -> Get Request
 * 
 */
exports.createAccount = async function(req,res){
    res.render('user/signup.ejs');
}
/**
 * Compare hashed passwords with password entered.
 * 
 */
exports.signin = async function(req,res){
    
    searchValue=req.body.username;
    searchCondition='OR(FIND("'+searchValue+'",{Username_Text})>=1,FIND("'+searchValue+'",{Email_Text})>=1)'

    async.parallel({
        recordFound: async.apply(airtable.filteredRecords, "ii_user", searchCondition)  
      },
      function(err,results){
          if(results["recordFound"]==[]){
            res.render('user/login.ejs',{
                authenticated: false
            });
            return;
          }
          currentUser=results["recordFound"][0].record
          console.log(currentUser.Password_Text);
        bcrypt.compare(req.body.password, currentUser.Password_Text, function (err, authenticated) {
            if(authenticated){
                req.session.user=currentUser;
                AppController.index(req,res);
                /*res.render('index.ejs',{
                    user: req.session.user,
                    password: req.body.password
                });*/
            }else{
                res.render('user/login.ejs',{
                    authenticated: false
                });
            }
            
            });
        })
}
/**
 * Add a new user, send it to the AirTable database.
 * 
 */
exports.addUser = async function(req,res){

    async.parallel({
      hash: async.apply(bcrypt.hash, req.body.Password_Text, 10)  
    },function(err,results){
        console.log(results);
        newRecord={
            "Username_Text": checkInput.checkText(req.body["Username_Text"]),
            "Name_Text": checkInput.checkText(req.body["Name_Text"]),
            "Email_Text": checkInput.checkText(req.body["Email_Text"]),
            "Password_Text": checkInput.checkText(results["hash"]),
            "Phone_Text": checkInput.checkText(req.body["Phone_Text"]),
            "Role_Select": checkInput.checkSelect(req.body["Role_Select"])
        };
        airtable.createRecord("ii_user",newRecord,function(err,new_record){
            /* res.redirect('/teams/edit/'+id); */
            if(err) throw err;
            res.render('user/signup.ejs',{
                Name_Text: req.body["Name_Text"]
            });
        });
    });
}

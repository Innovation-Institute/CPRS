const bcrypt = require('bcrypt');
const async=require('async');
const airtable= require('../models/airtable');
const checkInput=require('../controllers/components/checkInput');
const AppController=require('../controllers/AppController');
const saltRounds = 10;

class AuthController extends AppController{
    /**
     * Check if authenticated
     */
    isAuthenticated(req,res){
        return;
    }
    /**
     * Sign Up Page
     * 
     */
    signup(req,res){
        res.render('user/login.ejs');
    }
    /**
     * Create a New Account -> Get Request
     * 
     */
    createAccount(req,res){
        res.render('user/signup.ejs');
    }
    /**
     * Compare hashed passwords with password entered.
     * 
     */
    signin(req,res,next){
        
        let searchValue=req.body.username;
        let searchCondition='OR(FIND("'+searchValue+'",{Username_Text})>=1,FIND("'+searchValue+'",{Email_Text})>=1)';
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
            let currentUser=results["recordFound"][0].record
            console.log(currentUser.Password_Text);
            bcrypt.compare(req.body.password, currentUser.Password_Text, function (err, authenticated) {
                if(authenticated){
                    req.session.user=currentUser;
                    next();
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
    addUser(req,res){

        async.parallel({
        hash: async.apply(bcrypt.hash, req.body.Password_Text, saltRounds)  
        },function(err,results){
            console.log(results);
            let newRecord={
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

}
module.exports=AuthController;
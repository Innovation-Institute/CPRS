const bcrypt = require('bcrypt');
const async=require('async');
const airtable= require('../models/airtable');
const checkInput=require('../models/components/checkInput');
const AppController=require('../controllers/AppController');
const nodemailer=require('nodemailer');
const crypto = require('crypto');
const saltRounds = 10;

class AuthController extends AppController{
    /**
     * Check if authenticated
     */
    isAuthenticated(req,res,next){
        if(req.session.user){
            next();
        }
        else{
            res.render('user/login.ejs');
        }
    }
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    logout(req,res){
        req.session.destroy(function(err){
            res.render('user/login.ejs');
        });
        
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
            if(typeof results["recordFound"][0]=="undefined"){
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
                    /*
                        res.render('index.ejs',{
                            user: req.session.user,
                            password: req.body.password
                        });
                    */
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
    /** 
     * 
     * @param {Request} req 
     * @param {Response} res 
     * 
     **/
    forgotAccount(req,res){
        res.render('user/forgot.ejs');
    }
    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * 
     **/
    setNewPassword(req,res){
        let email=req.body.username;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: 'cprsemailtester@gmail.com',
                   pass: 'Test@123'
               }
           });
           async.waterfall([
            function(done) {
              crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
              });
            },
            function(token, done){
                let searchCondition='OR(FIND("'+email+'",{Username_Text})>=1,FIND("'+email+'",{Email_Text})>=1)';
                airtable.filteredRecords("ii_user", searchCondition,function(err,records){
                    if(typeof records[0]=="undefined"){
                        res.render('user/forgot.ejs',{
                            err: "invalidEmail"
                        });
                        return;
                    }
                    let recordId=records[0].id;
                    let record=records[0].record
                    airtable.updateRecord("ii_user",{"Token_Text" : token },recordId,function(user){
                        done(err, token, record);
                    });
                });
            },
            function(token, user, done) {
        let mailOptions = {
              to: user["Email_Text"],
              from: 'cprsemailtester@gmail.com',
              subject: 'Node.js Password Reset',
              text: `You have asked for a password reset Please click on the following link, or paste this into your browser to complete the process:\n\n +
              http://${req.headers.host}/users/reset/${token}`
            };
            transporter.sendMail(mailOptions, function(err) {
              res.render('user/forgot.ejs',{
                err: "success"
              });
            });
        
    }]);
    }
    resetPassword(req,res){
        let token=req.params.token;
            let searchCondition=`AND(FIND("${token}",{Token_Text})>=1,LEN(Token_Text)=LEN("${token}"))`;
            airtable.filteredRecords("ii_user", searchCondition,function(err,records){
                if(typeof records[0]=="undefined"){
                    res.render('user/forgot.ejs',{
                        err: "invalidUrl"
                    });
                    return;
                }
                res.render('user/reset.ejs',{
                    token: token
                });
            });
            

    }

    resetPasswordPost(req,res){
        let token=req.params.token;
        let newPassword= req.body.password;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: 'cprsemailtester@gmail.com',
                   pass: 'Test@123'
               }
           });
           async.waterfall([
                 function(done){
                    let searchCondition='OR(FIND("'+token+'",{Token_Text})>=1)';
                    airtable.filteredRecords("ii_user", searchCondition,function(err,records){
                        if(typeof records[0]=="undefined"){
                            res.render('user/forgot.ejs',{
                                err: "invalidUrl"
                            });
                            return;
                        }
                        let recordId=records[0].id;
                        /*airtable.updateRecord("ii_user",{ "Password_Text" : newPassword },recordId,function(user){
                            res.render('user/login.ejs');
                        });*/
                        done(err,newPassword,recordId)
                    });
                 },
                 function(newPassword,recordId,done){
                        bcrypt.hash(newPassword,saltRounds,function(err,hashedPassword){
                            if(err) throw err;
                            airtable.updateRecord("ii_user",{ "Password_Text" : hashedPassword },recordId,function(user){
                                res.render('user/login.ejs',{
                                    reset: true
                                });
                            });
                        });
                 }]);

    }

    isAuthorized(req,res){
        res.render("forbidden.ejs");
    }

}
module.exports=AuthController;
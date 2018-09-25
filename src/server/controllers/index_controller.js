const team = require('../models/team');
const member = require('../models/member');
const all= require('../models/all');
const async=require('async');


exports.edit = async function(req, res){
    department_companies=[];
    eirs=[];
    events=[];
    fundings=[];
    licensing_managers=[];
    members=[];
    team_categories=[];
    teams=[];
    technologies=[];
    async.parallel({
    department_companies: async.apply(all.viewPrimaryKeys,"department_company"),
    eirs: async.apply(all.viewPrimaryKeys,"eir"),
    events: async.apply(all.viewPrimaryKeys,"event"),
    fundings: async.apply(all.viewPrimaryKeys,"funding"),
    licensing_managers: async.apply(all.viewPrimaryKeys,"licensing_manager"),
    members: async.apply(all.viewPrimaryKeys,"member"),
    team_categories: async.apply(all.viewPrimaryKeys,"team_category"),
    teams: async.apply(all.viewPrimaryKeys,"team"),
    technologies: async.apply(all.viewPrimaryKeys,"technology")
    },function(err,results){
    console.log("Here");
    res.render('index', {
    department_companies: results["department_companies"],
    eirs: results["eirs"],
    events: results["events"],
    fundings: results["fundings"],
    licensing_managers: results["licensing_managers"],
    members: results["members"],
    team_categories: results["team_categories"],
    teams: results["teams"],
    technologies: results["technologies"]
    });
    }
    );
    }
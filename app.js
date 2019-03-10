const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const flash = require('express-flash');
const indexRouter = require('./routes/index');
const teamsRouter = require('./routes/teams');
const usersRouter = require('./routes/users');
const reportsRouter= require('./routes/reports');
const membersRouter=require('./routes/members');
const fundingsRouter=require('./routes/fundings');
const eventsRouter=require('./routes/events');
const teamCategorysRouter=require('./routes/team_categorys')
const departmentCompanysRouter=require('./routes/department_companys')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "keyboard cat"}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/teams', teamsRouter);
app.use('/reports', reportsRouter);
app.use('/members', membersRouter);
app.use('/fundings',fundingsRouter);
app.use('/events',eventsRouter);
app.use('/team_categorys',teamCategorysRouter);
app.use('/department_companys',departmentCompanysRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

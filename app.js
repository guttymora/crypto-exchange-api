const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const db = require('./database/database');
const Seed = require('./database/seed');

// ROUTERS
const apiRouter = express.Router();
const ratesRouter = require('./routes/rates.router');
const marketsRouter = require('./routes/market.router');
const currenciesRouter = require('./routes/currencies');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

// ROUTES
apiRouter.use('/rates', ratesRouter);
apiRouter.use('/market', marketsRouter);
apiRouter.use('/currencies', currenciesRouter);
app.use('/api', apiRouter);

db.authenticate().then(() => {
    // Updating models in database
    db.sync({alter: true}).then(() => {
        // Creating default records
        Seed.up().then(() => {
            console.log('> Connected to database');
        });
    });
});

// CATCHING 404 ERRORS
app.use(function (req, res, next) {
    next(createError(404));
});

// CATCHING FATAL ERRORS
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

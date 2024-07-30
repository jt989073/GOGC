import express from 'express'
import  {ExpressAuth } from "@auth/express" 
// const { ExpressAuth } = require("@auth/express")



import expressErrors from 'express-async-errors'
import morgan from 'morgan'
import cors from 'cors'
import csurf from 'csurf'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { ValidationError } from 'sequelize'
import { environment } from './config'
import router from './routes'

const isProduction = environment === 'production';

const app = express();
// If your app is served through a proxy
// trust the proxy to allow us to read the `X-Forwarded-*` headers

app.set("trust proxy", true)
app.use("/auth/*", ExpressAuth({ providers: ["Google"] }))
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }
  
  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );
  
  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );

  app.use(router)

  // Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found." };
  err.status = 404;
  next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app
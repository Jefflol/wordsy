const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const userRoutes = require('./api/routes/users');
const entryRoutes = require('./api/routes/entry');


// Connect MongoDB
mongoose.connect(
  'mongodb+srv://' + 
  process.env.MONGO_ATLAS_USERNAME + ':' + process.env.MONGO_ATLAS_PASSWORD +
  '@wordsy-vgraf.mongodb.net/' + 
  process.env.MONGO_ATLAS_DB_NAME + 
  '?retryWrites=true&w=majority', 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Bodyparser Middleware
app.use(express.json());

// Logging Middle ware
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// Allow resource sharing from different server (CORS Headers)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }

  next();
});

// Routes handling requests
app.use('/users', userRoutes);
app.use('/entry', entryRoutes);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Error if code above doesn't run
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
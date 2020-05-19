const express = require('express');
const app = express();
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/users');


// Connect MongoDB
mongoose.connect(
  'mongodb+srv://JAF:' + 
  process.env.MONGO_ATLAS_PW +
  "@wordsy-vgraf.mongodb.net/test?retryWrites=true&w=majority", 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Bodyparser Middleware
app.use(express.json());

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

// app.use((req, res, next) => {
//   const error = new Error('Not found');
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message
//     }
//   });
// });

module.exports = app;
import app from './api/app.js';
const port = 3001;

//Start app
app.listen(port, () => {
    console.log(`Home Search listening at http://localhost:${port}`)
  })
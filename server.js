const express = require('express');
const app = express();
const staticRoute = require('./routes/static');
const adminRoute = require('./routes/admin');

app.set('view-engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(adminRoute);
app.use(staticRoute);

app.listen(3000);

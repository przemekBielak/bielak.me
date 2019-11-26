const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const serveIndex = require('serve-index');
 
const PORT = process.env.PORT || 8080;
const app = express();

// app.use(history({}));
app.use(express.static(path.join(__dirname, './dist/')));

app.use('/files', serveIndex('./files', {icons: true})); // shows you the file list
app.use('/files', express.static('./files')); // serve the actual files

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


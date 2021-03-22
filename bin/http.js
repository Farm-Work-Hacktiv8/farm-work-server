const {app, server} = require("../app");
const port = process.env.PORT || 3000;

server.listen(9000, function() {
    console.log('App listening on port 9000');
});
app.listen(port, () => {
    console.log(`Farm Work server listen on port ${port}`);
});
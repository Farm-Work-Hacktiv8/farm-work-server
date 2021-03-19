const app = require("../app");
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Farm Work server listen on port ${port}`);
});

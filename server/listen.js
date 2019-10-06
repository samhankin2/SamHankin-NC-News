const app = require("./app.js");
const { PORT = 9090 } = process.env;

console.log("test");
console.log(PORT);

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

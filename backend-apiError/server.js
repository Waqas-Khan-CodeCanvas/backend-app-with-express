import app from "./app.js";

console.log(process.env.NODE_ENV)



app.listen(3000, () => {
  console.log("app is running on port 3000");
})

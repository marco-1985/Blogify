require("dotenv").config();

const askAI = require("./services/groq");

(async()=>{

const ans=await askAI("Say only Hello");

console.log(ans);

})();
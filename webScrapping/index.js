const axios  = require("axios");



const pageData = await axios.get('http://hosiptal-project.vercel.app/');

console.log(pageData)


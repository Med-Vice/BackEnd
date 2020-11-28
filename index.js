const server = require('./server.js')
const port =  process.env.PORT || 6868

server.listen(port, () => {

	console.log(`\n**_Server Reporting For Duty on port: ${port}_**\n`)
})
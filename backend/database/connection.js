import sql from "mysql2"
import dotenv from "dotenv"
import chalk from "chalk";

const connection = sql.createConnection({
	host: dotenv.config().parsed.DB_HOST,
	port: dotenv.config().parsed.DB_PORT,
	user: dotenv.config().parsed.DB_USER,	
	password: dotenv.config().parsed.DB_PASSWORD,
	database: dotenv.config().parsed.DATABASE
})

connection.connect((err) => {
	console.log('Connected to Database');
	console.log(`+------------------------------------------------------------+
| Database Connection Information                            |
+------------------------------------------------------------+
| Host: ${dotenv.config().parsed.DB_HOST}                      			     |
| Port: ${dotenv.config().parsed.DB_PORT}                      			     |
| User: ${dotenv.config().parsed.DB_USER}						     |
| Database: ${dotenv.config().parsed.DATABASE}			     |
+------------------------------------------------------------+
| Connection Status: ${(!err) ? (chalk.green('Connected')+"\t\t\t\t    ") : (chalk.red('Not Connected')+"\t\t\t    ")} |
+------------------------------------------------------------+
`)
})

export default connection
import chalk from "chalk";

const logger = (req, res, next) => {

    res.on('finish', () => {

        const time = chalk.yellowBright(`[${new Date().toString()}]`);
        const urlPath = `${req.path}` 
        const request = `${req.baseUrl !== '' ? `to ${chalk.blueBright(req.baseUrl)}` : `for ${chalk.blueBright('movie')} with path ${chalk.blueBright(urlPath)}`}`
        const method = chalk.blueBright(`${req.method}`)

        const statusCode = res.statusCode

        //get color based on status code
        let color, dot;
        if(statusCode < 300) {color = chalk.green; dot = '🟢'}                              //✅ Success
        else if (statusCode >= 300 && statusCode <400) {color = chalk.cyan;dot='🔵'}                //🔁 Redirect
        else if (statusCode>=400 && statusCode<500) {color = chalk.redBright;dot='🔴'}      //🟥 Bad Request
        else if (statusCode >= 500) {color = chalk.red; dot='⭕'}                           //💀 Server Error
        else color = chalk.white    

        // if (statusCode!=304) {
            console.log(`${dot !== '' ? dot : null} Request ${request} | Method: ${method} | Time: ${time} | Status: ${color(statusCode)}`);     
    // }
})

    next();
}


export default logger
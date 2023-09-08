const {app} = require('./app');
const main = () => {
    app.listen(app.get('port'));
    console.log(`servidor en el puerto  ${app.get('port')}`);

}

main();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

const app = new Koa();
const router = Router();


router.get('/', ctx => {
	console.log('route /')
	ctx.body = 'Random Dice Bot'
});



app.use(bodyParser())
app.use(router.routes())

const serverPort = process.env.OPENSHIFT_NODEJS_PORT ||  process.env.OPENSHIFT_INTERNAL_PORT || process.env.PORT || process.env.WEB_PORT || 8080;
const serverIp = process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP || process.env.IP || '127.0.0.1';

app.listen(serverPort, serverIp, () => {
	console.log('Server listening on ' + serverIp + ':' + serverPort);
});


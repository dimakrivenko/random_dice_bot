import TelegramBot from 'node-telegram-bot-api'
import config from 'config'
import bodyParser from 'koa-bodyparser'
import Koa from 'koa'
import Router from 'koa-router'

const TOKEN = config.get('token')

// const bot = new TelegramBot(TOKEN, {polling: true})
// const analytic = require('botanio')('30a29849-c4f0-4661-afed-6e3e1e31dc5e');

// const bot = new TelegramBot(TOKEN)
// bot.setWebHook(`${config.get('url')}/bot`)


const app = new Koa();
const router = Router();


router.get('/', ctx => {
	ctx.body = 'Random Dice Bot'
});

// router.post('/bot', ctx => {
// 	const { body } = ctx.request

// 	// console.log(body)

// 	bot.processUpdate(body)
// 	ctx.status = 200
// });

app.use(bodyParser())
app.use(router.routes())

const serverPort = process.env.OPENSHIFT_NODEJS_PORT ||  process.env.OPENSHIFT_INTERNAL_PORT || process.env.PORT || process.env.WEB_PORT || 8080;
const serverIp = process.env.OPENSHIFT_NODEJS_IP || process.env.OPENSHIFT_INTERNAL_IP || process.env.IP || '127.0.0.1';

app.listen(serverPort, serverIp, () => {
	console.log('Server listening on ' + serverIp + ':' + serverPort);
});





// function randomDice(count) {
// 	let result = '';

// 	function getRandomInt(min, max) {
// 		return Math.floor(Math.random() * (max - min)) + min;
// 	}

// 	for (var i = 1; i <= Number(count); i++) {
// 		if (i <= 1) {
// 			result += getRandomInt(1, 7)
// 		} else {
// 			result += '-' + getRandomInt(1, 7)
// 		}
// 	}

// 	return './assets/images/dice_' + result + '.jpg'
// }

// const buttons = {
// 	reply_markup: {
// 		inline_keyboard: [
// 			[{
// 				text: 'Бросить одну кость',
// 				callback_data: '1'
// 			}],
// 			[{
// 				text: 'Бросить две кости',
// 				callback_data: '2'
// 			}]
// 		]
// 	}
// }

// bot.on('callback_query', query => {
// 	bot.sendPhoto(query.from.id, randomDice(query.data), buttons);
// 	bot.answerCallbackQuery(query.id)

// 	analytic.track(query, '/random_button_' + query.data)
// })

// // Команда start
// bot.onText(/\/start/, (msg, [source, match]) => {
// 	const { chat: { id }} = msg

// 	bot.sendMessage(id, 'Бот случайным образом кидает игральные кости, выберите сколько костей необходимо кинуть.', buttons)

// 	analytic.track(msg, '/start')
// })

// // Команда random
// bot.onText(/\/random/, (msg, [source, match]) => {
// 	const { chat: { id }} = msg

// 	bot.sendPhoto(id, randomDice(2), buttons);

// 	analytic.track(msg, '/random')
// })

// // Команда help
// bot.onText(/\/help/, (msg, [source, match]) => {
// 	const { chat: { id }} = msg,
// 		helpText = 'Как пользоваться ботом?\n\nСписок доступных команд\n/start - Запуск бота\n/random - Случайный бросок двух костей\n/help - краткая справка\nПо всем вопросам пишите @krivenko'

// 	bot.sendMessage(id, helpText)

// 	analytic.track(msg, '/help')
// })


// pm2 startOrRestart ecosystem.json --env production
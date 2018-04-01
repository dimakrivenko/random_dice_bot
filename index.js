import TelegramBot from 'node-telegram-bot-api'
import config from 'config'
import bodyParser from 'koa-bodyparser'
import Koa from 'koa'
import Router from 'koa-router'

const TOKEN = config.get('token')

const bot = new TelegramBot(TOKEN)
// const bot = new TelegramBot(TOKEN, {polling: true})

// const bot = new TelegramBot(TOKEN, {
// 	webHook: {
// 		port: config.get('port'),
// 		autoOpen: false
// 	}
// })

// bot.openWebHook()
// bot.setWebHook(`${config.get('url')}/bot${TOKEN}`)
bot.setWebHook(`${config.get('url')}/bot`)


const app = new Koa();
const router = Router();


router.get('/', ctx => {
	ctx.body = 'Random Dice Bot'
});

router.post('/bot', ctx => {
	const { body } = ctx.request

	console.log(body)

	bot.processUpdate(body)
	ctx.status = 200
});

app.use(bodyParser())
app.use(router.routes())

app.listen(config.get('port'), () => {
	console.log('Listening on port ' + config.get('port'));
});








function randomDice(count) {
	let result = '';

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	for (var i = 1; i <= Number(count); i++) {
		if (i <= 1) {
			result += getRandomInt(1, 7)
		} else {
			result += '-' + getRandomInt(1, 7)
		}
	}

	return './assets/images/dice_' + result + '.jpg'
}

const buttons = {
	reply_markup: {
		inline_keyboard: [
			[{
				text: 'Бросить одну кость',
				callback_data: '1'
			}],
			[{
				text: 'Бросить две кости',
				callback_data: '2'
			}]
		]
	}
}

bot.on('callback_query', query => {
	bot.sendPhoto(query.from.id, randomDice(query.data), buttons);
	bot.answerCallbackQuery(query.id)
})

// Команда start
bot.onText(/\/start/, (msg, [source, match]) => {
	const { chat: { id }} = msg

	bot.sendMessage(id, 'Бот случайным образом кидает игральные кости, выберите сколько костей необходимо кинуть.', buttons)
})

// Команда random
bot.onText(/\/random/, (msg, [source, match]) => {
	const { chat: { id }} = msg

	bot.sendPhoto(id, randomDice(2), buttons);
})

// Команда help
bot.onText(/\/help/, (msg, [source, match]) => {
	const { chat: { id }} = msg,
	helpText = 'Как пользоваться ботом?\n\nСписок доступных команд\n/start - Запуск бота\n/random - Случайный бросок двух костей\n/help - краткая справка\nПо всем вопросам пишите @krivenko'

	bot.sendMessage(id, helpText)
})

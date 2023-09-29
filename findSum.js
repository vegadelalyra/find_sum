const { getDeviceName } = require('./js/greeting.js')
const { delayedPrompt } = require('./js/delayedPrompt.js')

console.clear()

process.stdin.on('data', function (data) {
    // Check if the input is a number
    if (/^[\d\s]+$/.test(data)) return

    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    console.clear()
    console.log(
        'Hi, rlyeh!\nPlease insert a list of numbers\nseparated by space...'
    )
})

getDeviceName().then(deviceName => {
    delayedPrompt(
        `Hi, ${deviceName}!\nPlease insert a list of numbers\nseparated by space...`
    )
    process.stdin.resume()
})

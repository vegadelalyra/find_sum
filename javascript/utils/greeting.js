const { getDeviceName } = require('./getDeviceName.js')
const { delayedPrompt, interface } = require('./delayedPrompt.js')
const readline = require('readline')

console.clear()

let userValidInput = ''
process.stdin.on('data', function (data) {
    // Check if the input is a number
    if (/^[\d\s]+$/.test(data))
        return (userValidInput = userValidInput + data.toString('utf8'))

    readline.clearLine(process.stdout, 0)
    readline.cursorTo(process.stdout, 0)
    interface.write(userValidInput)
})

getDeviceName().then(deviceName => {
    delayedPrompt(
        `Hi, ${deviceName}!\nPlease insert a list of numbers\nseparated by space...`
    )
    process.stdin.resume()

    interface.question('', data => {
        data = userValidInput.replace(/\s+/g, ' ').trimStart()
        console.log('Your answer was', data)
    })
})

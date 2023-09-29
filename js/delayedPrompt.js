const readline = require('readline')

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

interface.on('close', function () {
    delayedPrompt('BAI BAI!', 69)
    process.exit(0)
})

function sleep(ms) {
    const start = process.hrtime()
    let elapsed
    do {
        elapsed = process.hrtime(start)[1] / 1e6 // convert to milliseconds
    } while (elapsed < ms)
}

function delayedPrompt(text, delay = 20) {
    process.stdin.pause()
    for (let index = 0; index < text.length; index++) {
        interface.write(text[index])
        sleep(delay)
    }
    interface.write('\n')
}

module.exports = {
    delayedPrompt,
    interface,
}

const { WebcastPushConnection } = require('tiktok-livestream-chat-connector');

let currentInputs = {
    up: 0,
    down: 0,
    left: 0,
    right: 0,
    a: 0,
    b: 0
}

let tiktokUsername = "nixstah";

let tiktokChatConnection = new WebcastPushConnection(tiktokUsername);

tiktokChatConnection.connect().then(state => {
    console.info(`Connected to roomId ${state.roomId}`);
}).catch(err => {
    console.error('Failed to connect', err);
})

tiktokChatConnection.on('chat', data => {
    console.log(`${data.uniqueId} writes: ${data.comment}`);
    let checker = data.comment.toLowerCase()
    switch (checker) {
        case 'up':
        case 'u':
            currentInputs.up++
            break
        case 'down':
        case 'd':
            currentInputs.down++
            break
        case 'left':
        case 'l':
            currentInputs.left++            
            break
        case 'right':
        case 'r':
            currentInputs.right++
        case 'a':
            currentInputs.a++            
            break
        case 'b':
            currentInputs.b++
        default:
            break
    }
})

setInterval(() => {
    let max = 'up'
    if(currentInputs.down > currentInputs[max]) max = 'down'
    if(currentInputs.left > currentInputs[max]) max = 'left'
    if(currentInputs.right > currentInputs[max]) max = 'right'
    if(currentInputs.a > currentInputs[max]) max = 'a'
    if(currentInputs.b > currentInputs[max]) max = 'b'
    console.log(max)
}, 3000);
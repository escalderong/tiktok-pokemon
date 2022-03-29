const { WebcastPushConnection } = require('tiktok-livestream-chat-connector');
const ks = require('node-key-sender')

let currentInputs = {
    up: {val: 0, key: 'w'},
    down: {val: 0, key: 's'},
    left: {val: 0, key: 'a'},
    right: {val: 0, key: 'd'},
    a: {val: 0, key: 'q'},
    b: {val: 0, key: 'e'},
    select: {val: 0, key: 'z'},
    start: {val: 0, key: 'x'}
}

let max = 'up'

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
            currentInputs.up.val++
            break
        case 'down':
        case 'd':
            currentInputs.down.val++
            break
        case 'left':w
        case 'l':
            currentInputs.left.val++         
            break
        case 'right':
        case 'r':
            currentInputs.right.val++
            break
        case 'a':
            currentInputs.a.val++
            break
        case 'b':
            currentInputs.b.val++
            break
        case 'sel':
        case 'select':    
            currentInputs.select.val++
            break
        case 'st':
        case 'start':    
            currentInputs.start.val++
            break
        default:
            break
    }
})

setInterval(() => {
    if(currentInputs.down.val > currentInputs[max].val) max = 'down'
    if(currentInputs.left.val > currentInputs[max].val) max = 'left'
    if(currentInputs.right.val > currentInputs[max].val) max = 'right'
    if(currentInputs.a.val > currentInputs[max].val) max = 'a'
    if(currentInputs.b.val > currentInputs[max].val) max = 'b'
    if(currentInputs.start.val > currentInputs[max].val) max = 'start'
    if(currentInputs.select.val > currentInputs[max].val) max = 'select'
    console.log(currentInputs)
    console.log(max)
    console.log(currentInputs[max].key)
    ks.sendKey(currentInputs[max].key)
    currentInputs.up.val = 0
    currentInputs.down.val = 0
    currentInputs.left.val = 0
    currentInputs.right.val = 0
    currentInputs.a.val = 0
    currentInputs.b.val = 0
    currentInputs.start.val = 0
    currentInputs.select.val = 0
}, 4500);
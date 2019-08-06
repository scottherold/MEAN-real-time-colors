// this file handles routing
module.exports = (app, server) => {
    // <--- Constructors --->
    var io = require('socket.io')(server); // constructs socket listener with callback to server

    // <--- Variable --->
    let color = "white";

    // <--- Routing --->
    // ** GET routes **
    // root
    app.get('/', (req, res) => {
        res.render('index');
    })

    // <--- Sockets --->
    io.on('connection', socket => {
        // Update the new connection
        console.log('new connection detected!')
        socket.emit('initial_bg_color_update', {color: color}); // emits the color to append to the background

        // update background
        socket.on('update', data => {
            console.log(`update request detected, the new background color is: ${data.color}`)
            color = data.color; // updates color on server
            io.emit('bg_color_update', {color: data.color}); // sends color data to all connected clients
        })
    });
}
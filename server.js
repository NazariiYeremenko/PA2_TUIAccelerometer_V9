const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Socket.IO server
io.on('connection', (socket) => {
    console.log('A new client has connected.');

    // Handle message reception
    socket.on('message', (message) => {
        // Parse the received message as JSON
        const data = JSON.parse(message);

        if (data.event === 'deviceOrientation') {
            // Extract rotation values from the device orientation data
            const rotationX = data.payload.rotationRate.beta; // X-axis rotation (in degrees)
            const rotationY = data.payload.rotationRate.gamma; // Y-axis rotation (in degrees)

            // Create a new message object with the rotation data
            const rotationData = {
                event: 'rotationData',
                payload: {
                    rotationX,
                    rotationY,
                },
            };

            // Broadcast the rotation data to all connected clients
            io.emit('message', JSON.stringify(rotationData));
        }
    });

    // Handle client disconnections
    socket.on('disconnect', () => {
        console.log('A client has disconnected.');
    });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

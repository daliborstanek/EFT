const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));
app.use(express.json()); // Middleware to parse JSON bodies

// API endpoint to get mechanics data
app.get('/api/mechanics', (req, res) => {
    res.sendFile(path.join(__dirname, 'data.json'));
});

// API endpoint to handle contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const messagesFile = path.join(__dirname, 'messages.json');

    // Read existing messages
    const fs = require('fs');
    fs.readFile(messagesFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading messages file:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        let messages = [];
        try {
            messages = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing messages JSON:', parseErr);
            // Verify if file is empty or invalid, reset to empty array if needed, but for now just log
            messages = [];
        }

        const newMessage = {
            id: Date.now(),
            name,
            email,
            message,
            date: new Date().toISOString()
        };

        messages.push(newMessage);

        // Write updated messages back to file
        fs.writeFile(messagesFile, JSON.stringify(messages, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to messages file:', writeErr);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(200).json({ success: true, message: 'Message received' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

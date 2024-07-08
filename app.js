const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.use('/api', bookRoutes);
app.use('/api', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});

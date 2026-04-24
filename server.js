const express = require("express");
const app = express();

// Enable JSON parsing
app.use(express.json());

// Temporary in-memory data (acts like a fake database)
let users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" }
];

// Health check route (API status)
app.get("/", (req, res) => {
    res.send("API is live 🚀");
});

// READ all users
app.get("/users", (req, res) => {
    res.json(users);
});

// CREATE a new user
app.post("/users", (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// UPDATE a user
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name;
    res.json({ message: "User updated", user });
});

// DELETE a user
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    users = users.filter(u => u.id !== id);

    res.json({ message: "User deleted" });
});

// Port setup for local + Render
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
    console.log(`Server running on PORT $ {PORT}`);
});
import express from 'express';

const app = express();

app.use(express.json());

app.post('/users', (req, res) => {
    const {name, email} = req.body;

    const user = {
        name,
        email,
    }
    return res.json(user);
})

app.listen(3333, () => console.log('SERVER STARTED ON PORT 3333'));

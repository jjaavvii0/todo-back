require('dotenv').config();

import app from './app';
import './database'


const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, (err?: Error) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server is listening on port ${PORT}`);
    }
});

app.get('/', (req, res) => {
    res.json({ status: 'OK' });
});

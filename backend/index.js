const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

const apartamentsRoute = require('./routes/apartamentsRoute')
app.use(apartamentsRoute);

const managersRoute = require('./routes/managersRoute')
app.use(managersRoute);

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}
start()
const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();

const authRoute = require('./routers/authRoute');
const categoriesRoute = require('./routers/categoriesRoute');
const customersRoute = require('./routers/customersRoute');
const rolesRoute = require('./routers/rolesRoute');
const productsRoute = require('./routers/productsRoute');
const suppliersRoute = require('./routers/suppliersRoute');
const usersRoute = require('./routers/usersRoute');
const transactions = require('./routers/transactions');
 app.use(
    cors({
        origin : 'http://localhost:5173',
        credentials : true,
    })
)
app.use(express.json());
app.use('/api', authRoute);
app.use('/api', categoriesRoute);
app.use('/api', customersRoute);
app.use('/api', rolesRoute);
app.use('/api', productsRoute);
app.use('/api', suppliersRoute);
app.use('/api', usersRoute);
app.use('/api', transactions);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

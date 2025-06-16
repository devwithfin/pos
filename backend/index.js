const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();

const authRoute = require('./routers/authRoute');
const categoryRoute = require('./routers/categoryRoute');
const customerRoute = require('./routers/customerRoute');
const roleRoute = require('./routers/roleRoute');
const productRoute = require('./routers/productRoute');
const supplierRoute = require('./routers/supplierRoute');
const userRoute = require('./routers/userRoute');
const transactionRoute = require('./routers/transactionRoute');
const archiveRoute = require('./routers/archiveRoute');
 app.use(
    cors({
        origin : 'http://localhost:5173',
        credentials : true,
    })
)
app.use(express.json());
app.use('/api', authRoute);
app.use('/api', categoryRoute);
app.use('/api', customerRoute);
app.use('/api', roleRoute);
app.use('/api', productRoute);
app.use('/api', supplierRoute);
app.use('/api', userRoute);
app.use('/api', transactionRoute);
app.use('/api', archiveRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

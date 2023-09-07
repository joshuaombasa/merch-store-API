const express = require('express')
const port = 3000
const app = express()
const cors = require('cors')

app.use(express.json())



const ordersRoutes = require('./routes/orders')
const loginRoutes = require('./routes/login')
const order_itemsRoutes = require('./routes/order_items')
const signupRoutes = require('./routes/signup')
const usersRoutes = require('./routes/users')
const productsRoutes = require('./routes/products')
const categoriesRoutes = require("./routes/catogories")

app.use('/api/login', loginRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/order_items', order_itemsRoutes)
app.use('/api/signup', signupRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/catogories', categoriesRoutes)

app.listen(port, () => {
    console.log(`Server listening on port 3000`)
})
const express = require('express');
const morgan = require('morgan')

const app = express()

const products = [
    {
        id: 1,
        name: "laptop",
        price: 3000
    }
]
app.use(express.json())
app.use(morgan('dev'))

app.get('/products', (req,res)=>{
    res.json(products)
})

app.post('/products', (req,res)=>{
    const newProducts = {...req.body, id: products.length + 1}
    products.push(newProducts)
    res.send(newProducts)
})

app.put('/products', (req,res)=>{
    res.send('Actualizando productos')
})

app.delete('/products', (req,res)=>{
    res.send('Eliminando productos')
})

app.get('/products/:id', (req,res)=>{
    console.log(req.params.id)
    const productFound = products.find((product)=>{
        return product.id === parseInt(req.params.id)
    })

    if (!productFound) return res.status(404).json({
        message: 'Product not found'
    })

    console.log(productFound)
    res.send('Obteniendo un producto')
})

app.listen(3000)

console.log('server on port 3000')
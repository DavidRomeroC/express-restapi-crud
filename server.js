const express = require('express');
const morgan = require('morgan')

const app = express()

let products = [
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

app.put('/products/:id', (req,res)=>{

    const newData = req.body

    const productFound = products.find((product)=>{
        return product.id === parseInt(req.params.id)
    })

    if (!productFound) return res.status(404).json({
        message: 'Product not found'
    })

    products = products.map((p)=> p.id === parseInt(req.params.id) ? {...p, ...newData} : p)

    res.send({
        message: "product updated successfully"
    })
})

app.delete('/products/:id', (req,res)=>{
    const productFound = products.find((product)=>{
        return product.id === parseInt(req.params.id)
    })

    if (!productFound) return res.status(404).json({
        message: 'Product not found'
    })

    products = products.filter((p)=> p.id !== parseInt(req.params.id))
    console.log(products)

    res.sendStatus(204)
})

app.get('/products/:id', (req,res)=>{
    const productFound = products.find((product)=>{
        return product.id === parseInt(req.params.id)
    })

    if (!productFound) return res.status(404).json({
        message: 'Product not found'
    })

    res.json(productFound)
})

app.listen(3000)

console.log('server on port 3000')
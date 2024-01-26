const mongoose = require('mongoose')
 mongoose.connect('mongodb://127.0.0.1:27017/shopStand')
    .then(()=>{ 
        console.log("Mongo connection Open")
    })
    .catch(e=>{ 
        console.log(e)
    })
const Product = require('./models/products')
// const p = new Product({
//     name:'Ruby' , 
//     price:1.99,
//     category:'fruit'
// })

// p.save() 
// .then(p=>{ 
//     console.log(p)
// })
// .catch(e=>{ 
//     console.log(e)
// })

const seedProduct =[{ 
    name:'Apple' , 
        price:2.99,
        category:'fruit'
},
{
    name:'Banana' , 
    price:1.99,
    category:'fruit'
}]
Product.insertMany(seedProduct)
.then(res=>{ 
    console.log(res)

})
.catch(e=>{ 
    console.log(e)
})
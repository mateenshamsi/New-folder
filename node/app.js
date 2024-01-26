const express = require('express')
const app = express() 
const Product = require('./models/products')
const mongoose = require('mongoose')
const method=  require('method-override')
app.use(express.urlencoded({extended:true}))
app.use(method('_method'))
const session = require('express-session')
const flash = require('connect-flash')
const AppError = require('./AppError')

function wrapAsync(fn)
{ 
    return function(req,res,next){
        fn(req,res,next).catch(e=>next(e))
    }
}
mongoose.connect('mongodb://127.0.0.1:27017/shopStand')
    .then(()=>{ 
        console.log("Mongo connection Open")
    })
    .catch(e=>{ 
        console.log(e)
    })
const categories = [
    'fruit',
    'vegetable',
    'dairy'
]
const path= require('path')
const Farm = require('./models/farm')
app.use(session('thisisasecret'))
app.use(flash())
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.get('/products',async(req,res)=>{ 
   const {category} = req.query 
  
   if(category) 
   {
    const   products = await Product.find({category:category}) 
    res.render('Products/index',{products,category})

    }
    else
    {
       const   products = await Product.find({})
       res.render('Products/index',{products,category:"All"})
    
    } 

})
app.get('/products/new',(req,res)=>{ 
    res.render('Products/new',{categories})
    
})
app.post('/products',async(req,res)=>{ 
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`products/${newProduct._id}`)
})

app.get('/products/:id',wrapAsync(async(req,res,next)=>{ 
   
    const {id} = req.params 
    const product = await Product.findById(id).populate('farm','name')
    console.log(product)
    if(!product)
    { 
        return next(new AppError('Product Not found',404))
    }
    res.render('Products/show',{product})
    
   
    
}))
app.get('/products/:id/edit',async(req,res,next)=>{ 
    try{
        const {id} = req.params 
    const product  = await Product.findById(id)
    if(!product)
    { 
       throw  new AppError('Product Not found',404)
    }
    res.render('Products/edit',{product,categories})
     }
    catch(e)
    { 
        next(e)
    }
})
app.put('/products/:id',async(req,res)=>{
    try{
        const {id} = req.params 
    const editedProduct = await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
        if(!editedProduct)
        { 
            throw  new AppError('Product Not found',404)

        }
    res.redirect(`/products/${editedProduct._id}`)  
    
     }
     catch(e)
     { 
        next(e) 
     }
    
})
app.delete('/products/:id',async(req,res)=>{ 
    const {id} = req.params ;
    await Product.findByIdAndDelete(id) 
    res.redirect('/products')
})
app.get('/farm',async(req,res)=>{ 
    const farm= await Farm.find({}) 
    res.render('Farms/index',{farm,messages:req.flash('success')})
})
app.get('/farm/new',(req,res)=>{ 
    res.render('Farms/new')

})
app.post('/farm',async(req,res)=>{
    const farm = new Farm(req.body)
    req.flash('success','success')
    await farm.save()  
    res.redirect('/farm')
})
app.get('/farm/:id',async(req,res)=>{ 
    const {id} = req.params 
    const farm = await Farm.findById(id).populate('products')
    console.log(farm)
    res.render('Farms/show',{farm})
})
app.get('/farm/:id/products/new',async(req,res)=>{ 
    const {id} = req.params 
    const farm = await Farm.findById(id)
    res.render('Products/new',{categories,farm})
})
app.post('/farm/:id/products',async(req,res)=>{ 
    const {id} = req.params 
    const farm = await Farm.findById(id) 
    const product = new Product(req.body) 
    farm.products.push(product) 
    product.farm = farm
    farm.save()
    product.save() 
    res.redirect(`/farm/${id}`)
})
app.delete('/farm/:id',async(req,res)=>{ 
    const {id} = req.params 
    await Farm.findByIdAndDelete(id) 
    res.redirect('/farm')
})
app.use((err,req,res,next)=>{ 
   const {status=400,message="Error"} = err 
    res.status(status).send(message) 

})
app.listen(3000,()=>{ 
    console.log("Listening on port 3000")
})
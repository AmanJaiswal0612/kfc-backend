const express= require("express");
const {Menu,Cart,connection} = require("./db.js");
const cors =require("cors")


const app= express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())


app.get("/",(req,res)=>{
    res.send("server started")
})




app.get("/item", async(req,res)=>{
    let query= req.query;
    
    let items=await Menu.find({title:{$regex:req.query.search,$options:/i/}})
    res.json(items)
})

app.get("/menu", async (req,res)=>{
  let query= req.query;
  let items= await Menu.find(query);
  res.json(items);
})


app.post("/cart",async (req,res)=>{
  await Cart.insertMany(req.body);
  return res.status(201).send("cart added")
})

app.get("/cart", async (req,res)=>{
  let cart= await Cart.find();
  return res.json(cart);
})



app.delete("/cart/:id", async(req,res)=>{
  await Cart.deleteOne({_id:req.params.id});
  res.send("delete successful")
})




const PORT =process.env.PORT||8080
app.listen(PORT, async ()=>{
    try{
        await connection
    }
    catch(e){
      console.log(e);
    }
})
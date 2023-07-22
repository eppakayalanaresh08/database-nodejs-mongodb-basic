const express=require("express")

const mongoose=require("mongoose")

const MovieName=require('./model')
const app=express()

app.use(express.json())

mongoose.connect("mongodb+srv://Naresh:Naresh@cluster0.nqyhfbj.mongodb.net/?retryWrites=true&w=majority").then(
    ()=>console.log("DB coonected..")
    ).catch(err=>console.log(err))


app.listen(3007,()=>console.log('Server running'))

app.get("/",(req,res)=>{
    res.send("Hello world")
 })


 app.post('/add-movie', async (req, res) => {
    const { moviename } = req.body;
    try {
     const newData=new MovieName({moviename})
     await newData.save()
     return res.json(await MovieName.find())
  
    } catch (error) {
      console.log(error.message)
    }
  });


  app.get('/get-all', async (req, res) => {
    try {
        const allData=await MovieName.find()
        return res.json(allData)
     
    } catch (error) {
       console.log(error.message)
    }
  });


  app.get('/get-single/:id', async (req, res) => {
    try {
     const Data=await MovieName.findById(req.params.id)
     return res.json(Data)
    } catch (error) {
        console.log(error.message)
    }
  });


  app.get('/get-paginated', async (req, res) => {
    try {
      const { page, size } = req.query;
      const pageNum = parseInt(page) || 1;
      const pageSize = parseInt(size) || 10;
      const skip = (pageNum - 1) * pageSize;
      const movies = await collection.find().skip(skip).limit(pageSize).toArray();
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching paginated movies' });
    }
  });
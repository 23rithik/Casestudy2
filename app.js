const express = require('express')
const router = express.Router()
const Blog = require('../Casestudy2/models/employeeModels')
const app = express()
require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
app.use(express.json())
app.use(cors())
// Task1: initiate app and run server at 3000

const port=process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 

async function main(){
    await mongoose.connect(process.env.MONGODB_URL)
}

main()
.then(console.log("Connected to DB"))
.catch(err=>console.log(err))

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist', async (req, res) => {
  try {
      const posts = await Blog.find({})
      res.status(200).json(posts)
  } 
  catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
});


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', async (req, res) => {
  try {
    const employee = await Blog.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist', async (req, res) => {
  try {
      var postItem = {
        name:req.body.name,
        location:req.body.location,
        position:req.body.position,
        salary:req.body.salary
      }
      var post = new Blog(postItem)
      await post.save()
      res.status(201).json(postItem)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
});

//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', async (req, res) => {
  try {
    const employee = await Blog.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist', async (req, res) => {
  try {
    const updateData = {
      location: req.body.location,
      position: req.body.position,
      salary: req.body.salary
    };
    const employee = await Blog.findOneAndUpdate({ name: req.body.name }, updateData, { new: true });
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});




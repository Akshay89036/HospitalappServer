const express = require("express");

const app = new express();

const data = require('./dataset.json');

const fs = require('fs');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/hospital',(req,res)=>{
res.send(data)
})


app.post('/hospital',(req,res)=>{
    data.push(req.body)
    fs.writeFile('dataset.json',JSON.stringify(data),(err,resp)=>{
        if(err){
            res.send("data cannot be written");
        }else{
            res.send("data written succesfully");
        }

    })

    
})

app.put('/hospital/:name',(req,res)=>{
    let name = req.params.name;
    data.forEach((item)=>{
        if(item.Nameofthehospital==name){
            item.Nameofthehospital=req.body.Nameofthehospital;
            item.PatientCount=req.body.PatientCount;
             item.Hospitallocation=req.body.Hospitallocation;
            
        }
    })
     fs.writeFile('dataset.json',JSON.stringify(data),(err,resp)=>{
         if(err){
             res.send("data cannot be updated");
         }else{
             res.send("data updated");
         }
 
     })

    })

    app.delete('/hospital/:name',(req,res)=>{
        let name = req.params.name;
        let value= data.filter(item=>item.Nameofthehospital !== name);
         fs.writeFile('dataset.json',JSON.stringify(value),(err,resp)=>{
             if(err){
                 res.send("data cannot be deleted");
             }else{
                 res.send("data deleted");
             }
     
         })
    
        })



app.listen(3000);
console.log("connection established");
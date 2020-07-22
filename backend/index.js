
const express = require("express"),
app = express(),
mongose = require("mongoose"),
bodyParser = require("body-parser");
mongose.connect("mongodb://localhost/todosdb",{
        useNewUrlParser: true,
        useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: 'application/*+json' }));


var cors = require('cors');

// use it before all route definitions
app.use(cors({origin: '*'}));


const todoSchema = new mongose.Schema(
    {
        todo : String,
        done : Boolean,
        deleted : Boolean
    }
)

const Todo = mongose.model("Todo",todoSchema);

app.get("/todos",(req,res)=>{
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Max-Age", "1800");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    // res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
    Todo.find({},(err,todos)=>{
        res.send(todos);
    });
    
});

app.post("/todos",(req,res)=>{
    // console.log(req.body);
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    // res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
    var newTodo={
        todo:req.body.todo,
        done:req.body.done,
        deleted:req.body.deleted};
    console.log(newTodo)
    Todo.find({todo:newTodo.todo},(err,results)=>{
        if(err){
            console.log(err);
        }else{
            if(results.length==0){
                Todo.create(newTodo,(err,results)=>{
                    if(err){
                        res.send("Couldn't save");
                    }
                    else{
                        res.send("Saved")
                    }
                });
            }else{
                
                Todo.updateOne({todo:newTodo.todo},newTodo,(err,results)=>{
                    if(err){
                        res.send("Coldn't Update");
                    }else{
                        res.send("Updated successfully");
                    }
                })
            }
        }
    });
});


app.delete("/todos",(req,res)=>{
    
    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader("Access-Control-Max-Age", "1800");
    // res.setHeader("Access-Control-Allow-Headers", "content-type");
    // res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
    Todo.deleteMany({todo : req.body.todo},(err,result)=>{
        if(err){
            res.send(err);
        }else{
            res.send(result);
        }
    });

});




app.listen(3000,()=>{
    console.log("Server Connected");
});
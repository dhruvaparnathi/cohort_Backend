const app = require("./src/app");

const notes = [
    {
        "title":"test0",
        "desc":"testDesc0"
    }

];

app.post('/notes',(req,res)=>{
    console.log(req.body);
    notes.push(req.body);
    console.log(notes);
    res.send("Note Added");
})

app.patch('/notes/:idx',(req,res)=>{
    notes[req.params.idx].title = req.body.title
    notes[req.params.idx].desc = req.body.desc

    res.send("Note Updated")
})

app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index]

    res.send("Note Deleted")
})

app.get('/notes',(req,res)=>{
    res.send(notes);
})

app.listen(3000,()=>{
    console.log("Server is running at port:3000");
})
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4000;
//In-memory data store
let shayaris = [
    {
        id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "hawa bhi bheeg jaye us barsaat se woh barsaat leke aana/patthar bhi mehek jaye jisse woh gulaab leke aana/ke meri muskaan poori ho jaye woh hasi leke aana/bin sharab nasha hojaye woh aankhein leke aana/jeene lagun dubara main woh saansein leke aana/samay beet jaye jisme woh baatein leke aana/ulajh jau jisme main woh zulfein leke aana/pata hai nhi mil payenge ham/par jab bhi aao/intezaar tha tumhe hamara woh vishwaas leke aana.",
    author: "Komal Verma",
    date: "2024-01-30T10:00:00Z",
    },
];
// Use Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
// 1. Get all poems
app.get("/shayaris", (req, res) => {
    console.log(shayaris);
    res.json(shayaris);
  });

// 2. Get by specific id
app.get("/shayaris/:id", (req, res) => {
    const shayari = shayaris.find((shayari) => shayari.id === parseInt(req.params.id));
    if(!shayari) return res.status(404).json({message: "Post Not Found."});
    res.json(shayari);
  });

// 3. Post a shayari
app.post("/shayaris", (req, res) => {

    const newID = shayaris.length+1;
    const shayari = {
        id: newID,
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: new Date(),
    };
    shayaris.push(shayari);

    res.status(201).json(shayari);
  });

// PATCH a post when you just want to update one parameter
app.patch("/shayaris/:id", (req, res) => {

    const Shayari = shayaris.find((shayari) => shayari.id === parseInt(req.params.id));
    if(!Shayari) return res.status(404).json({message: "Shayari Not Found"});
    if(req.body.title) Shayari.title = req.body.title;
    if(req.body.content) Shayari.content = req.body.content;
    if(req.body.author) Shayari.author = req.body.author;
    res.status(201).json(Shayari);
  });
// Delete a shayari
app.delete("/shayaris/:id", (req, res) => {

    const Shayari = shayaris.find((shayari) => shayari.id === parseInt(req.params.id));
    if(!Shayari) return res.status(404).json({message: "Shayari Not Found"});
    const searchIndex = shayaris.findIndex((shayari) => shayari.id === parseInt(req.params.id));
    if(searchIndex > -1){
        shayaris.splice(searchIndex,1);
        res.status(201).json(Shayari);
    }else{
        return res.status(404).json({message: "Shayari Not Found"});
    }
    
  });
app.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`);
  });



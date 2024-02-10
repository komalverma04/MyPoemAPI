const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const port = 3000;
const app = express();
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/**
 * get
 * home page
 */
app.get("/",async (req,res)=>{
    try{
        const response = await axios.get(`${API_URL}/shayaris`);
        res.render("index.ejs",{shayaris: response.data});
    }catch(error){
        res.status(500).json({message: "Error fetching data"});
    }
});
/**
 * get
 * addnew poem page
 */
app.get("/new",async (req,res)=>{
        res.render("editPage.ejs",{heading: "Add Shayari", submit: "Create Shayari"});
});

/**
 * get
 * edit page
 */
app.get("/edit/:id",async (req,res)=>{
    try{
        const response = await axios.get(`${API_URL}/shayaris/${req.params.id}`);
        res.render("editPage.ejs",{ heading: "Edit Shayari",submit:"Edit Shayari",shayari: response.data });
    }catch(error){
        res.status(500).json({message: "Error fetching data"});
    }
});
/**
 * post
 * Add new Shayari page
 */
app.post("/api/shayaris",async (req,res)=>{
    try{
        const response = await axios.post(`${API_URL}/shayaris`,req.body);
        
        res.redirect('/');
    }catch(error){
        console.log(error);
        res.status(404).json({message: "Not Added Shayari"});
    }
});

/**
 * post
 * Edit Shayari page
 */

app.post("/api/shayaris/:id",async (req,res)=>{
    try{
        const response = await axios.patch(
            `${API_URL}/shayaris/${req.params.id}`,
            req.body
            );
            console.log(response.data);
        res.redirect("/");
    }catch(error){
        res.status(404).json({message: "Not updated Shayari"});
    }
});
// Delete a post
app.get("/api/shayaris/delete/:id", async (req, res) => {
    try {
      await axios.delete(`${API_URL}/shayaris/${req.params.id}`);
      res.redirect("/");
    } catch (error) {
      res.status(500).json({ message: "Error deleting post" });
    }
  });
app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
  });
var http = require('http');
var url = require('url');
var queryString = require('querystring');
var test2= require('test2');

var express=require('express');
var app=express();
app.get('/',function(req,res){
    file="index.html"
    //res.setHeader('Content-Type','text/html');
    res.sendFile('/Users/GOOGLE/node projects/' + file)
   // res.render(page,{name:"yaya"})
    //res.end('Vous êtes à l\'accueil, que puis-je pour vous ?');
});

app.get('/sous-sol',function(req,res){
        res.setHeader('Content-Type','text/plain');
        res.end('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
    });

app.get('/etage/1/chambre',function(req,res){
    res.setHeader('Content-Type','text/plain');
    res.end('Hé ho, c\'est privé ici !');
});

app.get('/etage/:num/:chambre',function(req,res){
    res.setHeader('Content-Type','application/json');
    res.statusCode=201;
    res.send({
        nom:"nyoumi",
        prenom:"paul",
        etage:req.params.num,
        chambre:req.params.chambre
    })
    res.end();
})

app.use(function(req,res,next){
    res.setHeader('Content-Type','text/plain');
    res.send(404,'Page introuvable !');
});

app.listen(8081);




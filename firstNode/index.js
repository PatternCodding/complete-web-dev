// console.log("hello world");

// jshint esversion:6

// const fs = require("fs")
// fs.copyFileSync("main.txt", "third.txt")

// working on superheroes
 
const superheroes = require('superheroes');

superheroes.all;

var mysuperheroes = superheroes.random();
console.log('My name is ', mysuperheroes, ', and am a mysuperheroe');

// excercise create and generate a supervillains

// solution
const supervillains = require('supervillains');
supervillains.all
var mySuppervillains = supervillains.random()
console.log('My name is ', mySuppervillains, ', and am a supervillain');
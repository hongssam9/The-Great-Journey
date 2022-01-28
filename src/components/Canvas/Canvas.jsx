import React from "react";
import { useState, useEffect, useRef } from "react";
import { DragSource } from "react-dnd";
import "./Canvas.css";

import grunt from '../../images/Enemies/Grunt.png'
import elite from '../../images/Enemies/Elite.png'
import hunter from '../../images/Enemies/Hunter.png'
import flood from '../../images/Enemies/Flood.png'
import zealot from '../../images/Enemies/Elite-Master.png'

import marine from '../../images/Marine/Marine-Front.png'
import odst from '../../images/ODST/ODST-Front.png'
import mc from '../../images/MC/MC-Front.png'
import johnson from '../../images/Johnson/Johnson-Front.png'


function Canvas(props) {
  const cellSize = 30;
  const cellGap = 3;
  const gameGrid = []; 
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const canvasPositionRef = useRef(null); 
  let numberOfResources = 300;
  let enemiesInterval = Math.floor(Math.random() * (200) + 50);
  let frame = 0;
  let score = 0;
  let gameOver = false;
  let roundChange = true;
  let frameAtRoundChange = 0;
  let lives = 20;
  let enemiesSpawn = 0;
  let enemiesThisRound = 3;
  let round = 1;
  let endY = 0;
  let endX = 0;
  const defenders = [];
  const enemies = [];
  const projectiles = [];
  // const enemyImg = new Image();
  const defenderImg = new Image();
   
//18 36
/* Makes the path on map */ 
const mapArr = [
    ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
    ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
    ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
    ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
    ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","X","X","X","X","X","X","X","X","X","X","X","X","X","O","O","X","X","X","X","O"],
    ["O","O","O","O","X","X","X","X","X","X","X","O","O","O","O","O","X","O","O","O","O","O","O","O","O","O","O","O","X","O","O","X","O","O","X","O"],
    ["O","O","O","O","X","O","O","O","O","O","X","O","O","O","O","O","X","O","O","O","O","O","O","O","O","O","O","O","X","O","O","X","O","O","X","O"],
    ["O","O","O","O","X","O","O","O","O","O","X","O","O","O","O","O","X","O","O","O","O","O","O","O","O","X","X","X","X","O","O","X","O","O","X","O"],
    ["O","O","O","O","X","O","O","O","O","O","X","O","O","O","O","O","X","X","X","X","O","O","O","O","O","X","O","O","O","O","O","X","O","O","X","O"],
    ["L","X","X","O","X","O","O","O","O","O","X","O","O","O","O","O","O","O","O","X","O","O","O","O","O","X","O","O","O","O","O","X","O","O","X","O"],
    ["O","O","X","O","X","O","O","O","O","O","X","O","O","O","O","O","O","O","O","X","O","O","O","O","O","X","O","O","O","O","O","X","O","O","X","O"],
    ["O","O","X","O","X","O","O","O","O","O","X","O","O","O","O","O","O","O","O","X","O","O","O","O","O","X","O","O","O","O","O","X","O","O","X","O"],
    ["O","O","X","O","X","O","O","O","O","O","X","O","O","O","O","O","O","O","O","X","O","O","O","O","O","X","O","O","O","O","O","X","O","O","X","X"],
    ["O","O","X","O","X","O","O","O","O","O","X","O","O","O","O","O","O","O","O","X","O","O","O","O","O","X","X","X","X","X","O","X","O","O","O","O"],
    ["O","O","X","X","X","O","O","O","O","O","X","O","X","X","X","X","X","X","X","X","O","O","O","O","O","O","O","O","O","X","O","X","O","O","O","O"],
    ["O","O","O","O","O","O","O","O","O","O","X","X","X","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","X","X","X","O","o","O","O"],
    ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],
    ["O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O"],

  ]

  /* =====================Mouse Movement===================== */
  const mouse = {
    x: -3,
    y: -3,
    width: 0.1,
    height: 0.1,
  };

  const handleMouseMove = (e) => {
    mouse.x = e.clientX - canvasPositionRef.current.left;
    mouse.y = e.clientY - canvasPositionRef.current.top;
  };
  const handleMouseLeave = () => {
    mouse.x = -3;
    mouse.y = -3;
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.width = 1080;
    canvas.height = 540;

    const ctx = canvas.getContext("2d");
    let canvasPosition = canvas.getBoundingClientRect();

    canvasPositionRef.current = canvasPosition;
    ctxRef.current = ctx;
    createGrid();
    animate();
  }, []);

  /* =====================Create Grid Board===================== */
  class Cell {
    constructor(x, y,path) {
      this.x = x;
      this.y = y;
      this.width = cellSize;
      this.height = cellSize;
      this.path=path;
    }

    draw() {
      if (collision(this, mouse) && this.path=== "O") {
        ctxRef.current.strokeStyle = "black";
        ctxRef.current.strokeRect(this.x, this.y, this.width, this.height);
      }
      if(this.path === "X"){
        ctxRef.current.fillStyle = "#b5651e";
        ctxRef.current.fillRect(this.x, this.y, this.width, this.height);
      }
      if(this.path === "L"){
        ctxRef.current.fillStyle = "red";
        ctxRef.current.fillRect(this.x, this.y, this.width, this.height);
      }
    }
  }

  function createGrid() {
    const canvas = canvasRef.current;
    if (canvas != null) {
      for (let y = 0; y < canvasRef.current.height; y += cellSize) {
        for (let x = 0; x < canvasRef.current.width; x += cellSize) {
          if(mapArr[y/cellSize][x/cellSize] === "X"){
            gameGrid.push(new Cell(x, y,"X"));
          } else if(mapArr[y/cellSize][x/cellSize] === "L"){
            gameGrid.push(new Cell(x, y,"L"));
          }
          else{gameGrid.push(new Cell(x, y,"O"));}
        }
        
      }
    }
  }
  createGrid();
  function handleGameGrid() {
    for (let i = 0; i < gameGrid.length; i++) {
      gameGrid[i].draw();
    }
  }

  function collision(first, second) {
    if (
      !(
        first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y
      )
    ){
      return true;
    }
  }

  /* =====================Animate on Gameboard===================== */
  function animate() {
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    handleGameGrid();
    handleDefenders();
    handleEnemies();
    handleGameStatus();
    handleProjectiles();
  
    frame++;
    if (!gameOver) requestAnimationFrame(animate);
  }

  /* =====================Defender===================== */
  class Defender { 
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = cellSize - cellGap*2;
      this.height = cellSize - cellGap*2;
      this.shooting = false;
      // this.health = 50;
      this.projectiles = [];
      this.timer = 0;
      this.target = null;
      /* 
      this.defenderImg = new Image()
      this.defenderType = type;
      if(this.defenderType === "Marine"){
        this.defenderImg.src =  smiley;
        this,power = 15;
        this.powerSpeed = 10; 
      }else if{this.defenderType === "Lieutenant"){
        this.defenderImg.src =  smileyLove; 
        this,power = 10;
        this.powerSpeed = 15;
      }else if{this.defenderType === "Captain"){
        this.defenderImg.src =  smileyGlasses 
        this,power = 50;
        this.powerSpeed = 5;
      } 
      
      */ 
    }
    draw() {
      defenderImg.src = mc;
      if(defenderImg.complete){
      ctxRef.current.drawImage(defenderImg,
        this.x,
        this.y,
        this.width,
        this.height);
      }else{
        defenderImg.onload = function(){
          ctxRef.current.drawImage(defenderImg,
            this.x,
            this.y,
            this.width,
            this.height); 
        }
      }
      // ctxRef.current.fillStyle = "blue";
      // ctxRef.current.fillRect(this.x, this.y, this.width, this.height);
      // ctxRef.current.fillStyle = "black";
      // ctxRef.current.font = "20px Arial";
      // ctxRef.current.fillText(Math.floor(this.health), this.x, this.y);
    }
    update(){
      if(this.shooting){
      this.timer++;
      if(this.timer % 100 === 0){
        projectiles.push(new Projectile(this.x+15, this.y+15, this.target))
      }
    }else {
      this.timer = 0;
    }
    }
  }
  const handleMouseClick = () => {
    const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
    const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
    for (let i = 0; i < defenders.length; i++) {
      if (defenders[i].x === gridPositionX && defenders[i].y === gridPositionY )
        return;
    }
    let defenderCost = 100;
    if (numberOfResources >= defenderCost ) {
      defenders.push(new Defender(gridPositionX, gridPositionY));
      numberOfResources -= defenderCost;
    }
  };

  function handleDefenders() {
    for (let i = 0; i < defenders.length; i++) {
      defenders[i].draw();
      defenders[i].update();
      
      defenders[i].shooting = false;
      for(let j=0; j<enemies.length; j++){
      if(
        (enemies[j].y < (defenders[i].y + 150) &&
        enemies[j].y > (defenders[i].y - 150)  &&
        enemies[j].x < (defenders[i].x + 150) &&
        enemies[j].x > (defenders[i].x - 150) ) 
        ){
          defenders[i].shooting = true;
          defenders[i].target = enemies[j];
      }
    }
      // for (let j = 0; j < enemies.length; j++) {
      //   if (defenders[i] && collision(defenders[i], enemies[j])) {
      //     enemies[j].movement = 0;
      //     defenders[i].health -= 0.2;
      //   }
      //   if (defenders[i] && defenders[i].health <= 0) {
      //     defenders.splice(i, 1);
      //     i--;
      //     enemies[j].movement = enemies[j].speed;
      //   }
      // }
    }
  }

  /* =====================Enemies===================== */
  //24 13
  //gridArr[13][24] is starting path coordinate
  class Enemy {
    constructor(type) {
      this.gridX = 36;
      this.gridY = 12;
      this.targetX = cellSize*36 + cellGap;
      this.targetY = cellSize*12 + cellGap;
      this.direction = "left";
      this.x = canvasRef.current.width;
      this.y = cellSize*12 + cellGap;
      this.width = cellSize - cellGap * 2;
      this.height = cellSize - cellGap * 2;
      this.enemyImg = new Image();
      this.enemyType = type;
      
      if(this.enemyType ==="Grunt"){
        this.enemyImg.src = grunt
        this.health = 100;
        this.speed = 1;
        this.enemyAtt = 1;
      }else if(this.enemyType === "Elite"){
        this.enemyImg.src = elite
        this.health = 200;
        this.speed = 2;
        this.enemyAtt = 3;
      }else if(this.enemyType === "Hunter"){
        this.enemyImg.src = hunter
        this.health = 300;
        this.speed = 1;
        this.enemyAtt = 4;
      }else if(this.enemyType === "Flood"){
        this.enemyImg.src = flood
        this.health = 150;
        this.speed = 4;
        this.enemyAtt = 2;
      }else if(this.enemyType === "Zealot"){
        this.enemyImg.src = zealot
        this.health = 400;
        this.speed = 2;
        this.enemyAtt = 10;
      }
      this.maxHealth = this.health;
      this.movement = this.speed;
      this.enemyAttack = this.enemyAtt;
    }

    updateTarget() {
      if(this.direction !== "down" && this.gridY-1 >=0 && (mapArr[this.gridY - 1][this.gridX] === "X" || 
      mapArr[this.gridY - 1][this.gridX] === "L")){
       
        this.direction = "up";
        this.gridY = this.gridY - 1;
        this.targetY = this.gridY*cellSize + cellGap;
        if(mapArr[this.gridY - 1][this.gridX] === "L"){
          endY = this.targetY;
          endX = this.targetX;
        }
      }
      else if(this.direction !== "up" && this.gridY+1 <=25 && (mapArr[this.gridY + 1][this.gridX] === "X" ||
     mapArr[this.gridY + 1][this.gridX] === "L")){
        this.direction = "down";
        this.gridY = this.gridY + 1;
        this.targetY = this.gridY*cellSize + cellGap;
        if(mapArr[this.gridY + 1][this.gridX] === "L"){
          endY = this.targetY;
          endX = this.targetX;
        }
      }
      else if(this.direction !== "right" && this.gridX-1 >=0 && (mapArr[this.gridY][this.gridX - 1] === "X" ||
      mapArr[this.gridY][this.gridX - 1] === "L")){
        this.direction = "left";
        this.gridX = this.gridX - 1;
        this.targetX = this.gridX*cellSize + cellGap;
        if(mapArr[this.gridY][this.gridX - 1] === "L"){
          endY = this.targetY;
          endX = this.targetX;
        }
      }
      else if(this.direction !== "left" && this.gridX+1 <=54 && (mapArr[this.gridY][this.gridX + 1] === "X" ||
      mapArr[this.gridY][this.gridX + 1] === "L" )){
        this.direction = "right";
        this.gridX = this.gridX + 1;
        this.targetX = this.gridX*cellSize + cellGap;
        if(mapArr[this.gridY][this.gridX + 1] === "L" ){
          endY = this.targetY;
          endX = this.targetX;
        }
      }
    }

    update() {
      console.log("Direction: " + this.direction);
      console.log("Y: " + this.x);
      console.log("Target Y: " + this.targetX);

      if(this.direction === "left"){
       
        if(this.x >this.targetX){
          this.x -= this.movement;
        } 
        if(this.x<= this.targetX){
          this.x = this.targetX;
          this.updateTarget();
        }
      }
      else if(this.direction === "right"){
       
        if(this.x <this.targetX){
          this.x += this.movement;
        }
        if(this.x>= this.targetX){
          this.x = this.targetX;
          this.updateTarget();
        }
      }
      else if(this.direction === "up"){ 
        if(this.y >this.targetY){
          this.y -= this.movement;
        }
        if(this.y<= this.targetY){
          this.y = this.targetY;
          this.updateTarget();
        } 
      }
      else if(this.direction === "down"){
        if(this.y <this.targetY){
          this.y += this.movement;
        } 
        if(this.y>= this.targetY){
          this.y = this.targetY;
          this.updateTarget();
        }
      } 
    }
    draw() {
      if(this.enemyImg.complete){
      ctxRef.current.drawImage(this.enemyImg,
        this.x,
        this.y,
        this.width,
        this.height);
      }else{
        this.enemyImg.onload = function(){
          ctxRef.current.drawImage(this.enemyImg,
            this.x,
            this.y,
            this.width,
            this.height); 
        }
      }
      // ctxRef.current.fillStyle = "red";
      // ctxRef.current.fillRect(this.x, this.y, this.width, this.height);
      ctxRef.current.fillStyle = "black";
      ctxRef.current.font = "15px Arial";
      ctxRef.current.fillText(Math.floor(this.health), this.x, this.y);
    }
  }

  function handleEnemies() {
    for (let i = 0; i < enemies.length; i++) {
      enemies[i].update();
      enemies[i].draw();
      /* ===When enemy gets to red box at end of trail=== */
      if (enemies[i].x <= endX) {
        enemies.splice(i,1)
        // lives = lives - this.enemyAttack;
        lives --;
        if(lives <= 0){
          gameOver = true;
        }
        /* ===When enemies die=== */ 
      }else if(enemies[i].health <= 0){
        let gainedResources = enemies[i].maxHealth/10;
        numberOfResources += gainedResources;
        score += gainedResources;
        enemies.splice(i, 1);
      }
    }

    /* Random Enemy Generator (1-3) = Grunt   (4) = Tank   (5-6) = Speedster */
    if (frame % enemiesInterval === 0 && enemiesSpawn < enemiesThisRound) {
      let enemyGen = Math.floor(Math.random() * 7) +1
      if(round < 6){
        if(enemyGen < 5){
          enemies.push(new Enemy("Grunt"))
        }else if(enemyGen > 4 && round > 3){
          enemies.push(new Enemy("Elite"))
        }
    }else if (round > 5 && round < 11){
      enemiesInterval = Math.floor(Math.random() * (100) + 50);
      if(enemyGen < 3){
        enemies.push(new Enemy("Grunt"))
      }else if((enemyGen > 2 && enemyGen < 7)){
        enemies.push(new Enemy("Elite"))
      }else if (enemyGen > 6){
        enemies.push(new Enemy("Hunter"))
      }
    }else if (round > 10 && round < 16){
      enemiesInterval = Math.floor(Math.random() * (150) + 50);
      if(enemyGen === 1){
        enemies.push(new Enemy("Grunt"))
      }else if((enemyGen > 1 && enemyGen < 4)){
        enemies.push(new Enemy("Elite"))
      }else if (enemyGen > 3 || enemyGen < 6){
        enemies.push(new Enemy("Hunter"))
      }else if (enemyGen > 5){
        enemies.push(new Enemy("Flood"))
      }  
    }else if (round > 15 && round < 21){
      enemiesInterval = Math.floor(Math.random() * (150) + 50);
      if(enemyGen === 1){
        enemies.push(new Enemy("Grunt"))
      }else if((enemyGen === 2 || enemyGen === 3)){
        enemies.push(new Enemy("Elite"))
      }else if (enemyGen === 4){
        enemies.push(new Enemy("Hunter"))
      }else if (enemyGen > 4 && enemyGen < 8){
        enemies.push(new Enemy("Flood"))
      }else if (enemyGen === 8){
        enemies.push(new Enemy("Zealot"))
      }  
    }else if (round > 20){
      enemiesInterval = Math.floor(Math.random() * (150) + 50);
      if(enemyGen === 1){
        enemies.push(new Enemy("Grunt"))
      }else if((enemyGen === 2)){
        enemies.push(new Enemy("Elite"))
      }else if (enemyGen === 3){
        enemies.push(new Enemy("Hunter"))
      }else if (enemyGen > 3 && enemyGen < 7){
        enemies.push(new Enemy("Flood"))
      }else if (enemyGen > 6){
        enemies.push(new Enemy("Zealot"))
      }  
    }
      enemiesSpawn++; 
    }
  }

  /* =====================Projectiles===================== */
  class Projectile {
    constructor(x, y, target) {
      this.x = x;
      this.y = y;
      this.width = 3;
      this.height = 3;
      this.power = 10;
      this.speed = 5;
      this.target = target;
    }
    update() {
      if (this.x < this.target.x){this.x += this.speed;}
      else if(this.x > this.target.x){this.x -= this.speed;}
      if (this.y < this.target.y){this.y += this.speed;}
      else if(this.y > this.target.y){this.y -= this.speed;}
    }
    draw() {
      ctxRef.current.fillStyle = "black";
      ctxRef.current.beginPath();
      ctxRef.current.arc(this.x, this.y, this.width, 0, Math.PI * 2);
      ctxRef.current.fill();
    }
  }
  
  function handleProjectiles () {
    for (let i = 0; i < projectiles.length; i++){
      projectiles[i].update();
      projectiles[i].draw();

      for(let j = 0; j < enemies.length; j++){
        if(enemies[j] && projectiles[i] && collision(projectiles[i],enemies[j])){
          enemies[j].health -= projectiles[i].power;
          projectiles.splice(i, 1);
          i--;
        }
      }
      if(projectiles[i] && projectiles[i].x > canvasRef.current.width - cellSize){
        projectiles.splice(i, 1);
        i--;
      }
    }
  }

  /* =====================Utilities===================== */
  function handleGameStatus() {
    /* ===What User currently has=== */
    ctxRef.current.fillStyle = 'gold';
    ctxRef.current.fillText('Score: ' + score,10,20);
    ctxRef.current.fillText('Resources: ' + numberOfResources, 10, 40);
    ctxRef.current.fillText('Round: ' + round, 10, 60);
    ctxRef.current.fillText('Lives: ' + lives, 10, 80);
    /* ===Game Over Message */
    if (gameOver) {
      ctxRef.current.fillStyle = "black";
      ctxRef.current.font = "60px Arial";
      ctxRef.current.fillText("GAME OVER", 135, 330);
    }
    /* ===Winning Round Conditions=== */
    if (enemiesSpawn >= enemiesThisRound && enemies.length === 0 && gameOver === false){
      if(roundChange){ 
        frameAtRoundChange = frame;
        numberOfResources += 150;
        roundChange = false;
      }
      /* ===What Round Change Will Do=== */
      ctxRef.current.fillStyle = 'black';
      ctxRef.current.font = '60px Arial';
      ctxRef.current.fillText('LEVEL COMPLETE', 130, 300);
      ctxRef.current.font = '30px Arial';
      ctxRef.current.fillText('Moving onto next stage!', 134, 340);    
      ctxRef.current.font = '30px Arial';
      ctxRef.current.fillText(Math.trunc((3-((frame-frameAtRoundChange)/60))) + ' seconds left until next round', 138, 380);  
      if(Math.trunc((5-((frame-frameAtRoundChange)/60))) <= 0) {
        round++;
        roundChange = true;
        enemiesThisRound += 3;
        enemiesSpawn = 0;
      }
    } 
  }


// Can't get this to work
window.addEventListener('resize',function(){
  canvasPositionRef.current = canvasRef.current.getBoundingClientRect();
}) 

  return (
    <div>
      <div id="title-title">The Great Journey</div>
 
      <canvas
        id="canvas1"
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseClick}
      ></canvas>
    </div>
  );
}

export default Canvas;

var gameState= "serve"
var max, myBg, invisibleGround
var bg, BoyPic, BoyStand
var k1, k2, k3, k4, killerGrp, killer
var chicken_leg, fruit, sweets, pizza, burger, fries, donut, food, foodGrp
var score= 0
var count= 0
var rect
//var k

function preload ()  {

bg= loadImage("Images/Bg.jpg")
BoyPic= loadAnimation("boy.png")
//BoyStand= loadImage("Images/boy.png")
BoyMoving= loadAnimation("BOY1.png", "boy.png")
//BoyPic= loadImage("Images/boy.png")

k1= loadImage("killers/killer1.png")
k2= loadImage("killers/killer2.png")
k3= loadImage("killers/killer3.png")
k4= loadImage("killers/killer4.png")

sweet= loadImage("tasty/food1.png")
fruit= loadImage("tasty/food2.png")
donut= loadImage("tasty/food3.png")
burger= loadImage("tasty/food4.png")
pizza= loadImage("tasty/food5.png")
chicken_leg= loadImage("tasty/food6.png")
fries= loadImage("tasty/food7.png")

Replay= loadImage("Images/replay.png")

}

function setup () {

    createCanvas(2000, 500)

     myBg= createSprite(1000, 250, 2000, 500)
     myBg.addImage(bg)
     myBg.velocityX= -5
     //myBg.scale= 2*/

     max= createSprite(100, 400, 70, 300)
     //max.addImage(BoyStand)
     max.addAnimation("boy", BoyPic)
     max.scale= 0.35
     /*max.velocityX= 0
     max.velocityY= 0*/

     invisibleGround= createSprite(1000, 490, 2000, 50)
     invisibleGround.visible= false
     invisibleGround.velocityX= 0

     killerGrp= createGroup()
     foodGrp= createGroup()

     rect= createSprite(850, 190, 34, 23)
     rect.addImage(Replay)
     rect.visible= false

     //max.debug= true

}

function draw () {

        background("white")

        if (gameState=== "PLAY") {
        //max.velocityX= 1.5
        max.changeAnimation("boy", BoyMoving)
        myBg.velocityX= -10
        invisibleGround.velocityX= -2

        if (invisibleGround.x< 1000 ) {
            invisibleGround.x= 1000
        }
       // invisibleGround.velocityX= -3
        //console.log("myBg" + myBg.velocityX + "," + "invisibleGround" + invisibleGround.velocityX)

        if (keyDown("up") && max.y> 150) {
            max.velocityY= -20
            max.changeAnimation("boy", BoyPic)
        }
        
       // max.velocityY= max.velocityY+ 10

        //console.log("Max y velocity" + max.velocityY + ", " +  max.y)

        
        //console.log(max.velocityY)

        if (myBg.x< 1000) {
                //console.log("x value of bg    " + myBg.x)
                myBg.x= 1000
                
        }

        foods()
        killers()
        
        //adaptivity
        if (score=== 210) { 
                max.scale= 0.5
                max.velocityX= 2
        }
        

        /*if (max.isTouching(food)) {
                
        }*/

        //if (gameState)

        /*if (max.isTouching(k) && count=== 0) {
             console.log("max size decreased")
             max.scale= 0.1
             count= count+ 1
        }*/
        /*else if (max.isTouching(k) && count=== 1) {
               gameState= "end"
               console.log("game over")
        }*/

        scoreFood()
        scoreKiller()

        

        if (gameState=== "END") {
                     max.velocityX= 0
                     foodGrp.destroyEach()
                     killerGrp.destroyEach()
                     myBg.velocityX= 0
                     invisibleGround.velocityX= 0
                     rect.visible= true
                     /*var rect= createSprite(1000, 90, 34, 23)
                     rect.addImage(Replay)*/

                     if (mousePressedOver(rect)){
                        console.log("game ends")
                        reset()
                        
                }
             }

             
        }

        //adding gravity
        max.velocityY= max.velocityY+ 10
        max.collide(invisibleGround)   

   /* if (gameState=== "PLAY") {
    
     max.changeAnimation("boy", BoyPic)
    }*/

        drawSprites ()

        textSize(25)
        text("SCORE= " + score, 76, 34)

        if (gameState=== "serve"){ //TEXT WILL ONLY APPEAR WHEN GAMESTATE IS "SERVE"

                fill ("black")
                textSize(100)
                text ("Press Space to Start", 500, 400)
         
                //max.addAnimation("boy", BoyPic)
         
                max.velocityX= 0
                max.velocityY= 0
                myBg.velocityX= 0
         
             }

        if (gameState=== "END") {
                textSize(25)
               // text("SCORE= " + score, 500, 34)
                text("GAME OVER", 790, 400)
            }

}

function keyPressed() {
        if (keyCode=== 32){
        gameState= "PLAY"
    }
}

function foods() {
        if (frameCount % 90=== 0) {
    
        food= createSprite(Math.round(random(1000, 1990)),Math.round(random(50, 350)),20,20);
        food.scale= 0.2;
        food.velocityX= -4;
        food.lifetime= 500

         
        var r= Math.round(random(1, 7))
        
     /*   if (r === 1) {
          food.addImage(food1);
        } else if (r === 2) {
          food.addImage(food2)
        } else if (r === 3) {
          food.addImage(food3)
        } else if (r === 4){
          food.addImage(food4)
        }*/

        switch(r) {
      
            case 1: food.addImage(chicken_leg)
                    break;
                    
            case 2: food.addImage(fruit)
                    break;
                    
            case 3: food.addImage(sweets)
                    break;
                    
            case 4: food.addImage(fries)
                    break;
               
            case 5: food.addImage(pizza)
                    break;

            case 6: food.addImage(burger)
                    break;

            case 7: food.addImage(donut)
                    break;
                
                    default : break;
          }

          foodGrp.add(food)

}

}

function killers () {

        if (frameCount % 100=== 0) {
    
        k= createSprite(Math.round(random(1000, 1990)),Math.round(random(50, 350)),20,20)
        k.scale= 0.2
        k.velocityX= -2;
        k.lifetime= 1000
      
        var rand= Math.round(random(1, 4))

         switch (rand) {

            case 1: k.addImage(k1)
                    break;
                    
            case 2: k.addImage(k2)
                    break;
                    
            case 3: k.addImage(k3)
                    break;

            case 4: k.scale= 0.25
                    k.addImage(k4)
                    break;

                    default : break;
     }

        killerGrp.add(k)
  }
          
 // k.add(killerGrp)
}

function scoreFood() {

        if (max.isTouching(foodGrp)) {
                foodGrp.destroyEach()
                score= score+ 2
                
        }
}

function scoreKiller() {

        if (max.isTouching(killerGrp)) {
                k.destroy()
                score= score-1
                max.scale= max.scale- 0.1
                count= 1
        }

        if (max.isTouching(killerGrp) && count=== 1) {
                gameState= "END"
        }
}

function reset() {
        gameState= "PLAY"
}
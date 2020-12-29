function load_images(){
    enemy_image=new Image();
    enemy_image.src="Assets/v1.png";
    player_image=new Image();
    player_image.src="Assets/superhero.png";
    gem_image=new Image();
    gem_image.src="Assets/gemm.png";
}


function init(){
    canvas=document.getElementById("mycanvas");
    W=700;
    H=400;
    canvas.width=W;
    canvas.height=H;
    game_over=false;
    pen=canvas.getContext('2d');
    e1={
        x:150,
        y:50,
        w:50,
        h:50,
        speed:20,
    };
    e2={
        x:300,
        y:150,
        w:50,
        h:50,
        speed:30,
    };
    e3={
        x:420,
        y:20,
        w:50,
        h:50,
        speed:40,
    };
    player={
        x:20,
        y:H/2,
        w:50,
        h:50,
        speed:20,
        moving:false,
        health:100,
    };
    gem={
        x:600,
        y: H/2,
        w:50,
        h:50,

    };
    enemy=[e1,e2,e3];
    // event listeners on canvas;
    canvas.addEventListener('mousedown',function(){
        player.moving=true;
});
    
     canvas.addEventListener('mouseup',function(){
        player.moving=false;
});
    
}


// Simple Colliosion detection algorithm;


function overlap(rec1,rec2){
    
    if(rec1.x<rec2.x+rec2.w 
      && rec1.x+rec1.w> rec2.x 
      && rec1.y< rec2.y + rec2.h 
      &&rec1.y + rec1.h> rec2.h)
       {
            
           return true;
      }
    else
    {
       return false;
    }







}
function draw(){
  
    pen.clearRect(0,0,W,H);// clear the old area, then fillthe box;
    pen.fillStyle="red";
     pen.drawImage(player_image,player.x,player.y,player.w,player.h);
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
      for(var i=0;i<enemy.length;i++){
 pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
        }
    
    pen.fillStyle="white";
    pen.fillText("Score "+player.health,10,10);
}
function update()
{
    
    if(player.moving==true){
        player.x+=player.speed;
        player.health+=20;
        
    }
    
    // overlap with the enemies;
           
          for(var i=0;i<enemy.length;i++)
           {
               if(overlap(player,enemy[i])){
                   player.health-=50;
                   
                   if(player.health<0){
                       game_over=true;
                       alert("You lose the game! ",player.health );
                   }
                   
               }
           }

               
               
               

if(overlap(player,gem))
{
alert("You won"); 
game_over=true;
return ;
}
       for(var i=0;i<enemy.length;i++){
    enemy[i].y+=enemy[i].speed;
    if(enemy[i].y>=H-enemy[i].h || enemy[i].y<0)enemy[i].speed*=-1;
       }
    
}
function gameloop(){
    
    
    if(game_over==true){
        clearInterval(f);
        return;
    }
    draw();
    update();
    console.log("in loop");

}

load_images();
init();
var f=setInterval(gameloop,100);
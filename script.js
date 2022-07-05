let gamebox=document.getElementById('gamebox');
let context=gamebox.getContext('2d');
nextlevel=document.getElementById('nextlevel');
restart=document.getElementById('restart');
var level=document.getElementById('level');
let source=document.getElementById('turn')
var temp=parseInt(level.textContent);
var rotated=false;
let f=1;
let b=1;
var r=0;
var p=0;

//first enemy
var enemy1={
    image: 'media/enemy.png',
    x: 150,
    y: 0,
    w: 35,
    h: 35,
    vx: 0,
    vy: 0.5
}
//second enemy
var enemy2={
    image: 'media/enemy.png',
    x: 350,
    y: 0,
    w: 35,
    h: 35,
    vx: 0,
    vy: 0.7
}
//player object
var player={
    image: 'media/MF1.png',
    x: 0,
    y: 135,
    w: 35,
    h: 35,
    vx: 2.7,
    vy: 0
}
//goal object
var goal={
    image: 'media/princess.png',
    x: 550,
    y: 135,
    w: 35,
    h: 35
}
//next level sensor
nextlevel.addEventListener('click',(event)=>{    
    temp=temp+1;
    level.textContent=temp;

    increase_speed(enemy1,0.5);
    increase_speed(enemy2,0.7);
    increase(player);
    player.x=0;
    nextlevel.style.display="none";
    updategame();
});
//restart sensor
restart.addEventListener('click',(event)=>{
    drawBox(player);
    drawBox(enemy1);
    drawBox(enemy2);
    drawBox(goal);
    player.x=0;
    enemy1.vy=0.5+((temp-1)*0.05);
    enemy2.vy=0.7+((temp-1)*0.05);
    player.vx=2.7+((temp-1)*0.2);
    restart.style.display="none";
    updategame();
    r=0;
    p=0;
})

//drawing player,enemy,goal
function drawBox(box){
    var img=new Image();
    img.src=box.image;
    if(box==player){
        if(rotated==true){
            if(b==1) img.src="media/MB1.png"
            else if(b==2) img.src="media/MB2.png"
            else img.src="media/MB3.png"
        }
        else {
            if(f==1) img.src="media/MF1.png"
            else if(f==2) img.src="media/MF2.png"
            else img.src="media/MF3.png"
        }
    }
    

    context.drawImage(img,box.x,box.y,box.w,box.h);
}
function increase(player){
    if(player.vx<0) player.vx-=((temp-1)*0.2);
    else player.vx+=((temp-1)*0.2);
}
function increase_speed(enemy,s){
    if(enemy.vy<0) enemy.vy-=s+((temp-1)*0.05);
    else enemy.vy+=s+((temp-1)*0.05);
}
//updating the position of enemy at each step
function updategamestate(){
    enemy1.y+=enemy1.vy;
    enemy2.y+=enemy2.vy;
    if(enemy1.y + enemy1.h > gamebox.height){
    enemy1.vy = -enemy1.vy;
    }
    else if(enemy1.y < 0){
        enemy1.vy = -enemy1.vy;
    }
    if(enemy2.y + enemy2.h > gamebox.height){
    enemy2.vy = -enemy2.vy;
    }
    else if(enemy2.y < 0){
        enemy2.vy = -enemy2.vy;
    }
}

//keypress sensor
document.addEventListener('keydown', (e) => {  
    e = e || window.event;  
        if (e.keyCode === 37 && p==0) {
        if(player.x-player.vx>0 && player.x+player.w+player.vx<goal.x ){
        player.x-=player.vx;
        rotated=true;
        if(r==0){
        if(b==3) b=1;
        else b++;
        }
        f=1;

    } 
    } else if (e.keyCode === 39 && p==0) {  
        if(player.x+player.vx<gamebox.width-player.w-goal.w && player.x+player.w+player.vx<goal.x){
      player.x+=player.vx;
      rotated=false;
      if(r==0){
      if(f==3) f=1;
      else f++;
      }
      b=1;
    }}  
  });
 
  //updating game
function updategame(){
    updategamestate();
    context.clearRect(0,0,gamebox.width,gamebox.height);
    drawBox(enemy1);
    drawBox(enemy2);
    drawBox(player);
    drawBox(goal);

    //RESTART
    if((player.x+player.w-9>=enemy1.x && player.x+9<=enemy1.x+enemy1.w &&
         player.y+7<=enemy1.y+enemy1.w  && enemy1.y<=player.y+player.w-7) ||
         (player.x+player.w-9>=enemy2.x && player.x+9<=enemy2.x+enemy2.w &&
            player.y+7<=enemy2.y+enemy2.w  && enemy2.y<=player.y+player.w-7)){
                context.font="40px black"
                context.fillStyle="black"
        context.fillText("GAME OVER!",(gamebox.width/2)-110,gamebox.height/2);
        restart.style.display="block";
        enemy1.vy=0;
        enemy2.vy=0;
        player.vx=0;
        r=1;
        p=1;
    }
    //level completed
        if(player.x+player.w+player.vx>=goal.x){
            context.clearRect(0,0,gamebox.width,gamebox.height);
            drawBox(enemy1);
            drawBox(enemy2);
            drawBox(player);
            drawBox(goal);
            context.font="40px black"
            context.fillStyle="black"
            context.fillText("LEVEL COMPLETED",(gamebox.width/2)-175,gamebox.height/2);
            enemy1.vy=0;
            enemy2.vy=0; 
            nextlevel.style.display="block";
        }
    window.requestAnimationFrame(updategame);
}
updategame();




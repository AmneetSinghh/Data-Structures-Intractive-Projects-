/* learning outcomes-> camera, groups, physics, tweens, overlap, collisions;
*/
var config = {
    type: Phaser.AUTO,
    scale:{
        mode: Phaser.Scale.FIT,
        width: 1200,
        height: 600,
    },
    backgroundColor: 0xff00cc,
    physics:{
        default:'arcade',
        arcade:{
            gravity:{
                y:1000,//
            },
          debug:false,
        }
    },
    
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

let game = new Phaser.Game(config);
// the jumping and the speed of the player.
let player_config={
player_speed: 150,
player_jump:-750,}

function preload ()
{
    // loading all the images in the preload function
this.load.image("ground","Assets/topground.png");
this.load.image("sky","Assets/background.png");
this.load.image("ray","Assets/ray.png");
this.load.spritesheet("dude","Assets/dude.png",{frameWidth:32,frameHeight:48});
    /// you can find this in the online from any website;
this.load.image("apple","Assets/apple.png");
    

}

function create ()
{
    W=game.config.width;
    H=game.config.height;
    let ground=this.add.tileSprite(0,H-128,W,128,'ground');
    ground.setOrigin(0,0);
    let background= this.add.sprite(0,0,'sky');
    background.setOrigin(0,0);
    background.displayWidth=W;// this means, it will extend;
    background.depth=-2;// it a upr auga, o thaale;

    
    // Create rays on the top of the background
   
    
    let rays=[];
    for(let i=-10;i<=10;i++)
    {
    let ray=this.add.sprite(W/2,H-128,'ray');
    ray.displayHeight=1.5*H;
    ray.setOrigin(0.5,1);
    ray.alpha=0.2;
    ray.angle=i*10;
    ray.depth=-1;
    rays.push(ray);
    
    }
    
    // now we want to rotate them.
    
    
    // tween;
    this.tweens.add(
    {
          targets: rays,
          props:{
              angle:{
                  value: "+=20",
              }
          },
        duration : 6000,
        repeat: -1,
    });
    
    
    
    
    
    
    this.player=this.physics.add.sprite(100,100,'dude',4);// 4 isthe default frame;
    this.player.setBounce(0.6);
    this.player.setCollideWorldBounds(true);
    
    
    /*           Player Animations     start   */
    this.anims.create(
        {
          key:'left',
          frames: this.anims.generateFrameNumbers('dude',{start:0,end:3}),
            frameRate: 10,
            repeat:-1
        }
    );
    
    
     this.anims.create(
        {
          key:'center',
          frames: this.anims.generateFrameNumbers('dude',{start:4,end:4}),
            frameRate: 10
        }
    );
    
     this.anims.create(
        {
          key:'right',
          frames: this.anims.generateFrameNumbers('dude',{start:5,end:8}),
            frameRate: 10,
            repeat:-1
        }
    );
  
    
    /*          End                         */
    
    
    
    
    
    // Controls of Player (harry)
    this.cursors=this.input.keyboard.createCursorKeys();
    
    
    
    // add a group of apples;
    let fruits=this.physics.add.group({
        key: "apple",
        repeat: 8,
        setScale: {x:0.15,y:0.15},
        setXY: {x:10,y:0,stepX:100}
        
        
    });
    //add bouncing to apples;
    fruits.children.iterate(function(f)
    {f.setBounce(Phaser.Math.FloatBetween(0.4,0.7));});
    
    
    // Create More Platforms;  (Stationary Platforms)
    let platforms = this.physics.add.staticGroup();
    platforms.create(600,400,'ground').setScale(2,0.5).refreshBody();
     platforms.create(700,200,'ground').setScale(2,0.5).refreshBody(); platforms.create(100,200,'ground').setScale(2,0.5).refreshBody();
    platforms.add(ground);
    
    // detect colliosions
    this.physics.add.existing(ground,true);// if true then static  thaale ni jauga,  
    //body if false then dynamic body;
//    ground.body.allowGravity=false;
//    ground.body.immovable=true;
    // inbuilt colliosion detection b/w the player and the ground/
    this.physics.add.collider(ground,this.player);
    this.physics.add.collider(ground,fruits);
    this.physics.add.collider(platforms,fruits);
    this.physics.add.collider(platforms,this.player);
    this.physics.add.overlap(fruits,this.player,eatFruit,null,this);

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // Create Cameras
    this.cameras.main.setBounds(0,0,W,H);
    this.physics.world.setBounds(0,0,W,H);
    this.cameras.main.startFollow(this.player,true,true);
    this.cameras.main.setZoom(1.5);
    


}

function update ()
{
    if(this.cursors.left.isDown)
        {
          this.player.setVelocityX(-player_config.player_speed);
            this.player.anims.play('left',true);
        }
    else if(this.cursors.right.isDown)
        {
          this.player.setVelocityX(player_config.player_speed);
            this.player.anims.play('right',true);
        }
    else 
        {
       this.player.setVelocityX(0);
            this.player.anims.play('center',true);
        }




       if(this.cursors.up.isDown && this.player.body.touching.down)
        {
          this.player.setVelocityY(player_config.player_jump);
        }

}



function eatFruit(player,fruit)
{
   // fruit is a dynamic object,do it has a disable body object;
    // we also want to hide and deactivate iject
    fruit.disableBody(true,true);
}







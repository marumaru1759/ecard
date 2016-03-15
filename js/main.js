enchant ();


window.onload = function () {
    var game = new Game(420,320);
    game.preload('asset/Ecardomote.png','asset/Ecardemperor.png','asset/Ecardcitizen.png','asset/Ecardslave.png');
    game.fps = 30;
    
    game.onload = function(){

    // create start menu & play start music
    // game.assets['asset/hitsuji_nation.mp3'].play();
    var startscene = new Scene();
    
    startscene.backgroundColor = "#222222";
        // Title Logo
        var titlelogo = new Label("E Card");
        titlelogo.x = 150;
        titlelogo.y = 50;
        titlelogo.font = "36px palatino";
        titlelogo.color = "#FF0000";


        var startmsg = new Label("Click screen to start game");
        startmsg.x = 100;
        startmsg.y = 120;
        startmsg.font = "20px palatino";
        startmsg.color = "#FF0000";

        startscene.addChild(titlelogo);
        startscene.addChild(startmsg);

    game.pushScene(startscene);

    // define each sprite character
    
    var firststage = new Scene();
    var resultscene = new Scene();

    var ecardomote = new Array();
        for ( i=0; i<5; i++){
            ecardomote[i] = new Sprite(54,82);
            ecardomote[i].image = game.assets['asset/Ecardomote.png'];
        }
    
    var ecardemp = new Sprite(54,82);
    ecardemp.image = game.assets['asset/Ecardemperor.png'];

    var ecardciti = new Array();
        for ( i=0; i<3; i++){
            ecardciti[i] = new Sprite(54,82);
            ecardciti[i].image = game.assets['asset/Ecardcitizen.png'];
        }

    var ecardsl = new Sprite(54,82);
    ecardsl.image = game.assets['asset/Ecardslave.png'];

    var mycard = "";

    // how to manage cards
        //select card
        for ( i=0; i<3; i++){
            ecardciti[i].addEventListener('touchstart', function(){
                this.tl.moveTo(350,150,40);

                mycard = "Citizen"; 
                enemy.dispatchEvent(new Event('cardselection'));


            })
        }  
        
        ecardemp.addEventListener('touchstart', function(){
            this.tl.moveTo(350,150,40);

            mycard = "Emperor";
            enemy.dispatchEvent(new Event('cardselection'));
        })
        
        ecardsl.addEventListener('touchstart', function(){
            this.tl.moveTo(350,150,40);

            mycard = "Slave";
            enemy.dispatchEvent(new Event('cardselection'));
       })

        //enemy choose the card

            var enemy = new Label();

            enemy.score = 0;
            enemy.card  = "";
            enemy.x = 350; enemy.y = 50;

            enemy.addEventListener('cardselection',function(){
               this.score = Math.floor(Math.random() * 5);

               if(this.score == 0){
                    this.card = "Emperor";
                    this.text = this.card + " " + this.score;

               }    else if (this.score == 1){
                    this.card = "Slave";
                    this.text = this.card + " " + this.score;
               } else{
                    this.card = "Citizen";
                    this.text = this.card + " " + this.score;
               }
              
               firststage.addChild(this);
               cardJudge(mycard, enemy.card);
               
            })      

    // transferred from title to first stage
    startscene.addEventListener('touchstart',function(){       
        game.replaceScene(firststage);

        firststage.backgroundColor = "#009900";

        // display Ecard (enemy)
        
        for( i=0; i<5; i++){
           ecardomote[i].x = 60 * i + 40; ecardomote[i].y=90; 
           ecardomote[i].scaleY = -1;
           firststage.addChild(ecardomote[i]);
        }
        
        // display Ecard (player)
        
        ecardemp.x = 40; ecardemp.y=190;
        firststage.addChild(ecardemp);

        for( i=0; i<3; i++) {
            ecardciti[i].x = 60 * i +100; ecardciti[i].y=190;
            firststage.addChild(ecardciti[i]);
        }

        ecardsl.x = 280; ecardsl.y=190;
        firststage.addChild(ecardsl);

        var startcard = new Label("Please select card");
        startcard.x = 50; 
        startcard.y = 300;
        firststage.addChild(startcard);

        //stop prologue thema song
    }); 

    // Transferred to result scene 

    var cardJudge = function(me, enemy){
        if(me == enemy){
        console.log("draw")
    }else if(me == "Emperor"){
        if(enemy == "Slave"){
            console.log("lose");
        }else if(enemy == "Citizen"){
            console.log("win");
        }
    } else if(me == "Citizen"){
        if(enemy == "Emperor"){
            console.log("lose");
        } else if(enemy  == "Slave"){
            console.log("win");
        } 
    } else if(me == "Citizen"){
        if(enemy  == "Emperor"){
            console.log("lose");
        } else if(emeny == "Slave") {
            console.log("win");
        }
    }


    }
    

};

game.start();


}
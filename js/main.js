enchant ();


window.onload = function () {
    var game = new Game(420,320);
    game.preload('asset/Ecardomote.png','asset/Ecardemperor.png','asset/Ecardcitizen.png','asset/Ecardslave.png');
    game.preload('asset/kaiji.jpg','asset/tonegawa.jpg');
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
    
        var ecardomote = new Sprite(54,82);
        //   ecardomote.image = game.assets['asset/Ecardomote.png'];
        //   ecardomote.scaleX = -1; ecardomote.scaleY = -1;
    
        var ecardemp = new Sprite(54,82);
            ecardemp.image = game.assets['asset/Ecardemperor.png'];
            ecardemp.card = "Emperor";

        var ecardciti = new Array();
            for ( i=0; i<3; i++){
                ecardciti[i] = new Sprite(54,82);
                ecardciti[i].image = game.assets['asset/Ecardcitizen.png'];
                ecardciti[i].card = "Citizen";
            }

        var ecardsl = new Sprite(54,82);
            ecardsl.image = game.assets['asset/Ecardslave.png'];
            ecardsl.card = "Slave";

        var enemy = new Label();
        var onplay = true;
        //Initial message

        var startgame = new Label("Please select a card");
        startgame.x = 110; 
        startgame.y = 290;
        startgame.font ="20px meiryo";
        startgame.color = "white";

        //Enemy algorism (how enemy chose a card)

        var enemyturn = 0;
        var ealgo = [0,1,2,3,4];
        
        for ( j =0; j < 20; j++){
            i = Math.floor(Math.random() * 5);
            t = ealgo [4];
            ealgo[4] = ealgo [i];
            ealgo[i] = t;
            console.log("i= " + i + "  " + ealgo);
        }
        
        //mycard
        var mycard ="";

    // transferred from title to first stage
        var firststage = new Scene();

        startscene.addEventListener('touchstart',function(){       
            game.replaceScene(firststage);
            firststage.backgroundColor = "#009900";
            

       // display Ecard (player)
        
        ecardemp.x = 70; ecardemp.y=210;
        firststage.addChild(ecardemp);

        for( i=0; i<3; i++) {
            ecardciti[i].x = 60 * i +130; ecardciti[i].y=210;
            firststage.addChild(ecardciti[i]);
        }

        ecardsl.x = 310; ecardsl.y=210;
        firststage.addChild(ecardsl);

        // display start msg

        firststage.addChild(startgame);

        //stop prologue thema song

        // how to manage cards   
         //select card
        for ( i=0; i<3; i++){
            ecardciti[i].addEventListener('touchstart', function(){

                if(onplay){
                    onplay = false;
                    firststage.removeChild(startgame);
                    enemyPick();
                    cardPick(this);
                } 
        });
        }  
        
        ecardemp.addEventListener('touchstart', function(){
            if(onplay){
                onplay = false;
                firststage.removeChild(startgame);
                enemyPick();
                cardPick(this);
            } 
        });
         
        ecardsl.addEventListener('touchstart', function(){
            if(onplay){
                onplay = false;
                firststage.removeChild(startgame);
                enemyPick();
                cardPick(this);
            }             
        });
                                        
    });    


    // pick up a random card (which card enemy will chose)

    function enemyPick() {
    
            enemy.score = ealgo[enemyturn];
            
            
            if(enemy.score == 0){
                    enemy.card = "Emperor";
                    enemy.text = enemy.card + " " + enemy.score;

               }    else if (enemy.score == 1){
                    enemy.card = "Slave";
                    enemy.text = enemy.card + " " + enemy.score;
               } else{
                    enemy.card = "Citizen";
                    enemy.text = enemy.card + " " + enemy.score;
               }

            enemy.x = 350; enemy.y = 50;
            
            firststage.addChild(enemy);

    }


    // pick up card function

    function cardPick(c) {
                ecardomote.image = game.assets['asset/Ecardomote.png'];
                ecardomote.scaleX = -1; ecardomote.scaleY = -1;
                ecardomote.x = 0; ecardomote.y = 0;
    
                firststage.addChild(ecardomote);
                ecardomote.tl.fadeIn(10).moveTo(100,90,40);
                
                c.tl.moveTo(210,90,40).then(function(){
                    mycard = c.card;
                }).delay(50).then(function(){
                    cardOpen(c);
                });
                c.image = game.assets['asset/Ecardomote.png'];

        
        }


    // open card function

    function cardOpen(c){
            if(enemy.card == "Emperor") {
                ecardomote.image = game.assets['asset/Ecardemperor.png'];
            }else if(enemy.card == "Citizen") {
                ecardomote.image = game.assets['asset/Ecardcitizen.png'];
            }else{
                ecardomote.image = game.assets['asset/Ecardslave.png'];
            } if ( mycard == "Emperor") {
                c.image = game.assets['asset/Ecardemperor.png'];
            } else if (mycard == "Citizen"){
                 c.image = game.assets['asset/Ecardcitizen.png'];
            }else {
                 c.image = game.assets['asset/Ecardslave.png'];
            }

            setTimeout(function(){
                cardJudge(mycard, enemy.card, c);
            },5000);


    }

   // card judge function

    function cardJudge(me, enemy, mycard){
        var judge ="";


        if(me == enemy){
        console.log("draw");
        if(enemyturn == 4){
            judge = "draw";
            winningResult(judge);
        }else{
            clearTable(mycard);        
        }            
    }else if(me == "Emperor"){
        if(enemy == "Slave"){
            judge = "lose";
            console.log(judge);
            winningResult(judge);
        }else if(enemy == "Citizen"){
            judge = "win";
            console.log(judge);
            winningResult(judge);
        }
    } else if(me == "Citizen"){
        if(enemy == "Emperor"){
            judge ="lose";
            console.log(judge);
            winningResult(judge);
        } else if(enemy  == "Slave"){
            judge = "win";
            console.log(judge);
            winningResult(judge);
        } 
    } else if(me == "Slave"){
        if(enemy  == "Emperor"){
            judge = "win";
            console.log(judge);
            winningResult(judge);
        } else if(enemy == "Citizen") {
            judge = "lose";
            console.log(judge);
            winningResult(judge);
        }
    }

    }

    function clearTable(c){
        ecardomote.tl.fadeOut(30);
        c.tl.fadeOut(30);
        enemyturn++;
        firststage.addChild(startgame);
        //c.clearEventListener("enterframe");
        onplay = true;
    }


    // Define the scene after card selection 
    
    var winstage = new Scene();
        winstage.backgroundColor = "#222222";
        
        var winner = new Sprite(250,150);
        winner.image = game.assets['asset/kaiji.jpg'];
        winner.x = 85; winner.y = 50;
        
        var winmsg = new Label();
        winmsg.text = "俺の勝ちだ、利根川！";
        winmsg.font = "26px meiryo";
        winmsg.color = "white";
        winmsg.x = 90; winmsg.y = 250;

        winstage.addChild(winner);
        winstage.addChild(winmsg);
       
    var losestage = new Scene();
        losestage.backgroundColor = "#222222";
        
        var loser = new Sprite(250,150);
        loser.image = game.assets['asset/tonegawa.jpg'];
        loser.x = 85; loser.y = 50;
        
        var losemsg = new Label();
        losemsg.text = "カイジくん、君の負けだ！";
        losemsg.font = "26px meiryo";
        losemsg.color = "white";
        losemsg.x = 70; losemsg.y = 250;

        losestage.addChild(loser);
        losestage.addChild(losemsg);

    var drawstage = new Scene();
        drawstage.backgroundColor = "#222222";

        var drawer = new Sprite(250,150);
        drawer.image = game.assets['asset/kaiji.jpg'];
        drawer.x = 85; drawer.y = 50;

        var drawmsg = new Label();
        drawmsg.text = "引き分けかっっ。。。";
        drawmsg.font = "26px meiryo";
        drawmsg.color = "white";
        drawmsg.x = 70; drawmsg.y = 250;

        drawstage.addChild(drawer);
        drawstage.addChild(drawmsg);


    function winningResult(e){

            if( e == "win") {
                game.replaceScene(winstage);                
            } else if ( e == "lose" ){
                game.replaceScene(losestage);
            } else {
                game.replaceScene(drawstage);
            }

            setTimeout(function(){
                    game.onload();
                }, 3000);
        
        }

        

};

game.start();

}
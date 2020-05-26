var check = 0, x, randInterval = 1200, randObsNumber, playerLeft = 100, playerRight = 185, playerBottom = 160, score =0 ;
document.querySelector('.player').style.bottom = 160 +'px';

// object template

class hurdle {

  //static check = 0;
  constructor(obs){
    this.obs = obs;
    this.rightValue;
    this.height;
    this.leftValue = 1300;
    this.obs.style.left = 1300 + 'px';
  }

  slide(obs, randObsNumber) {
    //do something

    
    let int = setInterval(() => {
      
      if(check == 0){
        if(this.leftValue<= -50){
          clearInterval(int);
        }
  
        this.leftValue = this.leftValue - 2;
        obs.style.left = this.leftValue + 'px';
  
        switch(randObsNumber){
          case 1:{this.rightValue = this.leftValue + 50;
            this.height = 160 + 50 ;
          } 
          break;
          case 2:{this.rightValue = this.leftValue + 40;
            this.height = 160 + 50;
          } 
          break;
          case 3:{this.rightValue = this.leftValue + 45;
            this.height = 160 + 60;
          } 
          break;
  
        }
        var playerBtm = parseInt(document.querySelector('.player').style.bottom.slice(0,3)) ;
        // check for collision
        if(((this.leftValue + 30)< playerRight)&& ((this.rightValue - 30) >= playerLeft)&& (playerBtm)<= this.height){
          

          this.gameOver();
          //alert("Game Over");
          clearInterval(int);
         // location.reload();
        }
        
      }
      
    },5);
  }

  gameOver(){

    

 
    var gameOver = new Audio('gameover.mp3');
    gameOver.play();
    //console.log(gameOver);


    if(check == 0){
     // console.log(check);



     clearInterval(x);
      let end = document.createElement('div');
      end.innerHTML = 'GAME OVER';
      end.classList.add('end');
      document.querySelector('.main').append(end);
      document.removeEventListener('keydown', jump);
      document.querySelector('.player').classList.add('dead-hero');
      
      

      setTimeout(()=>{
        document.querySelector('.player').style.display = 'none';
      }, 3995)
      
      let play = document.querySelector('a');
      play.style.display = 'inline-block';
      play.addEventListener('click', (e)=> {
        // console.log(e);

        var click = new Audio('mouseClick.mp3');
        click.play();
        let x = e.clientX - e.target.offsetLeft;
        let y = e.clientY - e.target.offsetTop;

        let ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        play.append(ripple);
        setTimeout(()=>{
          location.reload();
        },1000);

      })
    }

    check = 1;
    
    
  }
}





function doSomething() {
  
    
  randObsNumber = Math.floor(Math.random()*3)+1;
  let obs = document.createElement('img');

  //randInterval = Math.floor((Math.random()*500))+500;

  
  switch(randObsNumber){
    case 1: {
      obs.classList.add('hurdle1');
      obs.setAttribute('src','ghost1.png');
    }break;
    case 2: {
      obs.classList.add('hurdle2');
      obs.setAttribute('src','ghost2.png');
    }break;
    case 3: {
      obs.classList.add('hurdle3');
      obs.setAttribute('src','ghost3.png');
    }break;
  }

  document.querySelector('.main').append(obs);

  let obj = new hurdle(obs);
  obj.slide(obs,randObsNumber);

}

(function loop() {
    var rand = Math.floor((Math.random()*1000))+800;
    x = setTimeout(function() {
            doSomething();
            loop();  
    }, rand);
}());















//   x = setInterval(()=>{
// }, randInterval);

document.addEventListener('keydown', jump = () => {

  let jumpSound = new Audio('jump.mp3');
  jumpSound.play();
  //console.log(event.keyCode);

  if(event.keyCode == 32){
    let flag = 0;
    let int = setInterval(()=>{
      if(flag == 0){
        if(document.querySelector('.player').style.bottom != '320px'){ 
          playerBottom = playerBottom + 2;
          document.querySelector('.player').style.bottom = playerBottom + 'px';
        }
        else{flag = 1;}
      }
      else{
        if(document.querySelector('.player').style.bottom != '160px'){
          playerBottom = playerBottom - 2;
          document.querySelector('.player').style.bottom = playerBottom + 'px';

        }
        else{
          flag = 0;
          score = score + 10;
          document.querySelector('#score').innerHTML = 'Your total score: ' + score;
          clearInterval(int);
        
        }

      }

    },2)
  }
})








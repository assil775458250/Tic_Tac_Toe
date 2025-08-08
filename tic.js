// get element
var element_square;
var title_game = document.getElementsByClassName('title')[0];
var secondcolor = '#ffe100';
var class_game = document.getElementsByClassName('game')[0];


// programing to GAME

let turn_value = 'X';
var squares =[];

function end_game(num1,num2,num3)
{
     title_game.innerHTML=`<span style="color:${secondcolor}">${squares[num1]}</span> is winner `;
    document.getElementById("item"+num1).style.backgroundColor="#000";
    document.getElementById("item"+num2).style.backgroundColor="#000";
    document.getElementById("item"+num3).style.backgroundColor="#000";
   
    setInterval(() => {
        title_game.innerHTML+='.';
    }, 1000);
    setTimeout(()=>{location.reload();},4000);

    var random = Math.floor(Math.random()*3)+1;

    if (random==1)
    {
         document.body.innerHTML+=`
    <img src="13881044701.gif" alt="" style="width: 100vw;height: 100vh;position: absolute;">
    `;
    }
    else if (random == 2)
     {
        class_game.innerHTML+=`<img src="winner-2-16473.gif" alt="" style="border-radius: 50%;width: 100%; margin-top: 180px;position: absolute;top: 0;left: 0px;">`;
     }
     else if (random == 3)
     {
        class_game.innerHTML+=`<img src="winner-gif-1.gif" alt="" style="border-radius: 50%;width: 100%;position: absolute;top: 0;left: 0px;">`;
     
     }

    
    
}

function winner()
{
for (let i =1 ; i<10;i++)
{
    squares[i] = document.getElementById('item'+i).innerHTML;
}

// Horizontal comparison and verical and 
if (squares[1] == squares[2] && squares[2] == squares[3] && squares[1]!='')
{
   end_game(1,2,3);
}
else if (squares[4] == squares[5] && squares[5] == squares[6] && squares[5]!='')
{
    end_game(4,5,6);
}
else if (squares[7] == squares[8] && squares[8] == squares[9] && squares[8]!='')
{
    end_game(7,8,9);
}
// vertical comparison
else if (squares[1] == squares[4] && squares[4] == squares[7] && squares[1]!='')
{
    end_game(1,4,7);
}
else if (squares[2] == squares[5] && squares[5] == squares[8] && squares[5]!='')
{
    end_game(2,5,8);
}
else if (squares[3] == squares[6] && squares[6] == squares[9] && squares[9]!='')
{
    end_game(3,6,9);
}

//Compare diameters
else if (squares[1] == squares[5] && squares[5] == squares[9] && squares[5]!='')
{
    end_game(1,5,9);
}
else if (squares[3] == squares[5] && squares[5] == squares[7] && squares[5]!='')
{
    end_game(3,5,7);
}
else if (squares[1]!='' & squares[2]!=''& squares[3]!='' & squares[4]!='' & squares[5]!='' & squares[6]!='' & squares[7]!='' & squares[8]!='' & squares[9]!='')
{
        for (let i =1 ; i<10;i++)
    {
        document.getElementById('item'+i).style.backgroundColor="#3b3b3b";
    }
    title_game.innerHTML=`<span style="color:${secondcolor}">X</span> & <span style="color:${secondcolor}">O</span> are balence `;
    setInterval(() => {
            title_game.innerHTML+='.'
        }, 1000);
        setTimeout(()=>{location.reload();},4000);


        var random_end = Math.floor(Math.random()*3)+1;

    if (random_end==1)
    {
         class_game.innerHTML+=`<img src="2eedfb4c-a4b7-4a2d-8338-3742055fe1d1.gif" alt="" style="border-radius: 0%;width: 100%;position: absolute;top:  50px;left: 0px;">`;
    }
    else if (random_end == 2)
     {
        class_game.innerHTML+=`<img src="balance-3-14686.gif" alt="" style="border-radius: 50%;width: 100%;position: absolute;top:  180px;left: 0px;">`;
     }
     else if (random_end == 3)
     {
        class_game.innerHTML+=`<img src="bala.gif" alt="" style="border-radius: 50%;width: 100%;position: absolute;top:  50px;left: 0px;">`;
     
     }
     else{}
    } 
   
}

function game(id)
{

    element_square=document.getElementById(id);
    if(turn_value === 'X' && element_square.innerHTML=='')
    {
        element_square.innerText='X';
        turn_value = 'O';
        title_game.innerHTML=`Turn ( <span style="color:#ffe100">O</span> )`;

    }
    else if (turn_value === 'O' && element_square.innerHTML=='')
    {
        element_square.innerText='O';
        turn_value = 'X';
        title_game.innerHTML=`Turn (  <span style="color:${secondcolor}">X</span> )`;
    }
    else
    {

    }
    winner();
}
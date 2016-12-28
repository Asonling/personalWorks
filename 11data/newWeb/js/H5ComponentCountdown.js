   
var H5ComponentCountdown = function(name,cfg){
    var component = new H5ComponentBase(name, cfg);
    
    //初始化数据
    var Width = cfg.width/2,
        Height = cfg.height/2,
        Radius = cfg.radius,
        Top = cfg.Top,
        Left = cfg.Left;
    //初始化时间
    var endTime=new Date();
    endTime.setTime(endTime.getTime()+3600*1000);
    var curShowTimeSeconds = 0;

    var balls=[];
    var colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

   var getCurrentShowTimeSeconds = function() {
        var curTime = new Date();
        var ret = endTime.getTime() - curTime.getTime();
        ret = Math.round( ret/1000 )

        return ret >= 0 ? ret : 0;
    }
    var update = function(){
        var nextTimeSeconds=getCurrentShowTimeSeconds();

        var nextHours=parseInt(nextTimeSeconds/3600);
        var nextMinutes=parseInt(nextTimeSeconds%3600/60);
        var nextSeconds=nextTimeSeconds%60;

        var curHours=parseInt(curShowTimeSeconds/3600);
        var curMinutes=parseInt(curShowTimeSeconds%3600/60);
        var curSeconds=curShowTimeSeconds%60;

        if(curSeconds!=nextSeconds){
            if(parseInt(curHours/10) != parseInt(nextHours/10)){
                addBall(Left,Top,parseInt(nextHours/10));
            }
            if(parseInt(curHours%10) != parseInt(nextHours%10)){
                addBall(Left+15*(Radius+1),Top,parseInt(nextHours%10));
            }

            if(parseInt(curMinutes/10) != parseInt(nextMinutes/10)){
                addBall(Left+39*(Radius+1),Top,parseInt(nextHours/10));
            }
            if(parseInt(curMinutes%10) != parseInt(nextMinutes%10)){
                addBall(Left+54*(Radius+1),Top,parseInt(nextMinutes%10));
            }

            if(parseInt(curSeconds/10) != parseInt(nextSeconds/10)){
                addBall(Left+ 78*(Radius+1),Top,parseInt(nextSeconds/10));
            }
            if(parseInt(curSeconds%10) != parseInt(nextSeconds%10)){
                addBall(Left+93*(Radius+1),Top,parseInt(nextSeconds%10));
            }
            curShowTimeSeconds=nextTimeSeconds;
        }
        updateBalls();
    }

    var updateBalls = function(){
        for(var i=0;i<balls.length;i++){
            balls[i].x += balls[i].vx;
            balls[i].y += balls[i].vy;
            balls[i].vy += balls[i].g;

            if(balls[i].y >= Height-Radius){
                balls[i].y = Height;
                balls[i].vy= -balls[i].vy*0.65;
            }
        }

        var cnt = 0
        for( var i = 0 ; i < balls.length ; i ++ )
            if( balls[i].x + Radius > 0 && balls[i].x -Radius < Width )
                balls[cnt++] = balls[i]

        while( balls.length > cnt ){
            balls.pop();
        }

    }

    var addBall = function(x,y,num){
        for(var i=0;i<digit[num].length;i++)
            for(var j=0;j<digit[num][i].length;j++)
                if(digit[num][i][j] == 1){
                    var ball={
                        x:x+j*2*(Radius+1)+(Radius+1),
                        y:y+i*2*(Radius+1)+(Radius+1),
                        g:1+Math.random(),
                        vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                        vy:-5,
                        color:colors[Math.floor(Math.random()*colors.length)]
                    }
                    balls.push(ball);
                }
    }
    var render = function(ctx){
        ctx.clearRect(0,0,Width, Height);

        var hours=parseInt(curShowTimeSeconds/3600);
        var minutes=parseInt( (curShowTimeSeconds - hours * 3600)/60);
        var seconds=curShowTimeSeconds%60;

        renderDigit(Left,Top,parseInt(hours/10),ctx);
        renderDigit(Left+15*(Radius+1),Top,parseInt(hours%10),ctx);
        renderDigit(Left+30*(Radius+1),Top,10,ctx);
        renderDigit(Left+39*(Radius+1),Top,parseInt(minutes/10),ctx);
        renderDigit(Left+54*(Radius+1),Top,parseInt(minutes%10),ctx);
        renderDigit(Left+69*(Radius+1),Top,10,ctx);
        renderDigit(Left+78*(Radius+1),Top,parseInt(seconds/10),ctx);
        renderDigit(Left+93*(Radius+1),Top,parseInt(seconds%10),ctx);

        for(var i=0;i<balls.length;i++){
            ctx.fillStyle=balls[i].color;
            ctx.beginPath();
            ctx.arc(balls[i].x,balls[i].y,Radius,0,2*Math.PI);
            ctx.closePath();

            ctx.fill();
        }
    }
    var renderDigit = function(x,y,num,ctx){
        ctx.fillStyle='rgb(255,0,0)';
        for(var i=0;i<digit[num].length;i++)
            for(var j=0;j<digit[num][i].length;j++)
                if(digit[num][i][j]==1){
                    ctx.beginPath();
                    ctx.arc(x+j*2*(Radius+1)+(Radius+1),y+i*2*(Radius+1)+(Radius+1),Radius,0,2*Math.PI);
                    ctx.closePath();
                    ctx.fill();
                }
    }



    //加入画布
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = Width;
    cns.height = ctx.height = Height;
    component.append(cns);
    //取得现在的时间
    curShowTimeSeconds = getCurrentShowTimeSeconds();
    //console.log(curShowTimeSeconds);
    setInterval(function(){
        render(ctx);
        update();
    },100);
 
    return component;

};

   
/* 柱图组件对象 */
var H5ComponentPolyline = function(name,cfg){
    var component = new H5ComponentBase(name , cfg);
    

    //绘制网格线
        var w = cfg.width;
        var h = cfg.height;
        
        //加入画布，做网格线背景
        var cns = document.createElement('canvas');
        var ctx = cns.getContext('2d');
        cns.width = ctx.width = w;
        cns.height = ctx.height = h;
        component.append(cns);
        
        
        //水平网格线10份(10份)
        var step = 10;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(242,241,239,0)';
        
        window.ctx = ctx;
        for(var i = 0;i < step + 1;i ++){
            var y = (h/step) * i;
            ctx.moveTo(0,y);
            ctx.lineTo(w,y);
            
        }
        //垂直网格线,根据项目个数分
        step = cfg.data.length + 1;
        for(var i = 0;i < step + 1;i ++){
            var x = (w/step)*i;
            ctx.moveTo(x,0);
            ctx.lineTo(x,h);
            
            var text_w = w/step >> 0;
            //这里需要判断是否存在cfg.data[i]是因为step参数
            if(cfg.data[i]){
                var text= $('<div class = "text">');
                text.text(cfg.data[i][0]);
                
                text.css('width',text_w/2).css('left',x/2 - text_w/4 + text_w/2);
                
                component.append(text);
            }
        }
        //结束绘制网格背景及添加项目名称
         ctx.stroke();
         
        //绘制折线,背景
        var cns = document.createElement('canvas');
        var ctx = cns.getContext('2d');
        cns.width = ctx.width = w;
        cns.height = ctx.height = h;
        component.append(cns);
        //绘制折线
        var draw = function(per){
            //清空画布，否则所有数据将要重叠，几乎每一个图表组件都要注意这个问题
            ctx.clearRect(0,0,w,h);    
            
            //绘制折线数据
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ff8878';
            
            //画点
            var x = 0, y = 0;
            var row_w = (w/(cfg.data.length + 1));
            for(i in cfg.data ){
                var item = cfg.data[i];
                x = row_w *i + row_w;
                y = h -(item[1]*h/1000*per);
                ctx.moveTo(x,y);
                ctx.arc(x,y,5,0,2*Math.PI);
            }
            
            //连线
            //移动画笔到第一个点的位置
            ctx.moveTo(row_w,h -(cfg.data[0][1]*h/1000*per));
            for(i in cfg.data){
                var item = cfg.data[i];
                x = row_w *i + row_w;
                y = h -(item[1]*h/1000*per);
                ctx.lineTo(x,y);
            }
            
            ctx.stroke();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgba(255,0,18,0)';
            //绘制阴影
            ctx.lineTo(x,h);
            ctx.lineTo(row_w,h);
            ctx.fillStyle='rgba(255,0,0,0.2)';
            ctx.fill();
            
            
            //写数据
             for(i in cfg.data ){
                var item = cfg.data[i];
                x = row_w *i + row_w;
                y = h -(item[1]*h/1000*per);
                
                if(item[2]){
                    ctx.fillStyle = item[2] ? item[2]: '#FF0012';
                }
                
                ctx.fillText(item[1],x-10,y-10);
            }
            
           ctx.stroke();
      };
  
   component.on('onLoad',function(){
       //折线图生长动画
       
       var s = 0;
       for(var i = 0;i < 100 ;i ++){
           setTimeout(function() {
               s += 0.01;
               draw(s);
           }, i * 10 + 500) ;
       }
   });
   
   component.on('onLeave',function(){
       
       //折线图退场动画
       var s = 1;
       for(var i = 0;i < 100 ;i ++){
           setTimeout(function() {
               s -= 0.01;
               draw(s);
           }, i * 10);
       }
   });
    
    return component;
}



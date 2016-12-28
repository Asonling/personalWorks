/* 饼图组件对象 */
var H5ComponentPie= function(name,cfg){
    var component = new H5ComponentBase(name , cfg);
    
    //绘制网格线
    var w = cfg.width;
    var h = cfg.height;
    var r = w/2;
    //加入底图层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex','1');
    component.append(cns);
    //绘制背景层
    ctx.beginPath();
    ctx.fillStyle = '#eee';
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();
     //绘制数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex','2');
    component.append(cns);
    //备用颜色，设置开始的角度是在十二点钟的方向，结束角度，100%的圆结束的角度为360deg  
    var colors = ['#FF0012','#EDE747','#37C2E0','#AE2841','#F590B2','#F92672','#EA0D42','#F675E3'];//备用颜色
    var sAngel = 1.5*Math.PI,
        eAngel = 0,
        aAngel = Math.PI*2;
    
    
    var step = cfg.data.length;
    for(var i = 0;i<step;i++){
        var item = cfg.data[i];
        var color = item[2]||(item[2] = colors.pop());
        eAngel = sAngel + aAngel *item[1];
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = 0.1;
        ctx.moveTo(r,r);
        ctx.arc(r,r,r,sAngel,eAngel);
        
        ctx.fill();
        ctx.stroke();
        sAngel = eAngel;

    
        //加入所有的文本及百分比
        var text = $('<div class= "text">');
        text.text(cfg.data[i][0]);
        var per = $('<div class = "per">');
        // per.text (((cfg.data[i][1]*100)>>0) +'%');
        // text.append(per);
        
        var x = r + Math.sin(0.5*Math.PI - sAngel)*r,
            y = r + Math.cos(0.5*Math.PI - sAngel)*r;
        // text.css('left',x/2);
        // text.top('top',y/2);
        
        if(x > w/2){
            text.css('left', x/2);
        }else{
            text.css('right',(w - x)/2);
        }
        
        if(y > h/2){
            text.css('top', y/2);
        }else{
            text.css('bottom',(h - y)/2);
        }
        
        if(cfg.data[i][2]){
            text.css('color', cfg.data[i][2]);
        }
        text.css('opacity', '0');
        component.append(text);
        
        
    }
   // 加入蒙版层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex','3');
    component.append(cns);
    
    ctx.beginPath();
    ctx.fillStyle = '#eee';
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 1;
    
    var draw = function(per){
      //饼图生长动画
       ctx.clearRect(0,0,w,h);
       ctx.beginPath();
       ctx.moveTo(r,r);
       
       if(per<=0){
            ctx.arc(r,r,r,0,2*Math.PI);
            component.find('.text').css('opacity',0);
       }else{
           ctx.arc(r,r,r,sAngel,sAngel+2*Math.PI*per,true);
       }
       
       ctx.fill();
       ctx.stroke();
       
       if(per >=1){
           component.find('.text').css('opacity',1);
           ctx.clearRect(0,0,w,h);
       }
       
    };
     draw(0);  
   component.on('onLoad',function(){
       //饼图生长动画
       
       var s = 0;
       for(var i = 0;i < 100 ;i ++){
           setTimeout(function() {
               s += 0.01;
              draw(s);
           }, i * 10 + 500) ;
       }
   });
   
   component.on('onLeave',function(){
       
       //饼图退场动画
       var s = 1;
       for(var i = 0;i < 100 ;i ++){
           setTimeout(function() {
               s -= 0.01;
               draw(s);
           }, i * 10);
       }
   });
    
   return component;
};

// H5ComponentPie.reSort = function( list ){
//     //检测相交
//     var compare = function(domA,domB){
//         //元素的位置不用left因为有时候left为auto
//         //元素位置
//         var offsetA = $(domA).offset(),
//             shadowA_x = [offsetA.left,$(domA).width() + offsetA.left],
//             shadowA_y = [offsetA.top,$(domA).height + offsetA.top],
//             shadowB_x = [offsetB.left,$(domB).width + offfsetB.left],
//             shadowB_y = [offsetB.top,$(domB).height + offsetB.top];
//         //检测x
//         var intersect_x = (shadowA_x[0] > shadowB_x[0] && shadowA_x[0] < shadowB_x[1])
//     };
    
//     //重排
//     var reset = function(domA, domB){
        
//     };
// }
/* 柱图组件对象 */
var H5ComponentBar = function(name , cfg){
    
    var component = new H5ComponentBase(name,cfg);
    
    $.each(cfg.data,function(idx, item){
        
        var line = $('<div class = "line">'),
            name = $('<div class = "name">'),
            rate = $('<div class = "rate">'),
            per = $('<div class = "per">');
            
       var width = ((item[1]/2*100)>>0);
       
       var bgStyle = '';
       if(item[2]){
           bgStyle = 'style = "background-color:'+item[2]+'"';
       }
       
       rate.html('<div class = "bg" '+bgStyle+'></div>');
       
       rate.css('width',width + '%');
       per.text(width*2+'%' );
       
        name.text( item[0] );
        line.append(name).append(rate).append(per);
        component.append(line);
        
    });
    
    return component;
};
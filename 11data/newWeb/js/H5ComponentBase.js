/* 基本图文组件对象 */
var H5ComponentBase = function(name, cfg){

	var cfg = cfg || {},
		id = ('h5_c' + Math.random()).replace('.', '_'),
		cls = 'h5_component_' + cfg.type;
	var component = $('<div class = "h5_component '+cls+' h5_component_name_'+ name +' " id = "'+id+'">');
	cfg.text && component.text( cfg.text );
	cfg.width && component.width( cfg.width/2 );
	cfg.height && component.height( cfg.height/2 );
	cfg.css && component.css( cfg.css );
	cfg.bg && component.css('backgroundImage','url('+ cfg.bg +')');
	cfg.onlick && component.onlick(function(){cfg.onlick;});

	if(cfg.center === true){
			component.css({
				marginLeft:(cfg.width/4 * -1)+'px',
				left:'50%'
			})
	}
 	//接收onLoad和onLeave事件
	component.on('onLoad',function(){
		component.addClass(cls + '_Load').removeClass(cls + '_Leave');
		cfg.animateIn && component.animate(cfg.animateIn);
		return false;
	});
	component.on('onLeave',function(){
		component.addClass(cls + '_Leave').removeClass(cls + '_Load');
		cfg.animateOut && component.animate(cfg.animateOut);
		return false;
		//注意dom事件的无限传播
	});

	return component;
};


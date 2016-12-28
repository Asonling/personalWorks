/* 内容管理对象 */
var H5 = function(){
	this.id = ('h5_' + Math.random()).replace('.','_');
	this.el = $('<div class = "h5_" id ="' + this.id + '">');
	this.page = [];
	$('body').append(this.el);

	//新增页
	this.addPage = function(name, text){
		var page = $('<div class = "h5_page section">');
		if(name != undefined){
			page.addClass('h5_page_'+ name);
		}
		if(text != undefined){
			this.page.text(text);
		}

		this.el.append(page);
		this.page.push(page);

		return this;
	};
	//新增组件
	this.addComponent = function(name, cfg){
		var cfg = cfg || {};
		var page = this.page.slice(-1)[0];
		cfg = $.extend({type: 'base'},cfg);
		var component ;
		switch(cfg.type){
			case 'base':
				component = new H5ComponentBase(name,cfg);
				break;
			case 'polyline':
			    component = new H5ComponentPolyline(name,cfg);
			    break;
		    case 'bar':
			    component = new H5ComponentBar(name,cfg);
			    break;
		    case 'bar_v':
			    component = new H5ComponentBar_v(name,cfg);
			    break;
		    case 'pie':
			    component = new H5ComponentPie(name,cfg);
			    break;
			case 'point':
			    component = new H5ComponentPoint(name,cfg);
			    break;
			case 'radar':
			    component = new H5ComponentRadar(name,cfg);
			    break;
			case 'ring':
			    component = new H5ComponentRing(name,cfg);
			    break;
			case 'time':
			    component = new H5ComponentCountdown(name,cfg);
			    break;
			default:
		}
		page.append(component);
		return this;
	};
	//新增打开方式
	this.loader = function(firstPage){

		this.el.fullpage({
			onLeave: function(index, nextIndex,direction){
				$(this).find('.h5_component').trigger('onLeave');
			},
			afterLoad: function(anchorLink, index){
				$(this).find('.h5_component').trigger('onLoad');
			}		
		});

		this.page[0].find('.h5_component').trigger('onLoad');
		this.el.show();
		if(firstPage){
			$.fn.fullpage.moveTo(firstPage);
		}
	};

	return this;
};
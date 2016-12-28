//调整标语动画
$(window).on('load', function(){
	$('.page1 .slogan').animate({'opacity': 1,'marginTop': '20%','border-width':2},1000);
})

$(function(){
	//分页
	$('.main').onepage_scroll({
		sectionContainer: '.page',
		beforeMove: function(index){
			//页面标题动画处理
			var Parent = '.page' + index;
			$(Parent).find('h1').animate({'opacity': 0,'marginTop': '5%'}, 300);
			$(Parent).find('.slogan') && $(Parent).find('.slogan').animate({'opacity': 0,'border-width': 0,'marginTop':'15%' },300);
		},
		afterMove :function(index){
			//页面标题动画处理
			var Parent = '.page' + index;

			$(Parent).find('h1').animate({'opacity': 1,'marginTop':'15%'}, 500);
			$(Parent).find('.slogan') && $(Parent).find('.slogan').animate({'opacity': 1,'border-width': 2 ,'marginTop': '20%'},1000);
		}
	});

	//滚动监听导航
	$('.main').scrollspy({target:'#navbar-page'});

	//调试页面控制
	// $('.main').moveTo(4);

	//关于我们
	//判断屏幕宽度，然后调整 tip 位置
	$('.page2 .btn-self').hover(function(){
		//获取tip 内容
		var title = $(this).attr('data-tip');
		//渲染内容
		$('.tip em').text(title);
		//计算位置
		var Position = getTop(this);

		$('.tip').css('left',Position[0]).animate({'opacity':1,'top':Position[1]},300);

	},function(){
		var Position = getTop(this);

		$('.tip').finish().animate({'top':(Position[1]-20),'opacity':0},300);

	});

	//属于我们
	
	var belongUs = $('.page3').find('.belongus');
	//文字动画
	belongUs.each(function(){
		$(this).hover(function(){
			//文字动画
			$(this).css({padding: '0'});
			$(this).find('img').animate({width: '120%',height: 'inherit'});
			$(this).find('.belong-text').fadeIn();

		}, function(){
			//文字动画
			$(this).css({paddingLeft: '15px',paddingRight: '15px'});
			$(this).find('img').animate({width: '100%',height: 'inherit'});
			$(this).find('.belong-text').fadeOut();
		});
	});
	//联系我们
	var 
		serviceList = $('#dropdown-list li'),
		serviceValue = $('#dropdown-value');
	//对下拉菜单作文字处理
	serviceList.each(function(){
		$(this).click(function(){
			var Value = $(this).text();
			serviceValue.attr('value',Value)
		});
	});

	var Name = $('#msForm').find()
});

function getTop(item){
	//声明数组存储位置信息
	var positionArray =[];

	//获取btn位置及高度
	var 
		btnTop = $(item).offset().top,
		btnLeft = $(item).offset().left,
		btnHeight = $(item).outerHeight();
	//计算tip 位置
	var 
		l = ($('.tip').outerWidth()-$(item).outerWidth())/2,
		Left = btnLeft - l,
		Top = btnTop - btnHeight - 10;

	//对最后一个按钮的tip做溢出处理
	if(($(item).hasClass('btn-game')) && ($(window).width() < 800)){
		Left -= 30;
	}

	positionArray.push(Left);
	positionArray.push(Top);

	return positionArray;
}


$(window).on('load',function(){

	// 首页图片自动切换
	var slideBox = $('#slideBox'),
		prevBtn = $('.prev-btn-show'),
		nextBtn = $('.next-btn-show'),
		slideArea = $('.slide_imgs')
		slideImgs = slideBox.find('li');
	var index = 0,
		timer = null;
	if(timer){
		clearInterval(timer);
          timer=null;  
	}
	timer=setInterval(autoPlay,2000);
	//设置切换按钮
	slideBox.hover(function(){
		prevBtn.show();
		nextBtn.show();
		clearInterval(timer);
        timer=null;
	},function(){
		prevBtn.hide();
		nextBtn.hide();
		timer=setInterval(autoPlay,2000);
	});
	prevBtn.click(function(){
		index --;
		if(index == -1){
			index = 4;
		}
		slideArea.css('top', '-'+ index*200 +'px');
	});
	nextBtn.click(function(){
		index ++;
		if(index == 5){
			index = 0;
		}
		slideArea.css('top', '-'+ index*200 +'px');
	});
	//定义自动播放函数
	function autoPlay(){
        for(var i=index;i<slideImgs.length;i++){
             slideArea.css('top', '-'+ index*200 +'px');
        }
        slideArea.css('top', '-'+ index*200 +'px');
        index++;
        if(index==5){
          index=0;
        }   
	}


	//图片预览区数目提示区域
	var countTips  = $('.count_tips'),
		imgBoxs    = $('.w_img');

	$(imgBoxs).each(function(i){

		var index  = i,
			Counts = $(this).children('img').length,
			Width  = ($(this).children('img').eq(0).width()),
			Height  = ($(this).children('img').height());
		if(Counts <= 1){
			$(this).children('span').hide();
		}
		$(this).css({
			width: Width,
			height: Height
		});
		$(this).children('span').text(Counts);
	})

	//设置热门搜词背景颜色
	var hotWords = $('.hot_words li');
	var colors = ['#FF9D8C', '#8CF3FF','#8C93FF','#A1FF8C','#FFD88C','#CF99AE','#DA8CFF','#FFC88C']
	hotWords.each(function(i){
		$(this).css('background-color',colors.pop());
	});
	
	//点赞与评论
	var wOptions = $('.w_option .item');
	var flag = true;
	//遍历item 
	wOptions.each(function(index){			
		$(this).find('a').click(function(){
			if(flag){
				$(this).css('color', '#6D79DE');
				flag = false;
			}else{
				$(this).css('color', '#FFDB38');
				flag = true;
			}
		});
	});
	
})
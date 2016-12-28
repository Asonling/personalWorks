;(function($){

	var LightBox = function(lightbox){
		var self = this;

		//创建遮罩和弹出框
		this.popupMask = $("<div id='G-lightbox-mask'>");
		this.popupWin = $("<div id = 'G-lightbox-popup'>");

		this.bodyNode = $(document.body);

		this.renderDOM();

		this.picViewArea = this.popupWin.find('div.lightbox_view');//图片预览区域
		this.popupPic = this.popupWin.find('img.lightbox_img');//图片
		this.picCaptionArea = this.popupWin.find('div.lightbox_pic_caption');

		this.nextBtn = this.popupWin.find('span.lightbox_next_btn');
		this.prevBtn = this.popupWin.find('span.lightbox_prev_btn');
		this.captionText = this.popupWin.find('p.lightbox_pic_desc');
		this.currentIndex = this.popupWin.find('span.lightbox_of_index');
		this.closeBtn = this.popupWin.find('span.lightbox_close_btn');

		//准备开发事件委托，获取组数据
		this.groupName = null;
		this.groupData = [];//放置同一组数据
		this.bodyNode.delegate('.js_lightbox, [data-role = lightbox]','click',function(e){
			//阻止事件冒泡
			e.stopPropagation();
			var currentGroupName = $(this).attr('data-group');

			if(currentGroupName != self.groupName){
				self.groupName = currentGroupName;
				//根据当前组名获取同一组数据
				self.getGroup();
			}

			//初始化弹窗
			self.initPopup($(this));


		});
		this.popupMask.click(function(){
			$(this).fadeOut();
			self.popupWin.fadeOut();
		});
		this.closeBtn.click(function(){
			self.popupMask.fadeOut();
			self.popupWin.fadeOut();
			self.clear = false;
		});

		this.flag = true;
		this.nextBtn.hover(function(){
			if($(this).hasClass('disabled') && self.groupData.length > 1){
				$(this).addClass('lightbox_next_btn_show');
			}
		},function(){
			if($(this).hasClass('disabled') && self.groupData.length > 1){
				$(this).removeClass('lightbox_next_btn_show');
			}
		}).click(function(e){
			if($(this).hasClass('disabled') && self.flag == true){
				this.flag = false;
				e.stopPropagation();
				self.goto('next');
			}
		});
		this.prevBtn.hover(function(){
			if($(this).hasClass('disabled') && self.groupData.length > 1){
				$(this).addClass('lightbox_prev_btn_show');
			}
		},function(){
			if($(this).hasClass('disabled') && self.groupData.length > 1){
				$(this).removeClass('lightbox_prev_btn_show');
			}
		}).click(function(e){
			if($(this).hasClass('disabled') && self.flag == true){
				this.flag = false;
				e.stopPropagation();
				self.goto('prev');
			}
		});

		//绑定窗口调整事件
		var timer = null;
		this.clear = false;
		$(window).resize(function(){
			if(self.clear){
				window.clearTimeout(timer);
				timer =window.setTimeout(function(){
						self.loadPicSize(self.groupData[self.index].src);
				},400);
			}
		}).keyup(function(e){
			var keyValue = e.which;
			if(self.clear){
				if(keyValue == 38 || keyValue == 37){
					self.prevBtn.click();
				}else if(keyValue == 39 || keyValue == 40){
					self.nextBtn.click();
				}
			}
		});

	};

	LightBox.prototype = {
		goto: function(dir){
			if(dir === 'next'){
				//this.groupData
				//this.index
				this.index ++;
				if(this.index >= this.groupData.length - 1){
					this.nextBtn.removeClass('disabled').removeClass('lightbox-next-btn-show');
				}
				if(this.index != 0){
					this.prevBtn.addClass('disabled');
				}

				var src = this.	groupData[this.index].src;
				this.loadPicSize(src);
			}else if(dir === 'prev'){
				this.index--;
				if(this.index <= 0){
					this.prevBtn.removeClass('disabled').removeClass('lightbox-prev-btn-show');
				}
				if(this.index != this.groupData.length - 1){
					this.nextBtn.addClass('disabled');
				}

				var src = this.groupData[this.index].src;
				this.loadPicSize(src);
			}
		},
		loadPicSize:function(sourceSrc){
			var self = this;
			self.popupPic.css({width:'auto',height:'auto'}).hide();
			this.picCaptionArea.hide();
			this.preLoadImg(sourceSrc,function(){
				self.popupPic.attr('src',sourceSrc);
				var picWidth = self.popupPic.width(),
						picHeight = self.popupPic.height();
				self.changePic(picWidth,picHeight);
			});


		},
		changePic: function(width,height){
			var self = this,
					winWidth = $(window).width(),
					winHeight = $(window).height();

			//如果图片的宽高打鱼浏览器宽高的比例，就看下是否溢出
			var scale = Math.min(winWidth/(width + 10),winHeight/(height + 10),1);
			width = width*scale;
			height = height * scale;
			this.picViewArea.animate({
				width: width,
				height:height
			});
			this.popupWin.animate({
				width: width-10,
				height: height-10,
				marginLeft: -(width)/2,
				top:(winHeight - height)/2
			},function(){
				self.popupPic.css({
					width: width-10,
					height:height-10
				}).fadeIn();
				self.picCaptionArea.fadeIn();
				self.flag = true;
				self.clear = true;
			});

			//设置描述文字和当前索引
			this.captionText.text(this.groupData[this.index].caption);
			this.currentIndex.text('当前索引：'+ (this.index + 1) +' of '+ this.groupData.length);

		},
		preLoadImg: function(src,callback){
			var img = new Image();
			//两个！！是转换成布尔值
			if(!!window.ActiveXObject){
				img.onreadystatechange = function(){
					if(this.readystate =='complete'){
						callback();
					}
				}
			}else{
				img.onload =function(){
					callback();
				}
			}
			img.src = src;

		},
		showMaskAndPopup: function(sourceSrc,currentId){
			var self = this;

			this.popupPic.hide();
			this.picCaptionArea.hide();

			this.popupMask.fadeIn();

			var winWidth = $(window).width(),
					winHeight = $(window).height();

			this.picViewArea.css({
				width: winWidth/2,
				height: winHeight/2
			});
			
			this.popupWin.fadeIn();
			var viewHeight = winHeight/2 + 10; 
			this.popupWin.css({
				width: winWidth/2 + 10,
				height: winHeight/2 + 10,
				marginLeft: -(winWidth/2 + 10)/2,
				top:-viewHeight
			}).animate({
				top: (winHeight - viewHeight)/2
			},function(){
				//加载图片
				self.loadPicSize(sourceSrc);
			});
			//根据当前ID获取当前组别里面的索引
			//$(this).index不用的原因是规避img并不是以连续节点出现
			this.index = this.getIndexOf(currentId);
			var groupDataLength = this.groupData.length;
			if(groupDataLength > 1){
				if(this.index === 0){
					this.prevBtn.removeClass('disabled');
					this.nextBtn.addClass('disabled');
				}else if(this.index == groupDataLength - 1){
					this.prevBtn.addClass('disabled');
					this.nextBtn.removeClass('disabled');
				}else{
					this.prevBtn.addClass('disabled');
					this.nextBtn.addClass('disabled');
				}
			}else{
				this.prevBtn.removeClass('disabled');
				this.nextBtn.removeClass('disabled');
			}

		},
		getIndexOf:function(currentId){
			var index = 0;

			$(this.groupData).each(function(i){
				index = i;
				if(this.id === currentId){
					return false;
				}

			});
			
			return index;
		},
		initPopup:function(currentObj){
			var self = this,
				   sourceSrc = currentObj.attr('data-source'),
				   currentId = currentObj.attr('data-id');
			this.showMaskAndPopup(sourceSrc,currentId);

		},
		getGroup: function(){
			var self = this;
			//根据当前的组别名称获取页面中所有相同组别的对象
			var groupList = this.bodyNode.find('*[data-group =' + this.groupName +']');
			//清空数组数据
			self.groupData.length = 0;
			groupList.each(function(){
				self.groupData.push({
					src: $(this).attr('data-source'),
					id: $(this).attr('data-id'),
					caption: $(this).attr('data-caption')
				});
			});

		},

		renderDOM: function(){
			var strDom ="<div class='lightbox_pic_view'>"+
							"<span class='lightbox_btn lightbox_prev_btn'></span>"+
							"<img class='lightbox_img' src='' width='auto'>"+
							"<span class='lightbox_btn lightbox_next_btn'></span>"+
						"</div>"+
						"<div class='lightbox_pic_caption'>"+
							"<div class='lightbox_caption_area'>"+
								"<p class='lightbox_pic_desc'>图片标题</p>"+
								"<span class='lightbox_of_index'>当前索引：1 of 1</span>"+
							 "</div>"+
							 "<span class='lightbox_close_btn'></span>"+
						"</div>";
			//插入到this.popWin
			this.popupWin.html(strDom);//jquery方法
			this.bodyNode.append(this.popupMask,this.popupWin);
		},
	};

	window['LightBox'] = LightBox;


})(jQuery)
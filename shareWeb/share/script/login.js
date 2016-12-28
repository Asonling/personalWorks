//登录页面渲染
(function($){
	var Login = function(){

		var self = this;
		var loginBtn = $('#login');

		//显示遮罩层
		this.Mask = $('<div class="shadowBox">');
		this.popUp = $('<div class = "loginBox">');
		this.bodyNode = $(document.body);

		this.renderDOM();

		self.popUp.hide();
		self.Mask.hide();

		this.Mask.click(function(){
			self.popUp.fadeOut();
			self.Mask.fadeOut();
		});

		loginBtn.click(function(e){
			self.popUp.fadeIn();
			self.Mask.fadeIn();
			e.stopPropagation();
		});

		this.returnBtn = this.popUp.find('a.btn');
		this.returnBtn.click(function(e){
			e.stopPropagation();
			self.popUp.fadeOut();
			
			self.Mask.fadeOut();
			console.log('ok');
		});

	};

	Login.prototype = {
		renderDOM: function(){
			var strDom = '<form class="form-horizontal" action = "" method="post">'+
				    '<div class="control-group">'+
					    '<label class="control-label" for="inputEmail">用户名</label>'+
					    '<div class="controls">'+
					      '<input type="text" id="inputName" placeholder="用户名" name = "username">'+
					    '</div>'+
					  '</div>'+
					  '<div class="control-group">'+
					    '<label class="control-label" for="inputPassword">密码</label>'+
					    '<div class="controls">'+
					      '<input type="password" id="inputPassword" placeholder="密码" name = "password">'+
					      '<p id = "#errormsg"></p>'+
					    '</div>'+
					  '</div>'+
					  '<div class="control-group">'+
					    '<div class="controls">'+
					      '<button type="submit" class="btn" id="loginBtn">登录</button>'+
					      '<button type="submit" class="btn" id="registerBtn">注册</button>'+
					      '<a type="text" class="btn" style="float:right;color:#000;text-align:center;" href="javascript:void(0)">返回</a>'+
					    '</div>'+
					  '</div>'+
					'</form>';

			this.popUp.html(strDom);//jquery方法
			this.bodyNode.append(this.Mask,this.popUp);
		},
	}	

	window['Login'] = Login;
})(jQuery)
//登录验证


	

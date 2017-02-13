window.onload=function(){
//more
	var hearderMorehover=document.getElementById('hearder-more-hover'),
		aWsel1=document.getElementById('awsel1');
	hearderMorehover.onclick=function(event){
		var aWsel1=document.getElementById('awsel1');
		aWsel1.style.display='block';
		event=event||window.event;
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble=true;
		}
		document.onclick=function(){
			aWsel1.style.display='none';
		}
		hearderMore();
	}

//search
	var seachIn=document.getElementById('sscrh'),
		aWsel2=document.getElementById('awsel2');
	sscrh.onclick=function(event){
		var aWsel2=document.getElementById('awsel2');
		aWsel2.style.display='block';
		event=event||window.event;
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble=true;
		}
		document.onclick=function(){
			aWsel2.style.display='none';
		}
		hearderMore();
	}

//w-icn
	var wIcn=document.getElementById('w-icn1');
	wIcn.onclick=function(){
		wIcn.className='w-icn';
	}

//has-face

var Face=document.getElementById('hasFace');
	Face.onmouseover=function(){
		var Awsel3=document.getElementById('awsel3');
		Awsel3.style.display='block';
		Awsel3.onmouseover=function(){
			Awsel3.onmouseout=function(){
				this.style.display='none';
			}
		}

	}
}


function hearderMore(){
	var	Oselc=document.getElementById('selc'),
		oLis=document.getElementsByClassName('seli');
	for(var i=0;i<oLis.length;i++){
		oLis[i].onmouseover=function(){
			this.style.background='#313131';
		}
		oLis[i].onmouseout=function(){
			this.style.background='#191919';
		}
	}
}


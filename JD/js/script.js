var Oad=document.getElementById('AdTop');
var ClButton=document.getElementById('clButton');

var InnerDiv=document.getElementById('Innerdd'),
	div,Item;


window.onload=function(){
	closeAd(Oad,ClButton);
	Traversal(InnerDiv,'Item');
	
}

function closeAd(Div,Button){
	Button.onclick=function(){
		Div.style.display='none';
	}
}

function Traversal(parent,cls){
	var obj=getClass(parent,cls);
	console.log(obj.length);
	for(var i=0;i<obj.length;i++){
		obj[i].onmouseover=function(){
			this.className='Item hover';
		}
		obj[i].onmouseout=function(){
			this.className='Item';
		}
	}
}

function getClass(parent,cl){
	var item=parent.getElementsByTagName('*');
	var pins=[];
	for(var i=0 ;i < item.length ; i ++){
		if( item[i].className == cl){
			pins.push(item[i]);
		}
	}
	return pins;
}



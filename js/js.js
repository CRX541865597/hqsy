window.onload=function(){//等网页所有资源加载完毕在触发
	var flashNode=document.getElementById("flash");
	var spansNode=flashNode.getElementsByTagName("div")[0].getElementsByTagName("span");//得到flash第一个div下所有的span
	var lisNode=flashNode.getElementsByTagName('li');//得到所有的li节点
	var asNode=flashNode.getElementsByTagName("a");
	for(var i=0;i<spansNode.length;i++)
	{
		spansNode[i].index=i;//记录当前span对象的位置
		spansNode[i].onmouseover=function(){
			if(this.className=="current")//当移动到的就是之前位置就没必要触发函数
			{
				return;//跳出函数
			}
			
			var nowPos=this.index;//当前位置
			var oldPos;//表示之前位置
			
			for(var j=0;j<spansNode.length;j++){//历遍所有的span节点
				if(spansNode[j].className.indexOf("current")!=-1){
					oldPos=j;//之前位置
					break;//跳出循环
				}
			}
			
			
			spansNode[nowPos].className="current";//当前的span加上样式
			lisNode[nowPos].style.display="block"//span对应位置的图显示
			
			spansNode[oldPos].className="";//之前的span加上样式
			lisNode[oldPos].style.display="none"//span对应位置的图隐藏
		}
	};
	
	asNode[0].onmousedown=function(){//点击左边按钮
		var nowPos,oldPos;
		for(var j=0;j<spansNode.length;j++)//历遍所有的span节点
		{
			if(spansNode[j].className=="current"){
				oldPos=j;
				break;//跳出循环
			}
		}
		
		nowPos=oldPos==0?spansNode.length-1:oldPos-1;
		
		//console.log(nowPos,oldPos);
		
		spansNode[nowPos].className="current";//当前的span加上样式
		lisNode[nowPos].style.display="block"//span对应位置的图显示
		
		spansNode[oldPos].className="";//之前的span加上样式
		lisNode[oldPos].style.display="none"//span对应位置的图隐藏
	};
	
	asNode[asNode.length-1].onmousedown=reightFun;
	function  reightFun(){//点击右边按钮
		var nowPos,oldPos;
		for(var j=0;j<spansNode.length;j++)//历遍所有的span节点
		{
			if(spansNode[j].className=="current"){
				oldPos=j;
				break;//跳出循环
			}
		}
		
		/*if(oldPos==spansNode.length-1){//如果oldPos是最后一个位置
			nowPos=0;
		}
		else
		{
			nowPos=oldPos+1;
		}*/
		//与上面等价
		nowPos=oldPos==spansNode.length-1?0:oldPos+1;
		
		//console.log(nowPos,oldPos);
		
		spansNode[nowPos].className="current";//当前的span加上样式
		lisNode[nowPos].style.display="block"//span对应位置的图显示
		
		spansNode[oldPos].className="";//之前的span加上样式
		lisNode[oldPos].style.display="none"//span对应位置的图隐藏
	};
	
	//每隔多久触发一次函数
	var autoDo=window.setInterval(reightFun,3000);
	
	flashNode.onmouseenter=function(){
		window.clearInterval(autoDo);
	}
	flashNode.onmouseleave=function(){
		autoDo=window.setInterval(reightFun,3000);
	}
}





function moveAuto(){
	var firstNode=$("#box li:first");//第一个dl
	var secondNode=$("#box li:eq(1)");//第二个dl
	var marginLeft=parseInt(secondNode.css("margin-left"));//第二个dl的左外边距
	var marginRight=parseInt(secondNode.css("margin-right"));//第二个dl的右外边距
	var width=secondNode.outerWidth()-1;//整个盒子的宽度；不变的总路程
	var speed=width/2000;//不变的速度

	var widthDo=parseInt(firstNode.css("margin-left"))+width-marginLeft;//第一个dl在变化的路程
	var time=widthDo/speed;//在变化的动画完成时间

	firstNode.animate({marginLeft:-width+"px"},time,"linear",function(){
		$(this).appendTo($(this).parent()).css({marginLeft:'32px'});
		moveAuto();
	});
}
moveAuto();

$('#box').mouseenter(function(){
	$("#box li:first").stop();
});
$('#box').mouseleave(function(){
	moveAuto();
});


/*回到网页顶部*/
$(window).scroll(function(){
	var winH=$(window).height();
	var scrollTop=$(window).scrollTop();
	if(scrollTop<=winH){
		$("#gotop").hide();
	}
	else{
		$("#gotop").show();
	}
});

$("#gotop").click(function(){
	$("body,html").animate({scrollTop:0},1000);
});




















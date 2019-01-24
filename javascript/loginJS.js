function addEvent(element,type,func) {
	// body...
	if (element.addEventListener) {
		element.addEventListener(type,func,false);
	}else{
		element["on" + type] = func;
	}
}

var title = document.querySelectorAll("div.loginTitle>span a");
var content = document.querySelectorAll("div.loginTaps");
var imageCode = document.querySelector("div.code img:first-child");
var mobileImg = document.querySelector("div.code img.mobile");
var codeDiv = document.querySelector("div.code");
var codeLogin = document.querySelector("div.codeLogin");
var lastIndex = 0,i = 0;
function selectLoginTaps(e) {
	// body...
	for (var i = 0; i < title.length; i++) {
		if (e.target == title[i]) {
			title[lastIndex].removeAttribute("class");
			content[lastIndex].style.visibility = "hidden";
			title[i].className = "activeClick";
			content[i].style.visibility = "visible";
			if (i == 0) {
				imageCode.style.left = "-116px";
				setTimeout(function (argument) {
					// body...
					mobileImg.style.visibility = "visible";
				},300);
			}else if (i == 1) {
				imageCode.style.left = "0px";
				mobileImg.style.visibility = "hidden";
			}
			lastIndex = i;
		}
	}
}
 

addEvent(window,"click",selectLoginTaps);
addEvent(window,"load",function (argument) {
	// body...
	imageCode.style.left = "-116px";
	setTimeout(function (argument) {
			// body...
			mobileImg.style.visibility = "visible";
		},300);
})


addEvent(codeDiv,"mouseout",function (e) {
	// body...
	var e = e || window.event;
	if (e.relatedTarget!=codeDiv&&e.relatedTarget!=imageCode&&e.relatedTarget!=mobileImg) {
		imageCode.style.left = "0px";
		mobileImg.style.visibility = "hidden";
	}
})
addEvent(codeDiv,"mouseover",function (e) {
	// body...
	var e = e || window.event;
	if ((e.target==codeDiv&&e.relatedTarget!=imageCode&&e.relatedTarget!=mobileImg)||(e.target==imageCode&&e.relatedTarget!=codeDiv&&e.relatedTarget!=mobileImg)) {
		imageCode.style.left = "-116px";
			setTimeout(function (argument) {
				// body...
				mobileImg.style.visibility = "visible";
			},300);
	}
})

var loadInfo = function (argument) {
	// body...
	var content = document.querySelector("div.content"),
		info01 = document.createElement("div"),
		info02 = document.createElement("div"),
		paraTop = document.createElement("p"),
		paraBottom = document.createElement("p"),
		loginBlock = document.querySelector(".loginBlock"),
		loginTitle = document.querySelector("div.loginTitle");
	paraTop.innerHTML = "<span><i></i>依据《网络安全法》，为保障您的帐户安全和正常使用，请尽快完成手机号验证！新版<em>《京东隐私政策》</em>已上线，将更有利于保护您的个人隐私。</span>"
	paraBottom.innerHTML = "<span><i></i>京东不会以任何理由要求您转账汇款，谨防诈骗。</span>"
	info01.className = "webNotice";
	info02.className = "webNotice";
	info01.appendChild(paraTop);
	info02.appendChild(paraBottom);
	document.body.insertBefore(info01,content);
	loginBlock.insertBefore(info02,loginTitle);
};
addEvent(window,"load",loadInfo);

var form = document.forms[0];
function submitMethod(e) {
	// body...
	var elements = form.elements;
	var loginName = elements["loginName"];
	var loginPassword = elements["loginPassword"];
	var inputInfo = document.querySelectorAll("div.loginInformation");
	var inputLabel = document.querySelectorAll("div.loginInformation label");
	if (e.target == form) {
		if ((!loginPassword.value&&!loginName.value)||!loginName.value||!loginPassword.value) {
			e.preventDefault();
			var text = null; 
			var div = document.createElement("div");
			div.className ="submitLimit";
			if (!loginPassword.value&&!loginName.value) {
				text = "请输入帐户名和密码";
				div.innerHTML = "<span><i></i>"+ text + "</span>";
				inputInfo[0].style.border = "1px solid #e4393c";
				inputLabel[0].className = "noInformation";
				inputInfo[1].style.border = "1px solid #e4393c";
				inputLabel[1].className = "noInformation";
				loginName.focus();
			}else if (!loginName.value) {
				text = "请输入帐户名";
				div.innerHTML = "<span><i></i>"+ text + "</span>";
				inputInfo[0].style.border = "1px solid #e4393c";
				inputLabel[0].className = "noInformation";
				inputInfo[1].removeAttribute("style");
				inputLabel[1].removeAttribute("class");
				loginName.focus();
			}else if (!loginPassword.value) {
				text = "请输入密码";
				div.innerHTML = "<span><i></i>"+ text + "</span>";
				inputInfo[0].removeAttribute("style");
				inputLabel[0].removeAttribute("class");
				inputInfo[1].style.border = "1px solid #e4393c";
				inputLabel[1].className = "noInformation";
				loginPassword.focus();
			}
			if (form.lastChild.className != "submitLimit") {
				form.appendChild(div);
			}else{
				form.replaceChild(div,form.lastChild);
			}
		}
	}
}
function createSubmitDiv(i) {
	// body...
	var text = null; 
	var div = document.createElement("div");
	div.className ="submitLimit";
	switch(i){
		case 0:
		text = "请输入帐户名和密码";
		div.innerHTML = "<span><i></i>"+ text + "</span>";
		break;
		case 1:
		text = "请输入帐户名";
		div.innerHTML = "<span><i></i>"+ text + "</span>";
		break;
		case 2:
		text = "请输入密码";
		div.innerHTML = "<span><i></i>"+ text + "</span>";
		break;
	}
	form.appendChild(div);

}
addEvent(window,"submit",submitMethod);

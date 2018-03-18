//function

$(function() {
	$("body").attr("class", "loading");	
	if (window.localStorage.getItem("login") == undefined) {
		navigasi('login');
	} else {
		json.login = JSON.parse(window.localStorage.getItem("login"));
		setTimeout(function() {
			$("#btnAwal").click();
		}, 1000);
		// navigasi('menuUtama');
	}
});

function navigasi(html) {
	$("#badan").load("./html/" + html + ".html");
}

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

//event handler

$("#btnAwal").on('click', function () {
	cekLogin(json.login.user.username, json.login.user.password);
	$("body").attr("class", "");	
});



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

$("#btnAwal").on('click', function () {
	// $("#badan").append(json.login.user.username);
	// $("#badan").append("<br>");
	// $("#badan").append(json.login.user.password);
	cekLogin(json.login.user.username, json.login.user.password);
	$("body").attr("class", "");	
});
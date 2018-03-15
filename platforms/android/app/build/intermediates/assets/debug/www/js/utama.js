$(function() {
	if (window.localStorage.getItem("login") == undefined) {
		navigasi('login');
	} else {
		json.login = JSON.parse(window.localStorage.getItem("login"));
		navigasi('menuUtama');
	}
});

function navigasi(html) {
	$("#badan").load("./html/" + html + ".html");
}

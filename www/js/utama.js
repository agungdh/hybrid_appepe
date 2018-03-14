$(function() {
   navigasi("login"); 
});

function navigasi(html) {
	$("#badan").load("./html/" + html + ".html");
}

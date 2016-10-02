function validate() {

	var password = document.getElementById("password").value;

	if(password == "wilgas1stanniv") {
		
		setTimeout(function() {
			document.getElementById("successtext").innerHTML = "Halooooo Wildaa Selamat Datang!!!!!!";
			document.getElementById("next").style.display = "block"
		}, 1000)
	}
	else {
		alert("Siapa lo");
	}
}

function nextpage() {

	window.open('mainpage.html');
}
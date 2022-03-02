function recupData(){
	return new Promise(function(resolve,reject){
		let request = new XMLHttpRequest();


		let dateactuelle = new Date();
		let diffTemp;
		if(localStorage.getItem('date') !== null)
		{
			let storedDate = Date.parse(localStorage.getItem('date'));
			diffTemp = Math.abs(storedDate - dateactuelle.getTime());
		}
		else
		{
			diffTemp = -1;
		}

	// ne fait pas de nouvelles requetes si les données exites, et si elle date de moins de 6 heures
	if (localStorage.length !== 198 || diffTemp > 21600000) {

		//api
		request.open("GET", "https://api.covid19api.com/summary");
		request.responseType = "json"
		request.withCredentials = true;


		request.addEventListener("load", function(){
			if(this.status == 200) {
				let res = this.response;

				resolve(res);





				localStorage.setItem("data", JSON.stringify(res));





			}
			else{
				reject(this.statusText);
			}
		});
		request.send();
	}
})
}

function setupIntervals() {
	console.log("Creating Looping Checkers (EXTENSION)")
	setInterval(updateTableTicketView, 5000);
	setInterval(checkForUpdatedTickets, 5000);
}

function updateTableTicketView() {	
var tableRowsOfTickets = document.getElementsByClassName("ticket-row");

for (const tableRow of tableRowsOfTickets) {
	var statusOfTicketElement = tableRow.getElementsByClassName('state')[0];
	var statusOfTicketClasses = statusOfTicketElement.getElementsByTagName("span")[0].classList;
	//console.log(statusOfTicketClasses);
	
	if (statusOfTicketClasses.contains("new")){
	tableRow.setAttribute('style', 'background-color:#b4e5d9 !important;');
	}
	if (statusOfTicketClasses.contains("customer_responded")){
	tableRow.setAttribute('style', 'background-color:#678ce7 !important;');
	}
	if (statusOfTicketClasses.contains("elapsed")){
	tableRow.setAttribute('style', 'background-color:#ffd0d6 !important;');
	}
	
}

}


function checkForUpdatedTickets() {
	try{
		var refreshAlert = document.querySelector("#index_refresh_alert")
		var indexRefreshAlertStyles = refreshAlert.style;
	
		if (indexRefreshAlertStyles.display == "none"){
			console.log("The page does not need refreshing")
		}
		else {
			console.log("Refresh the page");
			refreshAlert.click();
		}
	}
	catch(error) {
		console.error(error);
	}
}



setupIntervals();
// should really be when this is full
// //*[@id="table-list-view"]

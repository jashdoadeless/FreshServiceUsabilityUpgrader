var tableorcard = "";
var previousview = "neither";
var counter = 0;

function setupIntervals() {
	console.log("Creating Looping Checkers (EXTENSION)")
	setInterval(tableOrCard, 1000);
	
	setInterval(checkForUpdatedTickets, 5000);
}
function tableOrCard() {
	tableorcard = document.querySelector("#ticket_switch_icons > span.tooltip.selected").dataset.view;
	if (previousview != tableorcard) {
		cLog("View type has changed");
		setTimeout(updateTableTicketView, 1000);
	}
	previousview = tableorcard;
	cLog(tableorcard);
	
}

function updateTableTicketView() {	
	if (tableorcard == "table"){
		var tableRowsOfTickets = document.getElementsByClassName("ticket-row");
		for (const tableRow of tableRowsOfTickets) {
			var statusOfTicketElement = tableRow.getElementsByClassName('state')[0];
			var statusOfTicketClasses = statusOfTicketElement.getElementsByTagName("span")[0].classList;
			
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
	else if (tableorcard == "card"){
		var tableRowsOfTickets = document.getElementsByClassName("ticket-row");
		for (const tableRow of tableRowsOfTickets) {
			var statusOfTicketElement = tableRow.getElementsByClassName('td-ticket-status')[0];
			try{var statusOfTicketClasses = statusOfTicketElement.getElementsByTagName("span")[0].classList;} catch {continue;}
			
			if (statusOfTicketClasses.contains("new")){
				var backgroundColor = "#b4e5d9";
			}
			if (statusOfTicketClasses.contains("customer_responded")){
				var backgroundColor = "#678ce7";
			}
			if (statusOfTicketClasses.contains("elapsed")){
				var backgroundColor = "#ffd0d6";
			}
			
			var tableRowColumns = tableRow.getElementsByTagName("td");
			for (const tableColumn of tableRowColumns) {
				tableColumn.setAttribute('style', 'background-color:'+backgroundColor+' !important;');
			}
			
			
			
		}
	}
}




function checkForUpdatedTickets() {
	try{
		var refreshAlert = document.querySelector("#index_refresh_alert")
		var indexRefreshAlertStyles = refreshAlert.style;
	
		if (indexRefreshAlertStyles.display == "none"){
		}
		else if (indexRefreshAlertStyles.display == null) {
		}
		else if (indexRefreshAlertStyles.display == "") {
		}
		else {
			cLog("Refresh the page as the style was " + indexRefreshAlertStyles.display);
			refreshAlert.click();
			setTimeout(updateTableTicketView, 5000);
		}
	}
	catch(error) {
		cLog(error);
	}
	counter++
	if (counter > 10){
		setTimeout(updateTableTicketView, 5000);
		counter = 0;
	}
}


function cLog(whatToLog){
	console.log("%cFreshService Usability Upgrader Extension: " +whatToLog, "color:#f00; background: yellow; font-size:18px;");
}


setupIntervals();
// should really be when this is full
// //*[@id="table-list-view"]

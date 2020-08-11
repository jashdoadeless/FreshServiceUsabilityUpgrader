var run = false;
var acceptableurlends = ["tickets", "requested_by_me", "deleted", "spam", "monitored_by", "all_tickets", "service_requests", "incidents", "unresolved", "new_and_my_open"]
var tableorcard = "";
var previousview = "neither";
var counter = 0;


function setupIntervals() {
	cLog("Creating Looping Checkers")
	setInterval(tableOrCard, 1000);
	setInterval(checkIfRunable, 100);
	setInterval(checkForUpdatedTickets, 5000);
}

function checkIfRunable() {
	var urlend = window.location.href.substr(window.location.href.lastIndexOf("/")+1)
	if (acceptableurlends.includes(urlend)){
		run = true;
		generateCSS()
		
	}
	else {
		run = false;
	}
}
function generateCSS() {
	var fsucss = document.getElementById("freshserviceusabilityupgradercssstyles");
    if(!fsucss){
	var createdStyleTag = document.createElement("style");
		createdStyleTag.textContent = `.overdueBackgroundColour {
background: linear-gradient(180deg, #ffd0d6, #ff6a7d);
background-size: 400% 400%;

-webkit-animation: overdueAnimation 4s ease infinite;
-moz-animation: overdueAnimation 4s ease infinite;
animation: overdueAnimation 4s ease infinite;
}
		@keyframes overdueAnimation {
									0%{background-position:50% 0%}
									50%{background-position:50% 100%}
									100%{background-position:50% 0%}
									}`;
createdStyleTag.setAttribute("id", "freshserviceusabilityupgradercssstyles")
		document.body.appendChild(createdStyleTag);
}
}
function tableOrCard() {
	if (run == true){
		tableorcard = document.querySelector("#ticket_switch_icons > span.tooltip.selected").dataset.view;
		if (previousview != tableorcard) {
			cLog("View type has changed");
			setTimeout(updateTableTicketView, 1000);
		}
		previousview = tableorcard;
	}
}

function updateTableTicketView() {
	if (run == true){	
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
				if (statusOfTicketClasses.contains("overdue")){
					tableRow.classList.add("overdueBackgroundColour");
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
}




function checkForUpdatedTickets() {
	if (run == true){
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
		setTimeout(updateTableTicketView, 5000);
	}
}


function cLog(whatToLog){
	console.log("%cFreshService Usability Upgrader Extension: " +whatToLog, "color:#f00; background: yellow; font-size:18px;");
}

setupIntervals();


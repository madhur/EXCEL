

var listId="{68BAA1F6-7B43-4AAF-B821-B9575C263044}";

var viewByContact="{caf32849-a1fd-4c1e-bfa1-8cda07b9596a}";

var viewByDirector="{6f80fcc3-19c9-4fe8-a1a7-bf019074f419}";

var viewByVP="{d4a22faa-8635-4f79-a54f-102a2ee68635}";

var excelList="EXCEL Ideas";

var getListItems="GetListItems";

var url='https://teams.aexp.com/sites/teamsitewendy/WASTE/_vti_bin/owssvr.dll?cmd=DISPLAY&List={68BAA1F6-7B43-4AAF-B821-B9575C263044}&view={6f80fcc3-19c9-4fe8-a1a7-bf019074f419}&XMLDATA=TRUE';


$().SPServices.defaults.webURL = "https://teams.aexp.com/sites/teamsitewendy/WASTE";  // URL of the target Web
$().SPServices.defaults.listName = excelList;  // Name of the list for list 

// Enable support of cross domain origin request
jQuery.support.cors = true;

// Disable caching of AJAX responses - Stop IE reusing cache data for the same requests
$.ajaxSetup({
    cache: false
});


// --------------------------------------------------------------------
// Initialize the gadget.
// --------------------------------------------------------------------
function init() 
{
    // Enable Settings dialog for the gadget. 
    // System.Gadget.settingsUI = "cpsettings.html";

    // Specify the Flyout root.
    // System.Gadget.Flyout.file = "cprepgraph.html";
    // System.Gadget.Flyout.show = false;

    //Hide the Play image, as will start in Autoupdate
    $("#playImage").hide();

    reload_Page();

    //kickoff the auto update timer
    // setTimeout(function () { updateTick(); }, 1000);
}


// -------------------------------------------------
// Reload the page
// -------------------------------------------------
function reload_Page() 
{
    //Show the loading images
    $("#loadingimage").show();

        
    getEXCELData();
        
}	

function  getEXCELData()	
{
			var myQuery = "<Query><Where><Eq><FieldRef Name='Project_x0020_Contact' /><Value Type='Integer'><UserID/></Value></Eq></Where></Query>";

			
			$().SPServices(
					{
						operation: "GetListItems",
						async: false,
						listName: excelList,
						CAMLViewFields: "<ViewFields Properties='True'><FieldRef Name='Title' /><FieldRef Name='Project_x0020_Status' /><FieldRef Name='Project_x0020_Director' /><FieldRef Name='Project_x0020_Contact' /><FieldRef Name='Project_x0020_VP' /><FieldRef Name='Estimated_x0020_Savings' /></ViewFields>",
						CAMLQuery: myQuery,
						completefunc: function (xData, Status) 
						{
							// alert(Status);
							var resJson=$(xData.responseXML).SPFilterNode("z:row").SPXmlToJson(
							{ 
							
								  mapping: 
								  {
										 ows_ID: {mappedName: "ID", objectType: "Counter"},
										 ows_Title: {mappedName: "Title", objectType: "Text"},
										 ows_Created: {mappedName: "Created", objectType: "DateTime"}
								  },   
								   includeAllAttrs: true
							});
							
							
							//console.log(resJson);
							var wrapper={objects:resJson};
							//console.log(wrapper);
							// var myJSONText = JSON.stringify(resJson);
							//console.log(myJSONText);

							// setEXCELData(resJson);
							var template =  "{{objects}}<tr><td>{{Title}}</td><td>{{Estimated_x0020_Savings}}</td></tr> {{/objects}}";
							
							var result=Mark.up(template, wrapper);
							
							$("#excelTable").html(result);
							//console.log(result);
							
					   
						}
					});
}



function setEXCELData(resJson)
{

	







}


Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

	




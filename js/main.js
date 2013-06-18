

var listId="{68BAA1F6-7B43-4AAF-B821-B9575C263044}";

var viewByContact="{caf32849-a1fd-4c1e-bfa1-8cda07b9596a}";

var viewByDirector="{6f80fcc3-19c9-4fe8-a1a7-bf019074f419}";

var viewByVP="{d4a22faa-8635-4f79-a54f-102a2ee68635}";

var excelList="EXCEL Ideas";

var getListItems="GetListItems";

var url='https://teams.aexp.com/sites/teamsitewendy/WASTE/_vti_bin/owssvr.dll?cmd=DISPLAY&List={68BAA1F6-7B43-4AAF-B821-B9575C263044}&view={6f80fcc3-19c9-4fe8-a1a7-bf019074f419}&XMLDATA=TRUE';


$().SPServices.defaults.webURL = "https://teams.aexp.com/sites/teamsitewendy/WASTE";  // URL of the target Web
$().SPServices.defaults.listName = excelList;  // Name of the list for list 

jQuery.support.cors = true;



	$(document).ready(function()
	{ 
	
	$('a.toggler').bind('click', function (e) 
	{
  

   jQuery("body").slideDown("slow");
});
	
	

			jQuery.ajax(
			{
				url: url, 
				type: "GET",
				dataType: "xml",
				complete: processResult,
				contentType: "text/xml; charset=\"utf-8\"",
				error: function (xhr, ajaxOptions, thrownError) 
				{
					// alert(xhr.status);
					// alert(thrownError);
				}
			});



			$().SPServices(
			{
				operation: "GetListItems",
				async: false,
				listName: excelList,
				CAMLViewFields: "<ViewFields><FieldRef Name='Title' /></ViewFields>",
				
				completefunc: function (xData, Status) 
				{
					// alert(Status);
					$(xData.responseXML).SPFilterNode("z:row").each(function() 
					{
						 var liHtml = "<li>" + $(this).attr("ows_Title") + "</li>";
						 $("#result").append(liHtml);
					});

               
				}
			});
        
    });


	

        



		
		
			
	function processResult(xData, status) 
    {
        $(xData.responseXML).find("z\\:row").each(function() 
		{
            var liHtml = "<li>" + $(this).attr("ows_LinkTitle") + "</li>";
            $("#result").append(liHtml);
        });
        
    }




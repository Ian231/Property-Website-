        $.getJSON('EstateAgent.json', function(data) {        /*Receives the data from the JSON file*/
          $("#Search").on("click", function() {                 /*Data that outputs after the search button is clicked (same id in html file)*/
                    var property = $("#prop :selected").val();  /* House type is selected*/
                    var beds = $("#beds :selected").val();          /* Number of bedrooms selected*/
                    var totalPrice = $("#price :selected").val();   /*House price selected*/
                    var dateMonth = $("#time :selected").val();     /*Time added is selected*/
                    var output = "<ul>"; /*Outputs the data in an unordered list*/
                    for (var i in data.properties) {
                    	if ((property == data.properties[i].type) || (property == "Any")) {
                         if ((beds == data.properties[i].bedrooms) ||  (beds == "No Rooms")) {  
                           if ((totalPrice == data.properties[i].price) || (totalPrice == "No Price")) {
                            if ((dateMonth == data.properties[i].added.month) || (dateMonth == "Month")) {
                    		output+="<li>"+ "<img src='" + data.properties[i].picture + "'></li>" +"Bedrooms: " +data.properties[i].bedrooms + "<br> " + "Price: "+"£"+ data.properties[i].price + "<br>" +"Added: "+ data.properties[i].added.month + " " + data.properties[i].added.year
                    		+ "<br>"+" Location: " + data.properties[i].location + "<br>" + "Description: " + data.properties[i].description + "<br>" +"<a href = '"+data.properties[i].id + ".html'> Visit Page</a></li>" ;
                    	}
                        }
                        }
                        }
        
                    }

                      output+="</ul>"
                    document.getElementById("placeholder").innerHTML = output; /*Outputs the data that have been selected*/
              
         });
             

        /*Save function. Saves the properties*/
          $(".save").on("click",function(){
        try{
            $(this).attr('disabled',true);

            var propIdToAdd = $(this).closest("p").attr("id");

            var favouriteProp = JSON.parse(localStorage.getItem("favProp"));
            if (favouriteProp == null) {
                favouriteProp = [];
                alert("Saved to favourites")

            }
            else if (favouriteProp == !null) {
                    favouriteProp = ![];
                    alert(favouriteProp + "already in favourites")
            };
            favouriteProp.push(propIdToAdd);
            localStorage.setItem("favProp", JSON.stringify(favouriteProp));
        }
        catch(e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                console.log("Error: Local Storage Limit Exceeds");
            }
            else{
                console.log("Error: Saving to local storage");
            }
        }
    });
          /*View function. View saved properties*/
          $("#View").on("click", function(){
            console.log("Restoring array data from local storage.")
            favouriteProp = JSON.parse(localStorage.getItem("favProp"));
            var output = "<ul>";
            if (favouriteProp !=null) {
                for (var i = 0;  i < data.properties.length; i++) {
                for (var j = 0; j < favouriteProp.length; j++) {
                    if (data.properties[i].id == favouriteProp[j]) {
                       output+="<li>"+ "<img src='" + data.properties[i].picture + "'></li>" +"Bedrooms: " +data.properties[i].bedrooms + "<br> " + "Price: "+"£"+ data.properties[i].price + "<br>" +"Added: "+ data.properties[i].added.month + " " + data.properties[i].added.year
                            + "<br>"+" Location: " + data.properties[i].location + "<br>" + "Description: " + data.properties[i].description + "<br>" +"<a href = '"+data.properties[i].id + ".html'> Visit Page</a></li>" ; 
                    }   
                    }   
                }
            }
        
        output+="</ul>";
        document.getElementById('placeholder').innerHTML = output; /*Outputs the saved properties*/
    });



        });
         


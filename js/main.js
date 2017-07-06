function getData(type, str, col) {
    if (str == "") {
        //document.getElementById("output").innerHTML = "";
        return;
    } else {             
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200 && this.responseText != null) {
                // alert(this.responseText);
                var jsonObj = JSON.parse(this.responseText);
                hazardList(jsonObj);
            } else {
                // document.getElementById("output").innerHTML += "<div>Something went wrong...</div>"
            }
        };
        xmlhttp.open("GET","database.php?t="+type+"&q="+str+"&c="+col,true);  
        xmlhttp.send();
    }
}

function hazardList(jsonObj) {
    $('#hzrdList').empty();
    jsonObj.forEach(function (element) {
        if (element != null) {
            
             var li = $('<li href="#" class="list-group-item">' + element['Name'] + '<input type="checkbox" class="pull-right"></li>');
            $('#hzrdList').append(li);
        }
    }, this);
    var li = $('<li href="#" class="list-group-item">Other<input type="checkbox" class="pull-right"></li>');
    $('#hzrdList').append(li);
}
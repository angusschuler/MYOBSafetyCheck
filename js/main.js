function getHazard(type, str) {
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
        xmlhttp.open("GET","database.php?t="+type+"&q="+str,true);  
        xmlhttp.send();
    }
}

function getRisk(type, str) {
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
                riskList(jsonObj);
                
            } else {
                // document.getElementById("output").innerHTML += "<div>Something went wrong...</div>"
            }
        };
        xmlhttp.open("GET","database.php?t="+type+"&q="+str,true);  
        xmlhttp.send();
    }
}

function hazardList(jsonObj) {
    $('#hzrdList').empty();
    jsonObj.forEach(function (element) {
        if (element != null) {
             var li = $('<li href="#" name="'+element['Name']+'" class="list-group-item">' + element['Name'] + '<input type="checkbox" class="pull-right"></li>');
            $('#hzrdList').append(li);
        }
    }, this);
    // var li = $('<li href="#" class="list-group-item">Other<input type="checkbox" class="pull-right"></li>');
    // $('#hzrdList').append(li);
}

function riskList(jsonObj) {
     $('#riskList').empty();
    jsonObj.forEach(function (element) {
        if (element != null) {
             var li = $('<li class="list-group-item"><h4 class="list-group-item-heading">'+element["Name"]+'</h4><textarea class="form-control" value="">'+element["RiskPlan"]+'</textarea></li>');
            $('#riskList').append(li);
        }
    }, this);
}
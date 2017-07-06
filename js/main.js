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
                alert(this.responseText);
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
    $('#wkslist').empty();
    jsonObj.forEach(function (element) {
        if (element != null) {
            var li = $('<li><input type="checkbox" name="' + element['Name'] + '" id="' + element['Name'] + '"/>' +
            '<label for="' + element['Name'] + '"></label></li>');
            li.find('label').text(element['Name']);
            $('#wkslist').append(li);
            //document.getElementById("wkslist").innerHTML += li;
        }
    }, this);
    var li = $('<li><input type="checkbox" name="Other" id="Other"/><label for="Other"></label></li>');
    li.find('label').text('Other');
    $('#wkslist').append(li);
}
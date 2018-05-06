// client id: i0hx9uhbef1qw9egt0howi026f3izk
var client_id = 'i0hx9uhbef1qw9egt0howi026f3izk';
var result;
var streamersMain;
var channelsDisplay = document.getElementById("channels-display");
var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]; 

function checkImage(img) {
    if(img == "") {
        return "img/placeholder-banner.png"
    }
    else
    {
        return img;
    }
}

function checkDesc(desc) {
    if(desc == "") {
        return "This channel has no description"
    }
    else
    {
        return desc;
    }
}

function checkStatus() {
    var xhttpStatus = new XMLHttpRequest;
    var urlStatus = "https://api.twitch.tv/helix/streams?user_login=ESL_SC2&login=OgamingSC2&login=cretetion&login=freecodecamp&login=storbeck&login=habathcx&login=RobotCaleb&login=noobs2ninjas";
    xhttpStatus.open('GET', urlStatus);
    xhttpStatus.setRequestHeader('Client-ID', client_id);
    xhttpStatus.onload = function () {
        if(xhttpStatus.status === 200){
            // Storing the result in a variables
            streamersStatus = JSON.parse(xhttpStatus.responseText);
            // for debuging
            console.log("before checking if empty. Curr length: " + streamersStatus.data.length);
            // Check the length of the response, if 0 or empty do stuff
            if(streamersStatus.data.length == 0){
                // Select all elements with class item
                var channelsCollection = document.getElementsByClassName("item");
                console.log("before the for loop");
                console.log(channelsCollection);
                console.log("Length of array: " + channelsCollection.length);
                // Loop over the 
                for(var i = 0; i <= channelsCollection.length; i++){
                    console.log("Inside of the for loop");
                    // insert the icon that represents status offline
                    channelsCollection[i].lastChild.lastChild.lastChild.lastChild.innerHTML += 
                    '<use xlink:href="img/icons.svg#icon-cross"></use>';
                }
            }
        }else{
            console.log("error");
        } 
    }
    xhttpStatus.send();
}



window.onload = function() {

    var xhttp = new XMLHttpRequest();
    var urlChannels = "https://api.twitch.tv/helix/users?login=ESL_SC2&login=OgamingSC2&login=cretetion&login=freecodecamp&login=storbeck&login=habathcx&login=RobotCaleb&login=noobs2ninjas";
    xhttp.open('GET', urlChannels);
    xhttp.setRequestHeader('Client-ID', client_id);
    xhttp.onload = function() {
        if(xhttp.status === 200) {
            result = JSON.parse(xhttp.responseText);
            for(var i = 0; i < result.data.length; i++)
            {
                channelsDisplay.innerHTML += 
                '<div class="item">'+
                    '<a href="'+ "https://www.twitch.tv/" + result.data[i].login +'" class="card">'+
                    '<div class="thumb" style="background-image: url('+ checkImage(result.data[i].offline_image_url) +');"></div>'+
                    '<article>'+
                        '<h1>' + result.data[i].display_name + '</h1>'+
                        '<p>' + checkDesc(result.data[i].description) +'</p>'+
                        '<span>Views: ' + result.data[i].view_count + '</span>'+
                        '<span id="status">Online:'+
                            '<svg id="icon-status-'+ i +'" class="offline">'+
                                //'<use xlink:href="img/icons.svg#icon-checkmark"></use>' +
                            '</svg>'+
                        '</span>'+
                    '</article>'+
                    '</a>'+
                '</div>';

            }
        }
    }
    xhttp.send();
    checkStatus();
}
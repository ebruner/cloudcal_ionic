/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
    };

    function main() {
	var array = [];
	var today = new Date();
	var index = 0;
	//CC
        //var url = 'https://www.googleapis.com/calendar/v3/calendars/66hracafldsame7l4eg89ii8pg%40group.calendar.google.com/events?key=AIzaSyC-Z0ZvCbH2Rr-9K0rEniclGBuGDdNUyWA';
	//Pack59
        var url = 'https://www.googleapis.com/calendar/v3/calendars/ltcc03aoq1pdaiblt7cok1uhk8@group.calendar.google.com/events?key=AIzaSyC-Z0ZvCbH2Rr-9K0rEniclGBuGDdNUyWA';
        var url = 'https://www.googleapis.com/calendar/v3/calendars/ltcc03aoq1pdaiblt7cok1uhk8@group.calendar.google.com/events?orderby=starttime&sortorder=ascending&key=AIzaSyC-Z0ZvCbH2Rr-9K0rEniclGBuGDdNUyWA';
        $.getJSON(url, function(data) {
        for(i in data['items']) {
           item = data['items'][i];
	   var date = getDateFromItem(item);
	   //only future events
	   if(+date >= +today) {
	         array[index++] = item;
	   }
        }
	var events = bubbleSort(array);
        writeOutput(array);
       });
     }
function getDateFromItem(item){
           var date = new Date(item.startTime);
	   if(isNaN(date.getTime())) {
		date = new Date(item.start.date);
	   }
	   if(isNaN(date.getTime())) {
		date = new Date(item.start.dateTime);
	   }
	return date;
}

function writeOutput(events){
	var content = "<center><img src='http://scoutingnewsroom.org/wp-content/uploads/2014/02/fleurdelis300x300-copy-70x70.jpg'><table><th>Date</th><th>Event</th><th>Link</th> ";
        for(i=0; i<events.length; i++) {
	   evnt = events[i];
	   var date = getDateFromItem(evnt);
  	   var color = (isEven(i))?"#D5EFF7":"#ffffff";
           content = content.concat("<tr bgcolor="+color+"><td>" + date.toDateString() + " " + date.toLocaleTimeString() + "</td><td>" + evnt.summary + "</td><td><a href=" + evnt.htmlLink + ">Detail</a></td><td></tr>" );
        }
	document.write(content + "</table></html>");
}

function bubbleSort(values) {
  var length = values.length - 1;
  do {
    var swapped = false;
    for(var i = 0; i < length; ++i) {
      date1 = getDateFromItem(values[i]);
      date2 = getDateFromItem(values[i+1]);
      if (date1 > date2) {
        var temp = values[i];
        values[i] = values[i+1];
        values[i+1] = temp;
        swapped = true;
      }
    }
  }
  while(swapped == true)
  return values;
};


function isEven(n) 
{
   return isNumber(n) && (n % 2 == 0);
}

function isNumber(n)
{
   return n == parseFloat(n);
}

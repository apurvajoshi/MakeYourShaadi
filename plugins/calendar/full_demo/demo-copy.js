jq(document).ready(function() {
   var jqcalendar = jq('#calendar');
   var id = 10;

   jqcalendar.weekCalendar({
      displayOddEven:true,
      timeslotsPerHour : 4,
      allowCalEventOverlap : true,
      overlapEventsSeparate: true,
      firstDayOfWeek : 1,
      businessHours :{start: 8, end: 18, limitDisplay: true },
      daysToShow : 7,
      title: function(daysToShow) {
			return daysToShow == 1 ? '%date%' : '%start% - %end%';
      },
      height : function(jqcalendar) {
         return jq(window).height() - jq("h1").outerHeight() - 1;
      },
      eventRender : function(calEvent, jqevent) {
         if (calEvent.end.getTime() < new Date().getTime()) {
            jqevent.css("backgroundColor", "#aaa");
            jqevent.find(".wc-time").css({
               "backgroundColor" : "#999",
               "border" : "1px solid #888"
            });
         }
      },
      draggable : function(calEvent, jqevent) {
         return calEvent.readOnly != true;
      },
      resizable : function(calEvent, jqevent) {
         return calEvent.readOnly != true;
      },
      eventNew : function(calEvent, jqevent) {
         var jqdialogContent = jq("#event_edit_container");
         resetForm(jqdialogContent);
         var startField = jqdialogContent.find("select[name='start']").val(calEvent.start);
         var endField = jqdialogContent.find("select[name='end']").val(calEvent.end);
         var titleField = jqdialogContent.find("input[name='title']");
         var bodyField = jqdialogContent.find("textarea[name='body']");
		 jq("#close_btn").bind('click',function() {
               jqdialogContent.hide();
			   jq('#calendar').weekCalendar("removeUnsavedEvents");

            });
			
		 jq("#cancel_btn").bind('click',function() {
               jqdialogContent.hide();
               jq('#calendar').weekCalendar("removeUnsavedEvents");
            });
			
		jq("#submit_btn").bind('click', function(calEvent) {
	            calEvent.id = id;
                id++;
                calEvent.start = new Date(startField.val());
                calEvent.end = new Date(endField.val());
                calEvent.title = titleField.val();
                calEvent.body = bodyField.val();

                jqcalendar.weekCalendar("removeUnsavedEvents");
                jqcalendar.weekCalendar("updateEvent", calEvent);
				jqdialogContent.hide();

            });
			
         /*jqdialogContent.dialog({
            modal: true,
            title: "New Calendar Event",
            close: function() {
               jqdialogContent.dialog("destroy");
               jqdialogContent.hide();
               jq('#calendar').weekCalendar("removeUnsavedEvents");
            },
            buttons: {
               save : function() {
                  calEvent.id = id;
                  id++;
                  calEvent.start = new Date(startField.val());
                  calEvent.end = new Date(endField.val());
                  calEvent.title = titleField.val();
                  calEvent.body = bodyField.val();

                  jqcalendar.weekCalendar("removeUnsavedEvents");
                  jqcalendar.weekCalendar("updateEvent", calEvent);
                  jqdialogContent.dialog("close");
               },
               cancel : function() {
                  jqdialogContent.dialog("close");
               }
            }
         }).show();*/
		 jqdialogContent.show();

         jqdialogContent.find(".date_holder").text(jqcalendar.weekCalendar("formatDate", calEvent.start));
         setupStartAndEndTimeFields(startField, endField, calEvent, jqcalendar.weekCalendar("getTimeslotTimes", calEvent.start));

      },
      eventDrop : function(calEvent, jqevent) {
        
      },
      eventResize : function(calEvent, jqevent) {
      },
      eventClick : function(calEvent, jqevent) {

         if (calEvent.readOnly) {
            return;
         }

         var jqdialogContent = jq("#event_edit_container");
         resetForm(jqdialogContent);
         var startField = jqdialogContent.find("select[name='start']").val(calEvent.start);
         var endField = jqdialogContent.find("select[name='end']").val(calEvent.end);
         var titleField = jqdialogContent.find("input[name='title']").val(calEvent.title);
         var bodyField = jqdialogContent.find("textarea[name='body']");
         bodyField.val(calEvent.body);
		 jq("#close_btn").bind('click',function() {
               jqdialogContent.hide();
   			   jq('#calendar').weekCalendar("removeUnsavedEvents");

            });
			
		 jq("#cancel_btn").bind('click',function() {
               jqdialogContent.hide();
               jq('#calendar').weekCalendar("removeUnsavedEvents");
            });
			
		jq("#submit_btn").bind('click', function(calEvent) {
                calEvent.start = new Date(startField.val());
                calEvent.end = new Date(endField.val());
                calEvent.title = titleField.val();
                calEvent.body = bodyField.val();

                jqcalendar.weekCalendar("updateEvent", calEvent);
				jqdialogContent.hide();
           });
		   
		 jq("#delete_btn").bind('click',function() {
			   jqcalendar.weekCalendar("removeEvent", calEvent.id);
               jqdialogContent.hide();
               jq('#calendar').weekCalendar("removeUnsavedEvents");
            });

         /*jqdialogContent.dialog({
            modal: true,
            title: "Edit - " + calEvent.title,
            close: function() {
               jqdialogContent.dialog("destroy");
               jqdialogContent.hide();
               jq('#calendar').weekCalendar("removeUnsavedEvents");
            },
            buttons: {
               save : function() {

                  calEvent.start = new Date(startField.val());
                  calEvent.end = new Date(endField.val());
                  calEvent.title = titleField.val();
                  calEvent.body = bodyField.val();

                  jqcalendar.weekCalendar("updateEvent", calEvent);
                  jqdialogContent.dialog("close");
               },
               "delete" : function() {
                  jqcalendar.weekCalendar("removeEvent", calEvent.id);
                  jqdialogContent.dialog("close");
               },
               cancel : function() {
                  jqdialogContent.dialog("close");
               }
            }
         }).show();*/
		 jq("#delete_btn").css("visibility", "visible");
		 jqdialogContent.show();
         var startField = jqdialogContent.find("select[name='start']").val(calEvent.start);
         var endField = jqdialogContent.find("select[name='end']").val(calEvent.end);
         jqdialogContent.find(".date_holder").text(jqcalendar.weekCalendar("formatDate", calEvent.start));
         setupStartAndEndTimeFields(startField, endField, calEvent, jqcalendar.weekCalendar("getTimeslotTimes", calEvent.start));
         jq(window).resize().resize(); //fixes a bug in modal overlay size ??

      },
      eventMouseover : function(calEvent, jqevent) {
      },
      eventMouseout : function(calEvent, jqevent) {
      },
      noEvents : function() {

      },
      data : function(start, end, callback) {
         callback(getEventData());
      }
   });

   function resetForm(jqdialogContent) {
      jqdialogContent.find("input").val("");
      jqdialogContent.find("textarea").val("");
   }

   function getEventData() {
      var year = new Date().getFullYear();
      var month = new Date().getMonth();
      var day = new Date().getDate();

      return {
         events : [
            {
               "id":1,
               "start": new Date(year, month, day, 12),
               "end": new Date(year, month, day, 13, 30),
               "title":"Lunch with Mike"
            },
            {
               "id":2,
               "start": new Date(year, month, day, 14),
               "end": new Date(year, month, day, 14, 45),
               "title":"Dev Meeting"
            },
            {
               "id":3,
               "start": new Date(year, month, day + 1, 17),
               "end": new Date(year, month, day + 1, 17, 45),
               "title":"Hair cut"
            },
            {
               "id":4,
               "start": new Date(year, month, day - 1, 8),
               "end": new Date(year, month, day - 1, 9, 30),
               "title":"Team breakfast"
            },
            {
               "id":5,
               "start": new Date(year, month, day + 1, 14),
               "end": new Date(year, month, day + 1, 15),
               "title":"Product showcase"
            },
            {
               "id":6,
               "start": new Date(year, month, day, 10),
               "end": new Date(year, month, day, 11),
               "title":"I'm read-only",
               readOnly : true
            },
            {
               "id":7,
               "start": new Date(year, month, day + 2, 17),
               "end": new Date(year, month, day + 3, 9),
               "title":"Multiday"
            }
         ]
      };
   }


   /*
    * Sets up the start and end time fields in the calendar event
    * form for editing based on the calendar event being edited
    */
   function setupStartAndEndTimeFields(jqstartTimeField, jqendTimeField, calEvent, timeslotTimes) {

      jqstartTimeField.empty();
      jqendTimeField.empty();

      for (var i = 0; i < timeslotTimes.length; i++) {
         var startTime = timeslotTimes[i].start;
         var endTime = timeslotTimes[i].end;
         var startSelected = "";
         if (startTime.getTime() === calEvent.start.getTime()) {
            startSelected = "selected=\"selected\"";
         }
         var endSelected = "";
         if (endTime.getTime() === calEvent.end.getTime()) {
            endSelected = "selected=\"selected\"";
         }
         jqstartTimeField.append("<option value=\"" + startTime + "\" " + startSelected + ">" + timeslotTimes[i].startFormatted + "</option>");
         jqendTimeField.append("<option value=\"" + endTime + "\" " + endSelected + ">" + timeslotTimes[i].endFormatted + "</option>");

         jqtimestampsOfOptions.start[timeslotTimes[i].startFormatted] = startTime.getTime();
         jqtimestampsOfOptions.end[timeslotTimes[i].endFormatted] = endTime.getTime();

      }
      jqendTimeOptions = jqendTimeField.find("option");
      jqstartTimeField.trigger("change");
   }

   var jqendTimeField = jq("select[name='end']");
   var jqendTimeOptions = jqendTimeField.find("option");
   var jqtimestampsOfOptions = {start:[],end:[]};

   //reduces the end time options to be only after the start time options.
   jq("select[name='start']").change(function() {
      var startTime = jqtimestampsOfOptions.start[jq(this).find(":selected").text()];
      var currentEndTime = jqendTimeField.find("option:selected").val();
      jqendTimeField.html(
            jqendTimeOptions.filter(function() {
               return startTime < jqtimestampsOfOptions.end[jq(this).text()];
            })
            );

      var endTimeSelected = false;
      jqendTimeField.find("option").each(function() {
         if (jq(this).val() === currentEndTime) {
            jq(this).attr("selected", "selected");
            endTimeSelected = true;
            return false;
         }
      });

      if (!endTimeSelected) {
         //automatically select an end date 2 slots away.
         jqendTimeField.find("option:eq(1)").attr("selected", "selected");
      }

   });

});

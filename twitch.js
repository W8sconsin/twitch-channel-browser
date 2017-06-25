var channels = ["yeTz", "Grimmmz", "ESL_SC2", "NALCS1" ,"OgamingSC2", "cretetion", "A_Seagull", "JoshOG", "habathcx", "redbullesports", "Lethalfrag","comster404"];
var results = [];

$(document).ready(function() {
  checkChannels();
});

function checkChannels() {

  for (var i = 0; i < channels.length; i++) {
    checkChannel(channels[i]);
  }

}

function checkChannel(channel) {
  var url_user = "https://wind-bow.glitch.me/twitch-api/users/" + channel;
  var result = new Object();
  result.logo = "https://upload.wikimedia.org/wikipedia/commons/1/19/Blank_icon.png";
  result.channel = channel;
  result.program = "";
 
  $.getJSON(url_user, function(data_user) {
    if (data_user["error"] != null) {
      result.status = "Closed";
      // displayInfo(result);
    } else {
      result.channel = "<a href=\"https://twitch.tv/" + channel + " \" target=\"_blank\">" + channel + "</a>";

      if (data_user.logo != null) {
        result.logo = data_user.logo;
      }

      var url_stream = "https://wind-bow.glitch.me/twitch-api/streams/" + channel;

      $.getJSON(url_stream, function(data_stream) {
        if (data_stream.stream === null) {
          result.status = "Offline";
        } else {
          result.status = "Online";
          result.program = data_stream.stream.channel.game + "<br><i>" + data_stream.stream.channel.status + "</i>";
        }

        displayInfo(result);
      });
    }
  });

  function displayInfo(info) {
    var row = "";
    var row_class;

    switch (info.status) {
      // case "Closed":
      //   row_class = "table-danger";
      //   break;
      case "Offline":
        row_class = "table-active";
        break;
      case "Online":
        row_class = "table-success";
        break;
    }

    row = "<tr class=\"" + row_class + "\"><td ><img class=\"channel_icon\"   src=\"" + info.logo + "\" /></td><td>" + info.channel + "</td></td><td>" + info.status + "</td><td>" + info.program + "</td></tr>";
    $("#table_result").append(row);

    $(".se-pre-con").fadeOut(1000);;
  }

}

$(document).on("change","select",function(){

  var value = $("#status_filter").val();

  switch (value) {
    case "All":
      $("tr").each(function() {
        $(this).show();
      });
      break;
    case "Offline":
      $("tr.table-success").each(function() {
        $(this).hide();
      });
      $("tr.table-active").each(function() {
        $(this).show();
      });
      $("tr.table-danger").each(function() {
        $(this).show();
      });
      // $("th.program-label").css("width", "200px");
      break;
    case "Online":
      $("tr.table-success").each(function() {
        $(this).show();
      });
      $("tr.table-active").each(function() {
        $(this).hide();
      });
      $("tr.table-danger").each(function() {
        $(this).hide();
      });
      break;
  }

});
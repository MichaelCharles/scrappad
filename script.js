function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

(function () {
  "use strict";
  var content = getCookie("content");

  content = content.replace(/<L!B>/g, "\n");
  $("textarea").val(content);

  $("textarea").on("change keyup", function () {
    content = $("textarea").val();
    content = content.replace(/\n\r?/g, "<L!B>");
    setCookie("content", content, 365);
    setCookie("isSaved", false, 365);
  });

  $("#about").click(function () {
    $("#about").hide();
  });

  $("#about-btn").click(function () {
    $("#expander").css({
      height: "300%",
      width: "300%",
      bottom: "-50%",
      right: "-50%",
    });
    setTimeout(function () {
      $("#about").css("display", "flex");
      $("#expander").css({
        height: "0",
        width: "0",
        bottom: "0",
        right: "0",
      });
    }, 600);
  });
})();

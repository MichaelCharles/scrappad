function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ")
            c = c.substring(1);
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

(function() {
    "use strict";
    var content = getCookie("content");
    var title = getCookie("title");
    if (title == "") {
        title = "Untitled";
    }
    $("#filename").val(title);
    var isSaved = getCookie("isSaved");
    if (content != "" && isSaved == "false") {
        $("#dialog").fadeIn(1000);
        setTimeout(function() {
            $("#dialog").fadeOut(1000);
        }, 8000);
    }
    content = content.replace(/<L!B>/g, "\n");
    $("textarea").val(content);

    $("textarea").on("change keyup", function() {
        content = $("textarea").val();
        content = content.replace(/\n\r?/g, "<L!B>");
        setCookie("content", content, 365);
        setCookie("isSaved", false, 365);
    });
    $("#filename").on("change keyup", function() {
        title = $("#filename").val();
        setCookie("title", title, 365);
        setCookie("isSaved", false, 365);
    });
    $("#dialog").click(function() {
        $("#dialog").fadeOut(500);
    });
    $("textarea").click(function() {
        $("#dialog").fadeOut(500);
    });
    $("#about").click(function() {
        $("#about").hide();
    });
    $("#about-btn").click(function() {
        $("#expander").css({
            height: "300%",
            width: "300%",
            top: "-50%",
            right: "-50%"
        });
        setTimeout(function() {
            $("#about").css("display", "flex");
            $("#expander").css({
                height: "0",
                width: "0",
                top: "0",
                right: "0"
            });
        }, 600);
    });
    $("#save-btn").click(function() {
        setCookie("isSaved", true, 365);
        saveTextAsFile();
    });
    $("#open-btn").mousedown(function() {
        $("#fileToLoad").click();
    });
    $("#fileToLoad").change(function() {
        loadFileAsText();
    });
})();

function saveTextAsFile() {
    var textToWrite = $("textarea").val();
    var textFileAsBlob = new Blob([textToWrite], { type: "text/plain" });
    var fileNameToSaveAs = $("#filename").val();

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    } else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

function loadFileAsText() {
    var theFile = $("#fileToLoad").prop("files");
    var fileTitle = theFile[0].name;
    var fileType = fileTitle.slice(-4);
    if (fileType == ".txt") {
        fileTitle = fileTitle.slice(0, -4);
    }
    $("#filename").val(fileTitle);
    var fileToLoad = document.getElementById("fileToLoad").files[0];
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        $("textarea").val(textFromFileLoaded);
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
    setTimeout(function() {
        saveContent(true);
    }, 500);
}

function saveContent(wasSaved) {
    content = $("textarea").val();
    content = content.replace(/\n\r?/g, "<L!B>");
    setCookie("content", content, 365);
    setCookie("isSaved", wasSaved, 365);
    title = $("#filename").val();
    setCookie("title", title, 365);
}

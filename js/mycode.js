var file = "https://raw.githubusercontent.com/Terasology/LightAndShadow/develop/assets/prefabs/TeamDialog.prefab"
var data


$(document).ready(function(){
	$.getJSON(file, function(newdata) {

        data = newdata;
        var pages = data.Dialog.pages;
        var list = $("#pageList")
        
        // Fill sidebar with page links
        for (var i=0; i<pages.length; i++) {
            var id = pages[i].id;
            list.append("<li id='" + id + "' data-page='" + i + "'><a href='#'>" + id + "</a></li>")
            $("#"+id).click(function() {
                var page = pages[this.dataset.page]
                loadPage(page)
            })
        }

        loadPageById(data.Dialog.firstPage)
    })
});


function loadPageById(target) {
    var pages = data.Dialog.pages;
    for (var i=0; i<pages.length; i++) {
        var id = pages[i].id;
        if (id == target) {
            loadPage(pages[i]);
        }
    }
}

function loadPage(page) {
    $("#pageTitle").text(page.title)
    $("#pageText").text(page.paragraphText)
    
    $("#responses").text("")
    for (var i=0; i<page.responses.length; i++) {
        var response = page.responses[i]
        var text = "<li><b>" + response.text + "</b> "
        if (Array.isArray(response.action)) {
            for (var j=0; j<response.action.length; j++) {
                text += handleResponse(response.action[j]);
            }
        } else {
            text += handleResponse(response.action);
        }
        text += "</li>"
        $("#responses").append(text)
    }
}    


function handleResponse(action) {
    if (action.type == "NewDialogAction") {
        return "<br/><a href='#'>" + action.type + "</a>"
    } else {
        return "<br/>(" + action.type + ")"
    }
}

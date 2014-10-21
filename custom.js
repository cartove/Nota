// config
var options = {
    editor: document.getElementById("pen_editor"), // {DOM Element} [required]
    class: 'pen', // {String} class of the editor,
    debug: true, // {Boolean} false by default
    textarea: '<textarea name="content"></textarea>', // fallback for old browsers
    list: ['blockquote', 'h2', 'h3', 'p', 'insertorderedlist', 'insertunorderedlist',
        'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'] // editor menu list
};

// create editor
var pen = window.pen = new Pen(options);
var he = require('he');
var toMarkdown = new require('to-markdown').toMarkdown;
var markdownpdf = require("markdown-pdf");
var fs = require("fs");

// toggle editor mode
document.querySelector('#mode').addEventListener('click', function() {

    var text = this.textContent;

    if(this.classList.contains('disabled')) {
        this.classList.remove('disabled');
        pen.rebuild();
    } else {
        this.classList.add('disabled');
        pen.destroy();
    }
});

// toggle editor mode MARKDOWN DISPLAYING
document.querySelector('#hinted').addEventListener('click', function() {
    var pen = document.querySelector('.pen');

    if(pen.classList.contains('hinted')) {
        pen.classList.remove('hinted');
        this.classList.add('disabled');
    } else {
        pen.classList.add('hinted');
        this.classList.remove('disabled');
    }
});

// toggle Text Direction LTR/RTL
document.querySelector('#textdirection').addEventListener('click', function() {
    if (document.getElementById("pen_editor").style.direction == "rtl")
        document.getElementById("pen_editor").style.direction ="ltr";
    else
        document.getElementById("pen_editor").style.direction ="rtl";
});


// Print order
document.querySelector('#printme').addEventListener('click', function() {
    window.print()
});

// load as markdown or HTML
window.onload = function() {
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('pen_editor');

    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var textType = /text.*/;

        if (file.type.match(textType)) {
            document.getElementById("pen_editor").className =
                document.getElementById("pen_editor").className.replace(/\bpen-placeholder\b/,'');

            var reader = new FileReader();

            reader.onload = function(e) {
                var converter = new Showdown.converter();
                pen.destroy();
                fileDisplayArea.innerHTML = converter.makeHtml(reader.result);
                pen.rebuild();
            }

            reader.readAsText(file);
        } else {
            fileDisplayArea.innerText = "File not supported!"
        }
    });
};

// Export to PDF
document.querySelector('#filePDFOutput').addEventListener('click', function() {
    var elMD = toMarkdown(document.getElementById("pen_editor").innerHTML);
    saveFile('#filePDFOutput',elMD,'pdf');

});
// save as html
document.querySelector('#fileHTMLOutput').addEventListener('click', function() {
    var elHtml = document.getElementById("pen_editor").innerHTML;
    saveFile('#fileHTMLOutput',elHtml,'html');

});

// save as markdown
document.querySelector('#fileMDOutput').addEventListener('click', function() {
    var elMD = toMarkdown(document.getElementById("pen_editor").innerHTML);
    saveFile('#fileMDOutput',elMD,'md');
});
function saveFile(name,data,type) {
    var chooser = document.querySelector(name);
    chooser.addEventListener("change", function(evt) {
        console.log(this.value); // get your file name
        var fs = require('fs');// save it now
        if(type == 'pdf') {
            markdownpdf().from.string(data).to(this.value, function (err) {
                if (err) {
                    alert("error" + err);
                }
                console.log("Created", this.value)
            });
        }else{
            fs.writeFile(this.value, data, function(err) {
                if(err) {
                    alert("error"+err);
                }
            });
        }
    }, false);

    chooser.click();
}




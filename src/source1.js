//define page render function     
var aaa = function (pdf, page_number) {
          pdf.getPage(page_number).then(function(page) {
            var scale = 1.5;
            var viewport = page.getViewport(scale);
            var canvas = $('.pdf-view')[page_number-1];
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            var renderContext = {
                canvasContext: context,
                viewport: viewport
            };  
            page.render(renderContext);

            if (i < 50) {
            //render first 50 pages but not all pages except #50
                aaa(pdf, i);
                i++;
            }

        }); 
    };

//pre-generate 50 canvases
var docFragment = document.createDocumentFragment();
for (var i = 1;i < 51;i++) {
  var c = document.createElement("canvas");
  $(c).data({{ raw_path }});
  $(c).addClass('pdf-view hide');
  $(c).css('margin-bottom', '10px');
  docfrag.appendChild(c);
}
 $('#file-view #pdf').append(docfrag);

    //call render
    var i = 1;
    aaa(pdf, i);
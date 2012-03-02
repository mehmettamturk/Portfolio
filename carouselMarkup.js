var images = ['Memox.png','Memox.png','Memox.png','Memox.png'];
var headers = ['Açıldık..','Blog Yazısı-1','Blog Yazısı-2','Blog Yazısı-3'];
var descriptions = ['Kişisel Web Sayfamı sonunda açtım, hakkımda ufak bir websitesi',
                   'Bloğumda son paylaştığım yazılardan birisi..',
                   'Bloğumda paylaştığım yazılardan sondan bir öncekisi',
                   'Bloğumda paylaştığım yazılardan sondan bir öncekisinden önceki'];

var createMarkup = function(){
    var markup = '<div id="ca-container" class="ca-container">' +
                     '<div class="ca-wrapper">';

    for (var i = 0, ii = headers.length; i < ii; i++) {
        markup = markup + '<div class="ca-item ca-item-' + i + '">' +
                              '<div class="ca-item-main">' +
                                  '<div class="ca-icon">' +
                                      '<img src="' + images[i] + '" alt="memo" height="100" width="150">' +
                                  '</div>' +
                                  '<h3>' + headers[i] + '</h3>' +
                                  '<h4>' +
                                      '<span class="ca-quote">&ldquo;</span>' +
                                      '<span>' + descriptions[i] + '</span>' +
                                  '</h4>' +
                                  '<a href="#" class="ca-more">dahası...</a>' +
                              '</div>' +
                          '</div>';
    }

    markup = markup + '</div></div>';

    return markup;
};
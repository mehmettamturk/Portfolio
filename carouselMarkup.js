var images = ['Memox.png','Memox.png','Memox.png','Memox.png'];
var headers = ['Açıldık..','Blog Yazısı-1','Blog Yazısı-2','Blog Yazısı-3'];
var descriptions = ['Kişisel Web Sayfamı sonunda açtım, hakkımda ufak bir websitesi',
                   'Bloğumda son paylaştığım yazılardan birisi..',
                   'Bloğumda paylaştığım yazılardan sondan bir öncekisi',
                   'Bloğumda paylaştığım yazılardan sondan bir öncekisinden önceki'];

var getArticles = function() {
    var items = [];/*
    $.get("getrss.php", function(data) {
        var $xml = $(data);
        $xml.find("item").each(function() {
            var $this = $(this),
                item = {
                    title: $this.find("title").text(),
                    link: $this.find("link").text(),
                    description: $this.find("description").text(),
                    pubDate: $this.find("pubDate").text(),
                    author: $this.find("author").text()
                };
            //Do something with item here...
            items.push(item);
        });
    });*/
/*
    $.ajax({
        url: 'getrss.php',
        dataType: 'json',
        success: function(data) {
            callback(data.responseData.feed);
        }
    });
*//*
    $.ajax({
        url: 'getrss.php',
        success: function(data) {
            console.log(data);
        }
    });
/
            $.getFeed({
                url: 'url=http://www.mehmettamturk.com/blog/?feed=rss2',
                success: function(feed) {
                    console.log(feed);
                }
            });*/
/*
    var url = 'http://www.mehmettamturk.com/blog/?feed=rss2';
    jQuery.getFeed({
        url: url,
        success: function(feed) {
            alert(feed.title);
        }
    });
*/


    return items;
};


var memo = (function(url, callback) {
    jQuery.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
        dataType: 'json',
        success: function(data) {
            callback(data.responseData.feed);
        }
    });
})('http://news.hitb.org/rss.xml', function(feed){ // Change to desired URL
    var entries = feed.entries;
    for (var i = 0; i < entries.length; i++) {
        jQuery('.feed > ul').append('<li><a href="' + entries[i].link + '">' + entries[i].title + '</a></li>');
    }
});


var getXMLElement = function() {
    var items = [];
    $.ajax({
        type: "POST",
        url: "http://www.mehmettamturk.com/blog/?feed=rss2",
        cache: false,
        dataType: "xml",
        success: function(xml) {
            $(xml).find('item title').each(function() {
                console.log("yes");
            });
        },
        error: function(jqXHR, text, errorMsg) {
            alert("Error opening file – " + errorMsg);
        }
});
    return items;
};








var createMarkup = function(){
    var items = getXMLElement();

    var markup = '<div id="ca-container" class="ca-container">' +
                     '<div class="ca-wrapper">';

    for (var i = 0, ii = headers.length; i < ii; i++) {
        markup = markup + '<div class="ca-item ca-item-' + i + '">' +
                              '<div class="ca-item-main">' +
                                  '<div class="ca-icon">' +
                                      '<img src="img/' + images[i] + '" alt="memo" height="120" width="180">' +
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
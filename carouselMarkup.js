var images = ['img/Memox.png',
              'http://www.mehmettamturk.com/blog/wp-content/uploads/2012/02/01-10_jquery_mouse_movement-180x160.jpg',
              'http://www.mehmettamturk.com/blog/wp-content/uploads/2012/02/css-animation-180x160.png',
              'http://www.mehmettamturk.com/blog/wp-content/uploads/2012/01/soru.png'];
var headers = ['Açıldık..',
               'Jquery Animate Api',
               'Animate.css – Animasyon Kütüphanesi',
               'Sayfanın Adres Bilgileri ( window.location )'];
var descriptions = ['Kişisel Web Sayfamı sonunda açtım, hakkımda ufak bir websitesi',
                   'Eğer projelerinizde animasyon yaratmak isterseniz Jquery kütüphanesinin animate methodunu kullanabilirsiniz. Method genel olarak 4 parametre alır ',
                   'animate.css projelerinizde hoş, başarılı ve cross-browser animasyonlar yaratabiliceğiniz bir kütüphanedir. Animate Css Github adresinden kütüphaneyi indirebilirsiniz. ',
                   '"window.location" nesnesi ile bulunduğunuz sayfanın adresi hakkında bilgi edinebilirsiniz ve bulunduğunuz adresi değiştirebilirsiniz.'];

var links = ['file:///C:/Users/Mehmet/PhpstormProjects/portfolio/index.html',
             'http://www.mehmettamturk.com/blog/?p=496',
             'http://www.mehmettamturk.com/blog/?p=467',
             'http://www.mehmettamturk.com/blog/?p=400'];

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
    //var items = getXMLElement();

    var markup = '<div id="ca-container" class="ca-container">' +
                     '<div class="ca-wrapper">';

    for (var i = 0, ii = headers.length; i < ii; i++) {
        var head = headers[i];
        if (head.length > 20) {
            head = head.slice(0,20);
            head = head + '...';
        }

        var desc = descriptions[i];
        if (desc.length > 75) {
            desc = desc.slice(0,75);
            desc = desc + '...';
        }

        markup = markup + '<div class="ca-item ca-item-' + i + '">' +
                              '<div class="ca-item-main">' +
                                  '<div class="ca-icon">' +
                                      '<img src="' + images[i] + '" alt="memo" height="120" width="180">' +
                                  '</div>' +
                                  '<h3 title="' + headers[i] + '">' + head + '</h3>' +
                                  '<h4>' +
                                      '<span class="ca-quote">&ldquo;</span>' +
                                      '<span title="' + descriptions[i] + '">' + desc + '</span>' +
                                  '</h4>' +
                                  '<a href="' + links[i] + '" class="ca-more">Devamını Oku...</a>' +
                              '</div>' +
                          '</div>';
    }

    markup = markup + '</div></div>';

    return markup;
};
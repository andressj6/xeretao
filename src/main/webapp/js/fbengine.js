window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
        appId: '1403131779903455', // App ID from the app dashboard
        channelUrl: 'http://localhost:8080/xeretao/channel.html', // Channel file for x-domain comms
        status: true, // Check Facebook Login status
        xfbml: true // Look for social plugins on the page
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var infos = ["photos", "posts-like", "posts-share"];

$(document).ready(function() {
    $("#btn-buscar").click(function() {
        buscarPalavraChave($("#input-busca").val(), $("#panel-resultados-posts .panel-body"));
        buscarPalavraComentarios($("#input-busca").val(), $("#panel-resultados-comments .panel-body"));
        $("#btn-buscar").attr("disabled", "disabled");
    });
});




var friendList = [];

setTimeout(function() {
    FB.api({
        method: "fql.query",
        query: "select uid2 from friend where uid1 = me()"
    }, function(response) {
        for (var rp in response) {
            var friend = response[rp];
            friendList.push(friend.uid2);
        }
    });
    fillDashboard(infos);
}, 4000);

function checkLogin(callback) {
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            console.log("connected");
            var uid = response.authResponse.userID;
            var accessToken = response.authResponse.accessToken;
            callback(accessToken);
            return true;
        } else if (response.status === 'not_authorized') {
            console.log("Not authorized");
            return false;
        } else {
            console.log("Tentando Login");
            FB.login(function(response) {
                if (response.authResponse) {
                    callback();
                    return true;
                } else {
                    alert("Não foi possivel efetuar o login no facebook");
                    return false;
                }
            });
        }
    });
}

/**
 * 
 * @param {string} key palavra chave a ser buscada
 * @param {function} destination onde o conteudo será inserido
 * @returns boolean se a requisição foi efetuada
 */
function buscarPalavraChave(key, destination) {
    var oneWeekAgo = Math.round((new Date().setDate(new Date().getDate() - 3)) / 1000);
    destination.empty().append("<img src='/xeretao/img/load.gif' />");
    FB.api({
        method: 'fql.multiquery',
        queries: {
            query1: "SELECT actor_id, source_id, post_id, message, like_info, comment_info FROM stream WHERE filter_key IN (SELECT filter_key FROM stream_filter WHERE type = 'newsfeed' and uid = me())   and created_time > " + oneWeekAgo + " and type IN (45, 56, 128, 247, 308) limit 150",
            query2: "SELECT uid, name, pic_small FROM user WHERE uid IN (SELECT actor_id FROM #query1)",
            query3: "SELECT page_id, name, pic_small FROM page where page_id IN (SELECT actor_id FROM #query1)"
        }
    }, function(response) {
        var posts = response[0].fql_result_set;
        var sources = response[1].fql_result_set.concat(response[2].fql_result_set);
        var relevantPosts = [];
        for (var x = 0; x < posts.length; x++) {
            var content = posts[x].message.toString();
            if (content.toLowerCase().indexOf(key.toLowerCase()) >= 0) {
                for (var y = 0; y < sources.length; y++) {
                    if (posts[x].actor_id === sources[y].uid || posts[x].actor_id === sources[y].page_id) {
                        posts[x].actor_name = sources[y].name;
                        posts[x].actor_pic = sources[y].pic_small;
                        break;
                    }
                }
                relevantPosts.push(posts[x]);
            }
        }
        destination.empty();
        var list = $("<ul class='list-group'>");
        for (var i in relevantPosts) {
            var post = relevantPosts[i];
            var li = $("<li class='list-group-item'>");
            var html = "<img src='" + post.actor_pic + "' />" +
                    "<div>" +
                    "<h4>" + post.actor_name + "</h4>" + post.message +
                    "</div>";
            li.append(html);
            addCommentBlock(post.post_id, post.comment_info.comment_count, li);
            list.append(li);
        }
        destination.append(list);
        $("#btn-buscar").removeAttr("disabled");
    });
    return true;
}


/**
 * 
 * @param {string} palavra chave da busca
 * @param {jQuery} destination chave da busca
 * @returns {void} 
 */
function buscarPalavraComentarios(palavra, destination) {
    var oneWeekAgo = Math.round((new Date().setDate(new Date().getDate() - 5)) / 1000);
    destination.empty().append("<img src='/xeretao/img/load.gif' />");
    FB.api("/me/home?fields=comments.filter(toplevel).limit(10).fields(message,from,like_count)&since=" + oneWeekAgo, function(response) {
        destination.empty();
        var list = $("<ul class='list-group'>");
        var commentList = [];
        for (var i in response.data) {
            var post = response.data[i];
            var comments = post.comments;
            if (!comments) {
                continue;
            }
            var j = 0;
            for (j in comments.data) {
                var comment = comments.data[j];
                if (comment.message.toLowerCase().contains(palavra.toLowerCase()) && friendList.indexOf(comment.from.id) >= 0) {
                    commentList.push(comment);
                }
            }
        }
        console.log("Comentários Selecionados");
        console.log(commentList);
        console.log("Resposta Bruta");
        console.log(response);
    });
}



var palavras;
function gerarTagCloud() {
    var tags = [];
    var oneWeekAgo = Math.round((new Date().setDate(new Date().getDate() - 3)) / 1000);
    FB.api({
        method: "fql.query",
        //46,  80, 257
        query: "SELECT post_id, message FROM stream WHERE filter_key IN (SELECT filter_key FROM stream_filter WHERE type = 'newsfeed' and uid = me()) and created_time > "
                + oneWeekAgo + " and type IN (46,80,257) limit 150"
    }, function(response) {
        var pattern = /(\w(â|á|ã|é|ê|õ|ô|ó|í|ú)?)+/gi;
        for (var i in response) {
            var post = response[i];
            var matches = post.message.toString().match(pattern);
            for (var j in matches) {
                var palavra = matches[j];
                if (palavra.length > 5) {
                    if (!tags[palavra]) {
                        var obj = {word: palavra, weight: 1};
                        tags.push(obj);
                    } else {
                        for (var k in tags) {
                            if (tags[k].word == palavra) {
                                tags[k].weight = tags[k].weight + 1;
                            }
                        }
                    }
                }
                if (tags.length > 15) {
                    break;
                }
            }
        }
        var word_list = [];
        for (var k in tags) {
            var t = tags[k];
            word_list.push({word: t.word, weight: t.weight});
        }
        palavras = word_list;
        $("#panel-tagcloud .panel-body").jQCloud(word_list);
    });
}


/**
 * 
 * @returns html com o as fotos mais curtidas
 */
function fotosMaisCurtidas() {
    FB.api({
        method: 'fql.query',
        query: 'SELECT pid,like_info,src,src_big, comment_info, object_id from photo where owner = me() order by like_info.like_count desc limit 10'
    }, function(response) {
        var list = $("<ul class='list-group'>");
        for (var i in response) {
            var foto = response[i];
            var li = $("<li class='list-group-item'>");
            var img = $("<img src='" + foto.src + "'>");
            var spanContent = $("<span>").text(foto.like_info.like_count + " likes");
            li.append(img).append(spanContent);
            list.append(li);
            addCommentBlock(foto.object_id, foto.comment_info.comment_count, li);
        }
        $("#panel-photos .panel-body").append(list);
    });
}

function postsMaisCurtidos() {
    FB.api({
        method: 'fql.query',
        query: 'SELECT message, like_info, comment_info, post_id from stream where source_id = me() or source_id in (SELECT uid2 FROM friend WHERE uid1 = me()) and (created_time > 1357020000 and like_info.like_count > 0) order by like_info.like_count desc LIMIT 50;'
    }, function(response) {
        var list = $("<ul class='list-group'>");
        for (var i in response) {
            var post = response[i];
            var li = $("<li class='list-group-item'>");
            var spanQtd = $("<span style='font-weight: bold'>").text(post.like_info.like_count + " likes - ");
            var spanContent = $("<span>").text(post.message);
            li.append(spanQtd).append(spanContent);
            list.append(li);
            addCommentBlock(post.post_id, post.comment_info.comment_count, li);
        }
        $("#panel-posts-like .panel-body").empty().append(list);
    });
}

/**
 * 
 * */
function postsMaisCompartilhados() {
    FB.api({
        method: 'fql.query',
        query: 'SELECT message, share_count, comment_info, post_id from stream where source_id = me() or source_id in (SELECT uid2 FROM friend WHERE uid1 = me()) and created_time > 1357020000 and share_count > 0 order by share_count desc LIMIT 50;'
    }, function(response) {
        var list = $("<ul class='list-group'>");
        for (var i in response) {
            var post = response[i];
            var li = $("<li class='list-group-item'>");
            var spanQtd = $("<span style='font-weight: bold'>").text(post.share_count + " compartilhamentos - ");
            var spanContent = $("<span>").text(post.message);
            li.append(spanQtd).append(spanContent);
            list.append(li);
            addCommentBlock(post.post_id, post.comment_info.comment_count, li);
        }
        $("#panel-posts-share .panel-body").empty().append(list);
    });
}

/**
 * @param {type} fields campos que serão retornados
 */
function fillDashboard(fields) {
    for (var i in fields) {
        var field = fields[i];
        if (field === "photos") {
            fotosMaisCurtidas();
        }
        if (field === "posts-like") {
            postsMaisCurtidos();
        }

        if (field === "posts-share") {
            postsMaisCompartilhados();
        }
    }

}

/**
 * 
 * @param {type} postId
 * @param {type} qtdComments
 * @param {type} block
 * @returns {undefined}
 */
function addCommentBlock(postId, qtdComments, block) {
    var hr = $("<hr />");
    var well = $("<div class='well well-sm'>");

    var ulComments = $("<ul class='list-group' id='comment-list-'" + postId + ">");
    var link = $("<a href='#'>" + qtdComments + " comentários</a>");

    well.append(link).append(ulComments);

    if (qtdComments > 0) {
        link.click(function() {
            ulComments.empty();
            FB.api('/' + postId + '/comments?fields=id,message,like_count,user_likes,from.fields(picture,name)', function(response) {
                for (var i = 0; i < response.data.length; i++) {
                    var comment = response.data[i];
                    var li = $("<li class='list-group-item'>");
                    var html = "<span class='comment'>" +
                            "<div><h5>" + comment.from.name + "</h5>" +
                            "<img src='" + comment.from.picture.data.url + "' style=''/>" +
                            comment.message +
                            "</div>" +
                            "</span>";
                    li.append(html);
                    ulComments.append(li);
                }
            });
            return false;
        });
    }
    var inputCommentBox = $('<input type="text" class="form-control" id="comment-' + postId + '" placeholder="Comentar">' +
            '<span class="input-group-btn">' +
            '<button class="btn btn-xs btn-success" id="btn-buscar" onclick="sendComment(\'' + postId + '\')" type="button">Enviar!</button>' +
            '</span>');
    well.append(inputCommentBox);

    block.append(well);
}



/**
 * 
 * @param {int} sourceId
 * @param {unsigned int32} likeCount quantidade de likes que o objeto tem
 * @param {boolean} userLikes se o usuario ja curte o objeto
 * @returns {void}
 * adiciona um botao de like a um objeto. Esse é um toggleButton cuja a ação
 * de toggle é like/unlike o objeto
 */
function addLikeButton(sourceId, likeCount, userLikes) {
    var p = $("<p>");
    var botao = $("<button class='btn " + (userLikes === true ? "btn-success" : "btn-default") + " btn-xs'>" + (userLikes === true ? "Curti!" : "Curtir?") + "</button>");

    return p;
}

function likeObject(sourceId) {

}

/**
 * 
 * @param {int} postId
 * @returns {undefined}
 */
function sendComment(postId) {
    FB.api("/" + postId + "/comments", 'post', {message: $("#comment-" + postId).val()}, function(response) {
        if (!response || response.error) {
            alert("Erro");
        } else {
            console.log(response);
        }
    });
}
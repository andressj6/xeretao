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
    FB.api({
        method: 'fql.multiquery',
        queries: {
            query1: "SELECT actor_id, source_id, post_id, message, like_info FROM stream WHERE filter_key IN (SELECT filter_key FROM stream_filter WHERE type = 'newsfeed' and uid = me())   and created_time > " + oneWeekAgo + " and type IN (45, 56, 128, 247, 308) limit 150",
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
            var img = $("<img src='" + post.actor_pic + "'>");
            var spanContent = $("<span>").text(post.message);
            li.append(img).append(spanContent);
            list.append(li);
        }
        destination.append(list);
        console.log(relevantPosts);
        $("#btn-buscar").removeAttr("disabled");
    });
    return true;
}


/**
 * 
 * @returns html com o as fotos mais curtidas
 */
function fotosMaisCurtidas() {
    FB.api({
        method: 'fql.query',
        query: 'SELECT pid,like_info,src,src_big from photo where owner = me() order by like_info.like_count desc limit 10'
    }, function(response) {
        var list = $("<ul class='list-group'>");
        for (var i in response) {
            var foto = response[i];
            var li = $("<li class='list-group-item'>");
            var img = $("<img src='" + foto.src + "'>");
            var spanContent = $("<span>").text(foto.like_info.like_count + " likes");
            li.append(img).append(spanContent);
            list.append(li);
        }
        $("#panel-photos .panel-body").append(list);
    });
}

function postsMaisCurtidos() {
    FB.api({
        method: 'fql.query',
        query: 'SELECT message, like_info from stream where source_id = me() and (created_time > 1357020000 and like_info.like_count > 0) order by like_info.like_count desc LIMIT 50;'
    }, function(response) {
        var list = $("<ul class='list-group'>");
        for (var i in response) {
            var post = response[i];
            var li = $("<li class='list-group-item'>");
            var spanQtd = $("<span style='font-weight: bold'>").text(post.like_info.like_count + " likes - ");
            var spanContent = $("<span>").text(post.message);
            li.append(spanQtd).append(spanContent);
            list.append(li);
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
        query: 'SELECT message, share_count from stream where source_id = me() and created_time > 1357020000 and share_count > 0 order by share_count desc LIMIT 50;'
    }, function(response) {
        var list = $("<ul class='list-group'>");
        for (var i in response) {
            var post = response[i];
            var li = $("<li class='list-group-item'>");
            var spanQtd = $("<span style='font-weight: bold'>").text(post.share_count + " compartilhamentos - ");
            var spanContent = $("<span>").text(post.message);
            li.append(spanQtd).append(spanContent);
            list.append(li);
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
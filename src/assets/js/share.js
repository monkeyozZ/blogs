var Share = function (a) {
  function b (a) {
    return a = a.replace("{url}", c),
      a = a.replace("{title}", d),
      a = a.replace("{content}", e),
      a = a.replace("{pic}", f);
  }
  a = a || {};
  var c = a.url || window.location.href,
    d = a.title || document.title,
    e = a.content || "",
    f = a.pic || ""
    c = encodeURIComponent(c),
    d = encodeURIComponent(d),
    e = encodeURIComponent(e),
    f = encodeURIComponent(f)
  var g = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&title={title}&pics={pic}&summary={content}",
    h = "http://service.weibo.com/share/share.php?url={url}&title={title}&pic={pic}&searchPic=false",
    i = "http://share.v.t.qq.com/index.php?c=share&a=index&url={url}&title={title}&appkey=801cf76d3cfc44ada52ec13114e84a96",
    j = "http://widget.renren.com/dialog/share?resourceUrl={url}&srcUrl={url}&title={title}&description={content}",
    k = "http://www.douban.com/share/service?href={url}&name={title}&text={content}&image={pic}",
    l = "https://www.facebook.com/sharer/sharer.php?u={url}&t={title}&pic={pic}",
    m = "https://twitter.com/intent/tweet?text={title}&url={url}",
    n = "https://www.linkedin.com/shareArticle?title={title}&summary={content}&mini=true&url={url}&ro=true",
    o = "http://qr.liantu.com/api.php?text={url}",
    p = "http://connect.qq.com/widget/shareqq/index.html?url={url}&desc={title}&pics={pic}"
  this.qzone = function () {
    window.open(b(g))
  }
  this.weibo = function () {
    window.open(b(h))
  }
  this.tqq = function () {
    window.open(b(i))
  }
  this.renren = function () {
    window.open(b(j))
  }
  this.douban = function () {
    window.open(b(k))
  }
  this.facebook = function () {
    window.open(b(l))
  }
  this.twitter = function () {
    window.open(b(m))
  }
  this.linkedin = function () {
    window.open(b(n))
  }
  this.qq = function () {
    window.open(b(p))
  }
  this.weixin = function (a) {
    a ? a(b(o)) : window.open(b(o))
  }
}

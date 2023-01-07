//在线获取百度地图的方法ak代表百度地图的密钥
export function MP(ak) {
    return new Promise(function (resolve, reject) {
      window.init = function () {
        // eslint-disable-next-line no-undef
        resolve(BMap);
      };
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=init";
      script.onerror = reject;
      document.head.appendChild(script);
    });
}
  
( () => {
  "use strict";
  var e = {
      608: (e, t) => {
          Object.defineProperty(t, "__esModule", {
              value: !0
          }),
          t.default = function(e) {
              const t = "1.0.16." + (e.version || "0")
                , s = "E480 (Service Error) "
                , n = e.key
                , i = e.path
                , r = self.caches
                , o = origin + i
                , a = console.log
                , c = console.error
                , l = (e, t="#6743da") => {
                  a("%c" + e, "color:" + t)
              }
              ;
              a(`%c Base Service v${t} : ${n} `, "background:#6743da;color:#eeeeee;padding:5px;margin:10px");
              const d = e => ({
                  "content-type": e + ";charset=utf-8",
                  "cache-control": "no-cache"
              })
                , p = (e, t) => '<!doctype html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0" />' + e + "<style>html,body{background:#334488;color:#dddddd;margin:0}body{padding:2rem}main{padding-bottom:2rem;overflow:auto}pre{white-space:break-spaces}hr{opacity:.5;border-color:grey}button{min-width:4em;min-height:2em;margin:1px}noscript{color:#dddd00}</style></head>" + `<body>${t}</body></html>`
                , h = (e, t) => `E${e.status} (${e.statusText})\n${t.description || "Unknown cause."}\n\n${t.log || ""}\n`
                , u = (e={}) => {
                  const t = {
                      headers: d("text/html"),
                      status: e.status || 480,
                      statusText: e.statusText || "Service Error"
                  };
                  return new Response(p(`<title>${t.statusText}</title>`, `<main><pre>${h(t, e)}\n${e.body || ""}</pre></main><hr /><noscript><pre>E702: Please enable javascript to use this app.</pre></noscript><p><button onclick="event.preventDefault();window.history.go(-1);">Back</button></p>`),t)
              }
                , v = t => new Promise(( (s, o) => {
                  r.open(n).then((n => {
                      const r = [i + e.manifest];
                      ( (e, t) => {
                          for (const t in e)
                              if (s = e[t],
                              void r.push(i + s))
                                  break;
                          var s
                      }
                      )(t),
                      n.addAll(r).then(( () => {
                          l("Files added."),
                          s(!0)
                      }
                      )).catch((e => {
                          c(`E480 (Service Error) Fail to add ${r.length} files. ${e}`),
                          o(e)
                      }
                      ))
                  }
                  )).catch((e => {
                      c(`E480 (Service Error) Fail to open cache ${n}. ${e}`),
                      o(e)
                  }
                  ))
              }
              ))
                , m = () => new Promise(( (e, t) => {
                  r.delete(n).then(( () => {
                      l("Files removed."),
                      e(!0)
                  }
                  )).catch((e => {
                      c(`E480 (Service Error) Fail to remove files. ${e}`),
                      t(e)
                  }
                  ))
              }
              ))
                , f = "redirect"in Response ? e => Response.redirect(e) : e => {
                  const t = {
                      status: 202,
                      statusText: "Routing"
                  };
                  return new Response(p(`<meta http-equiv="Refresh" content="0;URL=${e}" /><title>${t.statusText}...</title>`, `<pre>${t.statusText}...</pre>`),t)
              }
                , $ = (e, t, s) => fetch(i + t).then((n => n && n instanceof Response ? 200 === n.status && /basic/.test(n.type) ? (e && e.put(i + t, n.clone()),
              n) : s(`Invalid live response ( ${n.type} : ${n.status} : ${n.statusText} )`) : s("Invalid live response"))).catch(s)
                , g = (e, t, s) => e.match(i + t).then((e => e && e instanceof Response ? 200 === e.status && /basic/.test(e.type) ? e : s(`Invalid cache response ( ${e.type} : ${e.status} : ${e.statusText} )`) : s("Invalid cache response"))).catch(s);
              return {
                  install: t => {
                      l("Starting service ..."),
                      t.waitUntil(v(e.mainFiles).then(t.target.skipWaiting))
                  }
                  ,
                  activate: () => {
                      l("Service started.")
                  }
                  ,
                  message: t => {
                      const s = t.data;
                      "updateFiles" === s ? v(e.mainFiles) : "removeFiles" === s && m()
                  }
                  ,
                  updateFiles: v,
                  removeFiles: m,
                  fetch: e => {
                      if (new RegExp(`^${o}`).test(e.request.url)) {
                          const t = e.request
                            , i = t.mode
                            , a = t.destination
                            , d = [i, a].join()
                            , p = t.url.slice(o.length)
                            , h = p.search(/[?#]/)
                            , v = h > 0 ? p.slice(0, h) : p
                            , m = p.slice(v.length)
                            , x = e => (c(s + e + ` : ${v}`),
                          $(void 0, v, (e => (c(s + (e += ` : ${v}`)),
                          u({
                              description: e
                          })))));
                          if ("navigate,document" === d)
                              return /\/index\.html?$/.test(v) ? void e.respondWith(f(o + v.slice(0, v.lastIndexOf("/") + 1) + m)) : /(\/|\.\w*)$/.test(v) ? void e.respondWith(r.open(n).then((e => g(e, v, (t => (c(s + t + ` : ${v}`),
                              $(e, v, (t => (c("E701 (Offline) : " + t + ` (live) : ${v}`),
                              g(e, "/offline/", (e => (c(s + (e += ` : ${v}`)),
                              u({
                                  description: e,
                                  log: "Please connect to the server and reinstall offline access."
                              })))))))))))).catch(x)) : void e.respondWith(f(o + v + "/" + m));
                          if (/style|script|image|manifest/.test(a))
                              return void e.respondWith(new Promise((e => {
                                  e(r.open(n).then((e => g(e, v, (t => (c(s + t + ` : ${v}`),
                                  $(e, v, (e => (c(s + (e += ` : ${v}`)),
                                  u({
                                      description: e
                                  }))))))))).catch(x))
                              }
                              )));
                          l(`! Request to ${t.method} ${a} : ${v} : may not work offline.`, "tomato")
                      }
                  }
                  ,
                  redirect: f,
                  errorDoc: u,
                  errorLog: h,
                  errorFile: (e={}) => {
                      const t = {
                          headers: e.headers || d("text/plain"),
                          status: e.status || 480,
                          statusText: e.statusText || "Service error"
                      };
                      return new Response(`/*\n${h(t, e)}*/\n${e.body || ""}`,t)
                  }
              }
          }
      }
      ,
      484: function(e, t, s) {
          var n = this && this.__importDefault || function(e) {
              return e && e.__esModule ? e : {
                  default: e
              }
          }
          ;
          Object.defineProperty(t, "__esModule", {
              value: !0
          });
          const i = n(s(608));
          ( () => {
              const e = (0,
              i.default)({
                  version: "1",
                  key: "base-r1",
                  path: "./",
                  manifest: "./manifest.json",
                  mainFiles: ["./favicon.ico", "./apple-touch-icon.png", "./icons/android-chrome-192x192.png", "./icons/android-chrome-512x512.png", "./js/base-v1.0.js", "./js/storage-v1.0.js", "./css/base-v1.0.css", "./", "./error/", "./offline/", "./settings/", "./storage/"],
                  progressiveFiles: []
              });
              self.addEventListener("install", e.install),
              self.addEventListener("activate", e.activate),
              self.addEventListener("fetch", e.fetch),
              self.addEventListener("message", (t => {
                  e.message(t)
              }
              ))
          }
          )()
      }
  }
    , t = {};
  !function s(n) {
      var i = t[n];
      if (void 0 !== i)
          return i.exports;
      var r = t[n] = {
          exports: {}
      };
      return e[n].call(r.exports, r, r.exports, s),
      r.exports
  }(484)
}
)();

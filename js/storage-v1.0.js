(()=>{"use strict";!function(){const e=window,t=e.base,s=t.newNode,o=t.nodeId,a=t.cantFind,n=t.appendNode,c=t.changeClass,l=t.addClass,i=t.removeClass,r=t.listenTo,d="fa-square",g={},f=void 0;function u(e){const t=e/1024;return Math.floor(t)?t.toFixed(2)+"kB":e+"B"}function h(e){const h=t[e],b=g[e]={},m=o(e)||a(e),w=s("div"),k=s("button",{class:"_bt -ico -warn"},[t.fa("trash"),"Delete"]);function _(){!function(e,t){const o=e.storage===localStorage?"local":e.storage===sessionStorage?"session":"",a=t.selected=t.selected||{},g=(e,t,s)=>{const o="fa-check-square",n="_bright-text _blue-bg";a[e]?(l(s,n),c(t,d,o)):(i(s,n),c(t,o,d))},h=s("table",{class:"_vm-s border-collapse",style:"width:100%"});t.pageNumber=1;let p=0;for(let c=0;c<e.storage.length;c++){const l=e.storage.key(c);if(l){const i=e.getString(l),b=l.length+i.length;if(p+=2*b,c<2e3*t.pageNumber){let e="";l.length>2&&".x"===l.slice(-2)&&(e+="orange-text");const t=s("i",{class:"far "+d}),c=s("tr",{class:"dr",tabIndex:0,"data-store":o},[s("td",f,s("i",{class:"_ico -fa"},t)),s("td",{class:e},l),s("td",f," = "),s("td",{class:"align-right"},u(2*b)),s("td",{class:"_grey-text _truncate",style:"width:100%"}," - "+(i.length>150?i.slice(0,150)+" ...":i))]);g(l,t,c),n(h,c),r(c,"click",(()=>{a[l]?delete a[l]:a[l]=1,g(l,t,c),v(o)}))}}}t.size=p,t.page=s("div",f,s("div",{class:"_vm-s _hm"},`Total size = ${u(p)}`)),p&&(n(t.page,s("hr",{class:"_hr -thin"})),n(t.page,h))}(h,b),m.innerHTML="",t.appendNode(m,b.page),b.size?t.show(w):t.hide(w)}k.disabled=!0,r(k,"click",(()=>{p(e)})),t.appendNode(w,k),t.afterNode(m,w),b.remove=k,_(),h.onChange(_)}function p(e){const s=()=>alert("Please select data.");if(e){const a=g[e];if(!a||!a.selected)return void s();{const n=[];let c=0;t.each(a.selected,((e,t)=>{c++,n.push(t)}));let l=n.join(", ");if(l.length>100&&(l=l.slice(0,100)+" ..."),!c)return void s();if(confirm(`Remove ${c} data from ${e} storage?\n[ ${l} ]`)){t.each(n,(s=>{t[e].remove(s),delete a.selected[s]}));const s=o(e);s?t.refocus(s):t.refocus(document.body)}}}else s()}function v(e){if(e){const s=g[e];if(s&&s.selected){let e=0;t.each(s.selected,(()=>{e++})),s.remove.disabled=!e}}}(o("host")||a("host")).innerHTML=e.location.host,t.local?h("local"):console.warn("Local storage is not available"),t.session?h("session"):console.warn("Session storage is not available"),r(e,"keydown",t.keypress((e=>{const t=document.activeElement;if(t&&"tr"===t.tagName.toLowerCase()){const s=t.nextSibling,o=t.previousSibling,a=()=>{e.defaultPrevented||e.preventDefault()};"ArrowUp"==e.code&&o?(a(),o.focus()):"ArrowDown"==e.code&&s&&(a(),s.focus())}}))),r(e,"keyup",t.keypress((e=>{const t=document.activeElement;if(t&&"tr"===t.tagName.toLowerCase()){const s=t.getAttribute("data-store");"Enter"==e.code?t.click():"Delete"==e.code&&p(s)}})))}()})();
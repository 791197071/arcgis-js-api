// COPYRIGHT © 2019 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.14/esri/copyright.txt for details.

define(["require","exports","../../widgets/support/widgetUtils"],function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0});var o="http://www.w3.org/2000/svg",i=[];t.extend=function(e,t){var r={};return Object.keys(e).forEach(function(t){r[t]=e[t]}),t&&Object.keys(t).forEach(function(e){r[e]=t[e]}),r};var n=function(e,t){return e.vnodeSelector===t.vnodeSelector&&(e.properties&&t.properties?e.properties.key===t.properties.key&&e.properties.bind===t.properties.bind:!e.properties&&!t.properties)},s=function(e){if("string"!=typeof e)throw new Error("Style values must be strings")},p=function(e,t,r){if(""!==t.vnodeSelector)for(var o=r;o<e.length;o++)if(n(e[o],t))return o;return-1},a=function(e,t,r,o){var i=e[t];if(""!==i.vnodeSelector){var s=i.properties;if(!(s?void 0===s.key?s.bind:s.key:void 0))for(var p=0;p<e.length;p++)if(p!==t){var a=e[p];if(n(a,i))throw new Error(r.vnodeSelector+" had a "+i.vnodeSelector+" child "+("added"===o?o:"removed")+", but there is now more than one. You must add unique key properties to make them distinguishable.")}}},d=function(e){if(e.properties){var t=e.properties.enterAnimation;t&&t(e.domNode,e.properties)}},l=[],c=!1,f=function(e){(e.children||[]).forEach(f),e.properties&&e.properties.afterRemoved&&e.properties.afterRemoved.apply(e.properties.bind||e.properties,[e.domNode])},v=function(){c=!1,l.forEach(f),l.length=0},u=function(e){l.push(e),c||(c=!0,"undefined"!=typeof window&&"requestIdleCallback"in window?window.requestIdleCallback(v,{timeout:16}):setTimeout(v,16))},h=function(e){var t=e.domNode;if(e.properties){var r=e.properties.exitAnimation;if(r){t.style.pointerEvents="none";return void r(t,function(){t.parentNode&&(t.parentNode.removeChild(t),u(e))},e.properties)}}t.parentNode&&(t.parentNode.removeChild(t),u(e))},m=function(e,t,i){if(t)for(var n=i.eventHandlerInterceptor,p=Object.keys(t),a=p.length,d=0;d<a;d++)!function(a){var d=p[a],l=t[d];if("className"===d)throw new Error('Property "className" is not supported, use "class".');if("class"===d)w(e,l,!0);else if("classes"===d)for(var c=Object.keys(l),f=c.length,v=0;v<f;v++){var u=c[v];l[u]&&e.classList.add(u)}else if("styles"===d)for(var h=Object.keys(l),m=h.length,v=0;v<m;v++){var y=h[v],g=l[y];g&&(s(g),i.styleApplyer(e,y,g))}else if("key"!==d&&null!==l&&void 0!==l){var b=typeof l;"function"===b?0===d.lastIndexOf("on",0)&&(n&&(l=n(d,l,e,t)),"oninput"===d&&function(){var e=l;l=function(t){e.apply(this,[t]),t.target["oninput-value"]=t.target.value}}(),e[d]=l):i.namespace===o?"href"===d?e.setAttributeNS("http://www.w3.org/1999/xlink",d,l):e.setAttribute(d,l):"string"===b&&"value"!==d?"innerHTML"===d?e[d]=r.sanitizer.sanitize(l):e.setAttribute(d,l):e[d]=l}}(d)},y=function(e,r,o){if(r)for(var i=0,n=r;i<n.length;i++){var s=n[i];t.createDom(s,e,void 0,o)}};t.initPropertiesAndChildren=function(e,t,r){y(e,t.children,r),t.text&&(e.textContent=t.text),m(e,t.properties,r),t.properties&&t.properties.afterCreate&&t.properties.afterCreate.apply(t.properties.bind||t.properties,[e,r,t.vnodeSelector,t.properties,t.children])},t.createDom=function(e,r,i,n){var s,p=0,a=e.vnodeSelector,d=r.ownerDocument;if(""===a)s=e.domNode=d.createTextNode(e.text),void 0!==i?r.insertBefore(s,i):r.appendChild(s);else{for(var l=0;l<=a.length;++l){var c=a.charAt(l);if(l===a.length||"."===c||"#"===c){var f=a.charAt(p-1),v=a.slice(p,l);"."===f?s.classList.add(v):"#"===f?s.id=v:("svg"===v&&(n=t.extend(n,{namespace:o})),void 0!==n.namespace?s=e.domNode=d.createElementNS(n.namespace,v):(s=e.domNode=e.domNode||d.createElement(v),"input"===v&&e.properties&&void 0!==e.properties.type&&s.setAttribute("type",e.properties.type)),void 0!==i?r.insertBefore(s,i):s.parentNode!==r&&r.appendChild(s)),p=l+1}}t.initPropertiesAndChildren(s,e,n)}};var g,w=function(e,t,r){t&&t.split(" ").forEach(function(t){t&&e.classList.toggle(t,r)})},b=function(e,t,i,n){if(i){for(var p=!1,a=Object.keys(i),d=a.length,l=0;l<d;l++){var c=a[l],f=i[c],v=t[c];if("class"===c)v!==f&&(w(e,v,!1),w(e,f,!0));else if("classes"===c)for(var u=e.classList,h=Object.keys(f),m=h.length,y=0;y<m;y++){var g=h[y],b=!!f[g],N=!!v[g];b!==N&&(p=!0,b?u.add(g):u.remove(g))}else if("styles"===c)for(var x=Object.keys(f),k=x.length,y=0;y<k;y++){var A=x[y],S=f[A],C=v[A];S!==C&&(p=!0,S?(s(S),n.styleApplyer(e,A,S)):n.styleApplyer(e,A,""))}else if(f||"string"!=typeof v||(f=""),"value"===c){var E=e[c];E!==f&&(e["oninput-value"]?E===e["oninput-value"]:f!==v)&&(e[c]=f,e["oninput-value"]=void 0),f!==v&&(p=!0)}else if(f!==v){var O=typeof f;"function"===O&&n.eventHandlerInterceptor||(n.namespace===o?"href"===c?e.setAttributeNS("http://www.w3.org/1999/xlink",c,f):e.setAttribute(c,f):"string"===O?"innerHTML"===c?e[c]=r.sanitizer.sanitize(f):"role"===c&&""===f?e.removeAttribute(c):e.setAttribute(c,f):e[c]!==f&&(e[c]=f),p=!0)}}return p}},N=function(e,r,o,s,l){if(o===s)return!1;o=o||i,s=s||i;for(var c,f=o.length,v=s.length,u=0,m=0,y=!1;m<v;){var w=u<f?o[u]:void 0,b=s[m];if(void 0!==w&&n(w,b))y=g(w,b,l)||y,u++;else{var N=p(o,b,u+1);if(N>=0){for(c=u;c<N;c++)h(o[c]),a(o,c,e,"removed");y=g(o[N],b,l)||y,u=N+1}else t.createDom(b,r,u<f?o[u].domNode:void 0,l),d(b),a(s,m,e,"added")}m++}if(f>u)for(c=u;c<f;c++)h(o[c]),a(o,c,e,"removed");return y};g=function(e,r,i){var n=e.domNode,s=!1;if(e===r)return!1;var p=!1;if(""===r.vnodeSelector){if(r.text!==e.text){var a=n.ownerDocument.createTextNode(r.text);return n.parentNode.replaceChild(a,n),r.domNode=a,s=!0}r.domNode=n}else 0===r.vnodeSelector.lastIndexOf("svg",0)&&(i=t.extend(i,{namespace:o})),e.text!==r.text&&(p=!0,void 0===r.text?n.removeChild(n.firstChild):n.textContent=r.text),r.domNode=n,p=N(r,n,e.children,r.children,i)||p,p=b(n,e.properties,r.properties,i)||p,r.properties&&r.properties.afterUpdate&&r.properties.afterUpdate.apply(r.properties.bind||r.properties,[n,i,r.vnodeSelector,r.properties,r.children]);return p&&r.properties&&r.properties.updateAnimation&&r.properties.updateAnimation(n,r.properties,e.properties),s},t.createProjection=function(e,t){return{getLastRender:function(){return e},update:function(r){if(e.vnodeSelector!==r.vnodeSelector)throw new Error("The selector for the root VNode may not be changed. (consider using dom.merge and add one extra level to the virtual DOM)");var o=e;e=r,g(o,r,t)},domNode:e.domNode}}});
// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.31/esri/copyright.txt for details.

define(["esri/dijit/geoenrichment/Deferred","dojo/fx/easing","dojox/gfx/matrix"],function(n,r,t){function e(n){n.progress<1&&!n.isStopped?a.setTimeout(function(){if(n.isStopped)return void n.endFunction();var r=o();n.progress=1-(n.endTime-r)/n.duration,n.progress=Math.min(1,n.progress),s(n),e(n)}):n.endFunction()}function o(){return(new Date).getTime()}function s(n){for(var t in n.params.properties){var e=n.params.properties[t],o=e.easing?"function"==typeof e.easing?e.easing:r[e.easing]:null,s=o?o(n.progress):n.progress,i=e.start+s*(e.end-e.start);n.obj[t]=e.addPx?i+"px":i,n.progressFunction&&n.progressFunction(t,i,s)}}var i={},a={_funcs:null,setTimeout:function(n){var r=this;if(this._funcs)return void this._funcs.push(n);this._funcs=[n],setTimeout(function(){var n=r._funcs;r._funcs=null,n.forEach(function(n){n()})},33)}};return i.animateProperty=function(r){var t={},i=new n;return t.promise=i.promise,t.params=r,t.obj=r.obj||r.node||{},t.duration=void 0!==r.duration?r.duration:1e3,t.startTime=o(),t.endTime=t.startTime+t.duration,t.progress=0,t.endFunction=function(){r.endFunction&&r.endFunction(),i.resolve()},t.progressFunction=r.progressFunction,t.stop=function(){t.isStopped=!0},s(t),e(t),t},i.animateTransform=function(n){var r=n.shape;return r.setTransform(null),i.animateProperty({duration:n.duration,properties:{p:{start:0,end:1,easing:n.easing}},progressFunction:function(e,o,s){var i,a,u,p;n.transform.forEach(function(n){var r=n.start[0]+(n.end[0]-n.start[0])*s,t=n.start[1]+(n.end[1]-n.start[1])*s;"translate"===n.name?(i=r,a=t):"scale"===n.name&&(u=r,p=t)}),r.setTransform(new t.Matrix2D({dx:i,dy:a,xx:u,yy:p}))},endFunction:function(){r.setTransform(null),n.onEnd&&n.onEnd()}}).promise},i});
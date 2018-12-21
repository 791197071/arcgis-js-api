// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.10/esri/copyright.txt for details.

define(["require","exports","dojo/errors/CancelError","../../../../core/lang","../../../../core/promiseUtils","../../../../core/urlUtils","./I3SBinaryReader","./I3SUtil","../../webgl-engine/lib/Util"],function(e,t,r,a,n,i,o,u,l){var s=function(){function e(t,r,a,o,u){this.loader=t,this.logger=r,this.defaultGeometrySchema=a,this.requiredAttributes=o,this.options=u,this.cancelled=!1,this.loadShared=function(t){if(null==t.sharedResource)return n.resolve({});var r=i.makeAbsolute(t.sharedResource.href,t.baseUrl);return this.load(r,"json").then(function(t){return e.fixTextureEncodings(t),e.addAbsoluteHrefTexture(t,r),t})}}return e.prototype.cancelAll=function(){this.cancelled=!0},e.prototype.load=function(e,t){var r=this;return n.create(function(a,n){r.loader.request(e,t).then(function(e,t){a(t)},function(t){n(new Error("Failed to load: "+e))})})},e.prototype.loadAttribute=function(e,t,r){var a=i.makeAbsolute(r,e);return this.load(a,"binary").then(function(e){return o.readBinaryAttribute(t,e)})},e.prototype.loadAttributes=function(e,t,r){var a=this,i=r.map(function(r){return null==e.attributeData||null==e.attributeData[r.index]?(a.logger.error("Missing attributeData for '"+r.name+"' on node '"+e.id+"'"),n.resolve(null)):a.loadAttribute(t,r.attributeStorageInfo,e.attributeData[r.index].href).catch(function(t){return a.logger.error("Failed to load attributeData for '"+r.name+"' on node '"+e.id+"'"),null})});return n.all(i).then(function(e){for(var t={},a=0;a<r.length;++a)e[a]&&(t[r[a].name]=e[a]);return t})},e.prototype.prepareBinaryGeometryData=function(e,t,r,n){var i=e.geometries[0];if(a.mixin(i.params,r),n||null!=r.vertexAttributes.region||delete r.vertexAttributes.region,null!=r.featureAttributes){var l=r.featureAttributes;if(l.faceRange){var s=o.createTypedView(t,l.faceRange),d=l.faceRange.valuesPerElement,f=r.header.fields.featureCount;e.componentOffsets=u.convertFlatRangesToOffsets(s,f,d)}if(l.id){e.featureIds=[];var c=1,h=o.valueType2TypedArrayClassMap[l.id.valueType];"UInt64"===l.id.valueType&&(h=Uint32Array,c=2);for(var m=new h(t,l.id.byteOffset,l.id.count*l.id.valuesPerElement*c),g=0;g<r.header.fields.featureCount;g++)if(e.featureIds[g]=m[g*l.id.valuesPerElement*c],2===c){var p=m[g*l.id.valuesPerElement*c+1];if(p>=2097150)throw new Error("ID exceeded maximum range supported by javascript (max = 53bit-1 = 9007199254740991)");e.featureIds[g]+=4294967296*p}}}},e.prototype.loadBundleData=function(e,t){var r=this,a=e.baseUrl,u=null,l=this.loadShared(e),s=null;null!=this.requiredAttributes&&(s=this.loadAttributes(e,a,this.requiredAttributes));var d=null;if(null!=e.geometryData){var f=e.geometryData[t],c=i.makeAbsolute(f.href,a);d=this.load(c,"binary")}return l.then(function(a){return r.handleCancelled(),(r.options.loadFeatureData?r.loadFeatureData(e,t):n.resolve(null)).then(function(t){r.handleCancelled();var i,l=r.options.loadFeatureData?r.collectGeometries(e,t,a):r.meshPyramidGeometryData(e,a);i=null!=d?d.then(function(e){u=e;var t=Object.keys(a.materialDefinitions)[0],n=a.materialDefinitions[t].params.vertexRegions,i=o.createGeometryDataIndex(e,r.defaultGeometrySchema,n);return r.prepareBinaryGeometryData(l[0],e,i,n),l}):n.resolve(l);var f=r.loadTextures(l,a);return n.all([f,i,s])}).then(function(e){var t=e[0],n=e[1],i=e[2];r.handleCancelled();var o=null;return i&&(o={attributeData:i,loadedAttributes:r.requiredAttributes}),{allGeometryData:n,attributeDataInfo:o,geometryBuffer:u,sharedResource:a,textureData:t}})})},e.addAbsoluteHrefTexture=function(e,t){var r=e.textureDefinitions;if(null!=r)for(var a=0,n=Object.keys(r);a<n.length;a++)for(var o=n[a],u=0,l=r[o].images;u<l.length;u++){var s=l[u];Array.isArray(s.href)?s.hrefConcat=s.href.map(function(e){return i.makeAbsolute(e,t)}):s.hrefConcat=i.makeAbsolute(s.href,t)}},e.fixTextureEncodings=function(e){var t=e.textureDefinitions;if(null!=t)for(var r in t){var a=t[r];if(Array.isArray(a.encoding))for(var n=0;n<a.encoding.length;n++){var i=a.encoding[n];"data:"===i.substring(0,5)&&(a.encoding[n]=i.substring(5))}else{var i=a.encoding;"data:"===i.substring(0,5)&&(a.encoding=i.substring(5))}}},e.prototype.loadTexture=function(e,t,r,a){var n=this;return a===u.DDS_ENCODING_STRING?this.load(e,"binary").then(function(e){return n.handleCancelled(),{i3sTexId:t,data:e,encoding:a}}):this.load(e,"image").then(function(e){var i=e;n.handleCancelled();if(r&&e.width*e.height>=4096){var o=Math.ceil(e.width/2),u=Math.ceil(e.height/2),l=document.createElement("canvas");l.width=o,l.height=u;l.getContext("2d").drawImage(e,0,0,o,u),i=l}return{i3sTexId:t,data:i,encoding:a}})},e.prototype.loadTextures=function(t,r){for(var a=[],i=0;i<t.length;i++){var o=t[i].geometries;if(null!=o)for(var s=0,d=o;s<d.length;s++){var f=d[s],c=f.params.textureID||"none";if("none"!==c){null!=r.textureDefinitions&&null!=r.textureDefinitions[c]||this.logger.warn("textureDefinitions missing in shared resource. i3sTexId: "+c);var h=r.textureDefinitions[c];if(l.assert(void 0!==h,"geometry wants unknown texture "+c),0===h.images.length)continue;var m=h.images.length-1,g=h.images[m],p=this.options.textureFormat===e.TextureFormat.Compressed,v=this.options.textureFormat===e.TextureFormat.Downsampled,y=u.getAppropriateTextureEncoding(h.encoding,p),b=y>-1?h.encoding[y]:h.encoding,D=y>-1?g.hrefConcat[y]:g.hrefConcat;this.options.loadTextureData?a.push(this.loadTexture(D,c,v,b)):a.push({i3sTexId:c,encoding:b,data:null})}}}return n.all(a)},e.prototype.meshPyramidGeometryData=function(e,t){return[{featureIds:[],geometries:[{type:"ArrayBufferView",params:{materialID:t.materialDefinitions?Object.keys(t.materialDefinitions)[0]:null,textureID:t.textureDefinitions?Object.keys(t.textureDefinitions)[0]:null}}],featureDataPosition:[0,0,0]}]},e.prototype.collectGeometries=function(e,t,r){for(var a=[],n=0,i=t.featureData;n<i.length;n++){var o=i[n],u=o.geometries;if(null!=u)for(var l=0;l<u.length;l++){var s=o.geometries[l];a.push({featureIds:[o.id],featureDataPosition:o.position,geometries:[s]})}else null!=o.position&&a.push({featureIds:[o.id],featureDataPosition:o.position,geometries:null})}return a},e.prototype.loadFeatureData=function(e,t){var r=i.makeAbsolute(e.featureData[t].href,e.baseUrl);return this.load(r,"json")},e.prototype.handleCancelled=function(){if(this.cancelled)throw new r},e}();return function(e){!function(e){e[e.Compressed=0]="Compressed",e[e.Normal=1]="Normal",e[e.Downsampled=2]="Downsampled"}(e.TextureFormat||(e.TextureFormat={}))}(s||(s={})),s});
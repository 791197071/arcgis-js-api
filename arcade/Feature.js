// COPYRIGHT © 2016 Esri
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
// See http://js.arcgis.com/3.18/esri/copyright.txt for details.

define(["require","exports","../geometry/Geometry","../graphic","../geometry/jsonUtils","./Dictionary","./languageUtils","./ImmutableArray","../geometry/Point"],function(t,i,e,r,s,n,o,a,u){var l=function(){function t(i,o,a){if(this.geometry=null,this.attributes=null,this._layer=null,this.immutable=!0,i instanceof t)this.attributes=i.attributes,this.geometry=i.geometry,i._layer&&(this._layer=i._layer);else if(i instanceof r)this.geometry=i.geometry,void 0===i.attributes?this.attributes={}:null===i.attributes?this.attributes={}:this.attributes=i.attributes,i._layer&&(this._layer=i._layer);else if(i instanceof n)this.attributes=i.field("attributes"),null!==this.attributes&&(this.attributes instanceof n?this.attributes=this.attributes.attributes:this.attributes=null),this.geometry=i.field("geometry"),null!==this.geometry&&(this.geometry instanceof n?this.geometry=t.parseGeometryFromDictionary(this.geometry):this.geometry instanceof e||(this.geometry=null));else if(o instanceof e||null===o)this.geometry=o,void 0===i?this.attributes={}:null===i?this.attributes={}:this.attributes=i,void 0!==a&&(this._layer=a);else if("string"==typeof i){var u=JSON.parse(i);null!==u.geometry&&void 0!==u.geometry&&(this.geometry=s.fromJson(u.geometry)),void 0===u.attributes?this.attributes={}:null===u.attributes?this.attributes={}:this.attributes=u.attributes,void 0!==a&&(this._layer=a)}else void 0===i?this.attributes={}:null===i&&(this.attributes={}),this.geometry=null,void 0!==a&&(this._layer=a)}return t.prototype.castToText=function(){var t="";for(var i in this.attributes){""!==t&&(t+=",");var r=this.attributes[i];null==r?r="null":o.isBoolean(r)||o.isNumber(r)||o.isString(r)?t+=JSON.stringify(i)+":"+JSON.stringify(r):r instanceof e?t+=JSON.stringify(i)+":"+o.toStringExplicit(r):r instanceof a?t+=JSON.stringify(i)+":"+o.toStringExplicit(r):r instanceof Array?t+=JSON.stringify(i)+":"+o.toStringExplicit(r):r instanceof Date?t+=JSON.stringify(i)+":"+JSON.stringify(r):null!==r&&"object"==typeof r&&void 0!==r.castToText&&(t+=JSON.stringify(i)+":"+r.castToText())}return'{"geometry":'+(null===this.geometry?"null":o.toStringExplicit(this.geometry))+',"attributes":'+t+"}"},t.prototype._fixDateFields=function(t){for(var i=0;i<t.length;i++){var e=this.attributes[t[i]];if(null===e);else if(void 0===e){for(var r in this.attributes)if(r.toLowerCase()===t[i]){e=this.attributes[r],null!==e&&(e instanceof Date||(this.attributes[r]=new Date(e)));break}}else e instanceof Date||(this.attributes[t[i]]=new Date(e))}},t.prototype.field=function(t){var i=t.toLowerCase(),e=this.attributes[t];if(void 0!==e)return e;for(var r in this.attributes)if(r.toLowerCase()===i)return this.attributes[r];throw new Error("Field not Found")},t.prototype._field=function(t){var i=t.toLowerCase(),e=this.attributes[t];if(void 0!==e)return e;for(var r in this.attributes)if(r.toLowerCase()===i)return this.attributes[r];return null},t.prototype.setField=function(t,i){if(this.immutable)throw new Error("Feature is Immutable");if(o.isSimpleType(i)===!1)throw new Error("Illegal Value Assignment to Feature");var e=t.toLowerCase(),r=this.attributes[t];if(void 0!==r)return void(this.attributes[t]=i);for(var s in this.attributes)if(s.toLowerCase()===e)return void(this.attributes[s]=i);this.attributes[t]=i},t.prototype.hasField=function(t){var i=t.toLowerCase(),e=this.attributes[t];if(void 0!==e)return!0;for(var r in this.attributes)if(r.toLowerCase()===i)return!0;return!1},t.prototype.keys=function(){var t=[];for(var i in this.attributes)t.push(i);return t=t.sort()},t.fromFeature=function(i){return new t(i)},t.parseGeometryFromDictionary=function(i){var e=t.convertDictionaryToJson(i,!0);return void 0!==e.spatialreference&&(e.spatialReference=e.spatialreference,delete e.spatialreference),void 0!==e.rings&&(e.rings=this.fixPathArrays(e.rings,e.hasZ===!0,e.hasM===!0)),void 0!==e.paths&&(e.paths=this.fixPathArrays(e.paths,e.hasZ===!0,e.hasM===!0)),void 0!==e.points&&(e.points=this.fixPointArrays(e.points,e.hasZ===!0,e.hasM===!0)),s.fromJson(e)},t.fixPathArrays=function(t,i,e){var r=[];if(t instanceof Array)for(var s=0;s<t.length;s++)r.push(this.fixPointArrays(t[s],i,e));else if(t instanceof a)for(var s=0;s<t.length();s++)r.push(this.fixPointArrays(t.get(s),i,e));return r},t.fixPointArrays=function(t,i,e){var r=[];if(t instanceof Array)for(var s=0;s<t.length;s++){var n=t[s];n instanceof u?i&&e?r.push([n.x,n.y,n.z,n.m]):i?r.push([n.x,n.y,n.z]):e?r.push([n.x,n.y,n.m]):r.push([n.x,n.y]):r.push(n)}else if(t instanceof a)for(var s=0;s<t.length();s++){var n=t.get(s);n instanceof u?i&&e?r.push([n.x,n.y,n.z,n.m]):i?r.push([n.x,n.y,n.z]):e?r.push([n.x,n.y,n.m]):r.push([n.x,n.y]):r.push(n)}return r},t.convertDictionaryToJson=function(i,e){void 0===e&&(e=!1);var r={};for(var s in i.attributes){var o=i.attributes[s];o instanceof n&&(o=t.convertDictionaryToJson(o)),e?r[s.toLowerCase()]=o:r[s]=o}return r},t.parseAttributesFromDictionary=function(t){var i={};for(var e in t.attributes){var r=t.attributes[e];if(!o.isSimpleType(r))throw new Error("Illegal Argument");i[e]=r}return i},t.fromJson=function(i){var e=null;null!==i.geometry&&void 0!==i.geometry&&(e=s.fromJson(i.geometry));var r={};if(null!==i.attributes&&void 0!==i.attributes)for(var n in i.attributes){var a=i.attributes[n];if(!(o.isString(a)||o.isNumber(a)||o.isBoolean(a)||o.isDate(a)))throw new Error("Illegal Argument");r[n]=a}return new t(r,e)},t.prototype.domainValueLookup=function(t,i,e){if(null===this._layer)return null;if(!this._layer.fields)return null;var r=o.getDomain(t,this._layer,this,e);if(void 0===i)try{i=this.field(t)}catch(s){return null}return o.getDomainValue(r,i)},t.prototype.domainCodeLookup=function(t,i,e){if(null===this._layer)return null;if(!this._layer.fields)return null;var r=o.getDomain(t,this._layer,this,e);return o.getDomainCode(r,i)},t}();return l});
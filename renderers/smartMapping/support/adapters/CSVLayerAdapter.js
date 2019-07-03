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
// See http://js.arcgis.com/4.12/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/Error","../../../../core/promiseUtils","../../../../core/accessorSupport/decorators","../../statistics/support/utils","../utils","./FeatureLayerAdapter","./support/utils","../../../../tasks/support/generateRendererUtils"],function(e,r,t,a,i,n,s,l,o,u,c,d){function p(e){return"esri.tasks.support.ClassBreaksDefinition"===e.declaredClass}function f(e){return"esri.tasks.support.UniqueValueDefinition"===e.declaredClass}return function(e){function r(r){return e.call(this,r)||this}return t(r,e),r.prototype.generateRenderer=function(e){var r=e.classificationDefinition,t=null,a=null,s=null;p(r)?(t=r.classificationField,a=r.normalizationField,s=r.normalizationType):f(r)&&(t=r.attributeField);var u=this.layer,y=o.getFieldsList({field:t,normalizationField:a}),m=u.createQuery();return m.returnGeometry=!1,m.outFields=y,m.where=l.mergeWhereClauses(m.where,e.where),this.layer.queryFeatures(m).then(function(e){var l=e&&e.features;if(!l||!l.length)return n.reject(new i("csv-layer-adapter:insufficient-data","No features are available to calculate statistics"));var o=null;if("percent-of-total"===s&&null==(o=c.calculateStatsFromMemory({field:t},l).sum))return n.reject(new i("csv-layer-adapter:invalid","invalid normalizationTotal"));if(p(r)){var u=c.getDataValues({field:t,normalizationType:s,normalizationField:a,normalizationTotal:o},l).filter(function(e){return null!=e&&c.isValidNumber(e)});return d.createGenerateRendererClassBreaks({definition:r,values:u,normalizationTotal:o})}if(f(r)){var u=c.getDataValues({field:t},l).filter(function(e){return null!=e&&"string"==typeof e&&""!==e.trim()});return d.createGenerateRendererUniqueValues(u)}})},r.prototype.load=function(e){var r=this,t=this.layer.load(e).then(function(e){r.geometryType=e.geometryType,r.objectIdField=e.objectIdField,r.supportsSQLExpression=!0,r._hasLocalSource=!1,r.hasQueryEngine=!0});return this.addResolvingPromise(t),this.when()},r=a([s.subclass("esri.renderers.smartMapping.support.adapters.CSVLayerAdapter")],r)}(s.declared(u))});
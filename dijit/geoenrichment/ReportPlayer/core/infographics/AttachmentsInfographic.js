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
// See http://js.arcgis.com/3.28/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","esri/dijit/geoenrichment/Deferred","require","dojo/dom-style","dijit/_WidgetBase","dijit/_TemplatedMixin","esri/dijit/geoenrichment/_Invoke","esri/dijit/geoenrichment/ImageNavigator"],function(t,e,i,n,o,a,s,r,h){function g(){return d||(d={_loadLogo:function(){var t=new i;return n(["../supportClasses/images/DefaultAttachment"],function(e){t.resolve(e)}),t.promise},getAttachments:function(){var t=this;return[{description:"Esri headquarters in Redlands CA, summer time",getThumbnail:function(){return t._loadLogo()}},{description:"Sample image",getThumbnail:function(){return t._loadLogo()}},{description:"Sample image",getThumbnail:function(){return t._loadLogo()}}]}})}var d;return t([a,s,r],{templateString:"<div data-dojo-attach-point='viewDiv'></div>",viewModel:null,theme:null,currentFeatureIndex:null,imageNavigator:null,_currentInfographicJson:null,postCreate:function(){this.inherited(arguments),this.imageNavigator=new h({showNotes:!0,showThumbnails:!1,canEditNotes:!1,canRemoveNotes:!1}).placeAt(this.viewDiv),this.own(this.imageNavigator)},updateInfographic:function(t){var e=this;this.domNode&&(this._currentInfographicJson=t,t.style.backgroundColor&&o.set(this.viewDiv,"backgroundColor",t.style.backgroundColor),this._resizeContent(),["showNotes","showThumbnails"].forEach(function(i){void 0!==t[i]&&(e.imageNavigator[i]=t[i])}),this.invoke("_doUpdateContent",50))},_doUpdateContent:function(){var t=this;if(this.domNode){var e=this.viewModel.dynamicReportInfo?this.viewModel.dynamicReportInfo.attachmentsStore:g();e&&e.setCurrentAnalysisAreaIndex&&e.setCurrentAnalysisAreaIndex(this.currentFeatureIndex),this.imageNavigator.update(e,{useCircularMask:this._currentInfographicJson.useCircularMask,alwaysShowCaptions:this._currentInfographicJson.alwaysShowCaptions,scaleToCover:this._currentInfographicJson.scaleToCover,onContentLoadingStart:function(){t.onContentLoadingStart()},onContentLoadingEnd:function(){t.onContentLoadingEnd()}})}},_resizeContent:function(){this.domNode&&this.width&&(this._currentInfographicJson.style.width=this.width,this._currentInfographicJson.style.height=this.height,o.set(this.viewDiv,{width:this.width+"px",height:this.height+"px"}),this.imageNavigator.setHeight(this.height))},width:null,height:null,resize:function(t,e){void 0!==t&&(this.width=t,this.height=e),this.invoke("_resizeContent",50)},hasScroll:function(){return this.imageNavigator.isAllImagesShown()},changeScroll:function(t,e){this.imageNavigator.allImagesList.domNode.scrollLeft+=t,this.imageNavigator.allImagesList.domNode.scrollTop+=e},notifyShown:function(){this.resize()},notifyPanelScaleChanged:function(t){if(t){var e=1/t;this.imageNavigator.showAllImagesButton.style.transformOrigin="100% 0%",this.imageNavigator.showAllImagesButton.style.transform="scale("+e+")",this.imageNavigator.showAllImagesButton.style["webkit-transform"]="scale("+e+")"}},toJson:function(){return e.clone(this._currentInfographicJson)},getVisualState:function(){return{imageIndex:this.imageNavigator.getImageIndex()}},setVisualState:function(t){t&&void 0!==t.imageIndex&&this.imageNavigator.setImageIndex(t.imageIndex)},onContentLoadingStart:function(){},onContentLoadingEnd:function(){}})});
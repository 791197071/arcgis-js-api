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
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/on","dojo/sniff","dojo/dom-construct","dojo/dom-class","dojo/dom-geometry","dijit/Destroyable","./valueFieldUtils/ValueFieldTooltipBuilder","./valueFieldUtils/ValueFieldTextTrimmer","esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/utils/UrlUtil","esri/dijit/geoenrichment/ReportPlayer/core/themes/ReportThemes"],function(t,e,i,n,o,l,s,h,r,d,a,u,c){function g(t){t.domNode=o.toDom(y),t.contentBlock=t.domNode.children[0],t.valueContainer=t.contentBlock.children[0],t.valueLabel=t.valueContainer.children[0]}var f=t(h,{_buildLayoutFunc:null,_parentNode:null,constructor:function(t,i){e.mixin(this,t),this._parentNode=i,this.postCreate()},postCreate:function(){this._buildLayoutFunc(this),this.class&&l.add(this.domNode,this.class),this._parentNode&&this.placeAt(this._parentNode),this.value&&this.set("value",this.value)},get:function(t){return"value"===t?this._getValueAttr?this._getValueAttr():this.value:this[t]},set:function(t,e){"value"===t?this._setValueAttr?this._setValueAttr(e):this.value=e:this[t]=e},placeAt:function(t){return o.place(this.domNode,t),this},on:function(t,e){this.own(i(this.domNode,t,e))},isLeftToRight:function(){return s.isBodyLtr(document)},destroy:function(){o.destroy(this.domNode),this.domNode=null}}),y="<div class='esriGEAdjustableGridValueField esriGENonSelectable'><div class='valueField_contentBlock' data-dojo-attach-point='contentBlock'><div data-dojo-attach-point='valueContainer' class='valueField_valueBlock'><div data-dojo-attach-point='valueLabel' class='valueField_valueLabel'></div></div></div></div>",v={width:1,height:1,angle:1},_={color:1,fontSize:1,fontFamily:1,fontWeight:1,fontStyle:1,textDecoration:1,backgroundColor:1,verticalAlign:1,horizontalAlign:1,horizontalPadding:1,overrideStyle:1},m=e.mixin({},v,_),C={verticalAlign:"top",horizontalAlign:"left",horizontalPadding:0,angle:0},p=t(f,{viewModel:null,fieldCellClass:null,trimTextIfOverflows:!1,valueLabel:null,borderStyle:null,fieldStyle:null,content:null,postCreate:function(){this._buildLayoutFunc=this._buildLayoutFunc||g,this.inherited(arguments),this.setBorderStyle(this.borderStyle,!0),this.setStyle(this.fieldStyle),this.setContent(this.content),this.fieldCellClass&&(l.add(this.domNode,this.fieldCellClass),l.add(this.contentBlock,"contentBlock_"+this.fieldCellClass))},_destroyExistingContent:function(){this.content&&(this.content.destroy&&this.content.destroy(),this.contentContainer&&o.empty(this.contentContainer))},getContentContainerNode:function(t){return t||this._destroyExistingContent(),this.contentContainer||(this.contentContainer=o.create("div",{class:"valueField_valueBlock"},this.contentBlock,"first")),a.show(this.contentContainer),this.contentContainer},setContent:function(t){if(this._destroyExistingContent(),this.content=t,this.content){this.getContentContainerNode(!0);var e=this.content.domNode||this.content;e&&e.parentNode!==this.contentContainer&&o.place(e,this.contentContainer)}a[this.content?"show":"hide"](this.contentContainer),a[this.content?"hide":"show"](this.valueContainer),this.content||this.set("value",this._value)},_value:null,_getValueAttr:function(){return this._value},_setValueAttr:function(t){this._value!==t&&(t=t||"",this._setValueLabelText(t),this._value=t)},_setValueLabelText:function(t){return this.valueLabel&&(d.checkValueLabelOverflow(this,t),this._setValueLabelTooltip(t)),t},_currentNumberValue:null,setNumberValue:function(t){this._currentNumberValue=t},setStyle:function(t){this.fieldStyle=this.fieldStyle||{},e.mixin(this.fieldStyle,t),this.fieldStyle.width&&this.setWidth(this.fieldStyle.width),this.fieldStyle.height&&this.setHeight(this.fieldStyle.height),this.domNode.style.textAlign=this.fieldStyle.horizontalAlign||C.horizontalAlign,this.valueLabel.style.paddingLeft="",this.valueLabel.style.paddingRight="","number"==typeof this.fieldStyle.horizontalPadding&&(this.valueLabel.style.paddingLeft=this.fieldStyle.horizontalPadding+"px",this._allowRightPadding()&&(this.valueLabel.style.paddingRight=this.fieldStyle.horizontalPadding+"px")),this.valueContainer.style.verticalAlign=this.fieldStyle.verticalAlign||"",this.contentContainer&&(this.contentContainer.style.verticalAlign=this.fieldStyle.verticalAlign||"");var i=n("webkit")?"webkitTransform":"transform",o=Number(this.fieldStyle.angle)||0;this.valueContainer.style[i]=0!==o?"rotate("+this.fieldStyle.angle+"deg)":"",this._applyTextStyleToDom(this.domNode)},_allowRightPadding:function(){return this.viewModel&&this.viewModel.reportStyle!==c.CLASSIC},_supportedTextStyles:["color","fontSize","fontFamily","fontWeight","fontStyle","textDecoration","backgroundColor"],_supportedLayoutStyles:["horizontalAlign","verticalAlign","horizontalPadding","angle"],_applyTextStyleToDom:function(t){var e=this;this._supportedTextStyles.forEach(function(i){var n="fontSize"===i;if(e.fieldStyle[i]){var o=e.fieldStyle[i]+(n?"px":"");"backgroundColor"===i?e._setNodeBackgroundColor(t,o):t.style[i]=o}})},_setNodeBackgroundColor:function(t,e){(t===this.domNode&&this.fieldStyle.angle?this.valueContainer:t).style.backgroundColor=e,t===this.domNode&&this.fieldStyle.angle&&(this.domNode.style.backgroundColor="transparent")},getFullStyle:function(){return e.mixin({},C,this.fieldStyle)},_currentBorderKey:null,setBorderStyle:function(t,e){function i(e){return e+"px "+o+" "+t.color}t=this.borderStyle=t||{};var n=this._getBorderKey(t);if(this._currentBorderKey!==n){if(this._currentBorderKey=n,t.color){var o=t.style||"solid";this.domNode.style.border="",this.domNode.style.borderLeft=i(t.l),this.domNode.style.borderRight=i(t.r),this.domNode.style.borderTop=i(t.t),this.domNode.style.borderBottom=i(t.b)}else this.domNode.style.border="none";e||this._refreshLayout()}},_getBorderKey:function(t){return t.l+"_"+t.r+"_"+t.t+"_"+t.b+"_"+t.color+"_"+t.style},_getHorizontalPaddings:function(){return(this.borderStyle.l||0)+(this.borderStyle.r||0)},_getVerticalPaddings:function(){return(this.borderStyle.t||0)+(this.borderStyle.b||0)},getWidth:function(){return this.fieldStyle.width||0},getContentWidth:function(){return this.getWidth()-this._getHorizontalPaddings()},setWidth:function(t){if(this.contentBlock&&this.domNode){t=Math.max(0,t),this.fieldStyle.width=t,this.domNode.style.width=t+"px";var e=this.getContentWidth();this.contentBlock.style.width=e+"px",this.valueContainer.style.width=e+"px",this.valueLabel.style.width=e-(this.fieldStyle.horizontalPadding||0)*(this._allowRightPadding()?2:1)+"px",this.contentContainer&&(this.contentContainer.style.width=e+"px"),d.checkValueLabelOverflow(this),this.onWidthChanged()}},getHeight:function(){return this.fieldStyle.height||0},getContentHeight:function(){return this.getHeight()-this._getVerticalPaddings()},setHeight:function(t){if(this.contentBlock&&this.domNode){t=Math.max(0,t),void 0!==this._minHeight&&(t=Math.max(t,this._minHeight)),this.fieldStyle.height=t,this.domNode.style.height=t+"px";var e=this.getContentHeight();this.contentBlock.style.height=e+"px",this.valueContainer.style.height=e+"px",this.contentContainer&&(this.contentContainer.style.height=e+"px"),d.checkValueLabelOverflow(this),this.onHeightChanged()}},getMinHeight:function(){return this._minHeight||0},_minHeight:void 0,setMinHeight:function(t){this._minHeight=t,this.domNode.style.minHeight=t+"px";var e=t-this._getVerticalPaddings();this.contentBlock.style.minHeight=e+"px",this.valueContainer.style.minHeight=e+"px",this.contentContainer&&(this.contentContainer.style.minHeight=e+"px"),d.checkValueLabelOverflow(this)},_refreshLayout:function(){this.setWidth(this.getWidth()),this.setHeight(this.getHeight()),void 0!==this._minHeight&&this.setMinHeight(this.getMinHeight())},_urlClickHandle:null,setUrl:function(t){this._urlClickHandle&&this._urlClickHandle.remove(),this.valueLabel&&(l[t?"add":"remove"](this.valueLabel,"esriGEAdjustableGridValueFieldHyperLink"),t&&(this._urlClickHandle=i(this.valueLabel,"click",function(){u.openUrl(u.toHttpUrl(t))})))},_setValueLabelTooltip:function(t){return r.setValueLabelTooltip(this,t)},_buildComplexTooltip:function(t,e,i){return r.buildComplexTooltip(this,t,e,i)},onWidthChanged:function(){},onHeightChanged:function(){},destroy:function(){this._destroyExistingContent(),this.inherited(arguments)}});return p.SUPPORTED_LAYOUT_STYLES=v,p.SUPPORTED_TEXT_STYLES=_,p.SUPPORTED_STYLES=m,p});
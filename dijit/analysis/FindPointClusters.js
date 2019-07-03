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
// See http://js.arcgis.com/3.29/esri/copyright.txt for details.

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/number","dojo/_base/fx","dojo/fx/easing","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/form/NumberSpinner","dijit/form/NumberTextBox","../../kernel","../../lang","./AnalysisBase","./_AnalysisOptions","./AnalysisRegistry","./CreditEstimator","./utils","dojo/i18n!../../nls/jsapi","dojo/i18n!./nls/FindPointClusters","dojo/text!./templates/FindPointClusters.html"],function(t,e,s,i,a,n,r,o,l,h,u,c,d,y,m,_,p,f,L,b,C,g,S,v,j,w,P,A,D,F,M,x,N,I,T,U,k,G,B,H,O,E,R){var J=e([f,L,b,C,g,k,U],{declaredClass:"esri.dijit.analysis.FindPointClusters",templateString:R,widgetsInTemplate:!0,analysisLayer:null,outputLayerName:null,searchDistance:null,searchDistanceUnit:"Miles",minFeaturesCluster:null,returnFeatureCollection:!1,enableTravelModes:!0,i18n:null,toolName:"FindPointClusters",helpFileName:"FindPointClusters",resultParameter:"pointClustersResultLayer",_timeObj:null,constructor:function(t){this._pbConnects=[],t.containerNode&&(this.container=t.containerNode),t.showGeoAnalyticsParams&&t.rerun&&(t.analysisLayer=t.inputLayer)},destroy:function(){this.inherited(arguments),i.forEach(this._pbConnects,a.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),s.mixin(this.i18n,O.findPointClustersTool),s.mixin(this.i18n,E)},postCreate:function(){this.inherited(arguments),y.add(this._form.domNode,"esriSimpleForm"),this._outputLayerInput.set("validator",s.hitch(this,this.validateServiceName)),this.filterObjects=[{layer:"inputLayer",layers:this.analysisLayers,select:this._analysisSelect,expressionObj:"attributeExprObj"}],this._buildUI()},startup:function(){},_onClose:function(t){t&&(this._save(),this.emit("save",{save:!0})),this.showGeoAnalyticsParams&&(this._hasPCSWarnShown=!1),this.emit("close",{save:t})},_buildJobParams:function(){var t,e,s={},i=this.get("searchDistance");return e=n.toJson(this.constructAnalysisInputLyrObj(this.analysisLayer,this.showGeoAnalyticsParams)),this.showGeoAnalyticsParams?s.inputLayer=e:s.analysisLayer=e,s.minFeaturesCluster=this.get("minFeaturesCluster"),this.showGeoAnalyticsParams?(s.clusterMethod=this._clusterMethodSelect.get("value"),"HDBSCAN"!==s.clusterMethod&&(s.searchDistance=i,s.searchDistanceUnit=this.get("searchDistanceUnit"))):i&&(s.searchDistance=i,s.searchDistanceUnit=this.get("searchDistanceUnit")),this.returnFeatureCollection||(s.OutputName=n.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(s.context=n.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(t={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.extent=this.map.extent._normalize(!0)),s.context=n.toJson(t)),this._updateJobFilterAndSelection(s)},_handleShowCreditsClick:function(t){t.preventDefault(),this._form.validate()&&this.getCreditsEstimate(this.toolName,this._buildJobParams()).then(s.hitch(this,function(t){this._usageForm.set("content",t),this._usageDialog.show()}))},_handleSaveBtnClick:function(){if(this._form.validate()){this._saveBtn.set("disabled",!0);var t={};if(t.itemParams={description:l.substitute(this.i18n.itemDescription,{inputLayerName:this.analysisLayer.name}),tags:l.substitute(this.i18n.itemTags,{inputLayerName:this.analysisLayer.name}),snippet:this.i18n.itemSnippet},t.jobParams=this._buildJobParams(),this.showGeoAnalyticsParams&&(this.resultParameter="output",t.isSpatioTemporalDataStore=!0,!H.checkPCSforAnalysis({widget:this,jobParams:t.jobParams,hasPCSWarnShown:this._hasPCSWarnShown})&&!this._hasPCSWarnShown))return void(this._hasPCSWarnShown=!0);this.showSelectFolder&&(t.itemParams.folder=this.get("folderId")),console.log(t),this.execute(t)}},_handleDistValueChange:function(t){},_handleUnitsChange:function(t){},_showMessages:function(t){u.set(this._bodyNode,"innerHTML",t),_.fadeIn({node:this._errorMessagePane,easing:p.quadIn,onEnd:s.hitch(this,function(){h.set(this._errorMessagePane,{display:""})})}).play()},_handleCloseMsg:function(t){t&&t.preventDefault(),_.fadeOut({node:this._errorMessagePane,easing:p.quadOut,onEnd:s.hitch(this,function(){h.set(this._errorMessagePane,{display:"none"})})}).play()},_save:function(){},_buildUI:function(){var t=!0;h.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none"),this.signInPromise.then(s.hitch(this,H.initHelpLinks,this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer})),this._bigdataUX=[this._clusterMethodLblRow,this._clusterMethodSelectRow],H.updateDisplay(this._bigdataUX,this.get("showGeoAnalyticsParams"),"table-row"),this._loadConnections();var e=[{value:"Miles",label:this.i18n.miles},{value:"Feet",label:this.i18n.feet},{type:"separator"},{value:"Kilometers",label:this.i18n.kilometers},{value:"Meters",label:this.i18n.meters}];this.showGeoAnalyticsParams&&(u.set(this._forLocationLabel,"innerHTML",this.i18n.limitSearchReqLabel),u.set(this._minClusterPtsLblNode,"innerHTML",this.i18n.minClustersPtsGAXLbl),this._searchCutoffInput.set("required",!0),u.set(this._analysisHelpNode,"esriHelpTopic","inputLayer"),e=[{value:"NauticalMiles",label:this.i18n.nautMiles},{value:"Miles",label:this.i18n.miles},{value:"Yards",label:this.i18n.yards},{value:"Feet",label:this.i18n.feet},{type:"separator"},{value:"Kilometers",label:this.i18n.kilometers},{value:"Meters",label:this.i18n.meters}]),this._distanceUnitsSelect.addOption(e),this.get("showSelectAnalysisLayer")&&(this.analysisLayers&&this.analysisLayer&&!H.isLayerInLayers(this.analysisLayer,this.analysisLayers)&&this.analysisLayers.push(this.analysisLayer),this.get("analysisLayer")||!this.get("analysisLayers")||this.rerun||this.set("analysisLayer",this.analysisLayers[0]),H.populateAnalysisLayers(this,"analysisLayer","analysisLayers")),this.showGeoAnalyticsParams||(u.set(this._labelTwo,"innerHTML",this.i18n.twoLabel),u.set(this._labelThree,"innerHTML",this.i18n.threeLabel),u.set(this._labelFour,"innerHTML",this.i18n.fourLabel)),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),t=!1),this.searchDistanceUnit&&this._distanceUnitsSelect.set("value",this.searchDistanceUnit),this.searchDistance&&this._searchCutoffInput.set("value",this.searchDistance),this.minFeaturesCluster&&this._maxCountInput.set("value",this.minFeaturesCluster),this.clusterMethod&&this._clusterMethodSelect.set("value",this.clusterMethod),this.analysisLayer&&this._updateAnalysisLayerUI(t),H.addReadyToUseLayerOption(this,[this._analysisSelect]),h.set(this._chooseFolderRow,"display",!0===this.showSelectFolder?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(s.hitch(this,function(t){this.folderStore=t,H.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),h.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"inline-block":"none"),this._createFilterAndSelections()},_updateAnalysisLayerUI:function(t){this.analysisLayer&&(u.set(this._aggregateToolDescription,"innerHTML",l.substitute(this.i18n.clustersLabel,{inputLayerName:this.analysisLayer.name})),!t&&this.outputLayerName||(this.outputLayerName=l.substitute(this.i18n.outputLayerName,{inputLayerName:this.analysisLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)))},_handleAnalysisLayerChange:function(t){"browse"===t||"browselayers"===t?this._createBrowseItems({browseValue:t},{tags:["point"],geometryTypes:[G.GeometryTypes.Point]},this._analysisSelect):(this.analysisLayer=this.analysisLayers[t],this._updateAnalysisLayerUI(!0))},_handleBrowseItemsSelect:function(t,e){t&&t.selection&&H.addAnalysisReadyLayer({item:t.selection,layers:this.analysisLayers,layersSelect:this._analysisSelect,browseDialog:t.dialog||this._browsedlg,widget:this},e).always(s.hitch(this,function(t){this._handleAnalysisLayerChange(this._analysisSelect.get("value"))}))},_handleClusterMethodChange:function(t){var e="HDBSCAN"===t;this._searchCutoffInput.set("disabled",e),this._distanceUnitsSelect.set("disabled",e),y.toggle(this._forLocationLabel,"esriAnalysisTextDisabled",e)},_loadConnections:function(){this.on("start",s.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",s.hitch(this,"_onClose",!1))},_setAnalysisGpServerAttr:function(t){t&&(this.analysisGpServer=t,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setAnalysisLayerAttr:function(t){t&&t.geometryType===G.GeometryTypes.Point?this.analysisLayer=t:this.analysisLayer=null},_getAnalysisLayerAttr:function(t){return this.analysisLayer},_setAnalysisLayersAttr:function(t){this.analysisLayers=i.filter(t,function(t){return t.geometryType===G.GeometryTypes.Point})},_setDisableRunAnalysisAttr:function(t){this._saveBtn.set("disabled",t)},_setSearchDistanceUnitAttr:function(t){this.searchDistanceUnit=t},_getSearchDistanceUnitAttr:function(){return this.searchDistanceUnit=this._distanceUnitsSelect.get("value"),this.searchDistanceUnit},_getSearchDistanceAttr:function(){return this.searchDistance=this._searchCutoffInput.get("value"),this.searchDistance},_setSearchDistanceAttr:function(t){this.searchDistance=t},_getMinFeaturesClusterAttr:function(){return this.minFeaturesCluster=this._maxCountInput.get("value"),this.minFeaturesCluster},_setMinFeaturesClusterAttr:function(t){this.minFeaturesCluster=t},_connect:function(t,e,s){this._pbConnects.push(a.connect(t,e,s))},validateServiceName:function(t){return H.validateServiceName(t,{textInput:this._outputLayerInput,isItem:!this.returnFeatureCollection})}});return r("extend-esri")&&s.setObject("dijit.analysis.FindPointClusters",J,I),J});
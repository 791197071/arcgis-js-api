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

define(["require","exports","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/extendsHelper","../../../../core/libs/gl-matrix-2/gl-matrix","../../../../geometry/support/aaBoundingBox","../../support/buffer/BufferView","../../support/buffer/InterleavedLayout","../lib/GLMaterialTexture","../lib/Material","../lib/pathGeometryUtils","../lib/Util","../lib/Util","./VisualVariableMaterialParameters","./internal/bufferWriters","./internal/MaterialUtil","./internal/MaterialUtil","../shaders/PathPrograms"],function(e,t,r,a,i,n,o,s,l,p,d,c,f,u,m,v,g,h){function b(e,t){return!e.slicePlaneEnabled&&(e.cullFace?"none"!==e.cullFace:!e.transparent&&!e.doubleSided)}function x(e,t,r){b(t,r)?(e.setFaceCullingEnabled(!0),"front"===t.cullFace?e.setCullFace(1028):e.setCullFace(1029)):e.setFaceCullingEnabled(!1)}function S(e){e.setFaceCullingEnabled(!1)}function P(e,t){return e?6:t?2:4}function y(e,t){t.vvSizeEnabled&&(e.setUniform3fv("vvSizeMinSize",t.vvSizeMinSize),e.setUniform3fv("vvSizeMaxSize",t.vvSizeMaxSize),e.setUniform3fv("vvSizeOffset",t.vvSizeOffset),e.setUniform3fv("vvSizeFactor",t.vvSizeFactor)),t.vvColorEnabled&&(e.setUniform1fv("vvColorValues",t.vvColorValues),e.setUniform4fv("vvColorColors",t.vvColorColors))}var C=c.assert,w={DIFFUSE:0,COMPONENT_COLOR:1},O=function(e){function t(r,a){var i=e.call(this,a)||this;return i.supportsEdges=!0,i.params=g.copyParameters(r,U),i.vertexBufferLayout=t.getVertexBufferLayout(i.params),i.bufferWriter=new T(i.vertexBufferLayout),i}return a(t,e),t.prototype.isVisible=function(){var t=this.params;if(!e.prototype.isVisible.call(this)||0===t.layerOpacity)return!1;var r=t.vertexColors,a=t.symbolColors,i=t.vvColorEnabled,n="replace"===t.colorMixMode,o=t.opacity>0,s=t.externalColor&&t.externalColor[3]>0;return r&&(i||a)?!!n||o:r?n?s:o:i||a?!!n||o:n?s:o},t.prototype.getParams=function(){return this.params},t.prototype.getParameterValues=function(){return g.copyParameters(this.params)},t.prototype.setParameterValues=function(e){var t=this.params;for(var r in e)"textureId"===r&&C(t.textureId,"Can only change texture of material that already has a texture"),"castShadows"===r&&C(e.castShadows===t.castShadows,"Can not change shadow casting behavior."),"wireframe"===r&&C(t.wireframe,"wireframe flag affects drawmode (lines instead of triangles) and therefore can only be set during contruction"),!e[r]||"vvSizeMinSize"!==r&&"vvSizeMaxSize"!==r&&"vvSizeOffset"!==r&&"vvSizeFactor"!==r?t[r]=e[r]:i.vec3.set(t[r],e[r][0],e[r][1],e[r][2]);this.notifyDirty("matChanged")},t.prototype.intersectTriangles=function(e,t,a,n,o,s,l,p,c,f,u){for(var m=e[0],v=e[1],h=e[2],b=t[0],x=t[1],S=t[2],P=b-m,y=x-v,C=S-h,w=r({},this.params,{origin:N,direction:D,auxpos2X:0}),O=a;O<n;O++){var z=f?f[O]:O,M=l.offsetIdx+l.strideIdx*o[3*z],I=l.offsetIdx+l.strideIdx*o[3*z+1],V=l.offsetIdx+l.strideIdx*o[3*z+2],A=p.offsetIdx+p.strideIdx*o[3*z],U=p.offsetIdx+p.strideIdx*o[3*z+1],T=p.offsetIdx+p.strideIdx*o[3*z+2],E=[0,0,0];if(w.vvSizeEnabled){var L=c.offsetIdx+c.strideIdx*s[3*z],R=c.offsetIdx+c.strideIdx*s[3*z+1],W=c.offsetIdx+c.strideIdx*s[3*z+2];E[0]=c.data[L],E[1]=c.data[R],E[2]=c.data[W]}i.vec3.set(w.origin,l.data[M],l.data[M+1],l.data[M+2]),i.vec3.set(w.direction,p.data[A],p.data[A+1],p.data[A+2]),w.auxpos2X=E[0],d.Builder.queryVertexPosition(B,w);var _=B[0],q=B[1],G=B[2];i.vec3.set(w.origin,l.data[I],l.data[I+1],l.data[I+2]),i.vec3.set(w.direction,p.data[U],p.data[U+1],p.data[U+2]),w.auxpos2X=E[1],d.Builder.queryVertexPosition(B,w);var k=B[0],H=B[1],j=B[2];i.vec3.set(w.origin,l.data[V],l.data[V+1],l.data[V+2]),i.vec3.set(w.direction,p.data[T],p.data[T+1],p.data[T+2]),w.auxpos2X=E[2],d.Builder.queryVertexPosition(B,w);var J=B[0],K=B[1],Q=B[2],Y=k-_,Z=H-q,$=j-G,ee=J-_,te=K-q,re=Q-G,ae=y*re-te*C,ie=C*ee-re*P,ne=P*te-ee*y,oe=Y*ae+Z*ie+$*ne,se=m-_,le=v-q,pe=h-G,de=le*$-Z*pe,ce=pe*Y-$*se,fe=se*Z-Y*le;if(oe>F){var ue=se*ae+le*ie+pe*ne;if(ue<0||ue>oe)continue;var me=P*de+y*ce+C*fe;if(me<0||ue+me>oe)continue}else{if(!(oe<-F))continue;var ue=se*ae+le*ie+pe*ne;if(ue>0||ue<oe)continue;var me=P*de+y*ce+C*fe;if(me>0||ue+me<oe)continue}var ve=(ee*de+te*ce+re*fe)/oe;if(ve>=0){u(ve,g.computeNormal(Y,Z,$,ee,te,re,X),z)}}},t.prototype.intersect=function(e,t,r,a,i,o,s,l){if("triangle"===e.data.primitiveType){var p=0;p=this.params.vvSizeEnabled?Math.max(this.params.vvSizeMaxSize[0],Math.max(this.params.vvSizeMaxSize[1],this.params.vvSizeMaxSize[2])):this.params.size;var d=n.fromValues(e.boundingInfo.bbMin[0]-p,e.boundingInfo.bbMin[1]-p,e.boundingInfo.bbMin[2]-p,e.boundingInfo.bbMax[0]+p,e.boundingInfo.bbMax[1]+p,e.boundingInfo.bbMax[2]+p),c=[o[0]-i[0],o[1]-i[1],o[2]-i[2]],u=Math.sqrt(c[0]*c[0]+c[1]*c[1]+c[2]*c[2]),m=[u/c[0],u/c[1],u/c[2]];if(g.intersectAabbInvDir(d,i,m,a.tolerance)){var v=e.data.indexCount/3;this.intersectTriangles(i,o,0,v,e.data.getIndices(f.VertexAttrConstants.POSITION),e.data.getIndices(f.VertexAttrConstants.AUXPOS2),e.data.getAttribute(f.VertexAttrConstants.POSITION),e.data.getAttribute(f.VertexAttrConstants.AUXPOS1),e.data.getAttribute(f.VertexAttrConstants.AUXPOS2),null,s)}}},t.prototype.getGLMaterials=function(){return{color:z,depth:M,depthShadowMap:this.params.castShadows?I:null,normal:V,highlight:A}},t.prototype.getAllTextureIds=function(){return this.params.textureId?[this.params.textureId]:[]},t.getVertexBufferLayout=function(e){var t=s.newLayout().vec3f("position");return t.vec4f(f.VertexAttrConstants.AUXPOS1),e.groundNormalShading||(t=e.compressedNormals?t.vec2i16("normalCompressed",{glNormalized:!0}):t.vec3f("normal")),e.textureId&&(t=t.vec2f("uv0"),e.atlasRegions&&(t=t.vec4u16("region",{glNormalized:!0}))),e.vertexColors&&(t=t.vec4u8("color")),e.symbolColors&&(t=t.vec4u8("symbolColor")),e.componentIndices&&(t=t.u16("componentIndex").u16("_padding",{glPadding:!0})),(e.vvColorEnabled||e.vvSizeEnabled)&&(t=t.vec4f(f.VertexAttrConstants.AUXPOS2)),t},t}(p),z=function(e){function t(t,r,a){var i=this,n=t.getParams();i=e.call(this,t,r,a,n.textureId,n.textureInitTransparent)||this,i.params=g.copyParameters(n);var o=i.params;return i.slot=P(o.transparent,o.writeStencil),i.texturing=o.textureId?o.atlasRegions?"AtlasTextured":"Textured":"none",i._createPrograms(),i}return a(t,e),t.prototype._createPrograms=function(){var e=this;this.programs=v.BindParametersMap.create(this.params,function(t){return e._createProgram(t)})},t.prototype._createProgram=function(e){var t=this.params,r={viewingMode:this.programRep.globalOptions.viewingMode,textureMode:this.texturing,vertexColors:t.vertexColors,symbolColors:t.symbolColors,flipV:t.flipV,doubleSided:t.doubleSided&&"normal"===t.doubleSidedType,windowOrderDoubleSided:t.doubleSided&&"winding-order"===t.doubleSidedType,receiveShadows:e.receiveShadows,receiveSSAO:e.receiveSSAO,vvSize:t.vvSizeEnabled,vvColor:t.vvColorEnabled,verticalOffset:null!==t.verticalOffset,screenSizePerspective:null!==t.screenSizePerspective,slice:t.slicePlaneEnabled,groundNormalShading:t.groundNormalShading,compressedNormals:t.compressedNormals,componentColor:null!=t.componentColorBuffer,transparencyDiscard:t.transparent,alphaCoverageCorrection:E,wireframe:t.wireframe};return this.programRep.getProgram(h.colorPass,r)},t.prototype.beginSlot=function(e){return e===this.slot},t.prototype.getProgram=function(){return this.program||this.getPrograms()[0]},t.prototype.getPrograms=function(){return v.BindParametersMap.programs(this.programs)},t.prototype.updateParameters=function(){this.params=this.material.getParameterValues(),this.slot=P(this.params.transparent,this.params.writeStencil),this.updateTexture(this.params.textureId),this._createPrograms()},t.prototype.bind=function(e,t){var r=this.params,a=this.program=v.BindParametersMap.lookup(this.programs,t);e.bindProgram(a),a.setUniform1f("size",r.size),a.setUniform3fv("ambient",r.ambient),a.setUniform3fv("diffuse",r.diffuse),a.setUniform3fv("specular",r.specular),a.setUniform4fv("externalColor",r.externalColor),a.setUniform1i("colorMixMode",g.colorMixModes[r.colorMixMode]),a.setUniform1f("opacity",r.opacity),a.setUniform1f("layerOpacity",r.layerOpacity),g.bindVerticalOffset(r.verticalOffset,t,a),g.bindScreenSizePerspective(r.screenSizePerspective,t,a),y(a,r),this.bindTexture(e,a),"none"!==this.texturing&&this.bindTextureSize(e,a),e.setBlendFunctionSeparate(770,771,1,771),r.inverseWindingOrder&&e.setFrontFace(2304),r.transparent?(e.setBlendingEnabled(!0),r.blendModeOneOne?(e.setBlendFunction(1,1),e.setDepthWriteEnabled(!1)):e.setBlendFunctionSeparate(770,771,1,771)):e.setBlendingEnabled(!1),r.polygonOffset&&(e.setPolygonOffsetFillEnabled(!0),e.setPolygonOffset(2,2)),x(e,r,t),e.setDepthTestEnabled(!0),r.componentIndices&&r.componentColorBuffer&&(r.componentColorBuffer.updateTexture(),r.componentColorBuffer.bind(a,{texName:"uComponentColorTex",invDimName:"uComponentColorTexInvDim",unit:w.COMPONENT_COLOR}))},t.prototype.release=function(e,t){e.setPolygonOffsetFillEnabled(!1),S(e),e.setBlendingEnabled(!1),e.setBlendFunctionSeparate(770,771,1,771),e.setDepthWriteEnabled(!0),e.setFrontFace(2305)},t.prototype.bindView=function(e,t){var r=this.program=v.BindParametersMap.lookup(this.programs,t),a=this.params,i=t.origin;g.bindView(i,t.view,r),g.bindCamPos(i,t.viewInvTransp,r),a.slicePlaneEnabled&&g.bindSlicePlane(i,t.slicePlane,r),t.shadowMappingEnabled&&t.shadowMap.bindView(r,i)},t.prototype.bindInstance=function(e,t){var r=this.program;r.setUniformMatrix4fv("model",t.transformation),r.setUniformMatrix4fv("modelNormal",t.transformationNormal)},t.prototype.getDrawMode=function(){return this.params.wireframe?1:4},t}(l),M=function(e){function t(t,r,a,i){void 0===i&&(i=!1);var n=e.call(this,t,r,a,t.getParams().textureId)||this;return n.params=g.copyParameters(t.getParams()),n.texturing=t.bufferWriter.vertexBufferLayout.hasField("uv0")?n.params.atlasRegions?"AtlasTextured":"Textured":"none",n.biased=i,n.selectProgram(),n.selectSlot(),n}return a(t,e),t.prototype.beginSlot=function(e){return e===this.slot},t.prototype.getProgram=function(){return this.program},t.prototype.selectProgram=function(){this.program=this.programRep.getProgram(h.depthPass,{viewingMode:this.programRep.globalOptions.viewingMode,textureMode:this.texturing,flipV:this.params.flipV,shadowMap:this.biased,vvSize:this.params.vvSizeEnabled,verticalOffset:null!==this.params.verticalOffset,screenSizePerspective:null!==this.params.screenSizePerspective,slice:this.params.slicePlaneEnabled,transparencyDiscard:this.params.transparent,alphaCoverageCorrection:E})},t.prototype.selectSlot=function(){this.slot=P(this.params.transparent,this.params.writeStencil)},t.prototype.updateParameters=function(){this.params=this.material.getParameterValues(),this.selectProgram(),this.selectSlot(),this.updateTexture(this.params.textureId)},t.prototype.bind=function(e,t){var r=this.program,a=this.params;e.bindProgram(r),r.setUniform1f("size",a.size),r.setUniform2fv("nearFar",t.nearFar),a.inverseWindingOrder&&e.setFrontFace(2304),g.bindVerticalOffset(a.verticalOffset,t,r),g.bindScreenSizePerspective(a.screenSizePerspective,t,r),y(r,a),this.bindTexture(e,r),x(e,a,t),e.setDepthTestEnabled(!0)},t.prototype.release=function(e){var t=this.params;S(e),t.inverseWindingOrder&&e.setFrontFace(2305)},t.prototype.bindView=function(e,t){var r=this.program,a=this.params,i=t.origin;g.bindView(i,t.view,r),a.slicePlaneEnabled&&g.bindSlicePlane(t.origin,t.slicePlane,r),a.screenSizePerspective&&g.bindCamPos(i,t.viewInvTransp,r)},t.prototype.bindInstance=function(e,t){this.program.setUniformMatrix4fv("model",t.transformation)},t.prototype.getDrawMode=function(){return this.params.wireframe?1:4},t}(l),I=function(e){function t(t,r,a){return e.call(this,t,r,a,!0)||this}return a(t,e),t}(M),V=function(e){function t(t,r,a,i){void 0===i&&(i=!1);var n=e.call(this,t,r,a,t.getParams().textureId)||this;return n.params=g.copyParameters(t.getParams()),n.texturing=t.bufferWriter.vertexBufferLayout.hasField("uv0")?n.params.atlasRegions?"AtlasTextured":"Textured":"none",n.selectProgram(),n.selectSlot(),n}return a(t,e),t.prototype.beginSlot=function(e){return e===this.slot},t.prototype.getProgram=function(){return this.program},t.prototype.selectProgram=function(){this.program=this.programRep.getProgram(h.normalPass,{viewingMode:this.programRep.globalOptions.viewingMode,textureMode:this.texturing,flipV:this.params.flipV,vvSize:this.params.vvSizeEnabled,verticalOffset:null!==this.params.verticalOffset,screenSizePerspective:null!==this.params.screenSizePerspective,slice:this.params.slicePlaneEnabled,compressedNormals:this.params.compressedNormals,transparencyDiscard:this.params.transparent,alphaCoverageCorrection:E})},t.prototype.selectSlot=function(){this.slot=P(this.params.transparent,this.params.writeStencil)},t.prototype.updateParameters=function(){this.params=this.material.getParameterValues(),this.selectProgram(),this.selectSlot(),this.updateTexture(this.params.textureId)},t.prototype.bind=function(e,t){var r=this.program,a=this.params;e.bindProgram(r),r.setUniform1f("size",a.size),this.bindTexture(e,r),g.bindVerticalOffset(a.verticalOffset,t,r),g.bindScreenSizePerspective(a.screenSizePerspective,t,r),y(r,a),x(e,a,t),a.inverseWindingOrder&&e.setFrontFace(2304),e.setDepthTestEnabled(!0)},t.prototype.release=function(e){var t=this.params;S(e),t.inverseWindingOrder&&e.setFrontFace(2305)},t.prototype.bindView=function(e,t){var r=this.program,a=this.params,i=t.origin;g.bindView(i,t.view,r),r.setUniformMatrix4fv("viewNormal",t.viewInvTransp),a.slicePlaneEnabled&&g.bindSlicePlane(t.origin,t.slicePlane,r),a.screenSizePerspective&&g.bindCamPos(i,t.viewInvTransp,r)},t.prototype.bindInstance=function(e,t){var r=this.program;r.setUniformMatrix4fv("model",t.transformation),r.setUniformMatrix4fv("modelNormal",t.transformationNormal)},t.prototype.getDrawMode=function(){return this.params.wireframe?1:4},t}(l),A=function(e){function t(t,r,a,i){void 0===i&&(i=!1);var n=e.call(this,t,r,a,t.getParams().textureId)||this;return n.params=g.copyParameters(t.getParams()),n.texturing=t.bufferWriter.vertexBufferLayout.hasField("uv0")?n.params.atlasRegions?"AtlasTextured":"Textured":"none",n.selectProgram(),n.selectSlot(),n}return a(t,e),t.prototype.beginSlot=function(e){return e===this.slot},t.prototype.getProgram=function(){return this.program},t.prototype.selectProgram=function(){this.program=this.programRep.getProgram(h.highlightPass,{viewingMode:this.programRep.globalOptions.viewingMode,textureMode:this.texturing,flipV:this.params.flipV,vvSize:this.params.vvSizeEnabled,verticalOffset:null!==this.params.verticalOffset,screenSizePerspective:null!==this.params.screenSizePerspective,slice:this.params.slicePlaneEnabled,transparencyDiscard:this.params.transparent,alphaCoverageCorrection:E})},t.prototype.selectSlot=function(){this.slot=P(this.params.transparent,this.params.writeStencil)},t.prototype.updateParameters=function(){this.params=this.material.getParameterValues(),this.selectProgram(),this.selectSlot(),this.updateTexture(this.params.textureId)},t.prototype.bind=function(e,t){var r=this.program,a=this.params;e.bindProgram(r),r.setUniform1f("size",a.size),this.bindTexture(e,r),g.bindVerticalOffset(a.verticalOffset,t,r),g.bindScreenSizePerspective(a.screenSizePerspective,t,r),y(r,a),x(e,a,t),a.inverseWindingOrder&&e.setFrontFace(2304),e.setDepthTestEnabled(!0)},t.prototype.release=function(e){var t=this.params;S(e),t.inverseWindingOrder&&e.setFrontFace(2304)},t.prototype.bindView=function(e,t){var r=this.program,a=this.params,i=t.origin;g.bindView(i,t.view,r),a.slicePlaneEnabled&&g.bindSlicePlane(t.origin,t.slicePlane,r),a.screenSizePerspective&&g.bindCamPos(i,t.viewInvTransp,r)},t.prototype.bindInstance=function(e,t){var r=this.program;r.setUniformMatrix4fv("model",t.transformation),r.setUniformMatrix4fv("modelNormal",t.transformationNormal)},t.prototype.getDrawMode=function(){return this.params.wireframe?1:4},t}(l),U=r({size:1,wireframe:!1,textureId:void 0,textureInitTransparent:!1,ambient:[.2,.2,.2],diffuse:[.8,.8,.8],specular:[0,0,0],externalColor:[1,1,1,1],colorMixMode:"multiply",opacity:1,layerOpacity:1,blendModeOneOne:!1,inverseWindingOrder:!1,vertexColors:!1,symbolColors:!1,componentIndices:!1,componentColorBuffer:null,flipV:!1,doubleSided:!1,doubleSidedType:"normal",cullFace:void 0,compressedNormals:!1,groundNormalShading:!1,writeStencil:!1,receiveSSAO:!0,castShadows:!0,verticalOffset:null,screenSizePerspective:null,slicePlaneEnabled:!1,transparent:!1,polygonOffset:!1,atlasRegions:!1},u.Default),T=function(){function e(e){this.vertexBufferLayout=e}return e.prototype.allocate=function(e){return this.vertexBufferLayout.createBuffer(e)},e.prototype.elementCount=function(e){return e.indices.position.length},e.prototype.write=function(e,t,r,a,i){if(f.VertexAttrConstants.AUXPOS1 in t.vertexAttr){var n=t.vertexAttr[f.VertexAttrConstants.AUXPOS1],s=t.indices[f.VertexAttrConstants.AUXPOS1];C(4===n.size);var l=a.getField(f.VertexAttrConstants.AUXPOS1,o.BufferViewVec4f);if(!l)throw new Error("unable to aquire view for "+f.VertexAttrConstants.AUXPOS1);m.writeBufferVec4(s,n.data,l,i)}if(f.VertexAttrConstants.AUXPOS2 in t.vertexAttr){var n=t.vertexAttr[f.VertexAttrConstants.AUXPOS2],s=t.indices[f.VertexAttrConstants.AUXPOS2];C(4===n.size);var p=a.getField(f.VertexAttrConstants.AUXPOS2,o.BufferViewVec4f);if(!p)throw new Error("unable to aquire view for "+f.VertexAttrConstants.AUXPOS2);m.writeBufferVec4(s,n.data,p,i)}m.writeDefaultAttributes(t,r,this.vertexBufferLayout,e.transformation,e.invTranspTransformation,a,i)},e}(),E=!0,F=Math.pow(2,-52),B=i.vec3f64.create(),N=i.vec3f64.create(),D=i.vec3f64.create(),X=i.vec3f64.create();return O});
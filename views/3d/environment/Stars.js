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

define(["require","exports","../../../request","../../../core/Error","../../../core/Logger","../../../core/promiseUtils","../../../core/watchUtils","../../../core/libs/gl-matrix-2/gl-matrix","../support/buffer/glUtil","../support/buffer/InterleavedLayout","../webgl-engine/shaders/StarsPrograms","../../webgl/BufferObject","../../webgl/programUtils","../../webgl/Util","../../webgl/VertexArrayObject"],function(t,e,r,a,i,s,n,o,f,u,l,c,d,h,p){var m=i.getLogger("esri.views.3d.environment.Stars"),g=function(){function e(t){this.slot=16,this.numBinaryFloats=2,this.numBinaryUInt8=1,this.bytesPerStar=9,this.needsRender=!1,this.didRender=!0,this._numStars=0,this._modelMatrix=o.mat4f64.create(),this.view=t,this._loadDataPromise=this._loadBrightStarCatalogue()}return e.prototype.destroy=function(){this._loadDataPromise.isFulfilled()||this._loadDataPromise.cancel(),this._dateHandle&&(this._dateHandle.remove(),this._dateHandle=null),this._program&&(this._program.dispose(),this._program=null),this._vao&&(this._vao.dispose(),this._vao=null)},e.prototype.initializeRenderContext=function(t){var e=this,r=t.rctx;this._program=d.createProgram(r,l.program),this._dateHandle=n.init(this.view,"environment.lighting.date",function(t){return e._update(t)}),this._loadDataPromise.then(function(){e._numStars=e._starData.byteLength/e.bytesPerStar;var t=new Float32Array(e._starData,0,e._numStars*e.numBinaryFloats),a=new Uint8Array(e._starData,e._numStars*e.numBinaryFloats*4,e._numStars*e.numBinaryUInt8);e._vao=e._createVertexArrayObject(r,t,a),e.needsRender=!0})},e.prototype.uninitializeRenderContext=function(t){this.destroy()},e.prototype.render=function(t){if(t.slot!==this.slot||0!==t.pass||null==this._starData)return!1;var e=t.rctx,r=this._program;return e.bindProgram(r),r.setUniformMatrix4fv("view",t.camera.viewMatrix),r.setUniformMatrix4fv("proj",t.camera.projectionMatrix),r.setUniform4fv("viewport",t.camera.fullViewport),r.setUniformMatrix4fv("model",this._modelMatrix),r.setUniform1f("pixelRatio",t.pixelRatio),e.setDepthTestEnabled(!0),e.setDepthFunction(515),e.setBlendingEnabled(!0),e.setBlendFunctionSeparate(770,771,1,771),e.setDepthWriteEnabled(!1),e.bindVAO(this._vao),h.assertCompatibleVertexAttributeLocations(this._vao,r),e.drawArrays(0,0,this._numStars),e.setBlendingEnabled(!1),e.setDepthWriteEnabled(!0),e.setDepthFunction(513),this.needsRender=!1,!0},e.prototype._computeDayDuration=function(t){var e=t,r=new Date(t.getFullYear(),0,1,11,58,56);return(+e-+r)/(+new Date(t.getFullYear()+1,0,1,11,58,55)-+r)},e.prototype._update=function(t){if(t){var e=t.getHours()/12,r=t.getMinutes()/60*(2/24),a=t.getSeconds()/60*(2/1440),i=(e+r+a-.9972222)%2,s=2*this._computeDayDuration(t),n=this._modelMatrix;o.mat4.copy(n,y),o.mat4.rotateZ(n,n,-s*Math.PI),o.mat4.multiply(n,b,n),o.mat4.rotateZ(n,n,-i*Math.PI),this.needsRender=!0}},e.prototype._hexToRGB=function(t){return[parseInt(t.substring(0,2),16),parseInt(t.substring(2,4),16),parseInt(t.substring(4,6),16)]},e.prototype._unpackUint8Attributes=function(t){return t>=192?[2.9,t-192]:t>=160?[2.5,t-160]:t>=128?[2,t-128]:t>=96?[1.5,t-96]:t>=64?[1,t-64]:t>=32?[.7,t-32]:[.4,t]},e.prototype._createVertexArrayObject=function(t,e,r){for(var a=v.createBuffer(this._numStars),i=a.position,s=a.color,n=a.size,o=0;o<this._numStars;o++){var u=e[2*o+0],d=e[2*o+1];i.set(o,0,-Math.cos(u)*Math.sin(d)),i.set(o,1,-Math.sin(u)*Math.sin(d)),i.set(o,2,-Math.cos(d));var h=this._unpackUint8Attributes(r[o]),m=this._hexToRGB(_[h[1]]);s.set(o,0,255*m[0]),s.set(o,1,255*m[1]),s.set(o,2,255*m[2]),s.set(o,3,255),n.set(o,h[0])}return new p(t,l.program.attributes,{geometry:f.glLayout(v)},{geometry:c.createVertex(t,35044,a.buffer)})},e.prototype._verifyStartData=function(t){if(!t)throw new a("stars:no-data-received","Failed to create stars because star catalogue is missing");var e=t.byteLength/this.bytesPerStar;if(e%1!=0||e>5e4||e<5e3)throw new a("stars:invalid-data","Failed to create stars because star catalogue data is invalid")},e.prototype._loadBrightStarCatalogue=function(){var e=this;return w?(this._starData=w,s.resolve()):r(t.toUrl("./resources/stars.wsv"),{responseType:"array-buffer"}).then(function(t){var r=t.data;e._verifyStartData(r),w=r,e._starData=r}).catch(function(t){throw t&&"cancel"!==t.dojoType&&m.error("loadBrightStarCatalogue",t.message),t})},e}(),_=["9bb2ff","9eb5ff","aabfff","bbccff","ccd8ff ","dae2ff","e4e9ff","eeefff","f8f6ff","fff9fb","fff5ef","fff1e5","ffeddb","ffe9d2","ffe6ca","ffe3c3","ffe0bb","ffddb4","ffdaad","ffd6a5","ffd29c","ffcc8f","ffc178","ffa94b","ff7b00"],b=o.mat4f64.fromValues(1,0,0,0,0,.9174771405229186,.39778850739794974,0,0,-.39778850739794974,.9174771405229186,0,0,0,0,1),y=o.mat4f64.fromValues(1,0,0,0,0,.9174771405229186,-.39778850739794974,0,0,.39778850739794974,.9174771405229186,0,0,0,0,1),v=u.newLayout().vec3f("position").vec4u8("color").f32("size"),w=null;return g});
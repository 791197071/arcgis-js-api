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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../Color","../../../../core/compilerUtils","../../../../core/compilerUtils","../../../../core/libs/gl-matrix-2/gl-matrix","../../../../geometry/support/aaBoundingBox","../../../../geometry/support/MeshComponent","../../../../geometry/support/webMercatorUtils","../../../../geometry/support/meshUtils/projection","./ElevationAligners","./Graphics3DObject3DGraphicLayer","./Graphics3DSymbolCommonCode","./Graphics3DSymbolLayer","../support/edgeUtils","../support/symbolColorUtils","../../support/debugFlags","../../support/projectionUtils","../../webgl-engine/Stage","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/GeometryData","../../webgl-engine/lib/Object3D","../../webgl-engine/lib/Texture","../../webgl-engine/lib/Util","../../webgl-engine/materials/DefaultMaterial","../../webgl-engine/materials/NativeLineMaterial"],function(e,t,r,a,o,n,i,s,l,c,u,p,m,h,f,d,g,v,_,y,b,x,C,O,w,A,M){var S=w.VertexAttrConstants,E=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._edgeStageObjects=new Set,t._materials={},t._textures={},t}return r(t,e),t.prototype._prepareResources=function(){v.DRAW_MESH_GEOMETRY_NORMALS&&(this._debugVertexNormalMaterial=new M({color:[1,0,1,1]},"debugVertexNormal"),this._debugFaceNormalMaterial=new M({color:[0,1,1,1]},"debugFAceNormal")),this.resolve()},t.prototype.destroy=function(){e.prototype.destroy.call(this),this.isFulfilled()||this.reject();for(var t in this._materials){var r=this._materials[t];this._context.stage.remove(y.ModelContentType.MATERIAL,r.material.id)}for(var t in this._textures){var a=this._textures[t];this._context.stage.remove(y.ModelContentType.TEXTURE,a.id)}this._materials={},this._textures={}},t.prototype.createGraphics3DGraphic=function(e){var t=e.graphic;if("mesh"!==t.geometry.type)return this._logWarning("unsupported geometry type for fill on mesh-3d symbol: "+t.geometry.type),null;if(!this._validateGeometry(t.geometry))return null;var r="graphic"+t.uid,a=this.getGraphicElevationContext(t),o=e.renderingInfo;return this._createAs3DShape(t,o,a,r,t.uid)},t.prototype.layerOpacityChanged=function(){var e=this._getLayerOpacity();for(var t in this._materials){var r=this._materials[t];r.material.setParameterValues({layerOpacity:e});var a=r.material.getParameterValues();this._setMaterialTransparentParameter(a,r.isComponentTransparent),r.material.setParameterValues({transparent:a.transparent})}if(this._edgeStageObjects.size>0){var o=this._context.stage.view.getEdgeView(),n=this._getLayerOpacity();this._edgeStageObjects.forEach(function(e){o.updateAllComponentOpacities(e,[n])})}return!0},t.prototype.layerElevationInfoChanged=function(e,t){return this.updateGraphics3DGraphicElevationInfo(e,t,h.needsElevationUpdates3D)},t.prototype.slicePlaneEnabledChanged=function(e,t){var r=this;for(var a in this._materials){this._materials[a].material.setParameterValues({slicePlaneEnabled:this._context.slicePlaneEnabled})}if(this._edgeStageObjects.size>0){var n=this._context.stage.view.getEdgeView(),i=this._createEdgeMaterial(n);if(o.isSome(i)){var s=[i];this._edgeStageObjects.forEach(function(e){n.updateAllComponentMaterials(e,s,{slicePlaneEnabled:r._context.slicePlaneEnabled},!1)})}}return!0},t.prototype._requiresSymbolVertexColors=function(){return this._isPropertyDriven("color")||this._isPropertyDriven("opacity")},t.prototype._colorUid=function(e){var t=e.material&&e.material.color;if(!t)return"-";if(t)switch(t.type){case"value":return t.value.toHex();case"image":return t.uid;default:n.neverReached(t)}},t.prototype._materialProperties=function(e,t,r){var a=this._requiresSymbolVertexColors(),o=t.material&&t.material.color,n=this._colorUid(t),i=!!e.vertexAttributes.color;return{hasSymbolVertexColors:a,hasVertexColors:i,color:o,uid:"vc:"+i+",vct"+r+",svc:"+a+",cmuid:"+n}},t.prototype._setInternalColorValueParameters=function(e,t){t.diffuse=a.toUnitRGB(e.value),t.opacity=e.value.a},t.prototype._getLoadableTextureResource=function(e){return e.data?e.data instanceof HTMLImageElement?e.data.complete?e.data:e.data.src:e.data:e.url},t.prototype._setInternalColorImageParameters=function(e,t,r){var a=this._getLoadableTextureResource(e);if(a){var o=this._textures[e.uid];o||(o=new O(a,t+"_"+e.uid+"_tex",{mipmap:!0,wrap:{s:10497,t:10497},noUnpackFlip:!0}),this._textures[e.uid]=o,this._context.stage.add(y.ModelContentType.TEXTURE,o)),r.textureId=o.id}},t.prototype._setInternalMaterialParameters=function(e,t,r){var a=e.material&&e.material.color;if(a)switch(a.type){case"value":this._setInternalColorValueParameters(a,r);break;case"image":this._setInternalColorImageParameters(a,t,r)}},t.prototype._setExternalMaterialParameters=function(e){if(this._isPropertyDriven("color"))e.externalColor=P;else{var t=this.symbol.material?a.toUnitRGBA(this.symbol.material.color):P;e.externalColor=t}var r=this.symbol.material&&this.symbol.material.colorMixMode;r&&(e.colorMixMode=r)},t.prototype._hasTransparentVertexColors=function(e){var t=e.vertexAttributes.color;if(!t)return!1;for(var r=3;r<t.length;r+=4)if(255!==t[r])return!0;return!1},t.prototype._getOrCreateMaterial=function(e,t){var r=this._hasTransparentVertexColors(e)||!!t.get("material.color.transparent"),a=this._materialProperties(e,t,r),o=this._materials[a.uid];if(o)return o.material;var n=this._getStageIdHint(),i={specular:I,vertexColors:a.hasVertexColors,symbolColors:a.hasSymbolVertexColors,ambient:I,diffuse:N,opacity:1,doubleSided:!0,doubleSidedType:"winding-order",cullFace:"none",layerOpacity:this._getLayerOpacity(),slicePlaneEnabled:this._context.slicePlaneEnabled,textureInitTransparent:!0};this._setInternalMaterialParameters(t,n,i),this._setExternalMaterialParameters(i),this._setMaterialTransparentParameter(i,r);var s=new A(i,n+"_"+a.uid+"_mat");return this._materials[a.uid]={material:s,isComponentTransparent:r},this._context.stage.add(y.ModelContentType.MATERIAL,s),s},t.prototype._setMaterialTransparentParameter=function(e,t){var r=this._isPropertyDriven("opacity");e.transparent=r||t||e.layerOpacity<1||e.opacity<1||e.externalColor&&e.externalColor[3]<1},t.prototype._addDebugNormals=function(e,t,r,a){for(var o,n,s,l,c=t.length,u=e.spatialReference.isWGS84?20015077/180:1,p=.1*Math.max(e.extent.width*u,e.extent.height*u,e.extent.zmax-e.extent.zmin),m=[],h=[],f=[],d=[],g=0;g<c;g++)for(var v=t[g],_=v.data.getAttribute(S.POSITION),y=v.data.getAttribute(S.NORMAL),C=v.data.getIndices(S.POSITION),O=v.data.getIndices(S.NORMAL),w=_.data,A=y.data,M=0;M<C.length;M++){for(var E=3*C[M],N=3*O[M],P=0;P<3;P++)m.push(w[E+P]);for(var P=0;P<3;P++)m.push(w[E+P]+A[N+P]*p);if(h.push(h.length),h.push(h.length),M%3==0){this._calculateFaceNormal(w,C,M,V),this._getFaceVertices(w,C,M,R,F,U),i.vec3.add(R,R,F),i.vec3.add(R,R,U),i.vec3.scale(R,R,1/3);for(var P=0;P<3;P++)f.push(R[P]);for(var P=0;P<3;P++)f.push(R[P]+V[P]*p);d.push(d.length),d.push(d.length)}}var I=(o={},o[S.POSITION]={data:new Float64Array(m),size:3},o),T=(n={},n[S.POSITION]=new Uint32Array(h),n),B=new x(I,T,void 0,"line"),L=new b(B,"debugVertexNormal");L.singleUse=!0,t.push(L),r.push(this._debugVertexNormalMaterial),a.push(i.mat4f64.clone(a[0]));var I=(s={},s[S.POSITION]={data:new Float64Array(f),size:3},s),T=(l={},l[S.POSITION]=new Uint32Array(d),l),B=new x(I,T,void 0,"line"),L=new b(B,"debugFaceNormal");L.singleUse=!0,t.push(L),r.push(this._debugFaceNormalMaterial),a.push(i.mat4f64.clone(a[0]))},t.prototype._createAs3DShape=function(e,t,r,a,n){var i=this,s=e.geometry;if("mesh"!==s.type)return null;var l=this._createGeometryInfo(s,t,a);if(!l)return null;var c=l.geometries,u=l.materials,f=l.transformations,d=l.objectTransformation;v.DRAW_MESH_GEOMETRY_NORMALS&&this._addDebugNormals(s,c,u,f);var g=new C({geometries:c,materials:u,transformations:f,castShadow:!0,metadata:{layerUid:this._context.layer.uid,graphicUid:n},idHint:a});g.setObjectTransformation(d);var _=function(e){var t=i._context.stage.view.getEdgeView();if(t){t.removeObject(e),i._edgeStageObjects.delete(e);var r=i._createEdgeMaterial(t);o.isSome(r)&&(i._edgeStageObjects.add(e),t.addObject(e,[r],{slicePlaneEnabled:i._context.slicePlaneEnabled},{mergeGeometries:!0}))}};_(g);var y=function(e,t,r,a,o){var n=p.perObjectElevationAligner(e,t,r,a,o);return _(g),n},b=new m(this,g,c,null,null,y,r);b.needsElevationUpdates=h.needsElevationUpdates3D(r.mode);var x=s.extent.center.clone();return x.z=0,b.elevationContext.centerPointInElevationSR=x,b.alignedTerrainElevation=y(b,b.elevationContext,this._context.elevationProvider,this._context.renderCoordsHelper,this._context.featureExpressionInfoContext),b},t.prototype._createComponentNormals=function(e,t,r,a){var o=r.shading||"flat";switch(o){case"source":return this._createComponentNormalsSource(e,t,r,a);case"flat":return this._createComponentNormalsFlat(e,r,a);case"smooth":return this._createComponentNormalsSmooth(e,r,a);default:n.neverReached(o)}},t.prototype._createComponentNormalsSource=function(e,t,r,a){if(!t)return this._createComponentNormalsFlat(e,r,a);for(var o=!1,n=0;n<a.length;n+=3){this._calculateFaceNormal(e,a,n,V);for(var s=0;s<3;s++){var l=3*a[n+s];R[0]=t[l+0],R[1]=t[l+1],R[2]=t[l+2],i.vec3.dot(V,R)<0&&(t[l+0]=-t[l+0],t[l+1]=-t[l+1],t[l+2]=-t[l+2],o=!0)}}return{normals:t,indices:a,didFlipNormals:o}},t.prototype._createComponentNormalsFlat=function(e,t,r){for(var a=new Float32Array(r.length),o=new Uint32Array(3*r.length),n=0;n<r.length;n+=3)for(var i=this._calculateFaceNormal(e,r,n,V),s=0;s<3;s++)a[n+s]=i[s],o[n+s]=n/3;return{normals:a,indices:o,didFlipNormals:!1}},t.prototype._createComponentNormalsSmooth=function(e,t,r){for(var a={},o=0;o<r.length;o+=3)for(var n=this._calculateFaceNormal(e,r,o,V),s=0;s<3;s++){var l=r[o+s],c=a[l];c||(c={normal:i.vec3f64.create(),count:0},a[l]=c),i.vec3.add(c.normal,c.normal,n),c.count++}for(var u=new Float32Array(3*r.length),p=new Uint32Array(3*r.length),o=0;o<r.length;o++){var l=r[o],c=a[l];1!==c.count&&(i.vec3.normalize(c.normal,c.normal),c.count=1);for(var s=0;s<3;s++)u[3*o+s]=c.normal[s];p[o]=o}return{normals:u,indices:p,didFlipNormals:!1}},t.prototype._getFaceVertices=function(e,t,r,a,o,n){var i=3*t[r+0],s=3*t[r+1],l=3*t[r+2];a[0]=e[i+0],a[1]=e[i+1],a[2]=e[i+2],o[0]=e[s+0],o[1]=e[s+1],o[2]=e[s+2],n[0]=e[l+0],n[1]=e[l+1],n[2]=e[l+2]},t.prototype._calculateFaceNormal=function(e,t,r,a){return this._getFaceVertices(e,t,r,R,F,U),i.vec3.subtract(F,F,R),i.vec3.subtract(U,U,R),i.vec3.cross(R,F,U),i.vec3.normalize(a,R),a},t.prototype._getOrCreateComponents=function(e){return e.components?e.components:D},t.prototype._createPositionBuffer=function(e){var t=e.vertexAttributes.position,r=new Float64Array(t.length),a=this._context.renderSpatialReference;return h.reproject(e.vertexAttributes.position,0,e.spatialReference,r,0,a,t.length/3),r},t.prototype._createNormalBuffer=function(e,t){var r=e.vertexAttributes.normal;if(!r)return null;if("local"===this._context.layerView.view.viewingMode)return r;var a=e.vertexAttributes.position,o=new Float32Array(r.length);return u.projectNormalToECEF(r,a,t,e.spatialReference,o)},t.prototype._createColorBuffer=function(e){return e.vertexAttributes.color},t.prototype._createSymbolColorBuffer=function(e){if(this._requiresSymbolVertexColors()){var t=this._getVertexOpacityAndColor(e),r=this.symbol.material&&this.symbol.material.colorMixMode||null,a=new Uint8Array(4);return g.encodeSymbolColor(t,r,a),a}return null},t.prototype._createColorIndices=function(e,t){for(var r=new Uint32Array(t.length),a=0;a<r.length;a++)r[a]=0;return r},t.prototype._createBuffers=function(e,t){var r=e.vertexAttributes&&e.vertexAttributes.position;if(!r)return this._logWarning("Mesh geometry must contain position vertex attributes"),null;var a=e.vertexAttributes.normal,o=e.vertexAttributes.uv;if(a&&a.length!==r.length)return this._logWarning("Mesh normal vertex buffer must contain the same number of elements as the position buffer"),null;if(o&&o.length/2!=r.length/3)return this._logWarning("Mesh uv vertex buffer must contain the same number of elements as the position buffer"),null;var n=this._createPositionBuffer(e),i=this._createColorBuffer(e),s=this._createSymbolColorBuffer(t),l=this._createNormalBuffer(e,n);return{positionBuffer:n,normalBuffer:l,uvBuffer:o,colorBuffer:i,symbolColorBuffer:s,objectTransformation:this._transformCenterLocal(e,n,l)}},t.prototype._transformCenterLocal=function(e,t,r){var a=e.extent.center,o=this._context.renderSpatialReference;T[0]=a.x,T[1]=a.y,T[2]=0;var n=i.mat4f64.create();_.computeLinearTransformation(e.spatialReference,T,n,o),i.mat4.invert(B,n);for(var s=0;s<t.length;s+=3)R[0]=t[s+0],R[1]=t[s+1],R[2]=t[s+2],i.vec3.transformMat4(R,R,B),t[s+0]=R[0],t[s+1]=R[1],t[s+2]=R[2];if(r){i.mat3.fromMat4(L,n),i.mat3.transpose(L,L);for(var s=0;s<r.length;s+=3)R[0]=r[s+0],R[1]=r[s+1],R[2]=r[s+2],i.vec3.transformMat3(R,R,L),r[s+0]=R[0],r[s+1]=R[1],r[s+2]=R[2]}return n},t.prototype._validateFaces=function(e,t){var r=e.vertexAttributes.position.length/3,a=t.faces;if(a){for(var o=-1,n=0;n<a.length;n++){var i=a[n];i>o&&(o=i)}if(r<=o)return this._logWarning("Vertex index "+o+" is out of bounds of the mesh position buffer"),!1}else if(r%3!=0)return this._logWarning("Mesh position buffer length must be a multiple of 9 if no component faces are defined (3 values per vertex * 3 vertices per triangle)"),!1;return!0},t.prototype._getOrCreateFaces=function(e,t){if(t.faces)return t.faces;for(var r=new Uint32Array(e.vertexAttributes.position.length/3),a=0;a<r.length;a++)r[a]=a;return r},t.prototype._isOutsideClippingArea=function(e){if(!this._context.clippingExtent)return!1;var t=e.vertexAttributes&&e.vertexAttributes.position;if(!t)return!1;var r,a=this._context.elevationProvider.spatialReference,o=t.length/3;return e.spatialReference.equals(a)?r=t:(r=new Float64Array(t.length),h.reproject(e.vertexAttributes.position,0,e.spatialReference,r,0,a,o)),h.computeBoundingBox(r,0,o,j),h.boundingBoxClipped(j,this._context.clippingExtent)},t.prototype._createGeometryInfo=function(e,t,r){var a,o;if(!c.canProject(e,this._context.layerView.view.spatialReference))return this._logWarning("Geometry spatial reference is not compatible with the view"),null;if(this._isOutsideClippingArea(e))return null;var n=this._createBuffers(e,t);if(!n)return null;for(var s=n.positionBuffer,l=n.uvBuffer,u=n.colorBuffer,p=n.symbolColorBuffer,m=n.normalBuffer,h=n.objectTransformation,f=this._getOrCreateComponents(e),d=[],g=[],v=[],_=!1,y=0,C=f;y<C.length;y++){var O=C[y];if(!this._validateFaces(e,O))return null;var w=this._getOrCreateFaces(e,O);if(0!==w.length){var A=this._createComponentNormals(s,m,O,w);A.didFlipNormals&&(_=!0);var M=(a={},a[S.POSITION]={size:3,data:s},a[S.NORMAL]={size:3,data:A.normals},a),E=(o={},o[S.POSITION]=w,o[S.NORMAL]=A.indices,o);u&&(M[S.COLOR]={size:4,data:u},E[S.COLOR]=w),p&&(M[S.SYMBOLCOLOR]={size:4,data:p},E[S.SYMBOLCOLOR]=this._createColorIndices(O,w)),e.vertexAttributes.uv&&(M[S.UV0]={size:2,data:l},E[S.UV0]=w);var N=new x(M,E),P=new b(N,r+"_mesh");P.singleUse=!0,d.push(P),g.push(i.mat4f64.create()),v.push(this._getOrCreateMaterial(e,O))}}return _&&this._logWarning("Normals have been automatically flipped to be consistent with the counter clock wise face winding order. It is better to generate mesh geometries that have consistent normals."),{geometries:d,transformations:g,materials:v,objectTransformation:h}},t.prototype._createEdgeMaterial=function(e){var t={opacity:this._getLayerOpacity()};return d.createMaterial(e,this.symbol,t)},t}(f),N=[1,1,1],P=[1,1,1,1],I=[0,0,0],T=i.vec3f64.create(),R=i.vec3f64.create(),F=i.vec3f64.create(),U=i.vec3f64.create(),V=i.vec3f64.create(),B=i.mat4f64.create(),L=i.mat3f64.create(),j=s.create(),D=[new l];return E});
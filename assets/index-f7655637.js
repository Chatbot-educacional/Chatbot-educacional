function Nx(e,t){for(var n=0;n<t.length;n++){const r=t[n];if(typeof r!="string"&&!Array.isArray(r)){for(const o in r)if(o!=="default"&&!(o in e)){const i=Object.getOwnPropertyDescriptor(r,o);i&&Object.defineProperty(e,o,i.get?i:{enumerable:!0,get:()=>r[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();var kn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Ac(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Fy={exports:{}},jc={},zy={exports:{}},pe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var la=Symbol.for("react.element"),Ax=Symbol.for("react.portal"),jx=Symbol.for("react.fragment"),Rx=Symbol.for("react.strict_mode"),Mx=Symbol.for("react.profiler"),Lx=Symbol.for("react.provider"),Dx=Symbol.for("react.context"),$x=Symbol.for("react.forward_ref"),Fx=Symbol.for("react.suspense"),zx=Symbol.for("react.memo"),Ux=Symbol.for("react.lazy"),Bm=Symbol.iterator;function Vx(e){return e===null||typeof e!="object"?null:(e=Bm&&e[Bm]||e["@@iterator"],typeof e=="function"?e:null)}var Uy={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Vy=Object.assign,By={};function Oi(e,t,n){this.props=e,this.context=t,this.refs=By,this.updater=n||Uy}Oi.prototype.isReactComponent={};Oi.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Oi.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Wy(){}Wy.prototype=Oi.prototype;function df(e,t,n){this.props=e,this.context=t,this.refs=By,this.updater=n||Uy}var hf=df.prototype=new Wy;hf.constructor=df;Vy(hf,Oi.prototype);hf.isPureReactComponent=!0;var Wm=Array.isArray,qy=Object.prototype.hasOwnProperty,ff={current:null},Hy={key:!0,ref:!0,__self:!0,__source:!0};function Gy(e,t,n){var r,o={},i=null,s=null;if(t!=null)for(r in t.ref!==void 0&&(s=t.ref),t.key!==void 0&&(i=""+t.key),t)qy.call(t,r)&&!Hy.hasOwnProperty(r)&&(o[r]=t[r]);var a=arguments.length-2;if(a===1)o.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];o.children=l}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)o[r]===void 0&&(o[r]=a[r]);return{$$typeof:la,type:e,key:i,ref:s,props:o,_owner:ff.current}}function Bx(e,t){return{$$typeof:la,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function pf(e){return typeof e=="object"&&e!==null&&e.$$typeof===la}function Wx(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var qm=/\/+/g;function Mu(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Wx(""+e.key):t.toString(36)}function dl(e,t,n,r,o){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(i){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case la:case Ax:s=!0}}if(s)return s=e,o=o(s),e=r===""?"."+Mu(s,0):r,Wm(o)?(n="",e!=null&&(n=e.replace(qm,"$&/")+"/"),dl(o,t,n,"",function(c){return c})):o!=null&&(pf(o)&&(o=Bx(o,n+(!o.key||s&&s.key===o.key?"":(""+o.key).replace(qm,"$&/")+"/")+e)),t.push(o)),1;if(s=0,r=r===""?".":r+":",Wm(e))for(var a=0;a<e.length;a++){i=e[a];var l=r+Mu(i,a);s+=dl(i,t,n,l,o)}else if(l=Vx(e),typeof l=="function")for(e=l.call(e),a=0;!(i=e.next()).done;)i=i.value,l=r+Mu(i,a++),s+=dl(i,t,n,l,o);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return s}function $a(e,t,n){if(e==null)return e;var r=[],o=0;return dl(e,r,"","",function(i){return t.call(n,i,o++)}),r}function qx(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var zt={current:null},hl={transition:null},Hx={ReactCurrentDispatcher:zt,ReactCurrentBatchConfig:hl,ReactCurrentOwner:ff};pe.Children={map:$a,forEach:function(e,t,n){$a(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return $a(e,function(){t++}),t},toArray:function(e){return $a(e,function(t){return t})||[]},only:function(e){if(!pf(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};pe.Component=Oi;pe.Fragment=jx;pe.Profiler=Mx;pe.PureComponent=df;pe.StrictMode=Rx;pe.Suspense=Fx;pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Hx;pe.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Vy({},e.props),o=e.key,i=e.ref,s=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,s=ff.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(l in t)qy.call(t,l)&&!Hy.hasOwnProperty(l)&&(r[l]=t[l]===void 0&&a!==void 0?a[l]:t[l])}var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];r.children=a}return{$$typeof:la,type:e.type,key:o,ref:i,props:r,_owner:s}};pe.createContext=function(e){return e={$$typeof:Dx,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Lx,_context:e},e.Consumer=e};pe.createElement=Gy;pe.createFactory=function(e){var t=Gy.bind(null,e);return t.type=e,t};pe.createRef=function(){return{current:null}};pe.forwardRef=function(e){return{$$typeof:$x,render:e}};pe.isValidElement=pf;pe.lazy=function(e){return{$$typeof:Ux,_payload:{_status:-1,_result:e},_init:qx}};pe.memo=function(e,t){return{$$typeof:zx,type:e,compare:t===void 0?null:t}};pe.startTransition=function(e){var t=hl.transition;hl.transition={};try{e()}finally{hl.transition=t}};pe.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")};pe.useCallback=function(e,t){return zt.current.useCallback(e,t)};pe.useContext=function(e){return zt.current.useContext(e)};pe.useDebugValue=function(){};pe.useDeferredValue=function(e){return zt.current.useDeferredValue(e)};pe.useEffect=function(e,t){return zt.current.useEffect(e,t)};pe.useId=function(){return zt.current.useId()};pe.useImperativeHandle=function(e,t,n){return zt.current.useImperativeHandle(e,t,n)};pe.useInsertionEffect=function(e,t){return zt.current.useInsertionEffect(e,t)};pe.useLayoutEffect=function(e,t){return zt.current.useLayoutEffect(e,t)};pe.useMemo=function(e,t){return zt.current.useMemo(e,t)};pe.useReducer=function(e,t,n){return zt.current.useReducer(e,t,n)};pe.useRef=function(e){return zt.current.useRef(e)};pe.useState=function(e){return zt.current.useState(e)};pe.useSyncExternalStore=function(e,t,n){return zt.current.useSyncExternalStore(e,t,n)};pe.useTransition=function(){return zt.current.useTransition()};pe.version="18.2.0";zy.exports=pe;var I=zy.exports;const Se=Ac(I),Gx=Nx({__proto__:null,default:Se},[I]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Kx=I,Qx=Symbol.for("react.element"),Jx=Symbol.for("react.fragment"),Xx=Object.prototype.hasOwnProperty,Yx=Kx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Zx={key:!0,ref:!0,__self:!0,__source:!0};function Ky(e,t,n){var r,o={},i=null,s=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(s=t.ref);for(r in t)Xx.call(t,r)&&!Zx.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:Qx,type:e,key:i,ref:s,props:o,_owner:Yx.current}}jc.Fragment=Jx;jc.jsx=Ky;jc.jsxs=Ky;Fy.exports=jc;var u=Fy.exports,Fd={},Qy={exports:{}},sn={},Jy={exports:{}},Xy={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(D,S){var x=D.length;D.push(S);e:for(;0<x;){var j=x-1>>>1,L=D[j];if(0<o(L,S))D[j]=S,D[x]=L,x=j;else break e}}function n(D){return D.length===0?null:D[0]}function r(D){if(D.length===0)return null;var S=D[0],x=D.pop();if(x!==S){D[0]=x;e:for(var j=0,L=D.length,E=L>>>1;j<E;){var N=2*(j+1)-1,F=D[N],q=N+1,X=D[q];if(0>o(F,x))q<L&&0>o(X,F)?(D[j]=X,D[q]=x,j=q):(D[j]=F,D[N]=x,j=N);else if(q<L&&0>o(X,x))D[j]=X,D[q]=x,j=q;else break e}}return S}function o(D,S){var x=D.sortIndex-S.sortIndex;return x!==0?x:D.id-S.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var s=Date,a=s.now();e.unstable_now=function(){return s.now()-a}}var l=[],c=[],d=1,h=null,f=3,g=!1,y=!1,w=!1,C=typeof setTimeout=="function"?setTimeout:null,m=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(D){for(var S=n(c);S!==null;){if(S.callback===null)r(c);else if(S.startTime<=D)r(c),S.sortIndex=S.expirationTime,t(l,S);else break;S=n(c)}}function b(D){if(w=!1,v(D),!y)if(n(l)!==null)y=!0,re(k);else{var S=n(c);S!==null&&ye(b,S.startTime-D)}}function k(D,S){y=!1,w&&(w=!1,m(T),T=-1),g=!0;var x=f;try{for(v(S),h=n(l);h!==null&&(!(h.expirationTime>S)||D&&!_());){var j=h.callback;if(typeof j=="function"){h.callback=null,f=h.priorityLevel;var L=j(h.expirationTime<=S);S=e.unstable_now(),typeof L=="function"?h.callback=L:h===n(l)&&r(l),v(S)}else r(l);h=n(l)}if(h!==null)var E=!0;else{var N=n(c);N!==null&&ye(b,N.startTime-S),E=!1}return E}finally{h=null,f=x,g=!1}}var P=!1,R=null,T=-1,Q=5,A=-1;function _(){return!(e.unstable_now()-A<Q)}function O(){if(R!==null){var D=e.unstable_now();A=D;var S=!0;try{S=R(!0,D)}finally{S?W():(P=!1,R=null)}}else P=!1}var W;if(typeof p=="function")W=function(){p(O)};else if(typeof MessageChannel<"u"){var V=new MessageChannel,K=V.port2;V.port1.onmessage=O,W=function(){K.postMessage(null)}}else W=function(){C(O,0)};function re(D){R=D,P||(P=!0,W())}function ye(D,S){T=C(function(){D(e.unstable_now())},S)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(D){D.callback=null},e.unstable_continueExecution=function(){y||g||(y=!0,re(k))},e.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):Q=0<D?Math.floor(1e3/D):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return n(l)},e.unstable_next=function(D){switch(f){case 1:case 2:case 3:var S=3;break;default:S=f}var x=f;f=S;try{return D()}finally{f=x}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(D,S){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var x=f;f=D;try{return S()}finally{f=x}},e.unstable_scheduleCallback=function(D,S,x){var j=e.unstable_now();switch(typeof x=="object"&&x!==null?(x=x.delay,x=typeof x=="number"&&0<x?j+x:j):x=j,D){case 1:var L=-1;break;case 2:L=250;break;case 5:L=1073741823;break;case 4:L=1e4;break;default:L=5e3}return L=x+L,D={id:d++,callback:S,priorityLevel:D,startTime:x,expirationTime:L,sortIndex:-1},x>j?(D.sortIndex=x,t(c,D),n(l)===null&&D===n(c)&&(w?(m(T),T=-1):w=!0,ye(b,x-j))):(D.sortIndex=L,t(l,D),y||g||(y=!0,re(k))),D},e.unstable_shouldYield=_,e.unstable_wrapCallback=function(D){var S=f;return function(){var x=f;f=S;try{return D.apply(this,arguments)}finally{f=x}}}})(Xy);Jy.exports=Xy;var e_=Jy.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Yy=I,nn=e_;function M(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Zy=new Set,_s={};function Po(e,t){mi(e,t),mi(e+"Capture",t)}function mi(e,t){for(_s[e]=t,e=0;e<t.length;e++)Zy.add(t[e])}var er=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),zd=Object.prototype.hasOwnProperty,t_=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Hm={},Gm={};function n_(e){return zd.call(Gm,e)?!0:zd.call(Hm,e)?!1:t_.test(e)?Gm[e]=!0:(Hm[e]=!0,!1)}function r_(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function o_(e,t,n,r){if(t===null||typeof t>"u"||r_(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Ut(e,t,n,r,o,i,s){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=s}var Et={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Et[e]=new Ut(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Et[t]=new Ut(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Et[e]=new Ut(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Et[e]=new Ut(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Et[e]=new Ut(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Et[e]=new Ut(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Et[e]=new Ut(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Et[e]=new Ut(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Et[e]=new Ut(e,5,!1,e.toLowerCase(),null,!1,!1)});var mf=/[\-:]([a-z])/g;function gf(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(mf,gf);Et[t]=new Ut(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(mf,gf);Et[t]=new Ut(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(mf,gf);Et[t]=new Ut(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Et[e]=new Ut(e,1,!1,e.toLowerCase(),null,!1,!1)});Et.xlinkHref=new Ut("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Et[e]=new Ut(e,1,!1,e.toLowerCase(),null,!0,!0)});function vf(e,t,n,r){var o=Et.hasOwnProperty(t)?Et[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(o_(t,n,o,r)&&(n=null),r||o===null?n_(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var lr=Yy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Fa=Symbol.for("react.element"),Uo=Symbol.for("react.portal"),Vo=Symbol.for("react.fragment"),yf=Symbol.for("react.strict_mode"),Ud=Symbol.for("react.profiler"),e0=Symbol.for("react.provider"),t0=Symbol.for("react.context"),wf=Symbol.for("react.forward_ref"),Vd=Symbol.for("react.suspense"),Bd=Symbol.for("react.suspense_list"),Ef=Symbol.for("react.memo"),pr=Symbol.for("react.lazy"),n0=Symbol.for("react.offscreen"),Km=Symbol.iterator;function Ui(e){return e===null||typeof e!="object"?null:(e=Km&&e[Km]||e["@@iterator"],typeof e=="function"?e:null)}var We=Object.assign,Lu;function es(e){if(Lu===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Lu=t&&t[1]||""}return`
`+Lu+e}var Du=!1;function $u(e,t){if(!e||Du)return"";Du=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(c){var r=c}Reflect.construct(e,[],t)}else{try{t.call()}catch(c){r=c}e.call(t.prototype)}else{try{throw Error()}catch(c){r=c}e()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var o=c.stack.split(`
`),i=r.stack.split(`
`),s=o.length-1,a=i.length-1;1<=s&&0<=a&&o[s]!==i[a];)a--;for(;1<=s&&0<=a;s--,a--)if(o[s]!==i[a]){if(s!==1||a!==1)do if(s--,a--,0>a||o[s]!==i[a]){var l=`
`+o[s].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=s&&0<=a);break}}}finally{Du=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?es(e):""}function i_(e){switch(e.tag){case 5:return es(e.type);case 16:return es("Lazy");case 13:return es("Suspense");case 19:return es("SuspenseList");case 0:case 2:case 15:return e=$u(e.type,!1),e;case 11:return e=$u(e.type.render,!1),e;case 1:return e=$u(e.type,!0),e;default:return""}}function Wd(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Vo:return"Fragment";case Uo:return"Portal";case Ud:return"Profiler";case yf:return"StrictMode";case Vd:return"Suspense";case Bd:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case t0:return(e.displayName||"Context")+".Consumer";case e0:return(e._context.displayName||"Context")+".Provider";case wf:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ef:return t=e.displayName||null,t!==null?t:Wd(e.type)||"Memo";case pr:t=e._payload,e=e._init;try{return Wd(e(t))}catch{}}return null}function s_(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Wd(t);case 8:return t===yf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Dr(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function r0(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function a_(e){var t=r0(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(s){r=""+s,i.call(this,s)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(s){r=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function za(e){e._valueTracker||(e._valueTracker=a_(e))}function o0(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=r0(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Nl(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function qd(e,t){var n=t.checked;return We({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Qm(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Dr(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function i0(e,t){t=t.checked,t!=null&&vf(e,"checked",t,!1)}function Hd(e,t){i0(e,t);var n=Dr(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Gd(e,t.type,n):t.hasOwnProperty("defaultValue")&&Gd(e,t.type,Dr(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Jm(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Gd(e,t,n){(t!=="number"||Nl(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var ts=Array.isArray;function ni(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Dr(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function Kd(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(M(91));return We({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Xm(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(M(92));if(ts(n)){if(1<n.length)throw Error(M(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Dr(n)}}function s0(e,t){var n=Dr(t.value),r=Dr(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Ym(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function a0(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Qd(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?a0(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Ua,l0=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Ua=Ua||document.createElement("div"),Ua.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ua.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function bs(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var as={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},l_=["Webkit","ms","Moz","O"];Object.keys(as).forEach(function(e){l_.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),as[t]=as[e]})});function c0(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||as.hasOwnProperty(e)&&as[e]?(""+t).trim():t+"px"}function u0(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=c0(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var c_=We({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Jd(e,t){if(t){if(c_[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(M(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(M(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(M(61))}if(t.style!=null&&typeof t.style!="object")throw Error(M(62))}}function Xd(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Yd=null;function Sf(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Zd=null,ri=null,oi=null;function Zm(e){if(e=da(e)){if(typeof Zd!="function")throw Error(M(280));var t=e.stateNode;t&&(t=$c(t),Zd(e.stateNode,e.type,t))}}function d0(e){ri?oi?oi.push(e):oi=[e]:ri=e}function h0(){if(ri){var e=ri,t=oi;if(oi=ri=null,Zm(e),t)for(e=0;e<t.length;e++)Zm(t[e])}}function f0(e,t){return e(t)}function p0(){}var Fu=!1;function m0(e,t,n){if(Fu)return e(t,n);Fu=!0;try{return f0(e,t,n)}finally{Fu=!1,(ri!==null||oi!==null)&&(p0(),h0())}}function Cs(e,t){var n=e.stateNode;if(n===null)return null;var r=$c(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(M(231,t,typeof n));return n}var eh=!1;if(er)try{var Vi={};Object.defineProperty(Vi,"passive",{get:function(){eh=!0}}),window.addEventListener("test",Vi,Vi),window.removeEventListener("test",Vi,Vi)}catch{eh=!1}function u_(e,t,n,r,o,i,s,a,l){var c=Array.prototype.slice.call(arguments,3);try{t.apply(n,c)}catch(d){this.onError(d)}}var ls=!1,Al=null,jl=!1,th=null,d_={onError:function(e){ls=!0,Al=e}};function h_(e,t,n,r,o,i,s,a,l){ls=!1,Al=null,u_.apply(d_,arguments)}function f_(e,t,n,r,o,i,s,a,l){if(h_.apply(this,arguments),ls){if(ls){var c=Al;ls=!1,Al=null}else throw Error(M(198));jl||(jl=!0,th=c)}}function No(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function g0(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function eg(e){if(No(e)!==e)throw Error(M(188))}function p_(e){var t=e.alternate;if(!t){if(t=No(e),t===null)throw Error(M(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var i=o.alternate;if(i===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===n)return eg(o),e;if(i===r)return eg(o),t;i=i.sibling}throw Error(M(188))}if(n.return!==r.return)n=o,r=i;else{for(var s=!1,a=o.child;a;){if(a===n){s=!0,n=o,r=i;break}if(a===r){s=!0,r=o,n=i;break}a=a.sibling}if(!s){for(a=i.child;a;){if(a===n){s=!0,n=i,r=o;break}if(a===r){s=!0,r=i,n=o;break}a=a.sibling}if(!s)throw Error(M(189))}}if(n.alternate!==r)throw Error(M(190))}if(n.tag!==3)throw Error(M(188));return n.stateNode.current===n?e:t}function v0(e){return e=p_(e),e!==null?y0(e):null}function y0(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=y0(e);if(t!==null)return t;e=e.sibling}return null}var w0=nn.unstable_scheduleCallback,tg=nn.unstable_cancelCallback,m_=nn.unstable_shouldYield,g_=nn.unstable_requestPaint,Ke=nn.unstable_now,v_=nn.unstable_getCurrentPriorityLevel,xf=nn.unstable_ImmediatePriority,E0=nn.unstable_UserBlockingPriority,Rl=nn.unstable_NormalPriority,y_=nn.unstable_LowPriority,S0=nn.unstable_IdlePriority,Rc=null,Mn=null;function w_(e){if(Mn&&typeof Mn.onCommitFiberRoot=="function")try{Mn.onCommitFiberRoot(Rc,e,void 0,(e.current.flags&128)===128)}catch{}}var Cn=Math.clz32?Math.clz32:x_,E_=Math.log,S_=Math.LN2;function x_(e){return e>>>=0,e===0?32:31-(E_(e)/S_|0)|0}var Va=64,Ba=4194304;function ns(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ml(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,i=e.pingedLanes,s=n&268435455;if(s!==0){var a=s&~o;a!==0?r=ns(a):(i&=s,i!==0&&(r=ns(i)))}else s=n&~o,s!==0?r=ns(s):i!==0&&(r=ns(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&o)&&(o=r&-r,i=t&-t,o>=i||o===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Cn(t),o=1<<n,r|=e[n],t&=~o;return r}function __(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function b_(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var s=31-Cn(i),a=1<<s,l=o[s];l===-1?(!(a&n)||a&r)&&(o[s]=__(a,t)):l<=t&&(e.expiredLanes|=a),i&=~a}}function nh(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function x0(){var e=Va;return Va<<=1,!(Va&4194240)&&(Va=64),e}function zu(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ca(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Cn(t),e[t]=n}function C_(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-Cn(n),i=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~i}}function _f(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Cn(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var Pe=0;function _0(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var b0,bf,C0,I0,k0,rh=!1,Wa=[],Ir=null,kr=null,Tr=null,Is=new Map,ks=new Map,gr=[],I_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ng(e,t){switch(e){case"focusin":case"focusout":Ir=null;break;case"dragenter":case"dragleave":kr=null;break;case"mouseover":case"mouseout":Tr=null;break;case"pointerover":case"pointerout":Is.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":ks.delete(t.pointerId)}}function Bi(e,t,n,r,o,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[o]},t!==null&&(t=da(t),t!==null&&bf(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function k_(e,t,n,r,o){switch(t){case"focusin":return Ir=Bi(Ir,e,t,n,r,o),!0;case"dragenter":return kr=Bi(kr,e,t,n,r,o),!0;case"mouseover":return Tr=Bi(Tr,e,t,n,r,o),!0;case"pointerover":var i=o.pointerId;return Is.set(i,Bi(Is.get(i)||null,e,t,n,r,o)),!0;case"gotpointercapture":return i=o.pointerId,ks.set(i,Bi(ks.get(i)||null,e,t,n,r,o)),!0}return!1}function T0(e){var t=no(e.target);if(t!==null){var n=No(t);if(n!==null){if(t=n.tag,t===13){if(t=g0(n),t!==null){e.blockedOn=t,k0(e.priority,function(){C0(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function fl(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=oh(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Yd=r,n.target.dispatchEvent(r),Yd=null}else return t=da(n),t!==null&&bf(t),e.blockedOn=n,!1;t.shift()}return!0}function rg(e,t,n){fl(e)&&n.delete(t)}function T_(){rh=!1,Ir!==null&&fl(Ir)&&(Ir=null),kr!==null&&fl(kr)&&(kr=null),Tr!==null&&fl(Tr)&&(Tr=null),Is.forEach(rg),ks.forEach(rg)}function Wi(e,t){e.blockedOn===t&&(e.blockedOn=null,rh||(rh=!0,nn.unstable_scheduleCallback(nn.unstable_NormalPriority,T_)))}function Ts(e){function t(o){return Wi(o,e)}if(0<Wa.length){Wi(Wa[0],e);for(var n=1;n<Wa.length;n++){var r=Wa[n];r.blockedOn===e&&(r.blockedOn=null)}}for(Ir!==null&&Wi(Ir,e),kr!==null&&Wi(kr,e),Tr!==null&&Wi(Tr,e),Is.forEach(t),ks.forEach(t),n=0;n<gr.length;n++)r=gr[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<gr.length&&(n=gr[0],n.blockedOn===null);)T0(n),n.blockedOn===null&&gr.shift()}var ii=lr.ReactCurrentBatchConfig,Ll=!0;function O_(e,t,n,r){var o=Pe,i=ii.transition;ii.transition=null;try{Pe=1,Cf(e,t,n,r)}finally{Pe=o,ii.transition=i}}function P_(e,t,n,r){var o=Pe,i=ii.transition;ii.transition=null;try{Pe=4,Cf(e,t,n,r)}finally{Pe=o,ii.transition=i}}function Cf(e,t,n,r){if(Ll){var o=oh(e,t,n,r);if(o===null)Ju(e,t,r,Dl,n),ng(e,r);else if(k_(o,e,t,n,r))r.stopPropagation();else if(ng(e,r),t&4&&-1<I_.indexOf(e)){for(;o!==null;){var i=da(o);if(i!==null&&b0(i),i=oh(e,t,n,r),i===null&&Ju(e,t,r,Dl,n),i===o)break;o=i}o!==null&&r.stopPropagation()}else Ju(e,t,r,null,n)}}var Dl=null;function oh(e,t,n,r){if(Dl=null,e=Sf(r),e=no(e),e!==null)if(t=No(e),t===null)e=null;else if(n=t.tag,n===13){if(e=g0(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Dl=e,null}function O0(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(v_()){case xf:return 1;case E0:return 4;case Rl:case y_:return 16;case S0:return 536870912;default:return 16}default:return 16}}var xr=null,If=null,pl=null;function P0(){if(pl)return pl;var e,t=If,n=t.length,r,o="value"in xr?xr.value:xr.textContent,i=o.length;for(e=0;e<n&&t[e]===o[e];e++);var s=n-e;for(r=1;r<=s&&t[n-r]===o[i-r];r++);return pl=o.slice(e,1<r?1-r:void 0)}function ml(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function qa(){return!0}function og(){return!1}function an(e){function t(n,r,o,i,s){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=i,this.target=s,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(i):i[a]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?qa:og,this.isPropagationStopped=og,this}return We(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=qa)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=qa)},persist:function(){},isPersistent:qa}),t}var Pi={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},kf=an(Pi),ua=We({},Pi,{view:0,detail:0}),N_=an(ua),Uu,Vu,qi,Mc=We({},ua,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Tf,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==qi&&(qi&&e.type==="mousemove"?(Uu=e.screenX-qi.screenX,Vu=e.screenY-qi.screenY):Vu=Uu=0,qi=e),Uu)},movementY:function(e){return"movementY"in e?e.movementY:Vu}}),ig=an(Mc),A_=We({},Mc,{dataTransfer:0}),j_=an(A_),R_=We({},ua,{relatedTarget:0}),Bu=an(R_),M_=We({},Pi,{animationName:0,elapsedTime:0,pseudoElement:0}),L_=an(M_),D_=We({},Pi,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),$_=an(D_),F_=We({},Pi,{data:0}),sg=an(F_),z_={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},U_={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},V_={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function B_(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=V_[e])?!!t[e]:!1}function Tf(){return B_}var W_=We({},ua,{key:function(e){if(e.key){var t=z_[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ml(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?U_[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Tf,charCode:function(e){return e.type==="keypress"?ml(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ml(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),q_=an(W_),H_=We({},Mc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ag=an(H_),G_=We({},ua,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Tf}),K_=an(G_),Q_=We({},Pi,{propertyName:0,elapsedTime:0,pseudoElement:0}),J_=an(Q_),X_=We({},Mc,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Y_=an(X_),Z_=[9,13,27,32],Of=er&&"CompositionEvent"in window,cs=null;er&&"documentMode"in document&&(cs=document.documentMode);var eb=er&&"TextEvent"in window&&!cs,N0=er&&(!Of||cs&&8<cs&&11>=cs),lg=String.fromCharCode(32),cg=!1;function A0(e,t){switch(e){case"keyup":return Z_.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function j0(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Bo=!1;function tb(e,t){switch(e){case"compositionend":return j0(t);case"keypress":return t.which!==32?null:(cg=!0,lg);case"textInput":return e=t.data,e===lg&&cg?null:e;default:return null}}function nb(e,t){if(Bo)return e==="compositionend"||!Of&&A0(e,t)?(e=P0(),pl=If=xr=null,Bo=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return N0&&t.locale!=="ko"?null:t.data;default:return null}}var rb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ug(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!rb[e.type]:t==="textarea"}function R0(e,t,n,r){d0(r),t=$l(t,"onChange"),0<t.length&&(n=new kf("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var us=null,Os=null;function ob(e){q0(e,0)}function Lc(e){var t=Ho(e);if(o0(t))return e}function ib(e,t){if(e==="change")return t}var M0=!1;if(er){var Wu;if(er){var qu="oninput"in document;if(!qu){var dg=document.createElement("div");dg.setAttribute("oninput","return;"),qu=typeof dg.oninput=="function"}Wu=qu}else Wu=!1;M0=Wu&&(!document.documentMode||9<document.documentMode)}function hg(){us&&(us.detachEvent("onpropertychange",L0),Os=us=null)}function L0(e){if(e.propertyName==="value"&&Lc(Os)){var t=[];R0(t,Os,e,Sf(e)),m0(ob,t)}}function sb(e,t,n){e==="focusin"?(hg(),us=t,Os=n,us.attachEvent("onpropertychange",L0)):e==="focusout"&&hg()}function ab(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Lc(Os)}function lb(e,t){if(e==="click")return Lc(t)}function cb(e,t){if(e==="input"||e==="change")return Lc(t)}function ub(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Tn=typeof Object.is=="function"?Object.is:ub;function Ps(e,t){if(Tn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!zd.call(t,o)||!Tn(e[o],t[o]))return!1}return!0}function fg(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function pg(e,t){var n=fg(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=fg(n)}}function D0(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?D0(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function $0(){for(var e=window,t=Nl();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Nl(e.document)}return t}function Pf(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function db(e){var t=$0(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&D0(n.ownerDocument.documentElement,n)){if(r!==null&&Pf(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,i=Math.min(r.start,o);r=r.end===void 0?i:Math.min(r.end,o),!e.extend&&i>r&&(o=r,r=i,i=o),o=pg(n,i);var s=pg(n,r);o&&s&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==s.node||e.focusOffset!==s.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(s.node,s.offset)):(t.setEnd(s.node,s.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var hb=er&&"documentMode"in document&&11>=document.documentMode,Wo=null,ih=null,ds=null,sh=!1;function mg(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;sh||Wo==null||Wo!==Nl(r)||(r=Wo,"selectionStart"in r&&Pf(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ds&&Ps(ds,r)||(ds=r,r=$l(ih,"onSelect"),0<r.length&&(t=new kf("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Wo)))}function Ha(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var qo={animationend:Ha("Animation","AnimationEnd"),animationiteration:Ha("Animation","AnimationIteration"),animationstart:Ha("Animation","AnimationStart"),transitionend:Ha("Transition","TransitionEnd")},Hu={},F0={};er&&(F0=document.createElement("div").style,"AnimationEvent"in window||(delete qo.animationend.animation,delete qo.animationiteration.animation,delete qo.animationstart.animation),"TransitionEvent"in window||delete qo.transitionend.transition);function Dc(e){if(Hu[e])return Hu[e];if(!qo[e])return e;var t=qo[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in F0)return Hu[e]=t[n];return e}var z0=Dc("animationend"),U0=Dc("animationiteration"),V0=Dc("animationstart"),B0=Dc("transitionend"),W0=new Map,gg="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function zr(e,t){W0.set(e,t),Po(t,[e])}for(var Gu=0;Gu<gg.length;Gu++){var Ku=gg[Gu],fb=Ku.toLowerCase(),pb=Ku[0].toUpperCase()+Ku.slice(1);zr(fb,"on"+pb)}zr(z0,"onAnimationEnd");zr(U0,"onAnimationIteration");zr(V0,"onAnimationStart");zr("dblclick","onDoubleClick");zr("focusin","onFocus");zr("focusout","onBlur");zr(B0,"onTransitionEnd");mi("onMouseEnter",["mouseout","mouseover"]);mi("onMouseLeave",["mouseout","mouseover"]);mi("onPointerEnter",["pointerout","pointerover"]);mi("onPointerLeave",["pointerout","pointerover"]);Po("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Po("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Po("onBeforeInput",["compositionend","keypress","textInput","paste"]);Po("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Po("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Po("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var rs="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mb=new Set("cancel close invalid load scroll toggle".split(" ").concat(rs));function vg(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,f_(r,t,void 0,e),e.currentTarget=null}function q0(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var s=r.length-1;0<=s;s--){var a=r[s],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==i&&o.isPropagationStopped())break e;vg(o,a,c),i=l}else for(s=0;s<r.length;s++){if(a=r[s],l=a.instance,c=a.currentTarget,a=a.listener,l!==i&&o.isPropagationStopped())break e;vg(o,a,c),i=l}}}if(jl)throw e=th,jl=!1,th=null,e}function je(e,t){var n=t[dh];n===void 0&&(n=t[dh]=new Set);var r=e+"__bubble";n.has(r)||(H0(t,e,2,!1),n.add(r))}function Qu(e,t,n){var r=0;t&&(r|=4),H0(n,e,r,t)}var Ga="_reactListening"+Math.random().toString(36).slice(2);function Ns(e){if(!e[Ga]){e[Ga]=!0,Zy.forEach(function(n){n!=="selectionchange"&&(mb.has(n)||Qu(n,!1,e),Qu(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ga]||(t[Ga]=!0,Qu("selectionchange",!1,t))}}function H0(e,t,n,r){switch(O0(t)){case 1:var o=O_;break;case 4:o=P_;break;default:o=Cf}n=o.bind(null,t,n,e),o=void 0,!eh||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function Ju(e,t,n,r,o){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var a=r.stateNode.containerInfo;if(a===o||a.nodeType===8&&a.parentNode===o)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&(l=s.stateNode.containerInfo,l===o||l.nodeType===8&&l.parentNode===o))return;s=s.return}for(;a!==null;){if(s=no(a),s===null)return;if(l=s.tag,l===5||l===6){r=i=s;continue e}a=a.parentNode}}r=r.return}m0(function(){var c=i,d=Sf(n),h=[];e:{var f=W0.get(e);if(f!==void 0){var g=kf,y=e;switch(e){case"keypress":if(ml(n)===0)break e;case"keydown":case"keyup":g=q_;break;case"focusin":y="focus",g=Bu;break;case"focusout":y="blur",g=Bu;break;case"beforeblur":case"afterblur":g=Bu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":g=ig;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":g=j_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":g=K_;break;case z0:case U0:case V0:g=L_;break;case B0:g=J_;break;case"scroll":g=N_;break;case"wheel":g=Y_;break;case"copy":case"cut":case"paste":g=$_;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":g=ag}var w=(t&4)!==0,C=!w&&e==="scroll",m=w?f!==null?f+"Capture":null:f;w=[];for(var p=c,v;p!==null;){v=p;var b=v.stateNode;if(v.tag===5&&b!==null&&(v=b,m!==null&&(b=Cs(p,m),b!=null&&w.push(As(p,b,v)))),C)break;p=p.return}0<w.length&&(f=new g(f,y,null,n,d),h.push({event:f,listeners:w}))}}if(!(t&7)){e:{if(f=e==="mouseover"||e==="pointerover",g=e==="mouseout"||e==="pointerout",f&&n!==Yd&&(y=n.relatedTarget||n.fromElement)&&(no(y)||y[tr]))break e;if((g||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,g?(y=n.relatedTarget||n.toElement,g=c,y=y?no(y):null,y!==null&&(C=No(y),y!==C||y.tag!==5&&y.tag!==6)&&(y=null)):(g=null,y=c),g!==y)){if(w=ig,b="onMouseLeave",m="onMouseEnter",p="mouse",(e==="pointerout"||e==="pointerover")&&(w=ag,b="onPointerLeave",m="onPointerEnter",p="pointer"),C=g==null?f:Ho(g),v=y==null?f:Ho(y),f=new w(b,p+"leave",g,n,d),f.target=C,f.relatedTarget=v,b=null,no(d)===c&&(w=new w(m,p+"enter",y,n,d),w.target=v,w.relatedTarget=C,b=w),C=b,g&&y)t:{for(w=g,m=y,p=0,v=w;v;v=$o(v))p++;for(v=0,b=m;b;b=$o(b))v++;for(;0<p-v;)w=$o(w),p--;for(;0<v-p;)m=$o(m),v--;for(;p--;){if(w===m||m!==null&&w===m.alternate)break t;w=$o(w),m=$o(m)}w=null}else w=null;g!==null&&yg(h,f,g,w,!1),y!==null&&C!==null&&yg(h,C,y,w,!0)}}e:{if(f=c?Ho(c):window,g=f.nodeName&&f.nodeName.toLowerCase(),g==="select"||g==="input"&&f.type==="file")var k=ib;else if(ug(f))if(M0)k=cb;else{k=ab;var P=sb}else(g=f.nodeName)&&g.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(k=lb);if(k&&(k=k(e,c))){R0(h,k,n,d);break e}P&&P(e,f,c),e==="focusout"&&(P=f._wrapperState)&&P.controlled&&f.type==="number"&&Gd(f,"number",f.value)}switch(P=c?Ho(c):window,e){case"focusin":(ug(P)||P.contentEditable==="true")&&(Wo=P,ih=c,ds=null);break;case"focusout":ds=ih=Wo=null;break;case"mousedown":sh=!0;break;case"contextmenu":case"mouseup":case"dragend":sh=!1,mg(h,n,d);break;case"selectionchange":if(hb)break;case"keydown":case"keyup":mg(h,n,d)}var R;if(Of)e:{switch(e){case"compositionstart":var T="onCompositionStart";break e;case"compositionend":T="onCompositionEnd";break e;case"compositionupdate":T="onCompositionUpdate";break e}T=void 0}else Bo?A0(e,n)&&(T="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(T="onCompositionStart");T&&(N0&&n.locale!=="ko"&&(Bo||T!=="onCompositionStart"?T==="onCompositionEnd"&&Bo&&(R=P0()):(xr=d,If="value"in xr?xr.value:xr.textContent,Bo=!0)),P=$l(c,T),0<P.length&&(T=new sg(T,e,null,n,d),h.push({event:T,listeners:P}),R?T.data=R:(R=j0(n),R!==null&&(T.data=R)))),(R=eb?tb(e,n):nb(e,n))&&(c=$l(c,"onBeforeInput"),0<c.length&&(d=new sg("onBeforeInput","beforeinput",null,n,d),h.push({event:d,listeners:c}),d.data=R))}q0(h,t)})}function As(e,t,n){return{instance:e,listener:t,currentTarget:n}}function $l(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,i=o.stateNode;o.tag===5&&i!==null&&(o=i,i=Cs(e,n),i!=null&&r.unshift(As(e,i,o)),i=Cs(e,t),i!=null&&r.push(As(e,i,o))),e=e.return}return r}function $o(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function yg(e,t,n,r,o){for(var i=t._reactName,s=[];n!==null&&n!==r;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===r)break;a.tag===5&&c!==null&&(a=c,o?(l=Cs(n,i),l!=null&&s.unshift(As(n,l,a))):o||(l=Cs(n,i),l!=null&&s.push(As(n,l,a)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var gb=/\r\n?/g,vb=/\u0000|\uFFFD/g;function wg(e){return(typeof e=="string"?e:""+e).replace(gb,`
`).replace(vb,"")}function Ka(e,t,n){if(t=wg(t),wg(e)!==t&&n)throw Error(M(425))}function Fl(){}var ah=null,lh=null;function ch(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var uh=typeof setTimeout=="function"?setTimeout:void 0,yb=typeof clearTimeout=="function"?clearTimeout:void 0,Eg=typeof Promise=="function"?Promise:void 0,wb=typeof queueMicrotask=="function"?queueMicrotask:typeof Eg<"u"?function(e){return Eg.resolve(null).then(e).catch(Eb)}:uh;function Eb(e){setTimeout(function(){throw e})}function Xu(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),Ts(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);Ts(t)}function Or(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Sg(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Ni=Math.random().toString(36).slice(2),An="__reactFiber$"+Ni,js="__reactProps$"+Ni,tr="__reactContainer$"+Ni,dh="__reactEvents$"+Ni,Sb="__reactListeners$"+Ni,xb="__reactHandles$"+Ni;function no(e){var t=e[An];if(t)return t;for(var n=e.parentNode;n;){if(t=n[tr]||n[An]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Sg(e);e!==null;){if(n=e[An])return n;e=Sg(e)}return t}e=n,n=e.parentNode}return null}function da(e){return e=e[An]||e[tr],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Ho(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(M(33))}function $c(e){return e[js]||null}var hh=[],Go=-1;function Ur(e){return{current:e}}function Me(e){0>Go||(e.current=hh[Go],hh[Go]=null,Go--)}function Ne(e,t){Go++,hh[Go]=e.current,e.current=t}var $r={},jt=Ur($r),Gt=Ur(!1),po=$r;function gi(e,t){var n=e.type.contextTypes;if(!n)return $r;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},i;for(i in n)o[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function Kt(e){return e=e.childContextTypes,e!=null}function zl(){Me(Gt),Me(jt)}function xg(e,t,n){if(jt.current!==$r)throw Error(M(168));Ne(jt,t),Ne(Gt,n)}function G0(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(M(108,s_(e)||"Unknown",o));return We({},n,r)}function Ul(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||$r,po=jt.current,Ne(jt,e),Ne(Gt,Gt.current),!0}function _g(e,t,n){var r=e.stateNode;if(!r)throw Error(M(169));n?(e=G0(e,t,po),r.__reactInternalMemoizedMergedChildContext=e,Me(Gt),Me(jt),Ne(jt,e)):Me(Gt),Ne(Gt,n)}var Wn=null,Fc=!1,Yu=!1;function K0(e){Wn===null?Wn=[e]:Wn.push(e)}function _b(e){Fc=!0,K0(e)}function Vr(){if(!Yu&&Wn!==null){Yu=!0;var e=0,t=Pe;try{var n=Wn;for(Pe=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Wn=null,Fc=!1}catch(o){throw Wn!==null&&(Wn=Wn.slice(e+1)),w0(xf,Vr),o}finally{Pe=t,Yu=!1}}return null}var Ko=[],Qo=0,Vl=null,Bl=0,un=[],dn=0,mo=null,Hn=1,Gn="";function Zr(e,t){Ko[Qo++]=Bl,Ko[Qo++]=Vl,Vl=e,Bl=t}function Q0(e,t,n){un[dn++]=Hn,un[dn++]=Gn,un[dn++]=mo,mo=e;var r=Hn;e=Gn;var o=32-Cn(r)-1;r&=~(1<<o),n+=1;var i=32-Cn(t)+o;if(30<i){var s=o-o%5;i=(r&(1<<s)-1).toString(32),r>>=s,o-=s,Hn=1<<32-Cn(t)+o|n<<o|r,Gn=i+e}else Hn=1<<i|n<<o|r,Gn=e}function Nf(e){e.return!==null&&(Zr(e,1),Q0(e,1,0))}function Af(e){for(;e===Vl;)Vl=Ko[--Qo],Ko[Qo]=null,Bl=Ko[--Qo],Ko[Qo]=null;for(;e===mo;)mo=un[--dn],un[dn]=null,Gn=un[--dn],un[dn]=null,Hn=un[--dn],un[dn]=null}var Yt=null,Xt=null,De=!1,_n=null;function J0(e,t){var n=hn(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function bg(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Yt=e,Xt=Or(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Yt=e,Xt=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=mo!==null?{id:Hn,overflow:Gn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=hn(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Yt=e,Xt=null,!0):!1;default:return!1}}function fh(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ph(e){if(De){var t=Xt;if(t){var n=t;if(!bg(e,t)){if(fh(e))throw Error(M(418));t=Or(n.nextSibling);var r=Yt;t&&bg(e,t)?J0(r,n):(e.flags=e.flags&-4097|2,De=!1,Yt=e)}}else{if(fh(e))throw Error(M(418));e.flags=e.flags&-4097|2,De=!1,Yt=e}}}function Cg(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Yt=e}function Qa(e){if(e!==Yt)return!1;if(!De)return Cg(e),De=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!ch(e.type,e.memoizedProps)),t&&(t=Xt)){if(fh(e))throw X0(),Error(M(418));for(;t;)J0(e,t),t=Or(t.nextSibling)}if(Cg(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(M(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Xt=Or(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Xt=null}}else Xt=Yt?Or(e.stateNode.nextSibling):null;return!0}function X0(){for(var e=Xt;e;)e=Or(e.nextSibling)}function vi(){Xt=Yt=null,De=!1}function jf(e){_n===null?_n=[e]:_n.push(e)}var bb=lr.ReactCurrentBatchConfig;function Sn(e,t){if(e&&e.defaultProps){t=We({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}var Wl=Ur(null),ql=null,Jo=null,Rf=null;function Mf(){Rf=Jo=ql=null}function Lf(e){var t=Wl.current;Me(Wl),e._currentValue=t}function mh(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function si(e,t){ql=e,Rf=Jo=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(qt=!0),e.firstContext=null)}function gn(e){var t=e._currentValue;if(Rf!==e)if(e={context:e,memoizedValue:t,next:null},Jo===null){if(ql===null)throw Error(M(308));Jo=e,ql.dependencies={lanes:0,firstContext:e}}else Jo=Jo.next=e;return t}var ro=null;function Df(e){ro===null?ro=[e]:ro.push(e)}function Y0(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,Df(t)):(n.next=o.next,o.next=n),t.interleaved=n,nr(e,r)}function nr(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var mr=!1;function $f(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Z0(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Xn(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Pr(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,xe&2){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,nr(e,n)}return o=r.interleaved,o===null?(t.next=t,Df(r)):(t.next=o.next,o.next=t),r.interleaved=t,nr(e,n)}function gl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,_f(e,n)}}function Ig(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?o=i=s:i=i.next=s,n=n.next}while(n!==null);i===null?o=i=t:i=i.next=t}else o=i=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Hl(e,t,n,r){var o=e.updateQueue;mr=!1;var i=o.firstBaseUpdate,s=o.lastBaseUpdate,a=o.shared.pending;if(a!==null){o.shared.pending=null;var l=a,c=l.next;l.next=null,s===null?i=c:s.next=c,s=l;var d=e.alternate;d!==null&&(d=d.updateQueue,a=d.lastBaseUpdate,a!==s&&(a===null?d.firstBaseUpdate=c:a.next=c,d.lastBaseUpdate=l))}if(i!==null){var h=o.baseState;s=0,d=c=l=null,a=i;do{var f=a.lane,g=a.eventTime;if((r&f)===f){d!==null&&(d=d.next={eventTime:g,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var y=e,w=a;switch(f=t,g=n,w.tag){case 1:if(y=w.payload,typeof y=="function"){h=y.call(g,h,f);break e}h=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=w.payload,f=typeof y=="function"?y.call(g,h,f):y,f==null)break e;h=We({},h,f);break e;case 2:mr=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,f=o.effects,f===null?o.effects=[a]:f.push(a))}else g={eventTime:g,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},d===null?(c=d=g,l=h):d=d.next=g,s|=f;if(a=a.next,a===null){if(a=o.shared.pending,a===null)break;f=a,a=f.next,f.next=null,o.lastBaseUpdate=f,o.shared.pending=null}}while(1);if(d===null&&(l=h),o.baseState=l,o.firstBaseUpdate=c,o.lastBaseUpdate=d,t=o.shared.interleaved,t!==null){o=t;do s|=o.lane,o=o.next;while(o!==t)}else i===null&&(o.shared.lanes=0);vo|=s,e.lanes=s,e.memoizedState=h}}function kg(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(M(191,o));o.call(r)}}}var e1=new Yy.Component().refs;function gh(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:We({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var zc={isMounted:function(e){return(e=e._reactInternals)?No(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=$t(),o=Ar(e),i=Xn(r,o);i.payload=t,n!=null&&(i.callback=n),t=Pr(e,i,o),t!==null&&(In(t,e,o,r),gl(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=$t(),o=Ar(e),i=Xn(r,o);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=Pr(e,i,o),t!==null&&(In(t,e,o,r),gl(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=$t(),r=Ar(e),o=Xn(n,r);o.tag=2,t!=null&&(o.callback=t),t=Pr(e,o,r),t!==null&&(In(t,e,r,n),gl(t,e,r))}};function Tg(e,t,n,r,o,i,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,s):t.prototype&&t.prototype.isPureReactComponent?!Ps(n,r)||!Ps(o,i):!0}function t1(e,t,n){var r=!1,o=$r,i=t.contextType;return typeof i=="object"&&i!==null?i=gn(i):(o=Kt(t)?po:jt.current,r=t.contextTypes,i=(r=r!=null)?gi(e,o):$r),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=zc,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=i),t}function Og(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&zc.enqueueReplaceState(t,t.state,null)}function vh(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs=e1,$f(e);var i=t.contextType;typeof i=="object"&&i!==null?o.context=gn(i):(i=Kt(t)?po:jt.current,o.context=gi(e,i)),o.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(gh(e,t,i,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&zc.enqueueReplaceState(o,o.state,null),Hl(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function Hi(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(M(309));var r=n.stateNode}if(!r)throw Error(M(147,e));var o=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(s){var a=o.refs;a===e1&&(a=o.refs={}),s===null?delete a[i]:a[i]=s},t._stringRef=i,t)}if(typeof e!="string")throw Error(M(284));if(!n._owner)throw Error(M(290,e))}return e}function Ja(e,t){throw e=Object.prototype.toString.call(t),Error(M(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Pg(e){var t=e._init;return t(e._payload)}function n1(e){function t(m,p){if(e){var v=m.deletions;v===null?(m.deletions=[p],m.flags|=16):v.push(p)}}function n(m,p){if(!e)return null;for(;p!==null;)t(m,p),p=p.sibling;return null}function r(m,p){for(m=new Map;p!==null;)p.key!==null?m.set(p.key,p):m.set(p.index,p),p=p.sibling;return m}function o(m,p){return m=jr(m,p),m.index=0,m.sibling=null,m}function i(m,p,v){return m.index=v,e?(v=m.alternate,v!==null?(v=v.index,v<p?(m.flags|=2,p):v):(m.flags|=2,p)):(m.flags|=1048576,p)}function s(m){return e&&m.alternate===null&&(m.flags|=2),m}function a(m,p,v,b){return p===null||p.tag!==6?(p=id(v,m.mode,b),p.return=m,p):(p=o(p,v),p.return=m,p)}function l(m,p,v,b){var k=v.type;return k===Vo?d(m,p,v.props.children,b,v.key):p!==null&&(p.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===pr&&Pg(k)===p.type)?(b=o(p,v.props),b.ref=Hi(m,p,v),b.return=m,b):(b=xl(v.type,v.key,v.props,null,m.mode,b),b.ref=Hi(m,p,v),b.return=m,b)}function c(m,p,v,b){return p===null||p.tag!==4||p.stateNode.containerInfo!==v.containerInfo||p.stateNode.implementation!==v.implementation?(p=sd(v,m.mode,b),p.return=m,p):(p=o(p,v.children||[]),p.return=m,p)}function d(m,p,v,b,k){return p===null||p.tag!==7?(p=uo(v,m.mode,b,k),p.return=m,p):(p=o(p,v),p.return=m,p)}function h(m,p,v){if(typeof p=="string"&&p!==""||typeof p=="number")return p=id(""+p,m.mode,v),p.return=m,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case Fa:return v=xl(p.type,p.key,p.props,null,m.mode,v),v.ref=Hi(m,null,p),v.return=m,v;case Uo:return p=sd(p,m.mode,v),p.return=m,p;case pr:var b=p._init;return h(m,b(p._payload),v)}if(ts(p)||Ui(p))return p=uo(p,m.mode,v,null),p.return=m,p;Ja(m,p)}return null}function f(m,p,v,b){var k=p!==null?p.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return k!==null?null:a(m,p,""+v,b);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Fa:return v.key===k?l(m,p,v,b):null;case Uo:return v.key===k?c(m,p,v,b):null;case pr:return k=v._init,f(m,p,k(v._payload),b)}if(ts(v)||Ui(v))return k!==null?null:d(m,p,v,b,null);Ja(m,v)}return null}function g(m,p,v,b,k){if(typeof b=="string"&&b!==""||typeof b=="number")return m=m.get(v)||null,a(p,m,""+b,k);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Fa:return m=m.get(b.key===null?v:b.key)||null,l(p,m,b,k);case Uo:return m=m.get(b.key===null?v:b.key)||null,c(p,m,b,k);case pr:var P=b._init;return g(m,p,v,P(b._payload),k)}if(ts(b)||Ui(b))return m=m.get(v)||null,d(p,m,b,k,null);Ja(p,b)}return null}function y(m,p,v,b){for(var k=null,P=null,R=p,T=p=0,Q=null;R!==null&&T<v.length;T++){R.index>T?(Q=R,R=null):Q=R.sibling;var A=f(m,R,v[T],b);if(A===null){R===null&&(R=Q);break}e&&R&&A.alternate===null&&t(m,R),p=i(A,p,T),P===null?k=A:P.sibling=A,P=A,R=Q}if(T===v.length)return n(m,R),De&&Zr(m,T),k;if(R===null){for(;T<v.length;T++)R=h(m,v[T],b),R!==null&&(p=i(R,p,T),P===null?k=R:P.sibling=R,P=R);return De&&Zr(m,T),k}for(R=r(m,R);T<v.length;T++)Q=g(R,m,T,v[T],b),Q!==null&&(e&&Q.alternate!==null&&R.delete(Q.key===null?T:Q.key),p=i(Q,p,T),P===null?k=Q:P.sibling=Q,P=Q);return e&&R.forEach(function(_){return t(m,_)}),De&&Zr(m,T),k}function w(m,p,v,b){var k=Ui(v);if(typeof k!="function")throw Error(M(150));if(v=k.call(v),v==null)throw Error(M(151));for(var P=k=null,R=p,T=p=0,Q=null,A=v.next();R!==null&&!A.done;T++,A=v.next()){R.index>T?(Q=R,R=null):Q=R.sibling;var _=f(m,R,A.value,b);if(_===null){R===null&&(R=Q);break}e&&R&&_.alternate===null&&t(m,R),p=i(_,p,T),P===null?k=_:P.sibling=_,P=_,R=Q}if(A.done)return n(m,R),De&&Zr(m,T),k;if(R===null){for(;!A.done;T++,A=v.next())A=h(m,A.value,b),A!==null&&(p=i(A,p,T),P===null?k=A:P.sibling=A,P=A);return De&&Zr(m,T),k}for(R=r(m,R);!A.done;T++,A=v.next())A=g(R,m,T,A.value,b),A!==null&&(e&&A.alternate!==null&&R.delete(A.key===null?T:A.key),p=i(A,p,T),P===null?k=A:P.sibling=A,P=A);return e&&R.forEach(function(O){return t(m,O)}),De&&Zr(m,T),k}function C(m,p,v,b){if(typeof v=="object"&&v!==null&&v.type===Vo&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case Fa:e:{for(var k=v.key,P=p;P!==null;){if(P.key===k){if(k=v.type,k===Vo){if(P.tag===7){n(m,P.sibling),p=o(P,v.props.children),p.return=m,m=p;break e}}else if(P.elementType===k||typeof k=="object"&&k!==null&&k.$$typeof===pr&&Pg(k)===P.type){n(m,P.sibling),p=o(P,v.props),p.ref=Hi(m,P,v),p.return=m,m=p;break e}n(m,P);break}else t(m,P);P=P.sibling}v.type===Vo?(p=uo(v.props.children,m.mode,b,v.key),p.return=m,m=p):(b=xl(v.type,v.key,v.props,null,m.mode,b),b.ref=Hi(m,p,v),b.return=m,m=b)}return s(m);case Uo:e:{for(P=v.key;p!==null;){if(p.key===P)if(p.tag===4&&p.stateNode.containerInfo===v.containerInfo&&p.stateNode.implementation===v.implementation){n(m,p.sibling),p=o(p,v.children||[]),p.return=m,m=p;break e}else{n(m,p);break}else t(m,p);p=p.sibling}p=sd(v,m.mode,b),p.return=m,m=p}return s(m);case pr:return P=v._init,C(m,p,P(v._payload),b)}if(ts(v))return y(m,p,v,b);if(Ui(v))return w(m,p,v,b);Ja(m,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,p!==null&&p.tag===6?(n(m,p.sibling),p=o(p,v),p.return=m,m=p):(n(m,p),p=id(v,m.mode,b),p.return=m,m=p),s(m)):n(m,p)}return C}var yi=n1(!0),r1=n1(!1),ha={},Ln=Ur(ha),Rs=Ur(ha),Ms=Ur(ha);function oo(e){if(e===ha)throw Error(M(174));return e}function Ff(e,t){switch(Ne(Ms,t),Ne(Rs,e),Ne(Ln,ha),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Qd(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Qd(t,e)}Me(Ln),Ne(Ln,t)}function wi(){Me(Ln),Me(Rs),Me(Ms)}function o1(e){oo(Ms.current);var t=oo(Ln.current),n=Qd(t,e.type);t!==n&&(Ne(Rs,e),Ne(Ln,n))}function zf(e){Rs.current===e&&(Me(Ln),Me(Rs))}var Ve=Ur(0);function Gl(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Zu=[];function Uf(){for(var e=0;e<Zu.length;e++)Zu[e]._workInProgressVersionPrimary=null;Zu.length=0}var vl=lr.ReactCurrentDispatcher,ed=lr.ReactCurrentBatchConfig,go=0,Be=null,tt=null,at=null,Kl=!1,hs=!1,Ls=0,Cb=0;function bt(){throw Error(M(321))}function Vf(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Tn(e[n],t[n]))return!1;return!0}function Bf(e,t,n,r,o,i){if(go=i,Be=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,vl.current=e===null||e.memoizedState===null?Ob:Pb,e=n(r,o),hs){i=0;do{if(hs=!1,Ls=0,25<=i)throw Error(M(301));i+=1,at=tt=null,t.updateQueue=null,vl.current=Nb,e=n(r,o)}while(hs)}if(vl.current=Ql,t=tt!==null&&tt.next!==null,go=0,at=tt=Be=null,Kl=!1,t)throw Error(M(300));return e}function Wf(){var e=Ls!==0;return Ls=0,e}function Pn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return at===null?Be.memoizedState=at=e:at=at.next=e,at}function vn(){if(tt===null){var e=Be.alternate;e=e!==null?e.memoizedState:null}else e=tt.next;var t=at===null?Be.memoizedState:at.next;if(t!==null)at=t,tt=e;else{if(e===null)throw Error(M(310));tt=e,e={memoizedState:tt.memoizedState,baseState:tt.baseState,baseQueue:tt.baseQueue,queue:tt.queue,next:null},at===null?Be.memoizedState=at=e:at=at.next=e}return at}function Ds(e,t){return typeof t=="function"?t(e):t}function td(e){var t=vn(),n=t.queue;if(n===null)throw Error(M(311));n.lastRenderedReducer=e;var r=tt,o=r.baseQueue,i=n.pending;if(i!==null){if(o!==null){var s=o.next;o.next=i.next,i.next=s}r.baseQueue=o=i,n.pending=null}if(o!==null){i=o.next,r=r.baseState;var a=s=null,l=null,c=i;do{var d=c.lane;if((go&d)===d)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:e(r,c.action);else{var h={lane:d,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=h,s=r):l=l.next=h,Be.lanes|=d,vo|=d}c=c.next}while(c!==null&&c!==i);l===null?s=r:l.next=a,Tn(r,t.memoizedState)||(qt=!0),t.memoizedState=r,t.baseState=s,t.baseQueue=l,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do i=o.lane,Be.lanes|=i,vo|=i,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function nd(e){var t=vn(),n=t.queue;if(n===null)throw Error(M(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,i=t.memoizedState;if(o!==null){n.pending=null;var s=o=o.next;do i=e(i,s.action),s=s.next;while(s!==o);Tn(i,t.memoizedState)||(qt=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function i1(){}function s1(e,t){var n=Be,r=vn(),o=t(),i=!Tn(r.memoizedState,o);if(i&&(r.memoizedState=o,qt=!0),r=r.queue,qf(c1.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||at!==null&&at.memoizedState.tag&1){if(n.flags|=2048,$s(9,l1.bind(null,n,r,o,t),void 0,null),ct===null)throw Error(M(349));go&30||a1(n,t,o)}return o}function a1(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Be.updateQueue,t===null?(t={lastEffect:null,stores:null},Be.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function l1(e,t,n,r){t.value=n,t.getSnapshot=r,u1(t)&&d1(e)}function c1(e,t,n){return n(function(){u1(t)&&d1(e)})}function u1(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Tn(e,n)}catch{return!0}}function d1(e){var t=nr(e,1);t!==null&&In(t,e,1,-1)}function Ng(e){var t=Pn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ds,lastRenderedState:e},t.queue=e,e=e.dispatch=Tb.bind(null,Be,e),[t.memoizedState,e]}function $s(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=Be.updateQueue,t===null?(t={lastEffect:null,stores:null},Be.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function h1(){return vn().memoizedState}function yl(e,t,n,r){var o=Pn();Be.flags|=e,o.memoizedState=$s(1|t,n,void 0,r===void 0?null:r)}function Uc(e,t,n,r){var o=vn();r=r===void 0?null:r;var i=void 0;if(tt!==null){var s=tt.memoizedState;if(i=s.destroy,r!==null&&Vf(r,s.deps)){o.memoizedState=$s(t,n,i,r);return}}Be.flags|=e,o.memoizedState=$s(1|t,n,i,r)}function Ag(e,t){return yl(8390656,8,e,t)}function qf(e,t){return Uc(2048,8,e,t)}function f1(e,t){return Uc(4,2,e,t)}function p1(e,t){return Uc(4,4,e,t)}function m1(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function g1(e,t,n){return n=n!=null?n.concat([e]):null,Uc(4,4,m1.bind(null,t,e),n)}function Hf(){}function v1(e,t){var n=vn();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Vf(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function y1(e,t){var n=vn();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Vf(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function w1(e,t,n){return go&21?(Tn(n,t)||(n=x0(),Be.lanes|=n,vo|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,qt=!0),e.memoizedState=n)}function Ib(e,t){var n=Pe;Pe=n!==0&&4>n?n:4,e(!0);var r=ed.transition;ed.transition={};try{e(!1),t()}finally{Pe=n,ed.transition=r}}function E1(){return vn().memoizedState}function kb(e,t,n){var r=Ar(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},S1(e))x1(t,n);else if(n=Y0(e,t,n,r),n!==null){var o=$t();In(n,e,r,o),_1(n,t,r)}}function Tb(e,t,n){var r=Ar(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(S1(e))x1(t,o);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var s=t.lastRenderedState,a=i(s,n);if(o.hasEagerState=!0,o.eagerState=a,Tn(a,s)){var l=t.interleaved;l===null?(o.next=o,Df(t)):(o.next=l.next,l.next=o),t.interleaved=o;return}}catch{}finally{}n=Y0(e,t,o,r),n!==null&&(o=$t(),In(n,e,r,o),_1(n,t,r))}}function S1(e){var t=e.alternate;return e===Be||t!==null&&t===Be}function x1(e,t){hs=Kl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function _1(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,_f(e,n)}}var Ql={readContext:gn,useCallback:bt,useContext:bt,useEffect:bt,useImperativeHandle:bt,useInsertionEffect:bt,useLayoutEffect:bt,useMemo:bt,useReducer:bt,useRef:bt,useState:bt,useDebugValue:bt,useDeferredValue:bt,useTransition:bt,useMutableSource:bt,useSyncExternalStore:bt,useId:bt,unstable_isNewReconciler:!1},Ob={readContext:gn,useCallback:function(e,t){return Pn().memoizedState=[e,t===void 0?null:t],e},useContext:gn,useEffect:Ag,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,yl(4194308,4,m1.bind(null,t,e),n)},useLayoutEffect:function(e,t){return yl(4194308,4,e,t)},useInsertionEffect:function(e,t){return yl(4,2,e,t)},useMemo:function(e,t){var n=Pn();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Pn();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=kb.bind(null,Be,e),[r.memoizedState,e]},useRef:function(e){var t=Pn();return e={current:e},t.memoizedState=e},useState:Ng,useDebugValue:Hf,useDeferredValue:function(e){return Pn().memoizedState=e},useTransition:function(){var e=Ng(!1),t=e[0];return e=Ib.bind(null,e[1]),Pn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=Be,o=Pn();if(De){if(n===void 0)throw Error(M(407));n=n()}else{if(n=t(),ct===null)throw Error(M(349));go&30||a1(r,t,n)}o.memoizedState=n;var i={value:n,getSnapshot:t};return o.queue=i,Ag(c1.bind(null,r,i,e),[e]),r.flags|=2048,$s(9,l1.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=Pn(),t=ct.identifierPrefix;if(De){var n=Gn,r=Hn;n=(r&~(1<<32-Cn(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Ls++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Cb++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Pb={readContext:gn,useCallback:v1,useContext:gn,useEffect:qf,useImperativeHandle:g1,useInsertionEffect:f1,useLayoutEffect:p1,useMemo:y1,useReducer:td,useRef:h1,useState:function(){return td(Ds)},useDebugValue:Hf,useDeferredValue:function(e){var t=vn();return w1(t,tt.memoizedState,e)},useTransition:function(){var e=td(Ds)[0],t=vn().memoizedState;return[e,t]},useMutableSource:i1,useSyncExternalStore:s1,useId:E1,unstable_isNewReconciler:!1},Nb={readContext:gn,useCallback:v1,useContext:gn,useEffect:qf,useImperativeHandle:g1,useInsertionEffect:f1,useLayoutEffect:p1,useMemo:y1,useReducer:nd,useRef:h1,useState:function(){return nd(Ds)},useDebugValue:Hf,useDeferredValue:function(e){var t=vn();return tt===null?t.memoizedState=e:w1(t,tt.memoizedState,e)},useTransition:function(){var e=nd(Ds)[0],t=vn().memoizedState;return[e,t]},useMutableSource:i1,useSyncExternalStore:s1,useId:E1,unstable_isNewReconciler:!1};function Ei(e,t){try{var n="",r=t;do n+=i_(r),r=r.return;while(r);var o=n}catch(i){o=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:o,digest:null}}function rd(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function yh(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Ab=typeof WeakMap=="function"?WeakMap:Map;function b1(e,t,n){n=Xn(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Xl||(Xl=!0,Th=r),yh(e,t)},n}function C1(e,t,n){n=Xn(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){yh(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){yh(e,t),typeof r!="function"&&(Nr===null?Nr=new Set([this]):Nr.add(this));var s=t.stack;this.componentDidCatch(t.value,{componentStack:s!==null?s:""})}),n}function jg(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Ab;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=Hb.bind(null,e,t,n),t.then(e,e))}function Rg(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Mg(e,t,n,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Xn(-1,1),t.tag=2,Pr(n,t,1))),n.lanes|=1),e)}var jb=lr.ReactCurrentOwner,qt=!1;function Rt(e,t,n,r){t.child=e===null?r1(t,null,n,r):yi(t,e.child,n,r)}function Lg(e,t,n,r,o){n=n.render;var i=t.ref;return si(t,o),r=Bf(e,t,n,r,i,o),n=Wf(),e!==null&&!qt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,rr(e,t,o)):(De&&n&&Nf(t),t.flags|=1,Rt(e,t,r,o),t.child)}function Dg(e,t,n,r,o){if(e===null){var i=n.type;return typeof i=="function"&&!ep(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,I1(e,t,i,r,o)):(e=xl(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&o)){var s=i.memoizedProps;if(n=n.compare,n=n!==null?n:Ps,n(s,r)&&e.ref===t.ref)return rr(e,t,o)}return t.flags|=1,e=jr(i,r),e.ref=t.ref,e.return=t,t.child=e}function I1(e,t,n,r,o){if(e!==null){var i=e.memoizedProps;if(Ps(i,r)&&e.ref===t.ref)if(qt=!1,t.pendingProps=r=i,(e.lanes&o)!==0)e.flags&131072&&(qt=!0);else return t.lanes=e.lanes,rr(e,t,o)}return wh(e,t,n,r,o)}function k1(e,t,n){var r=t.pendingProps,o=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ne(Yo,Jt),Jt|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Ne(Yo,Jt),Jt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,Ne(Yo,Jt),Jt|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,Ne(Yo,Jt),Jt|=r;return Rt(e,t,o,n),t.child}function T1(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function wh(e,t,n,r,o){var i=Kt(n)?po:jt.current;return i=gi(t,i),si(t,o),n=Bf(e,t,n,r,i,o),r=Wf(),e!==null&&!qt?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,rr(e,t,o)):(De&&r&&Nf(t),t.flags|=1,Rt(e,t,n,o),t.child)}function $g(e,t,n,r,o){if(Kt(n)){var i=!0;Ul(t)}else i=!1;if(si(t,o),t.stateNode===null)wl(e,t),t1(t,n,r),vh(t,n,r,o),r=!0;else if(e===null){var s=t.stateNode,a=t.memoizedProps;s.props=a;var l=s.context,c=n.contextType;typeof c=="object"&&c!==null?c=gn(c):(c=Kt(n)?po:jt.current,c=gi(t,c));var d=n.getDerivedStateFromProps,h=typeof d=="function"||typeof s.getSnapshotBeforeUpdate=="function";h||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==r||l!==c)&&Og(t,s,r,c),mr=!1;var f=t.memoizedState;s.state=f,Hl(t,r,s,o),l=t.memoizedState,a!==r||f!==l||Gt.current||mr?(typeof d=="function"&&(gh(t,n,d,r),l=t.memoizedState),(a=mr||Tg(t,n,a,r,f,l,c))?(h||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),s.props=r,s.state=l,s.context=c,r=a):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{s=t.stateNode,Z0(e,t),a=t.memoizedProps,c=t.type===t.elementType?a:Sn(t.type,a),s.props=c,h=t.pendingProps,f=s.context,l=n.contextType,typeof l=="object"&&l!==null?l=gn(l):(l=Kt(n)?po:jt.current,l=gi(t,l));var g=n.getDerivedStateFromProps;(d=typeof g=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(a!==h||f!==l)&&Og(t,s,r,l),mr=!1,f=t.memoizedState,s.state=f,Hl(t,r,s,o);var y=t.memoizedState;a!==h||f!==y||Gt.current||mr?(typeof g=="function"&&(gh(t,n,g,r),y=t.memoizedState),(c=mr||Tg(t,n,c,r,f,y,l)||!1)?(d||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(r,y,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(r,y,l)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=y),s.props=r,s.state=y,s.context=l,r=c):(typeof s.componentDidUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return Eh(e,t,n,r,i,o)}function Eh(e,t,n,r,o,i){T1(e,t);var s=(t.flags&128)!==0;if(!r&&!s)return o&&_g(t,n,!1),rr(e,t,i);r=t.stateNode,jb.current=t;var a=s&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&s?(t.child=yi(t,e.child,null,i),t.child=yi(t,null,a,i)):Rt(e,t,a,i),t.memoizedState=r.state,o&&_g(t,n,!0),t.child}function O1(e){var t=e.stateNode;t.pendingContext?xg(e,t.pendingContext,t.pendingContext!==t.context):t.context&&xg(e,t.context,!1),Ff(e,t.containerInfo)}function Fg(e,t,n,r,o){return vi(),jf(o),t.flags|=256,Rt(e,t,n,r),t.child}var Sh={dehydrated:null,treeContext:null,retryLane:0};function xh(e){return{baseLanes:e,cachePool:null,transitions:null}}function P1(e,t,n){var r=t.pendingProps,o=Ve.current,i=!1,s=(t.flags&128)!==0,a;if((a=s)||(a=e!==null&&e.memoizedState===null?!1:(o&2)!==0),a?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),Ne(Ve,o&1),e===null)return ph(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(s=r.children,e=r.fallback,i?(r=t.mode,i=t.child,s={mode:"hidden",children:s},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=s):i=Wc(s,r,0,null),e=uo(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=xh(n),t.memoizedState=Sh,e):Gf(t,s));if(o=e.memoizedState,o!==null&&(a=o.dehydrated,a!==null))return Rb(e,t,s,r,a,o,n);if(i){i=r.fallback,s=t.mode,o=e.child,a=o.sibling;var l={mode:"hidden",children:r.children};return!(s&1)&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=l,t.deletions=null):(r=jr(o,l),r.subtreeFlags=o.subtreeFlags&14680064),a!==null?i=jr(a,i):(i=uo(i,s,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,s=e.child.memoizedState,s=s===null?xh(n):{baseLanes:s.baseLanes|n,cachePool:null,transitions:s.transitions},i.memoizedState=s,i.childLanes=e.childLanes&~n,t.memoizedState=Sh,r}return i=e.child,e=i.sibling,r=jr(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Gf(e,t){return t=Wc({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Xa(e,t,n,r){return r!==null&&jf(r),yi(t,e.child,null,n),e=Gf(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Rb(e,t,n,r,o,i,s){if(n)return t.flags&256?(t.flags&=-257,r=rd(Error(M(422))),Xa(e,t,s,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,o=t.mode,r=Wc({mode:"visible",children:r.children},o,0,null),i=uo(i,o,s,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&yi(t,e.child,null,s),t.child.memoizedState=xh(s),t.memoizedState=Sh,i);if(!(t.mode&1))return Xa(e,t,s,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var a=r.dgst;return r=a,i=Error(M(419)),r=rd(i,r,void 0),Xa(e,t,s,r)}if(a=(s&e.childLanes)!==0,qt||a){if(r=ct,r!==null){switch(s&-s){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|s)?0:o,o!==0&&o!==i.retryLane&&(i.retryLane=o,nr(e,o),In(r,e,o,-1))}return Zf(),r=rd(Error(M(421))),Xa(e,t,s,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=Gb.bind(null,e),o._reactRetry=t,null):(e=i.treeContext,Xt=Or(o.nextSibling),Yt=t,De=!0,_n=null,e!==null&&(un[dn++]=Hn,un[dn++]=Gn,un[dn++]=mo,Hn=e.id,Gn=e.overflow,mo=t),t=Gf(t,r.children),t.flags|=4096,t)}function zg(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),mh(e.return,t,n)}function od(e,t,n,r,o){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=o)}function N1(e,t,n){var r=t.pendingProps,o=r.revealOrder,i=r.tail;if(Rt(e,t,r.children,n),r=Ve.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&zg(e,n,t);else if(e.tag===19)zg(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(Ne(Ve,r),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&Gl(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),od(t,!1,o,n,i);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&Gl(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}od(t,!0,n,null,i);break;case"together":od(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function wl(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function rr(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),vo|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(M(153));if(t.child!==null){for(e=t.child,n=jr(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=jr(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Mb(e,t,n){switch(t.tag){case 3:O1(t),vi();break;case 5:o1(t);break;case 1:Kt(t.type)&&Ul(t);break;case 4:Ff(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;Ne(Wl,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(Ne(Ve,Ve.current&1),t.flags|=128,null):n&t.child.childLanes?P1(e,t,n):(Ne(Ve,Ve.current&1),e=rr(e,t,n),e!==null?e.sibling:null);Ne(Ve,Ve.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return N1(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),Ne(Ve,Ve.current),r)break;return null;case 22:case 23:return t.lanes=0,k1(e,t,n)}return rr(e,t,n)}var A1,_h,j1,R1;A1=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};_h=function(){};j1=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,oo(Ln.current);var i=null;switch(n){case"input":o=qd(e,o),r=qd(e,r),i=[];break;case"select":o=We({},o,{value:void 0}),r=We({},r,{value:void 0}),i=[];break;case"textarea":o=Kd(e,o),r=Kd(e,r),i=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Fl)}Jd(n,r);var s;n=null;for(c in o)if(!r.hasOwnProperty(c)&&o.hasOwnProperty(c)&&o[c]!=null)if(c==="style"){var a=o[c];for(s in a)a.hasOwnProperty(s)&&(n||(n={}),n[s]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(_s.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in r){var l=r[c];if(a=o!=null?o[c]:void 0,r.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(s in a)!a.hasOwnProperty(s)||l&&l.hasOwnProperty(s)||(n||(n={}),n[s]="");for(s in l)l.hasOwnProperty(s)&&a[s]!==l[s]&&(n||(n={}),n[s]=l[s])}else n||(i||(i=[]),i.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(i=i||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(i=i||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(_s.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&je("scroll",e),i||a===l||(i=[])):(i=i||[]).push(c,l))}n&&(i=i||[]).push("style",n);var c=i;(t.updateQueue=c)&&(t.flags|=4)}};R1=function(e,t,n,r){n!==r&&(t.flags|=4)};function Gi(e,t){if(!De)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Ct(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Lb(e,t,n){var r=t.pendingProps;switch(Af(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ct(t),null;case 1:return Kt(t.type)&&zl(),Ct(t),null;case 3:return r=t.stateNode,wi(),Me(Gt),Me(jt),Uf(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Qa(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,_n!==null&&(Nh(_n),_n=null))),_h(e,t),Ct(t),null;case 5:zf(t);var o=oo(Ms.current);if(n=t.type,e!==null&&t.stateNode!=null)j1(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(M(166));return Ct(t),null}if(e=oo(Ln.current),Qa(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[An]=t,r[js]=i,e=(t.mode&1)!==0,n){case"dialog":je("cancel",r),je("close",r);break;case"iframe":case"object":case"embed":je("load",r);break;case"video":case"audio":for(o=0;o<rs.length;o++)je(rs[o],r);break;case"source":je("error",r);break;case"img":case"image":case"link":je("error",r),je("load",r);break;case"details":je("toggle",r);break;case"input":Qm(r,i),je("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},je("invalid",r);break;case"textarea":Xm(r,i),je("invalid",r)}Jd(n,i),o=null;for(var s in i)if(i.hasOwnProperty(s)){var a=i[s];s==="children"?typeof a=="string"?r.textContent!==a&&(i.suppressHydrationWarning!==!0&&Ka(r.textContent,a,e),o=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(i.suppressHydrationWarning!==!0&&Ka(r.textContent,a,e),o=["children",""+a]):_s.hasOwnProperty(s)&&a!=null&&s==="onScroll"&&je("scroll",r)}switch(n){case"input":za(r),Jm(r,i,!0);break;case"textarea":za(r),Ym(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Fl)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{s=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=a0(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=s.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=s.createElement(n,{is:r.is}):(e=s.createElement(n),n==="select"&&(s=e,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):e=s.createElementNS(e,n),e[An]=t,e[js]=r,A1(e,t,!1,!1),t.stateNode=e;e:{switch(s=Xd(n,r),n){case"dialog":je("cancel",e),je("close",e),o=r;break;case"iframe":case"object":case"embed":je("load",e),o=r;break;case"video":case"audio":for(o=0;o<rs.length;o++)je(rs[o],e);o=r;break;case"source":je("error",e),o=r;break;case"img":case"image":case"link":je("error",e),je("load",e),o=r;break;case"details":je("toggle",e),o=r;break;case"input":Qm(e,r),o=qd(e,r),je("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=We({},r,{value:void 0}),je("invalid",e);break;case"textarea":Xm(e,r),o=Kd(e,r),je("invalid",e);break;default:o=r}Jd(n,o),a=o;for(i in a)if(a.hasOwnProperty(i)){var l=a[i];i==="style"?u0(e,l):i==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&l0(e,l)):i==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&bs(e,l):typeof l=="number"&&bs(e,""+l):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(_s.hasOwnProperty(i)?l!=null&&i==="onScroll"&&je("scroll",e):l!=null&&vf(e,i,l,s))}switch(n){case"input":za(e),Jm(e,r,!1);break;case"textarea":za(e),Ym(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Dr(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?ni(e,!!r.multiple,i,!1):r.defaultValue!=null&&ni(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Fl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Ct(t),null;case 6:if(e&&t.stateNode!=null)R1(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(M(166));if(n=oo(Ms.current),oo(Ln.current),Qa(t)){if(r=t.stateNode,n=t.memoizedProps,r[An]=t,(i=r.nodeValue!==n)&&(e=Yt,e!==null))switch(e.tag){case 3:Ka(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ka(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[An]=t,t.stateNode=r}return Ct(t),null;case 13:if(Me(Ve),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(De&&Xt!==null&&t.mode&1&&!(t.flags&128))X0(),vi(),t.flags|=98560,i=!1;else if(i=Qa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(M(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(M(317));i[An]=t}else vi(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ct(t),i=!1}else _n!==null&&(Nh(_n),_n=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||Ve.current&1?nt===0&&(nt=3):Zf())),t.updateQueue!==null&&(t.flags|=4),Ct(t),null);case 4:return wi(),_h(e,t),e===null&&Ns(t.stateNode.containerInfo),Ct(t),null;case 10:return Lf(t.type._context),Ct(t),null;case 17:return Kt(t.type)&&zl(),Ct(t),null;case 19:if(Me(Ve),i=t.memoizedState,i===null)return Ct(t),null;if(r=(t.flags&128)!==0,s=i.rendering,s===null)if(r)Gi(i,!1);else{if(nt!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=Gl(e),s!==null){for(t.flags|=128,Gi(i,!1),r=s.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,s=i.alternate,s===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=s.childLanes,i.lanes=s.lanes,i.child=s.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=s.memoizedProps,i.memoizedState=s.memoizedState,i.updateQueue=s.updateQueue,i.type=s.type,e=s.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Ne(Ve,Ve.current&1|2),t.child}e=e.sibling}i.tail!==null&&Ke()>Si&&(t.flags|=128,r=!0,Gi(i,!1),t.lanes=4194304)}else{if(!r)if(e=Gl(s),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Gi(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!De)return Ct(t),null}else 2*Ke()-i.renderingStartTime>Si&&n!==1073741824&&(t.flags|=128,r=!0,Gi(i,!1),t.lanes=4194304);i.isBackwards?(s.sibling=t.child,t.child=s):(n=i.last,n!==null?n.sibling=s:t.child=s,i.last=s)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=Ke(),t.sibling=null,n=Ve.current,Ne(Ve,r?n&1|2:n&1),t):(Ct(t),null);case 22:case 23:return Yf(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Jt&1073741824&&(Ct(t),t.subtreeFlags&6&&(t.flags|=8192)):Ct(t),null;case 24:return null;case 25:return null}throw Error(M(156,t.tag))}function Db(e,t){switch(Af(t),t.tag){case 1:return Kt(t.type)&&zl(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return wi(),Me(Gt),Me(jt),Uf(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return zf(t),null;case 13:if(Me(Ve),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(M(340));vi()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Me(Ve),null;case 4:return wi(),null;case 10:return Lf(t.type._context),null;case 22:case 23:return Yf(),null;case 24:return null;default:return null}}var Ya=!1,Nt=!1,$b=typeof WeakSet=="function"?WeakSet:Set,H=null;function Xo(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){qe(e,t,r)}else n.current=null}function bh(e,t,n){try{n()}catch(r){qe(e,t,r)}}var Ug=!1;function Fb(e,t){if(ah=Ll,e=$0(),Pf(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var s=0,a=-1,l=-1,c=0,d=0,h=e,f=null;t:for(;;){for(var g;h!==n||o!==0&&h.nodeType!==3||(a=s+o),h!==i||r!==0&&h.nodeType!==3||(l=s+r),h.nodeType===3&&(s+=h.nodeValue.length),(g=h.firstChild)!==null;)f=h,h=g;for(;;){if(h===e)break t;if(f===n&&++c===o&&(a=s),f===i&&++d===r&&(l=s),(g=h.nextSibling)!==null)break;h=f,f=h.parentNode}h=g}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(lh={focusedElem:e,selectionRange:n},Ll=!1,H=t;H!==null;)if(t=H,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,H=e;else for(;H!==null;){t=H;try{var y=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var w=y.memoizedProps,C=y.memoizedState,m=t.stateNode,p=m.getSnapshotBeforeUpdate(t.elementType===t.type?w:Sn(t.type,w),C);m.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var v=t.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(M(163))}}catch(b){qe(t,t.return,b)}if(e=t.sibling,e!==null){e.return=t.return,H=e;break}H=t.return}return y=Ug,Ug=!1,y}function fs(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var i=o.destroy;o.destroy=void 0,i!==void 0&&bh(t,n,i)}o=o.next}while(o!==r)}}function Vc(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Ch(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function M1(e){var t=e.alternate;t!==null&&(e.alternate=null,M1(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[An],delete t[js],delete t[dh],delete t[Sb],delete t[xb])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function L1(e){return e.tag===5||e.tag===3||e.tag===4}function Vg(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||L1(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ih(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Fl));else if(r!==4&&(e=e.child,e!==null))for(Ih(e,t,n),e=e.sibling;e!==null;)Ih(e,t,n),e=e.sibling}function kh(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(kh(e,t,n),e=e.sibling;e!==null;)kh(e,t,n),e=e.sibling}var ft=null,xn=!1;function dr(e,t,n){for(n=n.child;n!==null;)D1(e,t,n),n=n.sibling}function D1(e,t,n){if(Mn&&typeof Mn.onCommitFiberUnmount=="function")try{Mn.onCommitFiberUnmount(Rc,n)}catch{}switch(n.tag){case 5:Nt||Xo(n,t);case 6:var r=ft,o=xn;ft=null,dr(e,t,n),ft=r,xn=o,ft!==null&&(xn?(e=ft,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ft.removeChild(n.stateNode));break;case 18:ft!==null&&(xn?(e=ft,n=n.stateNode,e.nodeType===8?Xu(e.parentNode,n):e.nodeType===1&&Xu(e,n),Ts(e)):Xu(ft,n.stateNode));break;case 4:r=ft,o=xn,ft=n.stateNode.containerInfo,xn=!0,dr(e,t,n),ft=r,xn=o;break;case 0:case 11:case 14:case 15:if(!Nt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var i=o,s=i.destroy;i=i.tag,s!==void 0&&(i&2||i&4)&&bh(n,t,s),o=o.next}while(o!==r)}dr(e,t,n);break;case 1:if(!Nt&&(Xo(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){qe(n,t,a)}dr(e,t,n);break;case 21:dr(e,t,n);break;case 22:n.mode&1?(Nt=(r=Nt)||n.memoizedState!==null,dr(e,t,n),Nt=r):dr(e,t,n);break;default:dr(e,t,n)}}function Bg(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new $b),t.forEach(function(r){var o=Kb.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function wn(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var i=e,s=t,a=s;e:for(;a!==null;){switch(a.tag){case 5:ft=a.stateNode,xn=!1;break e;case 3:ft=a.stateNode.containerInfo,xn=!0;break e;case 4:ft=a.stateNode.containerInfo,xn=!0;break e}a=a.return}if(ft===null)throw Error(M(160));D1(i,s,o),ft=null,xn=!1;var l=o.alternate;l!==null&&(l.return=null),o.return=null}catch(c){qe(o,t,c)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)$1(t,e),t=t.sibling}function $1(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(wn(t,e),On(e),r&4){try{fs(3,e,e.return),Vc(3,e)}catch(w){qe(e,e.return,w)}try{fs(5,e,e.return)}catch(w){qe(e,e.return,w)}}break;case 1:wn(t,e),On(e),r&512&&n!==null&&Xo(n,n.return);break;case 5:if(wn(t,e),On(e),r&512&&n!==null&&Xo(n,n.return),e.flags&32){var o=e.stateNode;try{bs(o,"")}catch(w){qe(e,e.return,w)}}if(r&4&&(o=e.stateNode,o!=null)){var i=e.memoizedProps,s=n!==null?n.memoizedProps:i,a=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{a==="input"&&i.type==="radio"&&i.name!=null&&i0(o,i),Xd(a,s);var c=Xd(a,i);for(s=0;s<l.length;s+=2){var d=l[s],h=l[s+1];d==="style"?u0(o,h):d==="dangerouslySetInnerHTML"?l0(o,h):d==="children"?bs(o,h):vf(o,d,h,c)}switch(a){case"input":Hd(o,i);break;case"textarea":s0(o,i);break;case"select":var f=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!i.multiple;var g=i.value;g!=null?ni(o,!!i.multiple,g,!1):f!==!!i.multiple&&(i.defaultValue!=null?ni(o,!!i.multiple,i.defaultValue,!0):ni(o,!!i.multiple,i.multiple?[]:"",!1))}o[js]=i}catch(w){qe(e,e.return,w)}}break;case 6:if(wn(t,e),On(e),r&4){if(e.stateNode===null)throw Error(M(162));o=e.stateNode,i=e.memoizedProps;try{o.nodeValue=i}catch(w){qe(e,e.return,w)}}break;case 3:if(wn(t,e),On(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Ts(t.containerInfo)}catch(w){qe(e,e.return,w)}break;case 4:wn(t,e),On(e);break;case 13:wn(t,e),On(e),o=e.child,o.flags&8192&&(i=o.memoizedState!==null,o.stateNode.isHidden=i,!i||o.alternate!==null&&o.alternate.memoizedState!==null||(Jf=Ke())),r&4&&Bg(e);break;case 22:if(d=n!==null&&n.memoizedState!==null,e.mode&1?(Nt=(c=Nt)||d,wn(t,e),Nt=c):wn(t,e),On(e),r&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!d&&e.mode&1)for(H=e,d=e.child;d!==null;){for(h=H=d;H!==null;){switch(f=H,g=f.child,f.tag){case 0:case 11:case 14:case 15:fs(4,f,f.return);break;case 1:Xo(f,f.return);var y=f.stateNode;if(typeof y.componentWillUnmount=="function"){r=f,n=f.return;try{t=r,y.props=t.memoizedProps,y.state=t.memoizedState,y.componentWillUnmount()}catch(w){qe(r,n,w)}}break;case 5:Xo(f,f.return);break;case 22:if(f.memoizedState!==null){qg(h);continue}}g!==null?(g.return=f,H=g):qg(h)}d=d.sibling}e:for(d=null,h=e;;){if(h.tag===5){if(d===null){d=h;try{o=h.stateNode,c?(i=o.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(a=h.stateNode,l=h.memoizedProps.style,s=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=c0("display",s))}catch(w){qe(e,e.return,w)}}}else if(h.tag===6){if(d===null)try{h.stateNode.nodeValue=c?"":h.memoizedProps}catch(w){qe(e,e.return,w)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===e)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===e)break e;for(;h.sibling===null;){if(h.return===null||h.return===e)break e;d===h&&(d=null),h=h.return}d===h&&(d=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:wn(t,e),On(e),r&4&&Bg(e);break;case 21:break;default:wn(t,e),On(e)}}function On(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(L1(n)){var r=n;break e}n=n.return}throw Error(M(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(bs(o,""),r.flags&=-33);var i=Vg(e);kh(e,i,o);break;case 3:case 4:var s=r.stateNode.containerInfo,a=Vg(e);Ih(e,a,s);break;default:throw Error(M(161))}}catch(l){qe(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function zb(e,t,n){H=e,F1(e)}function F1(e,t,n){for(var r=(e.mode&1)!==0;H!==null;){var o=H,i=o.child;if(o.tag===22&&r){var s=o.memoizedState!==null||Ya;if(!s){var a=o.alternate,l=a!==null&&a.memoizedState!==null||Nt;a=Ya;var c=Nt;if(Ya=s,(Nt=l)&&!c)for(H=o;H!==null;)s=H,l=s.child,s.tag===22&&s.memoizedState!==null?Hg(o):l!==null?(l.return=s,H=l):Hg(o);for(;i!==null;)H=i,F1(i),i=i.sibling;H=o,Ya=a,Nt=c}Wg(e)}else o.subtreeFlags&8772&&i!==null?(i.return=o,H=i):Wg(e)}}function Wg(e){for(;H!==null;){var t=H;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Nt||Vc(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Nt)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:Sn(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&kg(t,i,r);break;case 3:var s=t.updateQueue;if(s!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}kg(t,s,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var c=t.alternate;if(c!==null){var d=c.memoizedState;if(d!==null){var h=d.dehydrated;h!==null&&Ts(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(M(163))}Nt||t.flags&512&&Ch(t)}catch(f){qe(t,t.return,f)}}if(t===e){H=null;break}if(n=t.sibling,n!==null){n.return=t.return,H=n;break}H=t.return}}function qg(e){for(;H!==null;){var t=H;if(t===e){H=null;break}var n=t.sibling;if(n!==null){n.return=t.return,H=n;break}H=t.return}}function Hg(e){for(;H!==null;){var t=H;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{Vc(4,t)}catch(l){qe(t,n,l)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(l){qe(t,o,l)}}var i=t.return;try{Ch(t)}catch(l){qe(t,i,l)}break;case 5:var s=t.return;try{Ch(t)}catch(l){qe(t,s,l)}}}catch(l){qe(t,t.return,l)}if(t===e){H=null;break}var a=t.sibling;if(a!==null){a.return=t.return,H=a;break}H=t.return}}var Ub=Math.ceil,Jl=lr.ReactCurrentDispatcher,Kf=lr.ReactCurrentOwner,fn=lr.ReactCurrentBatchConfig,xe=0,ct=null,Xe=null,vt=0,Jt=0,Yo=Ur(0),nt=0,Fs=null,vo=0,Bc=0,Qf=0,ps=null,Bt=null,Jf=0,Si=1/0,Bn=null,Xl=!1,Th=null,Nr=null,Za=!1,_r=null,Yl=0,ms=0,Oh=null,El=-1,Sl=0;function $t(){return xe&6?Ke():El!==-1?El:El=Ke()}function Ar(e){return e.mode&1?xe&2&&vt!==0?vt&-vt:bb.transition!==null?(Sl===0&&(Sl=x0()),Sl):(e=Pe,e!==0||(e=window.event,e=e===void 0?16:O0(e.type)),e):1}function In(e,t,n,r){if(50<ms)throw ms=0,Oh=null,Error(M(185));ca(e,n,r),(!(xe&2)||e!==ct)&&(e===ct&&(!(xe&2)&&(Bc|=n),nt===4&&vr(e,vt)),Qt(e,r),n===1&&xe===0&&!(t.mode&1)&&(Si=Ke()+500,Fc&&Vr()))}function Qt(e,t){var n=e.callbackNode;b_(e,t);var r=Ml(e,e===ct?vt:0);if(r===0)n!==null&&tg(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&tg(n),t===1)e.tag===0?_b(Gg.bind(null,e)):K0(Gg.bind(null,e)),wb(function(){!(xe&6)&&Vr()}),n=null;else{switch(_0(r)){case 1:n=xf;break;case 4:n=E0;break;case 16:n=Rl;break;case 536870912:n=S0;break;default:n=Rl}n=G1(n,z1.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function z1(e,t){if(El=-1,Sl=0,xe&6)throw Error(M(327));var n=e.callbackNode;if(ai()&&e.callbackNode!==n)return null;var r=Ml(e,e===ct?vt:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Zl(e,r);else{t=r;var o=xe;xe|=2;var i=V1();(ct!==e||vt!==t)&&(Bn=null,Si=Ke()+500,co(e,t));do try{Wb();break}catch(a){U1(e,a)}while(1);Mf(),Jl.current=i,xe=o,Xe!==null?t=0:(ct=null,vt=0,t=nt)}if(t!==0){if(t===2&&(o=nh(e),o!==0&&(r=o,t=Ph(e,o))),t===1)throw n=Fs,co(e,0),vr(e,r),Qt(e,Ke()),n;if(t===6)vr(e,r);else{if(o=e.current.alternate,!(r&30)&&!Vb(o)&&(t=Zl(e,r),t===2&&(i=nh(e),i!==0&&(r=i,t=Ph(e,i))),t===1))throw n=Fs,co(e,0),vr(e,r),Qt(e,Ke()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(M(345));case 2:eo(e,Bt,Bn);break;case 3:if(vr(e,r),(r&130023424)===r&&(t=Jf+500-Ke(),10<t)){if(Ml(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){$t(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=uh(eo.bind(null,e,Bt,Bn),t);break}eo(e,Bt,Bn);break;case 4:if(vr(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var s=31-Cn(r);i=1<<s,s=t[s],s>o&&(o=s),r&=~i}if(r=o,r=Ke()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Ub(r/1960))-r,10<r){e.timeoutHandle=uh(eo.bind(null,e,Bt,Bn),r);break}eo(e,Bt,Bn);break;case 5:eo(e,Bt,Bn);break;default:throw Error(M(329))}}}return Qt(e,Ke()),e.callbackNode===n?z1.bind(null,e):null}function Ph(e,t){var n=ps;return e.current.memoizedState.isDehydrated&&(co(e,t).flags|=256),e=Zl(e,t),e!==2&&(t=Bt,Bt=n,t!==null&&Nh(t)),e}function Nh(e){Bt===null?Bt=e:Bt.push.apply(Bt,e)}function Vb(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],i=o.getSnapshot;o=o.value;try{if(!Tn(i(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function vr(e,t){for(t&=~Qf,t&=~Bc,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Cn(t),r=1<<n;e[n]=-1,t&=~r}}function Gg(e){if(xe&6)throw Error(M(327));ai();var t=Ml(e,0);if(!(t&1))return Qt(e,Ke()),null;var n=Zl(e,t);if(e.tag!==0&&n===2){var r=nh(e);r!==0&&(t=r,n=Ph(e,r))}if(n===1)throw n=Fs,co(e,0),vr(e,t),Qt(e,Ke()),n;if(n===6)throw Error(M(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,eo(e,Bt,Bn),Qt(e,Ke()),null}function Xf(e,t){var n=xe;xe|=1;try{return e(t)}finally{xe=n,xe===0&&(Si=Ke()+500,Fc&&Vr())}}function yo(e){_r!==null&&_r.tag===0&&!(xe&6)&&ai();var t=xe;xe|=1;var n=fn.transition,r=Pe;try{if(fn.transition=null,Pe=1,e)return e()}finally{Pe=r,fn.transition=n,xe=t,!(xe&6)&&Vr()}}function Yf(){Jt=Yo.current,Me(Yo)}function co(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,yb(n)),Xe!==null)for(n=Xe.return;n!==null;){var r=n;switch(Af(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&zl();break;case 3:wi(),Me(Gt),Me(jt),Uf();break;case 5:zf(r);break;case 4:wi();break;case 13:Me(Ve);break;case 19:Me(Ve);break;case 10:Lf(r.type._context);break;case 22:case 23:Yf()}n=n.return}if(ct=e,Xe=e=jr(e.current,null),vt=Jt=t,nt=0,Fs=null,Qf=Bc=vo=0,Bt=ps=null,ro!==null){for(t=0;t<ro.length;t++)if(n=ro[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,i=n.pending;if(i!==null){var s=i.next;i.next=o,r.next=s}n.pending=r}ro=null}return e}function U1(e,t){do{var n=Xe;try{if(Mf(),vl.current=Ql,Kl){for(var r=Be.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}Kl=!1}if(go=0,at=tt=Be=null,hs=!1,Ls=0,Kf.current=null,n===null||n.return===null){nt=1,Fs=t,Xe=null;break}e:{var i=e,s=n.return,a=n,l=t;if(t=vt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,d=a,h=d.tag;if(!(d.mode&1)&&(h===0||h===11||h===15)){var f=d.alternate;f?(d.updateQueue=f.updateQueue,d.memoizedState=f.memoizedState,d.lanes=f.lanes):(d.updateQueue=null,d.memoizedState=null)}var g=Rg(s);if(g!==null){g.flags&=-257,Mg(g,s,a,i,t),g.mode&1&&jg(i,c,t),t=g,l=c;var y=t.updateQueue;if(y===null){var w=new Set;w.add(l),t.updateQueue=w}else y.add(l);break e}else{if(!(t&1)){jg(i,c,t),Zf();break e}l=Error(M(426))}}else if(De&&a.mode&1){var C=Rg(s);if(C!==null){!(C.flags&65536)&&(C.flags|=256),Mg(C,s,a,i,t),jf(Ei(l,a));break e}}i=l=Ei(l,a),nt!==4&&(nt=2),ps===null?ps=[i]:ps.push(i),i=s;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var m=b1(i,l,t);Ig(i,m);break e;case 1:a=l;var p=i.type,v=i.stateNode;if(!(i.flags&128)&&(typeof p.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(Nr===null||!Nr.has(v)))){i.flags|=65536,t&=-t,i.lanes|=t;var b=C1(i,a,t);Ig(i,b);break e}}i=i.return}while(i!==null)}W1(n)}catch(k){t=k,Xe===n&&n!==null&&(Xe=n=n.return);continue}break}while(1)}function V1(){var e=Jl.current;return Jl.current=Ql,e===null?Ql:e}function Zf(){(nt===0||nt===3||nt===2)&&(nt=4),ct===null||!(vo&268435455)&&!(Bc&268435455)||vr(ct,vt)}function Zl(e,t){var n=xe;xe|=2;var r=V1();(ct!==e||vt!==t)&&(Bn=null,co(e,t));do try{Bb();break}catch(o){U1(e,o)}while(1);if(Mf(),xe=n,Jl.current=r,Xe!==null)throw Error(M(261));return ct=null,vt=0,nt}function Bb(){for(;Xe!==null;)B1(Xe)}function Wb(){for(;Xe!==null&&!m_();)B1(Xe)}function B1(e){var t=H1(e.alternate,e,Jt);e.memoizedProps=e.pendingProps,t===null?W1(e):Xe=t,Kf.current=null}function W1(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Db(n,t),n!==null){n.flags&=32767,Xe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{nt=6,Xe=null;return}}else if(n=Lb(n,t,Jt),n!==null){Xe=n;return}if(t=t.sibling,t!==null){Xe=t;return}Xe=t=e}while(t!==null);nt===0&&(nt=5)}function eo(e,t,n){var r=Pe,o=fn.transition;try{fn.transition=null,Pe=1,qb(e,t,n,r)}finally{fn.transition=o,Pe=r}return null}function qb(e,t,n,r){do ai();while(_r!==null);if(xe&6)throw Error(M(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(M(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(C_(e,i),e===ct&&(Xe=ct=null,vt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Za||(Za=!0,G1(Rl,function(){return ai(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=fn.transition,fn.transition=null;var s=Pe;Pe=1;var a=xe;xe|=4,Kf.current=null,Fb(e,n),$1(n,e),db(lh),Ll=!!ah,lh=ah=null,e.current=n,zb(n),g_(),xe=a,Pe=s,fn.transition=i}else e.current=n;if(Za&&(Za=!1,_r=e,Yl=o),i=e.pendingLanes,i===0&&(Nr=null),w_(n.stateNode),Qt(e,Ke()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(Xl)throw Xl=!1,e=Th,Th=null,e;return Yl&1&&e.tag!==0&&ai(),i=e.pendingLanes,i&1?e===Oh?ms++:(ms=0,Oh=e):ms=0,Vr(),null}function ai(){if(_r!==null){var e=_0(Yl),t=fn.transition,n=Pe;try{if(fn.transition=null,Pe=16>e?16:e,_r===null)var r=!1;else{if(e=_r,_r=null,Yl=0,xe&6)throw Error(M(331));var o=xe;for(xe|=4,H=e.current;H!==null;){var i=H,s=i.child;if(H.flags&16){var a=i.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(H=c;H!==null;){var d=H;switch(d.tag){case 0:case 11:case 15:fs(8,d,i)}var h=d.child;if(h!==null)h.return=d,H=h;else for(;H!==null;){d=H;var f=d.sibling,g=d.return;if(M1(d),d===c){H=null;break}if(f!==null){f.return=g,H=f;break}H=g}}}var y=i.alternate;if(y!==null){var w=y.child;if(w!==null){y.child=null;do{var C=w.sibling;w.sibling=null,w=C}while(w!==null)}}H=i}}if(i.subtreeFlags&2064&&s!==null)s.return=i,H=s;else e:for(;H!==null;){if(i=H,i.flags&2048)switch(i.tag){case 0:case 11:case 15:fs(9,i,i.return)}var m=i.sibling;if(m!==null){m.return=i.return,H=m;break e}H=i.return}}var p=e.current;for(H=p;H!==null;){s=H;var v=s.child;if(s.subtreeFlags&2064&&v!==null)v.return=s,H=v;else e:for(s=p;H!==null;){if(a=H,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Vc(9,a)}}catch(k){qe(a,a.return,k)}if(a===s){H=null;break e}var b=a.sibling;if(b!==null){b.return=a.return,H=b;break e}H=a.return}}if(xe=o,Vr(),Mn&&typeof Mn.onPostCommitFiberRoot=="function")try{Mn.onPostCommitFiberRoot(Rc,e)}catch{}r=!0}return r}finally{Pe=n,fn.transition=t}}return!1}function Kg(e,t,n){t=Ei(n,t),t=b1(e,t,1),e=Pr(e,t,1),t=$t(),e!==null&&(ca(e,1,t),Qt(e,t))}function qe(e,t,n){if(e.tag===3)Kg(e,e,n);else for(;t!==null;){if(t.tag===3){Kg(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Nr===null||!Nr.has(r))){e=Ei(n,e),e=C1(t,e,1),t=Pr(t,e,1),e=$t(),t!==null&&(ca(t,1,e),Qt(t,e));break}}t=t.return}}function Hb(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=$t(),e.pingedLanes|=e.suspendedLanes&n,ct===e&&(vt&n)===n&&(nt===4||nt===3&&(vt&130023424)===vt&&500>Ke()-Jf?co(e,0):Qf|=n),Qt(e,t)}function q1(e,t){t===0&&(e.mode&1?(t=Ba,Ba<<=1,!(Ba&130023424)&&(Ba=4194304)):t=1);var n=$t();e=nr(e,t),e!==null&&(ca(e,t,n),Qt(e,n))}function Gb(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),q1(e,n)}function Kb(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(M(314))}r!==null&&r.delete(t),q1(e,n)}var H1;H1=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Gt.current)qt=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return qt=!1,Mb(e,t,n);qt=!!(e.flags&131072)}else qt=!1,De&&t.flags&1048576&&Q0(t,Bl,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;wl(e,t),e=t.pendingProps;var o=gi(t,jt.current);si(t,n),o=Bf(null,t,r,e,o,n);var i=Wf();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Kt(r)?(i=!0,Ul(t)):i=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,$f(t),o.updater=zc,t.stateNode=o,o._reactInternals=t,vh(t,r,e,n),t=Eh(null,t,r,!0,i,n)):(t.tag=0,De&&i&&Nf(t),Rt(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(wl(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=Jb(r),e=Sn(r,e),o){case 0:t=wh(null,t,r,e,n);break e;case 1:t=$g(null,t,r,e,n);break e;case 11:t=Lg(null,t,r,e,n);break e;case 14:t=Dg(null,t,r,Sn(r.type,e),n);break e}throw Error(M(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Sn(r,o),wh(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Sn(r,o),$g(e,t,r,o,n);case 3:e:{if(O1(t),e===null)throw Error(M(387));r=t.pendingProps,i=t.memoizedState,o=i.element,Z0(e,t),Hl(t,r,null,n);var s=t.memoizedState;if(r=s.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){o=Ei(Error(M(423)),t),t=Fg(e,t,r,n,o);break e}else if(r!==o){o=Ei(Error(M(424)),t),t=Fg(e,t,r,n,o);break e}else for(Xt=Or(t.stateNode.containerInfo.firstChild),Yt=t,De=!0,_n=null,n=r1(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(vi(),r===o){t=rr(e,t,n);break e}Rt(e,t,r,n)}t=t.child}return t;case 5:return o1(t),e===null&&ph(t),r=t.type,o=t.pendingProps,i=e!==null?e.memoizedProps:null,s=o.children,ch(r,o)?s=null:i!==null&&ch(r,i)&&(t.flags|=32),T1(e,t),Rt(e,t,s,n),t.child;case 6:return e===null&&ph(t),null;case 13:return P1(e,t,n);case 4:return Ff(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=yi(t,null,r,n):Rt(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Sn(r,o),Lg(e,t,r,o,n);case 7:return Rt(e,t,t.pendingProps,n),t.child;case 8:return Rt(e,t,t.pendingProps.children,n),t.child;case 12:return Rt(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,i=t.memoizedProps,s=o.value,Ne(Wl,r._currentValue),r._currentValue=s,i!==null)if(Tn(i.value,s)){if(i.children===o.children&&!Gt.current){t=rr(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var a=i.dependencies;if(a!==null){s=i.child;for(var l=a.firstContext;l!==null;){if(l.context===r){if(i.tag===1){l=Xn(-1,n&-n),l.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var d=c.pending;d===null?l.next=l:(l.next=d.next,d.next=l),c.pending=l}}i.lanes|=n,l=i.alternate,l!==null&&(l.lanes|=n),mh(i.return,n,t),a.lanes|=n;break}l=l.next}}else if(i.tag===10)s=i.type===t.type?null:i.child;else if(i.tag===18){if(s=i.return,s===null)throw Error(M(341));s.lanes|=n,a=s.alternate,a!==null&&(a.lanes|=n),mh(s,n,t),s=i.sibling}else s=i.child;if(s!==null)s.return=i;else for(s=i;s!==null;){if(s===t){s=null;break}if(i=s.sibling,i!==null){i.return=s.return,s=i;break}s=s.return}i=s}Rt(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,si(t,n),o=gn(o),r=r(o),t.flags|=1,Rt(e,t,r,n),t.child;case 14:return r=t.type,o=Sn(r,t.pendingProps),o=Sn(r.type,o),Dg(e,t,r,o,n);case 15:return I1(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Sn(r,o),wl(e,t),t.tag=1,Kt(r)?(e=!0,Ul(t)):e=!1,si(t,n),t1(t,r,o),vh(t,r,o,n),Eh(null,t,r,!0,e,n);case 19:return N1(e,t,n);case 22:return k1(e,t,n)}throw Error(M(156,t.tag))};function G1(e,t){return w0(e,t)}function Qb(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function hn(e,t,n,r){return new Qb(e,t,n,r)}function ep(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Jb(e){if(typeof e=="function")return ep(e)?1:0;if(e!=null){if(e=e.$$typeof,e===wf)return 11;if(e===Ef)return 14}return 2}function jr(e,t){var n=e.alternate;return n===null?(n=hn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function xl(e,t,n,r,o,i){var s=2;if(r=e,typeof e=="function")ep(e)&&(s=1);else if(typeof e=="string")s=5;else e:switch(e){case Vo:return uo(n.children,o,i,t);case yf:s=8,o|=8;break;case Ud:return e=hn(12,n,t,o|2),e.elementType=Ud,e.lanes=i,e;case Vd:return e=hn(13,n,t,o),e.elementType=Vd,e.lanes=i,e;case Bd:return e=hn(19,n,t,o),e.elementType=Bd,e.lanes=i,e;case n0:return Wc(n,o,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case e0:s=10;break e;case t0:s=9;break e;case wf:s=11;break e;case Ef:s=14;break e;case pr:s=16,r=null;break e}throw Error(M(130,e==null?e:typeof e,""))}return t=hn(s,n,t,o),t.elementType=e,t.type=r,t.lanes=i,t}function uo(e,t,n,r){return e=hn(7,e,r,t),e.lanes=n,e}function Wc(e,t,n,r){return e=hn(22,e,r,t),e.elementType=n0,e.lanes=n,e.stateNode={isHidden:!1},e}function id(e,t,n){return e=hn(6,e,null,t),e.lanes=n,e}function sd(e,t,n){return t=hn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Xb(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=zu(0),this.expirationTimes=zu(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=zu(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function tp(e,t,n,r,o,i,s,a,l){return e=new Xb(e,t,n,a,l),t===1?(t=1,i===!0&&(t|=8)):t=0,i=hn(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},$f(i),e}function Yb(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Uo,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function K1(e){if(!e)return $r;e=e._reactInternals;e:{if(No(e)!==e||e.tag!==1)throw Error(M(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Kt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(M(171))}if(e.tag===1){var n=e.type;if(Kt(n))return G0(e,n,t)}return t}function Q1(e,t,n,r,o,i,s,a,l){return e=tp(n,r,!0,e,o,i,s,a,l),e.context=K1(null),n=e.current,r=$t(),o=Ar(n),i=Xn(r,o),i.callback=t??null,Pr(n,i,o),e.current.lanes=o,ca(e,o,r),Qt(e,r),e}function qc(e,t,n,r){var o=t.current,i=$t(),s=Ar(o);return n=K1(n),t.context===null?t.context=n:t.pendingContext=n,t=Xn(i,s),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=Pr(o,t,s),e!==null&&(In(e,o,s,i),gl(e,o,s)),s}function ec(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Qg(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function np(e,t){Qg(e,t),(e=e.alternate)&&Qg(e,t)}function Zb(){return null}var J1=typeof reportError=="function"?reportError:function(e){console.error(e)};function rp(e){this._internalRoot=e}Hc.prototype.render=rp.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(M(409));qc(e,t,null,null)};Hc.prototype.unmount=rp.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;yo(function(){qc(null,e,null,null)}),t[tr]=null}};function Hc(e){this._internalRoot=e}Hc.prototype.unstable_scheduleHydration=function(e){if(e){var t=I0();e={blockedOn:null,target:e,priority:t};for(var n=0;n<gr.length&&t!==0&&t<gr[n].priority;n++);gr.splice(n,0,e),n===0&&T0(e)}};function op(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Gc(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Jg(){}function eC(e,t,n,r,o){if(o){if(typeof r=="function"){var i=r;r=function(){var c=ec(s);i.call(c)}}var s=Q1(t,r,e,0,null,!1,!1,"",Jg);return e._reactRootContainer=s,e[tr]=s.current,Ns(e.nodeType===8?e.parentNode:e),yo(),s}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var a=r;r=function(){var c=ec(l);a.call(c)}}var l=tp(e,0,!1,null,null,!1,!1,"",Jg);return e._reactRootContainer=l,e[tr]=l.current,Ns(e.nodeType===8?e.parentNode:e),yo(function(){qc(t,l,n,r)}),l}function Kc(e,t,n,r,o){var i=n._reactRootContainer;if(i){var s=i;if(typeof o=="function"){var a=o;o=function(){var l=ec(s);a.call(l)}}qc(t,s,e,o)}else s=eC(n,t,e,o,r);return ec(s)}b0=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=ns(t.pendingLanes);n!==0&&(_f(t,n|1),Qt(t,Ke()),!(xe&6)&&(Si=Ke()+500,Vr()))}break;case 13:yo(function(){var r=nr(e,1);if(r!==null){var o=$t();In(r,e,1,o)}}),np(e,1)}};bf=function(e){if(e.tag===13){var t=nr(e,134217728);if(t!==null){var n=$t();In(t,e,134217728,n)}np(e,134217728)}};C0=function(e){if(e.tag===13){var t=Ar(e),n=nr(e,t);if(n!==null){var r=$t();In(n,e,t,r)}np(e,t)}};I0=function(){return Pe};k0=function(e,t){var n=Pe;try{return Pe=e,t()}finally{Pe=n}};Zd=function(e,t,n){switch(t){case"input":if(Hd(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=$c(r);if(!o)throw Error(M(90));o0(r),Hd(r,o)}}}break;case"textarea":s0(e,n);break;case"select":t=n.value,t!=null&&ni(e,!!n.multiple,t,!1)}};f0=Xf;p0=yo;var tC={usingClientEntryPoint:!1,Events:[da,Ho,$c,d0,h0,Xf]},Ki={findFiberByHostInstance:no,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"},nC={bundleType:Ki.bundleType,version:Ki.version,rendererPackageName:Ki.rendererPackageName,rendererConfig:Ki.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:lr.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=v0(e),e===null?null:e.stateNode},findFiberByHostInstance:Ki.findFiberByHostInstance||Zb,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var el=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!el.isDisabled&&el.supportsFiber)try{Rc=el.inject(nC),Mn=el}catch{}}sn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=tC;sn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!op(t))throw Error(M(200));return Yb(e,t,null,n)};sn.createRoot=function(e,t){if(!op(e))throw Error(M(299));var n=!1,r="",o=J1;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=tp(e,1,!1,null,null,n,!1,r,o),e[tr]=t.current,Ns(e.nodeType===8?e.parentNode:e),new rp(t)};sn.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(M(188)):(e=Object.keys(e).join(","),Error(M(268,e)));return e=v0(t),e=e===null?null:e.stateNode,e};sn.flushSync=function(e){return yo(e)};sn.hydrate=function(e,t,n){if(!Gc(t))throw Error(M(200));return Kc(null,e,t,!0,n)};sn.hydrateRoot=function(e,t,n){if(!op(e))throw Error(M(405));var r=n!=null&&n.hydratedSources||null,o=!1,i="",s=J1;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(s=n.onRecoverableError)),t=Q1(t,null,e,1,n??null,o,!1,i,s),e[tr]=t.current,Ns(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new Hc(t)};sn.render=function(e,t,n){if(!Gc(t))throw Error(M(200));return Kc(null,e,t,!1,n)};sn.unmountComponentAtNode=function(e){if(!Gc(e))throw Error(M(40));return e._reactRootContainer?(yo(function(){Kc(null,null,e,!1,function(){e._reactRootContainer=null,e[tr]=null})}),!0):!1};sn.unstable_batchedUpdates=Xf;sn.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Gc(n))throw Error(M(200));if(e==null||e._reactInternals===void 0)throw Error(M(38));return Kc(e,t,n,!1,r)};sn.version="18.2.0-next-9e3b772b8-20220608";function X1(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(X1)}catch(e){console.error(e)}}X1(),Qy.exports=sn;var rC=Qy.exports,Xg=rC;Fd.createRoot=Xg.createRoot,Fd.hydrateRoot=Xg.hydrateRoot;/**
 * @remix-run/router v1.7.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function zs(){return zs=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},zs.apply(this,arguments)}var br;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(br||(br={}));const Yg="popstate";function oC(e){e===void 0&&(e={});function t(r,o){let{pathname:i,search:s,hash:a}=r.location;return Ah("",{pathname:i,search:s,hash:a},o.state&&o.state.usr||null,o.state&&o.state.key||"default")}function n(r,o){return typeof o=="string"?o:tc(o)}return sC(t,n,null,e)}function Qe(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function ip(e,t){if(!e){typeof console<"u"&&console.warn(t);try{throw new Error(t)}catch{}}}function iC(){return Math.random().toString(36).substr(2,8)}function Zg(e,t){return{usr:e.state,key:e.key,idx:t}}function Ah(e,t,n,r){return n===void 0&&(n=null),zs({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof t=="string"?Ai(t):t,{state:n,key:t&&t.key||r||iC()})}function tc(e){let{pathname:t="/",search:n="",hash:r=""}=e;return n&&n!=="?"&&(t+=n.charAt(0)==="?"?n:"?"+n),r&&r!=="#"&&(t+=r.charAt(0)==="#"?r:"#"+r),t}function Ai(e){let t={};if(e){let n=e.indexOf("#");n>=0&&(t.hash=e.substr(n),e=e.substr(0,n));let r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}function sC(e,t,n,r){r===void 0&&(r={});let{window:o=document.defaultView,v5Compat:i=!1}=r,s=o.history,a=br.Pop,l=null,c=d();c==null&&(c=0,s.replaceState(zs({},s.state,{idx:c}),""));function d(){return(s.state||{idx:null}).idx}function h(){a=br.Pop;let C=d(),m=C==null?null:C-c;c=C,l&&l({action:a,location:w.location,delta:m})}function f(C,m){a=br.Push;let p=Ah(w.location,C,m);n&&n(p,C),c=d()+1;let v=Zg(p,c),b=w.createHref(p);try{s.pushState(v,"",b)}catch(k){if(k instanceof DOMException&&k.name==="DataCloneError")throw k;o.location.assign(b)}i&&l&&l({action:a,location:w.location,delta:1})}function g(C,m){a=br.Replace;let p=Ah(w.location,C,m);n&&n(p,C),c=d();let v=Zg(p,c),b=w.createHref(p);s.replaceState(v,"",b),i&&l&&l({action:a,location:w.location,delta:0})}function y(C){let m=o.location.origin!=="null"?o.location.origin:o.location.href,p=typeof C=="string"?C:tc(C);return Qe(m,"No window.location.(origin|href) available to create URL for href: "+p),new URL(p,m)}let w={get action(){return a},get location(){return e(o,s)},listen(C){if(l)throw new Error("A history only accepts one active listener");return o.addEventListener(Yg,h),l=C,()=>{o.removeEventListener(Yg,h),l=null}},createHref(C){return t(o,C)},createURL:y,encodeLocation(C){let m=y(C);return{pathname:m.pathname,search:m.search,hash:m.hash}},push:f,replace:g,go(C){return s.go(C)}};return w}var ev;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(ev||(ev={}));function aC(e,t,n){n===void 0&&(n="/");let r=typeof t=="string"?Ai(t):t,o=sp(r.pathname||"/",n);if(o==null)return null;let i=Y1(e);lC(i);let s=null;for(let a=0;s==null&&a<i.length;++a)s=vC(i[a],EC(o));return s}function Y1(e,t,n,r){t===void 0&&(t=[]),n===void 0&&(n=[]),r===void 0&&(r="");let o=(i,s,a)=>{let l={relativePath:a===void 0?i.path||"":a,caseSensitive:i.caseSensitive===!0,childrenIndex:s,route:i};l.relativePath.startsWith("/")&&(Qe(l.relativePath.startsWith(r),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+r+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(r.length));let c=Rr([r,l.relativePath]),d=n.concat(l);i.children&&i.children.length>0&&(Qe(i.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),Y1(i.children,t,d,c)),!(i.path==null&&!i.index)&&t.push({path:c,score:mC(c,i.index),routesMeta:d})};return e.forEach((i,s)=>{var a;if(i.path===""||!((a=i.path)!=null&&a.includes("?")))o(i,s);else for(let l of Z1(i.path))o(i,s,l)}),t}function Z1(e){let t=e.split("/");if(t.length===0)return[];let[n,...r]=t,o=n.endsWith("?"),i=n.replace(/\?$/,"");if(r.length===0)return o?[i,""]:[i];let s=Z1(r.join("/")),a=[];return a.push(...s.map(l=>l===""?i:[i,l].join("/"))),o&&a.push(...s),a.map(l=>e.startsWith("/")&&l===""?"/":l)}function lC(e){e.sort((t,n)=>t.score!==n.score?n.score-t.score:gC(t.routesMeta.map(r=>r.childrenIndex),n.routesMeta.map(r=>r.childrenIndex)))}const cC=/^:\w+$/,uC=3,dC=2,hC=1,fC=10,pC=-2,tv=e=>e==="*";function mC(e,t){let n=e.split("/"),r=n.length;return n.some(tv)&&(r+=pC),t&&(r+=dC),n.filter(o=>!tv(o)).reduce((o,i)=>o+(cC.test(i)?uC:i===""?hC:fC),r)}function gC(e,t){return e.length===t.length&&e.slice(0,-1).every((r,o)=>r===t[o])?e[e.length-1]-t[t.length-1]:0}function vC(e,t){let{routesMeta:n}=e,r={},o="/",i=[];for(let s=0;s<n.length;++s){let a=n[s],l=s===n.length-1,c=o==="/"?t:t.slice(o.length)||"/",d=yC({path:a.relativePath,caseSensitive:a.caseSensitive,end:l},c);if(!d)return null;Object.assign(r,d.params);let h=a.route;i.push({params:r,pathname:Rr([o,d.pathname]),pathnameBase:bC(Rr([o,d.pathnameBase])),route:h}),d.pathnameBase!=="/"&&(o=Rr([o,d.pathnameBase]))}return i}function yC(e,t){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[n,r]=wC(e.path,e.caseSensitive,e.end),o=t.match(n);if(!o)return null;let i=o[0],s=i.replace(/(.)\/+$/,"$1"),a=o.slice(1);return{params:r.reduce((c,d,h)=>{if(d==="*"){let f=a[h]||"";s=i.slice(0,i.length-f.length).replace(/(.)\/+$/,"$1")}return c[d]=SC(a[h]||"",d),c},{}),pathname:i,pathnameBase:s,pattern:e}}function wC(e,t,n){t===void 0&&(t=!1),n===void 0&&(n=!0),ip(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let r=[],o="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^$?{}|()[\]]/g,"\\$&").replace(/\/:(\w+)/g,(s,a)=>(r.push(a),"/([^\\/]+)"));return e.endsWith("*")?(r.push("*"),o+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?o+="\\/*$":e!==""&&e!=="/"&&(o+="(?:(?=\\/|$))"),[new RegExp(o,t?void 0:"i"),r]}function EC(e){try{return decodeURI(e)}catch(t){return ip(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+t+").")),e}}function SC(e,t){try{return decodeURIComponent(e)}catch(n){return ip(!1,'The value for the URL param "'+t+'" will not be decoded because'+(' the string "'+e+'" is a malformed URL segment. This is probably')+(" due to a bad percent encoding ("+n+").")),e}}function sp(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let n=t.endsWith("/")?t.length-1:t.length,r=e.charAt(n);return r&&r!=="/"?null:e.slice(n)||"/"}function xC(e,t){t===void 0&&(t="/");let{pathname:n,search:r="",hash:o=""}=typeof e=="string"?Ai(e):e;return{pathname:n?n.startsWith("/")?n:_C(n,t):t,search:CC(r),hash:IC(o)}}function _C(e,t){let n=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(o=>{o===".."?n.length>1&&n.pop():o!=="."&&n.push(o)}),n.length>1?n.join("/"):"/"}function ad(e,t,n,r){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(r)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function ap(e){return e.filter((t,n)=>n===0||t.route.path&&t.route.path.length>0)}function lp(e,t,n,r){r===void 0&&(r=!1);let o;typeof e=="string"?o=Ai(e):(o=zs({},e),Qe(!o.pathname||!o.pathname.includes("?"),ad("?","pathname","search",o)),Qe(!o.pathname||!o.pathname.includes("#"),ad("#","pathname","hash",o)),Qe(!o.search||!o.search.includes("#"),ad("#","search","hash",o)));let i=e===""||o.pathname==="",s=i?"/":o.pathname,a;if(r||s==null)a=n;else{let h=t.length-1;if(s.startsWith("..")){let f=s.split("/");for(;f[0]==="..";)f.shift(),h-=1;o.pathname=f.join("/")}a=h>=0?t[h]:"/"}let l=xC(o,a),c=s&&s!=="/"&&s.endsWith("/"),d=(i||s===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(c||d)&&(l.pathname+="/"),l}const Rr=e=>e.join("/").replace(/\/\/+/g,"/"),bC=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),CC=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,IC=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function kC(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const ew=["post","put","patch","delete"];new Set(ew);const TC=["get",...ew];new Set(TC);/**
 * React Router v6.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function nc(){return nc=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},nc.apply(this,arguments)}const cp=I.createContext(null),tw=I.createContext(null),Ao=I.createContext(null),Qc=I.createContext(null),Br=I.createContext({outlet:null,matches:[],isDataRoute:!1}),nw=I.createContext(null);function OC(e,t){let{relative:n}=t===void 0?{}:t;ji()||Qe(!1);let{basename:r,navigator:o}=I.useContext(Ao),{hash:i,pathname:s,search:a}=up(e,{relative:n}),l=s;return r!=="/"&&(l=s==="/"?r:Rr([r,s])),o.createHref({pathname:l,search:a,hash:i})}function ji(){return I.useContext(Qc)!=null}function Wr(){return ji()||Qe(!1),I.useContext(Qc).location}function rw(e){I.useContext(Ao).static||I.useLayoutEffect(e)}function Jc(){let{isDataRoute:e}=I.useContext(Br);return e?VC():PC()}function PC(){ji()||Qe(!1);let e=I.useContext(cp),{basename:t,navigator:n}=I.useContext(Ao),{matches:r}=I.useContext(Br),{pathname:o}=Wr(),i=JSON.stringify(ap(r).map(l=>l.pathnameBase)),s=I.useRef(!1);return rw(()=>{s.current=!0}),I.useCallback(function(l,c){if(c===void 0&&(c={}),!s.current)return;if(typeof l=="number"){n.go(l);return}let d=lp(l,JSON.parse(i),o,c.relative==="path");e==null&&t!=="/"&&(d.pathname=d.pathname==="/"?t:Rr([t,d.pathname])),(c.replace?n.replace:n.push)(d,c.state,c)},[t,n,i,o,e])}function up(e,t){let{relative:n}=t===void 0?{}:t,{matches:r}=I.useContext(Br),{pathname:o}=Wr(),i=JSON.stringify(ap(r).map(s=>s.pathnameBase));return I.useMemo(()=>lp(e,JSON.parse(i),o,n==="path"),[e,i,o,n])}function NC(e,t){return AC(e,t)}function AC(e,t,n){ji()||Qe(!1);let{navigator:r}=I.useContext(Ao),{matches:o}=I.useContext(Br),i=o[o.length-1],s=i?i.params:{};i&&i.pathname;let a=i?i.pathnameBase:"/";i&&i.route;let l=Wr(),c;if(t){var d;let w=typeof t=="string"?Ai(t):t;a==="/"||(d=w.pathname)!=null&&d.startsWith(a)||Qe(!1),c=w}else c=l;let h=c.pathname||"/",f=a==="/"?h:h.slice(a.length)||"/",g=aC(e,{pathname:f}),y=DC(g&&g.map(w=>Object.assign({},w,{params:Object.assign({},s,w.params),pathname:Rr([a,r.encodeLocation?r.encodeLocation(w.pathname).pathname:w.pathname]),pathnameBase:w.pathnameBase==="/"?a:Rr([a,r.encodeLocation?r.encodeLocation(w.pathnameBase).pathname:w.pathnameBase])})),o,n);return t&&y?I.createElement(Qc.Provider,{value:{location:nc({pathname:"/",search:"",hash:"",state:null,key:"default"},c),navigationType:br.Pop}},y):y}function jC(){let e=UC(),t=kC(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),n=e instanceof Error?e.stack:null,o={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"},i=null;return I.createElement(I.Fragment,null,I.createElement("h2",null,"Unexpected Application Error!"),I.createElement("h3",{style:{fontStyle:"italic"}},t),n?I.createElement("pre",{style:o},n):null,i)}const RC=I.createElement(jC,null);class MC extends I.Component{constructor(t){super(t),this.state={location:t.location,revalidation:t.revalidation,error:t.error}}static getDerivedStateFromError(t){return{error:t}}static getDerivedStateFromProps(t,n){return n.location!==t.location||n.revalidation!=="idle"&&t.revalidation==="idle"?{error:t.error,location:t.location,revalidation:t.revalidation}:{error:t.error||n.error,location:n.location,revalidation:t.revalidation||n.revalidation}}componentDidCatch(t,n){console.error("React Router caught the following error during render",t,n)}render(){return this.state.error?I.createElement(Br.Provider,{value:this.props.routeContext},I.createElement(nw.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function LC(e){let{routeContext:t,match:n,children:r}=e,o=I.useContext(cp);return o&&o.static&&o.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(o.staticContext._deepestRenderedBoundaryId=n.route.id),I.createElement(Br.Provider,{value:t},r)}function DC(e,t,n){var r;if(t===void 0&&(t=[]),n===void 0&&(n=null),e==null){var o;if((o=n)!=null&&o.errors)e=n.matches;else return null}let i=e,s=(r=n)==null?void 0:r.errors;if(s!=null){let a=i.findIndex(l=>l.route.id&&(s==null?void 0:s[l.route.id]));a>=0||Qe(!1),i=i.slice(0,Math.min(i.length,a+1))}return i.reduceRight((a,l,c)=>{let d=l.route.id?s==null?void 0:s[l.route.id]:null,h=null;n&&(h=l.route.errorElement||RC);let f=t.concat(i.slice(0,c+1)),g=()=>{let y;return d?y=h:l.route.Component?y=I.createElement(l.route.Component,null):l.route.element?y=l.route.element:y=a,I.createElement(LC,{match:l,routeContext:{outlet:a,matches:f,isDataRoute:n!=null},children:y})};return n&&(l.route.ErrorBoundary||l.route.errorElement||c===0)?I.createElement(MC,{location:n.location,revalidation:n.revalidation,component:h,error:d,children:g(),routeContext:{outlet:null,matches:f,isDataRoute:!0}}):g()},null)}var jh;(function(e){e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate"})(jh||(jh={}));var Us;(function(e){e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId"})(Us||(Us={}));function $C(e){let t=I.useContext(cp);return t||Qe(!1),t}function FC(e){let t=I.useContext(tw);return t||Qe(!1),t}function zC(e){let t=I.useContext(Br);return t||Qe(!1),t}function ow(e){let t=zC(),n=t.matches[t.matches.length-1];return n.route.id||Qe(!1),n.route.id}function UC(){var e;let t=I.useContext(nw),n=FC(Us.UseRouteError),r=ow(Us.UseRouteError);return t||((e=n.errors)==null?void 0:e[r])}function VC(){let{router:e}=$C(jh.UseNavigateStable),t=ow(Us.UseNavigateStable),n=I.useRef(!1);return rw(()=>{n.current=!0}),I.useCallback(function(o,i){i===void 0&&(i={}),n.current&&(typeof o=="number"?e.navigate(o):e.navigate(o,nc({fromRouteId:t},i)))},[e,t])}function Qi(e){let{to:t,replace:n,state:r,relative:o}=e;ji()||Qe(!1);let{matches:i}=I.useContext(Br),{pathname:s}=Wr(),a=Jc(),l=lp(t,ap(i).map(d=>d.pathnameBase),s,o==="path"),c=JSON.stringify(l);return I.useEffect(()=>a(JSON.parse(c),{replace:n,state:r,relative:o}),[a,c,o,n,r]),null}function En(e){Qe(!1)}function BC(e){let{basename:t="/",children:n=null,location:r,navigationType:o=br.Pop,navigator:i,static:s=!1}=e;ji()&&Qe(!1);let a=t.replace(/^\/*/,"/"),l=I.useMemo(()=>({basename:a,navigator:i,static:s}),[a,i,s]);typeof r=="string"&&(r=Ai(r));let{pathname:c="/",search:d="",hash:h="",state:f=null,key:g="default"}=r,y=I.useMemo(()=>{let w=sp(c,a);return w==null?null:{location:{pathname:w,search:d,hash:h,state:f,key:g},navigationType:o}},[a,c,d,h,f,g,o]);return y==null?null:I.createElement(Ao.Provider,{value:l},I.createElement(Qc.Provider,{children:n,value:y}))}function WC(e){let{children:t,location:n}=e;return NC(Rh(t),n)}var nv;(function(e){e[e.pending=0]="pending",e[e.success=1]="success",e[e.error=2]="error"})(nv||(nv={}));new Promise(()=>{});function Rh(e,t){t===void 0&&(t=[]);let n=[];return I.Children.forEach(e,(r,o)=>{if(!I.isValidElement(r))return;let i=[...t,o];if(r.type===I.Fragment){n.push.apply(n,Rh(r.props.children,i));return}r.type!==En&&Qe(!1),!r.props.index||!r.props.children||Qe(!1);let s={id:r.props.id||i.join("-"),caseSensitive:r.props.caseSensitive,element:r.props.element,Component:r.props.Component,index:r.props.index,path:r.props.path,loader:r.props.loader,action:r.props.action,errorElement:r.props.errorElement,ErrorBoundary:r.props.ErrorBoundary,hasErrorBoundary:r.props.ErrorBoundary!=null||r.props.errorElement!=null,shouldRevalidate:r.props.shouldRevalidate,handle:r.props.handle,lazy:r.props.lazy};r.props.children&&(s.children=Rh(r.props.children,i)),n.push(s)}),n}/**
 * React Router DOM v6.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function rc(){return rc=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},rc.apply(this,arguments)}function iw(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function qC(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function HC(e,t){return e.button===0&&(!t||t==="_self")&&!qC(e)}const GC=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset"],KC=["aria-current","caseSensitive","className","end","style","to","children"],QC="startTransition",rv=Gx[QC];function JC(e){let{basename:t,children:n,future:r,window:o}=e,i=I.useRef();i.current==null&&(i.current=oC({window:o,v5Compat:!0}));let s=i.current,[a,l]=I.useState({action:s.action,location:s.location}),{v7_startTransition:c}=r||{},d=I.useCallback(h=>{c&&rv?rv(()=>l(h)):l(h)},[l,c]);return I.useLayoutEffect(()=>s.listen(d),[s,d]),I.createElement(BC,{basename:t,children:n,location:a.location,navigationType:a.action,navigator:s})}const XC=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",YC=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,_l=I.forwardRef(function(t,n){let{onClick:r,relative:o,reloadDocument:i,replace:s,state:a,target:l,to:c,preventScrollReset:d}=t,h=iw(t,GC),{basename:f}=I.useContext(Ao),g,y=!1;if(typeof c=="string"&&YC.test(c)&&(g=c,XC))try{let p=new URL(window.location.href),v=c.startsWith("//")?new URL(p.protocol+c):new URL(c),b=sp(v.pathname,f);v.origin===p.origin&&b!=null?c=b+v.search+v.hash:y=!0}catch{}let w=OC(c,{relative:o}),C=ZC(c,{replace:s,state:a,target:l,preventScrollReset:d,relative:o});function m(p){r&&r(p),p.defaultPrevented||C(p)}return I.createElement("a",rc({},h,{href:g||w,onClick:y||i?r:m,ref:n,target:l}))}),cn=I.forwardRef(function(t,n){let{"aria-current":r="page",caseSensitive:o=!1,className:i="",end:s=!1,style:a,to:l,children:c}=t,d=iw(t,KC),h=up(l,{relative:d.relative}),f=Wr(),g=I.useContext(tw),{navigator:y}=I.useContext(Ao),w=y.encodeLocation?y.encodeLocation(h).pathname:h.pathname,C=f.pathname,m=g&&g.navigation&&g.navigation.location?g.navigation.location.pathname:null;o||(C=C.toLowerCase(),m=m?m.toLowerCase():null,w=w.toLowerCase());let p=C===w||!s&&C.startsWith(w)&&C.charAt(w.length)==="/",v=m!=null&&(m===w||!s&&m.startsWith(w)&&m.charAt(w.length)==="/"),b=p?r:void 0,k;typeof i=="function"?k=i({isActive:p,isPending:v}):k=[i,p?"active":null,v?"pending":null].filter(Boolean).join(" ");let P=typeof a=="function"?a({isActive:p,isPending:v}):a;return I.createElement(_l,rc({},d,{"aria-current":b,className:k,ref:n,style:P,to:l}),typeof c=="function"?c({isActive:p,isPending:v}):c)});var ov;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher"})(ov||(ov={}));var iv;(function(e){e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(iv||(iv={}));function ZC(e,t){let{target:n,replace:r,state:o,preventScrollReset:i,relative:s}=t===void 0?{}:t,a=Jc(),l=Wr(),c=up(e,{relative:s});return I.useCallback(d=>{if(HC(d,n)){d.preventDefault();let h=r!==void 0?r:tc(l)===tc(c);a(e,{replace:h,state:o,preventScrollReset:i,relative:s})}},[l,a,c,r,o,n,e,i,s])}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eI=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let o=e.charCodeAt(r);o<128?t[n++]=o:o<2048?(t[n++]=o>>6|192,t[n++]=o&63|128):(o&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(o=65536+((o&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=o>>18|240,t[n++]=o>>12&63|128,t[n++]=o>>6&63|128,t[n++]=o&63|128):(t[n++]=o>>12|224,t[n++]=o>>6&63|128,t[n++]=o&63|128)}return t},tI=function(e){const t=[];let n=0,r=0;for(;n<e.length;){const o=e[n++];if(o<128)t[r++]=String.fromCharCode(o);else if(o>191&&o<224){const i=e[n++];t[r++]=String.fromCharCode((o&31)<<6|i&63)}else if(o>239&&o<365){const i=e[n++],s=e[n++],a=e[n++],l=((o&7)<<18|(i&63)<<12|(s&63)<<6|a&63)-65536;t[r++]=String.fromCharCode(55296+(l>>10)),t[r++]=String.fromCharCode(56320+(l&1023))}else{const i=e[n++],s=e[n++];t[r++]=String.fromCharCode((o&15)<<12|(i&63)<<6|s&63)}}return t.join("")},nI={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let o=0;o<e.length;o+=3){const i=e[o],s=o+1<e.length,a=s?e[o+1]:0,l=o+2<e.length,c=l?e[o+2]:0,d=i>>2,h=(i&3)<<4|a>>4;let f=(a&15)<<2|c>>6,g=c&63;l||(g=64,s||(f=64)),r.push(n[d],n[h],n[f],n[g])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(eI(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):tI(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let o=0;o<e.length;){const i=n[e.charAt(o++)],a=o<e.length?n[e.charAt(o)]:0;++o;const c=o<e.length?n[e.charAt(o)]:64;++o;const h=o<e.length?n[e.charAt(o)]:64;if(++o,i==null||a==null||c==null||h==null)throw Error();const f=i<<2|a>>4;if(r.push(f),c!==64){const g=a<<4&240|c>>2;if(r.push(g),h!==64){const y=c<<6&192|h;r.push(y)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},rI=function(e){try{return nI.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oI{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ut(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function sw(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ut())}function dp(){const e=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof e=="object"&&e.id!==void 0}function aw(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function iI(){return ut().indexOf("Electron/")>=0}function lw(){const e=ut();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function sI(){return ut().indexOf("MSAppHost/")>=0}function aI(){return typeof indexedDB=="object"}function lI(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(r);o.onsuccess=()=>{o.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},o.onupgradeneeded=()=>{n=!1},o.onerror=()=>{var i;t(((i=o.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){t(n)}})}function cI(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uI="FirebaseError";class cr extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=uI,Object.setPrototypeOf(this,cr.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,jo.prototype.create)}}class jo{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){const r=n[0]||{},o=`${this.service}/${t}`,i=this.errors[t],s=i?dI(i,r):"Error",a=`${this.serviceName}: ${s} (${o}).`;return new cr(o,a,r)}}function dI(e,t){return e.replace(hI,(n,r)=>{const o=t[r];return o!=null?String(o):`<${r}?>`})}const hI=/\{\$([^}]+)}/g;function fI(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function Vs(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const o of n){if(!r.includes(o))return!1;const i=e[o],s=t[o];if(sv(i)&&sv(s)){if(!Vs(i,s))return!1}else if(i!==s)return!1}for(const o of r)if(!n.includes(o))return!1;return!0}function sv(e){return e!==null&&typeof e=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fa(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(o=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(o))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function os(e){const t={};return e.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[o,i]=r.split("=");t[decodeURIComponent(o)]=decodeURIComponent(i)}}),t}function is(e){const t=e.indexOf("?");if(!t)return"";const n=e.indexOf("#",t);return e.substring(t,n>0?n:void 0)}function pI(e,t){const n=new mI(e,t);return n.subscribe.bind(n)}class mI{constructor(t,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(n=>{n.next(t)})}error(t){this.forEachObserver(n=>{n.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,n,r){let o;if(t===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");gI(t,["next","error","complete"])?o=t:o={next:t,error:n,complete:r},o.next===void 0&&(o.next=ld),o.error===void 0&&(o.error=ld),o.complete===void 0&&(o.complete=ld);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch{}}),this.observers.push(o),i}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,t)}sendOne(t,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{n(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function gI(e,t){if(typeof e!="object"||e===null)return!1;for(const n of t)if(n in e&&typeof e[n]=="function")return!0;return!1}function ld(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vI=1e3,yI=2,wI=4*60*60*1e3,EI=.5;function av(e,t=vI,n=yI){const r=t*Math.pow(n,e),o=Math.round(EI*r*(Math.random()-.5)*2);return Math.min(wI,r+o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ft(e){return e&&e._delegate?e._delegate:e}class Fn{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const to="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SI{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const r=new oI;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const o=this.getOrInitializeService({instanceIdentifier:n});o&&r.resolve(o)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){var n;const r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),o=(n=t==null?void 0:t.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(o)return null;throw i}else{if(o)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(_I(t))try{this.getOrInitializeService({instanceIdentifier:to})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:o});r.resolve(i)}catch{}}}}clearInstance(t=to){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=to){return this.instances.has(t)}getOptions(t=to){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const o=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,s]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);r===a&&s.resolve(o)}return o}onInit(t,n){var r;const o=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(o))!==null&&r!==void 0?r:new Set;i.add(t),this.onInitCallbacks.set(o,i);const s=this.instances.get(o);return s&&t(s,o),()=>{i.delete(t)}}invokeOnInitCallbacks(t,n){const r=this.onInitCallbacks.get(n);if(r)for(const o of r)try{o(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:xI(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=to){return this.component?this.component.multipleInstances?t:to:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function xI(e){return e===to?void 0:e}function _I(e){return e.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bI{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new SI(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ie;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(Ie||(Ie={}));const CI={debug:Ie.DEBUG,verbose:Ie.VERBOSE,info:Ie.INFO,warn:Ie.WARN,error:Ie.ERROR,silent:Ie.SILENT},II=Ie.INFO,kI={[Ie.DEBUG]:"log",[Ie.VERBOSE]:"log",[Ie.INFO]:"info",[Ie.WARN]:"warn",[Ie.ERROR]:"error"},TI=(e,t,...n)=>{if(t<e.logLevel)return;const r=new Date().toISOString(),o=kI[t];if(o)console[o](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Xc{constructor(t){this.name=t,this._logLevel=II,this._logHandler=TI,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in Ie))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?CI[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,Ie.DEBUG,...t),this._logHandler(this,Ie.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,Ie.VERBOSE,...t),this._logHandler(this,Ie.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,Ie.INFO,...t),this._logHandler(this,Ie.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,Ie.WARN,...t),this._logHandler(this,Ie.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,Ie.ERROR,...t),this._logHandler(this,Ie.ERROR,...t)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OI{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(PI(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function PI(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Mh="@firebase/app",lv="0.7.17";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hp=new Xc("@firebase/app"),NI="@firebase/app-compat",AI="@firebase/analytics-compat",jI="@firebase/analytics",RI="@firebase/app-check-compat",MI="@firebase/app-check",LI="@firebase/auth",DI="@firebase/auth-compat",$I="@firebase/database",FI="@firebase/database-compat",zI="@firebase/functions",UI="@firebase/functions-compat",VI="@firebase/installations",BI="@firebase/installations-compat",WI="@firebase/messaging",qI="@firebase/messaging-compat",HI="@firebase/performance",GI="@firebase/performance-compat",KI="@firebase/remote-config",QI="@firebase/remote-config-compat",JI="@firebase/storage",XI="@firebase/storage-compat",YI="@firebase/firestore",ZI="@firebase/firestore-compat",ek="firebase",tk="9.6.7";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cw="[DEFAULT]",nk={[Mh]:"fire-core",[NI]:"fire-core-compat",[jI]:"fire-analytics",[AI]:"fire-analytics-compat",[MI]:"fire-app-check",[RI]:"fire-app-check-compat",[LI]:"fire-auth",[DI]:"fire-auth-compat",[$I]:"fire-rtdb",[FI]:"fire-rtdb-compat",[zI]:"fire-fn",[UI]:"fire-fn-compat",[VI]:"fire-iid",[BI]:"fire-iid-compat",[WI]:"fire-fcm",[qI]:"fire-fcm-compat",[HI]:"fire-perf",[GI]:"fire-perf-compat",[KI]:"fire-rc",[QI]:"fire-rc-compat",[JI]:"fire-gcs",[XI]:"fire-gcs-compat",[YI]:"fire-fst",[ZI]:"fire-fst-compat","fire-js":"fire-js",[ek]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oc=new Map,Lh=new Map;function rk(e,t){try{e.container.addComponent(t)}catch(n){hp.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function or(e){const t=e.name;if(Lh.has(t))return hp.debug(`There were multiple attempts to register component ${t}.`),!1;Lh.set(t,e);for(const n of oc.values())rk(n,e);return!0}function Ro(e,t){return e.container.getProvider(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ok={"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function."},ic=new jo("app","Firebase",ok);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ik{constructor(t,n,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Fn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw ic.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pa=tk;function sk(e,t={}){typeof t!="object"&&(t={name:t});const n=Object.assign({name:cw,automaticDataCollectionEnabled:!1},t),r=n.name;if(typeof r!="string"||!r)throw ic.create("bad-app-name",{appName:String(r)});const o=oc.get(r);if(o){if(Vs(e,o.options)&&Vs(n,o.config))return o;throw ic.create("duplicate-app",{appName:r})}const i=new bI(r);for(const a of Lh.values())i.addComponent(a);const s=new ik(e,n,i);return oc.set(r,s),s}function fp(e=cw){const t=oc.get(e);if(!t)throw ic.create("no-app",{appName:e});return t}function pn(e,t,n){var r;let o=(r=nk[e])!==null&&r!==void 0?r:e;n&&(o+=`-${n}`);const i=o.match(/\s|\//),s=t.match(/\s|\//);if(i||s){const a=[`Unable to register library "${o}" with version "${t}":`];i&&a.push(`library name "${o}" contains illegal characters (whitespace or "/")`),i&&s&&a.push("and"),s&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),hp.warn(a.join(" "));return}or(new Fn(`${o}-version`,()=>({library:o,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ak(e){or(new Fn("platform-logger",t=>new OI(t),"PRIVATE")),pn(Mh,lv,e),pn(Mh,lv,"esm2017"),pn("fire-js","")}ak("");function pp(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n}function uw(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const lk=uw,dw=new jo("auth","Firebase",uw());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cv=new Xc("@firebase/auth");function bl(e,...t){cv.logLevel<=Ie.ERROR&&cv.error(`Auth (${pa}): ${e}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yn(e,...t){throw mp(e,...t)}function Dn(e,...t){return mp(e,...t)}function hw(e,t,n){const r=Object.assign(Object.assign({},lk()),{[t]:n});return new jo("auth","Firebase",r).create(t,{appName:e.name})}function ck(e,t,n){const r=n;if(!(t instanceof r))throw r.name!==t.constructor.name&&yn(e,"argument-error"),hw(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function mp(e,...t){if(typeof e!="string"){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return dw.create(e,...t)}function ie(e,t,...n){if(!e)throw mp(t,...n)}function Kn(e){const t="INTERNAL ASSERTION FAILED: "+e;throw bl(t),new Error(t)}function ir(e,t){e||Kn(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uv=new Map;function Qn(e){ir(e instanceof Function,"Expected a class definition");let t=uv.get(e);return t?(ir(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,uv.set(e,t),t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uk(e,t){const n=Ro(e,"auth");if(n.isInitialized()){const o=n.getImmediate(),i=n.getOptions();if(Vs(i,t??{}))return o;yn(o,"already-initialized")}return n.initialize({options:t})}function dk(e,t){const n=(t==null?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Qn);t!=null&&t.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,t==null?void 0:t.popupRedirectResolver)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dh(){var e;return typeof self<"u"&&((e=self.location)===null||e===void 0?void 0:e.href)||""}function hk(){return dv()==="http:"||dv()==="https:"}function dv(){var e;return typeof self<"u"&&((e=self.location)===null||e===void 0?void 0:e.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fk(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(hk()||dp()||"connection"in navigator)?navigator.onLine:!0}function pk(){if(typeof navigator>"u")return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ma{constructor(t,n){this.shortDelay=t,this.longDelay=n,ir(n>t,"Short delay should be less than long delay!"),this.isMobile=sw()||aw()}get(){return fk()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gp(e,t){ir(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fw{static initialize(t,n,r){this.fetchImpl=t,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;Kn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;Kn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;Kn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mk={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gk=new ma(3e4,6e4);function ga(e,t){return e.tenantId&&!t.tenantId?Object.assign(Object.assign({},t),{tenantId:e.tenantId}):t}async function Ri(e,t,n,r,o={}){return pw(e,o,async()=>{let i={},s={};r&&(t==="GET"?s=r:i={body:JSON.stringify(r)});const a=fa(Object.assign({key:e.config.apiKey},s)).slice(1),l=await e._getAdditionalHeaders();return l["Content-Type"]="application/json",e.languageCode&&(l["X-Firebase-Locale"]=e.languageCode),fw.fetch()(mw(e,e.config.apiHost,n,a),Object.assign({method:t,headers:l,referrerPolicy:"no-referrer"},i))})}async function pw(e,t,n){e._canInitEmulator=!1;const r=Object.assign(Object.assign({},mk),t);try{const o=new vk(e),i=await Promise.race([n(),o.promise]);o.clearNetworkTimeout();const s=await i.json();if("needConfirmation"in s)throw cd(e,"account-exists-with-different-credential",s);if(i.ok&&!("errorMessage"in s))return s;{const a=i.ok?s.errorMessage:s.error.message,[l,c]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw cd(e,"credential-already-in-use",s);if(l==="EMAIL_EXISTS")throw cd(e,"email-already-in-use",s);const d=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw hw(e,d,c);yn(e,d)}}catch(o){if(o instanceof cr)throw o;yn(e,"network-request-failed")}}async function va(e,t,n,r,o={}){const i=await Ri(e,t,n,r,o);return"mfaPendingCredential"in i&&yn(e,"multi-factor-auth-required",{_serverResponse:i}),i}function mw(e,t,n,r){const o=`${t}${n}?${r}`;return e.config.emulator?gp(e.config,o):`${e.config.apiScheme}://${o}`}class vk{constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(Dn(this.auth,"network-request-failed")),gk.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function cd(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const o=Dn(e,t,r);return o.customData._tokenResponse=n,o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yk(e,t){return Ri(e,"POST","/v1/accounts:delete",t)}async function wk(e,t){return Ri(e,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gs(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function Ek(e,t=!1){const n=Ft(e),r=await n.getIdToken(t),o=vp(r);ie(o&&o.exp&&o.auth_time&&o.iat,n.auth,"internal-error");const i=typeof o.firebase=="object"?o.firebase:void 0,s=i==null?void 0:i.sign_in_provider;return{claims:o,token:r,authTime:gs(ud(o.auth_time)),issuedAtTime:gs(ud(o.iat)),expirationTime:gs(ud(o.exp)),signInProvider:s||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function ud(e){return Number(e)*1e3}function vp(e){const[t,n,r]=e.split(".");if(t===void 0||n===void 0||r===void 0)return bl("JWT malformed, contained fewer than 3 sections"),null;try{const o=rI(n);return o?JSON.parse(o):(bl("Failed to decode base64 JWT payload"),null)}catch(o){return bl("Caught error parsing JWT payload as JSON",o),null}}function Sk(e){const t=vp(e);return ie(t,"internal-error"),ie(typeof t.exp<"u","internal-error"),ie(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xi(e,t,n=!1){if(n)return t;try{return await t}catch(r){throw r instanceof cr&&xk(r)&&e.auth.currentUser===e&&await e.auth.signOut(),r}}function xk({code:e}){return e==="auth/user-disabled"||e==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _k{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){var n;if(t){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const o=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,o)}}schedule(t=!1){if(!this.isRunning)return;const n=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){t.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gw{constructor(t,n){this.createdAt=t,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=gs(this.lastLoginAt),this.creationTime=gs(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sc(e){var t;const n=e.auth,r=await e.getIdToken(),o=await xi(e,wk(n,{idToken:r}));ie(o==null?void 0:o.users.length,n,"internal-error");const i=o.users[0];e._notifyReloadListener(i);const s=!((t=i.providerUserInfo)===null||t===void 0)&&t.length?Ik(i.providerUserInfo):[],a=Ck(e.providerData,s),l=e.isAnonymous,c=!(e.email&&i.passwordHash)&&!(a!=null&&a.length),d=l?c:!1,h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new gw(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(e,h)}async function bk(e){const t=Ft(e);await sc(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function Ck(e,t){return[...e.filter(r=>!t.some(o=>o.providerId===r.providerId)),...t]}function Ik(e){return e.map(t=>{var{providerId:n}=t,r=pp(t,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kk(e,t){const n=await pw(e,{},async()=>{const r=fa({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:o,apiKey:i}=e.config,s=mw(e,o,"/v1/token",`key=${i}`),a=await e._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",fw.fetch()(s,{method:"POST",headers:a,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bs{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){ie(t.idToken,"internal-error"),ie(typeof t.idToken<"u","internal-error"),ie(typeof t.refreshToken<"u","internal-error");const n="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):Sk(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,n)}async getToken(t,n=!1){return ie(!this.accessToken||this.refreshToken,t,"user-token-expired"),!n&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(t,n){const{accessToken:r,refreshToken:o,expiresIn:i}=await kk(t,n);this.updateTokensAndExpiration(r,o,Number(i))}updateTokensAndExpiration(t,n,r){this.refreshToken=n||null,this.accessToken=t||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(t,n){const{refreshToken:r,accessToken:o,expirationTime:i}=n,s=new Bs;return r&&(ie(typeof r=="string","internal-error",{appName:t}),s.refreshToken=r),o&&(ie(typeof o=="string","internal-error",{appName:t}),s.accessToken=o),i&&(ie(typeof i=="number","internal-error",{appName:t}),s.expirationTime=i),s}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new Bs,this.toJSON())}_performRefresh(){return Kn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hr(e,t){ie(typeof e=="string"||typeof e>"u","internal-error",{appName:t})}class ho{constructor(t){var{uid:n,auth:r,stsTokenManager:o}=t,i=pp(t,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new _k(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=o,this.accessToken=o.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new gw(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(t){const n=await xi(this,this.stsTokenManager.getToken(this.auth,t));return ie(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(t){return Ek(this,t)}reload(){return bk(this)}_assign(t){this!==t&&(ie(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(n=>Object.assign({},n)),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){return new ho(Object.assign(Object.assign({},this),{auth:t,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(t){ie(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,n=!1){let r=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),r=!0),n&&await sc(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){const t=await this.getIdToken();return await xi(this,yk(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>Object.assign({},t)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,n){var r,o,i,s,a,l,c,d;const h=(r=n.displayName)!==null&&r!==void 0?r:void 0,f=(o=n.email)!==null&&o!==void 0?o:void 0,g=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,y=(s=n.photoURL)!==null&&s!==void 0?s:void 0,w=(a=n.tenantId)!==null&&a!==void 0?a:void 0,C=(l=n._redirectEventId)!==null&&l!==void 0?l:void 0,m=(c=n.createdAt)!==null&&c!==void 0?c:void 0,p=(d=n.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:v,emailVerified:b,isAnonymous:k,providerData:P,stsTokenManager:R}=n;ie(v&&R,t,"internal-error");const T=Bs.fromJSON(this.name,R);ie(typeof v=="string",t,"internal-error"),hr(h,t.name),hr(f,t.name),ie(typeof b=="boolean",t,"internal-error"),ie(typeof k=="boolean",t,"internal-error"),hr(g,t.name),hr(y,t.name),hr(w,t.name),hr(C,t.name),hr(m,t.name),hr(p,t.name);const Q=new ho({uid:v,auth:t,email:f,emailVerified:b,displayName:h,isAnonymous:k,photoURL:y,phoneNumber:g,tenantId:w,stsTokenManager:T,createdAt:m,lastLoginAt:p});return P&&Array.isArray(P)&&(Q.providerData=P.map(A=>Object.assign({},A))),C&&(Q._redirectEventId=C),Q}static async _fromIdTokenResponse(t,n,r=!1){const o=new Bs;o.updateFromServerResponse(n);const i=new ho({uid:n.localId,auth:t,stsTokenManager:o,isAnonymous:r});return await sc(i),i}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vw{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,n){this.storage[t]=n}async _get(t){const n=this.storage[t];return n===void 0?null:n}async _remove(t){delete this.storage[t]}_addListener(t,n){}_removeListener(t,n){}}vw.type="NONE";const hv=vw;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cl(e,t,n){return`firebase:${e}:${t}:${n}`}class li{constructor(t,n,r){this.persistence=t,this.auth=n,this.userKey=r;const{config:o,name:i}=this.auth;this.fullUserKey=Cl(this.userKey,o.apiKey,i),this.fullPersistenceKey=Cl("persistence",o.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);return t?ho._fromJSON(this.auth,t):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,n,r="authUser"){if(!n.length)return new li(Qn(hv),t,r);const o=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let i=o[0]||Qn(hv);const s=Cl(r,t.config.apiKey,t.name);let a=null;for(const c of n)try{const d=await c._get(s);if(d){const h=ho._fromJSON(t,d);c!==i&&(a=h),i=c;break}}catch{}const l=o.filter(c=>c._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new li(i,t,r):(i=l[0],a&&await i._set(s,a.toJSON()),await Promise.all(n.map(async c=>{if(c!==i)try{await c._remove(s)}catch{}})),new li(i,t,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fv(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(Ew(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(yw(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(xw(t))return"Blackberry";if(_w(t))return"Webos";if(yp(t))return"Safari";if((t.includes("chrome/")||ww(t))&&!t.includes("edge/"))return"Chrome";if(Sw(t))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=e.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function yw(e=ut()){return/firefox\//i.test(e)}function yp(e=ut()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function ww(e=ut()){return/crios\//i.test(e)}function Ew(e=ut()){return/iemobile/i.test(e)}function Sw(e=ut()){return/android/i.test(e)}function xw(e=ut()){return/blackberry/i.test(e)}function _w(e=ut()){return/webos/i.test(e)}function Yc(e=ut()){return/iphone|ipad|ipod/i.test(e)}function Tk(e=ut()){var t;return Yc(e)&&!!(!((t=window.navigator)===null||t===void 0)&&t.standalone)}function Ok(){return lw()&&document.documentMode===10}function bw(e=ut()){return Yc(e)||Sw(e)||_w(e)||xw(e)||/windows phone/i.test(e)||Ew(e)}function Pk(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cw(e,t=[]){let n;switch(e){case"Browser":n=fv(ut());break;case"Worker":n=`${fv(ut())}-${e}`;break;default:n=e}const r=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${pa}/${r}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nk{constructor(t,n){this.app=t,this.config=n,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new pv(this),this.idTokenSubscription=new pv(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=dw,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=n.sdkClientVersion}_initializeWithPersistence(t,n){return n&&(this._popupRedirectResolver=Qn(n)),this._initializationPromise=this.queue(async()=>{var r,o;if(!this._deleted&&(this.persistenceManager=await li.create(this,t),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((o=this.currentUser)===null||o===void 0?void 0:o.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t)}}async initializeCurrentUser(t){var n;let r=await this.assertedPersistence.getCurrentUser();if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,i=r==null?void 0:r._redirectEventId,s=await this.tryRedirectSignIn(t);(!o||o===i)&&(s!=null&&s.user)&&(r=s.user)}return r?r._redirectEventId?(ie(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)):this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}async tryRedirectSignIn(t){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(t){try{await sc(t)}catch(n){if(n.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=pk()}async _delete(){this._deleted=!0}async updateCurrentUser(t){const n=t?Ft(t):null;return n&&ie(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(t){if(!this._deleted)return t&&ie(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null)}setPersistence(t){return this.queue(async()=>{await this.assertedPersistence.setPersistence(Qn(t))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(t){this._errorFactory=new jo("auth","Firebase",t())}onAuthStateChanged(t,n,r){return this.registerStateListener(this.authStateSubscription,t,n,r)}onIdTokenChanged(t,n,r){return this.registerStateListener(this.idTokenSubscription,t,n,r)}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)===null||t===void 0?void 0:t.toJSON()}}async _setRedirectUser(t,n){const r=await this.getOrInitRedirectPersistenceManager(n);return t===null?r.removeCurrentUser():r.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const n=t&&Qn(t)||this._popupRedirectResolver;ie(n,this,"argument-error"),this.redirectPersistenceManager=await li.create(this,[Qn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===t?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(t=this.currentUser)===null||t===void 0?void 0:t.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,n,r,o){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n),s=this._isInitialized?Promise.resolve():this._initializationPromise;return ie(s,this,"internal-error"),s.then(()=>i(this.currentUser)),typeof n=="function"?t.addObserver(n,r,o):t.addObserver(n)}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&(this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh()),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return ie(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=Cw(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const t={"X-Client-Version":this.clientVersion};return this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId),t}}function ya(e){return Ft(e)}class pv{constructor(t){this.auth=t,this.observer=null,this.addObserver=pI(n=>this.observer=n)}get next(){return ie(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wp{constructor(t,n){this.providerId=t,this.signInMethod=n}toJSON(){return Kn("not implemented")}_getIdTokenResponse(t){return Kn("not implemented")}_linkToIdToken(t,n){return Kn("not implemented")}_getReauthenticationResolver(t){return Kn("not implemented")}}async function Ak(e,t){return Ri(e,"POST","/v1/accounts:update",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jk(e,t){return va(e,"POST","/v1/accounts:signInWithPassword",ga(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Rk(e,t){return va(e,"POST","/v1/accounts:signInWithEmailLink",ga(e,t))}async function Mk(e,t){return va(e,"POST","/v1/accounts:signInWithEmailLink",ga(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ws extends wp{constructor(t,n,r,o=null){super("password",r),this._email=t,this._password=n,this._tenantId=o}static _fromEmailAndPassword(t,n){return new Ws(t,n,"password")}static _fromEmailAndCode(t,n,r=null){return new Ws(t,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(t){const n=typeof t=="string"?JSON.parse(t):t;if(n!=null&&n.email&&(n!=null&&n.password)){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(t){switch(this.signInMethod){case"password":return jk(t,{returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return Rk(t,{email:this._email,oobCode:this._password});default:yn(t,"internal-error")}}async _linkToIdToken(t,n){switch(this.signInMethod){case"password":return Ak(t,{idToken:n,returnSecureToken:!0,email:this._email,password:this._password});case"emailLink":return Mk(t,{idToken:n,email:this._email,oobCode:this._password});default:yn(t,"internal-error")}}_getReauthenticationResolver(t){return this._getIdTokenResponse(t)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ci(e,t){return va(e,"POST","/v1/accounts:signInWithIdp",ga(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lk="http://localhost";class wo extends wp{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const n=new wo(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(n.idToken=t.idToken),t.accessToken&&(n.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(n.nonce=t.nonce),t.pendingToken&&(n.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(n.accessToken=t.oauthToken,n.secret=t.oauthTokenSecret):yn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const n=typeof t=="string"?JSON.parse(t):t,{providerId:r,signInMethod:o}=n,i=pp(n,["providerId","signInMethod"]);if(!r||!o)return null;const s=new wo(r,o);return s.idToken=i.idToken||void 0,s.accessToken=i.accessToken||void 0,s.secret=i.secret,s.nonce=i.nonce,s.pendingToken=i.pendingToken||null,s}_getIdTokenResponse(t){const n=this.buildRequest();return ci(t,n)}_linkToIdToken(t,n){const r=this.buildRequest();return r.idToken=n,ci(t,r)}_getReauthenticationResolver(t){const n=this.buildRequest();return n.autoCreate=!1,ci(t,n)}buildRequest(){const t={requestUri:Lk,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),t.postBody=fa(n)}return t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dk(e){switch(e){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function $k(e){const t=os(is(e)).link,n=t?os(is(t)).deep_link_id:null,r=os(is(e)).deep_link_id;return(r?os(is(r)).link:null)||r||n||t||e}class Ep{constructor(t){var n,r,o,i,s,a;const l=os(is(t)),c=(n=l.apiKey)!==null&&n!==void 0?n:null,d=(r=l.oobCode)!==null&&r!==void 0?r:null,h=Dk((o=l.mode)!==null&&o!==void 0?o:null);ie(c&&d&&h,"argument-error"),this.apiKey=c,this.operation=h,this.code=d,this.continueUrl=(i=l.continueUrl)!==null&&i!==void 0?i:null,this.languageCode=(s=l.languageCode)!==null&&s!==void 0?s:null,this.tenantId=(a=l.tenantId)!==null&&a!==void 0?a:null}static parseLink(t){const n=$k(t);try{return new Ep(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(){this.providerId=Mi.PROVIDER_ID}static credential(t,n){return Ws._fromEmailAndPassword(t,n)}static credentialWithLink(t,n){const r=Ep.parseLink(n);return ie(r,"argument-error"),Ws._fromEmailAndCode(t,r.code,r.tenantId)}}Mi.PROVIDER_ID="password";Mi.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Mi.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sp{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa extends Sp{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr extends wa{constructor(){super("facebook.com")}static credential(t){return wo._fromParams({providerId:yr.PROVIDER_ID,signInMethod:yr.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return yr.credentialFromTaggedObject(t)}static credentialFromError(t){return yr.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return yr.credential(t.oauthAccessToken)}catch{return null}}}yr.FACEBOOK_SIGN_IN_METHOD="facebook.com";yr.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qn extends wa{constructor(){super("google.com"),this.addScope("profile")}static credential(t,n){return wo._fromParams({providerId:qn.PROVIDER_ID,signInMethod:qn.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:n})}static credentialFromResult(t){return qn.credentialFromTaggedObject(t)}static credentialFromError(t){return qn.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:n,oauthAccessToken:r}=t;if(!n&&!r)return null;try{return qn.credential(n,r)}catch{return null}}}qn.GOOGLE_SIGN_IN_METHOD="google.com";qn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wr extends wa{constructor(){super("github.com")}static credential(t){return wo._fromParams({providerId:wr.PROVIDER_ID,signInMethod:wr.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return wr.credentialFromTaggedObject(t)}static credentialFromError(t){return wr.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return wr.credential(t.oauthAccessToken)}catch{return null}}}wr.GITHUB_SIGN_IN_METHOD="github.com";wr.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er extends wa{constructor(){super("twitter.com")}static credential(t,n){return wo._fromParams({providerId:Er.PROVIDER_ID,signInMethod:Er.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:n})}static credentialFromResult(t){return Er.credentialFromTaggedObject(t)}static credentialFromError(t){return Er.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=t;if(!n||!r)return null;try{return Er.credential(n,r)}catch{return null}}}Er.TWITTER_SIGN_IN_METHOD="twitter.com";Er.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fk(e,t){return va(e,"POST","/v1/accounts:signUp",ga(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,n,r,o=!1){const i=await ho._fromIdTokenResponse(t,r,o),s=mv(r);return new Eo({user:i,providerId:s,_tokenResponse:r,operationType:n})}static async _forOperation(t,n,r){await t._updateTokensIfNecessary(r,!0);const o=mv(r);return new Eo({user:t,providerId:o,_tokenResponse:r,operationType:n})}}function mv(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac extends cr{constructor(t,n,r,o){var i;super(n.code,n.message),this.operationType=r,this.user=o,Object.setPrototypeOf(this,ac.prototype),this.customData={appName:t.name,tenantId:(i=t.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(t,n,r,o){return new ac(t,n,r,o)}}function Iw(e,t,n,r){return(t==="reauthenticate"?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?ac._fromErrorAndOperation(e,i,t,r):i})}async function zk(e,t,n=!1){const r=await xi(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return Eo._forOperation(e,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Uk(e,t,n=!1){const{auth:r}=e,o="reauthenticate";try{const i=await xi(e,Iw(r,o,t,e),n);ie(i.idToken,r,"internal-error");const s=vp(i.idToken);ie(s,r,"internal-error");const{sub:a}=s;return ie(e.uid===a,r,"user-mismatch"),Eo._forOperation(e,o,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&yn(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kw(e,t,n=!1){const r="signIn",o=await Iw(e,r,t),i=await Eo._fromIdTokenResponse(e,r,o);return n||await e._updateCurrentUser(i.user),i}async function Vk(e,t){return kw(ya(e),t)}async function Bk(e,t,n){const r=ya(e),o=await Fk(r,{returnSecureToken:!0,email:t,password:n}),i=await Eo._fromIdTokenResponse(r,"signIn",o);return await r._updateCurrentUser(i.user),i}function Wk(e,t,n){return Vk(Ft(e),Mi.credential(t,n))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qk(e,t){return Ri(e,"POST","/v1/accounts:update",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hk(e,{displayName:t,photoURL:n}){if(t===void 0&&n===void 0)return;const r=Ft(e),i={idToken:await r.getIdToken(),displayName:t,photoUrl:n,returnSecureToken:!0},s=await xi(r,qk(r.auth,i));r.displayName=s.displayName||null,r.photoURL=s.photoUrl||null;const a=r.providerData.find(({providerId:l})=>l==="password");a&&(a.displayName=r.displayName,a.photoURL=r.photoURL),await r._updateTokensIfNecessary(s)}function Gk(e,t,n,r){return Ft(e).onAuthStateChanged(t,n,r)}function Kk(e){return Ft(e).signOut()}const lc="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tw{constructor(t,n){this.storageRetriever=t,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(lc,"1"),this.storage.removeItem(lc),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,n){return this.storage.setItem(t,JSON.stringify(n)),Promise.resolve()}_get(t){const n=this.storage.getItem(t);return Promise.resolve(n?JSON.parse(n):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qk(){const e=ut();return yp(e)||Yc(e)}const Jk=1e3,Xk=10;class Ow extends Tw{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,n)=>this.onStorageEvent(t,n),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=Qk()&&Pk(),this.fallbackToPolling=bw(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),o=this.localCache[n];r!==o&&t(n,o,r)}}onStorageEvent(t,n=!1){if(!t.key){this.forAllChangedKeys((s,a,l)=>{this.notifyListeners(s,l)});return}const r=t.key;if(n?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const s=this.storage.getItem(r);if(t.newValue!==s)t.newValue!==null?this.storage.setItem(r,t.newValue):this.storage.removeItem(r);else if(this.localCache[r]===t.newValue&&!n)return}const o=()=>{const s=this.storage.getItem(r);!n&&this.localCache[r]===s||this.notifyListeners(r,s)},i=this.storage.getItem(r);Ok()&&i!==t.newValue&&t.newValue!==t.oldValue?setTimeout(o,Xk):o()}notifyListeners(t,n){this.localCache[t]=n;const r=this.listeners[t];if(r)for(const o of Array.from(r))o(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:n,newValue:r}),!0)})},Jk)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(n)}_removeListener(t,n){this.listeners[t]&&(this.listeners[t].delete(n),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,n){await super._set(t,n),this.localCache[t]=JSON.stringify(n)}async _get(t){const n=await super._get(t);return this.localCache[t]=JSON.stringify(n),n}async _remove(t){await super._remove(t),delete this.localCache[t]}}Ow.type="LOCAL";const Yk=Ow;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pw extends Tw{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,n){}_removeListener(t,n){}}Pw.type="SESSION";const Nw=Pw;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zk(e){return Promise.all(e.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zc{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const n=this.receivers.find(o=>o.isListeningto(t));if(n)return n;const r=new Zc(t);return this.receivers.push(r),r}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const n=t,{eventId:r,eventType:o,data:i}=n.data,s=this.handlersMap[o];if(!(s!=null&&s.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:o});const a=Array.from(s).map(async c=>c(n.origin,i)),l=await Zk(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:o,response:l})}_subscribe(t,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(n)}_unsubscribe(t,n){this.handlersMap[t]&&n&&this.handlersMap[t].delete(n),(!n||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Zc.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xp(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(Math.random()*10);return e+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eT{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,n,r=50){const o=typeof MessageChannel<"u"?new MessageChannel:null;if(!o)throw new Error("connection_unavailable");let i,s;return new Promise((a,l)=>{const c=xp("",20);o.port1.start();const d=setTimeout(()=>{l(new Error("unsupported_event"))},r);s={messageChannel:o,onMessage(h){const f=h;if(f.data.eventId===c)switch(f.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(f.data.response);break;default:clearTimeout(d),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(s),o.port1.addEventListener("message",s.onMessage),this.target.postMessage({eventType:t,eventId:c,data:n},[o.port2])}).finally(()=>{s&&this.removeMessageHandler(s)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $n(){return window}function tT(e){$n().location.href=e}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Aw(){return typeof $n().WorkerGlobalScope<"u"&&typeof $n().importScripts=="function"}async function nT(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function rT(){var e;return((e=navigator==null?void 0:navigator.serviceWorker)===null||e===void 0?void 0:e.controller)||null}function oT(){return Aw()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jw="firebaseLocalStorageDb",iT=1,cc="firebaseLocalStorage",Rw="fbase_key";class Ea{constructor(t){this.request=t}toPromise(){return new Promise((t,n)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function eu(e,t){return e.transaction([cc],t?"readwrite":"readonly").objectStore(cc)}function sT(){const e=indexedDB.deleteDatabase(jw);return new Ea(e).toPromise()}function $h(){const e=indexedDB.open(jw,iT);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const r=e.result;try{r.createObjectStore(cc,{keyPath:Rw})}catch(o){n(o)}}),e.addEventListener("success",async()=>{const r=e.result;r.objectStoreNames.contains(cc)?t(r):(r.close(),await sT(),t(await $h()))})})}async function gv(e,t,n){const r=eu(e,!0).put({[Rw]:t,value:n});return new Ea(r).toPromise()}async function aT(e,t){const n=eu(e,!1).get(t),r=await new Ea(n).toPromise();return r===void 0?null:r.value}function vv(e,t){const n=eu(e,!0).delete(t);return new Ea(n).toPromise()}const lT=800,cT=3;class Mw{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await $h(),this.db)}async _withRetries(t){let n=0;for(;;)try{const r=await this._openDb();return await t(r)}catch(r){if(n++>cT)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Aw()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Zc._getInstance(oT()),this.receiver._subscribe("keyChanged",async(t,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(t,n)=>["keyChanged"])}async initializeSender(){var t,n;if(this.activeServiceWorker=await nT(),!this.activeServiceWorker)return;this.sender=new eT(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((t=r[0])===null||t===void 0)&&t.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||rT()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await $h();return await gv(t,lc,"1"),await vv(t,lc),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>gv(r,t,n)),this.localCache[t]=n,this.notifyServiceWorker(t)))}async _get(t){const n=await this._withRetries(r=>aT(r,t));return this.localCache[t]=n,n}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(n=>vv(n,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(o=>{const i=eu(o,!1).getAll();return new Ea(i).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;for(const{fbase_key:o,value:i}of t)r.add(o),JSON.stringify(this.localCache[o])!==JSON.stringify(i)&&(this.notifyListeners(o,i),n.push(o));for(const o of Object.keys(this.localCache))this.localCache[o]&&!r.has(o)&&(this.notifyListeners(o,null),n.push(o));return n}notifyListeners(t,n){this.localCache[t]=n;const r=this.listeners[t];if(r)for(const o of Array.from(r))o(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),lT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(n)}_removeListener(t,n){this.listeners[t]&&(this.listeners[t].delete(n),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Mw.type="LOCAL";const uT=Mw;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dT(){var e,t;return(t=(e=document.getElementsByTagName("head"))===null||e===void 0?void 0:e[0])!==null&&t!==void 0?t:document}function hT(e){return new Promise((t,n)=>{const r=document.createElement("script");r.setAttribute("src",e),r.onload=t,r.onerror=o=>{const i=Dn("internal-error");i.customData=o,n(i)},r.type="text/javascript",r.charset="UTF-8",dT().appendChild(r)})}function fT(e){return`__${e}${Math.floor(Math.random()*1e6)}`}new ma(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lw(e,t){return t?Qn(t):(ie(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _p extends wp{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return ci(t,this._buildIdpRequest())}_linkToIdToken(t,n){return ci(t,this._buildIdpRequest(n))}_getReauthenticationResolver(t){return ci(t,this._buildIdpRequest())}_buildIdpRequest(t){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(n.idToken=t),n}}function pT(e){return kw(e.auth,new _p(e),e.bypassAuthState)}function mT(e){const{auth:t,user:n}=e;return ie(n,t,"internal-error"),Uk(n,new _p(e),e.bypassAuthState)}async function gT(e){const{auth:t,user:n}=e;return ie(n,t,"internal-error"),zk(n,new _p(e),e.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dw{constructor(t,n,r,o,i=!1){this.auth=t,this.resolver=r,this.user=o,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(t,n)=>{this.pendingPromise={resolve:t,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(t){const{urlResponse:n,sessionId:r,postBody:o,tenantId:i,error:s,type:a}=t;if(s){this.reject(s);return}const l={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:o||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(c){this.reject(c)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return pT;case"linkViaPopup":case"linkViaRedirect":return gT;case"reauthViaPopup":case"reauthViaRedirect":return mT;default:yn(this.auth,"internal-error")}}resolve(t){ir(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){ir(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vT=new ma(2e3,1e4);async function yT(e,t,n){const r=ya(e);ck(e,t,Sp);const o=Lw(r,n);return new io(r,"signInViaPopup",t,o).executeNotNull()}class io extends Dw{constructor(t,n,r,o,i){super(t,n,o,i),this.provider=r,this.authWindow=null,this.pollId=null,io.currentPopupAction&&io.currentPopupAction.cancel(),io.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return ie(t,this.auth,"internal-error"),t}async onExecution(){ir(this.filter.length===1,"Popup operations only handle one event");const t=xp();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(Dn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var t;return((t=this.authWindow)===null||t===void 0?void 0:t.associatedEvent)||null}cancel(){this.reject(Dn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,io.currentPopupAction=null}pollUserCancellation(){const t=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Dn(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(t,vT.get())};t()}}io.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wT="pendingRedirect",dd=new Map;class ET extends Dw{constructor(t,n,r=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let t=dd.get(this.auth._key());if(!t){try{const r=await ST(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(r)}catch(n){t=()=>Promise.reject(n)}dd.set(this.auth._key(),t)}return this.bypassAuthState||dd.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const n=await this.auth._redirectUserForId(t.eventId);if(n)return this.user=n,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ST(e,t){const n=_T(t),r=xT(e);if(!await r._isAvailable())return!1;const o=await r._get(n)==="true";return await r._remove(n),o}function xT(e){return Qn(e._redirectPersistence)}function _T(e){return Cl(wT,e.config.apiKey,e.name)}async function bT(e,t,n=!1){const r=ya(e),o=Lw(r,t),s=await new ET(r,o,n).execute();return s&&!n&&(delete s.user._redirectEventId,await r._persistUserIfCurrent(s.user),await r._setRedirectUser(null,t)),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CT=10*60*1e3;class IT{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(t,r)&&(n=!0,this.sendToConsumer(t,r),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!kT(t)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=t,n=!0)),n}sendToConsumer(t,n){var r;if(t.error&&!$w(t)){const o=((r=t.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(Dn(this.auth,o))}else n.onAuthEvent(t)}isEventForConsumer(t,n){const r=n.eventId===null||!!t.eventId&&t.eventId===n.eventId;return n.filter.includes(t.type)&&r}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=CT&&this.cachedEventUids.clear(),this.cachedEventUids.has(yv(t))}saveEventToCache(t){this.cachedEventUids.add(yv(t)),this.lastProcessedEventTime=Date.now()}}function yv(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(t=>t).join("-")}function $w({type:e,error:t}){return e==="unknown"&&(t==null?void 0:t.code)==="auth/no-auth-event"}function kT(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return $w(e);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function TT(e,t={}){return Ri(e,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OT=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,PT=/^https?/;async function NT(e){if(e.config.emulator)return;const{authorizedDomains:t}=await TT(e);for(const n of t)try{if(AT(n))return}catch{}yn(e,"unauthorized-domain")}function AT(e){const t=Dh(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const s=new URL(e);return s.hostname===""&&r===""?n==="chrome-extension:"&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):n==="chrome-extension:"&&s.hostname===r}if(!PT.test(n))return!1;if(OT.test(e))return r===e;const o=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+o+"|"+o+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jT=new ma(3e4,6e4);function wv(){const e=$n().___jsl;if(e!=null&&e.H){for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}}function RT(e){return new Promise((t,n)=>{var r,o,i;function s(){wv(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{wv(),n(Dn(e,"network-request-failed"))},timeout:jT.get()})}if(!((o=(r=$n().gapi)===null||r===void 0?void 0:r.iframes)===null||o===void 0)&&o.Iframe)t(gapi.iframes.getContext());else if(!((i=$n().gapi)===null||i===void 0)&&i.load)s();else{const a=fT("iframefcb");return $n()[a]=()=>{gapi.load?s():n(Dn(e,"network-request-failed"))},hT(`https://apis.google.com/js/api.js?onload=${a}`).catch(l=>n(l))}}).catch(t=>{throw Il=null,t})}let Il=null;function MT(e){return Il=Il||RT(e),Il}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const LT=new ma(5e3,15e3),DT="__/auth/iframe",$T="emulator/auth/iframe",FT={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},zT=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function UT(e){const t=e.config;ie(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?gp(t,$T):`https://${e.config.authDomain}/${DT}`,r={apiKey:t.apiKey,appName:e.name,v:pa},o=zT.get(e.config.apiHost);o&&(r.eid=o);const i=e._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${fa(r).slice(1)}`}async function VT(e){const t=await MT(e),n=$n().gapi;return ie(n,e,"internal-error"),t.open({where:document.body,url:UT(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:FT,dontclear:!0},r=>new Promise(async(o,i)=>{await r.restyle({setHideOnLeave:!1});const s=Dn(e,"network-request-failed"),a=$n().setTimeout(()=>{i(s)},LT.get());function l(){$n().clearTimeout(a),o(r)}r.ping(l).then(l,()=>{i(s)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BT={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},WT=500,qT=600,HT="_blank",GT="http://localhost";class Ev{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function KT(e,t,n,r=WT,o=qT){const i=Math.max((window.screen.availHeight-o)/2,0).toString(),s=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const l=Object.assign(Object.assign({},BT),{width:r.toString(),height:o.toString(),top:i,left:s}),c=ut().toLowerCase();n&&(a=ww(c)?HT:n),yw(c)&&(t=t||GT,l.scrollbars="yes");const d=Object.entries(l).reduce((f,[g,y])=>`${f}${g}=${y},`,"");if(Tk(c)&&a!=="_self")return QT(t||"",a),new Ev(null);const h=window.open(t||"",a,d);ie(h,e,"popup-blocked");try{h.focus()}catch{}return new Ev(h)}function QT(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const JT="__/auth/handler",XT="emulator/auth/handler";function Sv(e,t,n,r,o,i){ie(e.config.authDomain,e,"auth-domain-config-required"),ie(e.config.apiKey,e,"invalid-api-key");const s={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:pa,eventId:o};if(t instanceof Sp){t.setDefaultLanguage(e.languageCode),s.providerId=t.providerId||"",fI(t.getCustomParameters())||(s.customParameters=JSON.stringify(t.getCustomParameters()));for(const[l,c]of Object.entries(i||{}))s[l]=c}if(t instanceof wa){const l=t.getScopes().filter(c=>c!=="");l.length>0&&(s.scopes=l.join(","))}e.tenantId&&(s.tid=e.tenantId);const a=s;for(const l of Object.keys(a))a[l]===void 0&&delete a[l];return`${YT(e)}?${fa(a).slice(1)}`}function YT({config:e}){return e.emulator?gp(e,XT):`https://${e.authDomain}/${JT}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hd="webStorageSupport";class ZT{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Nw,this._completeRedirectFn=bT}async _openPopup(t,n,r,o){var i;ir((i=this.eventManagers[t._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const s=Sv(t,n,r,Dh(),o);return KT(t,s,xp())}async _openRedirect(t,n,r,o){return await this._originValidation(t),tT(Sv(t,n,r,Dh(),o)),new Promise(()=>{})}_initialize(t){const n=t._key();if(this.eventManagers[n]){const{manager:o,promise:i}=this.eventManagers[n];return o?Promise.resolve(o):(ir(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(t);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(t){const n=await VT(t),r=new IT(t);return n.register("authEvent",o=>(ie(o==null?void 0:o.authEvent,t,"invalid-auth-event"),{status:r.onEvent(o.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:r},this.iframes[t._key()]=n,r}_isIframeWebStorageSupported(t,n){this.iframes[t._key()].send(hd,{type:hd},o=>{var i;const s=(i=o==null?void 0:o[0])===null||i===void 0?void 0:i[hd];s!==void 0&&n(!!s),yn(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const n=t._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=NT(t)),this.originValidationPromises[n]}get _shouldInitProactively(){return bw()||yp()||Yc()}}const eO=ZT;var xv="@firebase/auth",_v="0.19.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tO{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)===null||t===void 0?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const n=this.auth.onIdTokenChanged(r=>{var o;t(((o=r)===null||o===void 0?void 0:o.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,n),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const n=this.internalListeners.get(t);n&&(this.internalListeners.delete(t),n(),this.updateProactiveRefresh())}assertAuthConfigured(){ie(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nO(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function rO(e){or(new Fn("auth",(t,{options:n})=>{const r=t.getProvider("app").getImmediate(),{apiKey:o,authDomain:i}=r.options;return(s=>{ie(o&&!o.includes(":"),"invalid-api-key",{appName:s.name}),ie(!(i!=null&&i.includes(":")),"argument-error",{appName:s.name});const a={apiKey:o,authDomain:i,clientPlatform:e,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Cw(e)},l=new Nk(s,a);return dk(l,n),l})(r)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,n,r)=>{t.getProvider("auth-internal").initialize()})),or(new Fn("auth-internal",t=>{const n=ya(t.getProvider("auth").getImmediate());return(r=>new tO(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),pn(xv,_v,nO(e)),pn(xv,_v,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fw(e=fp()){const t=Ro(e,"auth");return t.isInitialized()?t.getImmediate():uk(e,{popupRedirectResolver:eO,persistence:[uT,Yk,Nw]})}rO("Browser");var oO="firebase",iO="9.6.7";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */pn(oO,iO,"app");var sO=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},G,bp=bp||{},se=sO||self;function uc(){}function Fh(e){var t=typeof e;return t=t!="object"?t:e?Array.isArray(e)?"array":t:"null",t=="array"||t=="object"&&typeof e.length=="number"}function Sa(e){var t=typeof e;return t=="object"&&e!=null||t=="function"}function aO(e){return Object.prototype.hasOwnProperty.call(e,fd)&&e[fd]||(e[fd]=++lO)}var fd="closure_uid_"+(1e9*Math.random()>>>0),lO=0;function cO(e,t,n){return e.call.apply(e.bind,arguments)}function uO(e,t,n){if(!e)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var o=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(o,r),e.apply(t,o)}}return function(){return e.apply(t,arguments)}}function yt(e,t,n){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?yt=cO:yt=uO,yt.apply(null,arguments)}function tl(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var r=n.slice();return r.push.apply(r,arguments),e.apply(this,r)}}function St(e,t){function n(){}n.prototype=t.prototype,e.Z=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Vb=function(r,o,i){for(var s=Array(arguments.length-2),a=2;a<arguments.length;a++)s[a-2]=arguments[a];return t.prototype[o].apply(r,s)}}function qr(){this.s=this.s,this.o=this.o}var dO=0;qr.prototype.s=!1;qr.prototype.na=function(){!this.s&&(this.s=!0,this.M(),dO!=0)&&aO(this)};qr.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const zw=Array.prototype.indexOf?function(e,t){return Array.prototype.indexOf.call(e,t,void 0)}:function(e,t){if(typeof e=="string")return typeof t!="string"||t.length!=1?-1:e.indexOf(t,0);for(let n=0;n<e.length;n++)if(n in e&&e[n]===t)return n;return-1},Uw=Array.prototype.forEach?function(e,t,n){Array.prototype.forEach.call(e,t,n)}:function(e,t,n){const r=e.length,o=typeof e=="string"?e.split(""):e;for(let i=0;i<r;i++)i in o&&t.call(n,o[i],i,e)};function hO(e){e:{var t=rP;const n=e.length,r=typeof e=="string"?e.split(""):e;for(let o=0;o<n;o++)if(o in r&&t.call(void 0,r[o],o,e)){t=o;break e}t=-1}return 0>t?null:typeof e=="string"?e.charAt(t):e[t]}function bv(e){return Array.prototype.concat.apply([],arguments)}function Cp(e){const t=e.length;if(0<t){const n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function dc(e){return/^[\s\xa0]*$/.test(e)}var Cv=String.prototype.trim?function(e){return e.trim()}:function(e){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(e)[1]};function Mt(e,t){return e.indexOf(t)!=-1}function pd(e,t){return e<t?-1:e>t?1:0}var Lt;e:{var Iv=se.navigator;if(Iv){var kv=Iv.userAgent;if(kv){Lt=kv;break e}}Lt=""}function Ip(e,t,n){for(const r in e)t.call(n,e[r],r,e)}function Vw(e){const t={};for(const n in e)t[n]=e[n];return t}var Tv="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Bw(e,t){let n,r;for(let o=1;o<arguments.length;o++){r=arguments[o];for(n in r)e[n]=r[n];for(let i=0;i<Tv.length;i++)n=Tv[i],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function kp(e){return kp[" "](e),e}kp[" "]=uc;function fO(e){var t=gO;return Object.prototype.hasOwnProperty.call(t,9)?t[9]:t[9]=e(9)}var pO=Mt(Lt,"Opera"),_i=Mt(Lt,"Trident")||Mt(Lt,"MSIE"),Ww=Mt(Lt,"Edge"),zh=Ww||_i,qw=Mt(Lt,"Gecko")&&!(Mt(Lt.toLowerCase(),"webkit")&&!Mt(Lt,"Edge"))&&!(Mt(Lt,"Trident")||Mt(Lt,"MSIE"))&&!Mt(Lt,"Edge"),mO=Mt(Lt.toLowerCase(),"webkit")&&!Mt(Lt,"Edge");function Hw(){var e=se.document;return e?e.documentMode:void 0}var hc;e:{var md="",gd=function(){var e=Lt;if(qw)return/rv:([^\);]+)(\)|;)/.exec(e);if(Ww)return/Edge\/([\d\.]+)/.exec(e);if(_i)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(e);if(mO)return/WebKit\/(\S+)/.exec(e);if(pO)return/(?:Version)[ \/]?(\S+)/.exec(e)}();if(gd&&(md=gd?gd[1]:""),_i){var vd=Hw();if(vd!=null&&vd>parseFloat(md)){hc=String(vd);break e}}hc=md}var gO={};function vO(){return fO(function(){let e=0;const t=Cv(String(hc)).split("."),n=Cv("9").split("."),r=Math.max(t.length,n.length);for(let s=0;e==0&&s<r;s++){var o=t[s]||"",i=n[s]||"";do{if(o=/(\d*)(\D*)(.*)/.exec(o)||["","","",""],i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],o[0].length==0&&i[0].length==0)break;e=pd(o[1].length==0?0:parseInt(o[1],10),i[1].length==0?0:parseInt(i[1],10))||pd(o[2].length==0,i[2].length==0)||pd(o[2],i[2]),o=o[3],i=i[3]}while(e==0)}return 0<=e})}var Uh;if(se.document&&_i){var Ov=Hw();Uh=Ov||parseInt(hc,10)||void 0}else Uh=void 0;var yO=Uh,wO=function(){if(!se.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{se.addEventListener("test",uc,t),se.removeEventListener("test",uc,t)}catch{}return e}();function At(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}At.prototype.h=function(){this.defaultPrevented=!0};function qs(e,t){if(At.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(qw){e:{try{kp(t.nodeName);var o=!0;break e}catch{}o=!1}o||(t=null)}}else n=="mouseover"?t=e.fromElement:n=="mouseout"&&(t=e.toElement);this.relatedTarget=t,r?(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=e.clientX!==void 0?e.clientX:e.pageX,this.clientY=e.clientY!==void 0?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType=typeof e.pointerType=="string"?e.pointerType:EO[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&qs.Z.h.call(this)}}St(qs,At);var EO={2:"touch",3:"pen",4:"mouse"};qs.prototype.h=function(){qs.Z.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var xa="closure_listenable_"+(1e6*Math.random()|0),SO=0;function xO(e,t,n,r,o){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.ia=o,this.key=++SO,this.ca=this.fa=!1}function tu(e){e.ca=!0,e.listener=null,e.proxy=null,e.src=null,e.ia=null}function nu(e){this.src=e,this.g={},this.h=0}nu.prototype.add=function(e,t,n,r,o){var i=e.toString();e=this.g[i],e||(e=this.g[i]=[],this.h++);var s=Bh(e,t,r,o);return-1<s?(t=e[s],n||(t.fa=!1)):(t=new xO(t,this.src,i,!!r,o),t.fa=n,e.push(t)),t};function Vh(e,t){var n=t.type;if(n in e.g){var r=e.g[n],o=zw(r,t),i;(i=0<=o)&&Array.prototype.splice.call(r,o,1),i&&(tu(t),e.g[n].length==0&&(delete e.g[n],e.h--))}}function Bh(e,t,n,r){for(var o=0;o<e.length;++o){var i=e[o];if(!i.ca&&i.listener==t&&i.capture==!!n&&i.ia==r)return o}return-1}var Tp="closure_lm_"+(1e6*Math.random()|0),yd={};function Gw(e,t,n,r,o){if(r&&r.once)return Qw(e,t,n,r,o);if(Array.isArray(t)){for(var i=0;i<t.length;i++)Gw(e,t[i],n,r,o);return null}return n=Np(n),e&&e[xa]?e.N(t,n,Sa(r)?!!r.capture:!!r,o):Kw(e,t,n,!1,r,o)}function Kw(e,t,n,r,o,i){if(!t)throw Error("Invalid event type");var s=Sa(o)?!!o.capture:!!o,a=Pp(e);if(a||(e[Tp]=a=new nu(e)),n=a.add(t,n,r,s,i),n.proxy)return n;if(r=_O(),n.proxy=r,r.src=e,r.listener=n,e.addEventListener)wO||(o=s),o===void 0&&(o=!1),e.addEventListener(t.toString(),r,o);else if(e.attachEvent)e.attachEvent(Xw(t.toString()),r);else if(e.addListener&&e.removeListener)e.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return n}function _O(){function e(n){return t.call(e.src,e.listener,n)}var t=bO;return e}function Qw(e,t,n,r,o){if(Array.isArray(t)){for(var i=0;i<t.length;i++)Qw(e,t[i],n,r,o);return null}return n=Np(n),e&&e[xa]?e.O(t,n,Sa(r)?!!r.capture:!!r,o):Kw(e,t,n,!0,r,o)}function Jw(e,t,n,r,o){if(Array.isArray(t))for(var i=0;i<t.length;i++)Jw(e,t[i],n,r,o);else r=Sa(r)?!!r.capture:!!r,n=Np(n),e&&e[xa]?(e=e.i,t=String(t).toString(),t in e.g&&(i=e.g[t],n=Bh(i,n,r,o),-1<n&&(tu(i[n]),Array.prototype.splice.call(i,n,1),i.length==0&&(delete e.g[t],e.h--)))):e&&(e=Pp(e))&&(t=e.g[t.toString()],e=-1,t&&(e=Bh(t,n,r,o)),(n=-1<e?t[e]:null)&&Op(n))}function Op(e){if(typeof e!="number"&&e&&!e.ca){var t=e.src;if(t&&t[xa])Vh(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent(Xw(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=Pp(t))?(Vh(n,e),n.h==0&&(n.src=null,t[Tp]=null)):tu(e)}}}function Xw(e){return e in yd?yd[e]:yd[e]="on"+e}function bO(e,t){if(e.ca)e=!0;else{t=new qs(t,this);var n=e.listener,r=e.ia||e.src;e.fa&&Op(e),e=n.call(r,t)}return e}function Pp(e){return e=e[Tp],e instanceof nu?e:null}var wd="__closure_events_fn_"+(1e9*Math.random()>>>0);function Np(e){return typeof e=="function"?e:(e[wd]||(e[wd]=function(t){return e.handleEvent(t)}),e[wd])}function dt(){qr.call(this),this.i=new nu(this),this.P=this,this.I=null}St(dt,qr);dt.prototype[xa]=!0;dt.prototype.removeEventListener=function(e,t,n,r){Jw(this,e,t,n,r)};function wt(e,t){var n,r=e.I;if(r)for(n=[];r;r=r.I)n.push(r);if(e=e.P,r=t.type||t,typeof t=="string")t=new At(t,e);else if(t instanceof At)t.target=t.target||e;else{var o=t;t=new At(r,e),Bw(t,o)}if(o=!0,n)for(var i=n.length-1;0<=i;i--){var s=t.g=n[i];o=nl(s,r,!0,t)&&o}if(s=t.g=e,o=nl(s,r,!0,t)&&o,o=nl(s,r,!1,t)&&o,n)for(i=0;i<n.length;i++)s=t.g=n[i],o=nl(s,r,!1,t)&&o}dt.prototype.M=function(){if(dt.Z.M.call(this),this.i){var e=this.i,t;for(t in e.g){for(var n=e.g[t],r=0;r<n.length;r++)tu(n[r]);delete e.g[t],e.h--}}this.I=null};dt.prototype.N=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)};dt.prototype.O=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};function nl(e,t,n,r){if(t=e.i.g[String(t)],!t)return!0;t=t.concat();for(var o=!0,i=0;i<t.length;++i){var s=t[i];if(s&&!s.ca&&s.capture==n){var a=s.listener,l=s.ia||s.src;s.fa&&Vh(e.i,s),o=a.call(l,r)!==!1&&o}}return o&&!r.defaultPrevented}var Ap=se.JSON.stringify;function CO(){var e=Zw;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}class IO{constructor(){this.h=this.g=null}add(t,n){const r=Yw.get();r.set(t,n),this.h?this.h.next=r:this.g=r,this.h=r}}var Yw=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}(()=>new kO,e=>e.reset());class kO{constructor(){this.next=this.g=this.h=null}set(t,n){this.h=t,this.g=n,this.next=null}reset(){this.next=this.g=this.h=null}}function TO(e){se.setTimeout(()=>{throw e},0)}function jp(e,t){Wh||OO(),qh||(Wh(),qh=!0),Zw.add(e,t)}var Wh;function OO(){var e=se.Promise.resolve(void 0);Wh=function(){e.then(PO)}}var qh=!1,Zw=new IO;function PO(){for(var e;e=CO();){try{e.h.call(e.g)}catch(n){TO(n)}var t=Yw;t.j(e),100>t.h&&(t.h++,e.next=t.g,t.g=e)}qh=!1}function ru(e,t){dt.call(this),this.h=e||1,this.g=t||se,this.j=yt(this.kb,this),this.l=Date.now()}St(ru,dt);G=ru.prototype;G.da=!1;G.S=null;G.kb=function(){if(this.da){var e=Date.now()-this.l;0<e&&e<.8*this.h?this.S=this.g.setTimeout(this.j,this.h-e):(this.S&&(this.g.clearTimeout(this.S),this.S=null),wt(this,"tick"),this.da&&(Rp(this),this.start()))}};G.start=function(){this.da=!0,this.S||(this.S=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function Rp(e){e.da=!1,e.S&&(e.g.clearTimeout(e.S),e.S=null)}G.M=function(){ru.Z.M.call(this),Rp(this),delete this.g};function Mp(e,t,n){if(typeof e=="function")n&&(e=yt(e,n));else if(e&&typeof e.handleEvent=="function")e=yt(e.handleEvent,e);else throw Error("Invalid listener argument");return 2147483647<Number(t)?-1:se.setTimeout(e,t||0)}function eE(e){e.g=Mp(()=>{e.g=null,e.i&&(e.i=!1,eE(e))},e.j);const t=e.h;e.h=null,e.m.apply(null,t)}class NO extends qr{constructor(t,n){super(),this.m=t,this.j=n,this.h=null,this.i=!1,this.g=null}l(t){this.h=arguments,this.g?this.i=!0:eE(this)}M(){super.M(),this.g&&(se.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Hs(e){qr.call(this),this.h=e,this.g={}}St(Hs,qr);var Pv=[];function tE(e,t,n,r){Array.isArray(n)||(n&&(Pv[0]=n.toString()),n=Pv);for(var o=0;o<n.length;o++){var i=Gw(t,n[o],r||e.handleEvent,!1,e.h||e);if(!i)break;e.g[i.key]=i}}function nE(e){Ip(e.g,function(t,n){this.g.hasOwnProperty(n)&&Op(t)},e),e.g={}}Hs.prototype.M=function(){Hs.Z.M.call(this),nE(this)};Hs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function ou(){this.g=!0}ou.prototype.Aa=function(){this.g=!1};function AO(e,t,n,r,o,i){e.info(function(){if(e.g)if(i)for(var s="",a=i.split("&"),l=0;l<a.length;l++){var c=a[l].split("=");if(1<c.length){var d=c[0];c=c[1];var h=d.split("_");s=2<=h.length&&h[1]=="type"?s+(d+"="+c+"&"):s+(d+"=redacted&")}}else s=null;else s=i;return"XMLHTTP REQ ("+r+") [attempt "+o+"]: "+t+`
`+n+`
`+s})}function jO(e,t,n,r,o,i,s){e.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+o+"]: "+t+`
`+n+`
`+i+" "+s})}function Zo(e,t,n,r){e.info(function(){return"XMLHTTP TEXT ("+t+"): "+MO(e,n)+(r?" "+r:"")})}function RO(e,t){e.info(function(){return"TIMEOUT: "+t})}ou.prototype.info=function(){};function MO(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n){for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var r=n[e];if(!(2>r.length)){var o=r[1];if(Array.isArray(o)&&!(1>o.length)){var i=o[0];if(i!="noop"&&i!="stop"&&i!="close")for(var s=1;s<o.length;s++)o[s]=""}}}}return Ap(n)}catch{return t}}var Mo={},Nv=null;function iu(){return Nv=Nv||new dt}Mo.Ma="serverreachability";function rE(e){At.call(this,Mo.Ma,e)}St(rE,At);function Gs(e){const t=iu();wt(t,new rE(t))}Mo.STAT_EVENT="statevent";function oE(e,t){At.call(this,Mo.STAT_EVENT,e),this.stat=t}St(oE,At);function Dt(e){const t=iu();wt(t,new oE(t,e))}Mo.Na="timingevent";function iE(e,t){At.call(this,Mo.Na,e),this.size=t}St(iE,At);function _a(e,t){if(typeof e!="function")throw Error("Fn must not be null and must be a function");return se.setTimeout(function(){e()},t)}var su={NO_ERROR:0,lb:1,yb:2,xb:3,sb:4,wb:5,zb:6,Ja:7,TIMEOUT:8,Cb:9},sE={qb:"complete",Mb:"success",Ka:"error",Ja:"abort",Eb:"ready",Fb:"readystatechange",TIMEOUT:"timeout",Ab:"incrementaldata",Db:"progress",tb:"downloadprogress",Ub:"uploadprogress"};function Lp(){}Lp.prototype.h=null;function Av(e){return e.h||(e.h=e.i())}function aE(){}var ba={OPEN:"a",pb:"b",Ka:"c",Bb:"d"};function Dp(){At.call(this,"d")}St(Dp,At);function $p(){At.call(this,"c")}St($p,At);var Hh;function au(){}St(au,Lp);au.prototype.g=function(){return new XMLHttpRequest};au.prototype.i=function(){return{}};Hh=new au;function Ca(e,t,n,r){this.l=e,this.j=t,this.m=n,this.X=r||1,this.V=new Hs(this),this.P=LO,e=zh?125:void 0,this.W=new ru(e),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.Y=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.N=-1,this.I=!1,this.O=0,this.L=null,this.aa=this.J=this.$=this.U=!1,this.h=new lE}function lE(){this.i=null,this.g="",this.h=!1}var LO=45e3,Gh={},fc={};G=Ca.prototype;G.setTimeout=function(e){this.P=e};function Kh(e,t,n){e.K=1,e.v=cu(sr(t)),e.s=n,e.U=!0,cE(e,null)}function cE(e,t){e.F=Date.now(),Ia(e),e.A=sr(e.v);var n=e.A,r=e.X;Array.isArray(r)||(r=[String(r)]),gE(n.h,"t",r),e.C=0,n=e.l.H,e.h=new lE,e.g=LE(e.l,n?t:null,!e.s),0<e.O&&(e.L=new NO(yt(e.Ia,e,e.g),e.O)),tE(e.V,e.g,"readystatechange",e.gb),t=e.H?Vw(e.H):{},e.s?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.A,e.u,e.s,t)):(e.u="GET",e.g.ea(e.A,e.u,null,t)),Gs(),AO(e.j,e.u,e.A,e.m,e.X,e.s)}G.gb=function(e){e=e.target;const t=this.L;t&&Jn(e)==3?t.l():this.Ia(e)};G.Ia=function(e){try{if(e==this.g)e:{const d=Jn(this.g);var t=this.g.Da();const h=this.g.ba();if(!(3>d)&&(d!=3||zh||this.g&&(this.h.h||this.g.ga()||Lv(this.g)))){this.I||d!=4||t==7||(t==8||0>=h?Gs(3):Gs(2)),lu(this);var n=this.g.ba();this.N=n;t:if(uE(this)){var r=Lv(this.g);e="";var o=r.length,i=Jn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){so(this),vs(this);var s="";break t}this.h.i=new se.TextDecoder}for(t=0;t<o;t++)this.h.h=!0,e+=this.h.i.decode(r[t],{stream:i&&t==o-1});r.splice(0,o),this.h.g+=e,this.C=0,s=this.h.g}else s=this.g.ga();if(this.i=n==200,jO(this.j,this.u,this.A,this.m,this.X,d,n),this.i){if(this.$&&!this.J){t:{if(this.g){var a,l=this.g;if((a=l.g?l.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!dc(a)){var c=a;break t}}c=null}if(n=c)Zo(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,Qh(this,n);else{this.i=!1,this.o=3,Dt(12),so(this),vs(this);break e}}this.U?(dE(this,d,s),zh&&this.i&&d==3&&(tE(this.V,this.W,"tick",this.fb),this.W.start())):(Zo(this.j,this.m,s,null),Qh(this,s)),d==4&&so(this),this.i&&!this.I&&(d==4?AE(this.l,this):(this.i=!1,Ia(this)))}else n==400&&0<s.indexOf("Unknown SID")?(this.o=3,Dt(12)):(this.o=0,Dt(13)),so(this),vs(this)}}}catch{}finally{}};function uE(e){return e.g?e.u=="GET"&&e.K!=2&&e.l.Ba:!1}function dE(e,t,n){let r=!0,o;for(;!e.I&&e.C<n.length;)if(o=DO(e,n),o==fc){t==4&&(e.o=4,Dt(14),r=!1),Zo(e.j,e.m,null,"[Incomplete Response]");break}else if(o==Gh){e.o=4,Dt(15),Zo(e.j,e.m,n,"[Invalid Chunk]"),r=!1;break}else Zo(e.j,e.m,o,null),Qh(e,o);uE(e)&&o!=fc&&o!=Gh&&(e.h.g="",e.C=0),t!=4||n.length!=0||e.h.h||(e.o=1,Dt(16),r=!1),e.i=e.i&&r,r?0<n.length&&!e.aa&&(e.aa=!0,t=e.l,t.g==e&&t.$&&!t.L&&(t.h.info("Great, no buffering proxy detected. Bytes received: "+n.length),Gp(t),t.L=!0,Dt(11))):(Zo(e.j,e.m,n,"[Invalid Chunked Response]"),so(e),vs(e))}G.fb=function(){if(this.g){var e=Jn(this.g),t=this.g.ga();this.C<t.length&&(lu(this),dE(this,e,t),this.i&&e!=4&&Ia(this))}};function DO(e,t){var n=e.C,r=t.indexOf(`
`,n);return r==-1?fc:(n=Number(t.substring(n,r)),isNaN(n)?Gh:(r+=1,r+n>t.length?fc:(t=t.substr(r,n),e.C=r+n,t)))}G.cancel=function(){this.I=!0,so(this)};function Ia(e){e.Y=Date.now()+e.P,hE(e,e.P)}function hE(e,t){if(e.B!=null)throw Error("WatchDog timer not null");e.B=_a(yt(e.eb,e),t)}function lu(e){e.B&&(se.clearTimeout(e.B),e.B=null)}G.eb=function(){this.B=null;const e=Date.now();0<=e-this.Y?(RO(this.j,this.A),this.K!=2&&(Gs(),Dt(17)),so(this),this.o=2,vs(this)):hE(this,this.Y-e)};function vs(e){e.l.G==0||e.I||AE(e.l,e)}function so(e){lu(e);var t=e.L;t&&typeof t.na=="function"&&t.na(),e.L=null,Rp(e.W),nE(e.V),e.g&&(t=e.g,e.g=null,t.abort(),t.na())}function Qh(e,t){try{var n=e.l;if(n.G!=0&&(n.g==e||Jh(n.i,e))){if(n.I=e.N,!e.J&&Jh(n.i,e)&&n.G==3){try{var r=n.Ca.g.parse(t)}catch{r=null}if(Array.isArray(r)&&r.length==3){var o=r;if(o[0]==0){e:if(!n.u){if(n.g)if(n.g.F+3e3<e.F)vc(n),hu(n);else break e;Hp(n),Dt(18)}}else n.ta=o[1],0<n.ta-n.U&&37500>o[2]&&n.N&&n.A==0&&!n.v&&(n.v=_a(yt(n.ab,n),6e3));if(1>=wE(n.i)&&n.ka){try{n.ka()}catch{}n.ka=void 0}}else ao(n,11)}else if((e.J||n.g==e)&&vc(n),!dc(t))for(o=n.Ca.g.parse(t),t=0;t<o.length;t++){let c=o[t];if(n.U=c[0],c=c[1],n.G==2)if(c[0]=="c"){n.J=c[1],n.la=c[2];const d=c[3];d!=null&&(n.ma=d,n.h.info("VER="+n.ma));const h=c[4];h!=null&&(n.za=h,n.h.info("SVER="+n.za));const f=c[5];f!=null&&typeof f=="number"&&0<f&&(r=1.5*f,n.K=r,n.h.info("backChannelRequestTimeoutMs_="+r)),r=n;const g=e.g;if(g){const y=g.g?g.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(y){var i=r.i;!i.g&&(Mt(y,"spdy")||Mt(y,"quic")||Mt(y,"h2"))&&(i.j=i.l,i.g=new Set,i.h&&(Up(i,i.h),i.h=null))}if(r.D){const w=g.g?g.g.getResponseHeader("X-HTTP-Session-Id"):null;w&&(r.sa=w,$e(r.F,r.D,w))}}n.G=3,n.j&&n.j.xa(),n.$&&(n.O=Date.now()-e.F,n.h.info("Handshake RTT: "+n.O+"ms")),r=n;var s=e;if(r.oa=ME(r,r.H?r.la:null,r.W),s.J){EE(r.i,s);var a=s,l=r.K;l&&a.setTimeout(l),a.B&&(lu(a),Ia(a)),r.g=s}else PE(r);0<n.l.length&&fu(n)}else c[0]!="stop"&&c[0]!="close"||ao(n,7);else n.G==3&&(c[0]=="stop"||c[0]=="close"?c[0]=="stop"?ao(n,7):qp(n):c[0]!="noop"&&n.j&&n.j.wa(c),n.A=0)}}Gs(4)}catch{}}function $O(e){if(e.R&&typeof e.R=="function")return e.R();if(typeof e=="string")return e.split("");if(Fh(e)){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t}t=[],n=0;for(r in e)t[n++]=e[r];return t}function Fp(e,t){if(e.forEach&&typeof e.forEach=="function")e.forEach(t,void 0);else if(Fh(e)||typeof e=="string")Uw(e,t,void 0);else{if(e.T&&typeof e.T=="function")var n=e.T();else if(e.R&&typeof e.R=="function")n=void 0;else if(Fh(e)||typeof e=="string"){n=[];for(var r=e.length,o=0;o<r;o++)n.push(o)}else for(o in n=[],r=0,e)n[r++]=o;r=$O(e),o=r.length;for(var i=0;i<o;i++)t.call(void 0,r[i],n&&n[i],e)}}function Li(e,t){this.h={},this.g=[],this.i=0;var n=arguments.length;if(1<n){if(n%2)throw Error("Uneven number of arguments");for(var r=0;r<n;r+=2)this.set(arguments[r],arguments[r+1])}else if(e)if(e instanceof Li)for(n=e.T(),r=0;r<n.length;r++)this.set(n[r],e.get(n[r]));else for(r in e)this.set(r,e[r])}G=Li.prototype;G.R=function(){zp(this);for(var e=[],t=0;t<this.g.length;t++)e.push(this.h[this.g[t]]);return e};G.T=function(){return zp(this),this.g.concat()};function zp(e){if(e.i!=e.g.length){for(var t=0,n=0;t<e.g.length;){var r=e.g[t];So(e.h,r)&&(e.g[n++]=r),t++}e.g.length=n}if(e.i!=e.g.length){var o={};for(n=t=0;t<e.g.length;)r=e.g[t],So(o,r)||(e.g[n++]=r,o[r]=1),t++;e.g.length=n}}G.get=function(e,t){return So(this.h,e)?this.h[e]:t};G.set=function(e,t){So(this.h,e)||(this.i++,this.g.push(e)),this.h[e]=t};G.forEach=function(e,t){for(var n=this.T(),r=0;r<n.length;r++){var o=n[r],i=this.get(o);e.call(t,i,o,this)}};function So(e,t){return Object.prototype.hasOwnProperty.call(e,t)}var fE=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function FO(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var r=e[n].indexOf("="),o=null;if(0<=r){var i=e[n].substring(0,r);o=e[n].substring(r+1)}else i=e[n];t(i,o?decodeURIComponent(o.replace(/\+/g," ")):"")}}}function xo(e,t){if(this.i=this.s=this.j="",this.m=null,this.o=this.l="",this.g=!1,e instanceof xo){this.g=t!==void 0?t:e.g,pc(this,e.j),this.s=e.s,mc(this,e.i),gc(this,e.m),this.l=e.l,t=e.h;var n=new Ks;n.i=t.i,t.g&&(n.g=new Li(t.g),n.h=t.h),jv(this,n),this.o=e.o}else e&&(n=String(e).match(fE))?(this.g=!!t,pc(this,n[1]||"",!0),this.s=ys(n[2]||""),mc(this,n[3]||"",!0),gc(this,n[4]),this.l=ys(n[5]||"",!0),jv(this,n[6]||"",!0),this.o=ys(n[7]||"")):(this.g=!!t,this.h=new Ks(null,this.g))}xo.prototype.toString=function(){var e=[],t=this.j;t&&e.push(ss(t,Rv,!0),":");var n=this.i;return(n||t=="file")&&(e.push("//"),(t=this.s)&&e.push(ss(t,Rv,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n=this.m,n!=null&&e.push(":",String(n))),(n=this.l)&&(this.i&&n.charAt(0)!="/"&&e.push("/"),e.push(ss(n,n.charAt(0)=="/"?WO:BO,!0))),(n=this.h.toString())&&e.push("?",n),(n=this.o)&&e.push("#",ss(n,HO)),e.join("")};function sr(e){return new xo(e)}function pc(e,t,n){e.j=n?ys(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function mc(e,t,n){e.i=n?ys(t,!0):t}function gc(e,t){if(t){if(t=Number(t),isNaN(t)||0>t)throw Error("Bad port number "+t);e.m=t}else e.m=null}function jv(e,t,n){t instanceof Ks?(e.h=t,GO(e.h,e.g)):(n||(t=ss(t,qO)),e.h=new Ks(t,e.g))}function $e(e,t,n){e.h.set(t,n)}function cu(e){return $e(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function zO(e){return e instanceof xo?sr(e):new xo(e,void 0)}function UO(e,t,n,r){var o=new xo(null,void 0);return e&&pc(o,e),t&&mc(o,t),n&&gc(o,n),r&&(o.l=r),o}function ys(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function ss(e,t,n){return typeof e=="string"?(e=encodeURI(e).replace(t,VO),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function VO(e){return e=e.charCodeAt(0),"%"+(e>>4&15).toString(16)+(e&15).toString(16)}var Rv=/[#\/\?@]/g,BO=/[#\?:]/g,WO=/[#\?]/g,qO=/[#\?@]/g,HO=/#/g;function Ks(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function Hr(e){e.g||(e.g=new Li,e.h=0,e.i&&FO(e.i,function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)}))}G=Ks.prototype;G.add=function(e,t){Hr(this),this.i=null,e=Di(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this};function pE(e,t){Hr(e),t=Di(e,t),So(e.g.h,t)&&(e.i=null,e.h-=e.g.get(t).length,e=e.g,So(e.h,t)&&(delete e.h[t],e.i--,e.g.length>2*e.i&&zp(e)))}function mE(e,t){return Hr(e),t=Di(e,t),So(e.g.h,t)}G.forEach=function(e,t){Hr(this),this.g.forEach(function(n,r){Uw(n,function(o){e.call(t,o,r,this)},this)},this)};G.T=function(){Hr(this);for(var e=this.g.R(),t=this.g.T(),n=[],r=0;r<t.length;r++)for(var o=e[r],i=0;i<o.length;i++)n.push(t[r]);return n};G.R=function(e){Hr(this);var t=[];if(typeof e=="string")mE(this,e)&&(t=bv(t,this.g.get(Di(this,e))));else{e=this.g.R();for(var n=0;n<e.length;n++)t=bv(t,e[n])}return t};G.set=function(e,t){return Hr(this),this.i=null,e=Di(this,e),mE(this,e)&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this};G.get=function(e,t){return e?(e=this.R(e),0<e.length?String(e[0]):t):t};function gE(e,t,n){pE(e,t),0<n.length&&(e.i=null,e.g.set(Di(e,t),Cp(n)),e.h+=n.length)}G.toString=function(){if(this.i)return this.i;if(!this.g)return"";for(var e=[],t=this.g.T(),n=0;n<t.length;n++){var r=t[n],o=encodeURIComponent(String(r));r=this.R(r);for(var i=0;i<r.length;i++){var s=o;r[i]!==""&&(s+="="+encodeURIComponent(String(r[i]))),e.push(s)}}return this.i=e.join("&")};function Di(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}function GO(e,t){t&&!e.j&&(Hr(e),e.i=null,e.g.forEach(function(n,r){var o=r.toLowerCase();r!=o&&(pE(this,r),gE(this,o,n))},e)),e.j=t}var KO=class{constructor(e,t){this.h=e,this.g=t}};function vE(e){this.l=e||QO,se.PerformanceNavigationTiming?(e=se.performance.getEntriesByType("navigation"),e=0<e.length&&(e[0].nextHopProtocol=="hq"||e[0].nextHopProtocol=="h2")):e=!!(se.g&&se.g.Ea&&se.g.Ea()&&se.g.Ea().Zb),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var QO=10;function yE(e){return e.h?!0:e.g?e.g.size>=e.j:!1}function wE(e){return e.h?1:e.g?e.g.size:0}function Jh(e,t){return e.h?e.h==t:e.g?e.g.has(t):!1}function Up(e,t){e.g?e.g.add(t):e.h=t}function EE(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}vE.prototype.cancel=function(){if(this.i=SE(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const e of this.g.values())e.cancel();this.g.clear()}};function SE(e){if(e.h!=null)return e.i.concat(e.h.D);if(e.g!=null&&e.g.size!==0){let t=e.i;for(const n of e.g.values())t=t.concat(n.D);return t}return Cp(e.i)}function Vp(){}Vp.prototype.stringify=function(e){return se.JSON.stringify(e,void 0)};Vp.prototype.parse=function(e){return se.JSON.parse(e,void 0)};function JO(){this.g=new Vp}function XO(e,t,n){const r=n||"";try{Fp(e,function(o,i){let s=o;Sa(o)&&(s=Ap(o)),t.push(r+i+"="+encodeURIComponent(s))})}catch(o){throw t.push(r+"type="+encodeURIComponent("_badmap")),o}}function YO(e,t){const n=new ou;if(se.Image){const r=new Image;r.onload=tl(rl,n,r,"TestLoadImage: loaded",!0,t),r.onerror=tl(rl,n,r,"TestLoadImage: error",!1,t),r.onabort=tl(rl,n,r,"TestLoadImage: abort",!1,t),r.ontimeout=tl(rl,n,r,"TestLoadImage: timeout",!1,t),se.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=e}else t(!1)}function rl(e,t,n,r,o){try{t.onload=null,t.onerror=null,t.onabort=null,t.ontimeout=null,o(r)}catch{}}function ka(e){this.l=e.$b||null,this.j=e.ib||!1}St(ka,Lp);ka.prototype.g=function(){return new uu(this.l,this.j)};ka.prototype.i=function(e){return function(){return e}}({});function uu(e,t){dt.call(this),this.D=e,this.u=t,this.m=void 0,this.readyState=Bp,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}St(uu,dt);var Bp=0;G=uu.prototype;G.open=function(e,t){if(this.readyState!=Bp)throw this.abort(),Error("Error reopening a connection");this.C=e,this.B=t,this.readyState=1,Qs(this)};G.send=function(e){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const t={headers:this.v,method:this.C,credentials:this.m,cache:void 0};e&&(t.body=e),(this.D||se).fetch(new Request(this.B,t)).then(this.Va.bind(this),this.ha.bind(this))};G.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted."),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ta(this)),this.readyState=Bp};G.Va=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,Qs(this)),this.g&&(this.readyState=3,Qs(this),this.g)))if(this.responseType==="arraybuffer")e.arrayBuffer().then(this.Ta.bind(this),this.ha.bind(this));else if(typeof se.ReadableStream<"u"&&"body"in e){if(this.j=e.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;xE(this)}else e.text().then(this.Ua.bind(this),this.ha.bind(this))};function xE(e){e.j.read().then(e.Sa.bind(e)).catch(e.ha.bind(e))}G.Sa=function(e){if(this.g){if(this.u&&e.value)this.response.push(e.value);else if(!this.u){var t=e.value?e.value:new Uint8Array(0);(t=this.A.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?Ta(this):Qs(this),this.readyState==3&&xE(this)}};G.Ua=function(e){this.g&&(this.response=this.responseText=e,Ta(this))};G.Ta=function(e){this.g&&(this.response=e,Ta(this))};G.ha=function(){this.g&&Ta(this)};function Ta(e){e.readyState=4,e.l=null,e.j=null,e.A=null,Qs(e)}G.setRequestHeader=function(e,t){this.v.append(e,t)};G.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""};G.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join(`\r
`)};function Qs(e){e.onreadystatechange&&e.onreadystatechange.call(e)}Object.defineProperty(uu.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(e){this.m=e?"include":"same-origin"}});var ZO=se.JSON.parse;function Ye(e){dt.call(this),this.headers=new Li,this.u=e||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=_E,this.K=this.L=!1}St(Ye,dt);var _E="",eP=/^https?$/i,tP=["POST","PUT"];G=Ye.prototype;G.ea=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+e);t=t?t.toUpperCase():"GET",this.H=e,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():Hh.g(),this.C=this.u?Av(this.u):Av(Hh),this.g.onreadystatechange=yt(this.Fa,this);try{this.F=!0,this.g.open(t,String(e),!0),this.F=!1}catch(i){Mv(this,i);return}e=n||"";const o=new Li(this.headers);r&&Fp(r,function(i,s){o.set(s,i)}),r=hO(o.T()),n=se.FormData&&e instanceof se.FormData,!(0<=zw(tP,t))||r||n||o.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),o.forEach(function(i,s){this.g.setRequestHeader(s,i)},this),this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{IE(this),0<this.B&&((this.K=nP(this.g))?(this.g.timeout=this.B,this.g.ontimeout=yt(this.pa,this)):this.A=Mp(this.pa,this.B,this)),this.v=!0,this.g.send(e),this.v=!1}catch(i){Mv(this,i)}};function nP(e){return _i&&vO()&&typeof e.timeout=="number"&&e.ontimeout!==void 0}function rP(e){return e.toLowerCase()=="content-type"}G.pa=function(){typeof bp<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,wt(this,"timeout"),this.abort(8))};function Mv(e,t){e.h=!1,e.g&&(e.l=!0,e.g.abort(),e.l=!1),e.j=t,e.m=5,bE(e),du(e)}function bE(e){e.D||(e.D=!0,wt(e,"complete"),wt(e,"error"))}G.abort=function(e){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=e||7,wt(this,"complete"),wt(this,"abort"),du(this))};G.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),du(this,!0)),Ye.Z.M.call(this)};G.Fa=function(){this.s||(this.F||this.v||this.l?CE(this):this.cb())};G.cb=function(){CE(this)};function CE(e){if(e.h&&typeof bp<"u"&&(!e.C[1]||Jn(e)!=4||e.ba()!=2)){if(e.v&&Jn(e)==4)Mp(e.Fa,0,e);else if(wt(e,"readystatechange"),Jn(e)==4){e.h=!1;try{const a=e.ba();e:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var r;if(r=a===0){var o=String(e.H).match(fE)[1]||null;if(!o&&se.self&&se.self.location){var i=se.self.location.protocol;o=i.substr(0,i.length-1)}r=!eP.test(o?o.toLowerCase():"")}n=r}if(n)wt(e,"complete"),wt(e,"success");else{e.m=6;try{var s=2<Jn(e)?e.g.statusText:""}catch{s=""}e.j=s+" ["+e.ba()+"]",bE(e)}}finally{du(e)}}}}function du(e,t){if(e.g){IE(e);const n=e.g,r=e.C[0]?uc:null;e.g=null,e.C=null,t||wt(e,"ready");try{n.onreadystatechange=r}catch{}}}function IE(e){e.g&&e.K&&(e.g.ontimeout=null),e.A&&(se.clearTimeout(e.A),e.A=null)}function Jn(e){return e.g?e.g.readyState:0}G.ba=function(){try{return 2<Jn(this)?this.g.status:-1}catch{return-1}};G.ga=function(){try{return this.g?this.g.responseText:""}catch{return""}};G.Qa=function(e){if(this.g){var t=this.g.responseText;return e&&t.indexOf(e)==0&&(t=t.substring(e.length)),ZO(t)}};function Lv(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.J){case _E:case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch{return null}}G.Da=function(){return this.m};G.La=function(){return typeof this.j=="string"?this.j:String(this.j)};function oP(e){let t="";return Ip(e,function(n,r){t+=r,t+=":",t+=n,t+=`\r
`}),t}function Wp(e,t,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=oP(n),typeof e=="string"?n!=null&&encodeURIComponent(String(n)):$e(e,t,n))}function Ji(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function kE(e){this.za=0,this.l=[],this.h=new ou,this.la=this.oa=this.F=this.W=this.g=this.sa=this.D=this.aa=this.o=this.P=this.s=null,this.Za=this.V=0,this.Xa=Ji("failFast",!1,e),this.N=this.v=this.u=this.m=this.j=null,this.X=!0,this.I=this.ta=this.U=-1,this.Y=this.A=this.C=0,this.Pa=Ji("baseRetryDelayMs",5e3,e),this.$a=Ji("retryDelaySeedMs",1e4,e),this.Ya=Ji("forwardChannelMaxRetries",2,e),this.ra=Ji("forwardChannelRequestTimeoutMs",2e4,e),this.qa=e&&e.xmlHttpFactory||void 0,this.Ba=e&&e.Yb||!1,this.K=void 0,this.H=e&&e.supportsCrossDomainXhr||!1,this.J="",this.i=new vE(e&&e.concurrentRequestLimit),this.Ca=new JO,this.ja=e&&e.fastHandshake||!1,this.Ra=e&&e.Wb||!1,e&&e.Aa&&this.h.Aa(),e&&e.forceLongPolling&&(this.X=!1),this.$=!this.ja&&this.X&&e&&e.detectBufferingProxy||!1,this.ka=void 0,this.O=0,this.L=!1,this.B=null,this.Wa=!e||e.Xb!==!1}G=kE.prototype;G.ma=8;G.G=1;function qp(e){if(TE(e),e.G==3){var t=e.V++,n=sr(e.F);$e(n,"SID",e.J),$e(n,"RID",t),$e(n,"TYPE","terminate"),Oa(e,n),t=new Ca(e,e.h,t,void 0),t.K=2,t.v=cu(sr(n)),n=!1,se.navigator&&se.navigator.sendBeacon&&(n=se.navigator.sendBeacon(t.v.toString(),"")),!n&&se.Image&&(new Image().src=t.v,n=!0),n||(t.g=LE(t.l,null),t.g.ea(t.v)),t.F=Date.now(),Ia(t)}RE(e)}G.hb=function(e){try{this.h.info("Origin Trials invoked: "+e)}catch{}};function hu(e){e.g&&(Gp(e),e.g.cancel(),e.g=null)}function TE(e){hu(e),e.u&&(se.clearTimeout(e.u),e.u=null),vc(e),e.i.cancel(),e.m&&(typeof e.m=="number"&&se.clearTimeout(e.m),e.m=null)}function Ed(e,t){e.l.push(new KO(e.Za++,t)),e.G==3&&fu(e)}function fu(e){yE(e.i)||e.m||(e.m=!0,jp(e.Ha,e),e.C=0)}function iP(e,t){return wE(e.i)>=e.i.j-(e.m?1:0)?!1:e.m?(e.l=t.D.concat(e.l),!0):e.G==1||e.G==2||e.C>=(e.Xa?0:e.Ya)?!1:(e.m=_a(yt(e.Ha,e,t),jE(e,e.C)),e.C++,!0)}G.Ha=function(e){if(this.m)if(this.m=null,this.G==1){if(!e){this.V=Math.floor(1e5*Math.random()),e=this.V++;const o=new Ca(this,this.h,e,void 0);let i=this.s;if(this.P&&(i?(i=Vw(i),Bw(i,this.P)):i=this.P),this.o===null&&(o.H=i),this.ja)e:{for(var t=0,n=0;n<this.l.length;n++){t:{var r=this.l[n];if("__data__"in r.g&&(r=r.g.__data__,typeof r=="string")){r=r.length;break t}r=void 0}if(r===void 0)break;if(t+=r,4096<t){t=n;break e}if(t===4096||n===this.l.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=OE(this,o,t),n=sr(this.F),$e(n,"RID",e),$e(n,"CVER",22),this.D&&$e(n,"X-HTTP-Session-Id",this.D),Oa(this,n),this.o&&i&&Wp(n,this.o,i),Up(this.i,o),this.Ra&&$e(n,"TYPE","init"),this.ja?($e(n,"$req",t),$e(n,"SID","null"),o.$=!0,Kh(o,n,null)):Kh(o,n,t),this.G=2}}else this.G==3&&(e?Dv(this,e):this.l.length==0||yE(this.i)||Dv(this))};function Dv(e,t){var n;t?n=t.m:n=e.V++;const r=sr(e.F);$e(r,"SID",e.J),$e(r,"RID",n),$e(r,"AID",e.U),Oa(e,r),e.o&&e.s&&Wp(r,e.o,e.s),n=new Ca(e,e.h,n,e.C+1),e.o===null&&(n.H=e.s),t&&(e.l=t.D.concat(e.l)),t=OE(e,n,1e3),n.setTimeout(Math.round(.5*e.ra)+Math.round(.5*e.ra*Math.random())),Up(e.i,n),Kh(n,r,t)}function Oa(e,t){e.j&&Fp({},function(n,r){$e(t,r,n)})}function OE(e,t,n){n=Math.min(e.l.length,n);var r=e.j?yt(e.j.Oa,e.j,e):null;e:{var o=e.l;let i=-1;for(;;){const s=["count="+n];i==-1?0<n?(i=o[0].h,s.push("ofs="+i)):i=0:s.push("ofs="+i);let a=!0;for(let l=0;l<n;l++){let c=o[l].h;const d=o[l].g;if(c-=i,0>c)i=Math.max(0,o[l].h-100),a=!1;else try{XO(d,s,"req"+c+"_")}catch{r&&r(d)}}if(a){r=s.join("&");break e}}}return e=e.l.splice(0,n),t.D=e,r}function PE(e){e.g||e.u||(e.Y=1,jp(e.Ga,e),e.A=0)}function Hp(e){return e.g||e.u||3<=e.A?!1:(e.Y++,e.u=_a(yt(e.Ga,e),jE(e,e.A)),e.A++,!0)}G.Ga=function(){if(this.u=null,NE(this),this.$&&!(this.L||this.g==null||0>=this.O)){var e=2*this.O;this.h.info("BP detection timer enabled: "+e),this.B=_a(yt(this.bb,this),e)}};G.bb=function(){this.B&&(this.B=null,this.h.info("BP detection timeout reached."),this.h.info("Buffering proxy detected and switch to long-polling!"),this.N=!1,this.L=!0,Dt(10),hu(this),NE(this))};function Gp(e){e.B!=null&&(se.clearTimeout(e.B),e.B=null)}function NE(e){e.g=new Ca(e,e.h,"rpc",e.Y),e.o===null&&(e.g.H=e.s),e.g.O=0;var t=sr(e.oa);$e(t,"RID","rpc"),$e(t,"SID",e.J),$e(t,"CI",e.N?"0":"1"),$e(t,"AID",e.U),Oa(e,t),$e(t,"TYPE","xmlhttp"),e.o&&e.s&&Wp(t,e.o,e.s),e.K&&e.g.setTimeout(e.K);var n=e.g;e=e.la,n.K=1,n.v=cu(sr(t)),n.s=null,n.U=!0,cE(n,e)}G.ab=function(){this.v!=null&&(this.v=null,hu(this),Hp(this),Dt(19))};function vc(e){e.v!=null&&(se.clearTimeout(e.v),e.v=null)}function AE(e,t){var n=null;if(e.g==t){vc(e),Gp(e),e.g=null;var r=2}else if(Jh(e.i,t))n=t.D,EE(e.i,t),r=1;else return;if(e.I=t.N,e.G!=0){if(t.i)if(r==1){n=t.s?t.s.length:0,t=Date.now()-t.F;var o=e.C;r=iu(),wt(r,new iE(r,n)),fu(e)}else PE(e);else if(o=t.o,o==3||o==0&&0<e.I||!(r==1&&iP(e,t)||r==2&&Hp(e)))switch(n&&0<n.length&&(t=e.i,t.i=t.i.concat(n)),o){case 1:ao(e,5);break;case 4:ao(e,10);break;case 3:ao(e,6);break;default:ao(e,2)}}}function jE(e,t){let n=e.Pa+Math.floor(Math.random()*e.$a);return e.j||(n*=2),n*t}function ao(e,t){if(e.h.info("Error code "+t),t==2){var n=null;e.j&&(n=null);var r=yt(e.jb,e);n||(n=new xo("//www.google.com/images/cleardot.gif"),se.location&&se.location.protocol=="http"||pc(n,"https"),cu(n)),YO(n.toString(),r)}else Dt(2);e.G=0,e.j&&e.j.va(t),RE(e),TE(e)}G.jb=function(e){e?(this.h.info("Successfully pinged google.com"),Dt(2)):(this.h.info("Failed to ping google.com"),Dt(1))};function RE(e){e.G=0,e.I=-1,e.j&&((SE(e.i).length!=0||e.l.length!=0)&&(e.i.i.length=0,Cp(e.l),e.l.length=0),e.j.ua())}function ME(e,t,n){let r=zO(n);if(r.i!="")t&&mc(r,t+"."+r.i),gc(r,r.m);else{const o=se.location;r=UO(o.protocol,t?t+"."+o.hostname:o.hostname,+o.port,n)}return e.aa&&Ip(e.aa,function(o,i){$e(r,i,o)}),t=e.D,n=e.sa,t&&n&&$e(r,t,n),$e(r,"VER",e.ma),Oa(e,r),r}function LE(e,t,n){if(t&&!e.H)throw Error("Can't create secondary domain capable XhrIo object.");return t=n&&e.Ba&&!e.qa?new Ye(new ka({ib:!0})):new Ye(e.qa),t.L=e.H,t}function DE(){}G=DE.prototype;G.xa=function(){};G.wa=function(){};G.va=function(){};G.ua=function(){};G.Oa=function(){};function yc(){if(_i&&!(10<=Number(yO)))throw Error("Environmental error: no available transport.")}yc.prototype.g=function(e,t){return new rn(e,t)};function rn(e,t){dt.call(this),this.g=new kE(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.s=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.ya&&(e?e["X-WebChannel-Client-Profile"]=t.ya:e={"X-WebChannel-Client-Profile":t.ya}),this.g.P=e,(e=t&&t.httpHeadersOverwriteParam)&&!dc(e)&&(this.g.o=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!dc(t)&&(this.g.D=t,e=this.h,e!==null&&t in e&&(e=this.h,t in e&&delete e[t])),this.j=new $i(this)}St(rn,dt);rn.prototype.m=function(){this.g.j=this.j,this.A&&(this.g.H=!0);var e=this.g,t=this.l,n=this.h||void 0;e.Wa&&(e.h.info("Origin Trials enabled."),jp(yt(e.hb,e,t))),Dt(0),e.W=t,e.aa=n||{},e.N=e.X,e.F=ME(e,null,e.W),fu(e)};rn.prototype.close=function(){qp(this.g)};rn.prototype.u=function(e){if(typeof e=="string"){var t={};t.__data__=e,Ed(this.g,t)}else this.v?(t={},t.__data__=Ap(e),Ed(this.g,t)):Ed(this.g,e)};rn.prototype.M=function(){this.g.j=null,delete this.j,qp(this.g),delete this.g,rn.Z.M.call(this)};function $E(e){Dp.call(this);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=t!==null&&e in t?t[e]:void 0),this.data=t}else this.data=e}St($E,Dp);function FE(){$p.call(this),this.status=1}St(FE,$p);function $i(e){this.g=e}St($i,DE);$i.prototype.xa=function(){wt(this.g,"a")};$i.prototype.wa=function(e){wt(this.g,new $E(e))};$i.prototype.va=function(e){wt(this.g,new FE)};$i.prototype.ua=function(){wt(this.g,"b")};yc.prototype.createWebChannel=yc.prototype.g;rn.prototype.send=rn.prototype.u;rn.prototype.open=rn.prototype.m;rn.prototype.close=rn.prototype.close;su.NO_ERROR=0;su.TIMEOUT=8;su.HTTP_ERROR=6;sE.COMPLETE="complete";aE.EventType=ba;ba.OPEN="a";ba.CLOSE="b";ba.ERROR="c";ba.MESSAGE="d";dt.prototype.listen=dt.prototype.N;Ye.prototype.listenOnce=Ye.prototype.O;Ye.prototype.getLastError=Ye.prototype.La;Ye.prototype.getLastErrorCode=Ye.prototype.Da;Ye.prototype.getStatus=Ye.prototype.ba;Ye.prototype.getResponseJson=Ye.prototype.Qa;Ye.prototype.getResponseText=Ye.prototype.ga;Ye.prototype.send=Ye.prototype.ea;var sP=function(){return new yc},aP=function(){return iu()},Sd=su,lP=sE,cP=Mo,$v={rb:0,ub:1,vb:2,Ob:3,Tb:4,Qb:5,Rb:6,Pb:7,Nb:8,Sb:9,PROXY:10,NOPROXY:11,Lb:12,Hb:13,Ib:14,Gb:15,Jb:16,Kb:17,nb:18,mb:19,ob:20},uP=ka,ol=aE,dP=Ye;const Fv="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}Vt.UNAUTHENTICATED=new Vt(null),Vt.GOOGLE_CREDENTIALS=new Vt("google-credentials-uid"),Vt.FIRST_PARTY=new Vt("first-party-uid"),Vt.MOCK_USER=new Vt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fi="9.6.7";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _o=new Xc("@firebase/firestore");function zv(){return _o.logLevel}function te(e,...t){if(_o.logLevel<=Ie.DEBUG){const n=t.map(Kp);_o.debug(`Firestore (${Fi}): ${e}`,...n)}}function bo(e,...t){if(_o.logLevel<=Ie.ERROR){const n=t.map(Kp);_o.error(`Firestore (${Fi}): ${e}`,...n)}}function Uv(e,...t){if(_o.logLevel<=Ie.WARN){const n=t.map(Kp);_o.warn(`Firestore (${Fi}): ${e}`,...n)}}function Kp(e){if(typeof e=="string")return e;try{return t=e,JSON.stringify(t)}catch{return e}/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _e(e="Unexpected state"){const t=`FIRESTORE (${Fi}) INTERNAL ASSERTION FAILED: `+e;throw bo(t),new Error(t)}function rt(e,t){e||_e()}function Le(e,t){return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class le extends cr{constructor(t,n){super(t,n),this.code=t,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(){this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hP{constructor(t,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class fP{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,n){t.enqueueRetryable(()=>n(Vt.UNAUTHENTICATED))}shutdown(){}}class pP{constructor(t){this.t=t,this.currentUser=Vt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,n){let r=this.i;const o=l=>this.i!==r?(r=this.i,n(l)):Promise.resolve();let i=new fo;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new fo,t.enqueueRetryable(()=>o(this.currentUser))};const s=()=>{const l=i;t.enqueueRetryable(async()=>{await l.promise,await o(this.currentUser)})},a=l=>{te("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.auth.addAuthTokenListener(this.o),s()};this.t.onInit(l=>a(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?a(l):(te("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new fo)}},0),s()}getToken(){const t=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==t?(te("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(rt(typeof r.accessToken=="string"),new hP(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const t=this.auth&&this.auth.getUid();return rt(t===null||typeof t=="string"),new Vt(t)}}class mP{constructor(t,n,r){this.type="FirstParty",this.user=Vt.FIRST_PARTY,this.headers=new Map,this.headers.set("X-Goog-AuthUser",n);const o=t.auth.getAuthHeaderValueForFirstParty([]);o&&this.headers.set("Authorization",o),r&&this.headers.set("X-Goog-Iam-Authorization-Token",r)}}class gP{constructor(t,n,r){this.h=t,this.l=n,this.m=r}getToken(){return Promise.resolve(new mP(this.h,this.l,this.m))}start(t,n){t.enqueueRetryable(()=>n(Vt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class vP{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class yP{constructor(t){this.g=t,this.forceRefresh=!1,this.appCheck=null,this.p=null}start(t,n){const r=i=>{i.error!=null&&te("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const s=i.token!==this.p;return this.p=i.token,te("FirebaseAppCheckTokenProvider",`Received ${s?"new":"existing"} token.`),s?n(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable(()=>r(i))};const o=i=>{te("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.appCheck.addTokenListener(this.o)};this.g.onInit(i=>o(i)),setTimeout(()=>{if(!this.appCheck){const i=this.g.getImmediate({optional:!0});i?o(i):te("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(n=>n?(rt(typeof n.token=="string"),this.p=n.token,new vP(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zE{constructor(t,n){this.previousValue=t,n&&(n.sequenceNumberHandler=r=>this.I(r),this.T=r=>n.writeSequenceNumber(r))}I(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.T&&this.T(t),t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wP(e){const t=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(n);else for(let r=0;r<e;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */zE.A=-1;class UE{static R(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/t.length)*t.length;let r="";for(;r.length<20;){const o=wP(40);for(let i=0;i<o.length;++i)r.length<20&&o[i]<n&&(r+=t.charAt(o[i]%t.length))}return r}}function Re(e,t){return e<t?-1:e>t?1:0}function bi(e,t,n){return e.length===t.length&&e.every((r,o)=>n(r,t[o]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{constructor(t,n){if(this.seconds=t,this.nanoseconds=n,n<0)throw new le($.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new le($.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(t<-62135596800)throw new le($.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new le($.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return Zt.fromMillis(Date.now())}static fromDate(t){return Zt.fromMillis(t.getTime())}static fromMillis(t){const n=Math.floor(t/1e3),r=Math.floor(1e6*(t-1e3*n));return new Zt(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?Re(this.nanoseconds,t.nanoseconds):Re(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(t){this.timestamp=t}static fromTimestamp(t){return new lt(t)}static min(){return new lt(new Zt(0,0))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vv(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function Pa(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function VE(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js{constructor(t,n,r){n===void 0?n=0:n>t.length&&_e(),r===void 0?r=t.length-n:r>t.length-n&&_e(),this.segments=t,this.offset=n,this.len=r}get length(){return this.len}isEqual(t){return Js.comparator(this,t)===0}child(t){const n=this.segments.slice(this.offset,this.limit());return t instanceof Js?t.forEach(r=>{n.push(r)}):n.push(t),this.construct(n)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==t.get(n))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==t.get(n))return!1;return!0}forEach(t){for(let n=this.offset,r=this.limit();n<r;n++)t(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,n){const r=Math.min(t.length,n.length);for(let o=0;o<r;o++){const i=t.get(o),s=n.get(o);if(i<s)return-1;if(i>s)return 1}return t.length<n.length?-1:t.length>n.length?1:0}}class He extends Js{construct(t,n,r){return new He(t,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const n=[];for(const r of t){if(r.indexOf("//")>=0)throw new le($.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(o=>o.length>0))}return new He(n)}static emptyPath(){return new He([])}}const EP=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Wt extends Js{construct(t,n,r){return new Wt(t,n,r)}static isValidIdentifier(t){return EP.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Wt.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new Wt(["__name__"])}static fromServerFormat(t){const n=[];let r="",o=0;const i=()=>{if(r.length===0)throw new le($.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let s=!1;for(;o<t.length;){const a=t[o];if(a==="\\"){if(o+1===t.length)throw new le($.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const l=t[o+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new le($.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=l,o+=2}else a==="`"?(s=!s,o++):a!=="."||s?(r+=a,o++):(i(),o++)}if(i(),s)throw new le($.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new Wt(n)}static emptyPath(){return new Wt([])}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xh{constructor(t){this.fields=t,t.sort(Wt.comparator)}covers(t){for(const n of this.fields)if(n.isPrefixOf(t))return!0;return!1}isEqual(t){return bi(this.fields,t.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar{constructor(t){this.binaryString=t}static fromBase64String(t){const n=atob(t);return new ar(n)}static fromUint8Array(t){const n=function(r){let o="";for(let i=0;i<r.length;++i)o+=String.fromCharCode(r[i]);return o}(t);return new ar(n)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return t=this.binaryString,btoa(t);var t}toUint8Array(){return function(t){const n=new Uint8Array(t.length);for(let r=0;r<t.length;r++)n[r]=t.charCodeAt(r);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return Re(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ar.EMPTY_BYTE_STRING=new ar("");const SP=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Co(e){if(rt(!!e),typeof e=="string"){let t=0;const n=SP.exec(e);if(rt(!!n),n[1]){let o=n[1];o=(o+"000000000").substr(0,9),t=Number(o)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:pt(e.seconds),nanos:pt(e.nanos)}}function pt(e){return typeof e=="number"?e:typeof e=="string"?Number(e):0}function Xs(e){return typeof e=="string"?ar.fromBase64String(e):ar.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xP(e){var t,n;return((n=(((t=e==null?void 0:e.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function wc(e){const t=Co(e.mapValue.fields.__local_write_time__.timestampValue);return new Zt(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _P{constructor(t,n,r,o,i,s,a,l){this.databaseId=t,this.appId=n,this.persistenceKey=r,this.host=o,this.ssl=i,this.forceLongPolling=s,this.autoDetectLongPolling=a,this.useFetchStreams=l}}class Ys{constructor(t,n){this.projectId=t,this.database=n||"(default)"}static empty(){return new Ys("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof Ys&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Na(e){return e==null}function Ec(e){return e===0&&1/e==-1/0}function bP(e){return typeof e=="number"&&Number.isInteger(e)&&!Ec(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(t){this.path=t}static fromPath(t){return new fe(He.fromString(t))}static fromName(t){return new fe(He.fromString(t).popFirst(5))}static empty(){return new fe(He.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&He.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,n){return He.comparator(t.path,n.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new fe(new He(t.slice()))}}function Ci(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?xP(e)?4:10:_e()}function zn(e,t){if(e===t)return!0;const n=Ci(e);if(n!==Ci(t))return!1;switch(n){case 0:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return wc(e).isEqual(wc(t));case 3:return function(r,o){if(typeof r.timestampValue=="string"&&typeof o.timestampValue=="string"&&r.timestampValue.length===o.timestampValue.length)return r.timestampValue===o.timestampValue;const i=Co(r.timestampValue),s=Co(o.timestampValue);return i.seconds===s.seconds&&i.nanos===s.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(r,o){return Xs(r.bytesValue).isEqual(Xs(o.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(r,o){return pt(r.geoPointValue.latitude)===pt(o.geoPointValue.latitude)&&pt(r.geoPointValue.longitude)===pt(o.geoPointValue.longitude)}(e,t);case 2:return function(r,o){if("integerValue"in r&&"integerValue"in o)return pt(r.integerValue)===pt(o.integerValue);if("doubleValue"in r&&"doubleValue"in o){const i=pt(r.doubleValue),s=pt(o.doubleValue);return i===s?Ec(i)===Ec(s):isNaN(i)&&isNaN(s)}return!1}(e,t);case 9:return bi(e.arrayValue.values||[],t.arrayValue.values||[],zn);case 10:return function(r,o){const i=r.mapValue.fields||{},s=o.mapValue.fields||{};if(Vv(i)!==Vv(s))return!1;for(const a in i)if(i.hasOwnProperty(a)&&(s[a]===void 0||!zn(i[a],s[a])))return!1;return!0}(e,t);default:return _e()}}function Zs(e,t){return(e.values||[]).find(n=>zn(n,t))!==void 0}function Ii(e,t){if(e===t)return 0;const n=Ci(e),r=Ci(t);if(n!==r)return Re(n,r);switch(n){case 0:return 0;case 1:return Re(e.booleanValue,t.booleanValue);case 2:return function(o,i){const s=pt(o.integerValue||o.doubleValue),a=pt(i.integerValue||i.doubleValue);return s<a?-1:s>a?1:s===a?0:isNaN(s)?isNaN(a)?0:-1:1}(e,t);case 3:return Bv(e.timestampValue,t.timestampValue);case 4:return Bv(wc(e),wc(t));case 5:return Re(e.stringValue,t.stringValue);case 6:return function(o,i){const s=Xs(o),a=Xs(i);return s.compareTo(a)}(e.bytesValue,t.bytesValue);case 7:return function(o,i){const s=o.split("/"),a=i.split("/");for(let l=0;l<s.length&&l<a.length;l++){const c=Re(s[l],a[l]);if(c!==0)return c}return Re(s.length,a.length)}(e.referenceValue,t.referenceValue);case 8:return function(o,i){const s=Re(pt(o.latitude),pt(i.latitude));return s!==0?s:Re(pt(o.longitude),pt(i.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(o,i){const s=o.values||[],a=i.values||[];for(let l=0;l<s.length&&l<a.length;++l){const c=Ii(s[l],a[l]);if(c)return c}return Re(s.length,a.length)}(e.arrayValue,t.arrayValue);case 10:return function(o,i){const s=o.fields||{},a=Object.keys(s),l=i.fields||{},c=Object.keys(l);a.sort(),c.sort();for(let d=0;d<a.length&&d<c.length;++d){const h=Re(a[d],c[d]);if(h!==0)return h;const f=Ii(s[a[d]],l[c[d]]);if(f!==0)return f}return Re(a.length,c.length)}(e.mapValue,t.mapValue);default:throw _e()}}function Bv(e,t){if(typeof e=="string"&&typeof t=="string"&&e.length===t.length)return Re(e,t);const n=Co(e),r=Co(t),o=Re(n.seconds,r.seconds);return o!==0?o:Re(n.nanos,r.nanos)}function ui(e){return Yh(e)}function Yh(e){return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(r){const o=Co(r);return`time(${o.seconds},${o.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?Xs(e.bytesValue).toBase64():"referenceValue"in e?(n=e.referenceValue,fe.fromName(n).toString()):"geoPointValue"in e?`geo(${(t=e.geoPointValue).latitude},${t.longitude})`:"arrayValue"in e?function(r){let o="[",i=!0;for(const s of r.values||[])i?i=!1:o+=",",o+=Yh(s);return o+"]"}(e.arrayValue):"mapValue"in e?function(r){const o=Object.keys(r.fields||{}).sort();let i="{",s=!0;for(const a of o)s?s=!1:i+=",",i+=`${a}:${Yh(r.fields[a])}`;return i+"}"}(e.mapValue):_e();var t,n}function Zh(e){return!!e&&"integerValue"in e}function Qp(e){return!!e&&"arrayValue"in e}function kl(e){return!!e&&"mapValue"in e}function ws(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&typeof e.timestampValue=="object")return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){const t={mapValue:{fields:{}}};return Pa(e.mapValue.fields,(n,r)=>t.mapValue.fields[n]=ws(r)),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=ws(e.arrayValue.values[n]);return t}return Object.assign({},e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jn{constructor(t){this.value=t}static empty(){return new jn({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let n=this.value;for(let r=0;r<t.length-1;++r)if(n=(n.mapValue.fields||{})[t.get(r)],!kl(n))return null;return n=(n.mapValue.fields||{})[t.lastSegment()],n||null}}set(t,n){this.getFieldsMap(t.popLast())[t.lastSegment()]=ws(n)}setAll(t){let n=Wt.emptyPath(),r={},o=[];t.forEach((s,a)=>{if(!n.isImmediateParentOf(a)){const l=this.getFieldsMap(n);this.applyChanges(l,r,o),r={},o=[],n=a.popLast()}s?r[a.lastSegment()]=ws(s):o.push(a.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,o)}delete(t){const n=this.field(t.popLast());kl(n)&&n.mapValue.fields&&delete n.mapValue.fields[t.lastSegment()]}isEqual(t){return zn(this.value,t.value)}getFieldsMap(t){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<t.length;++r){let o=n.mapValue.fields[t.get(r)];kl(o)&&o.mapValue.fields||(o={mapValue:{fields:{}}},n.mapValue.fields[t.get(r)]=o),n=o}return n.mapValue.fields}applyChanges(t,n,r){Pa(n,(o,i)=>t[o]=i);for(const o of r)delete t[o]}clone(){return new jn(ws(this.value))}}function BE(e){const t=[];return Pa(e.fields,(n,r)=>{const o=new Wt([n]);if(kl(r)){const i=BE(r.mapValue).fields;if(i.length===0)t.push(o);else for(const s of i)t.push(o.child(s))}else t.push(o)}),new Xh(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(t,n,r,o,i,s){this.key=t,this.documentType=n,this.version=r,this.readTime=o,this.data=i,this.documentState=s}static newInvalidDocument(t){return new bn(t,0,lt.min(),lt.min(),jn.empty(),0)}static newFoundDocument(t,n,r){return new bn(t,1,n,lt.min(),r,0)}static newNoDocument(t,n){return new bn(t,2,n,lt.min(),jn.empty(),0)}static newUnknownDocument(t,n){return new bn(t,3,n,lt.min(),jn.empty(),2)}convertToFoundDocument(t,n){return this.version=t,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=jn.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=jn.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof bn&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new bn(this.key,this.documentType,this.version,this.readTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CP{constructor(t,n=null,r=[],o=[],i=null,s=null,a=null){this.path=t,this.collectionGroup=n,this.orderBy=r,this.filters=o,this.limit=i,this.startAt=s,this.endAt=a,this.P=null}}function Wv(e,t=null,n=[],r=[],o=null,i=null,s=null){return new CP(e,t,n,r,o,i,s)}function Jp(e){const t=Le(e);if(t.P===null){let n=t.path.canonicalString();t.collectionGroup!==null&&(n+="|cg:"+t.collectionGroup),n+="|f:",n+=t.filters.map(r=>{return(o=r).field.canonicalString()+o.op.toString()+ui(o.value);var o}).join(","),n+="|ob:",n+=t.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),Na(t.limit)||(n+="|l:",n+=t.limit),t.startAt&&(n+="|lb:",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(r=>ui(r)).join(",")),t.endAt&&(n+="|ub:",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(r=>ui(r)).join(",")),t.P=n}return t.P}function IP(e){let t=e.path.canonicalString();return e.collectionGroup!==null&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map(n=>{return`${(r=n).field.canonicalString()} ${r.op} ${ui(r.value)}`;var r}).join(", ")}]`),Na(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map(n=>function(r){return`${r.field.canonicalString()} (${r.dir})`}(n)).join(", ")}]`),e.startAt&&(t+=", startAt: ",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(n=>ui(n)).join(",")),e.endAt&&(t+=", endAt: ",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(n=>ui(n)).join(",")),`Target(${t})`}function Xp(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let o=0;o<e.orderBy.length;o++)if(!RP(e.orderBy[o],t.orderBy[o]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let o=0;o<e.filters.length;o++)if(n=e.filters[o],r=t.filters[o],n.op!==r.op||!n.field.isEqual(r.field)||!zn(n.value,r.value))return!1;var n,r;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!Hv(e.startAt,t.startAt)&&Hv(e.endAt,t.endAt)}class Ht extends class{}{constructor(t,n,r){super(),this.field=t,this.op=n,this.value=r}static create(t,n,r){return t.isKeyField()?n==="in"||n==="not-in"?this.v(t,n,r):new kP(t,n,r):n==="array-contains"?new PP(t,r):n==="in"?new NP(t,r):n==="not-in"?new AP(t,r):n==="array-contains-any"?new jP(t,r):new Ht(t,n,r)}static v(t,n,r){return n==="in"?new TP(t,r):new OP(t,r)}matches(t){const n=t.data.field(this.field);return this.op==="!="?n!==null&&this.V(Ii(n,this.value)):n!==null&&Ci(this.value)===Ci(n)&&this.V(Ii(n,this.value))}V(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return _e()}}S(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class kP extends Ht{constructor(t,n,r){super(t,n,r),this.key=fe.fromName(r.referenceValue)}matches(t){const n=fe.comparator(t.key,this.key);return this.V(n)}}class TP extends Ht{constructor(t,n){super(t,"in",n),this.keys=WE("in",n)}matches(t){return this.keys.some(n=>n.isEqual(t.key))}}class OP extends Ht{constructor(t,n){super(t,"not-in",n),this.keys=WE("not-in",n)}matches(t){return!this.keys.some(n=>n.isEqual(t.key))}}function WE(e,t){var n;return(((n=t.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>fe.fromName(r.referenceValue))}class PP extends Ht{constructor(t,n){super(t,"array-contains",n)}matches(t){const n=t.data.field(this.field);return Qp(n)&&Zs(n.arrayValue,this.value)}}class NP extends Ht{constructor(t,n){super(t,"in",n)}matches(t){const n=t.data.field(this.field);return n!==null&&Zs(this.value.arrayValue,n)}}class AP extends Ht{constructor(t,n){super(t,"not-in",n)}matches(t){if(Zs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=t.data.field(this.field);return n!==null&&!Zs(this.value.arrayValue,n)}}class jP extends Ht{constructor(t,n){super(t,"array-contains-any",n)}matches(t){const n=t.data.field(this.field);return!(!Qp(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>Zs(this.value.arrayValue,r))}}class Sc{constructor(t,n){this.position=t,this.inclusive=n}}class Es{constructor(t,n="asc"){this.field=t,this.dir=n}}function RP(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}function qv(e,t,n){let r=0;for(let o=0;o<e.position.length;o++){const i=t[o],s=e.position[o];if(i.field.isKeyField()?r=fe.comparator(fe.fromName(s.referenceValue),n.key):r=Ii(s,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Hv(e,t){if(e===null)return t===null;if(t===null||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!zn(e.position[n],t.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pu{constructor(t,n=null,r=[],o=[],i=null,s="F",a=null,l=null){this.path=t,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=o,this.limit=i,this.limitType=s,this.startAt=a,this.endAt=l,this.D=null,this.C=null,this.startAt,this.endAt}}function MP(e,t,n,r,o,i,s,a){return new pu(e,t,n,r,o,i,s,a)}function LP(e){return new pu(e)}function DP(e){return!Na(e.limit)&&e.limitType==="F"}function $P(e){return!Na(e.limit)&&e.limitType==="L"}function FP(e){return e.explicitOrderBy.length>0?e.explicitOrderBy[0].field:null}function zP(e){for(const t of e.filters)if(t.S())return t.field;return null}function UP(e){return e.collectionGroup!==null}function ea(e){const t=Le(e);if(t.D===null){t.D=[];const n=zP(t),r=FP(t);if(n!==null&&r===null)n.isKeyField()||t.D.push(new Es(n)),t.D.push(new Es(Wt.keyField(),"asc"));else{let o=!1;for(const i of t.explicitOrderBy)t.D.push(i),i.field.isKeyField()&&(o=!0);if(!o){const i=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";t.D.push(new Es(Wt.keyField(),i))}}}return t.D}function xc(e){const t=Le(e);if(!t.C)if(t.limitType==="F")t.C=Wv(t.path,t.collectionGroup,ea(t),t.filters,t.limit,t.startAt,t.endAt);else{const n=[];for(const i of ea(t)){const s=i.dir==="desc"?"asc":"desc";n.push(new Es(i.field,s))}const r=t.endAt?new Sc(t.endAt.position,!t.endAt.inclusive):null,o=t.startAt?new Sc(t.startAt.position,!t.startAt.inclusive):null;t.C=Wv(t.path,t.collectionGroup,n,t.filters,t.limit,r,o)}return t.C}function VP(e,t,n){return new pu(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function qE(e,t){return Xp(xc(e),xc(t))&&e.limitType===t.limitType}function HE(e){return`${Jp(xc(e))}|lt:${e.limitType}`}function Gv(e){return`Query(target=${IP(xc(e))}; limitType=${e.limitType})`}function GE(e,t){return t.isFoundDocument()&&function(n,r){const o=r.key.path;return n.collectionGroup!==null?r.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(o):fe.isDocumentKey(n.path)?n.path.isEqual(o):n.path.isImmediateParentOf(o)}(e,t)&&function(n,r){for(const o of n.explicitOrderBy)if(!o.field.isKeyField()&&r.data.field(o.field)===null)return!1;return!0}(e,t)&&function(n,r){for(const o of n.filters)if(!o.matches(r))return!1;return!0}(e,t)&&function(n,r){return!(n.startAt&&!function(o,i,s){const a=qv(o,i,s);return o.inclusive?a<=0:a<0}(n.startAt,ea(n),r)||n.endAt&&!function(o,i,s){const a=qv(o,i,s);return o.inclusive?a>=0:a>0}(n.endAt,ea(n),r))}(e,t)}function BP(e){return(t,n)=>{let r=!1;for(const o of ea(e)){const i=WP(o,t,n);if(i!==0)return i;r=r||o.field.isKeyField()}return 0}}function WP(e,t,n){const r=e.field.isKeyField()?fe.comparator(t.key,n.key):function(o,i,s){const a=i.data.field(o),l=s.data.field(o);return a!==null&&l!==null?Ii(a,l):_e()}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return _e()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function KE(e,t){if(e.N){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ec(t)?"-0":t}}function QE(e){return{integerValue:""+e}}function qP(e,t){return bP(t)?QE(t):KE(e,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mu{constructor(){this._=void 0}}function HP(e,t,n){return e instanceof _c?function(r,o){const i={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return o&&(i.fields.__previous_value__=o),{mapValue:i}}(n,t):e instanceof ta?XE(e,t):e instanceof na?YE(e,t):function(r,o){const i=JE(r,o),s=Kv(i)+Kv(r.k);return Zh(i)&&Zh(r.k)?QE(s):KE(r.O,s)}(e,t)}function GP(e,t,n){return e instanceof ta?XE(e,t):e instanceof na?YE(e,t):n}function JE(e,t){return e instanceof bc?Zh(n=t)||function(r){return!!r&&"doubleValue"in r}(n)?t:{integerValue:0}:null;var n}class _c extends mu{}class ta extends mu{constructor(t){super(),this.elements=t}}function XE(e,t){const n=ZE(t);for(const r of e.elements)n.some(o=>zn(o,r))||n.push(r);return{arrayValue:{values:n}}}class na extends mu{constructor(t){super(),this.elements=t}}function YE(e,t){let n=ZE(t);for(const r of e.elements)n=n.filter(o=>!zn(o,r));return{arrayValue:{values:n}}}class bc extends mu{constructor(t,n){super(),this.O=t,this.k=n}}function Kv(e){return pt(e.integerValue||e.doubleValue)}function ZE(e){return Qp(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}function KP(e,t){return e.field.isEqual(t.field)&&function(n,r){return n instanceof ta&&r instanceof ta||n instanceof na&&r instanceof na?bi(n.elements,r.elements,zn):n instanceof bc&&r instanceof bc?zn(n.k,r.k):n instanceof _c&&r instanceof _c}(e.transform,t.transform)}class QP{constructor(t,n){this.version=t,this.transformResults=n}}class di{constructor(t,n){this.updateTime=t,this.exists=n}static none(){return new di}static exists(t){return new di(void 0,t)}static updateTime(t){return new di(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function Tl(e,t){return e.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(e.updateTime):e.exists===void 0||e.exists===t.isFoundDocument()}class gu{}function JP(e,t,n){e instanceof vu?function(r,o,i){const s=r.value.clone(),a=Xv(r.fieldTransforms,o,i.transformResults);s.setAll(a),o.convertToFoundDocument(i.version,s).setHasCommittedMutations()}(e,t,n):e instanceof Aa?function(r,o,i){if(!Tl(r.precondition,o))return void o.convertToUnknownDocument(i.version);const s=Xv(r.fieldTransforms,o,i.transformResults),a=o.data;a.setAll(eS(r)),a.setAll(s),o.convertToFoundDocument(i.version,a).setHasCommittedMutations()}(e,t,n):function(r,o,i){o.convertToNoDocument(i.version).setHasCommittedMutations()}(0,t,n)}function ef(e,t,n){e instanceof vu?function(r,o,i){if(!Tl(r.precondition,o))return;const s=r.value.clone(),a=Yv(r.fieldTransforms,i,o);s.setAll(a),o.convertToFoundDocument(Jv(o),s).setHasLocalMutations()}(e,t,n):e instanceof Aa?function(r,o,i){if(!Tl(r.precondition,o))return;const s=Yv(r.fieldTransforms,i,o),a=o.data;a.setAll(eS(r)),a.setAll(s),o.convertToFoundDocument(Jv(o),a).setHasLocalMutations()}(e,t,n):function(r,o){Tl(r.precondition,o)&&o.convertToNoDocument(lt.min())}(e,t)}function XP(e,t){let n=null;for(const r of e.fieldTransforms){const o=t.data.field(r.field),i=JE(r.transform,o||null);i!=null&&(n==null&&(n=jn.empty()),n.set(r.field,i))}return n||null}function Qv(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(n,r){return n===void 0&&r===void 0||!(!n||!r)&&bi(n,r,(o,i)=>KP(o,i))}(e.fieldTransforms,t.fieldTransforms)&&(e.type===0?e.value.isEqual(t.value):e.type!==1||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}function Jv(e){return e.isFoundDocument()?e.version:lt.min()}class vu extends gu{constructor(t,n,r,o=[]){super(),this.key=t,this.value=n,this.precondition=r,this.fieldTransforms=o,this.type=0}}class Aa extends gu{constructor(t,n,r,o,i=[]){super(),this.key=t,this.data=n,this.fieldMask=r,this.precondition=o,this.fieldTransforms=i,this.type=1}}function eS(e){const t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}}),t}function Xv(e,t,n){const r=new Map;rt(e.length===n.length);for(let o=0;o<n.length;o++){const i=e[o],s=i.transform,a=t.data.field(i.field);r.set(i.field,GP(s,a,n[o]))}return r}function Yv(e,t,n){const r=new Map;for(const o of e){const i=o.transform,s=n.data.field(o.field);r.set(o.field,HP(i,s,t))}return r}class YP extends gu{constructor(t,n){super(),this.key=t,this.precondition=n,this.type=2,this.fieldTransforms=[]}}class ZP extends gu{constructor(t,n){super(),this.key=t,this.precondition=n,this.type=3,this.fieldTransforms=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Je,Ee;function eN(e){switch(e){default:return _e();case $.CANCELLED:case $.UNKNOWN:case $.DEADLINE_EXCEEDED:case $.RESOURCE_EXHAUSTED:case $.INTERNAL:case $.UNAVAILABLE:case $.UNAUTHENTICATED:return!1;case $.INVALID_ARGUMENT:case $.NOT_FOUND:case $.ALREADY_EXISTS:case $.PERMISSION_DENIED:case $.FAILED_PRECONDITION:case $.ABORTED:case $.OUT_OF_RANGE:case $.UNIMPLEMENTED:case $.DATA_LOSS:return!0}}function tN(e){if(e===void 0)return bo("GRPC error has no .code"),$.UNKNOWN;switch(e){case Je.OK:return $.OK;case Je.CANCELLED:return $.CANCELLED;case Je.UNKNOWN:return $.UNKNOWN;case Je.DEADLINE_EXCEEDED:return $.DEADLINE_EXCEEDED;case Je.RESOURCE_EXHAUSTED:return $.RESOURCE_EXHAUSTED;case Je.INTERNAL:return $.INTERNAL;case Je.UNAVAILABLE:return $.UNAVAILABLE;case Je.UNAUTHENTICATED:return $.UNAUTHENTICATED;case Je.INVALID_ARGUMENT:return $.INVALID_ARGUMENT;case Je.NOT_FOUND:return $.NOT_FOUND;case Je.ALREADY_EXISTS:return $.ALREADY_EXISTS;case Je.PERMISSION_DENIED:return $.PERMISSION_DENIED;case Je.FAILED_PRECONDITION:return $.FAILED_PRECONDITION;case Je.ABORTED:return $.ABORTED;case Je.OUT_OF_RANGE:return $.OUT_OF_RANGE;case Je.UNIMPLEMENTED:return $.UNIMPLEMENTED;case Je.DATA_LOSS:return $.DATA_LOSS;default:return _e()}}(Ee=Je||(Je={}))[Ee.OK=0]="OK",Ee[Ee.CANCELLED=1]="CANCELLED",Ee[Ee.UNKNOWN=2]="UNKNOWN",Ee[Ee.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Ee[Ee.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Ee[Ee.NOT_FOUND=5]="NOT_FOUND",Ee[Ee.ALREADY_EXISTS=6]="ALREADY_EXISTS",Ee[Ee.PERMISSION_DENIED=7]="PERMISSION_DENIED",Ee[Ee.UNAUTHENTICATED=16]="UNAUTHENTICATED",Ee[Ee.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Ee[Ee.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Ee[Ee.ABORTED=10]="ABORTED",Ee[Ee.OUT_OF_RANGE=11]="OUT_OF_RANGE",Ee[Ee.UNIMPLEMENTED=12]="UNIMPLEMENTED",Ee[Ee.INTERNAL=13]="INTERNAL",Ee[Ee.UNAVAILABLE=14]="UNAVAILABLE",Ee[Ee.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class on{constructor(t,n){this.comparator=t,this.root=n||mt.EMPTY}insert(t,n){return new on(this.comparator,this.root.insert(t,n,this.comparator).copy(null,null,mt.BLACK,null,null))}remove(t){return new on(this.comparator,this.root.remove(t,this.comparator).copy(null,null,mt.BLACK,null,null))}get(t){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(t,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(t){let n=0,r=this.root;for(;!r.isEmpty();){const o=this.comparator(t,r.key);if(o===0)return n+r.left.size;o<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((n,r)=>(t(n,r),!1))}toString(){const t=[];return this.inorderTraversal((n,r)=>(t.push(`${n}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new il(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new il(this.root,t,this.comparator,!1)}getReverseIterator(){return new il(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new il(this.root,t,this.comparator,!0)}}class il{constructor(t,n,r,o){this.isReverse=o,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=n?r(t.key,n):1,o&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const n={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class mt{constructor(t,n,r,o,i){this.key=t,this.value=n,this.color=r??mt.RED,this.left=o??mt.EMPTY,this.right=i??mt.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,n,r,o,i){return new mt(t??this.key,n??this.value,r??this.color,o??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,n,r){let o=this;const i=r(t,o.key);return o=i<0?o.copy(null,null,null,o.left.insert(t,n,r),null):i===0?o.copy(null,n,null,null,null):o.copy(null,null,null,null,o.right.insert(t,n,r)),o.fixUp()}removeMin(){if(this.left.isEmpty())return mt.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,n){let r,o=this;if(n(t,o.key)<0)o.left.isEmpty()||o.left.isRed()||o.left.left.isRed()||(o=o.moveRedLeft()),o=o.copy(null,null,null,o.left.remove(t,n),null);else{if(o.left.isRed()&&(o=o.rotateRight()),o.right.isEmpty()||o.right.isRed()||o.right.left.isRed()||(o=o.moveRedRight()),n(t,o.key)===0){if(o.right.isEmpty())return mt.EMPTY;r=o.right.min(),o=o.copy(r.key,r.value,null,null,o.right.removeMin())}o=o.copy(null,null,null,null,o.right.remove(t,n))}return o.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,mt.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,mt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,n)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw _e();const t=this.left.check();if(t!==this.right.check())throw _e();return t+(this.isRed()?0:1)}}mt.EMPTY=null,mt.RED=!0,mt.BLACK=!1;mt.EMPTY=new class{constructor(){this.size=0}get key(){throw _e()}get value(){throw _e()}get color(){throw _e()}get left(){throw _e()}get right(){throw _e()}copy(e,t,n,r,o){return this}insert(e,t,n){return new mt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(t){this.comparator=t,this.data=new on(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((n,r)=>(t(n),!1))}forEachInRange(t,n){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const o=r.getNext();if(this.comparator(o.key,t[1])>=0)return;n(o.key)}}forEachWhile(t,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const n=this.data.getIteratorFrom(t);return n.hasNext()?n.getNext().key:null}getIterator(){return new Zv(this.data.getIterator())}getIteratorFrom(t){return new Zv(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let n=this;return n.size<t.size&&(n=t,t=this),t.forEach(r=>{n=n.add(r)}),n}isEqual(t){if(!(t instanceof en)||this.size!==t.size)return!1;const n=this.data.getIterator(),r=t.data.getIterator();for(;n.hasNext();){const o=n.getNext().key,i=r.getNext().key;if(this.comparator(o,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(n=>{t.push(n)}),t}toString(){const t=[];return this.forEach(n=>t.push(n)),"SortedSet("+t.toString()+")"}copy(t){const n=new en(this.comparator);return n.data=t,n}}class Zv{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nN=new on(fe.comparator);function ey(){return nN}const rN=new on(fe.comparator);function ty(){return rN}const oN=new on(fe.comparator),iN=new en(fe.comparator);function Io(...e){let t=iN;for(const n of e)t=t.add(n);return t}const sN=new en(Re);function aN(){return sN}class lN{constructor(t,n){this.databaseId=t,this.N=n}}function tf(e,t){return e.N?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function cN(e,t){return e.N?t.toBase64():t.toUint8Array()}function uN(e,t){return tf(e,t.toTimestamp())}function hi(e){return rt(!!e),lt.fromTimestamp(function(t){const n=Co(t);return new Zt(n.seconds,n.nanos)}(e))}function tS(e,t){return function(n){return new He(["projects",n.projectId,"databases",n.database])}(e).child("documents").child(t).canonicalString()}function dN(e){const t=He.fromString(e);return rt(SN(t)),t}function nf(e,t){return tS(e.databaseId,t.path)}function hN(e){const t=dN(e);return t.length===4?He.emptyPath():pN(t)}function fN(e){return new He(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function pN(e){return rt(e.length>4&&e.get(4)==="documents"),e.popFirst(5)}function ny(e,t,n){return{name:nf(e,t),fields:n.value.mapValue.fields}}function mN(e,t){let n;if(t instanceof vu)n={update:ny(e,t.key,t.value)};else if(t instanceof YP)n={delete:nf(e,t.key)};else if(t instanceof Aa)n={update:ny(e,t.key,t.data),updateMask:EN(t.fieldMask)};else{if(!(t instanceof ZP))return _e();n={verify:nf(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map(r=>function(o,i){const s=i.transform;if(s instanceof _c)return{fieldPath:i.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(s instanceof ta)return{fieldPath:i.field.canonicalString(),appendMissingElements:{values:s.elements}};if(s instanceof na)return{fieldPath:i.field.canonicalString(),removeAllFromArray:{values:s.elements}};if(s instanceof bc)return{fieldPath:i.field.canonicalString(),increment:s.k};throw _e()}(0,r))),t.precondition.isNone||(n.currentDocument=function(r,o){return o.updateTime!==void 0?{updateTime:uN(r,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:_e()}(e,t.precondition)),n}function gN(e,t){return e&&e.length>0?(rt(t!==void 0),e.map(n=>function(r,o){let i=r.updateTime?hi(r.updateTime):hi(o);return i.isEqual(lt.min())&&(i=hi(o)),new QP(i,r.transformResults||[])}(n,t))):[]}function vN(e){let t=hN(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let o=null;if(r>0){rt(r===1);const d=n.from[0];d.allDescendants?o=d.collectionId:t=t.child(d.collectionId)}let i=[];n.where&&(i=nS(n.where));let s=[];n.orderBy&&(s=n.orderBy.map(d=>function(h){return new Es(ei(h.field),function(f){switch(f){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(h.direction))}(d)));let a=null;n.limit&&(a=function(d){let h;return h=typeof d=="object"?d.value:d,Na(h)?null:h}(n.limit));let l=null;n.startAt&&(l=function(d){const h=!!d.before,f=d.values||[];return new Sc(f,h)}(n.startAt));let c=null;return n.endAt&&(c=function(d){const h=!d.before,f=d.values||[];return new Sc(f,h)}(n.endAt)),MP(t,o,s,i,a,"F",l,c)}function nS(e){return e?e.unaryFilter!==void 0?[wN(e)]:e.fieldFilter!==void 0?[yN(e)]:e.compositeFilter!==void 0?e.compositeFilter.filters.map(t=>nS(t)).reduce((t,n)=>t.concat(n)):_e():[]}function ei(e){return Wt.fromServerFormat(e.fieldPath)}function yN(e){return Ht.create(ei(e.fieldFilter.field),function(t){switch(t){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return _e()}}(e.fieldFilter.op),e.fieldFilter.value)}function wN(e){switch(e.unaryFilter.op){case"IS_NAN":const t=ei(e.unaryFilter.field);return Ht.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=ei(e.unaryFilter.field);return Ht.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=ei(e.unaryFilter.field);return Ht.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ei(e.unaryFilter.field);return Ht.create(o,"!=",{nullValue:"NULL_VALUE"});default:return _e()}}function EN(e){const t=[];return e.fields.forEach(n=>t.push(n.canonicalString())),{fieldPaths:t}}function SN(e){return e.length>=4&&e.get(0)==="projects"&&e.get(2)==="databases"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xN="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class _N{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(t){return this.next(void 0,t)}next(t,n){return this.callbackAttached&&_e(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(t,this.result):new U((r,o)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(r,o)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,o)}})}toPromise(){return new Promise((t,n)=>{this.next(t,n)})}wrapUserFunction(t){try{const n=t();return n instanceof U?n:U.resolve(n)}catch(n){return U.reject(n)}}wrapSuccess(t,n){return t?this.wrapUserFunction(()=>t(n)):U.resolve(n)}wrapFailure(t,n){return t?this.wrapUserFunction(()=>t(n)):U.reject(n)}static resolve(t){return new U((n,r)=>{n(t)})}static reject(t){return new U((n,r)=>{r(t)})}static waitFor(t){return new U((n,r)=>{let o=0,i=0,s=!1;t.forEach(a=>{++o,a.next(()=>{++i,s&&i===o&&n()},l=>r(l))}),s=!0,i===o&&n()})}static or(t){let n=U.resolve(!1);for(const r of t)n=n.next(o=>o?U.resolve(o):r());return n}static forEach(t,n){const r=[];return t.forEach((o,i)=>{r.push(n.call(this,o,i))}),this.waitFor(r)}}function yu(e){return e.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bN{constructor(t,n,r,o){this.batchId=t,this.localWriteTime=n,this.baseMutations=r,this.mutations=o}applyToRemoteDocument(t,n){const r=n.mutationResults;for(let o=0;o<this.mutations.length;o++){const i=this.mutations[o];i.key.isEqual(t.key)&&JP(i,t,r[o])}}applyToLocalView(t){for(const n of this.baseMutations)n.key.isEqual(t.key)&&ef(n,t,this.localWriteTime);for(const n of this.mutations)n.key.isEqual(t.key)&&ef(n,t,this.localWriteTime)}applyToLocalDocumentSet(t){this.mutations.forEach(n=>{const r=t.get(n.key),o=r;this.applyToLocalView(o),r.isValidDocument()||o.convertToNoDocument(lt.min())})}keys(){return this.mutations.reduce((t,n)=>t.add(n.key),Io())}isEqual(t){return this.batchId===t.batchId&&bi(this.mutations,t.mutations,(n,r)=>Qv(n,r))&&bi(this.baseMutations,t.baseMutations,(n,r)=>Qv(n,r))}}class Yp{constructor(t,n,r,o){this.batch=t,this.commitVersion=n,this.mutationResults=r,this.docVersions=o}static from(t,n,r){rt(t.mutations.length===r.length);let o=oN;const i=t.mutations;for(let s=0;s<i.length;s++)o=o.insert(i[s].key,r[s].version);return new Yp(t,n,r,o)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CN{constructor(t,n){this.largestBatchId=t,this.mutation=n}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IN{constructor(t){this.Ht=t}}function kN(e){const t=vN({parent:e.parent,structuredQuery:e.structuredQuery});return e.limitType==="LAST"?VP(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TN{constructor(){this.xe=new ON}addToCollectionParentIndex(t,n){return this.xe.add(n),U.resolve()}getCollectionParents(t,n){return U.resolve(this.xe.getEntries(n))}addFieldIndex(t,n){return U.resolve()}deleteFieldIndex(t,n){return U.resolve()}getDocumentsMatchingTarget(t,n,r){return U.resolve(Io())}getFieldIndex(t,n){return U.resolve(null)}getFieldIndexes(t,n){return U.resolve([])}getNextCollectionGroupToUpdate(t){return U.resolve(null)}updateCollectionGroup(t,n,r){return U.resolve()}updateIndexEntries(t,n){return U.resolve()}}class ON{constructor(){this.index={}}add(t){const n=t.lastSegment(),r=t.popLast(),o=this.index[n]||new en(He.comparator),i=!o.has(r);return this.index[n]=o.add(r),i}has(t){const n=t.lastSegment(),r=t.popLast(),o=this.index[n];return o&&o.has(r)}getEntries(t){return(this.index[t]||new en(He.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(t){this.ze=t}next(){return this.ze+=2,this.ze}static He(){return new ki(0)}static Je(){return new ki(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rS(e){if(e.code!==$.FAILED_PRECONDITION||e.message!==xN)throw e;te("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ja{constructor(t,n){this.mapKeyFn=t,this.equalsFn=n,this.inner={}}get(t){const n=this.mapKeyFn(t),r=this.inner[n];if(r!==void 0){for(const[o,i]of r)if(this.equalsFn(o,t))return i}}has(t){return this.get(t)!==void 0}set(t,n){const r=this.mapKeyFn(t),o=this.inner[r];if(o!==void 0){for(let i=0;i<o.length;i++)if(this.equalsFn(o[i][0],t))return void(o[i]=[t,n]);o.push([t,n])}else this.inner[r]=[[t,n]]}delete(t){const n=this.mapKeyFn(t),r=this.inner[n];if(r===void 0)return!1;for(let o=0;o<r.length;o++)if(this.equalsFn(r[o][0],t))return r.length===1?delete this.inner[n]:r.splice(o,1),!0;return!1}forEach(t){Pa(this.inner,(n,r)=>{for(const[o,i]of r)t(o,i)})}isEmpty(){return VE(this.inner)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PN{constructor(){this.changes=new ja(t=>t.toString(),(t,n)=>t.isEqual(n)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,n){this.assertNotApplied(),this.changes.set(t,bn.newInvalidDocument(t).setReadTime(n))}getEntry(t,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?U.resolve(r):this.getFromCache(t,n)}getEntries(t,n){return this.getAllFromCache(t,n)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NN{constructor(t,n,r){this.qn=t,this.gs=n,this.indexManager=r}ys(t,n){return this.gs.getAllMutationBatchesAffectingDocumentKey(t,n).next(r=>this.ps(t,n,r))}ps(t,n,r){return this.qn.getEntry(t,n).next(o=>{for(const i of r)i.applyToLocalView(o);return o})}Is(t,n){t.forEach((r,o)=>{for(const i of n)i.applyToLocalView(o)})}Es(t,n){return this.qn.getEntries(t,n).next(r=>this.Ts(t,r).next(()=>r))}Ts(t,n){return this.gs.getAllMutationBatchesAffectingDocumentKeys(t,n).next(r=>this.Is(n,r))}As(t,n,r){return function(o){return fe.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.Rs(t,n.path):UP(n)?this.Ps(t,n,r):this.bs(t,n,r)}Rs(t,n){return this.ys(t,new fe(n)).next(r=>{let o=ty();return r.isFoundDocument()&&(o=o.insert(r.key,r)),o})}Ps(t,n,r){const o=n.collectionGroup;let i=ty();return this.indexManager.getCollectionParents(t,o).next(s=>U.forEach(s,a=>{const l=function(c,d){return new pu(d,null,c.explicitOrderBy.slice(),c.filters.slice(),c.limit,c.limitType,c.startAt,c.endAt)}(n,a.child(o));return this.bs(t,l,r).next(c=>{c.forEach((d,h)=>{i=i.insert(d,h)})})}).next(()=>i))}bs(t,n,r){let o;return this.qn.getAll(t,n.path,r).next(i=>(o=i,this.gs.getAllMutationBatchesAffectingQuery(t,n))).next(i=>{for(const s of i)for(const a of s.mutations){const l=a.key;let c=o.get(l);c==null&&(c=bn.newInvalidDocument(l),o=o.insert(l,c)),ef(a,c,s.localWriteTime),c.isFoundDocument()||(o=o.remove(l))}}).next(()=>(o.forEach((i,s)=>{GE(n,s)||(o=o.remove(i))}),o))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zp{constructor(t,n,r,o){this.targetId=t,this.fromCache=n,this.vs=r,this.Vs=o}static Ss(t,n){let r=Io(),o=Io();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:o=o.add(i.doc.key)}return new Zp(t,n.fromCache,r,o)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AN{Ds(t){this.Cs=t}As(t,n,r,o){return function(i){return i.filters.length===0&&i.limit===null&&i.startAt==null&&i.endAt==null&&(i.explicitOrderBy.length===0||i.explicitOrderBy.length===1&&i.explicitOrderBy[0].field.isKeyField())}(n)||r.isEqual(lt.min())?this.Ns(t,n):this.Cs.Es(t,o).next(i=>{const s=this.xs(n,i);return(DP(n)||$P(n))&&this.ks(n.limitType,s,o,r)?this.Ns(t,n):(zv()<=Ie.DEBUG&&te("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),Gv(n)),this.Cs.As(t,n,r).next(a=>(s.forEach(l=>{a=a.insert(l.key,l)}),a)))})}xs(t,n){let r=new en(BP(t));return n.forEach((o,i)=>{GE(t,i)&&(r=r.add(i))}),r}ks(t,n,r,o){if(r.size!==n.size)return!0;const i=t==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(o)>0)}Ns(t,n){return zv()<=Ie.DEBUG&&te("QueryEngine","Using full collection scan to execute query:",Gv(n)),this.Cs.As(t,n,lt.min())}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jN{constructor(t,n,r,o){this.persistence=t,this.Os=n,this.O=o,this.Ms=new on(Re),this.$s=new ja(i=>Jp(i),Xp),this.Fs=lt.min(),this.Bs=t.getRemoteDocumentCache(),this.Un=t.getTargetCache(),this.Kn=t.getBundleCache(),this.Ls(r)}Ls(t){this.indexManager=this.persistence.getIndexManager(t),this.gs=this.persistence.getMutationQueue(t,this.indexManager),this.Us=new NN(this.Bs,this.gs,this.indexManager),this.Bs.setIndexManager(this.indexManager),this.Os.Ds(this.Us)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>t.collect(n,this.Ms))}}function RN(e,t,n,r){return new jN(e,t,n,r)}async function oS(e,t){const n=Le(e);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let o;return n.gs.getAllMutationBatches(r).next(i=>(o=i,n.Ls(t),n.gs.getAllMutationBatches(r))).next(i=>{const s=[],a=[];let l=Io();for(const c of o){s.push(c.batchId);for(const d of c.mutations)l=l.add(d.key)}for(const c of i){a.push(c.batchId);for(const d of c.mutations)l=l.add(d.key)}return n.Us.Es(r,l).next(c=>({qs:c,removedBatchIds:s,addedBatchIds:a}))})})}function MN(e,t){const n=Le(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const o=t.batch.keys(),i=n.Bs.newChangeBuffer({trackRemovals:!0});return function(s,a,l,c){const d=l.batch,h=d.keys();let f=U.resolve();return h.forEach(g=>{f=f.next(()=>c.getEntry(a,g)).next(y=>{const w=l.docVersions.get(g);rt(w!==null),y.version.compareTo(w)<0&&(d.applyToRemoteDocument(y,l),y.isValidDocument()&&(y.setReadTime(l.commitVersion),c.addEntry(y)))})}),f.next(()=>s.gs.removeMutationBatch(a,d))}(n,r,t,i).next(()=>i.apply(r)).next(()=>n.gs.performConsistencyCheck(r)).next(()=>n.Us.Es(r,o))})}function LN(e){const t=Le(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",n=>t.Un.getLastRemoteSnapshotVersion(n))}function DN(e,t){const n=Le(e);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(t===void 0&&(t=-1),n.gs.getNextMutationBatchAfterBatchId(r,t)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $N{constructor(t){this.O=t,this.Ws=new Map,this.zs=new Map}getBundleMetadata(t,n){return U.resolve(this.Ws.get(n))}saveBundleMetadata(t,n){var r;return this.Ws.set(n.id,{id:(r=n).id,version:r.version,createTime:hi(r.createTime)}),U.resolve()}getNamedQuery(t,n){return U.resolve(this.zs.get(n))}saveNamedQuery(t,n){return this.zs.set(n.name,function(r){return{name:r.name,query:kN(r.bundledQuery),readTime:hi(r.readTime)}}(n)),U.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FN{constructor(){this.overlays=new on(fe.comparator),this.Hs=new Map}getOverlay(t,n){return U.resolve(this.overlays.get(n))}saveOverlays(t,n,r){return r.forEach(o=>{this.Yt(t,n,o)}),U.resolve()}removeOverlaysForBatchId(t,n,r){const o=this.Hs.get(r);return o!==void 0&&(o.forEach(i=>this.overlays=this.overlays.remove(i)),this.Hs.delete(r)),U.resolve()}getOverlaysForCollection(t,n,r){const o=new Map,i=n.length+1,s=new fe(n.child("")),a=this.overlays.getIteratorFrom(s);for(;a.hasNext();){const l=a.getNext().value,c=l.getKey();if(!n.isPrefixOf(c.path))break;c.path.length===i&&l.largestBatchId>r&&o.set(l.getKey(),l)}return U.resolve(o)}getOverlaysForCollectionGroup(t,n,r,o){let i=new on((c,d)=>c-d);const s=this.overlays.getIterator();for(;s.hasNext();){const c=s.getNext().value;if(c.getKey().getCollectionGroup()===n&&c.largestBatchId>r){let d=i.get(c.largestBatchId);d===null&&(d=new Map,i=i.insert(c.largestBatchId,d)),d.set(c.getKey(),c)}}const a=new Map,l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((c,d)=>a.set(d,c)),!(a.size>=o)););return U.resolve(a)}Yt(t,n,r){if(r===null)return;const o=this.overlays.get(r.key);o!==null&&this.Hs.get(o.largestBatchId).delete(r.key),this.overlays=this.overlays.insert(r.key,new CN(n,r));let i=this.Hs.get(n);i===void 0&&(i=new Set,this.Hs.set(n,i)),i.add(r.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{constructor(){this.Js=new en(st.Ys),this.Xs=new en(st.Zs)}isEmpty(){return this.Js.isEmpty()}addReference(t,n){const r=new st(t,n);this.Js=this.Js.add(r),this.Xs=this.Xs.add(r)}ti(t,n){t.forEach(r=>this.addReference(r,n))}removeReference(t,n){this.ei(new st(t,n))}ni(t,n){t.forEach(r=>this.removeReference(r,n))}si(t){const n=new fe(new He([])),r=new st(n,t),o=new st(n,t+1),i=[];return this.Xs.forEachInRange([r,o],s=>{this.ei(s),i.push(s.key)}),i}ii(){this.Js.forEach(t=>this.ei(t))}ei(t){this.Js=this.Js.delete(t),this.Xs=this.Xs.delete(t)}ri(t){const n=new fe(new He([])),r=new st(n,t),o=new st(n,t+1);let i=Io();return this.Xs.forEachInRange([r,o],s=>{i=i.add(s.key)}),i}containsKey(t){const n=new st(t,0),r=this.Js.firstAfterOrEqual(n);return r!==null&&t.isEqual(r.key)}}class st{constructor(t,n){this.key=t,this.oi=n}static Ys(t,n){return fe.comparator(t.key,n.key)||Re(t.oi,n.oi)}static Zs(t,n){return Re(t.oi,n.oi)||fe.comparator(t.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zN{constructor(t,n){this.indexManager=t,this.referenceDelegate=n,this.gs=[],this.ci=1,this.ui=new en(st.Ys)}checkEmpty(t){return U.resolve(this.gs.length===0)}addMutationBatch(t,n,r,o){const i=this.ci;this.ci++,this.gs.length>0&&this.gs[this.gs.length-1];const s=new bN(i,n,r,o);this.gs.push(s);for(const a of o)this.ui=this.ui.add(new st(a.key,i)),this.indexManager.addToCollectionParentIndex(t,a.key.path.popLast());return U.resolve(s)}lookupMutationBatch(t,n){return U.resolve(this.ai(n))}getNextMutationBatchAfterBatchId(t,n){const r=n+1,o=this.hi(r),i=o<0?0:o;return U.resolve(this.gs.length>i?this.gs[i]:null)}getHighestUnacknowledgedBatchId(){return U.resolve(this.gs.length===0?-1:this.ci-1)}getAllMutationBatches(t){return U.resolve(this.gs.slice())}getAllMutationBatchesAffectingDocumentKey(t,n){const r=new st(n,0),o=new st(n,Number.POSITIVE_INFINITY),i=[];return this.ui.forEachInRange([r,o],s=>{const a=this.ai(s.oi);i.push(a)}),U.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,n){let r=new en(Re);return n.forEach(o=>{const i=new st(o,0),s=new st(o,Number.POSITIVE_INFINITY);this.ui.forEachInRange([i,s],a=>{r=r.add(a.oi)})}),U.resolve(this.li(r))}getAllMutationBatchesAffectingQuery(t,n){const r=n.path,o=r.length+1;let i=r;fe.isDocumentKey(i)||(i=i.child(""));const s=new st(new fe(i),0);let a=new en(Re);return this.ui.forEachWhile(l=>{const c=l.key.path;return!!r.isPrefixOf(c)&&(c.length===o&&(a=a.add(l.oi)),!0)},s),U.resolve(this.li(a))}li(t){const n=[];return t.forEach(r=>{const o=this.ai(r);o!==null&&n.push(o)}),n}removeMutationBatch(t,n){rt(this.fi(n.batchId,"removed")===0),this.gs.shift();let r=this.ui;return U.forEach(n.mutations,o=>{const i=new st(o.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,o.key)}).next(()=>{this.ui=r})}Qe(t){}containsKey(t,n){const r=new st(n,0),o=this.ui.firstAfterOrEqual(r);return U.resolve(n.isEqual(o&&o.key))}performConsistencyCheck(t){return this.gs.length,U.resolve()}fi(t,n){return this.hi(t)}hi(t){return this.gs.length===0?0:t-this.gs[0].batchId}ai(t){const n=this.hi(t);return n<0||n>=this.gs.length?null:this.gs[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UN{constructor(t){this.di=t,this.docs=new on(fe.comparator),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,n){const r=n.key,o=this.docs.get(r),i=o?o.size:0,s=this.di(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:s}),this.size+=s-i,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const n=this.docs.get(t);n&&(this.docs=this.docs.remove(t),this.size-=n.size)}getEntry(t,n){const r=this.docs.get(n);return U.resolve(r?r.document.mutableCopy():bn.newInvalidDocument(n))}getEntries(t,n){let r=ey();return n.forEach(o=>{const i=this.docs.get(o);r=r.insert(o,i?i.document.mutableCopy():bn.newInvalidDocument(o))}),U.resolve(r)}getAll(t,n,r){let o=ey();const i=new fe(n.child("")),s=this.docs.getIteratorFrom(i);for(;s.hasNext();){const{key:a,value:{document:l}}=s.getNext();if(!n.isPrefixOf(a.path))break;a.path.length>n.length+1||l.readTime.compareTo(r)<=0||(o=o.insert(l.key,l.mutableCopy()))}return U.resolve(o)}_i(t,n){return U.forEach(this.docs,r=>n(r))}newChangeBuffer(t){return new VN(this)}getSize(t){return U.resolve(this.size)}}class VN extends PN{constructor(t){super(),this.Tn=t}applyChanges(t){const n=[];return this.changes.forEach((r,o)=>{o.isValidDocument()?n.push(this.Tn.addEntry(t,o)):this.Tn.removeEntry(r)}),U.waitFor(n)}getFromCache(t,n){return this.Tn.getEntry(t,n)}getAllFromCache(t,n){return this.Tn.getEntries(t,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BN{constructor(t){this.persistence=t,this.wi=new ja(n=>Jp(n),Xp),this.lastRemoteSnapshotVersion=lt.min(),this.highestTargetId=0,this.mi=0,this.gi=new em,this.targetCount=0,this.yi=ki.He()}forEachTarget(t,n){return this.wi.forEach((r,o)=>n(o)),U.resolve()}getLastRemoteSnapshotVersion(t){return U.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return U.resolve(this.mi)}allocateTargetId(t){return this.highestTargetId=this.yi.next(),U.resolve(this.highestTargetId)}setTargetsMetadata(t,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.mi&&(this.mi=n),U.resolve()}Ze(t){this.wi.set(t.target,t);const n=t.targetId;n>this.highestTargetId&&(this.yi=new ki(n),this.highestTargetId=n),t.sequenceNumber>this.mi&&(this.mi=t.sequenceNumber)}addTargetData(t,n){return this.Ze(n),this.targetCount+=1,U.resolve()}updateTargetData(t,n){return this.Ze(n),U.resolve()}removeTargetData(t,n){return this.wi.delete(n.target),this.gi.si(n.targetId),this.targetCount-=1,U.resolve()}removeTargets(t,n,r){let o=0;const i=[];return this.wi.forEach((s,a)=>{a.sequenceNumber<=n&&r.get(a.targetId)===null&&(this.wi.delete(s),i.push(this.removeMatchingKeysForTargetId(t,a.targetId)),o++)}),U.waitFor(i).next(()=>o)}getTargetCount(t){return U.resolve(this.targetCount)}getTargetData(t,n){const r=this.wi.get(n)||null;return U.resolve(r)}addMatchingKeys(t,n,r){return this.gi.ti(n,r),U.resolve()}removeMatchingKeys(t,n,r){this.gi.ni(n,r);const o=this.persistence.referenceDelegate,i=[];return o&&n.forEach(s=>{i.push(o.markPotentiallyOrphaned(t,s))}),U.waitFor(i)}removeMatchingKeysForTargetId(t,n){return this.gi.si(n),U.resolve()}getMatchingKeysForTargetId(t,n){const r=this.gi.ri(n);return U.resolve(r)}containsKey(t,n){return U.resolve(this.gi.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WN{constructor(t,n){this.pi={},this.overlays={},this.Nn=new zE(0),this.xn=!1,this.xn=!0,this.referenceDelegate=t(this),this.Un=new BN(this),this.indexManager=new TN,this.qn=function(r){return new UN(r)}(r=>this.referenceDelegate.Ii(r)),this.O=new IN(n),this.Kn=new $N(this.O)}start(){return Promise.resolve()}shutdown(){return this.xn=!1,Promise.resolve()}get started(){return this.xn}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let n=this.overlays[t.toKey()];return n||(n=new FN,this.overlays[t.toKey()]=n),n}getMutationQueue(t,n){let r=this.pi[t.toKey()];return r||(r=new zN(n,this.referenceDelegate),this.pi[t.toKey()]=r),r}getTargetCache(){return this.Un}getRemoteDocumentCache(){return this.qn}getBundleCache(){return this.Kn}runTransaction(t,n,r){te("MemoryPersistence","Starting transaction:",t);const o=new qN(this.Nn.next());return this.referenceDelegate.Ei(),r(o).next(i=>this.referenceDelegate.Ti(o).next(()=>i)).toPromise().then(i=>(o.raiseOnCommittedEvent(),i))}Ai(t,n){return U.or(Object.values(this.pi).map(r=>()=>r.containsKey(t,n)))}}class qN extends _N{constructor(t){super(),this.currentSequenceNumber=t}}class tm{constructor(t){this.persistence=t,this.Ri=new em,this.Pi=null}static bi(t){return new tm(t)}get vi(){if(this.Pi)return this.Pi;throw _e()}addReference(t,n,r){return this.Ri.addReference(r,n),this.vi.delete(r.toString()),U.resolve()}removeReference(t,n,r){return this.Ri.removeReference(r,n),this.vi.add(r.toString()),U.resolve()}markPotentiallyOrphaned(t,n){return this.vi.add(n.toString()),U.resolve()}removeTarget(t,n){this.Ri.si(n.targetId).forEach(o=>this.vi.add(o.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,n.targetId).next(o=>{o.forEach(i=>this.vi.add(i.toString()))}).next(()=>r.removeTargetData(t,n))}Ei(){this.Pi=new Set}Ti(t){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return U.forEach(this.vi,r=>{const o=fe.fromPath(r);return this.Vi(t,o).next(i=>{i||n.removeEntry(o,lt.min())})}).next(()=>(this.Pi=null,n.apply(t)))}updateLimboDocument(t,n){return this.Vi(t,n).next(r=>{r?this.vi.delete(n.toString()):this.vi.add(n.toString())})}Ii(t){return 0}Vi(t,n){return U.or([()=>U.resolve(this.Ri.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(t,n),()=>this.persistence.Ai(t,n)])}}class ry{constructor(){this.activeTargetIds=aN()}Ci(t){this.activeTargetIds=this.activeTargetIds.add(t)}Ni(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Di(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class HN{constructor(){this._r=new ry,this.wr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,n,r){}addLocalQueryTarget(t){return this._r.Ci(t),this.wr[t]||"not-current"}updateQueryState(t,n,r){this.wr[t]=n}removeLocalQueryTarget(t){this._r.Ni(t)}isLocalQueryTarget(t){return this._r.activeTargetIds.has(t)}clearQueryState(t){delete this.wr[t]}getAllActiveQueryTargets(){return this._r.activeTargetIds}isActiveQueryTarget(t){return this._r.activeTargetIds.has(t)}start(){return this._r=new ry,Promise.resolve()}handleUserChange(t,n,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GN{mr(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oy{constructor(){this.gr=()=>this.yr(),this.pr=()=>this.Ir(),this.Er=[],this.Tr()}mr(t){this.Er.push(t)}shutdown(){window.removeEventListener("online",this.gr),window.removeEventListener("offline",this.pr)}Tr(){window.addEventListener("online",this.gr),window.addEventListener("offline",this.pr)}yr(){te("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.Er)t(0)}Ir(){te("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.Er)t(1)}static Vt(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KN={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QN{constructor(t){this.Ar=t.Ar,this.Rr=t.Rr}Pr(t){this.br=t}vr(t){this.Vr=t}onMessage(t){this.Sr=t}close(){this.Rr()}send(t){this.Ar(t)}Dr(){this.br()}Cr(t){this.Vr(t)}Nr(t){this.Sr(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JN extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const n=t.ssl?"https":"http";this.kr=n+"://"+t.host,this.Or="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}Mr(t,n,r,o,i){const s=this.$r(t,n);te("RestConnection","Sending: ",s,r);const a={};return this.Fr(a,o,i),this.Br(t,s,a,r).then(l=>(te("RestConnection","Received: ",l),l),l=>{throw Uv("RestConnection",`${t} failed with error: `,l,"url: ",s,"request:",r),l})}Lr(t,n,r,o,i){return this.Mr(t,n,r,o,i)}Fr(t,n,r){t["X-Goog-Api-Client"]="gl-js/ fire/"+Fi,t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((o,i)=>t[i]=o),r&&r.headers.forEach((o,i)=>t[i]=o)}$r(t,n){const r=KN[t];return`${this.kr}/v1/${n}:${r}`}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams}Br(t,n,r,o){return new Promise((i,s)=>{const a=new dP;a.listenOnce(lP.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case Sd.NO_ERROR:const c=a.getResponseJson();te("Connection","XHR received:",JSON.stringify(c)),i(c);break;case Sd.TIMEOUT:te("Connection",'RPC "'+t+'" timed out'),s(new le($.DEADLINE_EXCEEDED,"Request time out"));break;case Sd.HTTP_ERROR:const d=a.getStatus();if(te("Connection",'RPC "'+t+'" failed with status:',d,"response text:",a.getResponseText()),d>0){const h=a.getResponseJson().error;if(h&&h.status&&h.message){const f=function(g){const y=g.toLowerCase().replace(/_/g,"-");return Object.values($).indexOf(y)>=0?y:$.UNKNOWN}(h.status);s(new le(f,h.message))}else s(new le($.UNKNOWN,"Server responded with status "+a.getStatus()))}else s(new le($.UNAVAILABLE,"Connection failed."));break;default:_e()}}finally{te("Connection",'RPC "'+t+'" completed.')}});const l=JSON.stringify(o);a.send(n,"POST",l,r,15)})}Ur(t,n,r){const o=[this.kr,"/","google.firestore.v1.Firestore","/",t,"/channel"],i=sP(),s=aP(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(a.xmlHttpFactory=new uP({})),this.Fr(a.initMessageHeaders,n,r),sw()||aw()||iI()||lw()||sI()||dp()||(a.httpHeadersOverwriteParam="$httpHeaders");const l=o.join("");te("Connection","Creating WebChannel: "+l,a);const c=i.createWebChannel(l,a);let d=!1,h=!1;const f=new QN({Ar:y=>{h?te("Connection","Not sending because WebChannel is closed:",y):(d||(te("Connection","Opening WebChannel transport."),c.open(),d=!0),te("Connection","WebChannel sending:",y),c.send(y))},Rr:()=>c.close()}),g=(y,w,C)=>{y.listen(w,m=>{try{C(m)}catch(p){setTimeout(()=>{throw p},0)}})};return g(c,ol.EventType.OPEN,()=>{h||te("Connection","WebChannel transport opened.")}),g(c,ol.EventType.CLOSE,()=>{h||(h=!0,te("Connection","WebChannel transport closed"),f.Cr())}),g(c,ol.EventType.ERROR,y=>{h||(h=!0,Uv("Connection","WebChannel transport errored:",y),f.Cr(new le($.UNAVAILABLE,"The operation could not be completed")))}),g(c,ol.EventType.MESSAGE,y=>{var w;if(!h){const C=y.data[0];rt(!!C);const m=C,p=m.error||((w=m[0])===null||w===void 0?void 0:w.error);if(p){te("Connection","WebChannel received error:",p);const v=p.status;let b=function(P){const R=Je[P];if(R!==void 0)return tN(R)}(v),k=p.message;b===void 0&&(b=$.INTERNAL,k="Unknown error status: "+v+" with message "+p.message),h=!0,f.Cr(new le(b,k)),c.close()}else te("Connection","WebChannel received:",C),f.Nr(C)}}),g(s,cP.STAT_EVENT,y=>{y.stat===$v.PROXY?te("Connection","Detected buffering proxy"):y.stat===$v.NOPROXY&&te("Connection","Detected no buffering proxy")}),setTimeout(()=>{f.Dr()},0),f}}function xd(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wu(e){return new lN(e,!0)}class iS{constructor(t,n,r=1e3,o=1.5,i=6e4){this.Sn=t,this.timerId=n,this.qr=r,this.Kr=o,this.Gr=i,this.jr=0,this.Qr=null,this.Wr=Date.now(),this.reset()}reset(){this.jr=0}zr(){this.jr=this.Gr}Hr(t){this.cancel();const n=Math.floor(this.jr+this.Jr()),r=Math.max(0,Date.now()-this.Wr),o=Math.max(0,n-r);o>0&&te("ExponentialBackoff",`Backing off for ${o} ms (base delay: ${this.jr} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.Qr=this.Sn.enqueueAfterDelay(this.timerId,o,()=>(this.Wr=Date.now(),t())),this.jr*=this.Kr,this.jr<this.qr&&(this.jr=this.qr),this.jr>this.Gr&&(this.jr=this.Gr)}Yr(){this.Qr!==null&&(this.Qr.skipDelay(),this.Qr=null)}cancel(){this.Qr!==null&&(this.Qr.cancel(),this.Qr=null)}Jr(){return(Math.random()-.5)*this.jr}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class XN{constructor(t,n,r,o,i,s,a,l){this.Sn=t,this.Xr=r,this.Zr=o,this.eo=i,this.authCredentialsProvider=s,this.appCheckCredentialsProvider=a,this.listener=l,this.state=0,this.no=0,this.so=null,this.io=null,this.stream=null,this.ro=new iS(t,n)}oo(){return this.state===1||this.state===5||this.co()}co(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.uo()}async stop(){this.oo()&&await this.close(0)}ao(){this.state=0,this.ro.reset()}ho(){this.co()&&this.so===null&&(this.so=this.Sn.enqueueAfterDelay(this.Xr,6e4,()=>this.lo()))}fo(t){this._o(),this.stream.send(t)}async lo(){if(this.co())return this.close(0)}_o(){this.so&&(this.so.cancel(),this.so=null)}wo(){this.io&&(this.io.cancel(),this.io=null)}async close(t,n){this._o(),this.wo(),this.ro.cancel(),this.no++,t!==4?this.ro.reset():n&&n.code===$.RESOURCE_EXHAUSTED?(bo(n.toString()),bo("Using maximum backoff delay to prevent overloading the backend."),this.ro.zr()):n&&n.code===$.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.mo(),this.stream.close(),this.stream=null),this.state=t,await this.listener.vr(n)}mo(){}auth(){this.state=1;const t=this.yo(this.no),n=this.no;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,o])=>{this.no===n&&this.po(r,o)},r=>{t(()=>{const o=new le($.UNKNOWN,"Fetching auth token failed: "+r.message);return this.Io(o)})})}po(t,n){const r=this.yo(this.no);this.stream=this.Eo(t,n),this.stream.Pr(()=>{r(()=>(this.state=2,this.io=this.Sn.enqueueAfterDelay(this.Zr,1e4,()=>(this.co()&&(this.state=3),Promise.resolve())),this.listener.Pr()))}),this.stream.vr(o=>{r(()=>this.Io(o))}),this.stream.onMessage(o=>{r(()=>this.onMessage(o))})}uo(){this.state=5,this.ro.Hr(async()=>{this.state=0,this.start()})}Io(t){return te("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}yo(t){return n=>{this.Sn.enqueueAndForget(()=>this.no===t?n():(te("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class YN extends XN{constructor(t,n,r,o,i,s){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,o,s),this.O=i,this.Po=!1}get bo(){return this.Po}start(){this.Po=!1,this.lastStreamToken=void 0,super.start()}mo(){this.Po&&this.vo([])}Eo(t,n){return this.eo.Ur("Write",t,n)}onMessage(t){if(rt(!!t.streamToken),this.lastStreamToken=t.streamToken,this.Po){this.ro.reset();const n=gN(t.writeResults,t.commitTime),r=hi(t.commitTime);return this.listener.Vo(r,n)}return rt(!t.writeResults||t.writeResults.length===0),this.Po=!0,this.listener.So()}Do(){const t={};t.database=fN(this.O),this.fo(t)}vo(t){const n={streamToken:this.lastStreamToken,writes:t.map(r=>mN(this.O,r))};this.fo(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZN extends class{}{constructor(t,n,r,o){super(),this.authCredentials=t,this.appCheckCredentials=n,this.eo=r,this.O=o,this.Co=!1}No(){if(this.Co)throw new le($.FAILED_PRECONDITION,"The client has already been terminated.")}Mr(t,n,r){return this.No(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,i])=>this.eo.Mr(t,n,r,o,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===$.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new le($.UNKNOWN,o.toString())})}Lr(t,n,r){return this.No(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,i])=>this.eo.Lr(t,n,r,o,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===$.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new le($.UNKNOWN,o.toString())})}terminate(){this.Co=!0}}class e2{constructor(t,n){this.asyncQueue=t,this.onlineStateHandler=n,this.state="Unknown",this.xo=0,this.ko=null,this.Oo=!0}Mo(){this.xo===0&&(this.$o("Unknown"),this.ko=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.ko=null,this.Fo("Backend didn't respond within 10 seconds."),this.$o("Offline"),Promise.resolve())))}Bo(t){this.state==="Online"?this.$o("Unknown"):(this.xo++,this.xo>=1&&(this.Lo(),this.Fo(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.$o("Offline")))}set(t){this.Lo(),this.xo=0,t==="Online"&&(this.Oo=!1),this.$o(t)}$o(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}Fo(t){const n=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Oo?(bo(n),this.Oo=!1):te("OnlineStateTracker",n)}Lo(){this.ko!==null&&(this.ko.cancel(),this.ko=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t2{constructor(t,n,r,o,i){this.localStore=t,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Uo=[],this.qo=new Map,this.Ko=new Set,this.Go=[],this.jo=i,this.jo.mr(s=>{r.enqueueAndForget(async()=>{Ma(this)&&(te("RemoteStore","Restarting streams for network reachability change."),await async function(a){const l=Le(a);l.Ko.add(4),await Ra(l),l.Qo.set("Unknown"),l.Ko.delete(4),await Eu(l)}(this))})}),this.Qo=new e2(r,o)}}async function Eu(e){if(Ma(e))for(const t of e.Go)await t(!0)}async function Ra(e){for(const t of e.Go)await t(!1)}function Ma(e){return Le(e).Ko.size===0}async function sS(e,t,n){if(!yu(t))throw t;e.Ko.add(1),await Ra(e),e.Qo.set("Offline"),n||(n=()=>LN(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{te("RemoteStore","Retrying IndexedDB access"),await n(),e.Ko.delete(1),await Eu(e)})}function aS(e,t){return t().catch(n=>sS(e,n,t))}async function Su(e){const t=Le(e),n=Fr(t);let r=t.Uo.length>0?t.Uo[t.Uo.length-1].batchId:-1;for(;n2(t);)try{const o=await DN(t.localStore,r);if(o===null){t.Uo.length===0&&n.ho();break}r=o.batchId,r2(t,o)}catch(o){await sS(t,o)}lS(t)&&cS(t)}function n2(e){return Ma(e)&&e.Uo.length<10}function r2(e,t){e.Uo.push(t);const n=Fr(e);n.co()&&n.bo&&n.vo(t.mutations)}function lS(e){return Ma(e)&&!Fr(e).oo()&&e.Uo.length>0}function cS(e){Fr(e).start()}async function o2(e){Fr(e).Do()}async function i2(e){const t=Fr(e);for(const n of e.Uo)t.vo(n.mutations)}async function s2(e,t,n){const r=e.Uo.shift(),o=Yp.from(r,t,n);await aS(e,()=>e.remoteSyncer.applySuccessfulWrite(o)),await Su(e)}async function a2(e,t){t&&Fr(e).bo&&await async function(n,r){if(o=r.code,eN(o)&&o!==$.ABORTED){const i=n.Uo.shift();Fr(n).ao(),await aS(n,()=>n.remoteSyncer.rejectFailedWrite(i.batchId,r)),await Su(n)}var o}(e,t),lS(e)&&cS(e)}async function iy(e,t){const n=Le(e);n.asyncQueue.verifyOperationInProgress(),te("RemoteStore","RemoteStore received new credentials");const r=Ma(n);n.Ko.add(3),await Ra(n),r&&n.Qo.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.Ko.delete(3),await Eu(n)}async function l2(e,t){const n=Le(e);t?(n.Ko.delete(2),await Eu(n)):t||(n.Ko.add(2),await Ra(n),n.Qo.set("Unknown"))}function Fr(e){return e.Ho||(e.Ho=function(t,n,r){const o=Le(t);return o.No(),new YN(n,o.eo,o.authCredentials,o.appCheckCredentials,o.O,r)}(e.datastore,e.asyncQueue,{Pr:o2.bind(null,e),vr:a2.bind(null,e),So:i2.bind(null,e),Vo:s2.bind(null,e)}),e.Go.push(async t=>{t?(e.Ho.ao(),await Su(e)):(await e.Ho.stop(),e.Uo.length>0&&(te("RemoteStore",`Stopping write stream with ${e.Uo.length} pending writes`),e.Uo=[]))})),e.Ho}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(t,n,r,o,i){this.asyncQueue=t,this.timerId=n,this.targetTimeMs=r,this.op=o,this.removalCallback=i,this.deferred=new fo,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(s=>{})}static createAndSchedule(t,n,r,o,i){const s=Date.now()+r,a=new nm(t,n,s,o,i);return a.start(r),a}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new le($.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function uS(e,t){if(bo("AsyncQueue",`${t}: ${e}`),yu(e))return new le($.UNAVAILABLE,`${t}: ${e}`);throw e}class c2{constructor(){this.queries=new ja(t=>HE(t),qE),this.onlineState="Unknown",this.Zo=new Set}}function u2(e){e.Zo.forEach(t=>{t.next()})}class d2{constructor(t,n,r,o,i,s){this.localStore=t,this.remoteStore=n,this.eventManager=r,this.sharedClientState=o,this.currentUser=i,this.maxConcurrentLimboResolutions=s,this.Dc={},this.Cc=new ja(a=>HE(a),qE),this.Nc=new Map,this.xc=new Set,this.kc=new on(fe.comparator),this.Oc=new Map,this.Mc=new em,this.$c={},this.Fc=new Map,this.Bc=ki.Je(),this.onlineState="Unknown",this.Lc=void 0}get isPrimaryClient(){return this.Lc===!0}}async function h2(e,t,n){const r=g2(e);try{const o=await function(i,s){const a=Le(i),l=Zt.now(),c=s.reduce((h,f)=>h.add(f.key),Io());let d;return a.persistence.runTransaction("Locally write mutations","readwrite",h=>a.Us.Es(h,c).next(f=>{d=f;const g=[];for(const y of s){const w=XP(y,d.get(y.key));w!=null&&g.push(new Aa(y.key,w,BE(w.value.mapValue),di.exists(!0)))}return a.gs.addMutationBatch(h,l,g,s)})).then(h=>(h.applyToLocalDocumentSet(d),{batchId:h.batchId,changes:d}))}(r.localStore,t);r.sharedClientState.addPendingMutation(o.batchId),function(i,s,a){let l=i.$c[i.currentUser.toKey()];l||(l=new on(Re)),l=l.insert(s,a),i.$c[i.currentUser.toKey()]=l}(r,o.batchId,n),await xu(r,o.changes),await Su(r.remoteStore)}catch(o){const i=uS(o,"Failed to persist write");n.reject(i)}}function sy(e,t,n){const r=Le(e);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const o=[];r.Cc.forEach((i,s)=>{const a=s.view.tc(t);a.snapshot&&o.push(a.snapshot)}),function(i,s){const a=Le(i);a.onlineState=s;let l=!1;a.queries.forEach((c,d)=>{for(const h of d.listeners)h.tc(s)&&(l=!0)}),l&&u2(a)}(r.eventManager,t),o.length&&r.Dc.To(o),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function f2(e,t){const n=Le(e),r=t.batch.batchId;try{const o=await MN(n.localStore,t);hS(n,r,null),dS(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await xu(n,o)}catch(o){await rS(o)}}async function p2(e,t,n){const r=Le(e);try{const o=await function(i,s){const a=Le(i);return a.persistence.runTransaction("Reject batch","readwrite-primary",l=>{let c;return a.gs.lookupMutationBatch(l,s).next(d=>(rt(d!==null),c=d.keys(),a.gs.removeMutationBatch(l,d))).next(()=>a.gs.performConsistencyCheck(l)).next(()=>a.Us.Es(l,c))})}(r.localStore,t);hS(r,t,n),dS(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await xu(r,o)}catch(o){await rS(o)}}function dS(e,t){(e.Fc.get(t)||[]).forEach(n=>{n.resolve()}),e.Fc.delete(t)}function hS(e,t,n){const r=Le(e);let o=r.$c[r.currentUser.toKey()];if(o){const i=o.get(t);i&&(n?i.reject(n):i.resolve(),o=o.remove(t)),r.$c[r.currentUser.toKey()]=o}}async function xu(e,t,n){const r=Le(e),o=[],i=[],s=[];r.Cc.isEmpty()||(r.Cc.forEach((a,l)=>{s.push(r.Uc(l,t,n).then(c=>{if(c){r.isPrimaryClient&&r.sharedClientState.updateQueryState(l.targetId,c.fromCache?"not-current":"current"),o.push(c);const d=Zp.Ss(l.targetId,c);i.push(d)}}))}),await Promise.all(s),r.Dc.To(o),await async function(a,l){const c=Le(a);try{await c.persistence.runTransaction("notifyLocalViewChanges","readwrite",d=>U.forEach(l,h=>U.forEach(h.vs,f=>c.persistence.referenceDelegate.addReference(d,h.targetId,f)).next(()=>U.forEach(h.Vs,f=>c.persistence.referenceDelegate.removeReference(d,h.targetId,f)))))}catch(d){if(!yu(d))throw d;te("LocalStore","Failed to update sequence numbers: "+d)}for(const d of l){const h=d.targetId;if(!d.fromCache){const f=c.Ms.get(h),g=f.snapshotVersion,y=f.withLastLimboFreeSnapshotVersion(g);c.Ms=c.Ms.insert(h,y)}}}(r.localStore,i))}async function m2(e,t){const n=Le(e);if(!n.currentUser.isEqual(t)){te("SyncEngine","User change. New user:",t.toKey());const r=await oS(n.localStore,t);n.currentUser=t,function(o,i){o.Fc.forEach(s=>{s.forEach(a=>{a.reject(new le($.CANCELLED,i))})}),o.Fc.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await xu(n,r.qs)}}function g2(e){const t=Le(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=f2.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=p2.bind(null,t),t}class v2{constructor(){this.synchronizeTabs=!1}async initialize(t){this.O=wu(t.databaseInfo.databaseId),this.sharedClientState=this.Gc(t),this.persistence=this.jc(t),await this.persistence.start(),this.gcScheduler=this.Qc(t),this.localStore=this.Wc(t)}Qc(t){return null}Wc(t){return RN(this.persistence,new AN,t.initialUser,this.O)}jc(t){return new WN(tm.bi,this.O)}Gc(t){return new HN}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class y2{async initialize(t,n){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>sy(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=m2.bind(null,this.syncEngine),await l2(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return new c2}createDatastore(t){const n=wu(t.databaseInfo.databaseId),r=(o=t.databaseInfo,new JN(o));var o;return function(i,s,a,l){return new ZN(i,s,a,l)}(t.authCredentials,t.appCheckCredentials,r,n)}createRemoteStore(t){return n=this.localStore,r=this.datastore,o=t.asyncQueue,i=a=>sy(this.syncEngine,a,0),s=oy.Vt()?new oy:new GN,new t2(n,r,o,i,s);var n,r,o,i,s}createSyncEngine(t,n){return function(r,o,i,s,a,l,c){const d=new d2(r,o,i,s,a,l);return c&&(d.Lc=!0),d}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,n)}terminate(){return async function(t){const n=Le(t);te("RemoteStore","RemoteStore shutting down."),n.Ko.add(5),await Ra(n),n.jo.shutdown(),n.Qo.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w2{constructor(t,n,r,o){this.authCredentials=t,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=o,this.user=Vt.UNAUTHENTICATED,this.clientId=UE.R(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async i=>{te("FirestoreClient","Received user=",i.uid),await this.authCredentialListener(i),this.user=i}),this.appCheckCredentials.start(r,i=>(te("FirestoreClient","Received new app check token=",i),this.appCheckCredentialListener(i,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new le($.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const t=new fo;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(n){const r=uS(n,"Failed to shutdown persistence");t.reject(r)}}),t.promise}}async function E2(e,t){e.asyncQueue.verifyOperationInProgress(),te("FirestoreClient","Initializing OfflineComponentProvider");const n=await e.getConfiguration();await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener(async o=>{r.isEqual(o)||(await oS(t.localStore,o),r=o)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e.offlineComponents=t}async function S2(e,t){e.asyncQueue.verifyOperationInProgress();const n=await x2(e);te("FirestoreClient","Initializing OnlineComponentProvider");const r=await e.getConfiguration();await t.initialize(n,r),e.setCredentialChangeListener(o=>iy(t.remoteStore,o)),e.setAppCheckTokenChangeListener((o,i)=>iy(t.remoteStore,i)),e.onlineComponents=t}async function x2(e){return e.offlineComponents||(te("FirestoreClient","Using default OfflineComponentProvider"),await E2(e,new v2)),e.offlineComponents}async function _2(e){return e.onlineComponents||(te("FirestoreClient","Using default OnlineComponentProvider"),await S2(e,new y2)),e.onlineComponents}function b2(e){return _2(e).then(t=>t.syncEngine)}const ay=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fS(e,t,n){if(!n)throw new le($.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function C2(e,t,n,r){if(t===!0&&r===!0)throw new le($.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}function ly(e){if(!fe.isDocumentKey(e))throw new le($.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function cy(e){if(fe.isDocumentKey(e))throw new le($.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function rm(e){if(e===void 0)return"undefined";if(e===null)return"null";if(typeof e=="string")return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if(typeof e=="number"||typeof e=="boolean")return""+e;if(typeof e=="object"){if(e instanceof Array)return"an array";{const t=function(n){return n.constructor?n.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return typeof e=="function"?"a function":_e()}function I2(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new le($.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=rm(e);throw new le($.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uy{constructor(t){var n;if(t.host===void 0){if(t.ssl!==void 0)throw new le($.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(n=t.ssl)===null||n===void 0||n;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new le($.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.useFetchStreams=!!t.useFetchStreams,C2("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling)}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class om{constructor(t,n,r){this._authCredentials=n,this._appCheckCredentials=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new uy({}),this._settingsFrozen=!1,t instanceof Ys?this._databaseId=t:(this._app=t,this._databaseId=function(o){if(!Object.prototype.hasOwnProperty.apply(o.options,["projectId"]))throw new le($.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ys(o.options.projectId)}(t))}get app(){if(!this._app)throw new le($.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(t){if(this._settingsFrozen)throw new le($.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new uy(t),t.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new fP;switch(n.type){case"gapi":const r=n.client;return rt(!(typeof r!="object"||r===null||!r.auth||!r.auth.getAuthHeaderValueForFirstParty)),new gP(r,n.sessionIndex||"0",n.iamToken||null);case"provider":return n.client;default:throw new le($.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const n=ay.get(t);n&&(te("ComponentProvider","Removing Datastore"),ay.delete(t),n.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(t,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Mr(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Yn(this.firestore,t,this._key)}}class im{constructor(t,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new im(this.firestore,t,this._query)}}class Mr extends im{constructor(t,n,r){super(t,n,LP(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Yn(this.firestore,null,new fe(t))}withConverter(t){return new Mr(this.firestore,t,this._path)}}function k2(e,t,...n){if(e=Ft(e),fS("collection","path",t),e instanceof om){const r=He.fromString(t,...n);return cy(r),new Mr(e,null,r)}{if(!(e instanceof Yn||e instanceof Mr))throw new le($.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(He.fromString(t,...n));return cy(r),new Mr(e.firestore,null,r)}}function T2(e,t,...n){if(e=Ft(e),arguments.length===1&&(t=UE.R()),fS("doc","path",t),e instanceof om){const r=He.fromString(t,...n);return ly(r),new Yn(e,null,new fe(r))}{if(!(e instanceof Yn||e instanceof Mr))throw new le($.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(He.fromString(t,...n));return ly(r),new Yn(e.firestore,e instanceof Mr?e.converter:null,new fe(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O2{constructor(){this.hu=Promise.resolve(),this.lu=[],this.fu=!1,this.du=[],this._u=null,this.wu=!1,this.mu=!1,this.gu=[],this.ro=new iS(this,"async_queue_retry"),this.yu=()=>{const n=xd();n&&te("AsyncQueue","Visibility state changed to "+n.visibilityState),this.ro.Yr()};const t=xd();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.yu)}get isShuttingDown(){return this.fu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.pu(),this.Iu(t)}enterRestrictedMode(t){if(!this.fu){this.fu=!0,this.mu=t||!1;const n=xd();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.yu)}}enqueue(t){if(this.pu(),this.fu)return new Promise(()=>{});const n=new fo;return this.Iu(()=>this.fu&&this.mu?Promise.resolve():(t().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.lu.push(t),this.Eu()))}async Eu(){if(this.lu.length!==0){try{await this.lu[0](),this.lu.shift(),this.ro.reset()}catch(t){if(!yu(t))throw t;te("AsyncQueue","Operation failed with retryable error: "+t)}this.lu.length>0&&this.ro.Hr(()=>this.Eu())}}Iu(t){const n=this.hu.then(()=>(this.wu=!0,t().catch(r=>{this._u=r,this.wu=!1;const o=function(i){let s=i.message||"";return i.stack&&(s=i.stack.includes(i.message)?i.stack:i.message+`
`+i.stack),s}(r);throw bo("INTERNAL UNHANDLED ERROR: ",o),r}).then(r=>(this.wu=!1,r))));return this.hu=n,n}enqueueAfterDelay(t,n,r){this.pu(),this.gu.indexOf(t)>-1&&(n=0);const o=nm.createAndSchedule(this,t,n,r,i=>this.Tu(i));return this.du.push(o),o}pu(){this._u&&_e()}verifyOperationInProgress(){}async Au(){let t;do t=this.hu,await t;while(t!==this.hu)}Ru(t){for(const n of this.du)if(n.timerId===t)return!0;return!1}Pu(t){return this.Au().then(()=>{this.du.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.du)if(n.skipDelay(),t!=="all"&&n.timerId===t)break;return this.Au()})}bu(t){this.gu.push(t)}Tu(t){const n=this.du.indexOf(t);this.du.splice(n,1)}}class pS extends om{constructor(t,n,r){super(t,n,r),this.type="firestore",this._queue=new O2,this._persistenceKey="name"in t?t.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||mS(this),this._firestoreClient.terminate()}}function P2(e=fp()){return Ro(e,"firestore").getImmediate()}function N2(e){return e._firestoreClient||mS(e),e._firestoreClient.verifyNotTerminated(),e._firestoreClient}function mS(e){var t;const n=e._freezeSettings(),r=function(o,i,s,a){return new _P(o,i,s,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,a.useFetchStreams)}(e._databaseId,((t=e._app)===null||t===void 0?void 0:t.options.appId)||"",e._persistenceKey,n);e._firestoreClient=new w2(e._authCredentials,e._appCheckCredentials,e._queue,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gS{constructor(...t){for(let n=0;n<t.length;++n)if(t[n].length===0)throw new le($.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Wt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra{constructor(t){this._byteString=t}static fromBase64String(t){try{return new ra(ar.fromBase64String(t))}catch(n){throw new le($.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(t){return new ra(ar.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vS{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yS{constructor(t,n){if(!isFinite(t)||t<-90||t>90)throw new le($.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(n)||n<-180||n>180)throw new le($.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=t,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return Re(this._lat,t._lat)||Re(this._long,t._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A2=/^__.*__$/;class j2{constructor(t,n,r){this.data=t,this.fieldMask=n,this.fieldTransforms=r}toMutation(t,n){return this.fieldMask!==null?new Aa(t,this.data,this.fieldMask,n,this.fieldTransforms):new vu(t,this.data,n,this.fieldTransforms)}}function wS(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw _e()}}class sm{constructor(t,n,r,o,i,s){this.settings=t,this.databaseId=n,this.O=r,this.ignoreUndefinedProperties=o,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=s||[]}get path(){return this.settings.path}get Vu(){return this.settings.Vu}Su(t){return new sm(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.O,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Du(t){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(t),o=this.Su({path:r,Cu:!1});return o.Nu(t),o}xu(t){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(t),o=this.Su({path:r,Cu:!1});return o.vu(),o}ku(t){return this.Su({path:void 0,Cu:!0})}Ou(t){return Cc(t,this.settings.methodName,this.settings.Mu||!1,this.path,this.settings.$u)}contains(t){return this.fieldMask.find(n=>t.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>t.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let t=0;t<this.path.length;t++)this.Nu(this.path.get(t))}Nu(t){if(t.length===0)throw this.Ou("Document fields must not be empty");if(wS(this.Vu)&&A2.test(t))throw this.Ou('Document fields cannot begin and end with "__"')}}class R2{constructor(t,n,r){this.databaseId=t,this.ignoreUndefinedProperties=n,this.O=r||wu(t)}Fu(t,n,r,o=!1){return new sm({Vu:t,methodName:n,$u:r,path:Wt.emptyPath(),Cu:!1,Mu:o},this.databaseId,this.O,this.ignoreUndefinedProperties)}}function M2(e){const t=e._freezeSettings(),n=wu(e._databaseId);return new R2(e._databaseId,!!t.ignoreUndefinedProperties,n)}function L2(e,t,n,r,o,i={}){const s=e.Fu(i.merge||i.mergeFields?2:0,t,n,o);_S("Data must be an object, but it was:",s,r);const a=SS(r,s);let l,c;if(i.merge)l=new Xh(s.fieldMask),c=s.fieldTransforms;else if(i.mergeFields){const d=[];for(const h of i.mergeFields){const f=D2(t,h,n);if(!s.contains(f))throw new le($.INVALID_ARGUMENT,`Field '${f}' is specified in your field mask but missing from your input data.`);z2(d,f)||d.push(f)}l=new Xh(d),c=s.fieldTransforms.filter(h=>l.covers(h.field))}else l=null,c=s.fieldTransforms;return new j2(new jn(a),l,c)}function ES(e,t){if(xS(e=Ft(e)))return _S("Unsupported field value:",t,e),SS(e,t);if(e instanceof vS)return function(n,r){if(!wS(r.Vu))throw r.Ou(`${n._methodName}() can only be used with update() and set()`);if(!r.path)throw r.Ou(`${n._methodName}() is not currently supported inside arrays`);const o=n._toFieldTransform(r);o&&r.fieldTransforms.push(o)}(e,t),null;if(e===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.Cu&&t.Vu!==4)throw t.Ou("Nested arrays are not supported");return function(n,r){const o=[];let i=0;for(const s of n){let a=ES(s,r.ku(i));a==null&&(a={nullValue:"NULL_VALUE"}),o.push(a),i++}return{arrayValue:{values:o}}}(e,t)}return function(n,r){if((n=Ft(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return qP(r.O,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const o=Zt.fromDate(n);return{timestampValue:tf(r.O,o)}}if(n instanceof Zt){const o=new Zt(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:tf(r.O,o)}}if(n instanceof yS)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof ra)return{bytesValue:cN(r.O,n._byteString)};if(n instanceof Yn){const o=r.databaseId,i=n.firestore._databaseId;if(!i.isEqual(o))throw r.Ou(`Document reference is for database ${i.projectId}/${i.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:tS(n.firestore._databaseId||r.databaseId,n._key.path)}}throw r.Ou(`Unsupported field value: ${rm(n)}`)}(e,t)}function SS(e,t){const n={};return VE(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Pa(e,(r,o)=>{const i=ES(o,t.Du(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function xS(e){return!(typeof e!="object"||e===null||e instanceof Array||e instanceof Date||e instanceof Zt||e instanceof yS||e instanceof ra||e instanceof Yn||e instanceof vS)}function _S(e,t,n){if(!xS(n)||!function(r){return typeof r=="object"&&r!==null&&(Object.getPrototypeOf(r)===Object.prototype||Object.getPrototypeOf(r)===null)}(n)){const r=rm(n);throw r==="an object"?t.Ou(e+" a custom object"):t.Ou(e+" "+r)}}function D2(e,t,n){if((t=Ft(t))instanceof gS)return t._internalPath;if(typeof t=="string")return F2(e,t);throw Cc("Field path arguments must be of type string or ",e,!1,void 0,n)}const $2=new RegExp("[~\\*/\\[\\]]");function F2(e,t,n){if(t.search($2)>=0)throw Cc(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new gS(...t.split("."))._internalPath}catch{throw Cc(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function Cc(e,t,n,r,o){const i=r&&!r.isEmpty(),s=o!==void 0;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let l="";return(i||s)&&(l+=" (found",i&&(l+=` in field ${r}`),s&&(l+=` in document ${o}`),l+=")"),new le($.INVALID_ARGUMENT,a+e+l)}function z2(e,t){return e.some(n=>n.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U2(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}function V2(e,t){const n=I2(e.firestore,pS),r=T2(e),o=U2(e.converter,t);return B2(n,[L2(M2(e.firestore),"addDoc",r._key,o,e.converter!==null,{}).toMutation(r._key,di.exists(!1))]).then(()=>r)}function B2(e,t){return function(n,r){const o=new fo;return n.asyncQueue.enqueueAndForget(async()=>h2(await b2(n),r,o)),o.promise}(N2(e),t)}(function(e,t=!0){(function(n){Fi=n})(pa),or(new Fn("firestore",(n,{options:r})=>{const o=n.getProvider("app").getImmediate(),i=new pS(o,new pP(n.getProvider("auth-internal")),new yP(n.getProvider("app-check-internal")));return r=Object.assign({useFetchStreams:t},r),i._setSettings(r),i},"PUBLIC")),pn(Fv,"3.4.5",e),pn(Fv,"3.4.5","esm2017")})();function W2(e){return Array.prototype.slice.call(e)}function bS(e){return new Promise(function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function am(e,t,n){var r,o=new Promise(function(i,s){r=e[t].apply(e,n),bS(r).then(i,s)});return o.request=r,o}function q2(e,t,n){var r=am(e,t,n);return r.then(function(o){if(o)return new oa(o,r.request)})}function zi(e,t,n){n.forEach(function(r){Object.defineProperty(e.prototype,r,{get:function(){return this[t][r]},set:function(o){this[t][r]=o}})})}function lm(e,t,n,r){r.forEach(function(o){o in n.prototype&&(e.prototype[o]=function(){return am(this[t],o,arguments)})})}function _u(e,t,n,r){r.forEach(function(o){o in n.prototype&&(e.prototype[o]=function(){return this[t][o].apply(this[t],arguments)})})}function CS(e,t,n,r){r.forEach(function(o){o in n.prototype&&(e.prototype[o]=function(){return q2(this[t],o,arguments)})})}function Lo(e){this._index=e}zi(Lo,"_index",["name","keyPath","multiEntry","unique"]);lm(Lo,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]);CS(Lo,"_index",IDBIndex,["openCursor","openKeyCursor"]);function oa(e,t){this._cursor=e,this._request=t}zi(oa,"_cursor",["direction","key","primaryKey","value"]);lm(oa,"_cursor",IDBCursor,["update","delete"]);["advance","continue","continuePrimaryKey"].forEach(function(e){e in IDBCursor.prototype&&(oa.prototype[e]=function(){var t=this,n=arguments;return Promise.resolve().then(function(){return t._cursor[e].apply(t._cursor,n),bS(t._request).then(function(r){if(r)return new oa(r,t._request)})})})});function Un(e){this._store=e}Un.prototype.createIndex=function(){return new Lo(this._store.createIndex.apply(this._store,arguments))};Un.prototype.index=function(){return new Lo(this._store.index.apply(this._store,arguments))};zi(Un,"_store",["name","keyPath","indexNames","autoIncrement"]);lm(Un,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]);CS(Un,"_store",IDBObjectStore,["openCursor","openKeyCursor"]);_u(Un,"_store",IDBObjectStore,["deleteIndex"]);function La(e){this._tx=e,this.complete=new Promise(function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}})}La.prototype.objectStore=function(){return new Un(this._tx.objectStore.apply(this._tx,arguments))};zi(La,"_tx",["objectStoreNames","mode"]);_u(La,"_tx",IDBTransaction,["abort"]);function bu(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new La(n)}bu.prototype.createObjectStore=function(){return new Un(this._db.createObjectStore.apply(this._db,arguments))};zi(bu,"_db",["name","version","objectStoreNames"]);_u(bu,"_db",IDBDatabase,["deleteObjectStore","close"]);function Cu(e){this._db=e}Cu.prototype.transaction=function(){return new La(this._db.transaction.apply(this._db,arguments))};zi(Cu,"_db",["name","version","objectStoreNames"]);_u(Cu,"_db",IDBDatabase,["close"]);["openCursor","openKeyCursor"].forEach(function(e){[Un,Lo].forEach(function(t){e in t.prototype&&(t.prototype[e.replace("open","iterate")]=function(){var n=W2(arguments),r=n[n.length-1],o=this._store||this._index,i=o[e].apply(o,n.slice(0,-1));i.onsuccess=function(){r(i.result)}})})});[Lo,Un].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(t,n){var r=this,o=[];return new Promise(function(i){r.iterateCursor(t,function(s){if(!s){i(o);return}if(o.push(s.value),n!==void 0&&o.length==n){i(o);return}s.continue()})})})});function H2(e,t,n){var r=am(indexedDB,"open",[e,t]),o=r.request;return o&&(o.onupgradeneeded=function(i){n&&n(new bu(o.result,i.oldVersion,o.transaction))}),r.then(function(i){return new Cu(i)})}const IS="@firebase/installations",cm="0.5.5";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kS=1e4,TS=`w:${cm}`,OS="FIS_v2",G2="https://firebaseinstallations.googleapis.com/v1",K2=60*60*1e3,Q2="installations",J2="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X2={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},ko=new jo(Q2,J2,X2);function PS(e){return e instanceof cr&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function NS({projectId:e}){return`${G2}/projects/${e}/installations`}function AS(e){return{token:e.token,requestStatus:2,expiresIn:Z2(e.expiresIn),creationTime:Date.now()}}async function jS(e,t){const r=(await t.json()).error;return ko.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function RS({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Y2(e,{refreshToken:t}){const n=RS(e);return n.append("Authorization",eA(t)),n}async function MS(e){const t=await e();return t.status>=500&&t.status<600?e():t}function Z2(e){return Number(e.replace("s","000"))}function eA(e){return`${OS} ${e}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tA(e,{fid:t}){const n=NS(e),r=RS(e),o={fid:t,authVersion:OS,appId:e.appId,sdkVersion:TS},i={method:"POST",headers:r,body:JSON.stringify(o)},s=await MS(()=>fetch(n,i));if(s.ok){const a=await s.json();return{fid:a.fid||t,registrationStatus:2,refreshToken:a.refreshToken,authToken:AS(a.authToken)}}else throw await jS("Create Installation",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function LS(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nA(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rA=/^[cdef][\w-]{21}$/,rf="";function oA(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=iA(e);return rA.test(n)?n:rf}catch{return rf}}function iA(e){return nA(e).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iu(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DS=new Map;function $S(e,t){const n=Iu(e);FS(n,t),sA(n,t)}function FS(e,t){const n=DS.get(e);if(n)for(const r of n)r(t)}function sA(e,t){const n=aA();n&&n.postMessage({key:e,fid:t}),lA()}let lo=null;function aA(){return!lo&&"BroadcastChannel"in self&&(lo=new BroadcastChannel("[Firebase] FID Change"),lo.onmessage=e=>{FS(e.data.key,e.data.fid)}),lo}function lA(){DS.size===0&&lo&&(lo.close(),lo=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cA="firebase-installations-database",uA=1,To="firebase-installations-store";let _d=null;function um(){return _d||(_d=H2(cA,uA,e=>{switch(e.oldVersion){case 0:e.createObjectStore(To)}})),_d}async function Ic(e,t){const n=Iu(e),o=(await um()).transaction(To,"readwrite"),i=o.objectStore(To),s=await i.get(n);return await i.put(t,n),await o.complete,(!s||s.fid!==t.fid)&&$S(e,t.fid),t}async function zS(e){const t=Iu(e),r=(await um()).transaction(To,"readwrite");await r.objectStore(To).delete(t),await r.complete}async function ku(e,t){const n=Iu(e),o=(await um()).transaction(To,"readwrite"),i=o.objectStore(To),s=await i.get(n),a=t(s);return a===void 0?await i.delete(n):await i.put(a,n),await o.complete,a&&(!s||s.fid!==a.fid)&&$S(e,a.fid),a}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dm(e){let t;const n=await ku(e,r=>{const o=dA(r),i=hA(e,o);return t=i.registrationPromise,i.installationEntry});return n.fid===rf?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function dA(e){const t=e||{fid:oA(),registrationStatus:0};return US(t)}function hA(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const o=Promise.reject(ko.create("app-offline"));return{installationEntry:t,registrationPromise:o}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=fA(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:pA(e)}:{installationEntry:t}}async function fA(e,t){try{const n=await tA(e,t);return Ic(e,n)}catch(n){throw PS(n)&&n.customData.serverCode===409?await zS(e):await Ic(e,{fid:t.fid,registrationStatus:0}),n}}async function pA(e){let t=await dy(e);for(;t.registrationStatus===1;)await LS(100),t=await dy(e);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await dm(e);return r||n}return t}function dy(e){return ku(e,t=>{if(!t)throw ko.create("installation-not-found");return US(t)})}function US(e){return mA(e)?{fid:e.fid,registrationStatus:0}:e}function mA(e){return e.registrationStatus===1&&e.registrationTime+kS<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gA({appConfig:e,platformLoggerProvider:t},n){const r=vA(e,n),o=Y2(e,n),i=t.getImmediate({optional:!0});i&&o.append("x-firebase-client",i.getPlatformInfoString());const a={method:"POST",headers:o,body:JSON.stringify({installation:{sdkVersion:TS}})},l=await MS(()=>fetch(r,a));if(l.ok){const c=await l.json();return AS(c)}else throw await jS("Generate Auth Token",l)}function vA(e,{fid:t}){return`${NS(e)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hm(e,t=!1){let n;const r=await ku(e.appConfig,i=>{if(!VS(i))throw ko.create("not-registered");const s=i.authToken;if(!t&&EA(s))return i;if(s.requestStatus===1)return n=yA(e,t),i;{if(!navigator.onLine)throw ko.create("app-offline");const a=xA(i);return n=wA(e,a),a}});return n?await n:r.authToken}async function yA(e,t){let n=await hy(e.appConfig);for(;n.authToken.requestStatus===1;)await LS(100),n=await hy(e.appConfig);const r=n.authToken;return r.requestStatus===0?hm(e,t):r}function hy(e){return ku(e,t=>{if(!VS(t))throw ko.create("not-registered");const n=t.authToken;return _A(n)?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t})}async function wA(e,t){try{const n=await gA(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await Ic(e.appConfig,r),n}catch(n){if(PS(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await zS(e.appConfig);else{const r=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await Ic(e.appConfig,r)}throw n}}function VS(e){return e!==void 0&&e.registrationStatus===2}function EA(e){return e.requestStatus===2&&!SA(e)}function SA(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+K2}function xA(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}function _A(e){return e.requestStatus===1&&e.requestTime+kS<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bA(e){const t=e,{installationEntry:n,registrationPromise:r}=await dm(t.appConfig);return r?r.catch(console.error):hm(t).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function CA(e,t=!1){const n=e;return await IA(n.appConfig),(await hm(n,t)).token}async function IA(e){const{registrationPromise:t}=await dm(e);t&&await t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kA(e){if(!e||!e.options)throw bd("App Configuration");if(!e.name)throw bd("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw bd(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function bd(e){return ko.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BS="installations",TA="installations-internal",OA=e=>{const t=e.getProvider("app").getImmediate(),n=kA(t),r=Ro(t,"platform-logger");return{app:t,appConfig:n,platformLoggerProvider:r,_delete:()=>Promise.resolve()}},PA=e=>{const t=e.getProvider("app").getImmediate(),n=Ro(t,BS).getImmediate();return{getId:()=>bA(n),getToken:o=>CA(n,o)}};function NA(){or(new Fn(BS,OA,"PUBLIC")),or(new Fn(TA,PA,"PRIVATE"))}NA();pn(IS,cm);pn(IS,cm,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kc="analytics",AA="firebase_id",jA="origin",RA=60*1e3,MA="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",WS="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tn=new Xc("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qS(e){return Promise.all(e.map(t=>t.catch(n=>n)))}function LA(e,t){const n=document.createElement("script");n.src=`${WS}?l=${e}&id=${t}`,n.async=!0,document.head.appendChild(n)}function DA(e){let t=[];return Array.isArray(window[e])?t=window[e]:window[e]=t,t}async function $A(e,t,n,r,o,i){const s=r[o];try{if(s)await t[s];else{const l=(await qS(n)).find(c=>c.measurementId===o);l&&await t[l.appId]}}catch(a){tn.error(a)}e("config",o,i)}async function FA(e,t,n,r,o){try{let i=[];if(o&&o.send_to){let s=o.send_to;Array.isArray(s)||(s=[s]);const a=await qS(n);for(const l of s){const c=a.find(h=>h.measurementId===l),d=c&&t[c.appId];if(d)i.push(d);else{i=[];break}}}i.length===0&&(i=Object.values(t)),await Promise.all(i),e("event",r,o||{})}catch(i){tn.error(i)}}function zA(e,t,n,r){async function o(i,s,a){try{i==="event"?await FA(e,t,n,s,a):i==="config"?await $A(e,t,n,r,s,a):e("set",s)}catch(l){tn.error(l)}}return o}function UA(e,t,n,r,o){let i=function(...s){window[r].push(arguments)};return window[o]&&typeof window[o]=="function"&&(i=window[o]),window[o]=zA(i,e,t,n),{gtagCore:i,wrappedGtag:window[o]}}function VA(){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(WS))return t;return null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BA={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.'},mn=new jo("analytics","Analytics",BA);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WA=30,qA=1e3;class HA{constructor(t={},n=qA){this.throttleMetadata=t,this.intervalMillis=n}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,n){this.throttleMetadata[t]=n}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const HS=new HA;function GA(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function KA(e){var t;const{appId:n,apiKey:r}=e,o={method:"GET",headers:GA(r)},i=MA.replace("{app-id}",n),s=await fetch(i,o);if(s.status!==200&&s.status!==304){let a="";try{const l=await s.json();!((t=l.error)===null||t===void 0)&&t.message&&(a=l.error.message)}catch{}throw mn.create("config-fetch-failed",{httpStatus:s.status,responseMessage:a})}return s.json()}async function QA(e,t=HS,n){const{appId:r,apiKey:o,measurementId:i}=e.options;if(!r)throw mn.create("no-app-id");if(!o){if(i)return{measurementId:i,appId:r};throw mn.create("no-api-key")}const s=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new YA;return setTimeout(async()=>{a.abort()},n!==void 0?n:RA),GS({appId:r,apiKey:o,measurementId:i},s,a,t)}async function GS(e,{throttleEndTimeMillis:t,backoffCount:n},r,o=HS){const{appId:i,measurementId:s}=e;try{await JA(r,t)}catch(a){if(s)return tn.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${s} provided in the "measurementId" field in the local Firebase config. [${a.message}]`),{appId:i,measurementId:s};throw a}try{const a=await KA(e);return o.deleteThrottleMetadata(i),a}catch(a){if(!XA(a)){if(o.deleteThrottleMetadata(i),s)return tn.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${s} provided in the "measurementId" field in the local Firebase config. [${a.message}]`),{appId:i,measurementId:s};throw a}const l=Number(a.customData.httpStatus)===503?av(n,o.intervalMillis,WA):av(n,o.intervalMillis),c={throttleEndTimeMillis:Date.now()+l,backoffCount:n+1};return o.setThrottleMetadata(i,c),tn.debug(`Calling attemptFetch again in ${l} millis`),GS(e,c,r,o)}}function JA(e,t){return new Promise((n,r)=>{const o=Math.max(t-Date.now(),0),i=setTimeout(n,o);e.addEventListener(()=>{clearTimeout(i),r(mn.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function XA(e){if(!(e instanceof cr)||!e.customData)return!1;const t=Number(e.customData.httpStatus);return t===429||t===500||t===503||t===504}class YA{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ZA(){if(aI())try{await lI()}catch(e){return tn.warn(mn.create("indexeddb-unavailable",{errorInfo:e}).message),!1}else return tn.warn(mn.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function ej(e,t,n,r,o,i,s){var a;const l=QA(e);l.then(g=>{n[g.measurementId]=g.appId,e.options.measurementId&&g.measurementId!==e.options.measurementId&&tn.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${g.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(g=>tn.error(g)),t.push(l);const c=ZA().then(g=>{if(g)return r.getId()}),[d,h]=await Promise.all([l,c]);VA()||LA(i,d.measurementId),o("js",new Date);const f=(a=s==null?void 0:s.config)!==null&&a!==void 0?a:{};return f[jA]="firebase",f.update=!0,h!=null&&(f[AA]=h),o("config",d.measurementId,f),d.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tj{constructor(t){this.app=t}_delete(){return delete Ss[this.app.options.appId],Promise.resolve()}}let Ss={},fy=[];const py={};let Cd="dataLayer",nj="gtag",my,KS,gy=!1;function rj(){const e=[];if(dp()&&e.push("This is a browser extension environment."),cI()||e.push("Cookies are not available."),e.length>0){const t=e.map((r,o)=>`(${o+1}) ${r}`).join(" "),n=mn.create("invalid-analytics-context",{errorInfo:t});tn.warn(n.message)}}function oj(e,t,n){rj();const r=e.options.appId;if(!r)throw mn.create("no-app-id");if(!e.options.apiKey)if(e.options.measurementId)tn.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw mn.create("no-api-key");if(Ss[r]!=null)throw mn.create("already-exists",{id:r});if(!gy){DA(Cd);const{wrappedGtag:i,gtagCore:s}=UA(Ss,fy,py,Cd,nj);KS=i,my=s,gy=!0}return Ss[r]=ej(e,fy,py,t,my,Cd,n),new tj(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ij(e,t,n,r,o){if(o&&o.global){e("event",n,r);return}else{const i=await t,s=Object.assign(Object.assign({},r),{send_to:i});e("event",n,s)}}function sj(e=fp()){e=Ft(e);const t=Ro(e,kc);return t.isInitialized()?t.getImmediate():aj(e)}function aj(e,t={}){const n=Ro(e,kc);if(n.isInitialized()){const o=n.getImmediate();if(Vs(t,n.getOptions()))return o;throw mn.create("already-initialized")}return n.initialize({options:t})}function lj(e,t,n,r){e=Ft(e),ij(KS,Ss[e.app.options.appId],t,n,r).catch(o=>tn.error(o))}const vy="@firebase/analytics",yy="0.7.5";function cj(){or(new Fn(kc,(t,{options:n})=>{const r=t.getProvider("app").getImmediate(),o=t.getProvider("installations-internal").getImmediate();return oj(r,o,n)},"PUBLIC")),or(new Fn("analytics-internal",e,"PRIVATE")),pn(vy,yy),pn(vy,yy,"esm2017");function e(t){try{const n=t.getProvider(kc).getImmediate();return{logEvent:(r,o,i)=>lj(n,r,o,i)}}catch(n){throw mn.create("interop-component-reg-failed",{reason:n})}}}cj();const uj={apiKey:"AIzaSyAT6CATosrnNmy9tpTB8GEenPcHcJBuA8k",authDomain:"chatboteduca.firebaseapp.com",databaseURL:"https://project-id.firebaseio.com",projectId:"chatboteduca",storageBucket:"chatboteduca.appspot.com",messagingSenderId:"688718917755",appId:"1:688718917755:web:420452363a0d56175232de",measurementId:"G-9VP01NDSXJ"},fm=sk(uj),dj=Fw(fm);sj(fm);const hj=new qn,fj=P2(fm),Tu=()=>{const[e,t]=I.useState(null),[n,r]=I.useState(!1),[o,i]=I.useState(!1),s=Fw(),a=async d=>{i(!0),t(null),r(!0);try{const{user:h}=await Bk(s,d.email,d.password);return await Hk(h,{displayName:d.displayName}),r(!1),h}catch(h){console.log(h.message),console.log(typeof h.message);let f;h.message.includes("Password")?f="A senha deve ter pelo menos 6 caracteres":h.message.includes("email-already")?f="E-mail já cadastrado":f="Ocorreu erro, por favor tente novamente mais tarde",r(!1),t(f)}},l=()=>{Kk(s)},c=async d=>{r(!0),t(!1);try{await Wk(s,d.email,d.password),r(!1)}catch(h){let f;h.message.includes("user-not-found")?f="Usuário não encontrado":h.message.includes("wrong-password")?f="Senha incorreta":f="Ocorreu um erro, por favor tente novamente mais tarde",t(f),r(!1)}};return I.useEffect(()=>()=>i(!0),[]),{auth:s,createUser:a,error:e,loading:n,logout:l,login:c}},QS=I.createContext();function pj({children:e,value:t}){return u.jsx(QS.Provider,{value:t,children:e})}function Ou(){return I.useContext(QS)}var JS={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},wy=Se.createContext&&Se.createContext(JS),Lr=globalThis&&globalThis.__assign||function(){return Lr=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},Lr.apply(this,arguments)},mj=globalThis&&globalThis.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};function XS(e){return e&&e.map(function(t,n){return Se.createElement(t.tag,Lr({key:n},t.attr),XS(t.child))})}function pm(e){return function(t){return Se.createElement(gj,Lr({attr:Lr({},e.attr)},t),XS(e.child))}}function gj(e){var t=function(n){var r=e.attr,o=e.size,i=e.title,s=mj(e,["attr","size","title"]),a=o||n.size||"1em",l;return n.className&&(l=n.className),e.className&&(l=(l?l+" ":"")+e.className),Se.createElement("svg",Lr({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},n.attr,r,s,{className:l,style:Lr(Lr({color:e.color||n.color},n.style),e.style),height:a,width:a,xmlns:"http://www.w3.org/2000/svg"}),i&&Se.createElement("title",null,i),e.children)};return wy!==void 0?Se.createElement(wy.Consumer,null,function(n){return t(n)}):t(JS)}function vj(e){return pm({tag:"svg",attr:{viewBox:"0 0 496 512"},child:[{tag:"path",attr:{d:"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"}}]})(e)}function yj(e){return pm({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"}}]})(e)}function wj(e){return pm({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"}}]})(e)}var YS={exports:{}};(function(e,t){(function(n,r){e.exports=r()})(kn,function(){return function(n){function r(i){if(o[i])return o[i].exports;var s=o[i]={exports:{},id:i,loaded:!1};return n[i].call(s.exports,s,s.exports,r),s.loaded=!0,s.exports}var o={};return r.m=n,r.c=o,r.p="dist/",r(0)}([function(n,r,o){function i(V){return V&&V.__esModule?V:{default:V}}var s=Object.assign||function(V){for(var K=1;K<arguments.length;K++){var re=arguments[K];for(var ye in re)Object.prototype.hasOwnProperty.call(re,ye)&&(V[ye]=re[ye])}return V},a=o(1),l=(i(a),o(6)),c=i(l),d=o(7),h=i(d),f=o(8),g=i(f),y=o(9),w=i(y),C=o(10),m=i(C),p=o(11),v=i(p),b=o(14),k=i(b),P=[],R=!1,T={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,startEvent:"DOMContentLoaded",throttleDelay:99,debounceDelay:50,disableMutationObserver:!1},Q=function(){var V=arguments.length>0&&arguments[0]!==void 0&&arguments[0];if(V&&(R=!0),R)return P=(0,v.default)(P,T),(0,m.default)(P,T.once),P},A=function(){P=(0,k.default)(),Q()},_=function(){P.forEach(function(V,K){V.node.removeAttribute("data-aos"),V.node.removeAttribute("data-aos-easing"),V.node.removeAttribute("data-aos-duration"),V.node.removeAttribute("data-aos-delay")})},O=function(V){return V===!0||V==="mobile"&&w.default.mobile()||V==="phone"&&w.default.phone()||V==="tablet"&&w.default.tablet()||typeof V=="function"&&V()===!0},W=function(V){T=s(T,V),P=(0,k.default)();var K=document.all&&!window.atob;return O(T.disable)||K?_():(T.disableMutationObserver||g.default.isSupported()||(console.info(`
      aos: MutationObserver is not supported on this browser,
      code mutations observing has been disabled.
      You may have to call "refreshHard()" by yourself.
    `),T.disableMutationObserver=!0),document.querySelector("body").setAttribute("data-aos-easing",T.easing),document.querySelector("body").setAttribute("data-aos-duration",T.duration),document.querySelector("body").setAttribute("data-aos-delay",T.delay),T.startEvent==="DOMContentLoaded"&&["complete","interactive"].indexOf(document.readyState)>-1?Q(!0):T.startEvent==="load"?window.addEventListener(T.startEvent,function(){Q(!0)}):document.addEventListener(T.startEvent,function(){Q(!0)}),window.addEventListener("resize",(0,h.default)(Q,T.debounceDelay,!0)),window.addEventListener("orientationchange",(0,h.default)(Q,T.debounceDelay,!0)),window.addEventListener("scroll",(0,c.default)(function(){(0,m.default)(P,T.once)},T.throttleDelay)),T.disableMutationObserver||g.default.ready("[data-aos]",A),P)};n.exports={init:W,refresh:Q,refreshHard:A}},function(n,r){},,,,,function(n,r){(function(o){function i(O,W,V){function K(oe){var ge=N,Ae=F;return N=F=void 0,ke=oe,X=O.apply(Ae,ge)}function re(oe){return ke=oe,ne=setTimeout(S,W),ue?K(oe):X}function ye(oe){var ge=oe-de,Ae=oe-ke,Ze=W-ge;return Te?A(Ze,q-Ae):Ze}function D(oe){var ge=oe-de,Ae=oe-ke;return de===void 0||ge>=W||ge<0||Te&&Ae>=q}function S(){var oe=_();return D(oe)?x(oe):void(ne=setTimeout(S,ye(oe)))}function x(oe){return ne=void 0,me&&N?K(oe):(N=F=void 0,X)}function j(){ne!==void 0&&clearTimeout(ne),ke=0,N=de=F=ne=void 0}function L(){return ne===void 0?X:x(_())}function E(){var oe=_(),ge=D(oe);if(N=arguments,F=this,de=oe,ge){if(ne===void 0)return re(de);if(Te)return ne=setTimeout(S,W),K(de)}return ne===void 0&&(ne=setTimeout(S,W)),X}var N,F,q,X,ne,de,ke=0,ue=!1,Te=!1,me=!0;if(typeof O!="function")throw new TypeError(f);return W=d(W)||0,a(V)&&(ue=!!V.leading,Te="maxWait"in V,q=Te?Q(d(V.maxWait)||0,W):q,me="trailing"in V?!!V.trailing:me),E.cancel=j,E.flush=L,E}function s(O,W,V){var K=!0,re=!0;if(typeof O!="function")throw new TypeError(f);return a(V)&&(K="leading"in V?!!V.leading:K,re="trailing"in V?!!V.trailing:re),i(O,W,{leading:K,maxWait:W,trailing:re})}function a(O){var W=typeof O>"u"?"undefined":h(O);return!!O&&(W=="object"||W=="function")}function l(O){return!!O&&(typeof O>"u"?"undefined":h(O))=="object"}function c(O){return(typeof O>"u"?"undefined":h(O))=="symbol"||l(O)&&T.call(O)==y}function d(O){if(typeof O=="number")return O;if(c(O))return g;if(a(O)){var W=typeof O.valueOf=="function"?O.valueOf():O;O=a(W)?W+"":W}if(typeof O!="string")return O===0?O:+O;O=O.replace(w,"");var V=m.test(O);return V||p.test(O)?v(O.slice(2),V?2:8):C.test(O)?g:+O}var h=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(O){return typeof O}:function(O){return O&&typeof Symbol=="function"&&O.constructor===Symbol&&O!==Symbol.prototype?"symbol":typeof O},f="Expected a function",g=NaN,y="[object Symbol]",w=/^\s+|\s+$/g,C=/^[-+]0x[0-9a-f]+$/i,m=/^0b[01]+$/i,p=/^0o[0-7]+$/i,v=parseInt,b=(typeof o>"u"?"undefined":h(o))=="object"&&o&&o.Object===Object&&o,k=(typeof self>"u"?"undefined":h(self))=="object"&&self&&self.Object===Object&&self,P=b||k||Function("return this")(),R=Object.prototype,T=R.toString,Q=Math.max,A=Math.min,_=function(){return P.Date.now()};n.exports=s}).call(r,function(){return this}())},function(n,r){(function(o){function i(_,O,W){function V(me){var oe=E,ge=N;return E=N=void 0,de=me,q=_.apply(ge,oe)}function K(me){return de=me,X=setTimeout(D,O),ke?V(me):q}function re(me){var oe=me-ne,ge=me-de,Ae=O-oe;return ue?Q(Ae,F-ge):Ae}function ye(me){var oe=me-ne,ge=me-de;return ne===void 0||oe>=O||oe<0||ue&&ge>=F}function D(){var me=A();return ye(me)?S(me):void(X=setTimeout(D,re(me)))}function S(me){return X=void 0,Te&&E?V(me):(E=N=void 0,q)}function x(){X!==void 0&&clearTimeout(X),de=0,E=ne=N=X=void 0}function j(){return X===void 0?q:S(A())}function L(){var me=A(),oe=ye(me);if(E=arguments,N=this,ne=me,oe){if(X===void 0)return K(ne);if(ue)return X=setTimeout(D,O),V(ne)}return X===void 0&&(X=setTimeout(D,O)),q}var E,N,F,q,X,ne,de=0,ke=!1,ue=!1,Te=!0;if(typeof _!="function")throw new TypeError(h);return O=c(O)||0,s(W)&&(ke=!!W.leading,ue="maxWait"in W,F=ue?T(c(W.maxWait)||0,O):F,Te="trailing"in W?!!W.trailing:Te),L.cancel=x,L.flush=j,L}function s(_){var O=typeof _>"u"?"undefined":d(_);return!!_&&(O=="object"||O=="function")}function a(_){return!!_&&(typeof _>"u"?"undefined":d(_))=="object"}function l(_){return(typeof _>"u"?"undefined":d(_))=="symbol"||a(_)&&R.call(_)==g}function c(_){if(typeof _=="number")return _;if(l(_))return f;if(s(_)){var O=typeof _.valueOf=="function"?_.valueOf():_;_=s(O)?O+"":O}if(typeof _!="string")return _===0?_:+_;_=_.replace(y,"");var W=C.test(_);return W||m.test(_)?p(_.slice(2),W?2:8):w.test(_)?f:+_}var d=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(_){return typeof _}:function(_){return _&&typeof Symbol=="function"&&_.constructor===Symbol&&_!==Symbol.prototype?"symbol":typeof _},h="Expected a function",f=NaN,g="[object Symbol]",y=/^\s+|\s+$/g,w=/^[-+]0x[0-9a-f]+$/i,C=/^0b[01]+$/i,m=/^0o[0-7]+$/i,p=parseInt,v=(typeof o>"u"?"undefined":d(o))=="object"&&o&&o.Object===Object&&o,b=(typeof self>"u"?"undefined":d(self))=="object"&&self&&self.Object===Object&&self,k=v||b||Function("return this")(),P=Object.prototype,R=P.toString,T=Math.max,Q=Math.min,A=function(){return k.Date.now()};n.exports=i}).call(r,function(){return this}())},function(n,r){function o(d){var h=void 0,f=void 0;for(h=0;h<d.length;h+=1)if(f=d[h],f.dataset&&f.dataset.aos||f.children&&o(f.children))return!0;return!1}function i(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}function s(){return!!i()}function a(d,h){var f=window.document,g=i(),y=new g(l);c=h,y.observe(f.documentElement,{childList:!0,subtree:!0,removedNodes:!0})}function l(d){d&&d.forEach(function(h){var f=Array.prototype.slice.call(h.addedNodes),g=Array.prototype.slice.call(h.removedNodes),y=f.concat(g);if(o(y))return c()})}Object.defineProperty(r,"__esModule",{value:!0});var c=function(){};r.default={isSupported:s,ready:a}},function(n,r){function o(f,g){if(!(f instanceof g))throw new TypeError("Cannot call a class as a function")}function i(){return navigator.userAgent||navigator.vendor||window.opera||""}Object.defineProperty(r,"__esModule",{value:!0});var s=function(){function f(g,y){for(var w=0;w<y.length;w++){var C=y[w];C.enumerable=C.enumerable||!1,C.configurable=!0,"value"in C&&(C.writable=!0),Object.defineProperty(g,C.key,C)}}return function(g,y,w){return y&&f(g.prototype,y),w&&f(g,w),g}}(),a=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,l=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,c=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,d=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,h=function(){function f(){o(this,f)}return s(f,[{key:"phone",value:function(){var g=i();return!(!a.test(g)&&!l.test(g.substr(0,4)))}},{key:"mobile",value:function(){var g=i();return!(!c.test(g)&&!d.test(g.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}}]),f}();r.default=new h},function(n,r){Object.defineProperty(r,"__esModule",{value:!0});var o=function(s,a,l){var c=s.node.getAttribute("data-aos-once");a>s.position?s.node.classList.add("aos-animate"):typeof c<"u"&&(c==="false"||!l&&c!=="true")&&s.node.classList.remove("aos-animate")},i=function(s,a){var l=window.pageYOffset,c=window.innerHeight;s.forEach(function(d,h){o(d,c+l,a)})};r.default=i},function(n,r,o){function i(c){return c&&c.__esModule?c:{default:c}}Object.defineProperty(r,"__esModule",{value:!0});var s=o(12),a=i(s),l=function(c,d){return c.forEach(function(h,f){h.node.classList.add("aos-init"),h.position=(0,a.default)(h.node,d.offset)}),c};r.default=l},function(n,r,o){function i(c){return c&&c.__esModule?c:{default:c}}Object.defineProperty(r,"__esModule",{value:!0});var s=o(13),a=i(s),l=function(c,d){var h=0,f=0,g=window.innerHeight,y={offset:c.getAttribute("data-aos-offset"),anchor:c.getAttribute("data-aos-anchor"),anchorPlacement:c.getAttribute("data-aos-anchor-placement")};switch(y.offset&&!isNaN(y.offset)&&(f=parseInt(y.offset)),y.anchor&&document.querySelectorAll(y.anchor)&&(c=document.querySelectorAll(y.anchor)[0]),h=(0,a.default)(c).top,y.anchorPlacement){case"top-bottom":break;case"center-bottom":h+=c.offsetHeight/2;break;case"bottom-bottom":h+=c.offsetHeight;break;case"top-center":h+=g/2;break;case"bottom-center":h+=g/2+c.offsetHeight;break;case"center-center":h+=g/2+c.offsetHeight/2;break;case"top-top":h+=g;break;case"bottom-top":h+=c.offsetHeight+g;break;case"center-top":h+=c.offsetHeight/2+g}return y.anchorPlacement||y.offset||isNaN(d)||(f=d),h+f};r.default=l},function(n,r){Object.defineProperty(r,"__esModule",{value:!0});var o=function(i){for(var s=0,a=0;i&&!isNaN(i.offsetLeft)&&!isNaN(i.offsetTop);)s+=i.offsetLeft-(i.tagName!="BODY"?i.scrollLeft:0),a+=i.offsetTop-(i.tagName!="BODY"?i.scrollTop:0),i=i.offsetParent;return{top:a,left:s}};r.default=o},function(n,r){Object.defineProperty(r,"__esModule",{value:!0});var o=function(i){return i=i||document.querySelectorAll("[data-aos]"),Array.prototype.map.call(i,function(s){return{node:s}})};r.default=o}])})})(YS);var Ej=YS.exports;const Ey=Ac(Ej);const Sj="/Chatbot-educacional/assets/codeVar3-1e36b70b.png",xj="/Chatbot-educacional/assets/codeArit2-db1d2ee8.png",_j="/Chatbot-educacional/assets/codeCond2-ff34f0a3.png",bj="/Chatbot-educacional/assets/codeRep2-5f1bce92.png",Sy="/Chatbot-educacional/assets/home_bg_form-83f9070d.png",Cj="_homeContainer_10o82_11",Ij="_content_10o82_23",kj="_home_image_10o82_70",Tj="_home_image2_10o82_84",Oj="_sub_content_10o82_102",Pj="_texts_10o82_130",Nj="_spantext_10o82_175",Aj="_texts_button_10o82_179",jj="_reveal_10o82_1",Rj="_startbutton2_10o82_229",Mj="_description_10o82_256",Lj="_startButton_10o82_263",Dj="_exampleContainer_10o82_294",$j="_titleExem_10o82_302",Fj="_divParagrafos_10o82_308",zj="_pExem_10o82_319",Uj="_pExem2_10o82_327",Vj="_strongPara1_10o82_335",Bj="_strongPara2_10o82_346",Wj="_strongLi_10o82_356",qj="_exampleImages_10o82_361",Hj="_example_10o82_294",Gj="_exampleImage_10o82_361",Kj="_exampleTitle_10o82_378",Qj="_exampleDescription_10o82_384",Jj="_sessionTitle_10o82_410",Xj="_lastContainer_10o82_419",Yj="_titleContainer_10o82_431",Zj="_itens_10o82_465",eR="_componenteImagemTexto_10o82_483",tR="_imagemContainer_10o82_501",nR="_infoContainer_10o82_532",rR="_itemTitle_10o82_549",oR="_itemDesc_10o82_559",iR="_textoContainer_10o82_589",sR="_numeroContainer_10o82_593",aR="_circle_num_10o82_610",lR="_finalContainer_10o82_640",cR="_contentTexts_10o82_657",uR="_primaryText_10o82_673",dR="_secondText_10o82_688",hR="_circleBottom_10o82_721",fR="_iconOnBottom_10o82_743",ee={homeContainer:Cj,content:Ij,home_image:kj,home_image2:Tj,sub_content:Oj,texts:Pj,spantext:Nj,texts_button:Aj,reveal:jj,startbutton2:Rj,description:Mj,startButton:Lj,exampleContainer:Dj,titleExem:$j,divParagrafos:Fj,pExem:zj,pExem2:Uj,strongPara1:Vj,strongPara2:Bj,strongLi:Wj,exampleImages:qj,example:Hj,exampleImage:Gj,exampleTitle:Kj,exampleDescription:Qj,sessionTitle:Jj,lastContainer:Xj,titleContainer:Yj,itens:Zj,componenteImagemTexto:eR,imagemContainer:tR,infoContainer:nR,itemTitle:rR,itemDesc:oR,textoContainer:iR,numeroContainer:sR,circle_num:aR,finalContainer:lR,contentTexts:cR,primaryText:uR,secondText:dR,circleBottom:hR,iconOnBottom:fR},pR=()=>(I.useEffect(()=>{Ey.init(),Ey.refresh()},[]),u.jsxs("div",{className:ee.homeContainer,children:[u.jsxs("div",{className:ee.home_image,children:[u.jsx("img",{src:Sy,alt:"Forma para estilização"}),u.jsx("img",{className:ee.home_image2,src:Sy,alt:"Forma para estilização2"})]}),u.jsxs("div",{className:ee.content,children:[u.jsx("h1",{className:ee.title,"data-aos":"zoom-out","data-aos-duration":"1500",children:"CoderBot"}),u.jsxs("p",{className:ee.description,"data-aos":"zoom-out","data-aos-duration":"1500","data-aos-delay":"250",children:["Desperte o potencial dos programadores do futuro com o CoderBot - ",u.jsx("span",{children:"A chave para o sucesso."})]}),u.jsx(_l,{to:"/chat",className:ee.startButton,"data-aos":"zoom-out","data-aos-duration":"1500","data-aos-delay":"350",children:"Iniciar"})]}),u.jsxs("div",{className:ee.sub_content,children:[u.jsx("h2",{children:"Aqui você vai..."}),u.jsx("div",{className:ee.texts,children:u.jsxs("h1",{children:[u.jsx("span",{"data-aos":"fade-up","data-aos-duration":"1500","data-aos-anchorPlacement":"center-center",children:"Conhecer"}),u.jsx("span",{"data-aos":"fade-up","data-aos-duration":"1500","data-aos-anchorPlacement":"center-center",children:"Aprender"}),u.jsx("span",{className:ee.spantext,"data-aos":"fade-up","data-aos-duration":"1500","data-aos-anchorPlacement":"center-center",children:"Desenvolver"})]})}),u.jsxs("div",{className:ee.texts_button,children:[u.jsx("h2",{"data-aos":"fade-up","data-aos-duration":"800",children:"Sua jornada para o mundo da programação inicia aqui."}),u.jsx(_l,{to:"/chat",className:ee.startbutton2,"data-aos":"fade-up","data-aos-duration":"800","data-aos-delay":"200",children:u.jsx("p",{children:"Começar"})})]})]}),u.jsxs("div",{className:ee.lastContainer,children:[u.jsxs("div",{className:ee.titleContainer,children:[u.jsx("span",{children:"Confira também..."}),u.jsx("h2",{children:"Conteúdos Abordados"})]}),u.jsxs("div",{className:ee.itens,children:[u.jsxs("div",{className:ee.componenteImagemTexto,"data-aos":"fade-up","data-aos-duration":"1000",children:[u.jsx("div",{className:`${ee.imagemContainer} ${ee.image}`,children:u.jsx("img",{src:Sj,alt:"Imagem"})}),u.jsxs("div",{className:ee.infoContainer,children:[u.jsx("div",{className:ee.itemTitle,children:u.jsx("h2",{children:"Variáveis"})}),u.jsx("div",{className:ee.itemDesc,children:u.jsx("p",{children:"Como declarar variáveis e uso de atribuição de valores"})})]}),u.jsx("div",{className:ee.numeroContainer,children:u.jsx("div",{className:ee.circle_num,children:u.jsx("h2",{children:"01"})})})]}),u.jsxs("div",{className:ee.componenteImagemTexto,"data-aos":"fade-up","data-aos-duration":"1000",children:[u.jsx("div",{className:`${ee.imagemContainer} ${ee.image}`,children:u.jsx("img",{src:xj,alt:"Imagem"})}),u.jsxs("div",{className:ee.infoContainer,children:[u.jsx("div",{className:ee.itemTitle,children:u.jsx("h2",{children:"Expressão aritmética"})}),u.jsx("div",{className:ee.itemDesc,children:u.jsx("p",{children:"Desenvolvimento de cálculos aritméticos"})})]}),u.jsx("div",{className:ee.numeroContainer,children:u.jsx("div",{className:ee.circle_num,children:u.jsx("h2",{children:"02"})})})]}),u.jsxs("div",{className:ee.componenteImagemTexto,"data-aos":"fade-up","data-aos-duration":"1000",children:[u.jsx("div",{className:`${ee.imagemContainer} ${ee.image}`,children:u.jsx("img",{src:_j,alt:"Imagem"})}),u.jsxs("div",{className:ee.infoContainer,children:[u.jsx("div",{className:ee.itemTitle,children:u.jsx("h2",{children:"Estruturas condicionais"})}),u.jsx("div",{className:ee.itemDesc,children:u.jsx("p",{children:"Uso de estruturas para definição de caminho condicionais"})})]}),u.jsx("div",{className:ee.numeroContainer,children:u.jsx("div",{className:ee.circle_num,children:u.jsx("h2",{children:"03"})})})]}),u.jsxs("div",{className:ee.componenteImagemTexto,"data-aos":"fade-up","data-aos-duration":"1000",children:[u.jsx("div",{className:`${ee.imagemContainer} ${ee.image}`,children:u.jsx("img",{src:bj,alt:"Imagem"})}),u.jsxs("div",{className:ee.infoContainer,children:[u.jsx("div",{className:ee.itemTitle,children:u.jsx("h2",{children:"Laços de repetição"})}),u.jsx("div",{className:ee.itemDesc,children:u.jsx("p",{children:"Aplicação de laços para execução de uma ou mais vezes determinados trechos de código"})})]}),u.jsx("div",{className:ee.numeroContainer,children:u.jsx("div",{className:ee.circle_num,children:u.jsx("h2",{children:"04"})})})]})]})]}),u.jsx("div",{className:ee.finalContainer,children:u.jsxs("div",{className:ee.contentTexts,children:[u.jsxs("div",{className:ee.primaryText,children:[u.jsx("h2",{children:"VEM APRENDER COM A GENTE"}),u.jsx("h2",{children:"CoderBot 2023©"})]}),u.jsx("div",{className:ee.secondText,children:u.jsxs("h2",{children:[u.jsx("span",{"data-aos":"zoom-out","data-aos-duration":"1500","data-aos-anchorPlacement":"center-center",children:"Entre"})," ",u.jsx("br",{}),u.jsx("span",{"data-aos":"zoom-out","data-aos-duration":"1500","data-aos-anchorPlacement":"center-center",children:"Treine"})," ",u.jsx("br",{}),u.jsx("span",{"data-aos":"zoom-out","data-aos-duration":"1500","data-aos-anchorPlacement":"center-center",children:"Junte-se"})]})}),u.jsx(_l,{to:"/chat",className:ee.circleBottom,children:u.jsx("div",{className:ee.iconOnBottom,"data-aos":"fade-right","data-aos-duration":"1000",children:u.jsx("svg",{children:u.jsx(yj,{})})})})]})})]})),mR="_aboutContainer_1y5x9_1",gR={aboutContainer:mR},vR=()=>u.jsxs("div",{className:gR.aboutContainer,children:[u.jsx("h1",{children:"Sobre o Chatbot CoderBot"}),u.jsx("p",{children:"Bem-vindo ao chatbot CoderBot! O CoderBot tempo por objetivo aplicar o uso de Aprendizagem Baseada em Exemplos (métodologia ativa)  no apoio à aprendizagem de programação"}),u.jsxs("p",{children:["Por meio de exemplos construidos com apoio e adaptação de um template realizado pelo estudo ",u.jsxs("strong",{children:['"',u.jsx("a",{href:"",children:"Projeto e Avaliação de um Template de Worked Exemplos para o Ensino de Programação"}),'"']}),",  o chatbot fornece um apoio e feedback quase instantâneo para as dúvidas de iniciantes em programação."]}),u.jsx("h2",{children:"Exemplos Corretos e Incorretos"}),u.jsxs("p",{children:["Diante do pressuposto que a habilidade de resolução de problemas se dá pela formação de mapas mentais, conhecer exemplos corretos e incorretos auxilia o aprendiz a possuir um ",u.jsx("i",{children:"background"})," mais completo para definir seus modelos mentais."]}),u.jsx("h2",{children:"O que você vai aprender aqui?"}),u.jsx("p",{children:"Atualmente o projeto se encontra em desenvolvimento (pesquisa), sendo realizado por pesquisadores de pós graduação e graduação, sob orientação dos docentes responsáveis. O intuito é criar uma base de exemplos com conteúdos que apoie os passos de iniciantes em programação nos mais diversos conteúdos, tais como, variáveis, constantes, estruturas condicionais, laços de repetição, matrizes, estruturas, funções, dentre varios outros assuntos."}),u.jsx("h2",{children:"Como usar o chatbot?"}),u.jsx("p",{children:"Basta acessar o link chat disponibilizada na barra de navegação no topo desse website, a partir de lá o CoderBot irá te orientar a selecionar os botões que pode utilizar para obter os conhecimentos desejados."}),u.jsx("h2",{children:"Feedback a qualquer momento e quando precisar"}),u.jsx("p",{children:"Por se tratar de um sistema web, uma das principais vantagens de utilização é a possibilidade de acessar de um navegador de internet em qualquer lugar que você esteja, podendo ter a flexibilidade de acesso de acordo o horário do aprendiz."}),u.jsx("p",{children:"Estamos animados para apoiar sua jornada de aprendizado em programação e esperamos que você aproveite ao máximo o auxílio de nossa ferramenta."}),u.jsx("p",{children:"Bons estudos! O CoderBot lhe aguarda... Vamos aos códigos!"})]}),yR={loading:!1,error:null},wR=(e,t)=>{switch(t.type){case"LOADING":return{loading:!0,error:null};case"SUCCESS":return{loading:!1,error:null};case"ERROR":return{loading:!1,error:t.payload};default:return e}},Pu=e=>{const[t,n]=I.useReducer(wR,yR),[r,o]=I.useState(!1),i=a=>{r||n(a)},s=async a=>{try{i({type:"LOADING"});const l={...a,createdAt:Zt.now()},c=await V2(k2(fj,e),l);i({type:"SUCCESS",payload:c})}catch(l){i({type:"ERROR",payload:l})}};return I.useEffect(()=>()=>o(!0),[]),{insertDocument:s,response:t}},ER="_navbar_q47r0_7",SR="_brand_q47r0_27",xR="_links_list_q47r0_40",_R="_links_list_right_q47r0_97",bR="_bottom_entrar_q47r0_114",CR="_bottom_cadastrar_q47r0_118",IR="_container_name_user_q47r0_147",kR="_bottom_sair_q47r0_161",TR="_active_q47r0_87",OR="_mobile_q47r0_176",PR="_scrolled_q47r0_304",It={navbar:ER,brand:SR,links_list:xR,links_list_right:_R,bottom_entrar:bR,bottom_cadastrar:CR,container_name_user:IR,bottom_sair:kR,active:TR,mobile:OR,scrolled:PR};function NR({clicks:e,local:t,loginTime:n}){const{user:r}=Ou(),{logout:o}=Tu();Se.useState(!1);const[i,s]=Se.useState(!1),[a,l]=Se.useState(!1),{insertDocument:c}=Pu("metrics-users"),d=async()=>{l(!0);try{let f=new Date;console.log("Login time:",n),console.log("Logout time:",f);let y=(f-n)/(1e3*60);console.log(`O usuário ficou na aplicação por ${y} minutos.`);const w={uid:r.uid,createdBy:r.displayName,timeInMinutes:y,totalClicks:e,localClicks:t,turma:localStorage.getItem("turmaEscolhida")};await c(w),console.log("Documento inserido com sucesso:",w),o()}catch(f){console.error("Erro ao inserir documento:",f)}finally{l(!1)}},h=()=>{s(!i)};return u.jsxs("nav",{className:It.navbar,children:[u.jsx(cn,{to:"/",className:It.brand,children:"CoderBot"}),u.jsxs("ul",{className:`${It.links_list} ${i?It.active:""}`,children:[u.jsx("li",{children:u.jsx(cn,{to:"/",className:({isActive:f})=>f?It.active:"",children:"Home"})}),r&&u.jsx(u.Fragment,{children:u.jsx("li",{children:u.jsx(cn,{to:"/chat",className:({isActive:f})=>f?It.active:"",children:"Chat"})})}),u.jsx("li",{children:u.jsx(cn,{to:"/about",className:({isActive:f})=>f?It.active:"",children:"Sobre"})}),u.jsx("li",{children:u.jsx(cn,{to:"/researchers",className:({isActive:f})=>f?It.active:"",children:"Pesquisadores"})})]}),u.jsx("ul",{className:It.links_list_right,children:r?u.jsxs("li",{className:It.container_name_user,children:[u.jsx("span",{style:{paddingRight:"25px"},children:r.displayName}),u.jsx(cn,{className:It.bottom_sair,onClick:d,children:"Sair"})]}):u.jsxs(u.Fragment,{children:[u.jsx("li",{className:It.bottom_entrar,children:u.jsx(cn,{to:"/login",className:({isActive:f})=>f?It.active:"",children:"Entrar"})}),u.jsx("li",{className:It.bottom_cadastrar,children:u.jsx(cn,{to:"/register",className:({isActive:f})=>f?It.active:"",children:"Cadastrar"})})]})}),u.jsx("div",{className:It.mobile,onClick:h,children:u.jsx("i",{id:"bar",className:i?"fas fa-times":"fas fa-bars"})})]})}const AR="_contactContainer_1gzjx_1",jR="_container_1gzjx_9",RR="_topContainer_1gzjx_19",MR="_bottomContainer_1gzjx_35",LR="_contactForm_1gzjx_45",DR="_imageContact_1gzjx_115",$R="_contactInfoMain_1gzjx_128",FR="_contactInfo_1gzjx_128",Jr={contactContainer:AR,container:jR,topContainer:RR,bottomContainer:MR,contactForm:LR,imageContact:DR,contactInfoMain:$R,contactInfo:FR};var ZS={exports:{}},zR="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",UR=zR,VR=UR;function ex(){}function tx(){}tx.resetWarningCache=ex;var BR=function(){function e(r,o,i,s,a,l){if(l!==VR){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}e.isRequired=e;function t(){return e}var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:tx,resetWarningCache:ex};return n.PropTypes=n,n};ZS.exports=BR();var mm=ZS.exports;const WR=Ac(mm),qR="_button_1e68s_1",HR={button:qR},nx=({children:e})=>u.jsx("button",{className:HR.button,children:e});nx.propTypes={children:WR.node.isRequired};const GR="/Chatbot-educacional/assets/contact_image3-66621276.svg",KR="_arrow_13hff_1",QR={arrow:KR},JR=()=>u.jsx("div",{className:QR.arrow}),XR=()=>(I.useState({name:"",email:"",message:""}),u.jsxs("div",{className:Jr.contactContainer,children:[u.jsxs("div",{className:Jr.topContainer,children:[u.jsx("span",{children:u.jsx("p",{children:"Envie-nos um email"})}),u.jsx("p",{children:"Para informar bugs ou sugestões"})]}),u.jsxs("div",{className:Jr.bottomContainer,children:[u.jsxs("div",{className:Jr.contactForm,children:[u.jsx("h2",{children:"Contato"}),u.jsxs("form",{children:[u.jsxs("label",{children:[u.jsx("span",{children:"Nome: "}),u.jsx("input",{type:"text",id:"name",name:"name",placeholder:"Nome completo",required:!0})]}),u.jsxs("label",{children:[u.jsx("span",{children:"E-mail: "}),u.jsx("input",{type:"email",id:"email",name:"email",placeholder:"E-mail para contato",required:!0})]}),u.jsxs("label",{children:[u.jsx("span",{children:"Mensagem: "}),u.jsx("textarea",{id:"message",name:"message",placeholder:"Digite sua mensagem aqui...",required:!0})]}),u.jsx(nx,{children:"Enviar"})]})]}),u.jsx("div",{className:Jr.imageContact,children:u.jsx("img",{src:GR,alt:"Um celular e duas pessoas, demonstrando o ato de comunicação um com o outro."})})]}),u.jsx(JR,{}),u.jsx("div",{className:Jr.contactInfoMain,children:u.jsx("div",{className:Jr.contactInfo,children:"Você pode nos encontrar tambem..."})})]})),YR="_login_16ves_1",ZR="_lgBtn_16ves_60",eM="_error_16ves_82",tM="_googleBtn_16ves_90",nM="_lineWithText_16ves_107",rM="_line_16ves_107",oM="_text_16ves_120",fr={login:YR,lgBtn:ZR,error:eM,googleBtn:tM,lineWithText:nM,line:rM,text:oM};var rx={},Nu={},Au={},gt={};Object.defineProperty(gt,"__esModule",{value:!0});gt.disabledIconStyle=gt.disabledStyle=gt.hoverStyle=gt.svgStyle=gt.iconStyle=gt.lightStyle=gt.darkStyle=void 0;function xy(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function ox(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?xy(Object(n),!0).forEach(function(r){iM(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):xy(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function iM(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ix={height:"50px",width:"240px",border:"none",textAlign:"center",verticalAlign:"center",boxShadow:"0 2px 4px 0 rgba(0,0,0,.25)",fontSize:"16px",lineHeight:"48px",display:"block",borderRadius:"1px",transition:"background-color .218s, border-color .218s, box-shadow .218s",fontFamily:"Roboto,arial,sans-serif",cursor:"pointer",userSelect:"none"},sM=ox({backgroundColor:"#4285f4",color:"#fff"},ix);gt.darkStyle=sM;var aM=ox({backgroundColor:"#fff",color:"rgba(0,0,0,.54)"},ix);gt.lightStyle=aM;var lM={width:"48px",height:"48px",textAlign:"center",verticalAlign:"center",display:"block",marginTop:"1px",marginLeft:"1px",float:"left",backgroundColor:"#fff",borderRadius:"1px",whiteSpace:"nowrap"};gt.iconStyle=lM;var cM={width:"48px",height:"48px",display:"block"};gt.svgStyle=cM;var uM={boxShadow:"0 0 3px 3px rgba(66,133,244,.3)",transition:"background-color .218s, border-color .218s, box-shadow .218s"};gt.hoverStyle=uM;var dM={backgroundColor:"rgba(37, 5, 5, .08)",color:"rgba(0, 0, 0, .40)",cursor:"not-allowed"};gt.disabledStyle=dM;var hM={backgroundColor:"transparent"};gt.disabledIconStyle=hM;Object.defineProperty(Au,"__esModule",{value:!0});Au.GoogleIcon=void 0;var z=sx(I),_y=sx(mm),fi=gt;function sx(e){return e&&e.__esModule?e:{default:e}}function by(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function fM(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?by(Object(n),!0).forEach(function(r){pM(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):by(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function pM(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var mM=z.default.createElement("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",width:"46px",height:"46px",viewBox:"0 0 46 46",style:fi.svgStyle},z.default.createElement("defs",null,z.default.createElement("filter",{x:"-50%",y:"-50%",width:"200%",height:"200%",filterUnits:"objectBoundingBox",id:"filter-1"},z.default.createElement("feOffset",{dx:"0",dy:"1",in:"SourceAlpha",result:"shadowOffsetOuter1"}),z.default.createElement("feGaussianBlur",{stdDeviation:"0.5",in:"shadowOffsetOuter1",result:"shadowBlurOuter1"}),z.default.createElement("feColorMatrix",{values:"0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.168 0",in:"shadowBlurOuter1",type:"matrix",result:"shadowMatrixOuter1"}),z.default.createElement("feOffset",{dx:"0",dy:"0",in:"SourceAlpha",result:"shadowOffsetOuter2"}),z.default.createElement("feGaussianBlur",{stdDeviation:"0.5",in:"shadowOffsetOuter2",result:"shadowBlurOuter2"}),z.default.createElement("feColorMatrix",{values:"0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.084 0",in:"shadowBlurOuter2",type:"matrix",result:"shadowMatrixOuter2"}),z.default.createElement("feMerge",null,z.default.createElement("feMergeNode",{in:"shadowMatrixOuter1"}),z.default.createElement("feMergeNode",{in:"shadowMatrixOuter2"}),z.default.createElement("feMergeNode",{in:"SourceGraphic"}))),z.default.createElement("rect",{id:"path-2",x:"0",y:"0",width:"40",height:"40",rx:"2"}),z.default.createElement("rect",{id:"path-3",x:"5",y:"5",width:"38",height:"38",rx:"1"})),z.default.createElement("g",{id:"Google-Button",stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},z.default.createElement("g",{id:"9-PATCH",transform:"translate(-608.000000, -219.000000)"}),z.default.createElement("g",{id:"btn_google_dark_normal",transform:"translate(-1.000000, -1.000000)"},z.default.createElement("g",{id:"button",transform:"translate(4.000000, 4.000000)",filter:"url(#filter-1)"},z.default.createElement("g",{id:"button-bg"},z.default.createElement("use",{fill:"#4285F4",fillRule:"evenodd"}),z.default.createElement("use",{fill:"none"}),z.default.createElement("use",{fill:"none"}),z.default.createElement("use",{fill:"none"}))),z.default.createElement("g",{id:"button-bg-copy"},z.default.createElement("use",{fill:"#FFFFFF",fillRule:"evenodd"}),z.default.createElement("use",{fill:"none"}),z.default.createElement("use",{fill:"none"}),z.default.createElement("use",{fill:"none"})),z.default.createElement("g",{id:"logo_googleg_48dp",transform:"translate(15.000000, 15.000000)"},z.default.createElement("path",{d:"M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 L17.64,9.20454545 Z",id:"Shape",fill:"#4285F4"}),z.default.createElement("path",{d:"M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 L9,18 Z",id:"Shape",fill:"#34A853"}),z.default.createElement("path",{d:"M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 L3.96409091,10.71 Z",id:"Shape",fill:"#FBBC05"}),z.default.createElement("path",{d:"M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 L9,3.57954545 Z",id:"Shape",fill:"#EA4335"}),z.default.createElement("path",{d:"M0,0 L18,0 L18,18 L0,18 L0,0 Z",id:"Shape"})),z.default.createElement("g",{id:"handles_square"})))),gM=z.default.createElement("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",width:"46px",height:"46px",viewBox:"0 0 46 46",style:fi.svgStyle},z.default.createElement("defs",null,z.default.createElement("filter",{x:"-50%",y:"-50%",width:"200%",height:"200%",filterUnits:"objectBoundingBox",id:"filter-1"},z.default.createElement("feOffset",{dx:"0",dy:"1",in:"SourceAlpha",result:"shadowOffsetOuter1"}),z.default.createElement("feGaussianBlur",{stdDeviation:"0.5",in:"shadowOffsetOuter1",result:"shadowBlurOuter1"}),z.default.createElement("feColorMatrix",{values:"0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.168 0",in:"shadowBlurOuter1",type:"matrix",result:"shadowMatrixOuter1"}),z.default.createElement("feOffset",{dx:"0",dy:"0",in:"SourceAlpha",result:"shadowOffsetOuter2"}),z.default.createElement("feGaussianBlur",{stdDeviation:"0.5",in:"shadowOffsetOuter2",result:"shadowBlurOuter2"}),z.default.createElement("feColorMatrix",{values:"0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.084 0",in:"shadowBlurOuter2",type:"matrix",result:"shadowMatrixOuter2"}),z.default.createElement("feMerge",null,z.default.createElement("feMergeNode",{in:"shadowMatrixOuter1"}),z.default.createElement("feMergeNode",{in:"shadowMatrixOuter2"}),z.default.createElement("feMergeNode",{in:"SourceGraphic"}))),z.default.createElement("rect",{id:"path-2",x:"0",y:"0",width:"40",height:"40",rx:"2"})),z.default.createElement("g",{id:"Google-Button",stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},z.default.createElement("g",{id:"9-PATCH",transform:"translate(-608.000000, -160.000000)"}),z.default.createElement("g",{id:"btn_google_light_normal",transform:"translate(-1.000000, -1.000000)"},z.default.createElement("g",{id:"button",transform:"translate(4.000000, 4.000000)",filter:"url(#filter-1)"},z.default.createElement("g",{id:"button-bg"},z.default.createElement("use",{fill:"#FFFFFF",fillRule:"evenodd"}),z.default.createElement("use",{fill:"none"}),z.default.createElement("use",{fill:"none"}),z.default.createElement("use",{fill:"none"}))),z.default.createElement("g",{id:"logo_googleg_48dp",transform:"translate(15.000000, 15.000000)"},z.default.createElement("path",{d:"M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 L17.64,9.20454545 Z",id:"Shape",fill:"#4285F4"}),z.default.createElement("path",{d:"M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 L9,18 Z",id:"Shape",fill:"#34A853"}),z.default.createElement("path",{d:"M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 L3.96409091,10.71 Z",id:"Shape",fill:"#FBBC05"}),z.default.createElement("path",{d:"M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 L9,3.57954545 Z",id:"Shape",fill:"#EA4335"}),z.default.createElement("path",{d:"M0,0 L18,0 L18,18 L0,18 L0,0 Z",id:"Shape"})),z.default.createElement("g",{id:"handles_square"})))),vM=z.default.createElement("svg",{width:"46px",height:"46px",viewBox:"0 0 46 46",version:"1.1",xmlns:"http://www.w3.org/2000/svg",style:fi.svgStyle},z.default.createElement("defs",null,z.default.createElement("rect",{id:"path-1",x:"0",y:"0",width:"40",height:"40",rx:"2"})),z.default.createElement("g",{id:"Google-Button",stroke:"none",strokeWidth:"1",fill:"none",fillRule:"evenodd"},z.default.createElement("g",{id:"9-PATCH",transform:"translate(-788.000000, -219.000000)"}),z.default.createElement("g",{id:"btn_google_dark_disabled",transform:"translate(-1.000000, -1.000000)"},z.default.createElement("g",{id:"button",transform:"translate(4.000000, 4.000000)"},z.default.createElement("g",{id:"button-bg"},z.default.createElement("use",{fillOpacity:"0.08",fill:"#000000",fillRule:"evenodd"}),z.default.createElement("use",{fill:"none"}),z.default.createElement("use",{fill:"none"}),z.default.createElement("use",{fill:"none"}))),z.default.createElement("path",{d:"M24.001,25.71 L24.001,22.362 L32.425,22.362 C32.551,22.929 32.65,23.46 32.65,24.207 C32.65,29.346 29.203,33 24.01,33 C19.042,33 15.01,28.968 15.01,24 C15.01,19.032 19.042,15 24.01,15 C26.44,15 28.474,15.891 30.031,17.349 L27.475,19.833 C26.827,19.221 25.693,18.501 24.01,18.501 C21.031,18.501 18.601,20.976 18.601,24.009 C18.601,27.042 21.031,29.517 24.01,29.517 C27.457,29.517 28.726,27.132 28.96,25.719 L24.001,25.719 L24.001,25.71 Z",id:"Shape-Copy",fillOpacity:"0.4",fill:"#000000"}),z.default.createElement("g",{id:"handles_square"})))),gm=function(t){var n=t.disabled,r=t.type;return z.default.createElement("div",{style:n?fM({},fi.iconStyle,{},fi.disabledIconStyle):fi.iconStyle},n?vM:r==="dark"?mM:gM)};Au.GoogleIcon=gm;gm.propTypes={disabled:_y.default.bool,type:_y.default.oneOf(["light","dark"])};gm.defaultProps={type:"dark"};Object.defineProperty(Nu,"__esModule",{value:!0});Nu.default=void 0;var sl=EM(I),Fo=wM(mm),yM=Au,al=gt;function wM(e){return e&&e.__esModule?e:{default:e}}function ax(){if(typeof WeakMap!="function")return null;var e=new WeakMap;return ax=function(){return e},e}function EM(e){if(e&&e.__esModule)return e;if(e===null||xs(e)!=="object"&&typeof e!="function")return{default:e};var t=ax();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var i=r?Object.getOwnPropertyDescriptor(e,o):null;i&&(i.get||i.set)?Object.defineProperty(n,o,i):n[o]=e[o]}return n.default=e,t&&t.set(e,n),n}function xs(e){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?xs=function(n){return typeof n}:xs=function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},xs(e)}function of(){return of=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},of.apply(this,arguments)}function SM(e,t){if(e==null)return{};var n=xM(e,t),r,o;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)r=i[o],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function xM(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function Cy(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function Id(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Cy(Object(n),!0).forEach(function(r){Sr(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Cy(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function _M(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Iy(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function bM(e,t,n){return t&&Iy(e.prototype,t),n&&Iy(e,n),e}function CM(e){return function(){var t=Tc(e),n;if(kM()){var r=Tc(this).constructor;n=Reflect.construct(t,arguments,r)}else n=t.apply(this,arguments);return IM(this,n)}}function IM(e,t){return t&&(xs(t)==="object"||typeof t=="function")?t:zo(e)}function zo(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function kM(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch{return!1}}function Tc(e){return Tc=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)},Tc(e)}function TM(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&sf(e,t)}function sf(e,t){return sf=Object.setPrototypeOf||function(r,o){return r.__proto__=o,r},sf(e,t)}function Sr(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var vm=function(e){TM(n,e);var t=CM(n);function n(){var r;_M(this,n);for(var o=arguments.length,i=new Array(o),s=0;s<o;s++)i[s]=arguments[s];return r=t.call.apply(t,[this].concat(i)),Sr(zo(r),"state",{hovered:!1}),Sr(zo(r),"getStyle",function(a){var l=r.props.type==="dark"?al.darkStyle:al.lightStyle;return r.state.hovered?Id({},l,{},al.hoverStyle,{},a):r.props.disabled?Id({},l,{},al.disabledStyle,{},a):Id({},l,{},a)}),Sr(zo(r),"mouseOver",function(){r.props.disabled||r.setState({hovered:!0})}),Sr(zo(r),"mouseOut",function(){r.props.disabled||r.setState({hovered:!1})}),Sr(zo(r),"click",function(a){r.props.disabled||r.props.onClick(a)}),r}return bM(n,[{key:"render",value:function(){var o=this.props,i=o.label,s=o.style,a=SM(o,["label","style"]);return sl.default.createElement("div",of({},a,{role:"button",onClick:this.click,style:this.getStyle(s),onMouseOver:this.mouseOver,onMouseOut:this.mouseOut}),sl.default.createElement(yM.GoogleIcon,this.props),sl.default.createElement("span",null,i))}}]),n}(sl.PureComponent);Nu.default=vm;Sr(vm,"propTypes",{label:Fo.default.string,disabled:Fo.default.bool,tabIndex:Fo.default.number,onClick:Fo.default.func,type:Fo.default.oneOf(["light","dark"]),style:Fo.default.object});Sr(vm,"defaultProps",{label:"Sign in with Google",disabled:!1,type:"dark",tabIndex:0,onClick:function(){}});(function(e){Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"GoogleButton",{enumerable:!0,get:function(){return t.default}}),Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}});var t=n(Nu);function n(r){return r&&r.__esModule?r:{default:r}}})(rx);const OM=()=>{const[e,t]=I.useState(""),[n,r]=I.useState(""),[o,i]=I.useState(""),{login:s,error:a,loading:l}=Tu(),c=async g=>{g.preventDefault(),i("");const w=await s({email:e,password:n});console.log(w)},[d,h]=I.useState(""),f=async()=>{yT(dj,hj).then(g=>{h(g.user.email),localStorage.setItem("email",g.user.email)})};return I.useEffect(()=>{h(localStorage.getItem("email"))}),I.useEffect(()=>{a&&i(a)},[a]),u.jsxs("div",{className:fr.login,children:[u.jsx("h1",{children:"Entrar"}),u.jsx("p",{children:"Faça o login para poder utilizar o coderBot"}),u.jsxs("form",{onSubmit:c,children:[u.jsxs("label",{children:[u.jsx("span",{children:"E-mail: "}),u.jsx("input",{type:"email",name:"email",required:!0,placeholder:"E-mail do usuário",value:e,onChange:g=>t(g.target.value)})]}),u.jsxs("label",{children:[u.jsx("span",{children:"Senha: "}),u.jsx("input",{type:"password",name:"password",required:!0,placeholder:"Insira sua senha",value:n,onChange:g=>r(g.target.value)})]}),u.jsxs("div",{className:fr.buttonsContainer,children:[!l&&u.jsx("button",{className:fr.lgBtn,children:"Entrar"}),l&&u.jsx("button",{className:fr.lgBtn,disabled:!0,children:"Aguarde..."}),o&&u.jsx("p",{className:"error",children:o}),u.jsxs("div",{className:fr.lineWithText,children:[u.jsx("div",{className:fr.line}),u.jsx("div",{className:fr.text,children:"ou"}),u.jsx("div",{className:fr.line})]}),u.jsx(rx.GoogleButton,{style:{width:"100"},onClick:f,label:"Entrar com o Google"})]})]})]})},PM="_register_ol2j1_10",NM="_formLabel_ol2j1_40",AM="_formInput_ol2j1_50",jM="_submitBtn_ol2j1_68",RM="_error_ol2j1_89",kt={register:PM,formLabel:NM,formInput:AM,submitBtn:jM,error:RM},MM=()=>{const[e,t]=I.useState(""),[n,r]=I.useState(""),[o,i]=I.useState(""),[s,a]=I.useState(""),[l,c]=I.useState(""),[d,h]=I.useState(""),{createUser:f,error:g,loading:y}=Tu(),w=async C=>{C.preventDefault(),h("");const m={displayName:e,email:n,password:s};if(s!==l){h("As senhas não conferem");return}const p=await f(m);console.log(p),console.log(p.displayName)};return I.useEffect(()=>{g&&h(g)},[g]),u.jsxs("div",{className:kt.register,children:[u.jsx("h1",{children:"Cadastre-se para usar"}),u.jsx("p",{children:"Crie seu usuário e aprenda com o coderBot"}),u.jsxs("form",{onSubmit:w,children:[u.jsxs("label",{className:kt.formLabel,children:[u.jsx("span",{children:"Nome: "}),u.jsx("input",{type:"text",name:"displayName",required:!0,placeholder:"Nome do usuário",value:e,onChange:C=>t(C.target.value),className:kt.formInput})]}),u.jsxs("label",{className:kt.formLabel,children:[u.jsx("span",{children:"E-mail: "}),u.jsx("input",{type:"email",name:"email",required:!0,placeholder:"E-mail do usuário",value:n,onChange:C=>r(C.target.value),className:kt.formInput})]}),u.jsxs("label",{className:kt.formLabel,children:[u.jsx("span",{children:"Turma/Professora/Conteúdo:"}),u.jsx("input",{type:"text",name:"classInfo",required:!0,placeholder:"Algoritmo e prog, Profa Fulana, Vetores",value:o,onChange:C=>i(C.target.value),className:kt.formInput})]}),u.jsxs("label",{className:kt.formLabel,children:[u.jsx("span",{children:"Senha: "}),u.jsx("input",{type:"password",name:"password",required:!0,placeholder:"Insira sua senha",value:s,onChange:C=>a(C.target.value),className:kt.formInput})]}),u.jsxs("label",{className:kt.formLabel,children:[u.jsx("span",{children:"Confirmação de senha: "}),u.jsx("input",{type:"password",name:"confirmPassword",required:!0,placeholder:"Confirme a sua senha",value:l,onChange:C=>c(C.target.value),className:kt.formInput})]}),!y&&u.jsx("button",{className:`${kt.btn} ${kt.submitBtn}`,children:"Cadastrar"}),y&&u.jsx("button",{className:`${kt.btn} ${kt.submitBtn}`,disabled:!0,children:"Aguarde..."}),d&&u.jsx("p",{className:kt.error,children:d})]})]})};var lx={exports:{}},cx={exports:{}};(()=>{var e={d:(r,o)=>{for(var i in o)e.o(o,i)&&!e.o(r,i)&&Object.defineProperty(r,i,{enumerable:!0,get:o[i]})},o:(r,o)=>Object.prototype.hasOwnProperty.call(r,o),r:r=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{default:()=>n});const n=function(r){var o=r.condition,i=r.show,s=r.elseShow,a=function(c){return typeof c=="function"},l=function(c){return c()||(console.warn("Nothing was returned from your render function. Please make sure you are returning a valid React element."),null)};return o?a(i)?l(i):i:!o&&s?a(s)?l(s):s:null};cx.exports=t})();var LM=cx.exports;(()=>{var e={n:S=>{var x=S&&S.__esModule?()=>S.default:()=>S;return e.d(x,{a:x}),x},d:(S,x)=>{for(var j in x)e.o(x,j)&&!e.o(S,j)&&Object.defineProperty(S,j,{enumerable:!0,get:x[j]})},o:(S,x)=>Object.prototype.hasOwnProperty.call(S,x),r:S=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(S,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(S,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{Chatbot:()=>ye,createChatBotMessage:()=>l,createClientMessage:()=>d,createCustomMessage:()=>c,default:()=>D,useChatbot:()=>K});const n=I;var r=e.n(n);const o=LM;var i=e.n(o),s=function(){return s=Object.assign||function(S){for(var x,j=1,L=arguments.length;j<L;j++)for(var E in x=arguments[j])Object.prototype.hasOwnProperty.call(x,E)&&(S[E]=x[E]);return S},s.apply(this,arguments)},a=function(S,x){return{message:S,type:x,id:Math.round(Date.now()*Math.random())}},l=function(S,x){return s(s(s({},a(S,"bot")),x),{loading:!0})},c=function(S,x,j){return s(s({},a(S,x)),j)},d=function(S,x){return s(s({},a(S,"user")),x)},h=function(S){for(var x=[],j=1;j<arguments.length;j++)x[j-1]=arguments[j];if(S)return S.apply(void 0,x)};function f(){return f=Object.assign||function(S){for(var x=1;x<arguments.length;x++){var j=arguments[x];for(var L in j)Object.prototype.hasOwnProperty.call(j,L)&&(S[L]=j[L])}return S},f.apply(this,arguments)}const g=({styles:S={},...x})=>r().createElement("svg",f({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},x),r().createElement("path",{d:"M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"})),y=function(S){var x=S.message,j=S.customComponents;return r().createElement("div",{className:"react-chatbot-kit-user-chat-message-container"},r().createElement(i(),{condition:!!j.userChatMessage,show:h(j.userChatMessage,{message:x}),elseShow:r().createElement("div",{className:"react-chatbot-kit-user-chat-message"},x,r().createElement("div",{className:"react-chatbot-kit-user-chat-message-arrow"}))}),r().createElement(i(),{condition:!!j.userAvatar,show:h(j.userAvatar),elseShow:r().createElement("div",{className:"react-chatbot-kit-user-avatar"},r().createElement("div",{className:"react-chatbot-kit-user-avatar-container"},r().createElement(g,{className:"react-chatbot-kit-user-avatar-icon"})))}))},w=function(){return r().createElement("div",{className:"react-chatbot-kit-chat-bot-avatar"},r().createElement("div",{className:"react-chatbot-kit-chat-bot-avatar-container"},r().createElement("p",{className:"react-chatbot-kit-chat-bot-avatar-letter"},"B")))},C=function(){return r().createElement("div",{className:"chatbot-loader-container"},r().createElement("svg",{id:"dots",width:"50px",height:"21px",viewBox:"0 0 132 58",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},r().createElement("g",{stroke:"none",fill:"none"},r().createElement("g",{id:"chatbot-loader",fill:"#fff"},r().createElement("circle",{id:"chatbot-loader-dot1",cx:"25",cy:"30",r:"13"}),r().createElement("circle",{id:"chatbot-loader-dot2",cx:"65",cy:"30",r:"13"}),r().createElement("circle",{id:"chatbot-loader-dot3",cx:"105",cy:"30",r:"13"})))))};var m=function(){return m=Object.assign||function(S){for(var x,j=1,L=arguments.length;j<L;j++)for(var E in x=arguments[j])Object.prototype.hasOwnProperty.call(x,E)&&(S[E]=x[E]);return S},m.apply(this,arguments)};const p=function(S){var x=S.message,j=S.withAvatar,L=j===void 0||j,E=S.loading,N=S.messages,F=S.customComponents,q=S.setState,X=S.customStyles,ne=S.delay,de=S.id,ke=(0,n.useState)(!1),ue=ke[0],Te=ke[1];(0,n.useEffect)(function(){var ge;return function(Ae,Ze){var Ge=750;ne&&(Ge+=ne),ge=setTimeout(function(){var Fe=function(ze,Ue,Y){if(Y||arguments.length===2)for(var et,Z=0,he=Ue.length;Z<he;Z++)!et&&Z in Ue||(et||(et=Array.prototype.slice.call(Ue,0,Z)),et[Z]=Ue[Z]);return ze.concat(et||Array.prototype.slice.call(Ue))}([],Ae,!0).find(function(ze){return ze.id===de});Fe&&(Fe.loading=!1,Fe.delay=void 0,Ze(function(ze){var Ue=ze.messages,Y=Ue.findIndex(function(et){return et.id===de});return Ue[Y]=Fe,m(m({},ze),{messages:Ue})}))},Ge)}(N,q),function(){clearTimeout(ge)}},[ne,de]),(0,n.useEffect)(function(){ne?setTimeout(function(){return Te(!0)},ne):Te(!0)},[ne]);var me={backgroundColor:""},oe={borderRightColor:""};return X&&(me.backgroundColor=X.backgroundColor,oe.borderRightColor=X.backgroundColor),r().createElement(i(),{condition:ue,show:r().createElement("div",{className:"react-chatbot-kit-chat-bot-message-container"},r().createElement(i(),{condition:L,show:r().createElement(i(),{condition:!!(F!=null&&F.botAvatar),show:h(F==null?void 0:F.botAvatar),elseShow:r().createElement(w,null)})}),r().createElement(i(),{condition:!!(F!=null&&F.botChatMessage),show:h(F==null?void 0:F.botChatMessage,{message:x,loader:r().createElement(C,null)}),elseShow:r().createElement("div",{className:"react-chatbot-kit-chat-bot-message",style:me},r().createElement(i(),{condition:E,show:r().createElement(C,null),elseShow:r().createElement("span",null,x)}),r().createElement(i(),{condition:L,show:r().createElement("div",{className:"react-chatbot-kit-chat-bot-message-arrow",style:oe})}))}))})};function v(){return v=Object.assign||function(S){for(var x=1;x<arguments.length;x++){var j=arguments[x];for(var L in j)Object.prototype.hasOwnProperty.call(j,L)&&(S[L]=j[L])}return S},v.apply(this,arguments)}const b=({styles:S={},...x})=>r().createElement("svg",v({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},x),r().createElement("path",{d:"M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"}));var k=function(){return k=Object.assign||function(S){for(var x,j=1,L=arguments.length;j<L;j++)for(var E in x=arguments[j])Object.prototype.hasOwnProperty.call(x,E)&&(S[E]=x[E]);return S},k.apply(this,arguments)},P=function(S,x,j){if(j||arguments.length===2)for(var L,E=0,N=x.length;E<N;E++)!L&&E in x||(L||(L=Array.prototype.slice.call(x,0,E)),L[E]=x[E]);return S.concat(L||Array.prototype.slice.call(x))};const R=function(S){var x=S.state,j=S.setState,L=S.widgetRegistry,E=S.messageParser,N=S.parse,F=S.customComponents,q=S.actionProvider,X=S.botName,ne=S.customStyles,de=S.headerText,ke=S.customMessages,ue=S.placeholderText,Te=S.validator,me=S.setMessageContainerRef,oe=S.disableScrollToBottom,ge=S.messageHistory,Ae=S.actions,Ze=x.messages,Ge=(0,n.useRef)(null),Fe=(0,n.useState)(""),ze=Fe[0],Ue=Fe[1],Y=function(){setTimeout(function(){var ce;Ge.current&&(Ge.current.scrollTop=(ce=Ge==null?void 0:Ge.current)===null||ce===void 0?void 0:ce.scrollHeight)},50)};(0,n.useEffect)(function(){oe||Y()}),(0,n.useEffect)(function(){me(Ge)},[Ge.current]);var et=function(){j(function(ce){return k(k({},ce),{messages:P(P([],ce.messages,!0),[a(ze,"user")],!1)})}),Y(),Ue("")},Z={backgroundColor:""};ne&&ne.chatButton&&(Z.backgroundColor=ne.chatButton.backgroundColor);var he="Conversation with "+X;de&&(he=de);var we="Write your message here";return ue&&(we=ue),r().createElement("div",{className:"react-chatbot-kit-chat-container"},r().createElement("div",{className:"react-chatbot-kit-chat-inner-container"},r().createElement(i(),{condition:!!F.header,show:F.header&&F.header(q),elseShow:r().createElement("div",{className:"react-chatbot-kit-chat-header"},he)}),r().createElement("div",{className:"react-chatbot-kit-chat-message-container",ref:Ge},r().createElement(i(),{condition:typeof ge=="string"&&!!ge,show:r().createElement("div",{dangerouslySetInnerHTML:{__html:ge}})}),Ze.map(function(ce,xt){return ce.type==="bot"?r().createElement(r().Fragment,{key:ce.id},function(ve,B){var J;J=ve.withAvatar?ve.withAvatar:function(_t,Qr){if(Qr===0)return!0;var Da=_t[Qr-1];return!(Da.type==="bot"&&!Da.widget)}(Ze,B);var ae=k(k({},ve),{setState:j,state:x,customComponents:F,widgetRegistry:L,messages:Ze,actions:Ae});if(ve.widget){var Oe=L.getWidget(ae.widget,k(k({},x),{scrollIntoView:Y,payload:ve.payload,actions:Ae}));return r().createElement(r().Fragment,null,r().createElement(p,k({customStyles:ne.botMessageBox,withAvatar:J},ae,{key:ve.id})),r().createElement(i(),{condition:!ae.loading,show:Oe||null}))}return r().createElement(p,k({customStyles:ne.botMessageBox,key:ve.id,withAvatar:J},ae,{customComponents:F,messages:Ze,setState:j}))}(ce,xt)):ce.type==="user"?r().createElement(r().Fragment,{key:ce.id},function(ve){var B=L.getWidget(ve.widget,k(k({},x),{scrollIntoView:Y,payload:ve.payload,actions:Ae}));return r().createElement(r().Fragment,null,r().createElement(y,{message:ve.message,key:ve.id,customComponents:F}),B||null)}(ce)):function(ve,B){return!!B[ve.type]}(ce,ke)?r().createElement(r().Fragment,{key:ce.id},function(ve){var B=ke[ve.type],J={setState:j,state:x,scrollIntoView:Y,actionProvider:q,payload:ve.payload,actions:Ae};if(ve.widget){var ae=L.getWidget(ve.widget,k(k({},x),{scrollIntoView:Y,payload:ve.payload,actions:Ae}));return r().createElement(r().Fragment,null,B(J),ae||null)}return B(J)}(ce)):void 0}),r().createElement("div",{style:{paddingBottom:"15px"}})),r().createElement("div",{className:"react-chatbot-kit-chat-input-container"},r().createElement("form",{className:"react-chatbot-kit-chat-input-form",onSubmit:function(ce){if(ce.preventDefault(),Te&&typeof Te=="function"){if(Te(ze)){if(et(),N)return N(ze);E.parse(ze)}}else{if(et(),N)return N(ze);E.parse(ze)}}},r().createElement("input",{className:"react-chatbot-kit-chat-input",placeholder:we,value:ze,onChange:function(ce){return Ue(ce.target.value)}}),r().createElement("button",{className:"react-chatbot-kit-chat-btn-send",style:Z},r().createElement(b,{className:"react-chatbot-kit-chat-btn-send-icon"}))))))},T=function(S){var x=S.message;return r().createElement("div",{className:"react-chatbot-kit-error"},r().createElement("h1",{className:"react-chatbot-kit-error-header"},"Ooops. Something is missing."),r().createElement("div",{className:"react-chatbot-kit-error-container"},r().createElement(p,{message:x,withAvatar:!0,loading:!1,id:1,customStyles:{backgroundColor:""},messages:[]})),r().createElement("a",{href:"https://fredrikoseberg.github.io/react-chatbot-kit-docs/",rel:"noopener norefferer",target:"_blank",className:"react-chatbot-kit-error-docs"},"View the docs"))};var Q=function(S){return S.widgets?S.widgets:[]},A=function(S){try{new S}catch{return!1}return!0},_=function(){return _=Object.assign||function(S){for(var x,j=1,L=arguments.length;j<L;j++)for(var E in x=arguments[j])Object.prototype.hasOwnProperty.call(x,E)&&(S[E]=x[E]);return S},_.apply(this,arguments)};const O=function(S,x){var j=this;this.addWidget=function(L,E){var N=L.widgetName,F=L.widgetFunc,q=L.mapStateToProps,X=L.props;j[N]={widget:F,props:X,mapStateToProps:q,parentProps:_({},E)}},this.getWidget=function(L,E){var N=j[L];if(N){var F,q=_(_(_(_({scrollIntoView:E.scrollIntoView},N.parentProps),typeof(F=N.props)=="object"?F:{}),j.mapStateToProps(N.mapStateToProps,E)),{setState:j.setState,actionProvider:j.actionProvider||E.actions,actions:E.actions,state:E,payload:E.payload});return N.widget(q)||null}},this.mapStateToProps=function(L,E){if(L)return L.reduce(function(N,F){return N[F]=E[F],N},{})},this.setState=S,this.actionProvider=x};var W=function(){return W=Object.assign||function(S){for(var x,j=1,L=arguments.length;j<L;j++)for(var E in x=arguments[j])Object.prototype.hasOwnProperty.call(x,E)&&(S[E]=x[E]);return S},W.apply(this,arguments)},V=function(S,x,j){if(j||arguments.length===2)for(var L,E=0,N=x.length;E<N;E++)!L&&E in x||(L||(L=Array.prototype.slice.call(x,0,E)),L[E]=x[E]);return S.concat(L||Array.prototype.slice.call(x))};const K=function(S){var x=S.config,j=S.actionProvider,L=S.messageParser,E=S.messageHistory,N=S.runInitialMessagesWithHistory,F=S.saveMessages,q=function(Z,he){var we={};for(var ce in Z)Object.prototype.hasOwnProperty.call(Z,ce)&&he.indexOf(ce)<0&&(we[ce]=Z[ce]);if(Z!=null&&typeof Object.getOwnPropertySymbols=="function"){var xt=0;for(ce=Object.getOwnPropertySymbols(Z);xt<ce.length;xt++)he.indexOf(ce[xt])<0&&Object.prototype.propertyIsEnumerable.call(Z,ce[xt])&&(we[ce[xt]]=Z[ce[xt]])}return we}(S,["config","actionProvider","messageParser","messageHistory","runInitialMessagesWithHistory","saveMessages"]),X="",ne="";if(!x||!j||!L)return{configurationError:X="I think you forgot to feed me some props. Did you remember to pass a config, a messageparser and an actionprovider?"};var de=function(Z,he){var we=[];return Z.initialMessages||we.push("Config must contain property 'initialMessages', and it expects it to be an array of chatbotmessages."),we}(x);if(de.length)return{invalidPropsError:ne=de.reduce(function(Z,he){return Z+he},"")};var ke=(0,n.useState)({}),ue=ke[0],Te=ke[1],me=function(Z){return Z.state?Z.state:{}}(x);E&&Array.isArray(E)?x.initialMessages=V([],E,!0):typeof E=="string"&&E&&(N||(x.initialMessages=[]));var oe,ge,Ae,Ze=r().useState(W({messages:V([],x.initialMessages,!0)},me)),Ge=Ze[0],Fe=Ze[1],ze=r().useRef(Ge.messages),Ue=r().useRef();(0,n.useEffect)(function(){ze.current=Ge.messages}),(0,n.useEffect)(function(){E&&Array.isArray(E)&&Fe(function(Z){return W(W({},Z),{messages:E})})},[]),(0,n.useEffect)(function(){return function(){var Z;if(F&&typeof F=="function"){var he=(Z=ue==null?void 0:ue.current)===null||Z===void 0?void 0:Z.innerHTML.toString();if(!ue.current)return;F(ze.current,he)}}},[ue.current]),(0,n.useEffect)(function(){Ue.current=Ge},[Ge]);var Y=j,et=L;return A(Y)&&A(et)?(oe=new j(l,Fe,d,Ue.current,c,q),ge=new O(Fe,oe),Ae=new L(oe,Ue.current),Q(x).forEach(function(Z){return ge==null?void 0:ge.addWidget(Z,q)})):(oe=j,Ae=L,ge=new O(Fe,null),Q(x).forEach(function(Z){return ge==null?void 0:ge.addWidget(Z,q)})),{widgetRegistry:ge,actionProv:oe,messagePars:Ae,configurationError:X,invalidPropsError:ne,state:Ge,setState:Fe,setMessageContainerRef:Te,ActionProvider:Y,MessageParser:et}};var re=function(){return re=Object.assign||function(S){for(var x,j=1,L=arguments.length;j<L;j++)for(var E in x=arguments[j])Object.prototype.hasOwnProperty.call(x,E)&&(S[E]=x[E]);return S},re.apply(this,arguments)};const ye=function(S){var x=S.actionProvider,j=S.messageParser,L=S.config,E=S.headerText,N=S.placeholderText,F=S.saveMessages,q=S.messageHistory,X=S.runInitialMessagesWithHistory,ne=S.disableScrollToBottom,de=S.validator,ke=function(we,ce){var xt={};for(var ve in we)Object.prototype.hasOwnProperty.call(we,ve)&&ce.indexOf(ve)<0&&(xt[ve]=we[ve]);if(we!=null&&typeof Object.getOwnPropertySymbols=="function"){var B=0;for(ve=Object.getOwnPropertySymbols(we);B<ve.length;B++)ce.indexOf(ve[B])<0&&Object.prototype.propertyIsEnumerable.call(we,ve[B])&&(xt[ve[B]]=we[ve[B]])}return xt}(S,["actionProvider","messageParser","config","headerText","placeholderText","saveMessages","messageHistory","runInitialMessagesWithHistory","disableScrollToBottom","validator"]),ue=K(re({config:L,actionProvider:x,messageParser:j,messageHistory:q,saveMessages:F,runInitialMessagesWithHistory:X},ke)),Te=ue.configurationError,me=ue.invalidPropsError,oe=ue.ActionProvider,ge=ue.MessageParser,Ae=ue.widgetRegistry,Ze=ue.actionProv,Ge=ue.messagePars,Fe=ue.state,ze=ue.setState,Ue=ue.setMessageContainerRef;if(Te)return r().createElement(T,{message:Te});if(me.length)return r().createElement(T,{message:me});var Y=function(we){return we.customStyles?we.customStyles:{}}(L),et=function(we){return we.customComponents?we.customComponents:{}}(L),Z=function(we){return we.botName?we.botName:"Bot"}(L),he=function(we){return we.customMessages?we.customMessages:{}}(L);return A(oe)&&A(ge)?r().createElement(R,{state:Fe,setState:ze,widgetRegistry:Ae,actionProvider:Ze,messageParser:Ge,customMessages:he,customComponents:re({},et),botName:Z,customStyles:re({},Y),headerText:E,placeholderText:N,setMessageContainerRef:Ue,validator:de,messageHistory:q,disableScrollToBottom:ne}):r().createElement(oe,{setState:ze,createChatBotMessage:l},r().createElement(ge,null,r().createElement(R,{state:Fe,setState:ze,widgetRegistry:Ae,actionProvider:oe,messageParser:ge,customMessages:he,customComponents:re({},et),botName:Z,customStyles:re({},Y),headerText:E,placeholderText:N,setMessageContainerRef:Ue,validator:de,messageHistory:q,disableScrollToBottom:ne})))},D=ye;lx.exports=t})();var Oo=lx.exports;const ky=Ac(Oo);const DM=({question:e,answer:t,incrementIndex:n})=>{const[r,o]=I.useState(!1);return I.useEffect(()=>o(!1),[e]),u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"flashcard-container",onClick:()=>o(!r),children:[!r&&e,r&&t]}),r&&u.jsx("button",{onClick:n,className:"flashcard-button",children:"Próxima Pergunta"})]})},Zn=e=>{console.log(e);let[t,n]=I.useState(0);const r=()=>n(i=>i+=1),o=e.questions[t];return o?u.jsx(DM,{question:o.question,answer:o.answer,incrementIndex:r}):u.jsx("p",{children:"O Quiz Acabou."})};const ym=e=>{const n=[{text:"1. Vetores (Arrays)",handler:e.actionProvider.handleExampleChoice,id:1},{text:"2. Funções ",handler:e.actionProvider.handleExampleChoice,id:2}].map(r=>u.jsx("button",{onClick:()=>r.handler(r.id),className:"option-button",children:r.text},r.id));return u.jsx("div",{className:"options-container",children:n})},wm=e=>{const n=[{text:"Exemplo Correto ✅",handler:e.actionProvider.handleExemploCorretoVariavel,id:13},{text:"Exemplo Incorreto ❌",handler:e.actionProvider.handleExemploIncorretoVariavel,id:14},{text:"Voltar",handler:e.actionProvider.handleGoToBackMenu,id:15}].map(r=>u.jsx("button",{onClick:r.handler,className:"option-button",children:r.text},r.id));return u.jsx("div",{className:"options-container",children:n})},Em=e=>{const n=[{text:"Exemplo Correto ✅",handler:e.actionProvider.handleExemploCorretoCondicional,id:4},{text:"Exemplo Incorreto ❌",handler:e.actionProvider.handleExemploIncorretoCondicional,id:5},{text:"Voltar",handler:e.actionProvider.handleGoToBackMenu,id:6}].map(r=>u.jsx("button",{onClick:r.handler,className:"option-button",children:r.text},r.id));return u.jsx("div",{className:"options-container",children:n})},Sm=e=>{const n=[{text:"Exemplo Correto ✅",handler:e.actionProvider.handleExemploCorretoLacoRepeticao,id:9},{text:"Exemplo Incorreto ❌",handler:e.actionProvider.handleExemploIncorretoLacoRepeticao,id:10},{text:"Voltar",handler:e.actionProvider.handleGoToBackMenu,id:11}].map(r=>u.jsx("button",{onClick:r.handler,className:"option-button",children:r.text},r.id));return u.jsx("div",{className:"options-container",children:n})},xm=e=>{const n=[{text:"Identificar o problema",handler:e.actionProvider.handleIdentificarErroVariavel,id:16}].map(r=>u.jsx("button",{onClick:r.handler,className:"option-button",children:r.text},r.id));return u.jsx("div",{className:"options-container",children:n})},_m=e=>{const n=[{text:"Identificar o problema",handler:e.actionProvider.handleIdentificarErroCondicional,id:7}].map(r=>u.jsx("button",{onClick:r.handler,className:"option-button",children:r.text},r.id));return u.jsx("div",{className:"options-container",children:n})},bm=e=>{const n=[{text:"Identificar o problema",handler:e.actionProvider.handleIdentificarErroLacoRepeticao,id:12}].map(r=>u.jsx("button",{onClick:r.handler,className:"option-button",children:r.text},r.id));return u.jsx("div",{className:"options-container",children:n})},Cm=e=>{const n=[{text:"Voltar ao menu principal",handler:e.actionProvider.handleGoToMainMenu,id:8}].map(r=>u.jsx("button",{onClick:r.handler,className:"option-button",children:r.text},r.id));return u.jsx("div",{className:"options-container",children:n})},Im=e=>{const n=[{text:"Sim",handler:e.actionProvider.handleIdentificarErroVariavelSim,id:17},{text:"Não",handler:e.actionProvider.handleIdentificarErroVariavelNao,id:18}].map(r=>u.jsx("button",{onClick:r.handler,className:"option-button",children:r.text},r.id));return u.jsx("div",{className:"options-container",children:n})},km=e=>{const n=[{text:"1",handler:e.actionProvider.handleArrayResp1,id:19},{text:"2",handler:e.actionProvider.handleArrayResp2,id:20},{text:"3",handler:e.actionProvider.handleArrayResp3,id:21},{text:"4",handler:e.actionProvider.handleArrayResp4,id:22},{text:"5",handler:e.actionProvider.handleArrayResp5,id:23}].map(r=>u.jsx("button",{onClick:r.handler,className:"option-button",children:r.text},r.id));return u.jsx("div",{className:"options-container",children:n})},Tm=e=>{const[t,n]=I.useState(!1),r=[{text:"Exemplo Correto ✅",handler:e.actionProvider.handleCorrectWE,id:1},{text:"Exemplo Incorreto ❌",handler:e.actionProvider.handleIncorrectWE,id:2},{text:"Voltar ao menu",handler:e.actionProvider.handleGoToBackMenu,id:3},{text:"Finalizar sessão",handler:e.actionProvider.handleGoOut,id:4}],o=s=>{s.handler(s.id),n(!0)},i=r.map(s=>u.jsx("button",{onClick:()=>o(s),className:"option-button",disabled:t,children:s.text},s.id));return u.jsx("div",{className:"options-container",children:i})},Om=()=>u.jsx("img",{src:"https://i.pinimg.com/originals/cf/da/fa/cfdafa4dc6aab40eae1c5315c02b9339.jpg",style:{width:"100%"}}),Pm=e=>{const[t,n]=I.useState(!1),r=[{text:"Ver outro Exemplo 🔍",handler:e.actionProvider.handleExampleChoice,id:-1},{text:"Exemplo Incorreto ❌",handler:e.actionProvider.handleIncorrectWE,id:2},{text:"Voltar ao menu",handler:e.actionProvider.handleGoToBackMenu,id:3},{text:"Finalizar a sessão ",handler:e.actionProvider.handleGoOut,id:0}],o=s=>{s.handler(s.id),n(!0)},i=r.map(s=>u.jsx("button",{onClick:()=>o(s),className:"option-button",disabled:t,children:s.text},s.id));return u.jsx("div",{className:"options-container",children:i})},Nm=e=>{const[t,n]=I.useState(!1),r=[{text:"Exemplo Correto ✅",handler:e.actionProvider.handleCorrectWE,id:1},{text:"Ver outro Exemplo 🔍",handler:e.actionProvider.handleExampleChoice,id:-1},{text:"Voltar ao menu",handler:e.actionProvider.handleGoToBackMenu,id:3},{text:"Finalizar a sessão ",handler:e.actionProvider.handleGoOut,id:0}],o=s=>{s.handler(s.id),n(!0)},i=r.map(s=>u.jsx("button",{onClick:()=>o(s),className:"option-button",disabled:t,children:s.text},s.id));return u.jsx("div",{className:"options-container",children:i})},Am=e=>{const[t,n]=I.useState(!1),r=[{text:e.actionProvider.dataArray[0].title,handler:e.actionProvider.handleQuiz,id:0},{text:e.actionProvider.dataArray[1].title,handler:e.actionProvider.handleQuiz,id:1},{text:e.actionProvider.dataArray[2].title,handler:e.actionProvider.handleQuiz,id:2},{text:e.actionProvider.dataArray[3].title,handler:e.actionProvider.handleQuiz,id:3},{text:e.actionProvider.dataArray[4].title,handler:e.actionProvider.handleQuiz,id:4},{text:e.actionProvider.dataArray[5].title,handler:e.actionProvider.handleQuiz,id:5},{text:e.actionProvider.dataArray[6].title,handler:e.actionProvider.handleQuiz,id:6},{text:e.actionProvider.dataArray[7].title,handler:e.actionProvider.handleQuiz,id:7},{text:e.actionProvider.dataArray[8].title,handler:e.actionProvider.handleQuiz,id:8},{text:e.actionProvider.dataArray[9].title,handler:e.actionProvider.handleQuiz,id:9},{text:"Voltar ao menu",handler:e.actionProvider.handleGoToBackMenu,id:21}],o=s=>{s.handler(s.id),n(!0)},i=r.map(s=>u.jsx("button",{onClick:()=>o(s),className:"option-button",disabled:t,children:s.text},s.id));return u.jsx("div",{className:"options-container",children:i})},jm=e=>{const[t,n]=I.useState(!1),r=[{text:e.actionProvider.dataFunc[0].title,handler:e.actionProvider.handleQuiz,id:0},{text:e.actionProvider.dataFunc[1].title,handler:e.actionProvider.handleQuiz,id:1},{text:e.actionProvider.dataFunc[2].title,handler:e.actionProvider.handleQuiz,id:2},{text:e.actionProvider.dataFunc[3].title,handler:e.actionProvider.handleQuiz,id:3},{text:e.actionProvider.dataFunc[4].title,handler:e.actionProvider.handleQuiz,id:4},{text:e.actionProvider.dataFunc[5].title,handler:e.actionProvider.handleQuiz,id:5},{text:e.actionProvider.dataFunc[6].title,handler:e.actionProvider.handleQuiz,id:6},{text:e.actionProvider.dataFunc[7].title,handler:e.actionProvider.handleQuiz,id:7},{text:e.actionProvider.dataFunc[8].title,handler:e.actionProvider.handleQuiz,id:8},{text:e.actionProvider.dataFunc[9].title,handler:e.actionProvider.handleQuiz,id:9},{text:"Voltar ao menu",handler:e.actionProvider.handleGoToBackMenu,id:21}],o=s=>{s.handler(s.id),n(!0)},i=r.map(s=>u.jsx("button",{onClick:()=>o(s),className:"option-button",disabled:t,children:s.text},s.id));return u.jsx("div",{className:"options-container",children:i})},Rm=e=>{const[t,n]=I.useState(!1),r=[{text:e.actionProvider.dataWE.problemWEIncorrect.options.one,handler:e.actionProvider.handleQuestionWE,id:1},{text:e.actionProvider.dataWE.problemWEIncorrect.options.two,handler:e.actionProvider.handleQuestionWE,id:2},{text:e.actionProvider.dataWE.problemWEIncorrect.options.three,handler:e.actionProvider.handleQuestionWE,id:3},{text:e.actionProvider.dataWE.problemWEIncorrect.options.four,handler:e.actionProvider.handleQuestionWE,id:4},{text:e.actionProvider.dataWE.problemWEIncorrect.options.five,handler:e.actionProvider.handleQuestionWE,id:5}],o=s=>{s.handler(s.id),n(!0)},i=r.map(s=>u.jsx("button",{onClick:()=>o(s),className:"option-button",disabled:t,children:s.text},s.id));return u.jsx("div",{className:"options-container",children:i})},Mm=e=>{const[t,n]=I.useState(!1),r=[{text:"2. Funções ",handler:e.actionProvider.handleExampleChoice,id:2},{text:"Finalizar a sessão ",handler:e.actionProvider.handleGoOut,id:0}],o=s=>{s.handler(s.id),n(!0)},i=r.map(s=>u.jsx("button",{onClick:()=>o(s),className:"option-button",disabled:t,children:s.text},s.id));return u.jsx("div",{className:"options-container",children:i})},Lm=e=>{const[t,n]=I.useState(!1),r=[{text:"1. Vetores (Arrays)",handler:e.actionProvider.handleExampleChoice,id:1},{text:"Finalizar a sessão ",handler:e.actionProvider.handleGoOut,id:2}],o=s=>{s.handler(s.id),n(!0)},i=r.map(s=>u.jsx("button",{onClick:()=>o(s),className:"option-button",disabled:t,children:s.text},s.id));return u.jsx("div",{className:"options-container",children:i})};Oo.createChatBotMessage("Olá! 👋  Sou o CoderBot 🤖 , e estou aqui para te auxiliar na aprendizagem de programação 💻 por meio de exemplos. Escolha um dos temas abaixo:",{widget:"options"}),Oo.createCustomMessage(u.jsx(Om,{}));const $M={botName:"ChatBot de Educação",initialMessages:[Oo.createChatBotMessage("Olá! 👋  Sou o CoderBot 🤖 , e estou aqui para te auxiliar na aprendizagem de programação 💻 por meio de exemplos. Escolha um dos temas abaixo:",{widget:"options1"}),Oo.createCustomMessage(u.jsx(Om,{}))],widgets:[{widgetName:"options",widgetFunc:e=>u.jsx(ym,{...e})},{widgetName:"options1",widgetFunc:e=>u.jsx(Lm,{...e})},{widgetName:"options2",widgetFunc:e=>u.jsx(Mm,{...e})},{widgetName:"volteMenuPrincipal",widgetFunc:e=>u.jsx(Cm,{...e})},{widgetName:"variavel",widgetFunc:e=>u.jsx(Zn,{...e}),widgetFunc:e=>u.jsx(wm,{...e})},{widgetName:"condicional",widgetFunc:e=>u.jsx(Zn,{...e}),widgetFunc:e=>u.jsx(Em,{...e})},{widgetName:"lacoRepeticao",widgetFunc:e=>u.jsx(Zn,{...e}),widgetFunc:e=>u.jsx(Sm,{...e})},{widgetName:"identificarErroVariavel",widgetFunc:e=>u.jsx(xm,{...e})},{widgetName:"identificarErroCondicional",widgetFunc:e=>u.jsx(_m,{...e})},{widgetName:"identificarErroLacoRepeticao",widgetFunc:e=>u.jsx(bm,{...e})},{widgetName:"identificarErroVariavelYesOrNo",widgetFunc:e=>u.jsx(Im,{...e})},{widgetName:"identificarErroVariavelLines",widgetFunc:e=>u.jsx(km,{...e})},{widgetName:"vetores",widgetFunc:e=>u.jsx(Tm,{...e})},{widgetName:"vetoresanothercorrect",widgetFunc:e=>u.jsx(Pm,{...e})},{widgetName:"vetoresanotherincorrect",widgetFunc:e=>u.jsx(Nm,{...e})},{widgetName:"vetoreswe",widgetFunc:e=>u.jsx(Am,{...e})},{widgetName:"funcoeswe",widgetFunc:e=>u.jsx(jm,{...e})},{widgetName:"questionswe",widgetFunc:e=>u.jsx(Rm,{...e})}]},FM={botName:"ChatBot de Educação",initialMessages:[Oo.createChatBotMessage("Olá! 👋  Sou o CoderBot 🤖 , e estou aqui para te auxiliar na aprendizagem de programação 💻 por meio de exemplos. Escolha um dos temas abaixo:",{widget:"options2"}),Oo.createCustomMessage(u.jsx(Om,{}))],widgets:[{widgetName:"options",widgetFunc:e=>u.jsx(ym,{...e})},{widgetName:"options1",widgetFunc:e=>u.jsx(Lm,{...e})},{widgetName:"options2",widgetFunc:e=>u.jsx(Mm,{...e})},{widgetName:"volteMenuPrincipal",widgetFunc:e=>u.jsx(Cm,{...e})},{widgetName:"variavel",widgetFunc:e=>u.jsx(Zn,{...e}),widgetFunc:e=>u.jsx(wm,{...e})},{widgetName:"condicional",widgetFunc:e=>u.jsx(Zn,{...e}),widgetFunc:e=>u.jsx(Em,{...e})},{widgetName:"lacoRepeticao",widgetFunc:e=>u.jsx(Zn,{...e}),widgetFunc:e=>u.jsx(Sm,{...e})},{widgetName:"identificarErroVariavel",widgetFunc:e=>u.jsx(xm,{...e})},{widgetName:"identificarErroCondicional",widgetFunc:e=>u.jsx(_m,{...e})},{widgetName:"identificarErroLacoRepeticao",widgetFunc:e=>u.jsx(bm,{...e})},{widgetName:"identificarErroVariavelYesOrNo",widgetFunc:e=>u.jsx(Im,{...e})},{widgetName:"identificarErroVariavelLines",widgetFunc:e=>u.jsx(km,{...e})},{widgetName:"vetores",widgetFunc:e=>u.jsx(Tm,{...e})},{widgetName:"vetoresanothercorrect",widgetFunc:e=>u.jsx(Pm,{...e})},{widgetName:"vetoresanotherincorrect",widgetFunc:e=>u.jsx(Nm,{...e})},{widgetName:"vetoreswe",widgetFunc:e=>u.jsx(Am,{...e})},{widgetName:"funcoeswe",widgetFunc:e=>u.jsx(jm,{...e})},{widgetName:"questionswe",widgetFunc:e=>u.jsx(Rm,{...e})}]},Ty=({children:e,actions:t})=>{const n=r=>{const o=r.toLowerCase(),i=["oi","ola","olá","hello","hi","hey","oi, tudo bem?","ola, tudo bem?","olá, tudo bem?","hello, tudo bem?","hi, tudo bem?","hey, tudo bem?","oi, tudo bem","ola, tudo bem","olá, tudo bem","hello, tudo bem","hi, tudo bem","hey, tudo bem","eae","eai","e aí","e aí?","eai?","eae?"],s=["variavel","variable","variável","variáveis","variables","var","1","um","um.","1.","um)","1)"],a=["2","dois","dois.","2.","dois)","2)","condicional","condicionais","conditional","conditionals","if","else","if-else","if else"],l=["3","tres","três","3.","três.","3)","três)","laco","laço","repeticao","repetição","loop","looping","for","while"];let c=!1;switch(!0){case i.some(d=>o.includes(d)):t.greet(),c=!0;break;case s.some(d=>o.includes(d)):t.handleVariavelQuiz(),c=!0;break;case a.some(d=>o.includes(d)):t.handleCondicionalQuiz(),c=!0;break;case l.some(d=>o.includes(d)):t.handleLacoRepeticao(),c=!0;break}c||t.handleDefaultMessage()};return u.jsx("div",{children:Se.Children.map(e,r=>Se.cloneElement(r,{parse:n,actions:t}))})};function zM(e,t){if(e==null)return{};var n={},r=Object.keys(e),o,i;for(i=0;i<r.length;i++)o=r[i],!(t.indexOf(o)>=0)&&(n[o]=e[o]);return n}function UM(e,t){if(e==null)return{};var n=zM(e,t),r,o;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)r=i[o],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function af(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function VM(e){if(Array.isArray(e))return af(e)}function BM(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function WM(e,t){if(e){if(typeof e=="string")return af(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return af(e,t)}}function qM(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function HM(e){return VM(e)||BM(e)||WM(e)||qM()}function ia(e){"@babel/helpers - typeof";return ia=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ia(e)}function GM(e,t){if(ia(e)!=="object"||e===null)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||"default");if(ia(r)!=="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function KM(e){var t=GM(e,"string");return ia(t)==="symbol"?t:String(t)}function ux(e,t,n){return t=KM(t),t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function lf(){return lf=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},lf.apply(this,arguments)}function Oy(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function ti(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Oy(Object(n),!0).forEach(function(r){ux(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Oy(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}function QM(e){var t=e.length;if(t===0||t===1)return e;if(t===2)return[e[0],e[1],"".concat(e[0],".").concat(e[1]),"".concat(e[1],".").concat(e[0])];if(t===3)return[e[0],e[1],e[2],"".concat(e[0],".").concat(e[1]),"".concat(e[0],".").concat(e[2]),"".concat(e[1],".").concat(e[0]),"".concat(e[1],".").concat(e[2]),"".concat(e[2],".").concat(e[0]),"".concat(e[2],".").concat(e[1]),"".concat(e[0],".").concat(e[1],".").concat(e[2]),"".concat(e[0],".").concat(e[2],".").concat(e[1]),"".concat(e[1],".").concat(e[0],".").concat(e[2]),"".concat(e[1],".").concat(e[2],".").concat(e[0]),"".concat(e[2],".").concat(e[0],".").concat(e[1]),"".concat(e[2],".").concat(e[1],".").concat(e[0])];if(t>=4)return[e[0],e[1],e[2],e[3],"".concat(e[0],".").concat(e[1]),"".concat(e[0],".").concat(e[2]),"".concat(e[0],".").concat(e[3]),"".concat(e[1],".").concat(e[0]),"".concat(e[1],".").concat(e[2]),"".concat(e[1],".").concat(e[3]),"".concat(e[2],".").concat(e[0]),"".concat(e[2],".").concat(e[1]),"".concat(e[2],".").concat(e[3]),"".concat(e[3],".").concat(e[0]),"".concat(e[3],".").concat(e[1]),"".concat(e[3],".").concat(e[2]),"".concat(e[0],".").concat(e[1],".").concat(e[2]),"".concat(e[0],".").concat(e[1],".").concat(e[3]),"".concat(e[0],".").concat(e[2],".").concat(e[1]),"".concat(e[0],".").concat(e[2],".").concat(e[3]),"".concat(e[0],".").concat(e[3],".").concat(e[1]),"".concat(e[0],".").concat(e[3],".").concat(e[2]),"".concat(e[1],".").concat(e[0],".").concat(e[2]),"".concat(e[1],".").concat(e[0],".").concat(e[3]),"".concat(e[1],".").concat(e[2],".").concat(e[0]),"".concat(e[1],".").concat(e[2],".").concat(e[3]),"".concat(e[1],".").concat(e[3],".").concat(e[0]),"".concat(e[1],".").concat(e[3],".").concat(e[2]),"".concat(e[2],".").concat(e[0],".").concat(e[1]),"".concat(e[2],".").concat(e[0],".").concat(e[3]),"".concat(e[2],".").concat(e[1],".").concat(e[0]),"".concat(e[2],".").concat(e[1],".").concat(e[3]),"".concat(e[2],".").concat(e[3],".").concat(e[0]),"".concat(e[2],".").concat(e[3],".").concat(e[1]),"".concat(e[3],".").concat(e[0],".").concat(e[1]),"".concat(e[3],".").concat(e[0],".").concat(e[2]),"".concat(e[3],".").concat(e[1],".").concat(e[0]),"".concat(e[3],".").concat(e[1],".").concat(e[2]),"".concat(e[3],".").concat(e[2],".").concat(e[0]),"".concat(e[3],".").concat(e[2],".").concat(e[1]),"".concat(e[0],".").concat(e[1],".").concat(e[2],".").concat(e[3]),"".concat(e[0],".").concat(e[1],".").concat(e[3],".").concat(e[2]),"".concat(e[0],".").concat(e[2],".").concat(e[1],".").concat(e[3]),"".concat(e[0],".").concat(e[2],".").concat(e[3],".").concat(e[1]),"".concat(e[0],".").concat(e[3],".").concat(e[1],".").concat(e[2]),"".concat(e[0],".").concat(e[3],".").concat(e[2],".").concat(e[1]),"".concat(e[1],".").concat(e[0],".").concat(e[2],".").concat(e[3]),"".concat(e[1],".").concat(e[0],".").concat(e[3],".").concat(e[2]),"".concat(e[1],".").concat(e[2],".").concat(e[0],".").concat(e[3]),"".concat(e[1],".").concat(e[2],".").concat(e[3],".").concat(e[0]),"".concat(e[1],".").concat(e[3],".").concat(e[0],".").concat(e[2]),"".concat(e[1],".").concat(e[3],".").concat(e[2],".").concat(e[0]),"".concat(e[2],".").concat(e[0],".").concat(e[1],".").concat(e[3]),"".concat(e[2],".").concat(e[0],".").concat(e[3],".").concat(e[1]),"".concat(e[2],".").concat(e[1],".").concat(e[0],".").concat(e[3]),"".concat(e[2],".").concat(e[1],".").concat(e[3],".").concat(e[0]),"".concat(e[2],".").concat(e[3],".").concat(e[0],".").concat(e[1]),"".concat(e[2],".").concat(e[3],".").concat(e[1],".").concat(e[0]),"".concat(e[3],".").concat(e[0],".").concat(e[1],".").concat(e[2]),"".concat(e[3],".").concat(e[0],".").concat(e[2],".").concat(e[1]),"".concat(e[3],".").concat(e[1],".").concat(e[0],".").concat(e[2]),"".concat(e[3],".").concat(e[1],".").concat(e[2],".").concat(e[0]),"".concat(e[3],".").concat(e[2],".").concat(e[0],".").concat(e[1]),"".concat(e[3],".").concat(e[2],".").concat(e[1],".").concat(e[0])]}var kd={};function JM(e){if(e.length===0||e.length===1)return e;var t=e.join(".");return kd[t]||(kd[t]=QM(e)),kd[t]}function XM(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0,r=e.filter(function(i){return i!=="token"}),o=JM(r);return o.reduce(function(i,s){return ti(ti({},i),n[s])},t)}function Py(e){return e.join(" ")}function YM(e,t){var n=0;return function(r){return n+=1,r.map(function(o,i){return dx({node:o,stylesheet:e,useInlineStyles:t,key:"code-segment-".concat(n,"-").concat(i)})})}}function dx(e){var t=e.node,n=e.stylesheet,r=e.style,o=r===void 0?{}:r,i=e.useInlineStyles,s=e.key,a=t.properties,l=t.type,c=t.tagName,d=t.value;if(l==="text")return d;if(c){var h=YM(n,i),f;if(!i)f=ti(ti({},a),{},{className:Py(a.className)});else{var g=Object.keys(n).reduce(function(m,p){return p.split(".").forEach(function(v){m.includes(v)||m.push(v)}),m},[]),y=a.className&&a.className.includes("token")?["token"]:[],w=a.className&&y.concat(a.className.filter(function(m){return!g.includes(m)}));f=ti(ti({},a),{},{className:Py(w)||void 0,style:XM(a.className,Object.assign({},a.style,o),n)})}var C=h(t.children);return Se.createElement(c,lf({key:s},f),C)}}const ZM=function(e,t){var n=e.listLanguages();return n.indexOf(t)!==-1};var eL=["language","children","style","customStyle","codeTagProps","useInlineStyles","showLineNumbers","showInlineLineNumbers","startingLineNumber","lineNumberContainerStyle","lineNumberStyle","wrapLines","wrapLongLines","lineProps","renderer","PreTag","CodeTag","code","astGenerator"];function Ny(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,r)}return n}function Nn(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?Ny(Object(n),!0).forEach(function(r){ux(e,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Ny(Object(n)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))})}return e}var tL=/\n/g;function nL(e){return e.match(tL)}function rL(e){var t=e.lines,n=e.startingLineNumber,r=e.style;return t.map(function(o,i){var s=i+n;return Se.createElement("span",{key:"line-".concat(i),className:"react-syntax-highlighter-line-number",style:typeof r=="function"?r(s):r},"".concat(s,`
`))})}function oL(e){var t=e.codeString,n=e.codeStyle,r=e.containerStyle,o=r===void 0?{float:"left",paddingRight:"10px"}:r,i=e.numberStyle,s=i===void 0?{}:i,a=e.startingLineNumber;return Se.createElement("code",{style:Object.assign({},n,o)},rL({lines:t.replace(/\n$/,"").split(`
`),style:s,startingLineNumber:a}))}function iL(e){return"".concat(e.toString().length,".25em")}function hx(e,t){return{type:"element",tagName:"span",properties:{key:"line-number--".concat(e),className:["comment","linenumber","react-syntax-highlighter-line-number"],style:t},children:[{type:"text",value:e}]}}function fx(e,t,n){var r={display:"inline-block",minWidth:iL(n),paddingRight:"1em",textAlign:"right",userSelect:"none"},o=typeof e=="function"?e(t):e,i=Nn(Nn({},r),o);return i}function Ol(e){var t=e.children,n=e.lineNumber,r=e.lineNumberStyle,o=e.largestLineNumber,i=e.showInlineLineNumbers,s=e.lineProps,a=s===void 0?{}:s,l=e.className,c=l===void 0?[]:l,d=e.showLineNumbers,h=e.wrapLongLines,f=typeof a=="function"?a(n):a;if(f.className=c,n&&i){var g=fx(r,n,o);t.unshift(hx(n,g))}return h&d&&(f.style=Nn(Nn({},f.style),{},{display:"flex"})),{type:"element",tagName:"span",properties:f,children:t}}function px(e){for(var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[],r=0;r<e.length;r++){var o=e[r];if(o.type==="text")n.push(Ol({children:[o],className:HM(new Set(t))}));else if(o.children){var i=t.concat(o.properties.className);px(o.children,i).forEach(function(s){return n.push(s)})}}return n}function sL(e,t,n,r,o,i,s,a,l){var c,d=px(e.value),h=[],f=-1,g=0;function y(k,P){var R=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[];return Ol({children:k,lineNumber:P,lineNumberStyle:a,largestLineNumber:s,showInlineLineNumbers:o,lineProps:n,className:R,showLineNumbers:r,wrapLongLines:l})}function w(k,P){if(r&&P&&o){var R=fx(a,P,s);k.unshift(hx(P,R))}return k}function C(k,P){var R=arguments.length>2&&arguments[2]!==void 0?arguments[2]:[];return t||R.length>0?y(k,P,R):w(k,P)}for(var m=function(){var P=d[g],R=P.children[0].value,T=nL(R);if(T){var Q=R.split(`
`);Q.forEach(function(A,_){var O=r&&h.length+i,W={type:"text",value:"".concat(A,`
`)};if(_===0){var V=d.slice(f+1,g).concat(Ol({children:[W],className:P.properties.className})),K=C(V,O);h.push(K)}else if(_===Q.length-1){var re=d[g+1]&&d[g+1].children&&d[g+1].children[0],ye={type:"text",value:"".concat(A)};if(re){var D=Ol({children:[ye],className:P.properties.className});d.splice(g+1,0,D)}else{var S=[ye],x=C(S,O,P.properties.className);h.push(x)}}else{var j=[W],L=C(j,O,P.properties.className);h.push(L)}}),f=g}g++};g<d.length;)m();if(f!==d.length-1){var p=d.slice(f+1,d.length);if(p&&p.length){var v=r&&h.length+i,b=C(p,v);h.push(b)}}return t?h:(c=[]).concat.apply(c,h)}function aL(e){var t=e.rows,n=e.stylesheet,r=e.useInlineStyles;return t.map(function(o,i){return dx({node:o,stylesheet:n,useInlineStyles:r,key:"code-segement".concat(i)})})}function mx(e){return e&&typeof e.highlightAuto<"u"}function lL(e){var t=e.astGenerator,n=e.language,r=e.code,o=e.defaultCodeValue;if(mx(t)){var i=ZM(t,n);return n==="text"?{value:o,language:"text"}:i?t.highlight(n,r):t.highlightAuto(r)}try{return n&&n!=="text"?{value:t.highlight(r,n)}:{value:o}}catch{return{value:o}}}function cL(e,t){return function(r){var o=r.language,i=r.children,s=r.style,a=s===void 0?t:s,l=r.customStyle,c=l===void 0?{}:l,d=r.codeTagProps,h=d===void 0?{className:o?"language-".concat(o):void 0,style:Nn(Nn({},a['code[class*="language-"]']),a['code[class*="language-'.concat(o,'"]')])}:d,f=r.useInlineStyles,g=f===void 0?!0:f,y=r.showLineNumbers,w=y===void 0?!1:y,C=r.showInlineLineNumbers,m=C===void 0?!0:C,p=r.startingLineNumber,v=p===void 0?1:p,b=r.lineNumberContainerStyle,k=r.lineNumberStyle,P=k===void 0?{}:k,R=r.wrapLines,T=r.wrapLongLines,Q=T===void 0?!1:T,A=r.lineProps,_=A===void 0?{}:A,O=r.renderer,W=r.PreTag,V=W===void 0?"pre":W,K=r.CodeTag,re=K===void 0?"code":K,ye=r.code,D=ye===void 0?(Array.isArray(i)?i[0]:i)||"":ye,S=r.astGenerator,x=UM(r,eL);S=S||e;var j=w?Se.createElement(oL,{containerStyle:b,codeStyle:h.style||{},numberStyle:P,startingLineNumber:v,codeString:D}):null,L=a.hljs||a['pre[class*="language-"]']||{backgroundColor:"#fff"},E=mx(S)?"hljs":"prismjs",N=g?Object.assign({},x,{style:Object.assign({},L,c)}):Object.assign({},x,{className:x.className?"".concat(E," ").concat(x.className):E,style:Object.assign({},c)});if(Q?h.style=Nn(Nn({},h.style),{},{whiteSpace:"pre-wrap"}):h.style=Nn(Nn({},h.style),{},{whiteSpace:"pre"}),!S)return Se.createElement(V,N,j,Se.createElement(re,h,D));(R===void 0&&O||Q)&&(R=!0),O=O||aL;var F=[{type:"text",value:D}],q=lL({astGenerator:S,language:o,code:D,defaultCodeValue:F});q.language===null&&(q.value=F);var X=q.value.length+v,ne=sL(q,R,_,w,m,v,X,P,Q);return Se.createElement(V,N,Se.createElement(re,h,!m&&j,O({rows:ne,stylesheet:a,useInlineStyles:g})))}}var Do={};function Dm(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(function(t){var n=e[t];typeof n=="object"&&!Object.isFrozen(n)&&Dm(n)}),e}var gx=Dm,uL=Dm;gx.default=uL;class Ay{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function pi(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function Cr(e,...t){const n=Object.create(null);for(const r in e)n[r]=e[r];return t.forEach(function(r){for(const o in r)n[o]=r[o]}),n}const dL="</span>",jy=e=>!!e.kind;class hL{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=pi(t)}openNode(t){if(!jy(t))return;let n=t.kind;t.sublanguage||(n=`${this.classPrefix}${n}`),this.span(n)}closeNode(t){jy(t)&&(this.buffer+=dL)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}class $m{constructor(){this.rootNode={children:[]},this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n={kind:t,children:[]};this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(r=>this._walk(t,r)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{$m._collapse(n)}))}}class fL extends $m{constructor(t){super(),this.options=t}addKeyword(t,n){t!==""&&(this.openNode(n),this.addText(t),this.closeNode())}addText(t){t!==""&&this.add(t)}addSublanguage(t,n){const r=t.root;r.kind=n,r.sublanguage=!0,this.add(r)}toHTML(){return new hL(this,this.options).value()}finalize(){return!0}}function pL(e){return new RegExp(e.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&"),"m")}function sa(e){return e?typeof e=="string"?e:e.source:null}function mL(...e){return e.map(n=>sa(n)).join("")}function gL(...e){return"("+e.map(n=>sa(n)).join("|")+")"}function vL(e){return new RegExp(e.toString()+"|").exec("").length-1}function yL(e,t){const n=e&&e.exec(t);return n&&n.index===0}const wL=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function EL(e,t="|"){let n=0;return e.map(r=>{n+=1;const o=n;let i=sa(r),s="";for(;i.length>0;){const a=wL.exec(i);if(!a){s+=i;break}s+=i.substring(0,a.index),i=i.substring(a.index+a[0].length),a[0][0]==="\\"&&a[1]?s+="\\"+String(Number(a[1])+o):(s+=a[0],a[0]==="("&&n++)}return s}).map(r=>`(${r})`).join(t)}const SL=/\b\B/,vx="[a-zA-Z]\\w*",Fm="[a-zA-Z_]\\w*",zm="\\b\\d+(\\.\\d+)?",yx="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",wx="\\b(0b[01]+)",xL="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",_L=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=mL(t,/.*\b/,e.binary,/\b.*/)),Cr({className:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,r)=>{n.index!==0&&r.ignoreMatch()}},e)},aa={begin:"\\\\[\\s\\S]",relevance:0},bL={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[aa]},CL={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[aa]},Ex={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},ju=function(e,t,n={}){const r=Cr({className:"comment",begin:e,end:t,contains:[]},n);return r.contains.push(Ex),r.contains.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):",relevance:0}),r},IL=ju("//","$"),kL=ju("/\\*","\\*/"),TL=ju("#","$"),OL={className:"number",begin:zm,relevance:0},PL={className:"number",begin:yx,relevance:0},NL={className:"number",begin:wx,relevance:0},AL={className:"number",begin:zm+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},jL={begin:/(?=\/[^/\n]*\/)/,contains:[{className:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[aa,{begin:/\[/,end:/\]/,relevance:0,contains:[aa]}]}]},RL={className:"title",begin:vx,relevance:0},ML={className:"title",begin:Fm,relevance:0},LL={begin:"\\.\\s*"+Fm,relevance:0},DL=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var ll=Object.freeze({__proto__:null,MATCH_NOTHING_RE:SL,IDENT_RE:vx,UNDERSCORE_IDENT_RE:Fm,NUMBER_RE:zm,C_NUMBER_RE:yx,BINARY_NUMBER_RE:wx,RE_STARTERS_RE:xL,SHEBANG:_L,BACKSLASH_ESCAPE:aa,APOS_STRING_MODE:bL,QUOTE_STRING_MODE:CL,PHRASAL_WORDS_MODE:Ex,COMMENT:ju,C_LINE_COMMENT_MODE:IL,C_BLOCK_COMMENT_MODE:kL,HASH_COMMENT_MODE:TL,NUMBER_MODE:OL,C_NUMBER_MODE:PL,BINARY_NUMBER_MODE:NL,CSS_NUMBER_MODE:AL,REGEXP_MODE:jL,TITLE_MODE:RL,UNDERSCORE_TITLE_MODE:ML,METHOD_GUARD:LL,END_SAME_AS_BEGIN:DL});function $L(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function FL(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=$L,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function zL(e,t){Array.isArray(e.illegal)&&(e.illegal=gL(...e.illegal))}function UL(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function VL(e,t){e.relevance===void 0&&(e.relevance=1)}const BL=["of","and","for","in","not","or","if","then","parent","list","value"],WL="keyword";function Sx(e,t,n=WL){const r={};return typeof e=="string"?o(n,e.split(" ")):Array.isArray(e)?o(n,e):Object.keys(e).forEach(function(i){Object.assign(r,Sx(e[i],t,i))}),r;function o(i,s){t&&(s=s.map(a=>a.toLowerCase())),s.forEach(function(a){const l=a.split("|");r[l[0]]=[i,qL(l[0],l[1])]})}}function qL(e,t){return t?Number(t):HL(e)?0:1}function HL(e){return BL.includes(e.toLowerCase())}function GL(e,{plugins:t}){function n(a,l){return new RegExp(sa(a),"m"+(e.case_insensitive?"i":"")+(l?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(l,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,l]),this.matchAt+=vL(l)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const l=this.regexes.map(c=>c[1]);this.matcherRe=n(EL(l),!0),this.lastIndex=0}exec(l){this.matcherRe.lastIndex=this.lastIndex;const c=this.matcherRe.exec(l);if(!c)return null;const d=c.findIndex((f,g)=>g>0&&f!==void 0),h=this.matchIndexes[d];return c.splice(0,d),Object.assign(c,h)}}class o{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(l){if(this.multiRegexes[l])return this.multiRegexes[l];const c=new r;return this.rules.slice(l).forEach(([d,h])=>c.addRule(d,h)),c.compile(),this.multiRegexes[l]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(l,c){this.rules.push([l,c]),c.type==="begin"&&this.count++}exec(l){const c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let d=c.exec(l);if(this.resumingScanAtSamePosition()&&!(d&&d.index===this.lastIndex)){const h=this.getMatcher(0);h.lastIndex=this.lastIndex+1,d=h.exec(l)}return d&&(this.regexIndex+=d.position+1,this.regexIndex===this.count&&this.considerAll()),d}}function i(a){const l=new o;return a.contains.forEach(c=>l.addRule(c.begin,{rule:c,type:"begin"})),a.terminatorEnd&&l.addRule(a.terminatorEnd,{type:"end"}),a.illegal&&l.addRule(a.illegal,{type:"illegal"}),l}function s(a,l){const c=a;if(a.isCompiled)return c;[UL].forEach(h=>h(a,l)),e.compilerExtensions.forEach(h=>h(a,l)),a.__beforeBegin=null,[FL,zL,VL].forEach(h=>h(a,l)),a.isCompiled=!0;let d=null;if(typeof a.keywords=="object"&&(d=a.keywords.$pattern,delete a.keywords.$pattern),a.keywords&&(a.keywords=Sx(a.keywords,e.case_insensitive)),a.lexemes&&d)throw new Error("ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ");return d=d||a.lexemes||/\w+/,c.keywordPatternRe=n(d,!0),l&&(a.begin||(a.begin=/\B|\b/),c.beginRe=n(a.begin),a.endSameAsBegin&&(a.end=a.begin),!a.end&&!a.endsWithParent&&(a.end=/\B|\b/),a.end&&(c.endRe=n(a.end)),c.terminatorEnd=sa(a.end)||"",a.endsWithParent&&l.terminatorEnd&&(c.terminatorEnd+=(a.end?"|":"")+l.terminatorEnd)),a.illegal&&(c.illegalRe=n(a.illegal)),a.contains||(a.contains=[]),a.contains=[].concat(...a.contains.map(function(h){return KL(h==="self"?a:h)})),a.contains.forEach(function(h){s(h,c)}),a.starts&&s(a.starts,l),c.matcher=i(c),c}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=Cr(e.classNameAliases||{}),s(e)}function xx(e){return e?e.endsWithParent||xx(e.starts):!1}function KL(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return Cr(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:xx(e)?Cr(e,{starts:e.starts?Cr(e.starts):null}):Object.isFrozen(e)?Cr(e):e}var QL="10.7.3";function JL(e){return!!(e||e==="")}function XL(e){const t={props:["language","code","autodetect"],data:function(){return{detectedLanguage:"",unknownLanguage:!1}},computed:{className(){return this.unknownLanguage?"":"hljs "+this.detectedLanguage},highlighted(){if(!this.autoDetect&&!e.getLanguage(this.language))return console.warn(`The language "${this.language}" you specified could not be found.`),this.unknownLanguage=!0,pi(this.code);let r={};return this.autoDetect?(r=e.highlightAuto(this.code),this.detectedLanguage=r.language):(r=e.highlight(this.language,this.code,this.ignoreIllegals),this.detectedLanguage=this.language),r.value},autoDetect(){return!this.language||JL(this.autodetect)},ignoreIllegals(){return!0}},render(r){return r("pre",{},[r("code",{class:this.className,domProps:{innerHTML:this.highlighted}})])}};return{Component:t,VuePlugin:{install(r){r.component("highlightjs",t)}}}}const YL={"after:highlightElement":({el:e,result:t,text:n})=>{const r=Ry(e);if(!r.length)return;const o=document.createElement("div");o.innerHTML=t.value,t.value=ZL(r,Ry(o),n)}};function cf(e){return e.nodeName.toLowerCase()}function Ry(e){const t=[];return function n(r,o){for(let i=r.firstChild;i;i=i.nextSibling)i.nodeType===3?o+=i.nodeValue.length:i.nodeType===1&&(t.push({event:"start",offset:o,node:i}),o=n(i,o),cf(i).match(/br|hr|img|input/)||t.push({event:"stop",offset:o,node:i}));return o}(e,0),t}function ZL(e,t,n){let r=0,o="";const i=[];function s(){return!e.length||!t.length?e.length?e:t:e[0].offset!==t[0].offset?e[0].offset<t[0].offset?e:t:t[0].event==="start"?e:t}function a(d){function h(f){return" "+f.nodeName+'="'+pi(f.value)+'"'}o+="<"+cf(d)+[].map.call(d.attributes,h).join("")+">"}function l(d){o+="</"+cf(d)+">"}function c(d){(d.event==="start"?a:l)(d.node)}for(;e.length||t.length;){let d=s();if(o+=pi(n.substring(r,d[0].offset)),r=d[0].offset,d===e){i.reverse().forEach(l);do c(d.splice(0,1)[0]),d=s();while(d===e&&d.length&&d[0].offset===r);i.reverse().forEach(a)}else d[0].event==="start"?i.push(d[0].node):i.pop(),c(d.splice(0,1)[0])}return o+pi(n.substr(r))}const My={},Td=e=>{console.error(e)},Ly=(e,...t)=>{console.log(`WARN: ${e}`,...t)},ln=(e,t)=>{My[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),My[`${e}/${t}`]=!0)},Od=pi,Dy=Cr,$y=Symbol("nomatch"),eD=function(e){const t=Object.create(null),n=Object.create(null),r=[];let o=!0;const i=/(^(<[^>]+>|\t|)+|\n)/gm,s="Could not find the language '{}', did you forget to load/include a language module?",a={disableAutodetect:!0,name:"Plain text",contains:[]};let l={noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:null,__emitter:fL};function c(E){return l.noHighlightRe.test(E)}function d(E){let N=E.className+" ";N+=E.parentNode?E.parentNode.className:"";const F=l.languageDetectRe.exec(N);if(F){const q=K(F[1]);return q||(Ly(s.replace("{}",F[1])),Ly("Falling back to no-highlight mode for this block.",E)),q?F[1]:"no-highlight"}return N.split(/\s+/).find(q=>c(q)||K(q))}function h(E,N,F,q){let X="",ne="";typeof N=="object"?(X=E,F=N.ignoreIllegals,ne=N.language,q=void 0):(ln("10.7.0","highlight(lang, code, ...args) has been deprecated."),ln("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),ne=E,X=N);const de={code:X,language:ne};x("before:highlight",de);const ke=de.result?de.result:f(de.language,de.code,F,q);return ke.code=de.code,x("after:highlight",ke),ke}function f(E,N,F,q){function X(B,J){const ae=Fe.case_insensitive?J[0].toLowerCase():J[0];return Object.prototype.hasOwnProperty.call(B.keywords,ae)&&B.keywords[ae]}function ne(){if(!Y.keywords){Z.addText(he);return}let B=0;Y.keywordPatternRe.lastIndex=0;let J=Y.keywordPatternRe.exec(he),ae="";for(;J;){ae+=he.substring(B,J.index);const Oe=X(Y,J);if(Oe){const[_t,Qr]=Oe;if(Z.addText(ae),ae="",we+=Qr,_t.startsWith("_"))ae+=J[0];else{const Da=Fe.classNameAliases[_t]||_t;Z.addKeyword(J[0],Da)}}else ae+=J[0];B=Y.keywordPatternRe.lastIndex,J=Y.keywordPatternRe.exec(he)}ae+=he.substr(B),Z.addText(ae)}function de(){if(he==="")return;let B=null;if(typeof Y.subLanguage=="string"){if(!t[Y.subLanguage]){Z.addText(he);return}B=f(Y.subLanguage,he,!0,et[Y.subLanguage]),et[Y.subLanguage]=B.top}else B=y(he,Y.subLanguage.length?Y.subLanguage:null);Y.relevance>0&&(we+=B.relevance),Z.addSublanguage(B.emitter,B.language)}function ke(){Y.subLanguage!=null?de():ne(),he=""}function ue(B){return B.className&&Z.openNode(Fe.classNameAliases[B.className]||B.className),Y=Object.create(B,{parent:{value:Y}}),Y}function Te(B,J,ae){let Oe=yL(B.endRe,ae);if(Oe){if(B["on:end"]){const _t=new Ay(B);B["on:end"](J,_t),_t.isMatchIgnored&&(Oe=!1)}if(Oe){for(;B.endsParent&&B.parent;)B=B.parent;return B}}if(B.endsWithParent)return Te(B.parent,J,ae)}function me(B){return Y.matcher.regexIndex===0?(he+=B[0],1):(ve=!0,0)}function oe(B){const J=B[0],ae=B.rule,Oe=new Ay(ae),_t=[ae.__beforeBegin,ae["on:begin"]];for(const Qr of _t)if(Qr&&(Qr(B,Oe),Oe.isMatchIgnored))return me(J);return ae&&ae.endSameAsBegin&&(ae.endRe=pL(J)),ae.skip?he+=J:(ae.excludeBegin&&(he+=J),ke(),!ae.returnBegin&&!ae.excludeBegin&&(he=J)),ue(ae),ae.returnBegin?0:J.length}function ge(B){const J=B[0],ae=N.substr(B.index),Oe=Te(Y,B,ae);if(!Oe)return $y;const _t=Y;_t.skip?he+=J:(_t.returnEnd||_t.excludeEnd||(he+=J),ke(),_t.excludeEnd&&(he=J));do Y.className&&Z.closeNode(),!Y.skip&&!Y.subLanguage&&(we+=Y.relevance),Y=Y.parent;while(Y!==Oe.parent);return Oe.starts&&(Oe.endSameAsBegin&&(Oe.starts.endRe=Oe.endRe),ue(Oe.starts)),_t.returnEnd?0:J.length}function Ae(){const B=[];for(let J=Y;J!==Fe;J=J.parent)J.className&&B.unshift(J.className);B.forEach(J=>Z.openNode(J))}let Ze={};function Ge(B,J){const ae=J&&J[0];if(he+=B,ae==null)return ke(),0;if(Ze.type==="begin"&&J.type==="end"&&Ze.index===J.index&&ae===""){if(he+=N.slice(J.index,J.index+1),!o){const Oe=new Error("0 width match regex");throw Oe.languageName=E,Oe.badRule=Ze.rule,Oe}return 1}if(Ze=J,J.type==="begin")return oe(J);if(J.type==="illegal"&&!F){const Oe=new Error('Illegal lexeme "'+ae+'" for mode "'+(Y.className||"<unnamed>")+'"');throw Oe.mode=Y,Oe}else if(J.type==="end"){const Oe=ge(J);if(Oe!==$y)return Oe}if(J.type==="illegal"&&ae==="")return 1;if(xt>1e5&&xt>J.index*3)throw new Error("potential infinite loop, way more iterations than matches");return he+=ae,ae.length}const Fe=K(E);if(!Fe)throw Td(s.replace("{}",E)),new Error('Unknown language: "'+E+'"');const ze=GL(Fe,{plugins:r});let Ue="",Y=q||ze;const et={},Z=new l.__emitter(l);Ae();let he="",we=0,ce=0,xt=0,ve=!1;try{for(Y.matcher.considerAll();;){xt++,ve?ve=!1:Y.matcher.considerAll(),Y.matcher.lastIndex=ce;const B=Y.matcher.exec(N);if(!B)break;const J=N.substring(ce,B.index),ae=Ge(J,B);ce=B.index+ae}return Ge(N.substr(ce)),Z.closeAllNodes(),Z.finalize(),Ue=Z.toHTML(),{relevance:Math.floor(we),value:Ue,language:E,illegal:!1,emitter:Z,top:Y}}catch(B){if(B.message&&B.message.includes("Illegal"))return{illegal:!0,illegalBy:{msg:B.message,context:N.slice(ce-100,ce+100),mode:B.mode},sofar:Ue,relevance:0,value:Od(N),emitter:Z};if(o)return{illegal:!1,relevance:0,value:Od(N),emitter:Z,language:E,top:Y,errorRaised:B};throw B}}function g(E){const N={relevance:0,emitter:new l.__emitter(l),value:Od(E),illegal:!1,top:a};return N.emitter.addText(E),N}function y(E,N){N=N||l.languages||Object.keys(t);const F=g(E),q=N.filter(K).filter(ye).map(ue=>f(ue,E,!1));q.unshift(F);const X=q.sort((ue,Te)=>{if(ue.relevance!==Te.relevance)return Te.relevance-ue.relevance;if(ue.language&&Te.language){if(K(ue.language).supersetOf===Te.language)return 1;if(K(Te.language).supersetOf===ue.language)return-1}return 0}),[ne,de]=X,ke=ne;return ke.second_best=de,ke}function w(E){return l.tabReplace||l.useBR?E.replace(i,N=>N===`
`?l.useBR?"<br>":N:l.tabReplace?N.replace(/\t/g,l.tabReplace):N):E}function C(E,N,F){const q=N?n[N]:F;E.classList.add("hljs"),q&&E.classList.add(q)}const m={"before:highlightElement":({el:E})=>{l.useBR&&(E.innerHTML=E.innerHTML.replace(/\n/g,"").replace(/<br[ /]*>/g,`
`))},"after:highlightElement":({result:E})=>{l.useBR&&(E.value=E.value.replace(/\n/g,"<br>"))}},p=/^(<[^>]+>|\t)+/gm,v={"after:highlightElement":({result:E})=>{l.tabReplace&&(E.value=E.value.replace(p,N=>N.replace(/\t/g,l.tabReplace)))}};function b(E){let N=null;const F=d(E);if(c(F))return;x("before:highlightElement",{el:E,language:F}),N=E;const q=N.textContent,X=F?h(q,{language:F,ignoreIllegals:!0}):y(q);x("after:highlightElement",{el:E,result:X,text:q}),E.innerHTML=X.value,C(E,F,X.language),E.result={language:X.language,re:X.relevance,relavance:X.relevance},X.second_best&&(E.second_best={language:X.second_best.language,re:X.second_best.relevance,relavance:X.second_best.relevance})}function k(E){E.useBR&&(ln("10.3.0","'useBR' will be removed entirely in v11.0"),ln("10.3.0","Please see https://github.com/highlightjs/highlight.js/issues/2559")),l=Dy(l,E)}const P=()=>{if(P.called)return;P.called=!0,ln("10.6.0","initHighlighting() is deprecated.  Use highlightAll() instead."),document.querySelectorAll("pre code").forEach(b)};function R(){ln("10.6.0","initHighlightingOnLoad() is deprecated.  Use highlightAll() instead."),T=!0}let T=!1;function Q(){if(document.readyState==="loading"){T=!0;return}document.querySelectorAll("pre code").forEach(b)}function A(){T&&Q()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",A,!1);function _(E,N){let F=null;try{F=N(e)}catch(q){if(Td("Language definition for '{}' could not be registered.".replace("{}",E)),o)Td(q);else throw q;F=a}F.name||(F.name=E),t[E]=F,F.rawDefinition=N.bind(null,e),F.aliases&&re(F.aliases,{languageName:E})}function O(E){delete t[E];for(const N of Object.keys(n))n[N]===E&&delete n[N]}function W(){return Object.keys(t)}function V(E){ln("10.4.0","requireLanguage will be removed entirely in v11."),ln("10.4.0","Please see https://github.com/highlightjs/highlight.js/pull/2844");const N=K(E);if(N)return N;throw new Error("The '{}' language is required, but not loaded.".replace("{}",E))}function K(E){return E=(E||"").toLowerCase(),t[E]||t[n[E]]}function re(E,{languageName:N}){typeof E=="string"&&(E=[E]),E.forEach(F=>{n[F.toLowerCase()]=N})}function ye(E){const N=K(E);return N&&!N.disableAutodetect}function D(E){E["before:highlightBlock"]&&!E["before:highlightElement"]&&(E["before:highlightElement"]=N=>{E["before:highlightBlock"](Object.assign({block:N.el},N))}),E["after:highlightBlock"]&&!E["after:highlightElement"]&&(E["after:highlightElement"]=N=>{E["after:highlightBlock"](Object.assign({block:N.el},N))})}function S(E){D(E),r.push(E)}function x(E,N){const F=E;r.forEach(function(q){q[F]&&q[F](N)})}function j(E){return ln("10.2.0","fixMarkup will be removed entirely in v11.0"),ln("10.2.0","Please see https://github.com/highlightjs/highlight.js/issues/2534"),w(E)}function L(E){return ln("10.7.0","highlightBlock will be removed entirely in v12.0"),ln("10.7.0","Please use highlightElement now."),b(E)}Object.assign(e,{highlight:h,highlightAuto:y,highlightAll:Q,fixMarkup:j,highlightElement:b,highlightBlock:L,configure:k,initHighlighting:P,initHighlightingOnLoad:R,registerLanguage:_,unregisterLanguage:O,listLanguages:W,getLanguage:K,registerAliases:re,requireLanguage:V,autoDetection:ye,inherit:Dy,addPlugin:S,vuePlugin:XL(e).VuePlugin}),e.debugMode=function(){o=!1},e.safeMode=function(){o=!0},e.versionString=QL;for(const E in ll)typeof ll[E]=="object"&&gx(ll[E]);return Object.assign(e,ll),e.addPlugin(m),e.addPlugin(YL),e.addPlugin(v),e};var tD=eD({}),nD=tD,_x={exports:{}};(function(e){(function(){var t;t=e.exports=o,t.format=o,t.vsprintf=r,typeof console<"u"&&typeof console.log=="function"&&(t.printf=n);function n(){console.log(o.apply(null,arguments))}function r(i,s){return o.apply(null,[i].concat(s))}function o(i){for(var s=1,a=[].slice.call(arguments),l=0,c=i.length,d="",h,f=!1,g,y,w=!1,C,m=function(){return a[s++]},p=function(){for(var v="";/\d/.test(i[l]);)v+=i[l++],h=i[l];return v.length>0?parseInt(v):null};l<c;++l)if(h=i[l],f)switch(f=!1,h=="."?(w=!1,h=i[++l]):h=="0"&&i[l+1]=="."?(w=!0,l+=2,h=i[l]):w=!0,C=p(),h){case"b":d+=parseInt(m(),10).toString(2);break;case"c":g=m(),typeof g=="string"||g instanceof String?d+=g:d+=String.fromCharCode(parseInt(g,10));break;case"d":d+=parseInt(m(),10);break;case"f":y=String(parseFloat(m()).toFixed(C||6)),d+=w?y:y.replace(/^0/,"");break;case"j":d+=JSON.stringify(m());break;case"o":d+="0"+parseInt(m(),10).toString(8);break;case"s":d+=m();break;case"x":d+="0x"+parseInt(m(),10).toString(16);break;case"X":d+="0x"+parseInt(m(),10).toString(16).toUpperCase();break;default:d+=h;break}else h==="%"?f=!0:d+=h;return d}})()})(_x);var rD=_x.exports,oD=rD,Gr=Kr(Error),iD=Gr;Gr.eval=Kr(EvalError);Gr.range=Kr(RangeError);Gr.reference=Kr(ReferenceError);Gr.syntax=Kr(SyntaxError);Gr.type=Kr(TypeError);Gr.uri=Kr(URIError);Gr.create=Kr;function Kr(e){return t.displayName=e.displayName||e.name,t;function t(n){return n&&(n=oD.apply(null,arguments)),new e(n)}}var Rn=nD,Pl=iD;Do.highlight=bx;Do.highlightAuto=aD;Do.registerLanguage=lD;Do.listLanguages=cD;Do.registerAlias=uD;ur.prototype.addText=fD;ur.prototype.addKeyword=dD;ur.prototype.addSublanguage=hD;ur.prototype.openNode=pD;ur.prototype.closeNode=mD;ur.prototype.closeAllNodes=Cx;ur.prototype.finalize=Cx;ur.prototype.toHTML=gD;var sD="hljs-";function bx(e,t,n){var r=Rn.configure({}),o=n||{},i=o.prefix,s;if(typeof e!="string")throw Pl("Expected `string` for name, got `%s`",e);if(!Rn.getLanguage(e))throw Pl("Unknown language: `%s` is not registered",e);if(typeof t!="string")throw Pl("Expected `string` for value, got `%s`",t);if(i==null&&(i=sD),Rn.configure({__emitter:ur,classPrefix:i}),s=Rn.highlight(t,{language:e,ignoreIllegals:!0}),Rn.configure(r||{}),s.errorRaised)throw s.errorRaised;return{relevance:s.relevance,language:s.language,value:s.emitter.rootNode.children}}function aD(e,t){var n=t||{},r=n.subset||Rn.listLanguages();n.prefix;var o=r.length,i=-1,s,a,l,c;if(typeof e!="string")throw Pl("Expected `string` for value, got `%s`",e);for(a={relevance:0,language:null,value:[]},s={relevance:0,language:null,value:[]};++i<o;)c=r[i],Rn.getLanguage(c)&&(l=bx(c,e,t),l.language=c,l.relevance>a.relevance&&(a=l),l.relevance>s.relevance&&(a=s,s=l));return a.language&&(s.secondBest=a),s}function lD(e,t){Rn.registerLanguage(e,t)}function cD(){return Rn.listLanguages()}function uD(e,t){var n=e,r;t&&(n={},n[e]=t);for(r in n)Rn.registerAliases(n[r],{languageName:r})}function ur(e){this.options=e,this.rootNode={children:[]},this.stack=[this.rootNode]}function dD(e,t){this.openNode(t),this.addText(e),this.closeNode()}function hD(e,t){var n=this.stack,r=n[n.length-1],o=e.rootNode.children,i=t?{type:"element",tagName:"span",properties:{className:[t]},children:o}:o;r.children=r.children.concat(i)}function fD(e){var t=this.stack,n,r;e!==""&&(n=t[t.length-1],r=n.children[n.children.length-1],r&&r.type==="text"?r.value+=e:n.children.push({type:"text",value:e}))}function pD(e){var t=this.stack,n=this.options.classPrefix+e,r=t[t.length-1],o={type:"element",tagName:"span",properties:{className:[n]},children:[]};r.children.push(o),t.push(o)}function mD(){this.stack.pop()}function gD(){return""}function Cx(){}var Ix=cL(Do,{});Ix.registerLanguage=Do.registerLanguage;const kx=Ix,Tx={"hljs-comment":{color:"#969896"},"hljs-quote":{color:"#969896"},"hljs-variable":{color:"#cc6666"},"hljs-template-variable":{color:"#cc6666"},"hljs-tag":{color:"#cc6666"},"hljs-name":{color:"#cc6666"},"hljs-selector-id":{color:"#cc6666"},"hljs-selector-class":{color:"#cc6666"},"hljs-regexp":{color:"#cc6666"},"hljs-deletion":{color:"#cc6666"},"hljs-number":{color:"#de935f"},"hljs-built_in":{color:"#de935f"},"hljs-builtin-name":{color:"#de935f"},"hljs-literal":{color:"#de935f"},"hljs-type":{color:"#de935f"},"hljs-params":{color:"#de935f"},"hljs-meta":{color:"#de935f"},"hljs-link":{color:"#de935f"},"hljs-attribute":{color:"#f0c674"},"hljs-string":{color:"#b5bd68"},"hljs-symbol":{color:"#b5bd68"},"hljs-bullet":{color:"#b5bd68"},"hljs-addition":{color:"#b5bd68"},"hljs-title":{color:"#81a2be"},"hljs-section":{color:"#81a2be"},"hljs-keyword":{color:"#b294bb"},"hljs-selector-tag":{color:"#b294bb"},hljs:{display:"block",overflowX:"auto",background:"#1d1f21",color:"#c5c8c6",padding:"0.5em"},"hljs-emphasis":{fontStyle:"italic"},"hljs-strong":{fontWeight:"bold"}},vD="Cálculo de média e classificação",yD="Trabalhando com Vetores",wD="Conhecimento básico de Java, estruturas de controle e vetores.",ED="Livro de Programação Java Avançada",SD="Desenvolver um programa em Java que calcule a média de notas de alunos e determine a situação deles (Aprovado, Reprovado, Recuperação) com base nas notas. O programa deve utilizar vetores para armazenar as notas dos alunos.",xD="O programa deve imprimir a média de notas de cada aluno e sua situação.",_D="Vídeo tutorial sobre como trabalhar com vetores em Java.",bD={thinking:"O problema do worked example correto envolve calcular a média de notas e determinar a situação do aluno com base na média. Isso pode ser resolvido com uma abordagem passo a passo.",solutionProposal:{steps:`
[PASSO 1]. Receber as notas dos alunos e armazená-las em um vetor.
[PASSO 2]. Percorrer o array somando todos os valores.
[PASSO 3]. Calcular a média das notas.
[PASSO 4]. Usar uma estrutura condicional para determinar a situação de cada aluno.
[PASSO 5]. Imprimir a média e a situação de cada aluno.`,test:"Você pode testar o programa com as seguintes notas: [7.5, 6.0, 8.3, 5.5, 9.2]. O resultado esperado é a média 7.3 para as notas desse aluno."},correctSolutionProposal:`public class CalculoMediaCorreto {
    public static void main(String[] args) {
        double[] notas = {7.5, 6.0, 8.3, 5.5, 9.2};
        double media = 0.0;
        for (int i = 1; i < notas.length; i++) {
            media += notas[i];
        }
        media /= notas.length;
        System.out.println("Média das notas: " + media);
        if (media >= 7.0) {
            System.out.println("Situação: Aprovado");
        } else if (media >= 5.0) {
            System.out.println("Situação: Recuperação");
        } else {
            System.out.println("Situação: Reprovado");
        }
    }
}`},CD={thinking:"O problema com worked example incorreto envolve um erro na solução do programa, o que pode ser uma oportunidade de aprendizado para os alunos.",incorrectSolution:`public class CalculoMediaIncorreto {
    public static void main(String[] args) {
        double[] notas = {7.5, 6.0, 8.3, 5.5, 9.2};
        double media = 0.0;
        for (int i = 1; i < notas.length; i++) {
            media += notas[i];
        }
        media /= notas.length;
        System.out.println("Média das notas: " + media);
        if (media >= 7.0) {
            System.out.println("Situação: Aprovado");
        } else if (media >= 5.0) {
            System.out.println("Situação: Recuperação");
        } else {
            System.out.println("Situação: Reprovado");
        }
    }
}`,test:"Você pode testar o programa com as mesmas notas: [7.5, 6.0, 8.3, 5.5, 9.2]. O resultado esperado é a média de cada aluno e sua situação, mas a solução proposta incorreta produzirá resultados errados.",options:{one:"linha 7",two:"linha 5",three:"linha 11",four:"line 2",five:"não sei identificar"},correctOption:"2",error:"O erro está na forma como a média é calculada na solução incorreta. A média deve começar a somar os valores começando da posição zero do array. Repare que o laço for começa no valor 1, portanto não atingirá o valor esperado de média 7.3",response:"O erro ocorre na parte em que a média é calculada na solução incorreta. Em vez de usar a função `average()` para calcular a média corretamente, a solução incorreta utiliza um loop e calcula a média de maneira incorreta.",correctSolutionProposal:`
[PASSO 1]. Receber as notas dos alunos e armazená-las em um vetor.
[PASSO 2]. Percorrer o array somando todos os valores.
[PASSO 3]. Calcular a média das notas.
[PASSO 4]. Usar uma estrutura condicional para determinar a situação de cada aluno.
[PASSO 5]. Imprimir a média e a situação de cada aluno.`},ID={title:vD,topic:yD,knowledge:wD,origin:ED,description:SD,result:xD,extra:_D,problemWECorrect:bD,problemWEIncorrect:CD},kD="Ordenação",TD="Ordenação de Vetores",OD="Conhecimento básico em Java e arrays.",PD="Material didático da universidade",ND="Implementar um algoritmo de ordenação de vetor em Java. O objetivo é classificar um vetor de números inteiros em ordem crescente.",AD="O programa deve imprimir o vetor original e o vetor ordenado em ordem crescente.",jD="Livros sobre algoritmos de ordenação e tutoriais sobre implementação de algoritmos de ordenação em Java.",RD={thinking:"O problema com worked example correto envolve a implementação de um algoritmo de ordenação de vetor, o que é uma habilidade fundamental em programação.",solutionProposal:{steps:`
[PASSO 1]. Criar um vetor de números inteiros.
[PASSO 2]. Implementar um algoritmo de ordenação, como o algoritmo de ordenação por inserção.
[PASSO 3]. Aplicar o algoritmo de ordenação ao vetor.
[PASSO 4]. Imprimir o vetor original e o vetor ordenado.`,test:"Você pode testar o programa com o vetor: [5, 2, 9, 1, 5, 3]. O resultado esperado é o vetor original [5, 2, 9, 1, 5, 3] e o vetor ordenado [1, 2, 3, 5, 5, 9]."},correctSolutionProposal:`public class OrdenacaoVetor {
    public static void main(String[] args) {
        int[] vetor = {5, 2, 9, 1, 5, 3};
        ordenarVetor(vetor);
        System.out.print("Vetor Original: ");
        imprimirVetor(vetor);
    }

    public static void ordenarVetor(int[] vetor) {
        for (int i = 1; i < vetor.length; i++) {
            int chave = vetor[i];
            int j = i - 1;
            while (j >= 0 && vetor[j] > chave) {
                vetor[j + 1] = vetor[j];
                j--;
            }
            vetor[j + 1] = chave;
        }
    }

    public static void imprimirVetor(int[] vetor) {
        for (int num : vetor) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`},MD={thinking:"O problema com worked example incorreto envolve um erro na implementação do algoritmo de ordenação, o que pode ser uma oportunidade de aprendizado para os alunos.",incorrectSolution:`public class OrdenacaoVetor {
    public static void main(String[] args) {
        int[] vetor = {5, 2, 9, 1, 5, 3};
        ordenarVetor(vetor);
        System.out.print("Vetor Original: ");
        imprimirVetor(vetor);
    }

    public static void ordenarVetor(int[] vetor) {
        for (int i = 1; i < vetor.length + 1; i++) {
            int chave = vetor[i];
            int j = i - 1;
            while (j >= 0 && vetor[j] > chave) {
                vetor[j + 1] = vetor[j];
                j--;
            }
            vetor[j + 1] = chave;
        }
    }

    public static void imprimirVetor(int[] vetor) {
        for (int num : vetor) {
            System.out.print(num + " ");
        }
        System.out.println();
    }
}`,test:"Você pode testar o programa com o vetor: [5, 2, 9, 1, 5, 3]. O resultado esperado é o vetor original [5, 2, 9, 1, 5, 3] e o vetor ordenado em ordem crescente [1, 2, 3, 5, 5, 9], mas a solução proposta incorreta produzirá resultados errados.",options:{one:"linha 2",two:"linhas de 4 e 5",three:"linha 10",four:"linha 8",five:"não sei identificar"},correctOption:"3",error:"O erro está na linha 19, onde ocorre o laço permite alcançar uma posição inexistente no vetor (vetor.length + 1) estourando o limite.",response:"O erro ocorre na parte em que o algoritmo de ordenação é implementado na solução incorreta fazendo com que haja acesso em posição inexistente.",correctSolutionProposal:`
[PASSO 1] Criar um vetor de números inteiros. 
[PASSO 2] Implementar um algoritmo de ordenação personalizado, como o algoritmo de ordenação por inserção. 
[PASSO 3] Aplicar o algoritmo de ordenação ao vetor. 
[PASSO 4] Imprimir o vetor original e o vetor ordenado.`},LD={title:kD,topic:TD,knowledge:OD,origin:PD,description:ND,result:AD,extra:jD,problemWECorrect:RD,problemWEIncorrect:MD},DD="Multiplicação de Matrizes",$D="Multiplicação de Matrizes em Java",FD="Conhecimento intermediário em Java, especialmente em manipulação de matrizes",zD="[Inserir de onde o material para o worked example foi retirado]",UD="Desenvolva um programa em Java que realize a multiplicação de duas matrizes. O programa deve ser capaz de receber duas matrizes como entrada e produzir a matriz resultante da multiplicação.",VD=`O programa deve multiplicar corretamente as duas matrizes de entrada e imprimir a matriz resultante. A matriz resultante para os valores do código é 
[58, 64]
[139, 154]`,BD="[Inserir material de apoio para resolução do problema]",WD={thinking:"Este exemplo visa demonstrar como realizar a multiplicação de duas matrizes em Java. Isso requer o uso de loops aninhados para iterar sobre as matrizes e calcular os elementos da matriz resultante.",solutionProposal:{steps:`
[PASSO 1]. Crie métodos para receber as matrizes como entrada. 
[PASSO 2]. Verifique se as matrizes são multiplicáveis (número de colunas da primeira matriz igual ao número de linhas da segunda matriz). 
[PASSO 3]. Crie loops aninhados para calcular cada elemento da matriz resultante. 
[PASSO 4]. Imprima a matriz resultante.`,test:"Execute o programa com matrizes apropriadas e verifique se a multiplicação é realizada corretamente."},correctSolutionProposal:`import java.util.Arrays;

public class MultiplicacaoMatrizes {
    public static void main(String[] args) {
        int[][] matrizA = {{1, 2, 3}, {4, 5, 6}};
        int[][] matrizB = {{7, 8}, {9, 10}, {11, 12}};

        if (matrizesMultiplicaveis(matrizA, matrizB)) {
            int[][] resultado = multiplicarMatrizes(matrizA, matrizB);
            imprimirMatriz(resultado);
        } else {
            System.out.println("Matrizes não são multiplicáveis.");
        }
    }

    private static boolean matrizesMultiplicaveis(int[][] matrizA, int[][] matrizB) {
        return matrizA[0].length == matrizB.length;
    }

    private static int[][] multiplicarMatrizes(int[][] matrizA, int[][] matrizB) {
        int linhasA = matrizA.length;
        int colunasA = matrizA[0].length;
        int colunasB = matrizB[0].length;

        int[][] resultado = new int[linhasA][colunasB];

        for (int i = 0; i < linhasA; i++) {
            for (int j = 0; j < colunasB; j++) {
                for (int k = 0; k < colunasA; k++) {
                    resultado[i][j] += matrizA[i][k] * matrizB[k][j];
                }
            }
        }

        return resultado;
    }

    private static void imprimirMatriz(int[][] matriz) {
        for (int[] linha : matriz) {
            System.out.println(Arrays.toString(linha));
        }
    }
}`},qD={thinking:"O exemplo incorreto apresenta um erro que afeta a lógica da multiplicação de matrizes. Isso serve para destacar a importância da correta manipulação dos índices e cálculos.",incorrectSolution:`public class MultiplicacaoMatrizesIncorreto {
    public static void main(String[] args) {
        int[][] matrizA = {{1, 2, 3}, {4, 5, 6}};
        int[][] matrizB = {{7, 8}, {9, 10}, {11, 12}};

        if (matrizesMultiplicaveis(matrizA, matrizB)) {
            int[][] resultado = multiplicarMatrizesIncorreto(matrizA, matrizB);
            imprimirMatriz(resultado);
        } else {
            System.out.println("Matrizes não são multiplicáveis.");
        }
     }

   private static boolean matrizesMultiplicaveis(int[][] matrizA, int[][] matrizB) {
        return matrizA[0].length == matrizB.length;
    }

    private static int[][] multiplicarMatrizesIncorreto(int[][] matrizA, int[][] matrizB) {
        int linhasA = matrizA.length;
        int colunasA = matrizA[0].length;
        int colunasB = matrizB[0].length;

        int[][] resultado = new int[linhasA][colunasB];

        for (int i = 0; i < linhasA; i++) {
            for (int j = 0; j < colunasB; j++) {
                for (int k = 0; k < colunasA; k++) {
                    resultado[i][j] += matrizA[i][k] * matrizB[k][i];
                }
            }
        }

        return resultado;
    }

    private static void imprimirMatriz(int[][] matriz) {
        for (int[] linha : matriz) {
            System.out.println(Arrays.toString(linha));
        }
    }
}`,test:"Execute o programa e verifique se a multiplicação de matrizes é realizada incorretamente.",options:{one:"linha 29",two:"linha 28",three:"linha 31",four:"linha 32",five:"não sei identificar"},correctOption:"2",error:"O erro está na manipulação dos índices ao calcular a multiplicação de matrizes. O índice 'k' deveria ser 'k' em vez de 'i' na linha 31.",response:"O erro ocorre na linha 31, onde o índice 'k' deveria ser 'k' em vez de 'i' para corretamente calcular a multiplicação de matrizes.",correctSolutionProposal:`[PASSO 1] Modificar a linha 31 para 'resultado[i][j] += matrizA[i][k] * matrizB[k][j];'. 
[PASSO 2] Execute o programa novamente para verificar se agora a multiplicação de matrizes é realizada corretamente.`},HD={title:DD,topic:$D,knowledge:FD,origin:zD,description:UD,result:VD,extra:BD,problemWECorrect:WD,problemWEIncorrect:qD},GD="Busca Binária",KD="Busca Binária em Vetor Ordenado",QD="Conhecimento intermediário em Java e algoritmo de busca binária",JD="[Inserir de onde o material para o worked example foi retirado]",XD="Codifique o algoritmo de busca binária em um vetor ordenado em Java. O programa deve ser capaz de encontrar um elemento específico no vetor e retornar sua posição, se existir.",YD="O programa deve realizar a busca binária corretamente e retornar a posição do elemento no vetor, ou indicar que o elemento não foi encontrado.",ZD="[Inserir material de apoio para resolução do problema]",e3={thinking:"Este exemplo visa demonstrar como implementar o algoritmo de busca binária em um vetor ordenado em Java. A busca binária é eficiente para vetores ordenados e reduz o tempo de busca.",solutionProposal:{steps:`
[PASSO 1]. Certifique-se de que o vetor está ordenado. 
[PASSO 2]. Defina os índices 'esquerda' e 'direita' para delimitar a busca. 
[PASSO 3]. Enquanto 'esquerda' for menor ou igual a 'direita', calcule o 'meio'. 
[PASSO 4]. Se o elemento no 'meio' for igual ao alvo, retorne a posição. 
[PASSO 5]. Se o elemento no 'meio' for menor que o alvo, atualize 'esquerda' para 'meio + 1'. 
[PASSO 6]. Se o elemento no 'meio' for maior que o alvo, atualize 'direita' para 'meio - 1'. 
[PASSO 7]. Se o loop terminar, o elemento não foi encontrado.`,test:"Execute o programa com um vetor ordenado e verifique se ele encontra corretamente o elemento específico."},correctSolutionProposal:`public class BuscaBinaria {
    public static void main(String[] args) {
        int[] vetorOrdenado = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int alvo = 7;

        int resultado = buscaBinaria(vetorOrdenado, alvo);

        if (resultado != -1) {
            System.out.println("Elemento encontrado na posição: " + resultado);
        } else {
            System.out.println("Elemento não encontrado no vetor.");
        }
    }

    private static int buscaBinaria(int[] vetor, int alvo) {
        int esquerda = 0;
        int direita = vetor.length - 1;

        while (esquerda <= direita) {
            int meio = esquerda + (direita - esquerda) / 2;

            if (vetor[meio] == alvo) {
                return meio;
            }

            if (vetor[meio] < alvo) {
                esquerda = meio + 1;
            } else {
                direita = meio - 1;
            }
        }

        return -1; // Elemento não encontrado
    }
}`},t3={thinking:"O exemplo incorreto apresenta um erro que afeta a lógica da busca binária. Isso serve para destacar a importância da correta implementação do algoritmo.",incorrectSolution:`public class BuscaBinariaIncorreto {
    public static void main(String[] args) {
        int[] vetorOrdenado = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int alvo = 7;

        int resultado = buscaBinariaIncorreta(vetorOrdenado, alvo);
        if (resultado != -1) {
            System.out.println("Elemento encontrado na posição: " + resultado);
        } else {
            System.out.println("Elemento não encontrado no vetor.");
        }
    }

    private static int buscaBinariaIncorreta(int[] vetor, int alvo) {
        int esquerda = 0;
        int direita = vetor.length - 1;

        while (esquerda <= direita) {
            int meio = esquerda + (direita - esquerda) / 2;

            if (vetor[meio] == alvo) {
                return meio + 1; 
            }

            if (vetor[meio] < alvo) {
                esquerda = meio + 1;
            } else {
                direita = meio - 1;
            }
        }

        return -1; // Elemento não encontrado
    }
}`,test:"Execute o programa e verifique se a busca binária é realizada incorretamente.",options:{one:"linha 22",two:"linha 24",three:"linha 25",four:"linha 26",five:"não sei identificar"},correctOption:"1",error:"O erro está na linha 23, onde a posição retornada é 'meio + 1' em vez de apenas 'meio'. Isso resulta em uma posição incorreta quando o elemento é encontrado.",response:"O erro ocorre na linha 23, onde a posição retornada é 'meio + 1' em vez de apenas 'meio'. Isso resulta em uma posição incorreta quando o elemento é encontrado.",correctSolutionProposal:`[PASSO 1] Modificar a linha 23 para 'return meio;' em vez de 'return meio + 1;'. 
[PASSO 2] Execute o programa novamente para verificar se agora a busca binária é realizada corretamente.`},n3={title:GD,topic:KD,knowledge:QD,origin:JD,description:XD,result:YD,extra:ZD,problemWECorrect:e3,problemWEIncorrect:t3},r3="Impressão",o3="Impressão de Números em um Array",i3="Conhecimento básico em sintaxe Java",s3="[Inserir de onde o material para o worked example foi retirado]",a3="Escreva um programa em Java que imprima os números de 1 a 10 em um array.",l3="O programa deve criar um array e imprimir os números de 1 a 10.",c3="[Inserir material de apoio para resolução do problema]",u3={thinking:"Este exemplo visa demonstrar como criar um array em Java e preenchê-lo com números de 1 a 10. É um exercício simples para praticar a criação e impressão de arrays.",solutionProposal:{steps:`
[PASSO 1]. Crie um array de inteiros para armazenar os números de 1 a 10. 
[PASSO 2]. Use um loop 'for' para iterar de 1 a 10. 
[PASSO 3]. Dentro do loop, adicione cada número ao array. 
[PASSO 4]. Após o loop, imprima os números no array.`,test:"Execute o programa e verifique se ele cria um array e imprime os números de 1 a 10 corretamente."},correctSolutionProposal:`public class NumerosIncorreto {
    public static void main(String[] args) {
        int[] numeros = new int[10];

        for (int i = 1; i <= 10; i++) {
            numeros[i] = i;
        }

        for (int numero : numeros) {
            System.out.println(numero);
        }
    }
}`},d3={thinking:"O exemplo incorreto apresenta um erro que afeta a lógica do programa. Isso serve para destacar a importância da correta manipulação dos índices ao preencher o array.",incorrectSolution:`public class NumerosIncorreto {
    public static void main(String[] args) {
        int[] numeros = new int[10];

        for (int i = 1; i <= 10; i++) {
            numeros[i] = i;
        }

        for (int numero : numeros) {
            System.out.println(numero);
        }
    }
}`,test:"Execute o programa e verifique se ele cria um array e imprime os números incorretamente.",options:{one:"linha 5",two:"linha 9",three:"linha 11",four:"linha 1",five:"não sei identificar"},correctOption:"1",error:"O erro está na manipulação dos índices ao adicionar os números ao array. O índice 'i' deveria ser 'i - 1' para garantir que os números sejam adicionados nas posições corretas do array.",response:"O erro ocorre na linha 7, onde o índice 'i' deveria ser 'i - 1' para garantir que os números sejam adicionados nas posições corretas do array.",correctSolutionProposal:`[PASSO 1] Modificar a linha 7 para 'numeros[i - 1] = i;'. 
[PASSO 2] Execute o programa novamente para verificar se agora cria e imprime corretamente os números de 1 a 10.`},h3={title:r3,topic:o3,knowledge:i3,origin:s3,description:a3,result:l3,extra:c3,problemWECorrect:u3,problemWEIncorrect:d3},f3="Somatório",p3="Soma de Números em um Array",m3="Conhecimento básico em sintaxe Java",g3="[Inserir de onde o material para o worked example foi retirado]",v3="Escreva um programa em Java que crie um array de números e imprima a soma de todos os números do array.",y3="O programa deve criar um array de números e imprimir corretamente a soma de todos os números do array.",w3="[Inserir material de apoio para resolução do problema]",E3={thinking:"Este exemplo visa demonstrar como criar um array de números em Java e calcular a soma de seus elementos. Isso requer o uso de loops para preencher o array e calcular a soma.",solutionProposal:{steps:`
[PASSO 1]. Crie um array de inteiros para armazenar os números. 
[PASSO 2]. Use um loop para preencher o array com números. 
[PASSO 3]. Utilize outro loop para calcular a soma dos números no array. 
[PASSO 4]. Imprima a soma calculada.`,test:"Execute o programa e verifique se ele cria o array e imprime corretamente a soma dos números."},correctSolutionProposal:`public class SomaArrayNumeros {
    public static void main(String[] args) {
        int[] arrayNumeros = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

        // Calcular a soma dos números no array
        int soma = 0;
        for (int numero : arrayNumeros) {
            soma += numero;
        }

        // Imprimir a soma
        System.out.println("A soma dos números no array é: " + soma);
    }
}`},S3={thinking:"O exemplo incorreto apresenta um erro que afeta a lógica do programa. Isso serve para destacar a importância da correta manipulação de arrays e cálculos.",incorrectSolution:`public class SomaArrayNumerosIncorreto {
    public static void main(String[] args) {
        int[] arrayNumeros = new int[10];

        // Preencher o array com números (exemplo: 1 a 10)
        for (int i = 1; i <= 10; i++) {
            arrayNumeros[i] = i;
        }

        // Calcular a soma dos números no array
        int soma = 0;
        for (int i = 0; i < arrayNumeros.length; i++) {
            soma += arrayNumeros[i];
        }

        // Imprimir a soma
        System.out.println("A soma dos números no array é: " + soma);
    }
}`,test:"Execute o programa e verifique se a soma dos números é realizada incorretamente.",options:{one:"linha 12",two:"linha 6",three:"linha 13",four:"linha 4",five:"não sei identificar"},correctOption:"2",error:"O erro está na linha 6, onde o índice 'i' ultrapassa o tamanho do array ao adicionar os números. Isso resulta em uma exceção de índice fora dos limites.",response:"O erro ocorre na linha 11, onde o índice 'i' ultrapassa o tamanho do array ao adicionar os números. Isso resulta em uma exceção de índice fora dos limites. A correção seria 'arrayNumeros[i - 1] = i;' para corrigir a manipulação do índice.",correctSolutionProposal:`[PASSO 1] Modificar a linha 11 para 'arrayNumeros[i - 1] = i;'. 
[PASSO 2] Execute o programa novamente para verificar se agora a soma dos números é realizada corretamente.`},x3={title:f3,topic:p3,knowledge:m3,origin:g3,description:v3,result:y3,extra:w3,problemWECorrect:E3,problemWEIncorrect:S3},_3="Criação com números aleatórios",b3="Criação de Array com Números Aleatórios",C3="Conhecimento básico em sintaxe Java",I3="[Inserir de onde o material para o worked example foi retirado]",k3="Escreva um programa em Java que crie um array de 5 números aleatórios entre 1 e 100 e imprima o array.",T3="O programa deve criar um array de 5 números aleatórios entre 1 e 100 e imprimir corretamente o array.",O3="[Inserir material de apoio para resolução do problema]",P3={thinking:"Este exemplo visa demonstrar como criar um array de números aleatórios em Java e imprimir o array resultante. Isso requer o uso da classe Random para gerar números aleatórios e um loop para preencher o array.",solutionProposal:{steps:`
[PASSO 1]. Importe a classe Random. 
[PASSO 2]. Crie um array de inteiros com tamanho 5. 
[PASSO 3]. Use um loop para gerar e atribuir números aleatórios entre 1 e 100 ao array. 
[PASSO 4]. Imprima o array de números aleatórios.`,test:"Execute o programa e verifique se ele cria o array e imprime corretamente o array de números aleatórios."},correctSolutionProposal:`import java.util.Random;

public class NumerosAleatoriosArray {
    public static void main(String[] args) {
        // Importar a classe Random
        Random random = new Random();

        // Criar um array de inteiros com tamanho 5
        int[] arrayAleatorio = new int[5];

        // Preencher o array com números aleatórios entre 1 e 100
        for (int i = 0; i < arrayAleatorio.length; i++) {
            arrayAleatorio[i] = random.nextInt(100) + 1;
        }

        // Imprimir o array de números aleatórios
        for (int numero : arrayAleatorio) {
            System.out.print(numero + " ");
        }
    }
}`},N3={thinking:"O exemplo incorreto apresenta um erro que afeta a lógica do programa. Isso serve para destacar a importância da correta manipulação de números aleatórios e preenchimento de arrays.",incorrectSolution:`import java.util.Random;

public class NumerosAleatoriosArrayIncorreto {
    public static void main(String[] args) {
        // Importar a classe Random
        Random random = new Random();

        // Criar um array de inteiros com tamanho 5
        int[] arrayAleatorio = new int[5];

        // Preencher o array com números aleatórios entre 0 e 100
        for (int i = 0; i <= arrayAleatorio.length; i++) {
            arrayAleatorio[i] = random.nextInt(101);
        }

        // Imprimir o array de números aleatórios
        for (int numero : arrayAleatorio) {
            System.out.print(numero + " ");
        }
    }
}`,test:"Execute o programa e verifique se o array de números aleatórios é gerado incorretamente.",options:{one:"linha 12",two:"linha 14",three:"linha 16",four:"linha 17",five:"não sei identificar"},correctOption:"1",error:"O erro está na geração dos números aleatórios na linha 12, onde o sinal <= faz o laço acessar posição inexistente no array.",response:"O erro está na geração dos números aleatórios na linha 12, onde o sinal <= faz o laço acessar posição inexistente no array. Para corrigir basta mudar o sinal para apenas <",correctSolutionProposal:`[PASSO 1] Modificar a expressão na linha 16 para 'random.nextInt(100) + 1'. 
[PASSO 2] Execute o programa novamente para verificar se agora o array de números aleatórios é gerado corretamente.`},A3={title:_3,topic:b3,knowledge:C3,origin:I3,description:k3,result:T3,extra:O3,problemWECorrect:P3,problemWEIncorrect:N3},j3="Interseção",R3="Interseção de Arrays de Números Inteiros",M3="Conhecimento básico em sintaxe Java",L3="[Inserir de onde o material para o worked example foi retirado]",D3="Escreva um programa em Java que crie dois arrays de números inteiros e crie um terceiro array que contém os números inteiros comuns nos dois arrays.",$3="O programa deve criar dois arrays de números inteiros e, em seguida, criar um terceiro array que contenha os números inteiros comuns nos dois arrays originais.",F3="[Inserir material de apoio para resolução do problema]",z3={thinking:"Este exemplo visa demonstrar como criar dois arrays de números inteiros em Java e criar um terceiro array que contenha os números inteiros comuns nos dois arrays originais. Isso requer o uso de loops para preencher os arrays e encontrar a interseção.",solutionProposal:{steps:`
[PASSO 1]. Crie dois arrays de inteiros para armazenar os números. 
[PASSO 2]. Use loops para preencher os dois arrays. 
[PASSO 3]. Crie um terceiro array para armazenar a interseção. 
[PASSO 4]. Use loops aninhados para comparar os elementos dos dois arrays e adicionar os comuns ao terceiro array. 
[PASSO 5]. Imprima o terceiro array.`,test:"Execute o programa e verifique se ele cria os arrays corretamente, encontra a interseção e imprime corretamente o terceiro array."},correctSolutionProposal:`public class IntersecaoArraysInteiros {
    public static void main(String[] args) {
        int[] array1 = {1, 2, 3, 4, 5};
        int[] array2 = {4, 5, 6, 7, 8};

        int[] intersecao = encontrarIntersecao(array1, array2);
        System.out.println("A interseção dos arrays é: " + Arrays.toString(intersecao));
    }

    private static int[] encontrarIntersecao(int[] array1, int[] array2) {
        int contadorComum = 0;
        for (int numero1 : array1) {
            for (int numero2 : array2) {
                if (numero1 == numero2) {
                    contadorComum ++;
                    break; // Evitar duplicatas
                }
            }
        }

        int[] intersecaoArray = new int[contadorComum];
        int contadorArray = 0;
        for (int numero1 : array1) {
            for (int numero2 : array2) {
                if (numero1 == numero2) {
                    intersecaoArray[contadorArray] = numero1; 
                    contadorArray ++;
                    break; // Evitar duplicatas
                }
            }
        }
        return intersecaoArray;
    }
}`},U3={thinking:"O exemplo incorreto apresenta um erro que afeta a lógica do programa. Isso serve para destacar a importância da correta manipulação de arrays e cálculos.",incorrectSolution:`public class IntersecaoArraysInteiros {
    public static void main(String[] args) {
        int[] array1 = {1, 2, 3, 4, 5};
        int[] array2 = {4, 5, 6, 7, 8};

        int[] intersecao = encontrarIntersecao(array1, array2);
        System.out.println("A interseção dos arrays é: " + Arrays.toString(intersecao));
    }

    private static int[] encontrarIntersecao(int[] array1, int[] array2) {
        int contadorComum = 0;
        for (int numero1 : array1) {
            for (int numero2 : array2) {
                if (numero1 == numero2) {
                    contadorComum ++;
                    break; // Evitar duplicatas
                }
            }
        }

        int[] intersecaoArray = new int[contadorComum];
        int contadorArray = 0;
        for (int numero1 : array1) {
            for (int numero2 : array2) {
                if (numero1 == numero2) {
                    intersecaoArray[contadorArray] = numero1; 
                    break; // Evitar duplicatas
                }
                contadorArray ++;
            }
        }
        return intersecaoArray;
    }
}`,test:"Execute o programa e verifique se a interseção dos arrays é encontrada incorretamente.",options:{one:"linha 19",two:"linha 20",three:"linha 25",four:"linha 29",five:"não sei identificar"},correctOption:"4",error:"O erro está na lógica de comparação na linha 29, o incremento está fora do condicional if, fazendo o com que ocorra acesso a posição inexistente no array.",response:"Para corrigir é necessario colocar o incremento do vetor de intersecção dentro do if onde ocorre a inclusão do elemento.",correctSolutionProposal:`[PASSO 1] Remover a linha 19 ou adicionar 'break;' após a linha 19 para interromper o loop interno quando uma correspondência for encontrada. 
[PASSO 2] Execute o programa novamente para verificar se agora a interseção dos arrays é encontrada corretamente.`},V3={title:j3,topic:R3,knowledge:M3,origin:L3,description:D3,result:$3,extra:F3,problemWECorrect:z3,problemWEIncorrect:U3},B3="Maior Elemento",W3="Encontrar o Maior Número em um Vetor",q3="Conhecimento básico em sintaxe Java",H3="[Inserir de onde o material para o worked example foi retirado]",G3="Escreva um programa em Java que crie um vetor de números e imprima o maior número do vetor.",K3="O programa deve criar um vetor de números e imprimir corretamente o maior número presente no vetor.",Q3="[Inserir material de apoio para resolução do problema]",J3={thinking:"Este exemplo visa demonstrar como criar um vetor de números em Java e encontrar o maior número presente no vetor. Isso requer o uso de um loop para percorrer o vetor e uma variável para armazenar o maior número encontrado.",solutionProposal:{steps:`
[PASSO 1]. Crie um vetor de números (array). 
[PASSO 2]. Use um loop para percorrer o vetor. 
[PASSO 3]. Dentro do loop, compare cada número com o maior número atualmente armazenado. 
[PASSO 4]. Se o número atual for maior, atualize a variável do maior número. 
[PASSO 5]. Após o loop, imprima o maior número encontrado.`,test:"Execute o programa e verifique se ele cria o vetor e imprime corretamente o maior número."},correctSolutionProposal:`public class MaiorNumeroVetor {
    public static void main(String[] args) {
        int[] vetorNumeros = {5, 10, 3, 8, 15, 7, 20};

        // Encontrar o maior número no vetor
        int maiorNumero = vetorNumeros[0];
        for (int numero : vetorNumeros) {
            if (numero > maiorNumero) {
                maiorNumero = numero;
            }
        }

        // Imprimir o maior número
        System.out.println("O maior número no vetor é: " + maiorNumero);
    }
}`},X3={thinking:"O exemplo incorreto apresenta um erro que afeta a lógica do programa. Isso serve para destacar a importância da correta manipulação de vetores e cálculos.",incorrectSolution:`public class MaiorNumeroVetorIncorreto {
    public static void main(String[] args) {
        int[] vetorNumeros = {-5, -10, -3, -8, -15, -7, 20};

        // Encontrar o maior número no vetor
        int maiorNumero = 0;
        for (int numero : vetorNumeros) {
            if (numero >= maiorNumero) {
                maiorNumero = numero;
            }
        }

        // Imprimir o maior número
        System.out.println("O maior número no vetor é: " + maiorNumero);
    }
}`,test:"Execute o programa e verifique se o maior número no vetor é encontrado incorretamente.",options:{one:"linha 10",two:"linha 11",three:"linha 12",four:"linha 6",five:"não sei identificar"},correctOption:"4",error:"O erro está na inicialização da variável 'maiorNumero' na linha 6, que pode resultar em um resultado incorreto quando o vetor contém números negativos. Além disso, a condição na linha 11 não permite que o maior número seja o primeiro elemento do vetor.",response:"O erro está na inicialização da variável 'maiorNumero' na linha 10, que pode resultar em um resultado incorreto quando o vetor contém números negativos. Além disso, a condição na linha 11 não permite que o maior número seja o primeiro elemento do vetor. A correção seria iniciar 'maiorNumero' com o primeiro elemento do vetor e ajustar a condição para 'numero > maiorNumero'.",correctSolutionProposal:`[PASSO 1] Iniciar 'maiorNumero' com o primeiro elemento do vetor: 'int maiorNumero = vetorNumeros[0];'. 
[PASSO 2] Modificar a condição na linha 11 para 'if (numero > maiorNumero)'. 
[PASSO 3] Execute o programa novamente para verificar se agora o maior número no vetor é encontrado corretamente.`},Y3={title:B3,topic:W3,knowledge:q3,origin:H3,description:G3,result:K3,extra:Q3,problemWECorrect:J3,problemWEIncorrect:X3},Z3="Impressão números ímpares",e$="Impressão de Números Ímpares em um Array",t$="Conhecimento básico em sintaxe Java",n$="[Inserir de onde o material para o worked example foi retirado]",r$="Escreva um programa em Java que crie um array de números inteiros e imprima todos os números ímpares do array.",o$="O programa deve criar um array de números inteiros e imprimir corretamente todos os números ímpares presentes no array.",i$="[Inserir material de apoio para resolução do problema]",s$={thinking:"Este exemplo visa demonstrar como criar um array de números inteiros em Java e imprimir todos os números ímpares presentes no array. Isso requer o uso de um loop para percorrer o array e uma condição para verificar se cada número é ímpar.",solutionProposal:{steps:`
[PASSO 1]. Crie um array de números inteiros. 
[PASSO 2]. Use um loop para percorrer o array. 
[PASSO 3]. Dentro do loop, verifique se cada número é ímpar. 
[PASSO 4]. Se o número for ímpar, imprima-o.`,test:"Execute o programa e verifique se ele cria o array e imprime corretamente todos os números ímpares."},correctSolutionProposal:`public class NumerosImparesArray {
    public static void main(String[] args) {
        int[] arrayNumeros = {2, 5, 8, 11, 14, 17, 20, 23};

        // Imprimir números ímpares no array
        for (int numero : arrayNumeros) {
            if (numero % 2 != 0) {
                System.out.println(numero);
            }
        }
    }
}`},a$={thinking:"O exemplo incorreto apresenta um erro que afeta a lógica do programa. Isso serve para destacar a importância da correta manipulação de arrays e condições.",incorrectSolution:`public class NumerosImparesArrayIncorreto {
    public static void main(String[] args) {
        int[] arrayNumeros = {2, 5, 8, 11, 14, 17, 20, 23};

        // Imprimir números ímpares no array
        for (int numero : arrayNumeros) {
            if (numero / 2 != 0) {
                System.out.println(numero);
            }
        }
    }
}`,test:"Execute o programa e verifique se os números ímpares no array são encontrados incorretamente.",options:{one:"linha 11",two:"linha 12",three:"linha 13",four:"linha 14",five:"não sei identificar"},correctOption:"1",error:"O erro está na condição na linha 7, que verifica se o número é par (estaá como divisão por 2 e deveria ser divisível por 2). Isso resulta em uma impressão de todos os números.",response:"O erro está na condição na linha 11, que verifica se o número é par (divisível por 2). Isso resulta em uma impressão dos números pares em vez dos ímpares. A correção seria modificar a condição para 'if (numero % 2 != 0)' para verificar se o número é ímpar.",correctSolutionProposal:`[PASSO 1] Modificar a condição na linha 11 para 'if (numero % 2 != 0)'. 
[PASSO 2] Execute o programa novamente para verificar se agora os números ímpares no array são encontrados corretamente.`},l$={title:Z3,topic:e$,knowledge:t$,origin:n$,description:r$,result:o$,extra:i$,problemWECorrect:s$,problemWEIncorrect:a$},Oc=[ID,LD,HD,n3,h3,x3,A3,V3,Y3,l$],c$="Soma de Dois Números",u$="Trabalhando com Funções em C",d$="Conhecimento básico de C e funções.",h$="Livro de Programação em Linguagem C",f$="Desenvolver uma função em C que aceite dois números como parâmetros e retorne a soma desses dois números.",p$="A função deve imprimir ou retornar a soma dos dois números.",m$="Vídeo tutorial sobre como trabalhar com funções em C.",g$={thinking:"O problema do worked example correto envolve a criação de uma função em C que aceite dois números e retorne sua soma.",solutionProposal:{steps:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita dois parâmetros.
[PASSO 2]. Dentro da função, adicionar os dois números.
[PASSO 3]. Retornar a soma dos dois números.`,test:"Você pode testar a função com os seguintes valores: 5 e 7. O resultado esperado é 12."},correctSolutionProposal:`#include <stdio.h>

int somarNumeros(int numero1, int numero2) {
    return numero1 + numero2;
}

int main() {
    int resultado = somarNumeros(5, 7);
    printf("Resultado da soma: %d\\n", resultado);
    return 0;
}`},v$={thinking:"O problema com worked example incorreto envolve um erro na solução da função, o que pode ser uma oportunidade de aprendizado para os alunos.",incorrectSolution:`#include <stdio.h>

int somarNumerosIncorreto(int numero1, int numero2) {
    return numero1 - numero2;
}

int main() {
    int resultado = somarNumerosIncorreto(5, 7);
    printf("Resultado da soma: %d\\n", resultado);
    return 0;
}`,test:"Você pode testar a função com os mesmos valores: 5 e 7. O resultado esperado é a soma correta dos dois números, mas a solução proposta incorreta produzirá resultados errados.",options:{one:"linha 3",two:"linha 4",three:"linha 8",four:"linha 9",five:"não sei identificar"},correctOption:"2",error:"O erro está na forma como a função retorna a soma. A solução incorreta está subtraindo os números em vez de somá-los.",response:"O erro ocorre na parte em que a função retorna a soma na solução incorreta. Em vez de usar o operador de adição, a solução incorreta usa o operador de subtração.",correctSolutionProposal:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita dois parâmetros.
[PASSO 2]. Dentro da função, adicionar os dois números.
[PASSO 3]. Retornar a soma dos dois números.`},y$={title:c$,topic:u$,knowledge:d$,origin:h$,description:f$,result:p$,extra:m$,problemWECorrect:g$,problemWEIncorrect:v$},w$="Cálculo do Fatorial",E$="Trabalhando com Funções em C",S$="Conhecimento básico de C e funções.",x$="Livro de Programação em Linguagem C",_$="Desenvolver uma função em C que aceite um número como parâmetro e retorne o fatorial desse número.",b$="A função deve imprimir ou retornar o fatorial do número.",C$="Vídeo tutorial sobre como trabalhar com funções em C.",I$={thinking:"O problema do worked example correto envolve a criação de uma função em C que calcule o fatorial de um número.",solutionProposal:{steps:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita um parâmetro.
[PASSO 2]. Dentro da função, calcular o fatorial usando um loop.
[PASSO 3]. Retornar o resultado do fatorial.`,test:"Você pode testar a função com o seguinte valor: 5. O resultado esperado é 120."},correctSolutionProposal:`#include <stdio.h>

int calcularFatorial(int numero) {
    int fatorial = 1;
    for (int i = 1; i <= numero; i++) {
        fatorial *= i;
    }
    return fatorial;
}

int main() {
    int resultado = calcularFatorial(5);
    printf("Resultado do fatorial: %d\\n", resultado);
    return 0;
}`},k$={thinking:"O problema com worked example incorreto envolve um erro na solução da função, o que pode ser uma oportunidade de aprendizado para os alunos.",incorrectSolution:`#include <stdio.h>

int calcularFatorialIncorreto(int numero) {
    int fatorial = 1;
    for (int i = 1; i <= numero; i++) {
        fatorial += i;
    }
    return fatorial;
}

int main() {
    int resultado = calcularFatorialIncorreto(5);
    printf("Resultado do fatorial: %d\\n", resultado);
    return 0;
}`,test:"Você pode testar a função com o mesmo valor: 5. O resultado esperado é o fatorial correto do número, mas a solução proposta incorreta produzirá resultados errados.",options:{one:"linha 9",two:"linha 7",three:"linha 11",four:"linha 6",five:"não sei identificar"},correctOption:"4",error:"O erro está na forma como a função calcula o fatorial. A solução incorreta está usando o operador de adição em vez de multiplicação.",response:"O erro ocorre na parte em que a função calcula o fatorial na solução incorreta. Em vez de multiplicar o fatorial pelo valor de 'i', a solução incorreta está usando o operador de adição.",correctSolutionProposal:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita um parâmetro.
[PASSO 2]. Dentro da função, calcular o fatorial usando um loop.
[PASSO 3]. Retornar o resultado do fatorial.`},T$={title:w$,topic:E$,knowledge:S$,origin:x$,description:_$,result:b$,extra:C$,problemWECorrect:I$,problemWEIncorrect:k$},O$="Verificação de Número Primo",P$="Trabalhando com Funções em C",N$="Conhecimento básico de C e funções.",A$="Livro de Programação em Linguagem C",j$="Desenvolver uma função em C que aceite um número como parâmetro e determine se esse número é primo.",R$="A função deve imprimir ou retornar se o número é primo ou não.",M$="Vídeo tutorial sobre como trabalhar com funções em C.",L$={thinking:"O problema do worked example correto envolve a criação de uma função em C que verifica se um número é primo.",solutionProposal:{steps:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita um parâmetro.
[PASSO 2]. Dentro da função, verificar se o número é menor ou igual a 1 (números menores ou iguais a 1 não são primos).
[PASSO 3]. Utilizar um loop para verificar se o número é divisível por algum outro número até a sua metade.
[PASSO 4]. Se o número for divisível por algum outro número, ele não é primo. Caso contrário, é primo.
[PASSO 5]. Retornar se o número é primo ou não.`,test:"Você pode testar a função com o seguinte valor: 7. O resultado esperado é que 7 seja considerado primo."},correctSolutionProposal:`#include <stdio.h>
#include <stdbool.h>//biblioteca para usar os tipo bool(true/false)

bool verificarNumeroPrimo(int numero) {
    if (numero <= 1) {
        return false;
    }

    for (int i = 2; i <= numero / 2; i++) {
        if (numero % i == 0) {
            return false;
        }
    }

    return true;
}

int main() {
    int numero = 7;
    if (verificarNumeroPrimo(numero)) {
        printf("%d é primo.\\n", numero);
    } else {
        printf("%d não é primo.\\n", numero);
    }
    return 0;
}`},D$={thinking:"O problema com worked example incorreto envolve um erro na solução da função, o que pode ser uma oportunidade de aprendizado para os alunos.",incorrectSolution:`#include <stdio.h>
#include <stdbool.h>

bool verificarNumeroPrimoIncorreto(int numero) {
    if (numero == 2) {
        return true;
    }

    for (int i = 2; i < numero; i++) {
        if (numero % i == 0) {
            return false;
        }
    }

    return true;
}

int main() {
    int numero = 7;
    if (verificarNumeroPrimoIncorreto(numero)) {
        printf("%d é primo.\\n", numero);
    } else {
        printf("%d não é primo.\\n", numero);
    }
    return 0;
}`,test:"Você pode testar a função com o mesmo valor: 7. O resultado esperado é que 7 seja considerado primo, mas a solução proposta incorreta produzirá resultados errados.",options:{one:"linha 11",two:"linha 5",three:"linha 10",four:"linha 20",five:"não sei identificar"},correctOption:"2",error:"O erro está na forma como a função verifica se o número é primo. A solução incorreta não considera o caso especial do número 2 e verifica a divisibilidade até o número, em vez de até sua metade.",response:"O erro está na forma como a função verifica se o número é primo. A solução incorreta não considera o caso especial do número 2 e verifica a divisibilidade até o número, em vez de até sua metade.",correctSolutionProposal:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita um parâmetro.
[PASSO 2]. Dentro da função, verificar se o número é menor ou igual a 1 (números menores ou iguais a 1 não são primos).
[PASSO 3]. Utilizar um loop para verificar se o número é divisível por algum outro número até a sua metade.
[PASSO 4]. Se o número for divisível por algum outro número, ele não é primo. Caso contrário, é primo.
[PASSO 5]. Retornar se o número é primo ou não.`},$$={title:O$,topic:P$,knowledge:N$,origin:A$,description:j$,result:R$,extra:M$,problemWECorrect:L$,problemWEIncorrect:D$},F$="Inversão de String",z$="Trabalhando com Funções em C",U$="Conhecimento básico de C e funções.",V$="Livro de Programação em Linguagem C",B$="Desenvolver uma função em C que aceite uma string como parâmetro e retorne a versão invertida dessa string.",W$="A função deve imprimir ou retornar a string invertida.",q$="Vídeo tutorial sobre como trabalhar com funções em C.",H$={thinking:"O problema do worked example correto envolve a criação de uma função em C que inverta uma string.",solutionProposal:{steps:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita uma string como parâmetro.
[PASSO 2]. Utilizar um loop para percorrer a string e inverter os caracteres.
[PASSO 3]. Retornar a string invertida.`,test:"Você pode testar a função com a seguinte string: 'hello'. O resultado esperado é 'olleh'."},correctSolutionProposal:`#include <stdio.h>
#include <string.h>

void inverterString(char *str) {
    int comprimento = strlen(str);
    for (int i = 0, j = comprimento - 1; i < j; i++, j--) {
        char temp = str[i];
        str[i] = str[j];
        str[j] = temp;
    }
}

int main() {
    char minhaString[] = "hello";
    inverterString(minhaString);
    printf("String invertida: %s\\n", minhaString);
    return 0;
}`},G$={thinking:"O problema com worked example incorreto envolve um erro na solução da função, o que pode ser uma oportunidade de aprendizado para os alunos.",incorrectSolution:`#include <stdio.h>
#include <string.h>

void inverterStringIncorreto(char *str) {
    int comprimento = strlen(str);
    for (int i = 0; i < comprimento; i++) {
        char temp = str[i];
        str[i] = str[comprimento - i - 1];
        str[comprimento - i - 1] = temp;
    }
}

int main() {
    char minhaString[] = "hello";
    inverterStringIncorreto(minhaString);
    printf("String invertida: %s\\n", minhaString);
    return 0;
}`,test:"Você pode testar a função com a mesma string: 'hello'. O resultado esperado é a string invertida 'olleh', mas a solução proposta incorreta produzirá resultados errados.",options:{one:"linha 10",two:"linha 9",three:"linha 11",four:"linha 6",five:"não sei identificar"},correctOption:"2",error:"O erro está na forma como a função percorre a string. A solução incorreta não atualiza corretamente os índices durante a inversão.",response:"O erro ocorre na parte em que a função percorre a string na solução incorreta. Em vez de inverter os caracteres corretamente, a solução incorreta não atualiza corretamente os índices durante a inversão.",correctSolutionProposal:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita uma string como parâmetro.
[PASSO 2]. Utilizar um loop para percorrer a string e inverter os caracteres.
[PASSO 3]. Retornar a string invertida.`},K$={title:F$,topic:z$,knowledge:U$,origin:V$,description:B$,result:W$,extra:q$,problemWECorrect:H$,problemWEIncorrect:G$},Q$="Contagem de Consoantes",J$="Trabalhando com Funções em C",X$="Conhecimento básico de C e funções.",Y$="Livro de Programação em Linguagem C",Z$="Desenvolver uma função em C que aceite um vetor de caracteres (palavra) e uma variável inteira com o tamanho do vetor e retorne a quantidade de consoantes na palavra.",e4="A função deve imprimir ou retornar a contagem de consoantes na palavra.",t4="Vídeo tutorial sobre como trabalhar com funções em C.",n4={thinking:"O problema do worked example correto envolve a criação de uma função em C que conta as consoantes em uma palavra.",solutionProposal:{steps:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita um vetor de caracteres e um inteiro como parâmetros.
[PASSO 2]. Utilizar um loop para percorrer cada caractere da palavra.
[PASSO 3]. Verificar se o caractere é uma consoante (não é uma vogal) e incrementar o contador.
[PASSO 4]. Retornar o resultado do contador.`,test:"Você pode testar a função com a seguinte palavra: 'programming'. O resultado esperado é 7, pois 'p', 'r', 'g', 'r', 'm', 'm', 'n' são consoantes."},correctSolutionProposal:`#include <stdio.h>
#include <ctype.h>

int contarConsoantes(char palavra[], int tamanho) {
    int contadorConsoantes = 0;

    for (int i = 0; i < tamanho; i++) {
        char caractere = tolower(palavra[i]);

        if (isalpha(caractere) && strchr("aeiou", caractere) == NULL) {
            contadorConsoantes++;
        }
    }

    return contadorConsoantes;
}

int main() {
    char minhaPalavra[] = "programming";
    int tamanhoPalavra = sizeof(minhaPalavra) - 1;
    int resultado = contarConsoantes(minhaPalavra, tamanhoPalavra);
    printf("Número de consoantes: %d\\n", resultado);
    return 0;
}`},r4={thinking:"O problema com worked example incorreto envolve um erro na solução da função, o que pode ser uma oportunidade de aprendizado para os alunos.",incorrectSolution:`#include <stdio.h>
#include <ctype.h>

int contarConsoantesIncorreto(char palavra[], int tamanho) {
    int contadorConsoantes = 0;

    for (int i = 0; i <= tamanho; i++) {
        char caractere = tolower(palavra[i]);

        if (!isalpha(caractere) || strchr("aeiou", caractere) != NULL) {
            contadorConsoantes++;
        }
    }

    return contadorConsoantes;
}

int main() {
    char minhaPalavra[] = "programming";
    int tamanhoPalavra = sizeof(minhaPalavra) - 1;
    int resultado = contarConsoantesIncorreto(minhaPalavra, tamanhoPalavra);
    printf("Número de consoantes: %d\\n", resultado);
    return 0;
}`,test:"Você pode testar a função com a mesma palavra: 'programming'. O resultado esperado é 7, mas a solução proposta incorreta produzirá resultados errados.",options:{one:"linha 11",two:"linha 10",three:"linha 12",four:"linha 7",five:"não sei identificar"},correctOption:"2",error:"O erro está na forma como a função verifica se o caractere é uma consoante. A solução incorreta incrementa o contador para caracteres que não são alfabéticos ou são vogais.",response:"O erro está na forma como a função verifica se o caractere é uma consoante. A solução incorreta incrementa o contador para caracteres que não são alfabéticos ou são vogais.",correctSolutionProposal:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita um vetor de caracteres e um inteiro como parâmetros.
[PASSO 2]. Utilizar um loop para percorrer cada caractere da palavra.
[PASSO 3]. Verificar se o caractere é uma consoante (não é uma vogal) e incrementar o contador.
[PASSO 4]. Retornar o resultado do contador.`},o4={title:Q$,topic:J$,knowledge:X$,origin:Y$,description:Z$,result:e4,extra:t4,problemWECorrect:n4,problemWEIncorrect:r4},i4="Verificação de Palíndromo",s4="Trabalhando com Funções em C",a4="Conhecimento básico de C e funções.",l4="Livro de Programação em Linguagem C",c4="Desenvolver uma função em C que aceite uma string como parâmetro e retorne verdadeiro se a string for um palíndromo e falso caso contrário.",u4="A função deve imprimir ou retornar se a string é um palíndromo.",d4="Vídeo tutorial sobre como trabalhar com funções em C.",h4={thinking:"O problema do worked example correto envolve a criação de uma função em C que verifica se uma string é um palíndromo.",solutionProposal:{steps:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita uma string como parâmetro.
[PASSO 2]. Utilizar dois ponteiros para percorrer a string, um do início ao fim e outro do fim ao início.
[PASSO 3]. Comparar os caracteres correspondentes nos dois ponteiros.
[PASSO 4]. Se todos os pares de caracteres correspondentes forem iguais, a string é um palíndromo.
[PASSO 5]. Retornar verdadeiro se a string for um palíndromo, falso caso contrário.`,test:"Você pode testar a função com a seguinte string: 'radar'. O resultado esperado é verdadeiro, pois 'radar' é um palíndromo."},correctSolutionProposal:`#include <stdio.h>
#include <stdbool.h>
#include <string.h>

bool verificarPalindromo(char *str) {
    int comprimento = strlen(str);

    for (int i = 0, j = comprimento - 1; i < j; i++, j--) {
        if (str[i] != str[j]) {
            return false;
        }
    }

    return true;
}

int main() {
    char minhaString[] = "radar";
    if (verificarPalindromo(minhaString)) {
        printf("A string é um palíndromo.\\n");
    } else {
        printf("A string não é um palíndromo.\\n");
    }
    return 0;
}`},f4={thinking:"O problema com worked example incorreto envolve um erro na solução da função, o que pode ser uma oportunidade de aprendizado para os alunos.",incorrectSolution:`#include <stdio.h>
#include <stdbool.h>
#include <string.h>

bool verificarPalindromoIncorreto(char *str) {
    int comprimento = strlen(str);

    for (int i = 0; i <= comprimento; i++) {
        if (str[i] != str[comprimento - i - 1]) {
            return false;
        }
    }

    return true;
}

int main() {
    char minhaString[] = "radar";
    if (verificarPalindromoIncorreto(minhaString)) {
        printf("A string é um palíndromo.\\n");
    } else {
        printf("A string não é um palíndromo.\\n");
    }
    return 0;
}`,test:"Você pode testar a função com a mesma string: 'radar'. O resultado esperado é verdadeiro, mas a solução proposta incorreta produzirá resultados errados.",options:{one:"linha 10",two:"linha 9",three:"linha 12",four:"linha 7",five:"não sei identificar"},correctOption:"2",error:"O erro está na forma como a função percorre a string. A solução incorreta não compara os caracteres correspondentes corretamente.",response:"O erro está na forma como a função percorre a string. A solução incorreta não compara os caracteres correspondentes corretamente.",correctSolutionProposal:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita uma string como parâmetro.
[PASSO 2]. Utilizar dois ponteiros para percorrer a string, um do início ao fim e outro do fim ao início.
[PASSO 3]. Comparar os caracteres correspondentes nos dois ponteiros.
[PASSO 4]. Se todos os pares de caracteres correspondentes forem iguais, a string é um palíndromo.
[PASSO 5]. Retornar verdadeiro se a string for um palíndromo, falso caso contrário.`},p4={title:i4,topic:s4,knowledge:a4,origin:l4,description:c4,result:u4,extra:d4,problemWECorrect:h4,problemWEIncorrect:f4},m4="Ordenação Crescente",g4="Trabalhando com Funções em C",v4="Conhecimento básico de C e funções.",y4="Livro de Programação em Linguagem C",w4="Desenvolver uma função em C que aceite um vetor de inteiros e o seu tamanho como parâmetros, e retorne o vetor ordenado em ordem crescente.",E4="A função deve imprimir ou retornar o vetor ordenado.",S4="Vídeo tutorial sobre como trabalhar com funções em C.",x4={thinking:"O problema do worked example correto envolve a criação de uma função em C que ordena um array de inteiros em ordem crescente.",solutionProposal:{steps:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita um vetor de inteiros e um inteiro como parâmetros.
[PASSO 2]. Utilizar um algoritmo de ordenação, como o Bubble Sort, para ordenar os elementos do vetor.
[PASSO 3]. Retornar o vetor ordenado.`,test:"Você pode testar a função com o seguinte vetor: {5, 2, 8, 1, 3}. O resultado esperado é {1, 2, 3, 5, 8}."},correctSolutionProposal:`#include <stdio.h>

void ordenarCrescente(int vetor[], int tamanho) {
    for (int i = 0; i < tamanho - 1; i++) {
        for (int j = 0; j < tamanho - i - 1; j++) {
            if (vetor[j] > vetor[j + 1]) {
                // Trocar os elementos se estiverem fora de ordem
                int temp = vetor[j];
                vetor[j] = vetor[j + 1];
                vetor[j + 1] = temp;
            }
        }
    }
}

int main() {
    int meuVetor[] = {5, 2, 8, 1, 3};
    int tamanhoVetor = sizeof(meuVetor) / sizeof(meuVetor[0]);

    ordenarCrescente(meuVetor, tamanhoVetor);

    printf("Vetor ordenado em ordem crescente: { ");
    for (int i = 0; i < tamanhoVetor; i++) {
        printf("%d ", meuVetor[i]);
    }
    printf("}\\n");

    return 0;
}`},_4={thinking:"O problema com worked example incorreto envolve um erro na solução da função, o que pode ser uma oportunidade de aprendizado para os alunos.",incorrectSolution:`#include <stdio.h>

void ordenarCrescenteIncorreto(int vetor[], int tamanho) {
    for (int i = 0; i < tamanho; i++) {
        for (int j = 0; j < tamanho - i - 1; j++) {
            if (vetor[j] == vetor[j + 1]) {
                // Trocar os elementos se estiverem fora de ordem
                int temp = vetor[j];
                vetor[j] = vetor[j + 1];
                vetor[j + 1] = temp;
            }
        }
    }
}

int main() {
    int meuVetor[] = {5, 2, 8, 1, 3};
    int tamanhoVetor = sizeof(meuVetor) / sizeof(meuVetor[0]);

    ordenarCrescenteIncorreto(meuVetor, tamanhoVetor);

    printf("Vetor ordenado em ordem crescente: { ");
    for (int i = 0; i < tamanhoVetor; i++) {
        printf("%d ", meuVetor[i]);
    }
    printf("}\\n");

    return 0;
}`,test:"Você pode testar a função com o mesmo vetor: {5, 2, 8, 1, 3}. O resultado esperado é {1, 2, 3, 5, 8}, mas a solução proposta incorreta produzirá resultados errados.",options:{one:"linha 7",two:"linha 8",three:"linha 6",four:"linha 5",five:"não sei identificar"},correctOption:"4",error:"O erro está na forma como a função compara os elementos do vetor. A solução incorreta não compara para saber se um elemento é maior que o outro.",response:"O erro está na forma como a função percorre o vetor. A solução incorreta não ajusta corretamente os limites do loop externo.",correctSolutionProposal:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita um vetor de inteiros e um inteiro como parâmetros.
[PASSO 2]. Utilizar um algoritmo de ordenação, como o Bubble Sort, para ordenar os elementos do vetor.
[PASSO 3]. Retornar o vetor ordenado.`},b4={title:m4,topic:g4,knowledge:v4,origin:y4,description:w4,result:E4,extra:S4,problemWECorrect:x4,problemWEIncorrect:_4},C4="Multiplicação de array por valor",I4="Trabalhando com Funções em C",k4="Conhecimento básico de C e funções.",T4="Livro de Programação em Linguagem C",O4="Desenvolver uma função em C que aceite um vetor de inteiros e o seu tamanho como parâmetros, e retorne o vetor com cada valor multiplicado por um fator específico.",P4="A função deve imprimir ou retornar o vetor resultante da multiplicação.",N4="Vídeo tutorial sobre como trabalhar com funções em C.",A4={thinking:"O problema do worked example correto envolve a criação de uma função em C que multiplica os valores de um array de inteiros por um fator específico.",solutionProposal:{steps:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita um vetor de inteiros e um inteiro como parâmetros.
[PASSO 2]. Utilizar um loop para percorrer cada elemento do vetor e multiplicá-lo pelo fator específico.
[PASSO 3]. Retornar o vetor resultante.`,test:"Você pode testar a função com o seguinte vetor: {3, 7, 2, 5} e um fator de multiplicação de 2. O resultado esperado é {6, 14, 4, 10}."},correctSolutionProposal:`#include <stdio.h>

void multiplicarValores(int vetor[], int tamanho, int fator) {
    for (int i = 0; i < tamanho; i++) {
        vetor[i] *= fator;
    }
}

int main() {
    int meuVetor[] = {3, 7, 2, 5};
    int tamanhoVetor = sizeof(meuVetor) / sizeof(meuVetor[0]);
    int fatorMultiplicacao = 2;

    multiplicarValores(meuVetor, tamanhoVetor, fatorMultiplicacao);

    printf("Vetor resultante da multiplicação: { ");
    for (int i = 0; i < tamanhoVetor; i++) {
        printf("%d ", meuVetor[i]);
    }
    printf("}\\n");

    return 0;
}`},j4={thinking:"O problema com worked example incorreto envolve um erro na solução da função, o que pode ser uma oportunidade de aprendizado para os alunos.",incorrectSolution:`#include <stdio.h>

void multiplicarValoresIncorreto(int vetor[], int tamanho, int fator) {
    for (int i = 0; i <= tamanho; i++) {
        vetor[i] *= fator;
    }
}

int main() {
    int meuVetor[] = {3, 7, 2, 5};
    int tamanhoVetor = sizeof(meuVetor) / sizeof(meuVetor[0]);
    int fatorMultiplicacao = 2;

    multiplicarValoresIncorreto(meuVetor, tamanhoVetor, fatorMultiplicacao);

    printf("Vetor resultante da multiplicação: { ");
    for (int i = 0; i < tamanhoVetor; i++) {
        printf("%d ", meuVetor[i]);
    }
    printf("}\\n");

    return 0;
}`,test:"Você pode testar a função com o mesmo vetor: {3, 7, 2, 5} e um fator de multiplicação de 2. O resultado esperado é {6, 14, 4, 10}, mas a solução proposta incorreta produzirá resultados errados.",options:{one:"linha 9",two:"linha 8",three:"linha 12",four:"linha 4",five:"não sei identificar"},correctOption:"4",error:"O erro está na forma como a função percorre o vetor. A solução incorreta não ajusta corretamente os limites do loop, acontecendo acesso em posição inexistente do vetor.",response:"O erro está na forma como a função percorre o vetor. A solução incorreta não ajusta corretamente os limites do loop.",correctSolutionProposal:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita um vetor de inteiros e um inteiro como parâmetros.
[PASSO 2]. Utilizar um loop para percorrer cada elemento do vetor e multiplicá-lo pelo fator específico.
[PASSO 3]. Retornar o vetor resultante.`},R4={title:C4,topic:I4,knowledge:k4,origin:T4,description:O4,result:P4,extra:N4,problemWECorrect:A4,problemWEIncorrect:j4},M4="Cálculo da Média de valores Matriz (nxn)",L4="Trabalhando com Funções em C",D4="Conhecimento básico de C e funções.",$4="Livro de Programação em Linguagem C",F4="Desenvolver uma função em C que aceite uma matriz quadrada (nxn) e a sua dimensão 'n' como parâmetros, e retorne a média dos valores da matriz.",z4="A função deve imprimir ou retornar a média dos valores da matriz.",U4="Vídeo tutorial sobre como trabalhar com funções em C.",V4={thinking:"O problema do worked example correto envolve a criação de uma função em C que calcula a média dos valores de uma matriz quadrada.",solutionProposal:{steps:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita uma matriz e um inteiro 'n' como parâmetros.
[PASSO 2]. Utilizar dois loops aninhados para percorrer cada elemento da matriz e calcular a soma total.
[PASSO 3]. Dividir a soma total pelo número de elementos para obter a média.
[PASSO 4]. Retornar a média.`,test:"Você pode testar a função com a seguinte matriz de dimensão 3x3: {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}. O resultado esperado é a média 5.0."},correctSolutionProposal:`#include <stdio.h>

float calcularMediaMatriz(int matriz[][3], int n) {
    float somaTotal = 0.0;

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            somaTotal += matriz[i][j];
        }
    }

    return somaTotal / (float)(n * n);
}

int main() {
    int minhaMatriz[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int dimensao = 3;

    float media = calcularMediaMatriz(minhaMatriz, dimensao);

    printf("Média da matriz: %.2f\\n", media);

    return 0;
}`},B4={thinking:"O problema com worked example incorreto envolve um erro na solução da função, o que pode ser uma oportunidade de aprendizado para os alunos.",incorrectSolution:`#include <stdio.h>

float calcularMediaMatrizIncorreto(int matriz[][3], int n) {
    float somaTotal = 0.0;

    for (int i = 0; i <= n; i++) {
        for (int j = 0; j <= n; j++) {
            somaTotal += matriz[i][j];
        }
    }

    return somaTotal / (float)(n * n);
}

int main() {
    int minhaMatriz[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int dimensao = 3;

    float media = calcularMediaMatrizIncorreto(minhaMatriz, dimensao);

    printf("Média da matriz: %.2f\\n", media);

    return 0;
}`,test:"Você pode testar a função com a mesma matriz de dimensão 3x3: {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}. O resultado esperado é a média 5.0, mas a solução proposta incorreta produzirá resultados errados.",options:{one:"linha 6 e 7",two:"linha 8 e 9",three:"linha 13 e 15",four:"linha 6 e 9",five:"não sei identificar"},correctOption:"1",error:"O erro está na forma como os loops percorrem a matriz. A solução incorreta não deixa estourar os limites da matriz, causando um acesso a posição inexistente.",response:"O erro está na forma como os loops percorrem a matriz. A solução incorreta não ajusta corretamente os limites dos loops.",correctSolutionProposal:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita uma matriz e um inteiro 'n' como parâmetros.
[PASSO 2]. Utilizar dois loops aninhados para percorrer cada elemento da matriz e calcular a soma total.
[PASSO 3]. Dividir a soma total pelo número de elementos para obter a média.
[PASSO 4]. Retornar a média.`},W4={title:M4,topic:L4,knowledge:D4,origin:$4,description:F4,result:z4,extra:U4,problemWECorrect:V4,problemWEIncorrect:B4},q4="Conversão de Temperatura em C",H4="Trabalhando com Funções em C",G4="Conhecimento intermediário em C e operações matemáticas.",K4="Livro de Programação em Linguagem C",Q4="Desenvolver uma função em C que aceite uma temperatura e uma unidade (Celsius ou Fahrenheit) como parâmetros e retorne a temperatura convertida para a outra unidade.",J4="A função deve imprimir ou retornar a temperatura convertida para a unidade desejada.",X4="Vídeo tutorial sobre como trabalhar com funções em C e operações matemáticas.",Y4={thinking:"O problema do worked example correto envolve a criação de uma função que converte a temperatura de Celsius para Fahrenheit (ou vice-versa).",solutionProposal:{steps:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita a temperatura e a unidade como parâmetros.
[PASSO 2]. Verificar a unidade fornecida (Celsius ou Fahrenheit).
[PASSO 3]. Realizar a conversão de acordo com a fórmula apropriada.
[PASSO 4]. Retornar a temperatura convertida.`,test:"Você pode testar a função com temperatura = 25 e unidade = 'Celsius'. O resultado esperado é a temperatura convertida para Fahrenheit."},correctSolutionProposal:`#include <stdio.h>

double converterTemperatura(double temperatura, char unidade) {
    if (unidade == 'C') {
        return (temperatura * 9 / 5) + 32;
    } else if (unidade == 'F') {
        return (temperatura - 32) * 5 / 9;
    } else {
        printf("Unidade de temperatura inválida.\\n");
        return 0.0;
    }
}

int main() {
    double temperatura = 25.0;
    char unidade = 'C';
    double resultado = converterTemperatura(temperatura, unidade);
    printf("Temperatura convertida: %.2f\\n", resultado);

    return 0;
}`},Z4={thinking:"O problema com worked example incorreto envolve um erro na solução da função, o que pode ser uma oportunidade de aprendizado para os alunos.",incorrectSolution:`#include <stdio.h>

double converterTemperaturaIncorreto(double temperatura, char unidade) {
    if (unidade == 'C') {
        return (temperatura - 32) * 5 / 9;
    } else if (unidade == 'F') {
        return (temperatura * 9 / 5) + 32;
    } else {
        printf("Unidade de temperatura inválida.\\n");
        return 0.0;
    }
}

int main() {
    double temperatura = 25.0;
    char unidade = 'C';
    double resultado = converterTemperaturaIncorreto(temperatura, unidade);
    printf("Temperatura convertida: %.2f\\n", resultado);

    return 0;
}`,test:"Você pode testar a função com os mesmos valores: temperatura = 25 e unidade = 'Celsius'. O resultado esperado é a temperatura convertida para Fahrenheit, mas a solução proposta incorreta produzirá resultados errados.",options:{one:"linha 15",two:"linha 19",three:"linha 21",four:"linha 5",five:"não sei identificar"},correctOption:"2",error:"O erro está na forma como a fórmula de conversão é aplicada na solução incorreta. A fórmula correta para converter de Celsius para Fahrenheit é (C * 9/5) + 32, e de Fahrenheit para Celsius é (F - 32) * 5/9. No exemplo elas foram invertidas.",response:"O erro está na forma como a fórmula de conversão é aplicada na solução incorreta. A fórmula correta para converter de Celsius para Fahrenheit é (C * 9/5) + 32, e de Fahrenheit para Celsius é (F - 32) * 5/9.",correctSolutionProposal:`
[PASSO 1]. Definir a assinatura da função, indicando que ela aceita a temperatura e a unidade como parâmetros.
[PASSO 2]. Verificar a unidade fornecida (Celsius ou Fahrenheit).
[PASSO 3]. Realizar a conversão de acordo com a fórmula apropriada.
[PASSO 4]. Retornar a temperatura convertida.`},e5={title:q4,topic:H4,knowledge:G4,origin:K4,description:Q4,result:J4,extra:X4,problemWECorrect:Y4,problemWEIncorrect:Z4},Pc=[y$,T$,$$,K$,o4,p4,b4,R4,W4,e5];let Xi,ot,Tt,cl,Pd,Nd,Ad,jd,be,Ot="N";const t5=({descricao:e,resultado:t,reflexivo:n,teste:r})=>u.jsxs("div",{children:[u.jsx("p",{style:{textAlign:"center"},children:u.jsx("strong",{children:"WorkedExample"})}),u.jsxs("p",{children:[u.jsx("strong",{children:"Descrição: "}),e]}),u.jsxs("p",{children:[u.jsx("strong",{children:"Resultado: "}),t]}),u.jsxs("p",{children:[u.jsx("strong",{children:"Reflexivo: "}),n]}),u.jsxs("p",{children:[u.jsx("strong",{children:"Teste: "}),r]})]}),n5=({passos:e,proposta:t})=>u.jsxs("div",{children:[u.jsx("p",{children:u.jsx("strong",{children:"Ok, abaixo temos os passos para construção do código correto."})}),u.jsxs("p",{children:[u.jsx("strong",{children:"Passos: "}),e]}),u.jsx(Um,{code:t})]}),r5=({incorreto:e,teste:t,opcoes:n})=>u.jsxs("div",{children:[u.jsx("p",{children:u.jsx("strong",{children:"Ok, abaixo segue um exemplo de código escrito de forma incorreta para o problema."})}),u.jsx("p",{children:u.jsx("strong",{children:"Solução Incorreta: "})}),u.jsx(Um,{code:e}),u.jsxs("p",{children:[u.jsx("strong",{children:"Teste: "}),t]}),u.jsx("p",{children:u.jsx("strong",{children:"Você consegue identificar onde ocorre o erro? Escolha uma das opções:"})}),u.jsxs("ol",{children:[u.jsx("li",{children:n.one}),u.jsx("li",{children:n.two}),u.jsx("li",{children:n.three}),u.jsx("li",{children:n.four}),u.jsx("li",{children:n.five})]})]}),o5=({text:e,erro:t,resposta:n,solucao:r,code:o})=>u.jsxs("div",{children:[u.jsx("p",{children:e}),u.jsxs("p",{children:[u.jsx("strong",{children:"Identificando o erro: "}),t]}),u.jsx("p",{children:u.jsx("strong",{children:"Veja abaixo uma proposta de solução correta: "})}),u.jsx("p",{children:r}),u.jsx(Um,{code:o})]}),i5=({text:e})=>u.jsx("div",{children:u.jsx("p",{children:e})}),Um=({code:e})=>u.jsx(kx,{language:"java",style:Tx,showLineNumbers:!0,children:e}),s5=({createChatBotMessage:e,setState:t,children:n})=>{const{user:r}=Ou(),[o,i]=Se.useState([]),[s,a]=Se.useState(null),[l,c]=Se.useState(!0),{insertDocument:d}=Pu("metrics-example-arrays"),[h,f]=Se.useState(!1),g=Jc(),y=()=>{const A=e(`Olá, ${r.displayName}`);t(_=>({..._,messages:[..._.messages,A]}))},w=()=>(new Date-s)/(1e3*60),C=async(A,_,O,W,V)=>{f(!0);try{const K={user:A,example:_,time:O,category:W,correctAnswer:V,createdBy:r.displayName};await d(K),console.log("Documento inserido com sucesso:",K)}catch(K){console.error("Erro ao inserir documento:",K)}finally{f(!1)}},m=A=>{if(l)c(!1),Ot="N";else{let O=w();(be=="C"||be=="I"||be=="D"||be=="Q")&&(o.push({user:r.uid,example:Tt,time:O,category:be,correctAnswer:Ot}),C(r.uid,Tt,O,be,Ot),be=null),a(new Date)}switch(A){case 1:cl="vetoreswe",Pd="vetores",Nd="vetoresanothercorrect",Ad="questionswe",jd="vetoresanotherincorrect",Xi=Oc;break;case 2:cl="funcoeswe",Pd="vetores",Nd="vetoresanothercorrect",Ad="questionswe",jd="vetoresanotherincorrect",Xi=Pc;break;case-1:break;default:cl="inexistente"}const _=[e(u.jsx(i5,{text:`${r.displayName}, eu posso te ajudar com os temas abaixo, basta efetuar um click no botão desejado:`}),{widget:cl})];t(O=>({...O,messages:[...O.messages,..._]}))},p=A=>{a(new Date),Tt=A,ot=Xi[Tt];const _=ot.description,O=ot.result,W=ot.problemWECorrect.thinking,V=ot.problemWECorrect.solutionProposal.test;be="D";const K=[e(u.jsx(t5,{descricao:_,resultado:O,reflexivo:W,teste:V}),{widget:Pd})];t(re=>({...re,messages:[...re.messages,...K]}))},v=A=>{let _=w();o.push({user:r.uid,example:Tt,time:_,category:be,correctAnswer:Ot}),C(r.uid,Tt,_,be,Ot),a(new Date),be="C",ot=Xi[Tt];const O=ot.problemWECorrect.solutionProposal.steps,W=ot.problemWECorrect.correctSolutionProposal,V=[e(u.jsx(n5,{passos:O,proposta:W}),{widget:Nd})];t(K=>({...K,messages:[...K.messages,...V]}))},b=A=>{let _=w();o.push({user:r.uid,example:Tt,time:_,category:be,correctAnswer:Ot}),C(r.uid,Tt,_,be,Ot),a(new Date),be="I",ot=Xi[Tt];const O=ot.problemWEIncorrect.incorrectSolution,W=ot.problemWEIncorrect.test,V=ot.problemWEIncorrect.options,K=[e(u.jsx(r5,{teste:W,incorreto:O,opcoes:V}),{widget:Ad})];t(re=>({...re,messages:[...re.messages,...K]}))},k=A=>{let _=w();o.push({user:r.uid,example:Tt,time:_,category:be,correctAnswer:Ot}),C(r.uid,Tt,_,be,Ot),a(new Date),be="Q";const O=ot.problemWEIncorrect.correctOption,W=ot.problemWEIncorrect.error,V=ot.problemWEIncorrect.response,K=ot.problemWECorrect.correctSolutionProposal,re=ot.problemWEIncorrect.correctSolutionProposal;let ye="";A===Number(O)?(ye="Parabéns! Você acertou.",Ot="T"):A==5?(ye="Tudo bem, eu irei te ajudar a identiticar.",Ot="5"):(ye="A resposta está incorreta. Não desanime, eu irei te ajudar a identificar corretamente.",Ot="F");const D=[e(u.jsx(o5,{text:ye,erro:W,resposta:V,solucao:re,code:K}),{widget:jd})];t(S=>({...S,messages:[...S.messages,...D]}))},P=()=>{const A=e(`Você voltou ao menu principal.
      Olá! 👋  Sou o CoderBot 🤖 , e estou aqui para te auxiliar na aprendizagem de programação 💻 por meio de exemplos. Escolha um dos temas abaixo:
        `,{widget:"options1"});t(_=>({..._,messages:[A]}))},R=()=>{if(!l&&(be=="C"||be=="I"||be=="D"||be=="Q")){let _=w();o.push({user:r.uid,example:Tt,time:_,category:be,correctAnswer:Ot}),C(r.uid,Tt,_,be,Ot),be=null}console.log(o);const A=e("Olá! 👋  Sou o CoderBot 🤖 , e estou aqui para te auxiliar na aprendizagem de programação 💻 por meio de exemplos. Escolha um dos temas abaixo:",{widget:"options1"});t(_=>({..._,messages:[A]}))},T=()=>{if(!l&&(be=="C"||be=="I"||be=="D"||be=="Q")){let _=w();o.push({user:r.uid,example:Tt,time:_,category:be,correctAnswer:Ot}),C(r.uid,Tt,_,be,Ot),be=null}console.log(o),g("/");const A=e("Obrigado por participar deste experimento!",{widget:"options1"});t(_=>({..._,messages:[..._.messages,A]}))},Q=()=>{const A=e("Desculpe, não entendi. Poderia repetir ou selecionar uma das opções abaixo?",{widget:"options1"});t(_=>({..._,messages:[..._.messages,A]}))};return u.jsx("div",{children:Se.Children.map(n,A=>Se.cloneElement(A,{actions:{greet:y,handleGoToMainMenu:P,handleGoToBackMenu:R,handleDefaultMessage:Q,handleExampleChoice:m,handleQuiz:p,handleCorrectWE:v,handleIncorrectWE:b,handleQuestionWE:k,handleGoOut:T,dataWE:ot,dataArray:Oc,dataFunc:Pc}}))})};let Yi,it,Pt,ul,Rd,Md,Ld,Dd,Ce,ht="N";const a5=({descricao:e,resultado:t,reflexivo:n,teste:r})=>u.jsxs("div",{children:[u.jsx("p",{style:{textAlign:"center"},children:u.jsx("strong",{children:"WorkedExample"})}),u.jsxs("p",{children:[u.jsx("strong",{children:"Descrição: "}),e]}),u.jsxs("p",{children:[u.jsx("strong",{children:"Resultado: "}),t]}),u.jsxs("p",{children:[u.jsx("strong",{children:"Reflexivo: "}),n]}),u.jsxs("p",{children:[u.jsx("strong",{children:"Teste: "}),r]})]}),l5=({passos:e,proposta:t})=>u.jsxs("div",{children:[u.jsx("p",{children:u.jsx("strong",{children:"Ok, abaixo temos os passos para construção do código correto."})}),u.jsxs("p",{children:[u.jsx("strong",{children:"Passos: "}),e]}),u.jsx(Vm,{code:t})]}),c5=({incorreto:e,teste:t,opcoes:n})=>u.jsxs("div",{children:[u.jsx("p",{children:u.jsx("strong",{children:"Ok, abaixo segue um exemplo de código escrito de forma incorreta para o problema."})}),u.jsx("p",{children:u.jsx("strong",{children:"Solução Incorreta: "})}),u.jsx(Vm,{code:e}),u.jsxs("p",{children:[u.jsx("strong",{children:"Teste: "}),t]}),u.jsx("p",{children:u.jsx("strong",{children:"Você consegue identificar onde ocorre o erro? Escolha uma das opções:"})}),u.jsxs("ol",{children:[u.jsx("li",{children:n.one}),u.jsx("li",{children:n.two}),u.jsx("li",{children:n.three}),u.jsx("li",{children:n.four}),u.jsx("li",{children:n.five})]})]}),u5=({text:e,erro:t,resposta:n,solucao:r,code:o})=>u.jsxs("div",{children:[u.jsx("p",{children:e}),u.jsxs("p",{children:[u.jsx("strong",{children:"Identificando o erro: "}),t]}),u.jsx("p",{children:u.jsx("strong",{children:"Veja abaixo uma proposta de solução correta: "})}),u.jsx("p",{children:r}),u.jsx(Vm,{code:o})]}),d5=({text:e})=>u.jsx("div",{children:u.jsx("p",{children:e})}),Vm=({code:e})=>u.jsx(kx,{language:"java",style:Tx,showLineNumbers:!0,children:e}),h5=({createChatBotMessage:e,setState:t,children:n})=>{const{user:r}=Ou(),[o,i]=Se.useState([]),[s,a]=Se.useState(null),[l,c]=Se.useState(!0),{insertDocument:d}=Pu("metrics-example-functions"),[h,f]=Se.useState(!1),g=Jc(),y=()=>{const A=e(`Olá, ${r.displayName}`);t(_=>({..._,messages:[..._.messages,A]}))},w=()=>(new Date-s)/(1e3*60),C=async(A,_,O,W,V)=>{f(!0);try{const K={user:A,example:_,time:O,category:W,correctAnswer:V,createdBy:r.displayName};await d(K),console.log("Documento inserido com sucesso:",K)}catch(K){console.error("Erro ao inserir documento:",K)}finally{f(!1)}},m=A=>{if(l)c(!1),ht="N";else{let O=w();(Ce=="C"||Ce=="I"||Ce=="D"||Ce=="Q")&&(o.push({user:r.uid,example:Pt,time:O,category:Ce,correctAnswer:ht}),C(r.uid,Pt,O,Ce,ht),Ce=null,ht="N"),a(new Date)}switch(A){case 1:ul="vetoreswe",Rd="vetores",Md="vetoresanothercorrect",Ld="questionswe",Dd="vetoresanotherincorrect",Yi=Oc;break;case 2:ul="funcoeswe",Rd="vetores",Md="vetoresanothercorrect",Ld="questionswe",Dd="vetoresanotherincorrect",Yi=Pc;break;case-1:break;default:ul="inexistente"}const _=[e(u.jsx(d5,{text:`${r.displayName}, eu posso te ajudar com os temas abaixo, basta efetuar um click no botão desejado:`}),{widget:ul})];t(O=>({...O,messages:[...O.messages,..._]}))},p=A=>{a(new Date),Pt=A,it=Yi[Pt];const _=it.description,O=it.result,W=it.problemWECorrect.thinking,V=it.problemWECorrect.solutionProposal.test;Ce="D";const K=[e(u.jsx(a5,{descricao:_,resultado:O,reflexivo:W,teste:V}),{widget:Rd})];t(re=>({...re,messages:[...re.messages,...K]}))},v=A=>{let _=w();o.push({user:r.uid,example:Pt,time:_,category:Ce,correctAnswer:ht}),C(r.uid,Pt,_,Ce,ht),a(new Date),Ce="C",it=Yi[Pt];const O=it.problemWECorrect.solutionProposal.steps,W=it.problemWECorrect.correctSolutionProposal,V=[e(u.jsx(l5,{passos:O,proposta:W}),{widget:Md})];t(K=>({...K,messages:[...K.messages,...V]}))},b=A=>{let _=w();o.push({user:r.uid,example:Pt,time:_,category:Ce,correctAnswer:ht}),C(r.uid,Pt,_,Ce,ht),a(new Date),Ce="I",it=Yi[Pt];const O=it.problemWEIncorrect.incorrectSolution,W=it.problemWEIncorrect.test,V=it.problemWEIncorrect.options,K=[e(u.jsx(c5,{teste:W,incorreto:O,opcoes:V}),{widget:Ld})];t(re=>({...re,messages:[...re.messages,...K]}))},k=A=>{let _=w();o.push({user:r.uid,example:Pt,time:_,category:Ce,correctAnswer:ht}),C(r.uid,Pt,_,Ce,ht),a(new Date),Ce="Q";const O=it.problemWEIncorrect.correctOption,W=it.problemWEIncorrect.error,V=it.problemWEIncorrect.response,K=it.problemWECorrect.correctSolutionProposal,re=it.problemWEIncorrect.correctSolutionProposal;let ye="";A===Number(O)?(ye="Parabéns! Você acertou.",ht="T"):A==5?(ye="Tudo bem, eu irei te ajudar a identiticar.",ht="5"):(ye="A resposta está incorreta. Não desanime, eu irei te ajudar a identificar corretamente.",ht="F");const D=[e(u.jsx(u5,{text:ye,erro:W,resposta:V,solucao:re,code:K}),{widget:Dd})];t(S=>({...S,messages:[...S.messages,...D]}))},P=()=>{const A=e(`Você voltou ao menu principal.
      Olá! 👋  Sou o CoderBot 🤖 , e estou aqui para te auxiliar na aprendizagem de programação 💻 por meio de exemplos. Escolha um dos temas abaixo:
        `,{widget:"options2"});t(_=>({..._,messages:[A]}))},R=()=>{if(!l&&(Ce=="C"||Ce=="I"||Ce=="D"||Ce=="Q")){let _=w();o.push({user:r.uid,example:Pt,time:_,category:Ce,correctAnswer:ht}),C(r.uid,Pt,_,Ce,ht),Ce=null}console.log(o);const A=e("Olá! 👋  Sou o CoderBot 🤖 , e estou aqui para te auxiliar na aprendizagem de programação 💻 por meio de exemplos. Escolha um dos temas abaixo:",{widget:"options2"});t(_=>({..._,messages:[A]}))},T=()=>{if(!l&&(Ce=="C"||Ce=="I"||Ce=="D"||Ce=="Q")){let _=w();o.push({user:r.uid,example:Pt,time:_,category:Ce,correctAnswer:ht}),C(r.uid,Pt,_,Ce,ht),Ce=null}console.log(o),g("/");const A=e("Obrigado por participar deste experimento!",{widget:"options2"});t(_=>({..._,messages:[..._.messages,A]}))},Q=()=>{const A=e("Desculpe, não entendi. Poderia repetir ou selecionar uma das opções abaixo?",{widget:"options2"});t(_=>({..._,messages:[..._.messages,A]}))};return u.jsx("div",{children:Se.Children.map(n,A=>Se.cloneElement(A,{actions:{greet:y,handleGoToMainMenu:P,handleGoToBackMenu:R,handleDefaultMessage:Q,handleExampleChoice:m,handleQuiz:p,handleCorrectWE:v,handleIncorrectWE:b,handleQuestionWE:k,handleGoOut:T,dataWE:it,dataArray:Oc,dataFunc:Pc}}))})};const f5=({onSelectTopic:e})=>{const t=n=>{e(n)};return u.jsxs("div",{className:"select-topic-container",children:[u.jsx("h2",{children:"Selecione a turma a qual você pertence:"}),u.jsx("button",{onClick:()=>t("Conteúdos de vetores"),children:"Turma da Professora Brenda"}),u.jsx("button",{onClick:()=>t("Conteúdos de funções"),children:"Turma da Professora Raquel"})]})};function p5(){const[e,t]=I.useState(null);I.useEffect(()=>{t(localStorage.getItem("turmaEscolhida"))},[]);const n=r=>{t(r),localStorage.setItem("turmaEscolhida",r)};return u.jsxs("div",{className:"div-container-chat",children:[e?u.jsx("div",{className:"div-lateral-bar"}):u.jsx(f5,{onSelectTopic:n}),e==="Conteúdos de vetores"&&u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"div-chat-main-container",children:[u.jsxs("div",{className:"chat-header",children:[u.jsxs("span",{children:["CoderBot ",u.jsx("span",{className:"span-version",children:"1.0"})]}),u.jsxs("span",{children:[" - ",e]})]}),u.jsx(ky,{config:$M,messageParser:Ty,actionProvider:s5,headerText:"CoderBOT"})]}),u.jsx("div",{className:"div-lateral-bar"})]}),e==="Conteúdos de funções"&&u.jsxs(u.Fragment,{children:[u.jsxs("div",{className:"div-chat-main-container",children:[u.jsxs("div",{className:"chat-header",children:[u.jsxs("span",{children:["CoderBot ",u.jsx("span",{className:"span-version",children:"1.0"})]}),u.jsxs("span",{children:[" - ",e]})]}),u.jsx(ky,{config:FM,messageParser:Ty,actionProvider:h5,headerText:"CoderBOT"})]}),u.jsx("div",{className:"div-lateral-bar"})]})]})}const m5="_createExample_1ywnc_1",g5={createExample:m5},v5=()=>{const[e,t]=I.useState(""),[n,r]=I.useState(""),[o,i]=I.useState(""),[s,a]=I.useState(""),[l,c]=I.useState(""),[d,h]=I.useState(""),[f,g]=I.useState(""),[y,w]=I.useState(""),[C,m]=I.useState(""),{user:p}=Ou(),{insertDocument:v,response:b}=Pu("examples-content"),[k,P]=I.useState(!1),R=async T=>{T.preventDefault(),m(""),P(!0),await v({title:e,topic:n,difficulty:o,problemDescription:s,correctExample:l,incorrectExample:d,errorOptions:f,errorExplanation:y,uid:p.uid,createdBy:p.displayName}),P(!1)};return u.jsxs("div",{className:g5.createExample,children:[u.jsx("h2",{children:"Criar exemplo"}),u.jsx("p",{children:"Registre um novo exemplo de ensino de programação"}),u.jsxs("form",{onSubmit:R,children:[u.jsxs("label",{children:[u.jsx("span",{children:"Título:"}),u.jsx("input",{type:"text",name:"title",required:!0,placeholder:"Digite o título do exemplo...",onChange:T=>t(T.target.value),value:e})]}),u.jsxs("label",{children:[u.jsx("span",{children:"Tópico:"}),u.jsx("input",{type:"text",name:"topic",required:!0,placeholder:"Digite o tópico do exemplo...",onChange:T=>r(T.target.value),value:n})]}),u.jsxs("label",{children:[u.jsx("span",{children:"Dificuldade:"}),u.jsx("input",{type:"checkbox",name:"difficulty",value:"easy",onChange:T=>i(T.target.value),checked:o==="easy"}),u.jsx("span",{children:"Fácil"}),u.jsx("input",{type:"checkbox",name:"difficulty",value:"medium",onChange:T=>i(T.target.value),checked:o==="medium"}),u.jsx("span",{children:"Médio"}),u.jsx("input",{type:"checkbox",name:"difficulty",value:"hard",onChange:T=>i(T.target.value),checked:o==="hard"}),u.jsx("span",{children:"Difícil"})]}),u.jsxs("label",{children:[u.jsx("span",{children:"Descrição do problema:"}),u.jsx("input",{type:"text",name:"problemDescription",required:!0,placeholder:"Digite a descrição do problema do exemplo...",onChange:T=>a(T.target.value),value:s})]}),u.jsxs("label",{children:[u.jsx("span",{children:"Exemplo correto:"}),u.jsx("input",{type:"text",name:"correctExample",required:!0,placeholder:"Digite o exemplo correto...",onChange:T=>c(T.target.value),value:l})]}),u.jsxs("label",{children:[u.jsx("span",{children:"Exemplo incorreto:"}),u.jsx("input",{type:"text",name:"incorrectExample",required:!0,placeholder:"Digite o título do exemplo...",onChange:T=>h(T.target.value),value:d})]}),u.jsxs("label",{children:[u.jsx("span",{children:"Opções de Erro"}),u.jsx("input",{type:"text",name:"errorOptions",required:!0,placeholder:"Digite as opções de erro...",onChange:T=>g(T.target.value),value:f})]}),u.jsxs("label",{children:[u.jsx("span",{children:"Explicação do erro"}),u.jsx("input",{type:"text",name:"errorExplanation",required:!0,placeholder:"Digite a explicação da solução do erro...",onChange:T=>w(T.target.value),value:y})]}),!k&&u.jsx("button",{className:"btn",children:"Registrar"}),k&&u.jsx("button",{className:"btn",disabled:!0,children:"Registrando..."}),b.error&&u.jsx("p",{className:"error",children:b.error})]})]})},y5="_container_bji0y_3",w5="_researcherContainer_bji0y_8",E5="_researcher_bji0y_8",S5="_researcherNameAndPic_bji0y_30",x5="_img_bji0y_36",_5="_researcherName_bji0y_30",b5="_researcherDescription_bji0y_50",Vn={container:y5,researcherContainer:w5,researcher:E5,researcherNameAndPic:S5,img:x5,researcherName:_5,researcherDescription:b5},C5="/Chatbot-educacional/assets/Andre-2957a46c.jpeg",I5="/Chatbot-educacional/assets/joao-d7c7c25a.png",k5="/Chatbot-educacional/assets/renato-37b47885.png",T5="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIsAAACLCAMAAABmx5rNAAAAYFBMVEX///8AAAD4+Pj7+/v19fVWVlbIyMja2trNzc0EBATs7OyioqIICAi9vb3W1taSkpJHR0c3NzchISHj4+N0dHSqqqopKSkZGRmAgICwsLCZmZlkZGQwMDA/Pz9paWmHh4cC81WqAAAFa0lEQVR4nO1c2ZaiMBAFEnZxgVZBbfv//3JSKJiFsJg79sw53DftULmkllSVSXveihUrVqz4r8A4A0gJOEAICwIAGcaDAEElcKcSQKhw7i5EUAFIofdxXxUhBLEqCJPjkLXlHoBK4EFsnwNciNTs/kbcC5g7FSHDWUNMGL+rDKKCiJRiVdyFMO4hgraHMH6PZQAhJAcjZsWKFSs+DfdtqhWCiIJCCiKrQeR6YteE5GmQ+sJ7J+9kWZwQ4uy5GhgdLacR7cL9odykabopD/twF2W/s2Nml6tv4noBpQHzwYrwNX96up3S18ew+Oji9EzOdRNt46qq4m3U1OeezceYJPvHlF+Nro+s+Xr8aZ98hAmvH7Mdh12XHx9Ma4hnj2N7oJnKwu7+QVHSkMMWPrdWA+Utk2bioaZlk0tSIFTUKHppTXPabbPWuC/dR0T1ToWqXE21lnnUB8VJkcT6l8fWup9UEOU7U+s6onKK1BHJ/UyxJT3fE1UR0akjg+gXUZ0qcyEFlapFZlLI03W3LVs10Y7r7lNaF43MtqyUEUdtB1DVV5WtASMKb6ZmIjEpSF2Vi7Ed5crft6SmLaLyDpQcgn8LuaqtRH6a6mT0Eb7/7b5ZtsYicalNFZz8jcHlZCqxdqYieMjGn5BtqkN+hPcYSvJ/5CGBR7btuDcxrvWzxSZzVhebmzxaSJbKWZAJ+927cfG0kFCYMa6xcGlkIUGrJdcUQnHEQCx1qQ34sXCRlUQvJBYmRNQ6HQrz5YLQwkWfeOBZJ4h599oUs7kEe8PqXZCZ1jKfS2sxuIT8orrHQi7kcBcPBHbtd38JtYWLGdrE9n5FlQakIjOT0/fFDkZ603o/SknRoKzKwsUcSe8SGd++h52IuQNf3we2gNS/D4wUddMOxCXsjEDNWquzuSj+uRoQUMte7ZTksf3TXALth5F8gEs+JEEYzL5/krs0ebLDU93GrxqmKw3nB8LgDr0ZOfVn4pKSs5aMvro7jYrFKrZiN+sLBafeV7LxU6PkeCLqTLaFzVni1N9gCuwk1bM1CezYxd/waLVJkQGmMC43KxehuCrJj3lSjSx9dQNysa2L0fOwcMGti8Vesubgn4rX9Flx8k9GS4aAs5eXH8lgTdv88A9XoZ9K6On6/NyYZqP4kRP6+CKj600NwOxJKfHFCX3clZAP1iOdf+vBV4m7bgiNePplXZQHtGynxmWZ+j7NbSndC6ES54H7tFB3Kqk7uE9S8f27FG6Q+YuW100pyFATMq9T892hTGEIr1xzRr47f8Ok6TsDqGz+oyPtYjXVAYNpjQQ++4yFXB9N222HznWm6yO25PBW2AeIYjaVrnJl03XjomNkr5r4toDLTXvWAq1DOQXW9RkKa7g1kT4oUJ9hbCrGFybj9HLk1vP8uQM5X+NvRpeFWsgL9weh9DJ7dEnno6y8qb4UE2XB0gSY+nXXRZZLKLyrUNVI6sLYO0cxqf4obPW8DTWRH+ljsvf60NTf3WwWctmIJ77t0zFuljmzEC/kIZCK7NQfS+iWulCPuRuRsi4T0f/tEtJs/08D1pDSsSy6EMx21q+R+YtUlqrprynogSUGPJW0OCP+nsnkG1OdjYLPC76f+N3eG60ZO3zoPAOhGM80Eec85rcY2QgbyPkXQWWBkrN88FxQnkEOL7CFrdfh81IMc47sHRjnyNYDzytWrJgJzA070DFaxBEwyJlezAkwxKUpujWFuB+EudYGUBAdL0Jc9gMpyFkIXdNDJEWQy36IY/EMck0vYIAbdu3aOkuBXNNjCINDXaF4s9WjARO1Ife816x1xYoVn8U/FHNQWR7ilSD/SEHsC5jKAiEF8u8YVvwS/gAP+Sx99Ei5BgAAAABJRU5ErkJggg==",O5="/Chatbot-educacional/assets/will-923e28b3.png",P5="/Chatbot-educacional/assets/Pedro-9986b513.jpeg",N5=[{name:"André L M Miranda",description:"Estudante de Engenharia de Software na universidade de Federal do Pampa - UNIPAMPA. ",img:C5},{name:"João Emilio Antonio Villa",description:"Estudante de Engenharia de Software na universidade de Federal do Pampa - UNIPAMPA.",img:I5},{name:"Mateus Balda",description:"Estudante de Engenharia de Software na universidade de Federal do Pampa - UNIPAMPA.",img:T5},{name:"Pedro Henrique Dias Valle",description:"Professor do Departamento de Ciência da Computação (DCC) da Universidade Federal de Juiz de Fora (UFJF) e atua como Docente Permanente no Programa de Pós-Graduação em Informática (PPGI) da Universidade Tecnológica Federal do Paraná (UTFPR), campus Cornélio Procópio.",img:P5},{name:"Renato de Souza Garcia",description:"Estudante do Programa de Pós-Graduação em Engenharia de Software (PPGES) na universidade de Federal do Pampa - UNIPAMPA.",img:k5},{name:"Williamson Alison Freitas Silva",description:"Professor adjunto na Universidade Federal do Pampa (UNIPAMPA) e membro do Programa Pós-Graduação em Engenharia de Software (PPGES-UNIPAMPA).",img:O5}],A5=e=>{if(e.github)return u.jsxs("p",{children:[" ",u.jsx(vj,{})," ",e.github]})},j5=e=>{if(e.email)return u.jsxs("p",{children:[" ",u.jsx(wj,{})," ",e.email]})},R5=()=>{const e=M5(N5,2);return u.jsxs("div",{className:Vn.container,children:[u.jsx("h1",{children:"Pesquisadores"}),u.jsx("div",{className:Vn.researcherContainer,children:e.map((t,n)=>u.jsx("div",{className:Vn.researcherGroup,children:t.map((r,o)=>u.jsxs("div",{className:Vn.researcher,children:[u.jsxs("div",{className:Vn.researcherNameAndPic,children:[u.jsx("div",{className:Vn.researcherImage,children:u.jsx("img",{className:Vn.img,src:r.img,alt:`${r.name} - Foto`})}),u.jsx("div",{className:Vn.researcherName,children:u.jsx("h2",{children:r.name})})]}),u.jsxs("div",{className:Vn.researcherDescription,children:[u.jsx("p",{children:r.description}),u.jsxs("div",{className:r.contact,children:[j5(r),A5(r)]})]})]},o))},n))})]})};function M5(e,t){const n=[];for(let r=0;r<e.length;r+=t)n.push(e.slice(r,r+t));return n}const L5="_container_1cxu0_11",D5="_row_1cxu0_15",$5="_footer_1cxu0_24",F5="_footer_col_1cxu0_29",z5="_footerContent_1cxu0_85",Xr={container:L5,row:D5,footer:$5,footer_col:F5,"social-links":"_social-links_1cxu0_68",footerContent:z5},U5=()=>u.jsxs("footer",{className:Xr.footer,children:[u.jsx("div",{className:Xr.horizontalContent,children:u.jsxs("div",{className:Xr.row,children:[u.jsxs("div",{className:Xr.footer_col,children:[u.jsx("h4",{children:"Conta"}),u.jsxs("ul",{children:[u.jsx("li",{children:u.jsx(cn,{to:"/login",children:"login"})}),u.jsx("li",{children:u.jsx(cn,{to:"/register",children:"registrar"})}),u.jsx("li",{children:u.jsx("a",{href:"#",children:"ajuda"})})]})]}),u.jsxs("div",{className:Xr.footer_col,children:[u.jsx("h4",{children:"Aprenda"}),u.jsxs("ul",{children:[u.jsx("li",{children:u.jsx("a",{href:"#",children:"Exemplificação"})}),u.jsx("li",{children:u.jsx("a",{href:"#",children:"Worked Examples"})}),u.jsx("li",{children:u.jsx("a",{href:"#",children:"Conteúdos Abordados"})})]})]}),u.jsxs("div",{className:Xr.footer_col,children:[u.jsx("h4",{children:"Compania"}),u.jsxs("ul",{children:[u.jsx("li",{children:u.jsx("a",{href:"#",children:"Sobre"})}),u.jsx("li",{children:u.jsx("a",{href:"#",children:"Contato"})}),u.jsx("li",{children:u.jsx(cn,{to:"/researchers",children:"Time"})})]})]})]})}),u.jsx("div",{className:Xr.footerContent,children:u.jsxs("p",{children:["© ",new Date().getFullYear()," CoderBot. All rights reserved."]})})]});function V5(){return Wr().pathname==="/chat"?null:u.jsx(U5,{})}function B5({clicks:e,local:t,loginTime:n}){if(Wr().pathname==="/chat"){const i={transform:"translateY(-100%)",transition:"transform 0.3s ease-in-out"};return u.jsx("div",{style:i})}return u.jsx(NR,{clicks:e,local:t,loginTime:n})}var Ox={},Ti={};Object.defineProperty(Ti,"__esModule",{value:!0});Ti.cssValue=Ti.parseLengthAndUnit=void 0;var W5={cm:!0,mm:!0,in:!0,px:!0,pt:!0,pc:!0,em:!0,ex:!0,ch:!0,rem:!0,vw:!0,vh:!0,vmin:!0,vmax:!0,"%":!0};function Px(e){if(typeof e=="number")return{value:e,unit:"px"};var t,n=(e.match(/^[0-9.]*/)||"").toString();n.includes(".")?t=parseFloat(n):t=parseInt(n,10);var r=(e.match(/[^0-9]*$/)||"").toString();return W5[r]?{value:t,unit:r}:(console.warn("React Spinners: ".concat(e," is not a valid css value. Defaulting to ").concat(t,"px.")),{value:t,unit:"px"})}Ti.parseLengthAndUnit=Px;function q5(e){var t=Px(e);return"".concat(t.value).concat(t.unit)}Ti.cssValue=q5;var Ru={};Object.defineProperty(Ru,"__esModule",{value:!0});Ru.createAnimation=void 0;var H5=function(e,t,n){var r="react-spinners-".concat(e,"-").concat(n);if(typeof window>"u"||!window.document)return r;var o=document.createElement("style");document.head.appendChild(o);var i=o.sheet,s=`
    @keyframes `.concat(r,` {
      `).concat(t,`
    }
  `);return i&&i.insertRule(s,0),r};Ru.createAnimation=H5;var Nc=kn&&kn.__assign||function(){return Nc=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},Nc.apply(this,arguments)},G5=kn&&kn.__createBinding||(Object.create?function(e,t,n,r){r===void 0&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);(!o||("get"in o?!t.__esModule:o.writable||o.configurable))&&(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){r===void 0&&(r=n),e[r]=t[n]}),K5=kn&&kn.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),Q5=kn&&kn.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)n!=="default"&&Object.prototype.hasOwnProperty.call(e,n)&&G5(t,e,n);return K5(t,e),t},J5=kn&&kn.__rest||function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n};Object.defineProperty(Ox,"__esModule",{value:!0});var Yr=Q5(I),Zi=Ti,uf=Ru,X5=[(0,uf.createAnimation)("PacmanLoader","0% {transform: rotate(0deg)} 50% {transform: rotate(-44deg)}","pacman-1"),(0,uf.createAnimation)("PacmanLoader","0% {transform: rotate(0deg)} 50% {transform: rotate(44deg)}","pacman-2")];function Y5(e){var t=e.loading,n=t===void 0?!0:t,r=e.color,o=r===void 0?"#000000":r,i=e.speedMultiplier,s=i===void 0?1:i,a=e.cssOverride,l=a===void 0?{}:a,c=e.size,d=c===void 0?25:c,h=e.margin,f=h===void 0?2:h,g=J5(e,["loading","color","speedMultiplier","cssOverride","size","margin"]),y=(0,Zi.parseLengthAndUnit)(d),w=y.value,C=y.unit,m=Nc({display:"inherit",position:"relative",fontSize:0,height:"".concat(w*2).concat(C),width:"".concat(w*2).concat(C)},l),p=(0,uf.createAnimation)("PacmanLoader",`75% {opacity: 0.7}
    100% {transform: translate(`.concat("".concat(-4*w).concat(C),", ").concat("".concat(-w/4).concat(C),")}"),"ball"),v=function(Q){return{width:"".concat(w/3).concat(C),height:"".concat(w/3).concat(C),backgroundColor:o,margin:(0,Zi.cssValue)(f),borderRadius:"100%",transform:"translate(0, ".concat("".concat(-w/4).concat(C),")"),position:"absolute",top:"".concat(w).concat(C),left:"".concat(w*4).concat(C),animation:"".concat(p," ").concat(1/s,"s ").concat(Q*.25,"s infinite linear"),animationFillMode:"both"}},b="".concat((0,Zi.cssValue)(d)," solid transparent"),k="".concat((0,Zi.cssValue)(d)," solid ").concat(o),P=function(Q){return{width:0,height:0,borderRight:b,borderTop:Q===0?b:k,borderLeft:k,borderBottom:Q===0?k:b,borderRadius:(0,Zi.cssValue)(d),position:"absolute",animation:"".concat(X5[Q]," ").concat(.8/s,"s infinite ease-in-out"),animationFillMode:"both"}},R=P(0),T=P(1);return n?Yr.createElement("span",Nc({style:m},g),Yr.createElement("span",{style:R}),Yr.createElement("span",{style:T}),Yr.createElement("span",{style:v(2)}),Yr.createElement("span",{style:v(3)}),Yr.createElement("span",{style:v(4)}),Yr.createElement("span",{style:v(5)})):null}var Z5=Ox.default=Y5;const eF="_container_7549f_1",tF="_content_7549f_24",$d={container:eF,content:tF};function nF(){return I.useEffect(()=>{const e=document.getElementById($d.container),t=n=>{const r=-n.clientX,o=-n.clientY;e.style.backgroundPositionX=`${r}px`,e.style.backgroundPositionY=`${o}px`};return window.addEventListener("mousemove",t),()=>{window.removeEventListener("mousemove",t)}},[]),u.jsx("div",{id:$d.container,children:u.jsxs("div",{className:$d.content,children:[u.jsx("h2",{children:"404"}),u.jsx("h4",{children:"Opps! Página não encontrada"}),u.jsx("p",{children:"A página que você estava procurando não existe; Você pode ter digitado o endereço errado ou a página pode ter sido movida"}),u.jsx(cn,{to:"/home",children:"Voltar para Home"})]})})}function rF(){const[e,t]=I.useState(0),[n,r]=I.useState([]),[o,i]=I.useState(new Date),[s,a]=I.useState(void 0),{auth:l}=Tu(),c=s===void 0;return I.useEffect(()=>{Gk(l,d=>{a(d),t(0),i(new Date)})},[l]),I.useEffect(()=>{const d=h=>{t(f=>f+1),n.push(h.target.localName)};return document.addEventListener("click",d),()=>{document.removeEventListener("click",d)}},[]),c?u.jsx("div",{className:"loader",children:u.jsx(Z5,{color:"#AFABFC",size:50})}):u.jsx("div",{className:"App",children:u.jsx(pj,{value:{user:s},children:u.jsxs(JC,{children:[u.jsx(B5,{clicks:e,local:n,loginTime:o}),u.jsxs(WC,{children:[u.jsx(En,{path:"/home",element:u.jsx(pR,{})}),u.jsx(En,{path:"/about",element:u.jsx(vR,{})}),u.jsx(En,{path:"/contact",element:u.jsx(XR,{})}),u.jsx(En,{path:"/login",element:s?u.jsx(Qi,{to:"/home"}):u.jsx(OM,{})}),u.jsx(En,{path:"/register",element:s?u.jsx(Qi,{to:"/home"}):u.jsx(MM,{})}),u.jsx(En,{path:"/chat",element:s?u.jsx(p5,{}):u.jsx(Qi,{to:"/login"})}),u.jsx(En,{path:"/create-example",element:s?u.jsx(v5,{}):u.jsx(Qi,{to:"/login"})}),u.jsx(En,{path:"/researchers",element:u.jsx(R5,{})}),u.jsx(En,{index:!0,element:u.jsx(Qi,{to:"/home"})}),u.jsx(En,{path:"*",element:u.jsx(nF,{})})]}),u.jsx(V5,{})]})})})}Fd.createRoot(document.getElementById("root")).render(u.jsx(Se.StrictMode,{children:u.jsx(rF,{})}));

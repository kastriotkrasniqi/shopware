(window["webpackJsonpPluginswag-extension-store"]=window["webpackJsonpPluginswag-extension-store"]||[]).push([[227],{6838:function(){},227:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return i}}),t(5263);let{Mixin:r}=Shopware;var i={template:'{% block sw_extension_store_update_warning %}\n    <sw-extension-store-error-card\n        variant="info"\n        class="sw-extension-store-update-warning"\n        :title="$tc(\'sw-extension-store.updateWarning.headline\')"\n    >\n        <template #default>\n            {% block sw_extension_store_update_warning_description %}\n                <p>\n                    {{ $tc(\'sw-extension-store.updateWarning.description\') }}\n                </p>\n                <p class="sw-extension-store-update-warning__strong-text">\n                    {{ $tc(\'sw-extension-store.updateWarning.requestDescription\') }}\n                </p>\n            {% endblock %}\n        </template>\n\n        <template #actions>\n            {% block sw_extension_store_update_warning_actions %}\n                <sw-button\n                    variant="primary"\n                    @click="updateExtension"\n                    :isLoading="isUpdating"\n                >\n                    {{ $tc(\'sw-extension-store.updateWarning.update\') }}\n                </sw-button>\n            {% endblock %}\n        </template>\n    </sw-extension-store-error-card>\n{% endblock %}\n',inject:["shopwareExtensionService","extensionStoreActionService","cacheApiService"],mixins:[r.getByName("notification")],data(){return{isUpdating:!1}},computed:{},methods:{async updateExtension(){this.isUpdating=!0;try{await this.extensionStoreActionService.downloadExtension("SwagExtensionStore"),await this.shopwareExtensionService.updateExtension("SwagExtensionStore","plugin"),await this.clearCacheAndReloadPage()}catch(e){this.isUpdating=!1,Shopware.Utils.debug.error(e),this.createNotificationError({message:this.$tc("global.notification.unspecifiedSaveErrorMessage")})}},clearCacheAndReloadPage(){return this.cacheApiService.clear().then(()=>{window.location.reload()})}}}},5263:function(e,n,t){var r=t(6838);r.__esModule&&(r=r.default),"string"==typeof r&&(r=[[e.id,r,""]]),r.locals&&(e.exports=r.locals),t(5346).Z("6b3010c7",r,!0,{})},5346:function(e,n,t){"use strict";function r(e,n){for(var t=[],r={},i=0;i<n.length;i++){var s=n[i],a=s[0],o={id:e+":"+i,css:s[1],media:s[2],sourceMap:s[3]};r[a]?r[a].parts.push(o):t.push(r[a]={id:a,parts:[o]})}return t}t.d(n,{Z:function(){return h}});var i="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!i)throw Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var s={},a=i&&(document.head||document.getElementsByTagName("head")[0]),o=null,c=0,d=!1,u=function(){},l=null,p="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function h(e,n,t,i){d=t,l=i||{};var a=r(e,n);return g(a),function(n){for(var t=[],i=0;i<a.length;i++){var o=s[a[i].id];o.refs--,t.push(o)}n?g(a=r(e,n)):a=[];for(var i=0;i<t.length;i++){var o=t[i];if(0===o.refs){for(var c=0;c<o.parts.length;c++)o.parts[c]();delete s[o.id]}}}}function g(e){for(var n=0;n<e.length;n++){var t=e[n],r=s[t.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](t.parts[i]);for(;i<t.parts.length;i++)r.parts.push(w(t.parts[i]));r.parts.length>t.parts.length&&(r.parts.length=t.parts.length)}else{for(var a=[],i=0;i<t.parts.length;i++)a.push(w(t.parts[i]));s[t.id]={id:t.id,refs:1,parts:a}}}}function v(){var e=document.createElement("style");return e.type="text/css",a.appendChild(e),e}function w(e){var n,t,r=document.querySelector("style["+p+'~="'+e.id+'"]');if(r){if(d)return u;r.parentNode.removeChild(r)}if(f){var i=c++;n=x.bind(null,r=o||(o=v()),i,!1),t=x.bind(null,r,i,!0)}else n=b.bind(null,r=v()),t=function(){r.parentNode.removeChild(r)};return n(e),function(r){r?(r.css!==e.css||r.media!==e.media||r.sourceMap!==e.sourceMap)&&n(e=r):t()}}var m=function(){var e=[];return function(n,t){return e[n]=t,e.filter(Boolean).join("\n")}}();function x(e,n,t,r){var i=t?"":r.css;if(e.styleSheet)e.styleSheet.cssText=m(n,i);else{var s=document.createTextNode(i),a=e.childNodes;a[n]&&e.removeChild(a[n]),a.length?e.insertBefore(s,a[n]):e.appendChild(s)}}function b(e,n){var t=n.css,r=n.media,i=n.sourceMap;if(r&&e.setAttribute("media",r),l.ssrId&&e.setAttribute(p,n.id),i&&(t+="\n/*# sourceURL="+i.sources[0]+" */\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}}]);
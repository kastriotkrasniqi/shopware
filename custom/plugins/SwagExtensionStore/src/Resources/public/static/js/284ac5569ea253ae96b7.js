(window["webpackJsonpPluginswag-extension-store"]=window["webpackJsonpPluginswag-extension-store"]||[]).push([[135],{7759:function(){},2135:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return i}}),n(8445);let s="SwagAnalytics";var i=Shopware.Component.wrapComponentConfig({template:'<sw-card\n    v-if="showBanner"\n    class="sw-extension-store-statistics-promotion"\n>\n    <div class="sw-extension-store-statistics-promotion__app">\n        <sw-extension-icon\n            class="sw-extension-store-statistics-promotion__app-icon"\n            :src="assetFilter(\'/swagextensionstore/static/img/analytics/extension/icon.svg\')"\n        />\n\n        <div class="sw-extension-store-statistics-promotion__app-info">\n            <h4 class="sw-extension-store-statistics-promotion__app-info-name">\n                {{ $tc(\'app-name\') }}\n            </h4>\n\n            <span class="sw-extension-store-statistics-promotion__app-info-description">\n                {{ $tc(\'app-description\') }}\n            </span>\n        </div>\n    </div>\n\n    <sw-button\n        class="sw-extension-store-statistics-promotion__go-to-app"\n        variant="primary"\n        :disabled="!linkToStatisticsAppExists"\n        @click="goToStatisticsAppDetailPage"\n    >\n        {{ $tc(\'go-to-app\') }} <sw-icon name="regular-long-arrow-right" size="12px" />\n    </sw-button>\n</sw-card>\n',inject:["extensionStoreDataService"],i18n:{messages:{"en-GB":{"app-name":"Shopware Analytics","app-description":"Unlock store performance metrics","go-to-app":"Try it out now"},"de-DE":{"app-name":"Shopware Analytics","app-description":"Erfasse wichtige Shop-Kennzahlen","go-to-app":"Jetzt ausprobieren"}}},data(){return{extension:null,isAppInstalled:!1}},computed:{showBanner(){return!this.isAppInstalled},linkToStatisticsAppExists(){return!!this.extension},assetFilter(){return Shopware.Filter.getByName("asset")}},created(){this.createdComponent()},methods:{async createdComponent(){this.isAppInstalled=!!Shopware.Context.app.config.bundles[s],this.extension=await this.extensionStoreDataService.getExtensionByName(s,Shopware.Context.api)},goToStatisticsAppDetailPage(){this.linkToStatisticsAppExists&&this.$router.push({name:"sw.extension.store.detail",params:{id:this.extension.id}})}}})},8445:function(e,t,n){var s=n(7759);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[e.id,s,""]]),s.locals&&(e.exports=s.locals),n(5346).Z("76e53bba",s,!0,{})},5346:function(e,t,n){"use strict";function s(e,t){for(var n=[],s={},i=0;i<t.length;i++){var o=t[i],a=o[0],r={id:e+":"+i,css:o[1],media:o[2],sourceMap:o[3]};s[a]?s[a].parts.push(r):n.push(s[a]={id:a,parts:[r]})}return n}n.d(t,{Z:function(){return h}});var i="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!i)throw Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var o={},a=i&&(document.head||document.getElementsByTagName("head")[0]),r=null,p=0,c=!1,l=function(){},d=null,u="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function h(e,t,n,i){c=n,d=i||{};var a=s(e,t);return m(a),function(t){for(var n=[],i=0;i<a.length;i++){var r=o[a[i].id];r.refs--,n.push(r)}t?m(a=s(e,t)):a=[];for(var i=0;i<n.length;i++){var r=n[i];if(0===r.refs){for(var p=0;p<r.parts.length;p++)r.parts[p]();delete o[r.id]}}}}function m(e){for(var t=0;t<e.length;t++){var n=e[t],s=o[n.id];if(s){s.refs++;for(var i=0;i<s.parts.length;i++)s.parts[i](n.parts[i]);for(;i<n.parts.length;i++)s.parts.push(v(n.parts[i]));s.parts.length>n.parts.length&&(s.parts.length=n.parts.length)}else{for(var a=[],i=0;i<n.parts.length;i++)a.push(v(n.parts[i]));o[n.id]={id:n.id,refs:1,parts:a}}}}function g(){var e=document.createElement("style");return e.type="text/css",a.appendChild(e),e}function v(e){var t,n,s=document.querySelector("style["+u+'~="'+e.id+'"]');if(s){if(c)return l;s.parentNode.removeChild(s)}if(f){var i=p++;t=x.bind(null,s=r||(r=g()),i,!1),n=x.bind(null,s,i,!0)}else t=y.bind(null,s=g()),n=function(){s.parentNode.removeChild(s)};return t(e),function(s){s?(s.css!==e.css||s.media!==e.media||s.sourceMap!==e.sourceMap)&&t(e=s):n()}}var w=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}();function x(e,t,n,s){var i=n?"":s.css;if(e.styleSheet)e.styleSheet.cssText=w(t,i);else{var o=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}function y(e,t){var n=t.css,s=t.media,i=t.sourceMap;if(s&&e.setAttribute("media",s),d.ssrId&&e.setAttribute(u,t.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}}]);
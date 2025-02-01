(window["webpackJsonpPluginswag-extension-store"]=window["webpackJsonpPluginswag-extension-store"]||[]).push([[412],{174:function(){},2412:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return r}}),n(4093);var r=Shopware.Component.wrapComponentConfig({template:'<div class="sw-in-app-purchase-checkout-purchase">\n    <div class="sw-in-app-purchase-checkout-purchase__feature">\n        <p class="sw-in-app-purchase-checkout-purchase__feature__name">\n            {{ purchase.name }}\n        </p>\n\n        <p class="sw-in-app-purchase-checkout-purchase__feature__description">\n            {{ purchase.description }}\n        </p>\n    </div>\n\n    <sw-in-app-purchase-price-box\n        :price-model="priceModel"\n    />\n\n    <div class="sw-in-app-purchase-checkout-purchase__subtext">\n        <p class="sw-in-app-purchase-checkout-purchase__subtext__bill">\n            {{ $tc(\'sw-in-app-purchase-checkout-overview.billHint\') }}\n        </p>\n\n        <p class="sw-in-app-purchase-checkout-purchase__subtext__exclude_vat">\n            {{ $tc(\'sw-in-app-purchase-checkout-overview.excludeVat\') }}\n        </p>\n\n        <sw-gtc-checkbox\n            :value="tosAccepted"\n            class="sw-in-app-purchase-checkout-purchase__subtext__tos"\n            @update:value="onTosAcceptedChange"\n        />\n    </div>\n</div>\n',props:{purchase:{type:Object,required:!0},priceModel:{type:Object,required:!0},tosAccepted:{type:Boolean,required:!0}},methods:{onTosAcceptedChange(e){this.$emit("update:tos-accepted",e)}}})},4093:function(e,t,n){var r=n(174);r.__esModule&&(r=r.default),"string"==typeof r&&(r=[[e.id,r,""]]),r.locals&&(e.exports=r.locals),n(5346).Z("0eb7a338",r,!0,{})},5346:function(e,t,n){"use strict";function r(e,t){for(var n=[],r={},s=0;s<t.length;s++){var a=t[s],c=a[0],o={id:e+":"+s,css:a[1],media:a[2],sourceMap:a[3]};r[c]?r[c].parts.push(o):n.push(r[c]={id:c,parts:[o]})}return n}n.d(t,{Z:function(){return f}});var s="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!s)throw Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var a={},c=s&&(document.head||document.getElementsByTagName("head")[0]),o=null,i=0,p=!1,u=function(){},d=null,l="data-vue-ssr-id",h="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function f(e,t,n,s){p=n,d=s||{};var c=r(e,t);return v(c),function(t){for(var n=[],s=0;s<c.length;s++){var o=a[c[s].id];o.refs--,n.push(o)}t?v(c=r(e,t)):c=[];for(var s=0;s<n.length;s++){var o=n[s];if(0===o.refs){for(var i=0;i<o.parts.length;i++)o.parts[i]();delete a[o.id]}}}}function v(e){for(var t=0;t<e.length;t++){var n=e[t],r=a[n.id];if(r){r.refs++;for(var s=0;s<r.parts.length;s++)r.parts[s](n.parts[s]);for(;s<n.parts.length;s++)r.parts.push(m(n.parts[s]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var c=[],s=0;s<n.parts.length;s++)c.push(m(n.parts[s]));a[n.id]={id:n.id,refs:1,parts:c}}}}function g(){var e=document.createElement("style");return e.type="text/css",c.appendChild(e),e}function m(e){var t,n,r=document.querySelector("style["+l+'~="'+e.id+'"]');if(r){if(p)return u;r.parentNode.removeChild(r)}if(h){var s=i++;t=_.bind(null,r=o||(o=g()),s,!1),n=_.bind(null,r,s,!0)}else t=b.bind(null,r=g()),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){r?(r.css!==e.css||r.media!==e.media||r.sourceMap!==e.sourceMap)&&t(e=r):n()}}var w=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}();function _(e,t,n,r){var s=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=w(t,s);else{var a=document.createTextNode(s),c=e.childNodes;c[t]&&e.removeChild(c[t]),c.length?e.insertBefore(a,c[t]):e.appendChild(a)}}function b(e,t){var n=t.css,r=t.media,s=t.sourceMap;if(r&&e.setAttribute("media",r),d.ssrId&&e.setAttribute(l,t.id),s&&(n+="\n/*# sourceURL="+s.sources[0]+" */\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(s))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}}]);
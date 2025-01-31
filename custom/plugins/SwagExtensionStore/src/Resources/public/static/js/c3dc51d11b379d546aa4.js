(window["webpackJsonpPluginswag-extension-store"]=window["webpackJsonpPluginswag-extension-store"]||[]).push([[528],{406:function(){},1528:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return i}}),n(3545);let{Criteria:r}=Shopware.Data;var i={template:'{% block sw_extension_store_listing_filter %}\n    <div class="sw-extension-store-listing-filter">\n        <template v-if="!isLoading">\n            {% block sw_extension_store_listing_filter_content %}\n                {% block sw_extension_store_listing_filter_sorting %}\n                    <sw-meteor-single-select\n                        class="sw-extension-store-listing-filter__sorting"\n                        size="small"\n                        :label="$tc(\'sw-extension.store.listing.sort\')"\n                        :options="sortingOptions"\n                        valueProperty="orderIdentifier"\n                        :value="sortingValue"\n                        @update:value="setSelectedSorting"\n                    >\n                    </sw-meteor-single-select>\n                {% endblock %}\n\n                {% block sw_extension_store_listing_all_filters %}\n                    <sw-meteor-single-select\n                        v-for="filter in listingFiltersSorted"\n                        class="sw-extension-store-listing-filter__filters"\n                        :key="filter.name"\n                        size="small"\n                        :label="filter.label"\n                        :options="getOptionsForFilter(filter)"\n                        :value="getValueForFilter(filter)"\n                        @update:value="changeValueForFilter(filter, $event)"\n                    >\n                        <template v-if="filter.type === \'category\'"\n                                  #result-label-property="{ item, valueProperty }">\n                            {% block sw_extension_store_listing_filter_category_filter_result %}\n                                <div v-if="item[valueProperty] !== null"\n                                     :class="{ \'is--root-category\': isRootCategory(item) }"\n                                     :style="{ \'padding-left\': isRootCategory(item) ? \'0\': `${categoryDepth(item)}em` }">\n                                    {{ item.label }}\n                                </div>\n                            {% endblock %}\n                        </template>\n                    </sw-meteor-single-select>\n                {% endblock %}\n            {% endblock %}\n        </template>\n        <template v-else>\n            <sw-loader></sw-loader>\n        </template>\n    </div>\n{% endblock %}\n',mixins:["notification"],inject:["extensionStoreDataService","feature"],data(){return{isLoading:!0,listingFilters:[],listingSorting:{}}},computed:{search(){return Shopware.State.get("shopwareExtensions").search},activeFilters:{get(){return Shopware.State.get("shopwareExtensions").search.filter},set(e){Shopware.State.get("shopwareExtensions").search.filter=e}},sortingOptions(){return this.listingSorting.options?this.listingSorting.options.map(e=>(e.orderIdentifier=`${e.orderBy}##${e.orderSequence}`,e)):[]},defaultSortingValue(){return this.listingSorting.default?`${this.listingSorting.default.orderBy}##${this.listingSorting.default.orderSequence}`:null},sortingValue(){let e=this.search.sorting&&this.search.sorting.field,t=this.search.sorting&&this.search.sorting.order;return e&&t?`${e}##${t}`:this.defaultSortingValue},listingFiltersSorted(){let e=[...this.listingFilters];e.sort((e,t)=>e.position-t.position),e.forEach(e=>{e.options.sort((e,t)=>e.position-t.position)});let t=e.find(e=>"category"===e.type);return t&&(t.options=this.getOrderedCategories(t.options)),e}},created(){this.createdComponent()},methods:{createdComponent(){this.fetchListingFilters()},fetchListingFilters(){return this.extensionStoreDataService.listingFilters().then(({filter:e,sorting:t})=>{this.listingFilters=e,this.listingSorting=t}).catch(e=>{this.createNotificationError({message:e})}).finally(()=>{this.isLoading=!1})},getValueForFilter(e){return this.activeFilters[e.name]||null},changeValueForFilter(e,t){if(!t){this.$delete(this.activeFilters,e.name);return}this.activeFilters[e.name]=t},getOptionsForFilter(e){return[{label:this.$tc("sw-extension.store.listing.anyOption"),value:null},...e.options]},setSelectedSorting(e){let[t,n]=e.split("##");Shopware.State.commit("shopwareExtensions/setSearchValue",{key:"sorting",value:r.sort(t,n)})},isRootCategory(e){return null===e.parent||void 0===e.parent},categoryDepth(e){let t=0,n=this.getCategoryByName(e.parent);for(;n;)t+=1,n=this.getCategoryByName(n.parent)?this.getCategoryByName(n.parent):null;return t},getCategoryByName(e){return this.listingFilters.find(e=>"category"===e.type).options.find(t=>t.label===e||t.value===e||t.name===e)},getOrderedCategories(e){let t=new Map;return t.set(null,{value:null,children:[]}),e.forEach(e=>{t.set(e.value,{value:e,children:[]})}),e.forEach(e=>{t.get(e.parent).children.push(t.get(e.value))}),this.flatTree(t.get(null))},flatTree(e){let t=e.value?[e.value]:[];return e.children.sort((e,t)=>e.value.position-t.value.position).forEach(e=>t.push(...this.flatTree(e))),t}}}},3545:function(e,t,n){var r=n(406);r.__esModule&&(r=r.default),"string"==typeof r&&(r=[[e.id,r,""]]),r.locals&&(e.exports=r.locals),n(5346).Z("6aad4a7b",r,!0,{})},5346:function(e,t,n){"use strict";function r(e,t){for(var n=[],r={},i=0;i<t.length;i++){var s=t[i],o=s[0],l={id:e+":"+i,css:s[1],media:s[2],sourceMap:s[3]};r[o]?r[o].parts.push(l):n.push(r[o]={id:o,parts:[l]})}return n}n.d(t,{Z:function(){return f}});var i="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!i)throw Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var s={},o=i&&(document.head||document.getElementsByTagName("head")[0]),l=null,a=0,u=!1,c=function(){},d=null,g="data-vue-ssr-id",p="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function f(e,t,n,i){u=n,d=i||{};var o=r(e,t);return h(o),function(t){for(var n=[],i=0;i<o.length;i++){var l=s[o[i].id];l.refs--,n.push(l)}t?h(o=r(e,t)):o=[];for(var i=0;i<n.length;i++){var l=n[i];if(0===l.refs){for(var a=0;a<l.parts.length;a++)l.parts[a]();delete s[l.id]}}}}function h(e){for(var t=0;t<e.length;t++){var n=e[t],r=s[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(m(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var o=[],i=0;i<n.parts.length;i++)o.push(m(n.parts[i]));s[n.id]={id:n.id,refs:1,parts:o}}}}function v(){var e=document.createElement("style");return e.type="text/css",o.appendChild(e),e}function m(e){var t,n,r=document.querySelector("style["+g+'~="'+e.id+'"]');if(r){if(u)return c;r.parentNode.removeChild(r)}if(p){var i=a++;t=w.bind(null,r=l||(l=v()),i,!1),n=w.bind(null,r,i,!0)}else t=S.bind(null,r=v()),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){r?(r.css!==e.css||r.media!==e.media||r.sourceMap!==e.sourceMap)&&t(e=r):n()}}var y=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}();function w(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=y(t,i);else{var s=document.createTextNode(i),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(s,o[t]):e.appendChild(s)}}function S(e,t){var n=t.css,r=t.media,i=t.sourceMap;if(r&&e.setAttribute("media",r),d.ssrId&&e.setAttribute(g,t.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}}]);
// <plugin root>/src/Resources/app/administration/src/module/product-bundle/index.js
import './page/product-bundle-list';
import './page/product-bundle-detail';
import './page/product-bundle-create';
import deDE from '../../snippet/de-DE';
import enGB from '../../snippet/en-GB';

Shopware.Module.register('product-bundle', {
    type: 'plugin',
    name: 'Product Bundle',
    title: 'product-bundle.general.mainMenuItemGeneral',
    description: 'sw-property.general.descriptionTextModule',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },

    routes: {
        list: {
            component: 'product-bundle-list',
            path: 'list'
        },
        detail: {
            component: 'product-bundle-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'product.bundle.list'
            }
        },
        create: {
            component: 'product-bundle-create',
            path: 'create',
            meta: {
                parentPath: 'product.bundle.list',
                privilege: 'product.bundle.creator',
            }
        }
    },

    navigation: [{
        label: 'product-bundle.general.mainMenuItemGeneral',
        color: '#ff3d58',
        path: 'product.bundle.list',
        parent: 'sw-catalogue',
    }]
});

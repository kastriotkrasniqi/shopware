import {  Mixin } from 'Shopware';
import template from './product-bundle-create.html.twig';

Shopware.Component.register('product-bundle-create', {
    template,

    inject: ['repositoryFactory', 'context'],

    mixins: [
        Mixin.getByName('notification')
    ],

    data() {
        return {
            productBundleRepository: this.repositoryFactory.create('product_bundle'),
            productBundle: {
                name: '',
                assignedProducts: [],
            },
            isLoading: false,
            saveSuccess: false,
            newProduct: {
                productId: null,
                quantity: 1,
            },
        };
    },

    computed: {
        isProductInBundle() {
            return (productId) => {
                return this.productBundle.assignedProducts.some(product => product.productId === productId);
            };
        }
    },
    methods: {

        async createProductBundle() {
            this.isLoading = true;
            try {
                const bundle = this.productBundleRepository.create(Shopware.Context.api);

                bundle.name = this.productBundle.name;

                bundle.assignedProducts = await Promise.all(this.productBundle.assignedProducts.map(async (product) => {
                    const assignedProductRepository = this.repositoryFactory.create('product_bundle_assigned_products');
                    const assignedProduct = assignedProductRepository.create(Shopware.Context.api);

                    assignedProduct.bundleId = bundle.id;
                    assignedProduct.productId = product.productId;
                    assignedProduct.quantity = product.quantity;

                    return assignedProduct;
                }));

                await this.productBundleRepository.save(bundle, Shopware.Context.api);

                this.saveSuccess = true;
                this.$router.push({ name: 'product.bundle.list' });
            } catch (error) {
                console.error("Error saving product bundle:", error);
                this.createNotificationError({
                    message: this.$tc('sw-product-bundle.detail.saveError')
                });
            } finally {
                this.isLoading = false;
            }
        },

        async addProductToBundle() {
            const existingProduct = this.productBundle.assignedProducts.find(product => product.productId === this.newProduct.productId);

            if (existingProduct) {
                this.createNotificationError({
                    message: this.$tc('sw-product-bundle.detail.productExistsError')
                });
                return;
            }

            try {
                const productRepository = this.repositoryFactory.create('product');
                const product = await productRepository.get(this.newProduct.productId, {
                    ...Shopware.Context.api,
                    languageId: Shopware.Context.api.languageId // Pass the correct languageId
                });

                if (!product) {
                    this.createNotificationError({
                        message: this.$tc('sw-product-bundle.detail.productNotFoundError')
                    });
                    return;
                }

                console.log('productiiii:', product);

                this.productBundle.assignedProducts.push({
                    productName: product.translated.name,
                    productId: this.newProduct.productId,
                    quantity: this.newProduct.quantity,
                });
                this.newProduct = {
                    productId: null,
                    quantity: 1,
                };

            } catch (error) {
                console.error("Error adding product to bundle:", error);
                this.createNotificationError({
                    message: this.$tc('sw-product-bundle.detail.productAddError')
                });
            }
        },

        async deleteProductFromBundle(productId) {
            try {
                const assignedProducts = this.productBundle.assignedProducts.filter(product => product.productId === productId);

                if (!assignedProducts.length) {
                    this.createNotificationError({
                        message: this.$tc('sw-product-bundle.detail.productNotFoundError')
                    });
                    return;
                }

                this.productBundle.assignedProducts = this.productBundle.assignedProducts.filter(product => product.productId !== productId);


            } catch (error) {
                console.error("Error deleting product from bundle:", error);
                this.createNotificationError({
                    message: this.$tc('sw-product-bundle.detail.productDeleteError')
                });
            }
        },


    },
    metaInfo() {
        return {
            title: this.$createTitle()
        };
    }
});

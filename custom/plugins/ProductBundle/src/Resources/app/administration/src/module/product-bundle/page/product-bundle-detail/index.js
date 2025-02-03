import template from './product-bundle-detail.html.twig';

const { Mixin } = Shopware;

Shopware.Component.register('product-bundle-detail', {
    template,

    inject: ['repositoryFactory', 'context'],

    mixins: [
        Mixin.getByName('notification')
    ],

    data() {
        return {
            productBundleRepository: this.repositoryFactory.create('product_bundle'),
            productBundle: null,
            isLoading: false,
            saveSuccess: false,
            deleteError: false,
            selectedProducts: [],
            newProduct: {
                productId: null,
                quantity: 1,
            },
            showDeleteConfirmModal: false,
        };
    },

    computed: {
        productBundleName() {
            return this.productBundle?.name;
        },
        isProductInBundle() {
            return (productId) => {
                return this.selectedProducts.some(product => product.productId === productId);
            };
        }
    },

    methods: {

        async loadProductBundle() {
            this.isLoading = true;
            try {
                const criteria = new Shopware.Data.Criteria();
                criteria.addAssociation('translations');
                criteria.addAssociation('assignedProducts.product');
                criteria.addAssociation('assignedProducts.product.translations');


                this.productBundle = await this.productBundleRepository.get(this.$route.params.id, Shopware.Context.api, criteria);

                this.selectedProducts = this.productBundle.assignedProducts.map(assignedProduct => ({
                    bundleId: assignedProduct.bundleId,
                    productId: assignedProduct.product.id,
                    product: assignedProduct.product,
                    quantity: assignedProduct.quantity,
                }));

                console.log("Product bundle:", this.productBundle);
            } catch (error) {
                console.error("Error fetching product bundle:", error.response?.data || error.message);
                this.productBundle = null;
            } finally {
                this.isLoading = false;
            }
        },
        async onChangeLanguage() {
            await this.loadProductBundle();
        },
        async saveProductBundle() {
            this.isLoading = true;
            try {
                await this.productBundleRepository.save(this.productBundle, this.context);
                this.saveSuccess = true;
                this.$router.push({ name: 'product.bundle.list' });
            } catch (error) {
                console.error("Error saving product bundle:", error);
            } finally {
                this.isLoading = false;
            }
        },

        showDeleteModal() {
            this.showDeleteConfirmModal = true;
        },

        async confirmDeleteProductBundle() {
            this.isLoading = true;
            try {
                await this.repositoryFactory.create('product_bundle').delete(this.productBundle.id, this.context);
                this.$router.push({ name: 'product.bundle.list' });
            } catch (error) {
                console.error("Error deleting product bundle:", error);
            } finally {
                this.isLoading = false;
                this.showDeleteConfirmModal = false;
            }
        },
        async addProductToBundle() {
            const existingProduct = this.selectedProducts.find(product => product.productId === this.newProduct.productId);

            if (existingProduct) {
                this.createNotificationError({
                    message: this.$tc('sw-product-bundle.detail.productExistsError')
                });
                return;
            }

            try {
                const productRepository = this.repositoryFactory.create('product');
                const assignedProductRepository = this.repositoryFactory.create('product_bundle_assigned_products');

                const product = await productRepository.get(this.newProduct.productId, Shopware.Context.api);

                if (!product) {
                    this.createNotificationError({
                        message: this.$tc('sw-product-bundle.detail.productNotFoundError')
                    });
                    return;
                }

                const assignedProduct = assignedProductRepository.create(Shopware.Context.api);
                assignedProduct.bundleId = this.productBundle.id;
                assignedProduct.productId = this.newProduct.productId;
                assignedProduct.quantity = this.newProduct.quantity;

                await assignedProductRepository.save(assignedProduct, Shopware.Context.api);

                this.newProduct.productId = null;
                this.newProduct.quantity = 1;

                this.loadProductBundle();

            } catch (error) {
                console.error("Error adding product to bundle:", error);
                this.createNotificationError({
                    message: this.$tc('sw-product-bundle.detail.productAddError')
                });
            }
        },

        async deleteProductFromBundle(productId) {
            try {
                const assignedProductRepository = this.repositoryFactory.create('product_bundle_assigned_products');

                const criteria = new Shopware.Data.Criteria();
                criteria.addFilter(
                    Shopware.Data.Criteria.equals('productId', productId)
                );
                criteria.addFilter(
                    Shopware.Data.Criteria.equals('bundleId', this.productBundle.id)
                );

                const assignedProducts = await assignedProductRepository.search(criteria, Shopware.Context.api);

                if (!assignedProducts.length) {
                    this.createNotificationError({
                        message: this.$tc('sw-product-bundle.detail.productNotFoundError')
                    });
                    return;
                }

                for (const assignedProduct of assignedProducts) {
                    await assignedProductRepository.delete(assignedProduct.id, Shopware.Context.api);
                }

                this.loadProductBundle();

            } catch (error) {
                console.error("Error deleting product from bundle:", error);
                this.createNotificationError({
                    message: this.$tc('sw-product-bundle.detail.productDeleteError')
                });
            }
        },


    },

    created() {
        this.loadProductBundle();
    },

    metaInfo() {
        return {
            title: this.$createTitle()
        };
    }
});

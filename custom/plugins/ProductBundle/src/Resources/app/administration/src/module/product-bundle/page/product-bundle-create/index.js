import template from './product-bundle-create.html.twig';
const { Mixin } = Shopware;
const { Criteria } = Shopware.Data;

Shopware.Component.register('product-bundle-create', {
    template,

    inject: ['repositoryFactory'],

    mixins: [Mixin.getByName('listing')],

    data() {
        return {
            productBundleRepository: this.repositoryFactory.create('product_bundle'),
            productBundle: null,
            languageId: Shopware.State.get('context').api.languageId,
            availableProducts: [], // Array of products available to add to the bundle
            selectedProducts: [], // Array of selected products for the bundle
            columns: [
                {
                    property: 'name',
                    label: this.$tc('sw-product-bundle.create.productColumnName'),
                    align: 'left'
                },
                {
                    property: 'quantity',
                    label: this.$tc('sw-product-bundle.create.productColumnQuantity'),
                    align: 'center'
                },
                {
                    property: 'actions',
                    label: this.$tc('sw-product-bundle.create.actionsColumn'),
                    align: 'center'
                }
            ],
            isLoading: false,
            saveDisabled: false,
            productBundleNameError: null
        };
    },

    computed: {
        saveDisabled() {
            return !this.productBundle || this.isLoading || !this.selectedProducts.length;
        }
    },

    methods: {
        async createNewBundle() {
            this.isLoading = true;
            try {
                this.productBundle = this.productBundleRepository.create(Shopware.Context.api);
                this.productBundle.translations = this.productBundle.translations || {};
                this.$set(this.productBundle.translations, this.languageId, { name: '' });
                await this.fetchAvailableProducts();
            } catch (error) {
                console.error('Error creating bundle:', error);
            } finally {
                this.isLoading = false;
            }
        },

        async fetchAvailableProducts() {
            const criteria = new Criteria(1, 25);
            const result = await this.productBundleRepository.search(criteria, Shopware.Context.api);
            this.availableProducts = result;
        },

        addProductToBundle(product) {
            if (!this.selectedProducts.includes(product)) {
                this.selectedProducts.push(product);
            }
        },

        removeProductFromBundle(product) {
            const index = this.selectedProducts.indexOf(product);
            if (index !== -1) {
                this.selectedProducts.splice(index, 1);
            }
        },

        async saveBundle() {
            this.isLoading = true;
            try {
                this.productBundle.products = this.selectedProducts.map(product => ({
                    productId: product.id,
                    quantity: 1
                }));

                await this.productBundleRepository.save(this.productBundle, Shopware.Context.api);
                this.$router.push({ name: 'product.bundle.list' });
            } catch (error) {
                console.error('Error saving bundle:', error);
            } finally {
                this.isLoading = false;
            }
        },

        cancel() {
            this.$router.push({ name: 'product.bundle.list' });
        }
    },

    created() {
        this.createNewBundle();
    }
});

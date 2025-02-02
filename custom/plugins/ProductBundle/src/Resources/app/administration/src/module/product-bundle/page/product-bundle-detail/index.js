import template from './product-bundle-detail.html.twig';

const { Mixin } = Shopware;

Shopware.Component.register('product-bundle-detail', {
    template,

    inject: ['repositoryFactory', 'context'],

    data() {
        return {
            productBundleRepository: this.repositoryFactory.create('product_bundle'),
            productBundle: null,
            isLoading: true,
            saveError: false,
            saveSuccess: false,
            deleteError: false,
            deleteSuccess: false,
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle()
        };
    },

    methods: {
        async loadProductBundle() {
            this.isLoading = true;
            try {
                const result = await this.productBundleRepository.get(this.$route.params.id, Shopware.Context.api);
                this.productBundle = result;
            } catch (error) {
                console.error("Error fetching product bundle:", error.response?.data || error.message);
                this.productBundle = null;
            } finally {
                this.isLoading = false;
            }
        },

        async saveProductBundle() {
            this.isLoading = true;
            try {
                const result = await this.productBundleRepository.save(this.productBundle, Shopware.Context.api);
                if (result) {
                    this.saveSuccess = true;
                    this.$router.push({ name: 'product.bundle.list' });
                }
            } catch (error) {
                console.error("Error saving product bundle:", error.response?.data || error.message);
                this.saveError = true;
            } finally {
                this.isLoading = false;
            }
        },

        async deleteProductBundle() {
            this.isLoading = true;
            try {
                await this.productBundleRepository.delete(this.productBundle.id, Shopware.Context.api);
                this.deleteSuccess = true;
                this.$router.push({ name: 'product.bundle.list' });
            } catch (error) {
                console.error("Error deleting product bundle:", error.response?.data || error.message);
                this.deleteError = true;
            } finally {
                this.isLoading = false;
            }
        },

        cancel() {
            this.$router.push({ name: 'product.bundle.list' });
        }
    },

    created() {
        this.loadProductBundle();
    }
});

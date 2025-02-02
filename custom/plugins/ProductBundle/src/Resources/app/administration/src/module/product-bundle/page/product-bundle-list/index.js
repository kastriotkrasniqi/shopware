import template from './product-bundle-list.html.twig';

const { Mixin } = Shopware;
const { Criteria } = Shopware.Data;

Shopware.Component.register('product-bundle-list', {
    template,

    inject: [
        'repositoryFactory',
    ],

    mixins: [
        Mixin.getByName('listing')
    ],

    metaInfo() {
        return {
            title: this.$createTitle()
        };
    },

    data() {
        return {
            productBundleRepository: this.repositoryFactory.create('product_bundle'),
            productBundles: [],
            columns: [
                { property: 'name', label: 'Product Bundle Name', routerLink: 'product.bundle.detail', allowResize: true },
            ],
            isLoading: false,
            total: 0,
            criteria: new Criteria(1, 25),
            languageId: Shopware.State.get('context').api.languageId,
            emptyStateTitle: this.$tc('sw-product-bundle.list.emptyStateTitle'),
            emptyStateSubline: this.$tc('sw-product-bundle.list.emptyStateSubline'),
        };
    },

    methods: {
        async getList() {
            this.isLoading = true;
            this.criteria.addAssociation('translations');

            try {
                console.log("Fetching product bundles...");
                const result = await this.productBundleRepository.search(this.criteria, Shopware.Context.api);

                console.log("Product bundles fetched:", result);

                if (result.length === 0) {
                    console.warn("No product bundles found.");
                }

                this.total = result.total;
                this.productBundles = result;
            } catch (error) {
                console.error("Error fetching product bundles:", error.response?.data || error.message);
                this.productBundles = [];
            } finally {
                this.isLoading = false;
            }
        },

        onEditItem(item) {
            this.$router.push({ name: 'product.bundle.detail', params: { id: item.id } });
        },

        onCreateNewProductBundle() {
            this.$router.push({ name: 'product.bundle.create' });
        },

        onSearch(searchTerm) {
            this.criteria.setTerm(searchTerm);
            this.getList(); // You would fetch the list based on the updated criteria
        }

    },

    created() {
        this.getList();
    },
});

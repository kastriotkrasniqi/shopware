import template from './product-bundle-list.html.twig';

const { Mixin } = Shopware;
const { Criteria } = Shopware.Data;

Shopware.Component.register('product-bundle-list', {
    template,

    inject: ['repositoryFactory'],

    mixins: [Mixin.getByName('listing')],

    metaInfo() {
        return { title: this.$createTitle() };
    },

    data() {
        return {
            isLoading: false,
            total: 0,
            productBundles: [],
            criteria: new Criteria(1, 25),
            productBundleRepository: this.repositoryFactory.create('product_bundle'),
            languageId: Shopware.State.get('context').api.languageId,

            emptyStateTitle: this.$tc('sw-product-bundle.list.emptyStateTitle'),
            emptyStateSubline: this.$tc('sw-product-bundle.list.emptyStateSubline'),
        };
    },

    computed: {
        columns() {
            return [
                {
                    property: 'name',
                    label: this.$tc('sw-product-bundle.list.columnName'),
                    routerLink: 'product.bundle.detail',
                    allowResize: true,
                },
            ];
        },
    },

    methods: {
        async fetchProductBundles() {
            this.isLoading = true;
            this.criteria.addAssociation('translations');

            try {
                const result = await this.productBundleRepository.search(this.criteria, Shopware.Context.api);
                this.productBundles = result;
                this.total = result.total;
            } catch (error) {
                console.error("Error fetching product bundles:", error.response?.data || error.message);
                this.productBundles = [];
            } finally {
                this.isLoading = false;
            }
        },

        async changeLanguage() {
            this.languageId = Shopware.State.get('context').api.languageId;
            await this.fetchProductBundles();
        },

        createNewBundle() {
            this.$router.push({ name: 'product.bundle.create' });
        },

        searchProductBundles(searchTerm) {
            this.criteria.setTerm(searchTerm);
            this.fetchProductBundles();
        },
    },

    created() {
        this.fetchProductBundles();
    },
});

import template from './product-bundle-list.html.twig';

const { Mixin } = Shopware;
const { Criteria } = Shopware.Data;

Shopware.Component.register('product-bundle-list', {
    template,

    compatConfig: Shopware.compatConfig,

    inject: [
        'repositoryFactory',
        'acl',
    ],

    mixins: [
        Mixin.getByName('listing'),
    ],

    data() {
        return {
            productBundle: null,
            sortBy: 'name',
            isLoading: false,
            sortDirection: 'ASC',
            showDeleteModal: false,
            searchConfigEntity: 'product_bundle',
        };
    },

    metaInfo() {
        return {
            title: this.$createTitle(),
        };
    },

    computed: {
        propertyRepository() {
            return this.repositoryFactory.create('product_bundle');
        },

        defaultCriteria() {
            const criteria = new Criteria(this.page, this.limit);

            criteria.setTerm(this.term);
            criteria.addSorting(Criteria.sort(this.sortBy, this.sortDirection, this.useNaturalSorting));


            return criteria;
        },

        useNaturalSorting() {
            return this.sortBy === 'property.name';
        },
    },

    methods: {
        onDelete(id) {
            this.showDeleteModal = id;
        },

        onCloseDeleteModal() {
            this.showDeleteModal = false;
        },

        onConfirmDelete(id) {
            this.showDeleteModal = false;

            return this.propertyRepository.delete(id).then(() => {
                this.getList();
            });
        },

        onChangeLanguage() {
            this.getList();
        },

        async getList() {
            this.isLoading = true;

            const criteria = new Criteria();

            return this.propertyRepository
                .search(criteria)
                .then((items) => {
                    this.total = items.total;
                    this.productBundle = items;
                    this.isLoading = false;

                    return items;
                })
                .catch(() => {
                    this.isLoading = false;
                });
        },

        getPropertyColumns() {
            return [
                {
                    property: 'name',
                    label: 'product-bundle.list.columnName',
                    routerLink: 'sw.property.detail',
                    inlineEdit: 'string',
                    allowResize: true,
                    primary: true,
                },
            ];
        },
    },
});

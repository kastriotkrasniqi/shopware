console.log('ProductBundle JS loaded');


document.addEventListener('DOMContentLoaded', function () {
    const openModalButtons = document.querySelectorAll('.open-bundle-modal');
    const modals = document.querySelectorAll('.bundle-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');

    openModalButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productId = this.getAttribute('data-product-id');
            const modal = this.parentElement.parentElement.querySelector('.bundle-modal');
            const bundleProductsList = modal.querySelector('#bundle-products-list');

            modal.style.display = 'block';

            fetch(`/product-bundle-details/${productId}`)
                .then(response => response.json())
                .then(data => {
                    if (data.bundles && data.bundles.length > 0) {
                        let productsHtml = '';

                        data.bundles.forEach(bundle => {
                            productsHtml += `<p style="font-weight: bold; margin-bottom: 1rem;">Bundle: ${bundle.bundleName}</p>`;

                            bundle.products.forEach(product => {
                                productsHtml += `
                                    <div style="margin-bottom: 0.5rem; padding: 0.5rem; border-bottom: 1px solid #eee;">
                                        <strong>${product.productName}</strong>
                                        <span style="float: right;">Quantity: ${product.quantity}</span>
                                    </div>
                                `;
                            });
                        });

                        bundleProductsList.innerHTML = productsHtml;
                    } else {
                        bundleProductsList.innerHTML = '<p>No bundle details found</p>';
                    }
                })
                .catch(error => {
                    console.error('Error fetching bundle details:', error);
                    bundleProductsList.innerHTML = '<p style="color: red;">Error loading bundle details</p>';
                });
        });
    });

    closeModalButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            this.closest('.bundle-modal').style.display = 'none';
        });
    });

    modals.forEach(function(modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                this.style.display = 'none';
            }
        });
    });
});

<?php

namespace Blaze\Core\Controller;

use Shopware\Core\Framework\Context;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Shopware\Storefront\Controller\StorefrontController;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;

#[Route(defaults: ['_routeScope' => ['storefront']])]
class ProductBundleController extends StorefrontController
{
    private EntityRepository $productBundleAssignedProductsRepository;
    private EntityRepository $productBundleRepository;

    public function __construct(
        EntityRepository $productBundleAssignedProductsRepository,
        EntityRepository $productBundleRepository
    )
    {
        $this->productBundleAssignedProductsRepository = $productBundleAssignedProductsRepository;
        $this->productBundleRepository = $productBundleRepository;
    }

    #[Route(path: '/product-bundle-details/{productId}', name: 'frontend.bundle.details', methods: ['GET'])]
    public function getBundleDetails(string $productId, Context $context): JsonResponse
    {
        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('productId', $productId));
        $criteria->addAssociation('product');
        $criteria->addAssociation('bundle');

        $assignedBundles = $this->productBundleAssignedProductsRepository->search($criteria, $context);

        $bundlesDetails = [];

        foreach ($assignedBundles->getEntities() as $assignedBundle) {
            $bundleId = $assignedBundle->get('bundleId');

            $bundleCriteria = new Criteria([$bundleId]);
            $bundle = $this->productBundleRepository->search($bundleCriteria, $context)->first();

            if ($bundle) {
                $bundleDetails = [
                    'bundleName' => $bundle->getName(),
                    'products' => [],
                ];

                $assignedProductsCriteria = new Criteria();
                $assignedProductsCriteria->addFilter(new EqualsFilter('bundleId', $bundleId));
                $assignedProductsCriteria->addAssociation('product');
                $assignedProducts = $this->productBundleAssignedProductsRepository->search($assignedProductsCriteria, $context);

                foreach ($assignedProducts->getEntities() as $assignedProduct) {
                    $product = $assignedProduct->get('product');
                    $bundleDetails['products'][] = [
                        'productId' => $assignedProduct->get('productId'),
                        'productName' => $product ? $product->getTranslated()['name'] ?? $product->getName() : '',
                        'quantity' => $assignedProduct->get('quantity'),
                    ];
                }

                $bundlesDetails[] = $bundleDetails;
            }
        }

        return new JsonResponse([
            'bundles' => $bundlesDetails,
        ]);
    }
}

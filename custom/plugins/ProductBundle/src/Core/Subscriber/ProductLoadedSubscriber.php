<?php declare(strict_types=1);

namespace Blaze\Core\Subscriber;

use Shopware\Core\Content\Product\ProductEvents;
use Shopware\Core\Framework\DataAbstractionLayer\Event\EntityLoadedEvent;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Shopware\Core\Framework\Struct\ArrayEntity;

class ProductLoadedSubscriber implements EventSubscriberInterface
{
    private EntityRepository $productBundleAssignedProductsRepository;

    public function __construct(EntityRepository $productBundleAssignedProductsRepository)
    {
        $this->productBundleAssignedProductsRepository = $productBundleAssignedProductsRepository;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            ProductEvents::PRODUCT_LOADED_EVENT => 'onProductLoaded',
        ];
    }

    public function onProductLoaded(EntityLoadedEvent $event): void
    {
        foreach ($event->getEntities() as $product) {
            $criteria = new Criteria();
            $criteria->addFilter(new EqualsFilter('productId', $product->getId()));

            $assignedBundles = $this->productBundleAssignedProductsRepository->search($criteria, $event->getContext());

            $isBundle = $assignedBundles->getTotal() > 0;

            $product->addExtension('isBundle', new ArrayEntity([
                'isBundle' => $isBundle,
            ]));

        }
    }
}

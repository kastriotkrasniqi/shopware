<?php declare(strict_types=1);

namespace Blaze\Core\Content\ProductBundle;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;
use Shopware\Core\Content\Product\ProductEntity;
use Blaze\Core\Content\ProductBundleAssignedProducts\ProductBundleAssignedProductsCollection;

class ProductBundleEntity extends Entity
{
    use EntityIdTrait;

    protected ?string $productId;
    protected ?string $title;

    /** @var ProductEntity|null */
    protected ?ProductEntity $product;

    /** @var ProductBundleAssignedProductsCollection|null */
    protected ?ProductBundleAssignedProductsCollection $assignedProducts;

    public function getProductId(): ?string
    {
        return $this->productId;
    }

    public function setProductId(?string $productId): void
    {
        $this->productId = $productId;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): void
    {
        $this->title = $title;
    }

    public function getProduct(): ?ProductEntity
    {
        return $this->product;
    }

    public function setProduct(?ProductEntity $product): void
    {
        $this->product = $product;
    }

    public function getAssignedProducts(): ?ProductBundleAssignedProductsCollection
    {
        return $this->assignedProducts;
    }

    public function setAssignedProducts(?ProductBundleAssignedProductsCollection $assignedProducts): void
    {
        $this->assignedProducts = $assignedProducts;
    }
}

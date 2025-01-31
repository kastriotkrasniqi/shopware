<?php declare(strict_types=1);

namespace Blaze\Core\Content\ProductBundleAssignedProducts;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;
use Blaze\Core\Content\ProductBundle\ProductBundleEntity;
use Shopware\Core\Content\Product\ProductEntity;

class ProductBundleAssignedProductsEntity extends Entity
{
    use EntityIdTrait;

    protected ?string $bundleId;
    protected ?string $productId;
    protected int $quantity;

    /** @var ProductBundleEntity|null */
    protected ?ProductBundleEntity $bundle;

    /** @var ProductEntity|null */
    protected ?ProductEntity $product;

    public function getBundleId(): ?string
    {
        return $this->bundleId;
    }

    public function setBundleId(?string $bundleId): void
    {
        $this->bundleId = $bundleId;
    }

    public function getProductId(): ?string
    {
        return $this->productId;
    }

    public function setProductId(?string $productId): void
    {
        $this->productId = $productId;
    }

    public function getQuantity(): int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): void
    {
        $this->quantity = $quantity;
    }

    public function getBundle(): ?ProductBundleEntity
    {
        return $this->bundle;
    }

    public function setBundle(?ProductBundleEntity $bundle): void
    {
        $this->bundle = $bundle;
    }

    public function getProduct(): ?ProductEntity
    {
        return $this->product;
    }

    public function setProduct(?ProductEntity $product): void
    {
        $this->product = $product;
    }
}

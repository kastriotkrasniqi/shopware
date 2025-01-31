<?php declare(strict_types=1);

namespace Blaze\Core\Content\ProductBundleTranslation;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Blaze\Core\Content\ProductBundle\ProductBundleEntity;

class ProductBundleTranslationEntity extends Entity
{
    protected ?string $title;

    /** @var ProductBundleEntity|null */
    protected ?ProductBundleEntity $productBundle;

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): void
    {
        $this->title = $title;
    }

    public function getProductBundle(): ?ProductBundleEntity
    {
        return $this->productBundle;
    }

    public function setProductBundle(?ProductBundleEntity $productBundle): void
    {
        $this->productBundle = $productBundle;
    }
}

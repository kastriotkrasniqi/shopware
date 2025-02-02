<?php declare(strict_types=1);

namespace Blaze\Core\Content\ProductBundleTranslation;

use Blaze\Core\Content\ProductBundle\ProductBundleEntity;
use Shopware\Core\Framework\DataAbstractionLayer\TranslationEntity;


class ProductBundleTranslationEntity extends TranslationEntity
{
    protected ?string $name;

    /** @var ProductBundleEntity|null */
    protected ?ProductBundleEntity $productBundle;

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
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

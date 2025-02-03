<?php declare(strict_types=1);

namespace Blaze\Core\Content\ProductBundle;

use Blaze\Core\Content\ProductBundle\ProductBundleEntity;
use Blaze\Core\Content\ProductBundle\ProductBundleCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\ApiAware;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\TranslatedField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToManyAssociationField;
use Blaze\Core\Content\ProductBundleTranslation\ProductBundleTranslationDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\TranslationsAssociationField;
use Blaze\Core\Content\ProductBundleAssignedProducts\ProductBundleAssignedProductsDefinition;


class ProductBundleDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'product_bundle';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return ProductBundleEntity::class;
    }

    public function getCollectionClass(): string
    {
        return ProductBundleCollection::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new PrimaryKey(), new ApiAware(), new Required()),
            (new TranslatedField('name'))->addFlags(new ApiAware(), new Required()),
            (new TranslationsAssociationField(
                ProductBundleTranslationDefinition::class,
                'product_bundle_id'
            ))->addFlags(new ApiAware(), new Required()),
            (new OneToManyAssociationField('assignedProducts', ProductBundleAssignedProductsDefinition::class, 'bundle_id'))->addFlags(new ApiAware(), new Required())
        ]);
    }
}

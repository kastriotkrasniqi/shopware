<?php declare(strict_types=1);

namespace Blaze\Core\Content\ProductBundle;

use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\TranslatedField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\TranslationsAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Blaze\Core\Content\ProductBundleTranslation\ProductBundleTranslationDefinition;
use Blaze\Core\Content\ProductBundleAssignedProducts\ProductBundleAssignedProductsDefinition;
use Shopware\Core\Content\Product\ProductDefinition;

class ProductBundleDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'product_bundle';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getCollectionClass(): string
    {
        return ProductBundleCollection::class;
    }

    public function getEntityClass(): string
    {
        return ProductBundleEntity::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new PrimaryKey(), new Required()),
            (new FkField('product_id', 'productId', ProductDefinition::class))->addFlags(new Required()),
            
            new TranslatedField('title'),
            
            new ManyToOneAssociationField('product', 'product_id', ProductDefinition::class),
            new OneToManyAssociationField('assignedProducts', ProductBundleAssignedProductsDefinition::class, 'bundle_id'),
            new TranslationsAssociationField(ProductBundleTranslationDefinition::class, 'product_bundle_id'),
        ]);
    }
}

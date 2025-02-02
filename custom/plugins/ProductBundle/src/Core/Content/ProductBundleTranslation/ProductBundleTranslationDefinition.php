<?php declare(strict_types=1);

namespace Blaze\Core\Content\ProductBundleTranslation;

use Blaze\Core\Content\ProductBundle\ProductBundleDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\EntityTranslationDefinition;

class ProductBundleTranslationDefinition extends EntityTranslationDefinition
{
    public function getEntityName(): string
    {
        return 'product_bundle_translation';
    }

    public function getEntityClass(): string
    {
        return ProductBundleTranslationEntity::class;
    }

    public function getParentDefinitionClass(): string
    {
        return ProductBundleDefinition::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new StringField('name', 'name'))->addFlags(new Required()),
        ]);
    }
}

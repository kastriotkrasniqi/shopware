<?php declare(strict_types=1);

namespace Blaze\Core\Content\ProductBundleTranslation;

use Shopware\Core\Framework\DataAbstractionLayer\EntityTranslationDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Blaze\Core\Content\ProductBundle\ProductBundleDefinition;

class ProductBundleTranslationDefinition extends EntityTranslationDefinition
{
    public function getEntityName(): string
    {
        return 'product_bundle_translation';
    }

    public function getParentDefinitionClass(): string
    {
        return ProductBundleDefinition::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new StringField('title', 'title'))->addFlags(new Required()),
        ]);
    }
}

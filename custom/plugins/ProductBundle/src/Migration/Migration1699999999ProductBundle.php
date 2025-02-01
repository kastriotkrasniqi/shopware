<?php declare(strict_types=1);

namespace Blaze\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1699999999ProductBundle extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1699999999;
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement('
            CREATE TABLE IF NOT EXISTS `product_bundle` (
                `id` BINARY(16) NOT NULL,
                `product_id` BINARY(16) NOT NULL,
                `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
                `updated_at` DATETIME(3) NULL ON UPDATE CURRENT_TIMESTAMP(3),
                PRIMARY KEY (`id`),
                CONSTRAINT `fk.product_bundle.product_id` FOREIGN KEY (`product_id`)
                    REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ');

        $connection->executeStatement('
            CREATE TABLE IF NOT EXISTS `product_bundle_translation` (
                `id` BINARY(16) NOT NULL,
                `product_bundle_id` BINARY(16) NOT NULL,
                `language_id` BINARY(16) NOT NULL,
                `title` VARCHAR(255) NOT NULL,
                `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
                `updated_at` DATETIME(3) NULL ON UPDATE CURRENT_TIMESTAMP(3),
                PRIMARY KEY (`id`),
                CONSTRAINT `fk.product_bundle_translation.product_bundle_id` FOREIGN KEY (`product_bundle_id`)
                    REFERENCES `product_bundle` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT `fk.product_bundle_translation.language_id` FOREIGN KEY (`language_id`)
                    REFERENCES `language` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ');

        $connection->executeStatement('
            CREATE TABLE IF NOT EXISTS `product_bundle_assigned_products` (
                `id` BINARY(16) NOT NULL,
                `bundle_id` BINARY(16) NOT NULL,
                `product_id` BINARY(16) NOT NULL,
                `quantity` INT NOT NULL,
                `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
                `updated_at` DATETIME(3) NULL ON UPDATE CURRENT_TIMESTAMP(3),
                PRIMARY KEY (`id`),
                CONSTRAINT `fk.product_bundle_assigned_products.bundle_id` FOREIGN KEY (`bundle_id`)
                    REFERENCES `product_bundle` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT `fk.product_bundle_assigned_products.product_id` FOREIGN KEY (`product_id`)
                    REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ');
    }

    public function updateDestructive(Connection $connection): void
    {
        //
    }
}

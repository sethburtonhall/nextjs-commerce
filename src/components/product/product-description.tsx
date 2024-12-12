import { AddToCart } from '@/components/cart/add-to-cart';
import { Badge } from '@/components/ui/badge';
import { Price } from '@/components/price';
import { VariantSelector } from '@/components/product/variant-selector';
import { Prose } from '@/components/prose';

import type { Product } from '@/types/shopify-types';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <Badge className="mr-auto bg-blue-700" size="lg">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </Badge>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}
      <AddToCart product={product} />
    </>
  );
}

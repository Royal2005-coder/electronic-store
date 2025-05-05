import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Brand {
  id: string;
  name: string;
  logo: string;
  url?: string;
}

interface BrandGridProps {
  brands: Brand[];
  title?: string;
}

const defaultBrands: Brand[] = [
  { id: '1', name: 'Apple', logo: '/brands/apple.png' },
  { id: '2', name: 'Samsung', logo: '/brands/samsung.png' },
  { id: '3', name: 'Sony', logo: '/brands/sony.png' },
  { id: '4', name: 'LG', logo: '/brands/lg.png' },
  { id: '5', name: 'Microsoft', logo: '/brands/microsoft.png' },
  { id: '6', name: 'Dell', logo: '/brands/dell.png' },
];

const BrandGrid: React.FC<BrandGridProps> = ({ brands = defaultBrands, title = "Popular Brands" }) => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link 
              href={brand.url || '#'} 
              key={brand.id}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center justify-center h-32"
            >
              <div className="relative w-full h-full">
                {brand.logo ? (
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'contain' }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-lg font-medium text-gray-800">{brand.name}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandGrid;

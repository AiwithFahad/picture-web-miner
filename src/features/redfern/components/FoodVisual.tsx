import type { FC } from 'react';
import { foodImages } from '../data/images';
interface FoodVisualProps { src?: string; alt: string; className?: string; aspectRatio?: '16:9' | '4:3' | '1:1'; category?: 'burgers' | 'steaks' | 'appetizers' | 'salads' | 'desserts' | 'interior' | 'bbq'; title?: string; priority?: boolean; }
export const FoodVisual: FC<FoodVisualProps> = ({src, alt, className = '', priority = false}) => {
 const image = src ? foodImages[src] ?? src : undefined;
 return <div className={`relative overflow-hidden bg-card select-none ${className}`}><img src={image} alt={alt} width={1536} height={1024} loading={priority ? 'eager' : 'lazy'} className="w-full h-full object-cover" /></div>;
};

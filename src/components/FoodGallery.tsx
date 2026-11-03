import React, { useState } from 'react';
import { Camera, Eye, X, ArrowRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
}

const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Signature Cheesy Lava Volcano Pizza',
    category: 'Pizzas',
    image: '/src/assets/images/hero_cheesy_lava_pizza_1793694158522.jpg',
    caption: 'Bubbling molten cheese center pouring over spicy chicken tikka boti & jalapeños.',
  },
  {
    id: 'g-2',
    title: 'Extreme Cheesy Volcano Loaded Fries',
    category: 'Loaded Fries',
    image: '/src/assets/images/signature_loaded_fries_1793694158297.jpg',
    caption: 'Sizzling hot skillet filled with thick-cut fries, molten cheddar, crispy fried chicken chunks & chaat masala.',
  },
  {
    id: 'g-3',
    title: 'Monster Crunchy Zinger Burger',
    category: 'Burgers',
    image: '/src/assets/images/karachi_street_burger_1793694159479.jpg',
    caption: 'Double crispy chicken fillet dripping in house chili garlic glaze and melted cheddar.',
  },
  {
    id: 'g-4',
    title: 'Karachi Tikka Paratha Roll',
    category: 'Rolls & Shawarma',
    image: '/src/assets/images/karachi_tikka_paratha_roll_1793694160483.jpg',
    caption: 'Flaky golden paratha wrapped around charcoal-charred chicken boti, red onions & green mint chutney.',
  },
  {
    id: 'g-5',
    title: 'Lively Dining & Late Night Feast',
    category: 'Ambiance & Platters',
    image: '/src/assets/images/restaurant_ambiance_gallery_1793694160568.jpg',
    caption: 'Young friends enjoying our Mega Feast Platter inside our vibrant Kharadar dining hall.',
  },
];

interface FoodGalleryProps {
  onExploreItem: () => void;
}

export const FoodGallery: React.FC<FoodGalleryProps> = ({ onExploreItem }) => {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="py-20 bg-neutral-900 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E63924] mb-2">
              <Camera className="w-4 h-4" />
              <span>Visual Feast</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Food Photography Gallery
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Every dish looks just as irresistible in person as it does through the lens. Click any photo to inspect up close.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5">
          <div
            onClick={() => setActiveImage(GALLERY_IMAGES[0])}
            className="sm:col-span-2 lg:col-span-7 aspect-[16/10] relative rounded-2xl overflow-hidden bg-neutral-950 group cursor-pointer border border-neutral-800 hover:border-[#FF8C32] transition-all"
          >
            <img
              src={GALLERY_IMAGES[0].image}
              alt={GALLERY_IMAGES[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#FF8C32] uppercase tracking-wider block">
                  {GALLERY_IMAGES[0].category}
                </span>
                <h3 className="font-heading text-xl font-bold text-white">
                  {GALLERY_IMAGES[0].title}
                </h3>
              </div>
              <span className="p-2 rounded-xl bg-black/60 text-white group-hover:bg-[#E63924] transition-colors">
                <Eye className="w-4 h-4" />
              </span>
            </div>
          </div>

          <div
            onClick={() => setActiveImage(GALLERY_IMAGES[1])}
            className="sm:col-span-1 lg:col-span-5 aspect-[16/10] sm:aspect-auto lg:h-full relative rounded-2xl overflow-hidden bg-neutral-950 group cursor-pointer border border-neutral-800 hover:border-[#FF8C32] transition-all"
          >
            <img
              src={GALLERY_IMAGES[1].image}
              alt={GALLERY_IMAGES[1].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#FF8C32] uppercase tracking-wider block">
                  {GALLERY_IMAGES[1].category}
                </span>
                <h3 className="font-heading text-lg font-bold text-white">
                  {GALLERY_IMAGES[1].title}
                </h3>
              </div>
              <span className="p-2 rounded-xl bg-black/60 text-white group-hover:bg-[#E63924] transition-colors">
                <Eye className="w-4 h-4" />
              </span>
            </div>
          </div>

          <div
            onClick={() => setActiveImage(GALLERY_IMAGES[2])}
            className="sm:col-span-1 lg:col-span-4 aspect-[4/3] relative rounded-2xl overflow-hidden bg-neutral-950 group cursor-pointer border border-neutral-800 hover:border-[#FF8C32] transition-all"
          >
            <img
              src={GALLERY_IMAGES[2].image}
              alt={GALLERY_IMAGES[2].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#FF8C32] uppercase tracking-wider block">
                  {GALLERY_IMAGES[2].category}
                </span>
                <h3 className="font-heading text-base font-bold text-white">
                  {GALLERY_IMAGES[2].title}
                </h3>
              </div>
              <span className="p-1.5 rounded-lg bg-black/60 text-white group-hover:bg-[#E63924] transition-colors">
                <Eye className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <div
            onClick={() => setActiveImage(GALLERY_IMAGES[3])}
            className="sm:col-span-1 lg:col-span-4 aspect-[4/3] relative rounded-2xl overflow-hidden bg-neutral-950 group cursor-pointer border border-neutral-800 hover:border-[#FF8C32] transition-all"
          >
            <img
              src={GALLERY_IMAGES[3].image}
              alt={GALLERY_IMAGES[3].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#FF8C32] uppercase tracking-wider block">
                  {GALLERY_IMAGES[3].category}
                </span>
                <h3 className="font-heading text-base font-bold text-white">
                  {GALLERY_IMAGES[3].title}
                </h3>
              </div>
              <span className="p-1.5 rounded-lg bg-black/60 text-white group-hover:bg-[#E63924] transition-colors">
                <Eye className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <div
            onClick={() => setActiveImage(GALLERY_IMAGES[4])}
            className="sm:col-span-2 lg:col-span-4 aspect-[4/3] relative rounded-2xl overflow-hidden bg-neutral-950 group cursor-pointer border border-neutral-800 hover:border-[#FF8C32] transition-all"
          >
            <img
              src={GALLERY_IMAGES[4].image}
              alt={GALLERY_IMAGES[4].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#FF8C32] uppercase tracking-wider block">
                  {GALLERY_IMAGES[4].category}
                </span>
                <h3 className="font-heading text-base font-bold text-white">
                  {GALLERY_IMAGES[4].title}
                </h3>
              </div>
              <span className="p-1.5 rounded-lg bg-black/60 text-white group-hover:bg-[#E63924] transition-colors">
                <Eye className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>

        {activeImage && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <div className="relative max-w-4xl w-full bg-neutral-900 border border-neutral-700 rounded-2xl overflow-hidden shadow-2xl">
              <button
                onClick={() => setActiveImage(null)}
                aria-label="Close photo preview"
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-black text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="w-full max-h-[75vh] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-5 bg-neutral-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-[#FF8C32] uppercase tracking-wider block">
                    {activeImage.category}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-white">
                    {activeImage.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    {activeImage.caption}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveImage(null);
                    onExploreItem();
                  }}
                  className="px-5 py-2.5 bg-[#E63924] hover:bg-[#c92f1c] text-white text-xs font-bold rounded-xl flex items-center gap-2 whitespace-nowrap shrink-0"
                >
                  <span>Explore on Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

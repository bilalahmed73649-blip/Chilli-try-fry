import React from 'react';
import { MapPin, Clock, Navigation, MessageCircle, ExternalLink, Bike } from 'lucide-react';
import { LOCATION_INFO } from '../data/menuData';
import { RESTAURANT_WHATSAPP } from '../utils/cart';

export const LocationAndMap: React.FC = () => {
  return (
    <section id="location" className="py-20 bg-[#171717] border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#FF8C32] mb-2">
            <MapPin className="w-4 h-4" />
            <span>Visit Us in Kharadar, Karachi</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 [text-wrap:balance]">
            Restaurant Location & Delivery Coverage
          </h2>
          <p className="text-base text-neutral-300 font-body">
            Drop by our bustling Kharadar dining room for hot-out-of-the-oven Cheesy Lava Pizzas, or order express delivery straight to your doorstep across South & Central Karachi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#E63924]/15 border border-[#E63924]/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#E63924]" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white mb-1">
                    {LOCATION_INFO.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-2">
                    {LOCATION_INFO.address}
                  </p>
                  <p className="text-xs text-[#FF8C32] font-medium">
                    Landmark: {LOCATION_INFO.landmark}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-neutral-800 flex items-center gap-3">
                <a
                  href={LOCATION_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-3 bg-[#E63924] hover:bg-[#c92f1c] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Driving Directions</span>
                </a>
                <a
                  href={`https://wa.me/${RESTAURANT_WHATSAPP}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-neutral-700"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Pin</span>
                </a>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FF8C32]/15 border border-[#FF8C32]/30 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[#FF8C32]" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-heading text-lg font-bold text-white mb-2">
                    Opening Hours & Midnight Cravings
                  </h3>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-neutral-800">
                      <span className="text-neutral-400">Monday – Thursday</span>
                      <span className="font-semibold text-white">{LOCATION_INFO.timings.weekdays}</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-neutral-400">Friday – Sunday</span>
                      <span className="font-bold text-[#FF8C32]">{LOCATION_INFO.timings.weekends}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <Bike className="w-5 h-5 text-[#FF8C32]" />
                <h4 className="font-heading text-sm font-bold text-white">
                  Express Delivery Coverage in Karachi
                </h4>
              </div>
              <p className="text-xs text-neutral-400 mb-3">
                Hot delivery dispatched in insulated thermal bags within 15–30 minutes:
              </p>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {LOCATION_INFO.deliveryAreas.map((area) => (
                  <span
                    key={area}
                    className="bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded-md border border-neutral-700/60"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

          </div>

          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 flex flex-col shadow-2xl">
            <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#E63924]" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Live Google Map · Kharadar, Karachi
                </span>
              </div>
              <a
                href="https://maps.google.com/?q=Kharadar+Karachi"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#FF8C32] hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Full Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative w-full h-[360px] sm:h-[420px] lg:h-full min-h-[380px]">
              <iframe
                title="Chilli Try Fry Kharadar Karachi Map"
                src="https://maps.google.com/maps?q=Kharadar,%20Karachi,%20Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />

              <div className="absolute top-4 left-4 bg-[#171717]/95 border border-neutral-700 backdrop-blur-md p-3.5 rounded-xl shadow-xl max-w-xs">
                <p className="text-xs font-bold text-white">Chilli Try Fry Restaurant</p>
                <p className="text-[11px] text-neutral-300">Main Kharadar Road, Karachi</p>
                <p className="text-[10px] text-[#FF8C32] mt-1 font-semibold">Dine-in · Takeaway · Midnight Delivery</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

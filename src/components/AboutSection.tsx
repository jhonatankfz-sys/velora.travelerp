import React from 'react';
import { HeartHandshake, Users2, Landmark, Compass, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="nosotros" className="py-20 bg-sand-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual Image Collage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-card-3d border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
                  alt="Paisaje norteño de Piura"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-velora-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-xs uppercase font-bold tracking-widest text-gold-light">
                    Piura, Perú
                  </span>
                  <h4 className="font-display font-bold text-lg sm:text-xl">
                    Playas, valles y desiertos del norte
                  </h4>
                </div>
              </div>

              {/* Floating Small Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-4 rounded-2xl shadow-card-3d border border-sand-200/90 max-w-[220px] hidden sm:block animate-float-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-velora-500 text-white flex items-center justify-center font-bold">
                    <Compass className="w-5 h-5 animate-spin" />
                  </div>
                  <div>
                    <span className="block font-display font-extrabold text-sm text-velora-950">
                      Rutas a Medida
                    </span>
                    <span className="block text-[11px] text-velora-600">
                      Atención cercana y directa
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mission and 3 Pillars (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-velora-100 text-velora-700 text-xs font-bold tracking-widest uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-velora-600" />
              Nuestra Identidad
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-velora-950 tracking-tight leading-tight mb-6">
              Más que un destino, una experiencia
            </h2>

            <p className="text-base sm:text-lg text-velora-900/80 leading-relaxed mb-10">
              En <strong>VELORA</strong> creamos experiencias turísticas para descubrir la belleza, la cultura y los sabores del norte del Perú. Nuestro objetivo es ayudarte a encontrar la ruta ideal para viajar, compartir momentos especiales y conocer nuevos lugares con una atención cercana y personalizada.
            </p>

            {/* The 3 Required Pillars */}
            <div className="space-y-6">
              {/* Pillar 1 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-soft-3d border border-sand-200/80 hover:border-velora-400 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-velora-50 text-velora-600 flex items-center justify-center shrink-0 border border-velora-200">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-velora-950 mb-1">
                    Atención personalizada
                  </h3>
                  <p className="text-xs sm:text-sm text-velora-900/70 leading-relaxed">
                    Escuchamos tus expectativas, el ritmo de viaje que prefieres y adaptamos cada detalle para que tu experiencia en Piura sea cómoda, fluida y sin contratiempos.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-soft-3d border border-sand-200/80 hover:border-velora-400 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-sand-200 text-velora-900 flex items-center justify-center shrink-0 border border-sand-300">
                  <Users2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-velora-950 mb-1">
                    Experiencias para diferentes viajeros
                  </h3>
                  <p className="text-xs sm:text-sm text-velora-900/70 leading-relaxed">
                    Diseñamos opciones pensadas específicamente para parejas que buscan calma, familias con niños pequeños, grupos de amigos llenos de energía o viajeros que valoran la fotografía y la exclusividad.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white shadow-soft-3d border border-sand-200/80 hover:border-velora-400 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold-dark flex items-center justify-center shrink-0 border border-gold/30">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-velora-950 mb-1">
                    Descubrimiento de la cultura y naturaleza local
                  </h3>
                  <p className="text-xs sm:text-sm text-velora-900/70 leading-relaxed">
                    Fomentamos el contacto respetuoso con los artesanos de Catacaos, los ecosistemas de manglares y humedales de Vice, y la gastronomía genuina de nuestros huariques y picanterías del norte.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

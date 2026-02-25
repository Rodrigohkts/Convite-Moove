import { Calendar, Clock, MapPin } from 'lucide-react';
import InvitationForm from './components/InvitationForm';
import { ShaderBackground } from './components/ui/ShaderBackground';

function App() {
  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center relative overflow-hidden font-sans selection:bg-moove-green/30">
      {/* Decorative Animated 3D Background */}
      <ShaderBackground />

      <div className="max-w-6xl w-full mx-auto px-6 py-12 md:py-20 lg:p-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">

        {/* Left Section - Event Details */}
        <div className="flex flex-col justify-center max-w-xl">
          <div className="mb-2">
            <span className="text-[11px] font-bold tracking-[0.2em] text-moove-green uppercase">
              CONVITE ESPECIAL & EXCLUSIVO
            </span>
          </div>

          <div className="mb-6 mt-4">
            <img
              src="/logo-flow.png"
              alt="Moove Flow"
              className="w-full max-w-[400px] h-auto object-contain"
            />
          </div>

          <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-lg">
            Um evento transformador projetado para quebrar barreiras e expandir seus horizontes. Confirme sua presença e prepare-se para uma nova perspectiva.
          </p>

          <div className="space-y-5 border-t border-white/10 pt-10">
            <div className="flex items-start space-x-4">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-white font-medium text-sm">06/03/2026</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-white font-medium text-sm">18:00H</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-white font-medium text-sm mt-0.5 leading-snug">
                  Na loja Zem Multimarcas<br />
                  <span className="text-gray-400 font-normal">R. Tesouro, 355 - Vale do Sol, Campo Verde - MT</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-[480px]">
            <InvitationForm />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;

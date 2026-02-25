import { Calendar, Clock, MapPin } from 'lucide-react';
import InvitationForm from '../components/InvitationForm';
import { ShaderBackground } from '../components/ui/ShaderBackground';

export default function Home() {
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

          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-moove-green leading-[0.9] tracking-tight mb-4 font-sans">
              Grazieli<br />
              Carneosso
            </h1>
            <p className="text-gray-200 text-lg md:text-xl font-medium leading-snug w-full">
              Personal Trainer e<br />
              Proprietária da Moove<br />
              Academia e Studio Fit em<br />
              Campo Verde - MT.
            </p>
          </div>

          <div className="space-y-5 border-t border-white/10 pt-10">
            <div className="flex items-start space-x-4">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-white font-medium text-sm">28 de Março</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-white font-medium text-sm">07:30H às 10:30H</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-white font-medium text-sm mt-0.5 leading-snug">
                  Moove 2<br />
                  <span className="text-gray-400 font-normal">Avenida Vereador César de Lima, 1068, Centro, Campo Verde - MT.</span>
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

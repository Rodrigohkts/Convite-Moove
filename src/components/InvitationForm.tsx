import { CheckCircle2 } from 'lucide-react';

export default function InvitationForm() {
    return (
        <div className="relative group z-10 rounded-[20px] p-[2px] overflow-visible animate-in fade-in zoom-in duration-700">
            {/* Animated Rotating Border Effect */}
            <div className="absolute inset-0 rounded-[20px] overflow-hidden opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] origin-center bg-[conic-gradient(from_0deg,transparent_0_240deg,rgba(178,255,0,0.8)_360deg)] animate-[spin_3s_linear_infinite]"></div>
            </div>

            <div className="bg-[#0f0f12] border border-white/5 rounded-[18px] p-8 sm:p-10 shadow-2xl relative flex flex-col items-center justify-center text-center h-[460px] w-full z-10 overflow-hidden backdrop-blur-sm">
                
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-moove-green/10 to-transparent blur-2xl opacity-60 pointer-events-none"></div>
                
                {/* Icon Container with Pulse */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-moove-green/20 rounded-full animate-ping opacity-50"></div>
                    <div className="w-20 h-20 bg-[#18181b] rounded-full flex items-center justify-center border border-moove-green/30 shadow-[0_0_40px_rgba(178,255,0,0.2)] relative z-10">
                        <CheckCircle2 className="w-9 h-9 text-moove-green" strokeWidth={2} />
                    </div>
                </div>
                
                <h3 className="font-sans font-bold tracking-tight text-3xl sm:text-4xl text-white mb-4 drop-shadow-[0_0_15px_rgba(178,255,0,0.3)]">
                    Inscrições<br/>Encerradas
                </h3>
                
                <p className="text-gray-400 font-sans font-medium mb-8 leading-relaxed max-w-sm">
                    Agradecemos seu interesse. A lista de convidados para a <strong className="text-white">Moove Flow Experience</strong> já está fechada.
                </p>
                
                <div className="w-full relative group/btn">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-moove-green/0 via-moove-green/30 to-moove-green/0 rounded-xl opacity-0 group-hover/btn:opacity-100 blur transition-all duration-500"></div>
                    <button 
                        disabled
                        className="relative w-full bg-[#18181b] text-gray-400 font-semibold tracking-wide text-[14px] uppercase rounded-xl py-4 cursor-not-allowed border border-white/5 shadow-inner"
                    >
                        Evento Esgotado
                    </button>
                </div>
            </div>
        </div>
    );
}

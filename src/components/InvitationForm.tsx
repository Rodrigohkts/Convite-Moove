export default function InvitationForm() {
    return (
        <div className="relative group z-10 rounded-[20px] p-[2px] overflow-visible">
            <div className="bg-[#0f0f12] border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl relative flex flex-col items-center justify-center text-center h-[460px] animate-in fade-in zoom-in duration-500 overflow-hidden w-full z-10">
                <div className="absolute -inset-[1px] bg-gradient-to-b from-red-500/10 to-transparent rounded-2xl blur-sm opacity-50"></div>
                
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                    <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                
                <h3 className="font-sans font-bold tracking-tight text-3xl text-white mb-2 ml-1">Inscrições Encerradas!</h3>
                <p className="text-gray-400 font-sans font-medium mb-6 mt-2">
                    Agradecemos o seu interesse, mas a lista de convidados para a <strong className="text-white">Moove Flow Experience</strong> já está fechada.
                </p>
                
                <button 
                    disabled
                    className="w-full bg-gray-800/50 text-gray-500 font-semibold tracking-wide text-[15px] rounded-xl py-3.5 mt-4 cursor-not-allowed border border-white/5"
                >
                    Lista Fechada
                </button>
            </div>
        </div>
    );
}

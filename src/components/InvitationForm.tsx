import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function InvitationForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        cpf: ''
    });

    // Simple masks for phone and CPF
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        // Format: (00) 00000-0000
        if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        }
        if (value.length > 10) {
            value = `${value.slice(0, 10)}-${value.slice(10)}`;
        }
        setFormData({ ...formData, telefone: value });
    };

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        // Format: 000.000.000-00
        if (value.length > 3) {
            value = `${value.slice(0, 3)}.${value.slice(3)}`;
        }
        if (value.length > 7) {
            value = `${value.slice(0, 7)}.${value.slice(7)}`;
        }
        if (value.length > 11) {
            value = `${value.slice(0, 11)}-${value.slice(11)}`;
        }
        setFormData({ ...formData, cpf: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // NOTE: Remove formatting (leave only numbers) if your database expects raw numbers
            const { error: sbError } = await supabase
                .from('event_registrations') // Ensure this matches your Supabase table name
                .insert([
                    {
                        nome: formData.nome,
                        telefone: formData.telefone.replace(/\D/g, ''),
                        cpf: formData.cpf.replace(/\D/g, '')
                    }
                ]);

            if (sbError) throw sbError;

            setSuccess(true);
        } catch (err: any) {
            console.error(err);
            // Mostrar o erro exato do Supabase na tela para investigar o motivo
            setError(`Erro do Banco: ${err.message || 'Ocorreu um erro desconhecido.'}`);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-moove-card border border-moove-green/30 rounded-2xl p-8 shadow-[0_0_40px_rgba(178,255,0,0.15)] z-10 relative flex flex-col items-center justify-center text-center h-[460px] animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-moove-green/20 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-[0_0_30px_rgba(178,255,0,0.4)] relative">
                    {/* Ripple effect */}
                    <div className="absolute inset-0 rounded-full border-2 border-moove-green animate-ping opacity-20"></div>
                    <svg className="w-10 h-10 text-moove-green relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="font-sans font-bold tracking-tight text-3xl text-white mb-2 ml-1 animate-in slide-in-from-bottom-4 duration-700">Presença Confirmada!</h3>
                <p className="text-gray-400 font-sans font-medium animate-in fade-in relative top-4 duration-1000 delay-300">Sua vaga para a Moove Flow Experience está garantida. Nos vemos lá.</p>
            </div>
        );
    }

    return (
        <div className="relative group z-10 rounded-[20px] p-[2px] overflow-visible">
            {/* Animated Rotating Border Effect */}
            <div className="absolute inset-0 rounded-[20px] overflow-hidden opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] origin-center bg-[conic-gradient(from_0deg,transparent_0_240deg,rgba(163,255,18,0.8)_360deg)] animate-[spin_3s_linear_infinite]"></div>
            </div>

            <div className="bg-[#0f0f12] border border-white/5 rounded-2xl p-8 sm:p-10 shadow-2xl relative transition-all duration-300 w-full z-10 overflow-hidden">
                <h2 className="font-sans font-bold tracking-tight text-3xl sm:text-4xl text-white mb-3">Confirme sua Presença</h2>
                <p className="text-sm text-gray-400 mb-8 font-light font-sans">
                    Preencha seus dados abaixo para garantir seu lugar.
                </p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2 relative">
                        <label className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                            Nome Completo
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Digite seu nome"
                            value={formData.nome}
                            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                            className="w-full bg-[#18181b] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-moove-green/50 focus:ring-1 focus:ring-moove-green/50 focus:shadow-[0_0_15px_rgba(178,255,0,0.15)] transition-all duration-300 relative z-10"
                        />
                    </div>

                    <div className="space-y-2 relative">
                        <label className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                            Telefone <span className="text-gray-500 font-normal">(WhatsApp)</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="(00) 00000-0000"
                            value={formData.telefone}
                            onChange={handlePhoneChange}
                            className="w-full bg-[#18181b] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-moove-green/50 focus:ring-1 focus:ring-moove-green/50 focus:shadow-[0_0_15px_rgba(178,255,0,0.15)] transition-all duration-300 relative z-10"
                        />
                    </div>

                    <div className="space-y-2 relative">
                        <label className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                            CPF
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="000.000.000-00"
                            value={formData.cpf}
                            onChange={handleCpfChange}
                            className="w-full bg-[#18181b] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-moove-green/50 focus:ring-1 focus:ring-moove-green/50 focus:shadow-[0_0_15px_rgba(178,255,0,0.15)] transition-all duration-300 relative z-10"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-moove-green hover:bg-[#b5ff33] hover:shadow-[0_0_20px_rgba(178,255,0,0.5)] text-black font-semibold tracking-wide text-[15px] rounded-xl py-3.5 mt-4 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 group"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <span>Confirmar Presença</span>
                                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-[11px] text-gray-500 text-center mt-6 tracking-wide px-4">
                    Seus dados estão seguros e serão utilizados apenas para a organização do evento.
                </p>
            </div>
        </div>
    );
}

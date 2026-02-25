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
            setError('Ocorreu um erro ao confirmar presença. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-moove-card border border-white/5 rounded-2xl p-8 shadow-2xl z-10 relative flex flex-col items-center justify-center text-center h-[460px]">
                <div className="w-16 h-16 bg-moove-green/10 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-moove-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="font-serif text-3xl text-white mb-2">Presença Confirmada!</h3>
                <p className="text-gray-400">Sua vaga para a Moove Flow Experience está garantida. Nos vemos lá.</p>
            </div>
        );
    }

    return (
        <div className="bg-[#0f0f12] border border-white/5 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-moove-green/5 z-10 relative transition-all duration-300 hover:shadow-moove-green/10">
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-3">Confirme sua Presença</h2>
            <p className="text-sm text-gray-400 mb-8 font-light">
                Preencha seus dados abaixo para garantir seu lugar.
            </p>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded mb-6 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                        Nome Completo
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="Digite seu nome"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className="w-full bg-[#18181b] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-moove-green transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                        Telefone <span className="text-gray-500 font-normal">(WhatsApp)</span>
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="(00) 00000-0000"
                        value={formData.telefone}
                        onChange={handlePhoneChange}
                        className="w-full bg-[#18181b] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-moove-green transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
                        CPF
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={handleCpfChange}
                        className="w-full bg-[#18181b] border border-white/5 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-moove-green transition-all"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-white hover:bg-gray-100 text-black font-medium text-15px rounded-xl py-3.5 mt-4 transition-colors flex items-center justify-center space-x-2 disabled:opacity-70"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            <span>Confirmar Presença</span>
                            <ArrowRight className="w-4 h-4 ml-1" />
                        </>
                    )}
                </button>
            </form>

            <p className="text-[11px] text-gray-500 text-center mt-6 tracking-wide px-4">
                Seus dados estão seguros e serão utilizados apenas para a organização do evento.
            </p>
        </div>
    );
}

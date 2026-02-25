import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ShaderBackground } from '../components/ui/ShaderBackground';
import { Users, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Attendee {
    id: string;
    nome: string;
    telefone: string;
    created_at: string;
}

export default function Confirmados() {
    const [attendees, setAttendees] = useState<Attendee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAttendees = async () => {
            try {
                const { data, error: sbError } = await supabase
                    .from('event_registrations')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (sbError) throw sbError;

                setAttendees(data || []);
            } catch (err: any) {
                console.error(err);
                setError('Erro ao carregar a lista de confirmados.');
            } finally {
                setLoading(false);
            }
        };

        fetchAttendees();
    }, []);

    // Format phone to mask partly
    const formatPhone = (phone: string) => {
        if (!phone || phone.length < 10) return phone;
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return `(${cleaned.slice(0, 2)}) *****-${cleaned.slice(7)}`;
        }
        return `(${cleaned.slice(0, 2)}) ****-${cleaned.slice(6)}`;
    };

    return (
        <div className="min-h-screen bg-[#111111] relative overflow-hidden font-sans selection:bg-moove-green/30 flex flex-col items-center">
            {/* Decorative Animated 3D Background */}
            <ShaderBackground />

            <div className="max-w-4xl w-full mx-auto px-6 py-12 md:py-20 relative z-10 flex flex-col items-center">

                {/* Header */}
                <div className="w-full flex items-center justify-between mb-12 border-b border-white/10 pb-6">
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center text-sm font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar
                    </Link>
                    <img
                        src="/logo-flow.png"
                        alt="Moove Flow"
                        className="h-8 md:h-10 object-contain"
                    />
                </div>

                <div className="bg-[#0f0f12] border border-white/5 rounded-2xl w-full shadow-2xl p-6 sm:p-10 relative">
                    <div className="absolute -inset-[1px] bg-gradient-to-b from-moove-green/10 to-transparent rounded-2xl blur-sm opacity-50"></div>

                    <div className="relative z-10">
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-12 h-12 bg-moove-green/10 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-moove-green" />
                            </div>
                            <div>
                                <h1 className="font-serif text-3xl text-white">Listagem de Convidados</h1>
                                <p className="text-gray-400 text-sm mt-1">
                                    {attendees.length} pessoas confirmaram presença
                                </p>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded mb-6 text-sm">
                                {error}
                            </div>
                        )}

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                <Loader2 className="w-8 h-8 text-moove-green animate-spin" />
                                <p className="text-gray-400 text-sm">Carregando convidados...</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {attendees.length === 0 ? (
                                    <div className="text-center py-16 border border-white/5 rounded-xl bg-white/5 border-dashed">
                                        <p className="text-gray-400">Nenhuma pessoa confirmada ainda.</p>
                                    </div>
                                ) : (
                                    attendees.map((attendee, index) => (
                                        <div
                                            key={attendee.id}
                                            className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-[#18181b]/50 hover:bg-[#18181b] transition-colors"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-full bg-moove-green/5 flex items-center justify-center text-moove-green font-bold text-sm">
                                                    {attendee.nome.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{attendee.nome}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        Registrado em {new Date(attendee.created_at).toLocaleDateString('pt-BR')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs font-mono text-gray-400 bg-black/50 px-3 py-1.5 rounded-lg border border-white/5">
                                                    {formatPhone(attendee.telefone)}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

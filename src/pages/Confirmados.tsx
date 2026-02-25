import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ShaderBackground } from '../components/ui/ShaderBackground';
import { Users, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Attendee {
    id: string;
    nome: string;
    telefone: string;
    cpf: string;
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

    // Format phone
    const formatPhone = (phone: string) => {
        if (!phone || phone.length < 10) return phone;
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
        }
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    };

    // Format CPF
    const formatCpf = (cpf: string) => {
        if (!cpf) return cpf;
        const cleaned = cpf.replace(/\D/g, '');
        if (cleaned.length === 11) {
            return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
        }
        return cpf;
    };

    return (
        <div className="min-h-screen bg-[#111111] relative overflow-hidden font-sans selection:bg-moove-green/30 flex flex-col items-center">
            {/* Decorative Animated 3D Background */}
            <ShaderBackground />

            <div className="max-w-4xl w-full mx-auto px-6 py-12 md:py-20 relative z-10 flex flex-col items-center">

                {/* Header */}
                <div className="w-full flex items-center justify-between mb-12 border-b border-white/10 pb-6">
                    <Link to="/" className="text-gray-400 hover:text-moove-green transition-colors flex items-center text-sm font-medium">
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
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 mb-10">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-moove-green/10 rounded-xl flex items-center justify-center border border-moove-green/20">
                                    <Users className="w-6 h-6 text-moove-green" />
                                </div>
                                <div>
                                    <h1 className="font-sans font-bold tracking-tight text-3xl text-white">Listagem de Convidados</h1>
                                    <p className="text-moove-green text-sm mt-1 font-medium">
                                        {attendees.length} pessoas confirmadas
                                    </p>
                                </div>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {attendees.length === 0 ? (
                                    <div className="text-center py-16 border border-white/5 rounded-xl bg-white/5 border-dashed col-span-full">
                                        <p className="text-gray-400">Nenhuma pessoa confirmada ainda.</p>
                                    </div>
                                ) : (
                                    attendees.map((attendee, index) => (
                                        <div
                                            key={attendee.id}
                                            className="relative group rounded-[16px] p-[2px] overflow-visible"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            {/* Rotating Animated Border for Each Card */}
                                            <div className="absolute inset-0 rounded-[16px] overflow-hidden opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] origin-center bg-[conic-gradient(from_0deg,transparent_0_240deg,rgba(163,255,18,0.7)_360deg)] animate-[spin_4s_linear_infinite]"></div>
                                            </div>

                                            <div className="relative z-10 bg-[#161618] rounded-2xl p-5 border border-white/5 shadow-xl transition-all h-full flex flex-col justify-between">
                                                <div className="flex items-start space-x-4 mb-4">
                                                    <div className="w-12 h-12 rounded-full bg-moove-green/10 flex items-center justify-center text-moove-green font-bold text-lg border border-moove-green/20">
                                                        {attendee.nome.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="pt-1">
                                                        <p className="text-white font-semibold text-lg max-w-[200px] truncate" title={attendee.nome}>{attendee.nome}</p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {new Date(attendee.created_at).toLocaleDateString('pt-BR')} às {new Date(attendee.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="space-y-2 mt-4 pt-4 border-t border-white/5">
                                                    <div className="flex justify-between items-center text-sm">
                                                        <span className="text-gray-500">Telefone:</span>
                                                        <span className="text-gray-200 font-mono tracking-wide">{formatPhone(attendee.telefone)}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center text-sm">
                                                        <span className="text-gray-500">CPF:</span>
                                                        <span className="text-gray-200 font-mono tracking-wide">{formatCpf(attendee.cpf)}</span>
                                                    </div>
                                                </div>
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

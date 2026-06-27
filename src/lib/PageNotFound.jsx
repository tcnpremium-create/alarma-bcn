import { useLocation } from 'react-router-dom';
import { base44 } from '@/api/api';
import { useQuery } from '@tanstack/react-query';


export default function PageNotFound({}) {
    const location = useLocation();
    const pageName = location.pathname.substring(1);

    const { data: authData, isFetched } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const user = await base44.auth.me();
                return { user, isAuthenticated: true };
            } catch (error) {
                return { user: null, isAuthenticated: false };
            }
        }
    });
    
    return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "linear-gradient(135deg, #0A1628 0%, #1a2f4a 100%)" }}>
            <div className="max-w-lg w-full text-center space-y-8">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
                        <svg className="w-12 h-12 text-[#E63946]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>

                {/* Message */}
                <div className="space-y-3">
                    <h1 className="text-4xl font-bold text-white">EN MANTENIMIENTO</h1>
                    <p className="text-white/70 text-lg leading-relaxed">
                        Estamos trabajando para mejorar nuestro sitio web.<br />
                        Volveremos muy pronto.
                    </p>
                </div>

                {/* Contact */}
                <div className="bg-white/10 border border-white/20 rounded-2xl p-6 space-y-4">
                    <p className="text-white/80 text-sm">¿Necesitas ayuda urgente? Contáctanos directamente:</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href="tel:+34638109947"
                            className="flex items-center justify-center gap-2 bg-[#E63946] hover:bg-[#d32f3c] text-white rounded-full px-6 py-3 font-semibold transition-colors"
                        >
                            📞 638 10 99 47
                        </a>
                        <a
                            href="https://wa.me/34638109947"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full px-6 py-3 font-semibold transition-colors"
                        >
                            💬 WhatsApp
                        </a>
                    </div>
                </div>

                {/* Admin Note */}
                {isFetched && authData?.isAuthenticated && authData?.user?.role === 'admin' && (
                    <div className="p-4 bg-orange-500/20 rounded-lg border border-orange-400/30">
                        <p className="text-sm text-orange-300">
                            <strong>Admin:</strong> La página <em>"{pageName}"</em> no existe. Pídele a la IA que la implemente.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, MessageSquare, Download, User, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { base44 } from '@/api/api';
import Navbar from '@/components/landing/Navbar';
import FooterSection from '@/components/landing/FooterSection';
import SEOHead from '@/components/seo/SEOHead';
import PresupuestosTab from '@/components/clientes/PresupuestosTab';
import CitasTab from '@/components/clientes/CitasTab';
import DocumentacionTab from '@/components/clientes/DocumentacionTab';
import ContactoTab from '@/components/clientes/ContactoTab';

export default function AreaClientes() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('presupuestos');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const isAuth = await base44.auth.isAuthenticated();
      if (!isAuth) {
        base44.auth.redirectToLogin(window.location.href);
        return;
      }
      const userData = await base44.auth.me();
      setUser(userData);
    } catch (error) {
      console.error('Error auth:', error);
      base44.auth.redirectToLogin(window.location.href);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    base44.auth.logout('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E63946] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title="Área de Clientes | Premium Tech Security"
        description="Accede a tu historial de presupuestos, citas agendadas y documentación técnica."
        noindex={true}
      />
      {/* Solo mostrar navbar en escritorio */}
      <div className="hidden lg:block">
        <Navbar />
      </div>
      
      {/* Header móvil minimalista */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 px-4 py-3">
        <div className="flex items-center justify-between">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6995a701232755a2d5e24b39/b61d56d39_UNETEALIMPERIO.png"
            alt="Logo"
            className="h-8 object-contain"
          />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-[#E63946] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[#0A1628] truncate">{user?.full_name}</p>
                  <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                </div>
              </div>
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                size="sm"
                className="w-full gap-2"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </Button>
            </div>
            <div className="p-2">
              {[
                { id: 'presupuestos', label: 'Presupuestos', icon: FileText },
                { id: 'citas', label: 'Citas', icon: Calendar },
                { id: 'documentacion', label: 'Documentación', icon: Download },
                { id: 'contacto', label: 'Contacto', icon: MessageSquare }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#E63946] text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
      
      <div className="min-h-screen bg-gray-50 pt-16 lg:pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Header desktop */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-sm p-8 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#E63946] rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#0A1628]">Bienvenido, {user?.full_name}</h1>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline" className="gap-2">
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </Button>
            </div>
          </div>

          {/* Tabs móvil horizontal */}
          <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2 px-4 -mx-4">
            {[
              { id: 'presupuestos', label: 'Presupuestos', icon: FileText },
              { id: 'citas', label: 'Citas', icon: Calendar },
              { id: 'documentacion', label: 'Docs', icon: Download },
              { id: 'contacto', label: 'Contacto', icon: MessageSquare }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap flex-shrink-0 min-w-[90px] ${
                    activeTab === tab.id
                      ? 'bg-[#E63946] text-white shadow-lg'
                      : 'bg-white text-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tabs desktop */}
          <div className="hidden lg:flex gap-2 mb-8">
            {[
              { id: 'presupuestos', label: 'Mis Presupuestos', icon: FileText },
              { id: 'citas', label: 'Mis Citas', icon: Calendar },
              { id: 'documentacion', label: 'Documentación', icon: Download },
              { id: 'contacto', label: 'Contacto', icon: MessageSquare }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-[#E63946] text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm p-4 lg:p-8"
          >
            <h2 className="text-xl lg:text-2xl font-bold text-[#0A1628] mb-4 lg:mb-6">
              {activeTab === 'presupuestos' && 'Historial de Presupuestos'}
              {activeTab === 'citas' && 'Citas Agendadas'}
              {activeTab === 'documentacion' && 'Documentación Técnica'}
              {activeTab === 'contacto' && 'Contacto Directo'}
            </h2>

            {activeTab === 'presupuestos' && <PresupuestosTab userEmail={user?.email} />}
            {activeTab === 'citas' && <CitasTab userEmail={user?.email} />}
            {activeTab === 'documentacion' && <DocumentacionTab />}
            {activeTab === 'contacto' && <ContactoTab user={user} />}
          </motion.div>
        </div>
      </div>

      <FooterSection />
    </>
  );
}
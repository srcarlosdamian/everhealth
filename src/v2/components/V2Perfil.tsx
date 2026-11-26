import React, { useState } from 'react';
import { User, Shield, CreditCard, Check, Download } from 'lucide-react';

interface V2PerfilProps {
  userName: string;
  userEmail: string;
}

type PerfilTab = 'datos' | 'seguridad' | 'suscripcion';

export const V2Perfil: React.FC<V2PerfilProps> = ({ userName, userEmail }) => {
  const [activeTab, setActiveTab] = useState<PerfilTab>('datos');
  const [toast, setToast] = useState<string | null>(null);

  const [nombre, setNombre] = useState(userName.split(' ')[0] || 'Alejandro');
  const [apellidos, setApellidos] = useState('Navarro García');
  const [fechaNac, setFechaNac] = useState('1988-05-14');
  const [sexo, setSexo] = useState('Masculino');
  const [telefono, setTelefono] = useState('+34 620 184 932');
  const [poliza, setPoliza] = useState('486205');
  const [ciudad, setCiudad] = useState('Madrid');
  const [pais, setPais] = useState('España');
  const [zonaHoraria, setZonaHoraria] = useState('Europe/Madrid');

  const [emailActual, setEmailActual] = useState(userEmail);
  const [nuevoEmail, setNuevoEmail] = useState('');
  const [nuevaClave, setNuevaClave] = useState('');

  const notify = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-8 sm:py-10 flex flex-col gap-7">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0b1c34] text-white px-5 py-3.5 rounded-[14px] shadow-xl text-[14px] font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-1">
        <span className="text-[12px] font-bold uppercase tracking-wider text-[#d50475]">
          Configuración de usuario
        </span>
        <h1 className="text-[32px] sm:text-[38px] font-extrabold text-[#0b1c34] tracking-tight">
          Mi perfil
        </h1>
        <p className="text-[14px] sm:text-[15px] text-[#475569]">
          Gestiona tu información personal, credenciales de acceso y detalles de tu plan de salud.
        </p>
      </div>

      {/* Tabs Pill Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-[16px] border border-[#e2e8f0] w-fit">
        {(
          [
            { id: 'datos', label: 'Datos personales', icon: User },
            { id: 'seguridad', label: 'Seguridad', icon: Shield },
            { id: 'suscripcion', label: 'Suscripción y facturación', icon: CreditCard },
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`h-[42px] px-4 rounded-[12px] text-[13px] font-bold flex items-center gap-2 transition-all cursor-pointer ${
                active
                  ? 'bg-[#0b1c34] text-white shadow-xs'
                  : 'text-[#475569] hover:text-[#0b1c34] hover:bg-[#f8f8f7]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DATOS PERSONALES */}
      {activeTab === 'datos' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            notify('Datos personales guardados correctamente.');
          }}
          className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#e2e8f0] flex flex-col gap-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#f1f5f9]">
            <div>
              <h2 className="text-[20px] font-extrabold text-[#0b1c34]">Información personal</h2>
              <p className="text-[13px] text-[#64748b]">
                Estos datos aparecen en tus recetas e informes médicos oficiales.
              </p>
            </div>
            <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-[#fdf2f8] text-[#d50475] text-[12px] font-bold">
              Póliza #{poliza}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="h-[48px] px-4 rounded-[12px] bg-[#f8f8f7] border border-[#e2e8f0] focus:bg-white focus:border-[#d50475] text-[14px] text-[#0b1c34] outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Apellidos</label>
              <input
                type="text"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                className="h-[48px] px-4 rounded-[12px] bg-[#f8f8f7] border border-[#e2e8f0] focus:bg-white focus:border-[#d50475] text-[14px] text-[#0b1c34] outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Fecha de nacimiento</label>
              <input
                type="date"
                value={fechaNac}
                onChange={(e) => setFechaNac(e.target.value)}
                className="h-[48px] px-4 rounded-[12px] bg-[#f8f8f7] border border-[#e2e8f0] focus:bg-white focus:border-[#d50475] text-[14px] text-[#0b1c34] outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Sexo</label>
              <select
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                className="h-[48px] px-4 rounded-[12px] bg-[#f8f8f7] border border-[#e2e8f0] focus:bg-white focus:border-[#d50475] text-[14px] text-[#0b1c34] outline-none"
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Teléfono</label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="h-[48px] px-4 rounded-[12px] bg-[#f8f8f7] border border-[#e2e8f0] focus:bg-white focus:border-[#d50475] text-[14px] text-[#0b1c34] outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Número de póliza</label>
              <input
                type="text"
                value={poliza}
                onChange={(e) => setPoliza(e.target.value)}
                className="h-[48px] px-4 rounded-[12px] bg-[#f8f8f7] border border-[#e2e8f0] focus:bg-white focus:border-[#d50475] text-[14px] text-[#0b1c34] outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">País</label>
              <select
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                className="h-[48px] px-4 rounded-[12px] bg-[#f8f8f7] border border-[#e2e8f0] focus:bg-white focus:border-[#d50475] text-[14px] text-[#0b1c34] outline-none"
              >
                <option value="España">España</option>
                <option value="México">México</option>
                <option value="Colombia">Colombia</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Ciudad</label>
              <input
                type="text"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                className="h-[48px] px-4 rounded-[12px] bg-[#f8f8f7] border border-[#e2e8f0] focus:bg-white focus:border-[#d50475] text-[14px] text-[#0b1c34] outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Zona horaria</label>
              <select
                value={zonaHoraria}
                onChange={(e) => setZonaHoraria(e.target.value)}
                className="h-[48px] px-4 rounded-[12px] bg-[#f8f8f7] border border-[#e2e8f0] focus:bg-white focus:border-[#d50475] text-[14px] text-[#0b1c34] outline-none"
              >
                <option value="Europe/Madrid">Europe / Madrid</option>
                <option value="America/Mexico_City">America / México</option>
                <option value="America/Bogota">America / Bogotá</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-[#f1f5f9] flex justify-end">
            <button
              type="submit"
              className="h-[48px] px-7 rounded-[12px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] font-bold transition-colors cursor-pointer shadow-sm"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: SEGURIDAD */}
      {activeTab === 'seguridad' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (nuevoEmail.trim()) setEmailActual(nuevoEmail.trim());
              setNuevoEmail('');
              notify('Correo de acceso actualizado.');
            }}
            className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#e2e8f0] flex flex-col gap-5"
          >
            <h2 className="text-[20px] font-extrabold text-[#0b1c34]">Correo electrónico</h2>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Correo actual</label>
              <input
                type="email"
                value={emailActual}
                readOnly
                className="h-[48px] px-4 rounded-[12px] bg-[#f1f5f9] border border-[#e2e8f0] text-[14px] text-[#64748b] outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Nuevo correo</label>
              <input
                type="email"
                value={nuevoEmail}
                onChange={(e) => setNuevoEmail(e.target.value)}
                placeholder="nuevo@correo.com"
                className="h-[48px] px-4 rounded-[12px] bg-[#f8f8f7] border border-[#e2e8f0] focus:bg-white focus:border-[#0b1c34] text-[14px] text-[#0b1c34] outline-none"
              />
            </div>
            <button
              type="submit"
              className="h-[48px] px-6 rounded-[12px] bg-[#0b1c34] hover:bg-[#142c4f] text-white text-[14px] font-bold transition-colors cursor-pointer w-fit mt-auto"
            >
              Actualizar correo
            </button>
          </form>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setNuevaClave('');
              notify('Contraseña actualizada correctamente.');
            }}
            className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#e2e8f0] flex flex-col gap-5"
          >
            <h2 className="text-[20px] font-extrabold text-[#0b1c34]">Contraseña</h2>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Nueva contraseña</label>
              <input
                type="password"
                value={nuevaClave}
                onChange={(e) => setNuevaClave(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                className="h-[48px] px-4 rounded-[12px] bg-[#f8f8f7] border border-[#e2e8f0] focus:bg-white focus:border-[#0b1c34] text-[14px] text-[#0b1c34] outline-none"
              />
            </div>
            <button
              type="submit"
              className="h-[48px] px-6 rounded-[12px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] font-bold transition-colors cursor-pointer w-fit mt-auto"
            >
              Cambiar contraseña
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: SUSCRIPCIÓN Y FACTURACIÓN */}
      {activeTab === 'suscripcion' && (
        <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#e2e8f0] flex flex-col gap-6">
          <div className="v2-gradient-soft rounded-[18px] p-6 border border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-[#0b1c34] text-white text-[11px] font-bold uppercase tracking-wider">
                Plan Activo
              </span>
              <h2 className="text-[22px] font-extrabold text-[#0b1c34] mt-2">
                Ever Health Familiar · Cobertura Total
              </h2>
              <p className="text-[14px] text-[#475569] mt-0.5">
                Videoconsultas y chat médico ilimitados · Próxima renovación: 01/12/2026
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[28px] font-extrabold text-[#0b1c34]">19,90 €</span>
              <span className="text-[13px] text-[#64748b] block">/ mes</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-[16px] font-extrabold text-[#0b1c34]">Últimas facturas</h3>
            <div className="divide-y divide-[#f1f5f9] border border-[#e2e8f0] rounded-[16px] overflow-hidden">
              {[
                { id: 'FAC-2026-10', date: '01/10/2026', amount: '19,90 €' },
                { id: 'FAC-2026-09', date: '01/09/2026', amount: '19,90 €' },
              ].map((f) => (
                <div
                  key={f.id}
                  className="px-5 py-4 flex items-center justify-between gap-4 bg-white hover:bg-[#f8f8f7]"
                >
                  <div>
                    <div className="text-[14px] font-bold text-[#0b1c34]">{f.id}</div>
                    <div className="text-[12px] text-[#64748b]">{f.date} · Pagada</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[14px] font-bold text-[#0b1c34]">{f.amount}</span>
                    <button
                      type="button"
                      onClick={() => notify(`Descargando factura ${f.id}...`)}
                      className="h-[38px] px-3.5 rounded-[10px] border border-[#cbd5e1] hover:border-[#0b1c34] text-[12px] font-bold text-[#0b1c34] inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

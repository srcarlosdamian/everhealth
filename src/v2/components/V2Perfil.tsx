import React, { useState } from 'react';
import { Check, Download } from 'lucide-react';

interface V2PerfilProps {
  userName?: string;
  userEmail?: string;
}

export const V2Perfil: React.FC<V2PerfilProps> = ({
  userName = 'Alejandro Navarro',
  userEmail = 'alejandro.navarro@everhealth.es',
}) => {
  const [activeTab, setActiveTab] = useState<'datos-personales' | 'seguridad' | 'suscripcion-facturacion'>(
    'datos-personales'
  );
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const [nombre, setNombre] = useState(userName.split(' ')[0] || 'Alejandro');
  const [apellidos, setApellidos] = useState('Navarro García');
  const [dia, setDia] = useState('14');
  const [mes, setMes] = useState('Mayo');
  const [ano, setAno] = useState('1988');
  const [sexo, setSexo] = useState('Masculino');
  const [telefono, setTelefono] = useState('620184932');
  const [poliza, setPoliza] = useState('486205');
  const [pais, setPais] = useState('España');
  const [ciudad, setCiudad] = useState('Madrid');
  const [cp, setCp] = useState('28001');
  const [zonaHoraria, setZonaHoraria] = useState('Europe/Madrid');

  const [currentEmail, setCurrentEmail] = useState(userEmail);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const showSuccess = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3200);
  };

  const inputClass =
    'w-full h-[48px] px-4 rounded-[10px] bg-[#f8f8f7] border-0 text-[14px] text-[#0b1c34] placeholder:text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#d50475]/25 focus:bg-white transition-all';

  return (
    <div className="w-full max-w-[900px] mx-auto flex flex-col gap-6">
      {notificationMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0b1c34] text-white px-5 py-3.5 rounded-[12px] shadow-xl text-[14px] font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-[32px] sm:text-[36px] font-extrabold text-[#0b1c34] tracking-tight">
          Mi perfil
        </h1>
        <p className="text-[14px] text-[#475569]">
          Gestiona tus datos personales, seguridad de acceso y suscripción.
        </p>
      </div>

      {/* Tabs (misma arquitectura V1) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#e2e8f0] pb-2">
        {[
          { id: 'datos-personales', label: 'Datos personales' },
          { id: 'seguridad', label: 'Seguridad' },
          { id: 'suscripcion-facturacion', label: 'Suscripción y facturación' },
        ].map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`h-[42px] px-4 rounded-[10px] text-[14px] font-bold transition-colors cursor-pointer ${
                active
                  ? 'bg-[#0b1c34] text-white'
                  : 'text-[#475569] hover:text-[#0b1c34] hover:bg-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: DATOS PERSONALES */}
      {activeTab === 'datos-personales' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            showSuccess('Datos personales actualizados correctamente.');
          }}
          className="bg-white rounded-[14px] p-6 sm:p-8 flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Nombre</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className={inputClass} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Apellidos</label>
              <input type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} className={inputClass} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Fecha de nacimiento</label>
              <div className="grid grid-cols-3 gap-2">
                <input type="text" value={dia} onChange={(e) => setDia(e.target.value)} placeholder="Día" className={inputClass} />
                <input type="text" value={mes} onChange={(e) => setMes(e.target.value)} placeholder="Mes" className={inputClass} />
                <input type="text" value={ano} onChange={(e) => setAno(e.target.value)} placeholder="Año" className={inputClass} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Sexo</label>
              <select value={sexo} onChange={(e) => setSexo(e.target.value)} className={inputClass}>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Teléfono</label>
              <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} className={inputClass} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Número de póliza</label>
              <input type="text" value={poliza} onChange={(e) => setPoliza(e.target.value)} className={inputClass} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">País</label>
              <select value={pais} onChange={(e) => setPais(e.target.value)} className={inputClass}>
                <option value="España">España</option>
                <option value="México">México</option>
                <option value="Colombia">Colombia</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-bold text-[#0b1c34]">Ciudad y Código Postal</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} className={inputClass} />
                <input type="text" value={cp} onChange={(e) => setCp(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-[13px] font-bold text-[#0b1c34]">Zona horaria</label>
              <select value={zonaHoraria} onChange={(e) => setZonaHoraria(e.target.value)} className={inputClass}>
                <option value="Europe/Madrid">Europe / Madrid</option>
                <option value="America/Mexico_City">America / México</option>
                <option value="America/Bogota">America / Bogotá</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="h-[48px] px-7 rounded-[10px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold uppercase tracking-wide transition-colors cursor-pointer"
            >
              GUARDAR CAMBIOS
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: SEGURIDAD */}
      {activeTab === 'seguridad' && (
        <div className="flex flex-col gap-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newEmail.trim()) setCurrentEmail(newEmail.trim());
              setNewEmail('');
              showSuccess('Correo actualizado correctamente.');
            }}
            className="bg-white rounded-[14px] p-6 sm:p-8 flex flex-col gap-5"
          >
            <h2 className="text-[18px] font-extrabold text-[#0b1c34]">Cambiar correo electrónico</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-[#0b1c34]">Correo actual</label>
                <input type="email" value={currentEmail} readOnly className={`${inputClass} text-[#64748b]`} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-bold text-[#0b1c34]">Nuevo correo</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="nuevo@correo.com"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="h-[46px] px-6 rounded-[10px] bg-[#0b1c34] hover:bg-[#142c4f] text-white text-[13px] font-bold uppercase cursor-pointer"
              >
                ACTUALIZAR CORREO
              </button>
            </div>
          </form>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setNewPassword('');
              showSuccess('Contraseña actualizada correctamente.');
            }}
            className="bg-white rounded-[14px] p-6 sm:p-8 flex flex-col gap-5"
          >
            <h2 className="text-[18px] font-extrabold text-[#0b1c34]">Cambiar contraseña</h2>
            <div className="flex flex-col gap-1.5 max-w-[400px]">
              <label className="text-[13px] font-bold text-[#0b1c34]">Nueva contraseña</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                className={inputClass}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="h-[46px] px-6 rounded-[10px] bg-[#d50475] hover:bg-[#b80364] text-white text-[13px] font-bold uppercase cursor-pointer"
              >
                ACTUALIZAR CONTRASEÑA
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: SUSCRIPCIÓN Y FACTURACIÓN */}
      {activeTab === 'suscripcion-facturacion' && (
        <div className="bg-white rounded-[14px] p-6 sm:p-8 flex flex-col gap-6">
          <div className="v2-gradient-soft rounded-[12px] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-[#0b1c34] text-white text-[11px] font-bold uppercase">
                Plan Activo
              </span>
              <h2 className="text-[20px] font-extrabold text-[#0b1c34] mt-2">
                Ever Health Familiar · Cobertura Total
              </h2>
              <p className="text-[13px] text-[#475569]">
                Videoconsultas y chat médico ilimitados · Próxima renovación: 01/12/2026
              </p>
            </div>
            <span className="text-[24px] font-extrabold text-[#0b1c34]">19,90 € / mes</span>
          </div>

          <div className="flex flex-col divide-y divide-[#f1f5f9]">
            {[
              { id: 'FAC-2026-10', date: '01/10/2026', amount: '19,90 €' },
              { id: 'FAC-2026-09', date: '01/09/2026', amount: '19,90 €' },
            ].map((f) => (
              <div key={f.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[14px] font-bold text-[#0b1c34]">{f.id}</div>
                  <div className="text-[12px] text-[#64748b]">{f.date} · Pagada</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[14px] font-bold text-[#0b1c34]">{f.amount}</span>
                  <button
                    type="button"
                    onClick={() => showSuccess(`Descargando factura ${f.id}...`)}
                    className="h-[40px] px-4 rounded-[8px] bg-[#f8f8f7] hover:bg-[#0b1c34] hover:text-white text-[#0b1c34] text-[12px] font-bold uppercase flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

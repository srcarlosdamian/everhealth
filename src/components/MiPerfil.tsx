import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Camera,
  ChevronDown,
  Check,
  AlertCircle,
} from 'lucide-react';

interface MiPerfilProps {
  userName?: string;
  userEmail?: string;
}

export const MiPerfil: React.FC<MiPerfilProps> = ({
  userName = 'Carlos Damian descarlosdamian',
  userEmail = 'contact@carlosdamian.com',
}) => {
  // Subview inside MiPerfil:
  // 'overview' -> Vista principal de Cuenta (Suscripción y facturación + Perfil Básico)
  // 'change-email' -> Formulario Cambiar correo de la cuenta
  // 'change-password' -> Formulario Cambiar contraseña
  // 'edit-profile' -> Formulario Editar datos de perfil
  const [subView, setSubView] = useState<'overview' | 'change-email' | 'change-password' | 'edit-profile'>('overview');

  // Change Email Form
  const [currentEmail, setCurrentEmail] = useState(userEmail);
  const [newEmail, setNewEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');

  // Change Password Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // Edit Profile Form
  const [profileNombre, setProfileNombre] = useState('Carlos Damian');
  const [profileApellidos, setProfileApellidos] = useState('descarlosdamian');
  const [profileDia, setProfileDia] = useState('28');
  const [profileMes, setProfileMes] = useState('Mayo');
  const [profileAno, setProfileAno] = useState('1991');
  const [profileSexo, setProfileSexo] = useState('Masculino');
  const [profilePais, setProfilePais] = useState('México');
  const [profileCiudad, setProfileCiudad] = useState('Veracruz');
  const [profileCodigoPostal, setProfileCodigoPostal] = useState('91700');
  const [profileZonaHoraria, setProfileZonaHoraria] = useState('America/Mexico_City');
  const [profileTelefono1, setProfileTelefono1] = useState('2281381278');
  const [profileTelefono2, setProfileTelefono2] = useState('');
  const [profilePoliza, setProfilePoliza] = useState('486205');

  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-6 animate-fadeIn font-[family-name:Helvetica]">
      
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-[28px] sm:text-[32px] leading-[38px] font-bold text-black tracking-tight">
          Cuenta
        </h1>
        <p className="text-[14px] leading-[22px] text-[#475569]">
          Revisa y gestiona la configuración de tu cuenta y datos de contacto personales.
        </p>
      </div>

      {notificationMsg && (
        <div className="w-full bg-[#f0fdf4] border border-[#bbf7d0] rounded-[8px] p-3 text-[#166534] text-[14px] font-medium flex items-center gap-2">
          <Check className="w-4 h-4 text-[#166534]" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* ================= SUBVIEW 1: OVERVIEW PRINCIPAL (media_1793946602573_aa18c16c.png) ================= */}
      {subView === 'overview' && (
        <div className="flex flex-col gap-6 animate-fadeIn">
          {/* Card 1: Suscripción y facturación */}
          <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-xs">
            <div className="bg-[#f8fafc] px-6 py-3 border-b border-[#e2e8f0]">
              <span className="text-[13px] font-bold uppercase tracking-wider text-[#475569]">
                Suscripción y facturación
              </span>
            </div>

            <div className="p-6 flex flex-col divide-y divide-[#f1f5f9]">
              <div className="pb-4">
                <span className="text-[14px] font-medium text-black">{currentEmail}</span>
              </div>

              {/* Action: Cambiar correo de la cuenta */}
              <button
                type="button"
                onClick={() => setSubView('change-email')}
                className="py-4 flex items-center justify-between text-left hover:text-[#d50475] transition-colors cursor-pointer group"
              >
                <span className="text-[14px] font-bold text-black group-hover:text-[#d50475]">
                  Cambiar correo de la cuenta
                </span>
                <ArrowRight className="w-4 h-4 text-[#d50475] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Action: Cambiar contraseña */}
              <button
                type="button"
                onClick={() => setSubView('change-password')}
                className="pt-4 flex items-center justify-between text-left hover:text-[#d50475] transition-colors cursor-pointer group"
              >
                <span className="text-[14px] font-bold text-black group-hover:text-[#d50475]">
                  Cambiar contraseña
                </span>
                <ArrowRight className="w-4 h-4 text-[#d50475] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Perfil Básico */}
          <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-xs">
            <div className="bg-[#f8fafc] px-6 py-3 border-b border-[#e2e8f0]">
              <span className="text-[13px] font-bold uppercase tracking-wider text-[#475569]">
                Perfil
              </span>
            </div>

            <div className="p-6 flex flex-col gap-5">
              <span className="text-[12px] font-bold uppercase tracking-wider text-[#64748b]">
                Básico
              </span>

              {/* User Avatar + Details */}
              <div className="flex items-center gap-4 pb-4 border-b border-[#f1f5f9]">
                <div className="w-[56px] h-[56px] rounded-full bg-[#f1f5f9] text-[#475569] font-bold text-[18px] flex items-center justify-center shrink-0">
                  CD
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold text-black">
                    {profileNombre} {profileApellidos}
                  </span>
                  <span className="text-[13px] text-[#64748b] mt-0.5">
                    Teléfono {profileTelefono1}
                  </span>
                  <span className="text-[13px] text-[#64748b]">
                    {profileCiudad}, {profilePais}
                  </span>
                </div>
              </div>

              {/* Action: Editar datos de perfil */}
              <button
                type="button"
                onClick={() => setSubView('edit-profile')}
                className="flex items-center justify-between text-left hover:text-[#d50475] transition-colors cursor-pointer group"
              >
                <span className="text-[14px] font-bold text-black group-hover:text-[#d50475]">
                  Editar datos de perfil
                </span>
                <ArrowRight className="w-4 h-4 text-[#d50475] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SUBVIEW 2: CAMBIAR CORREO (media_1793946617491_f4902d0c.png) ================= */}
      {subView === 'change-email' && (
        <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-xs animate-fadeIn">
          <div className="bg-[#f8fafc] px-6 py-3.5 border-b border-[#e2e8f0]">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#475569]">
              Cambiar correo de la cuenta
            </span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newEmail !== repeatEmail) {
                alert('Los correos no coinciden.');
                return;
              }
              if (newEmail) setCurrentEmail(newEmail);
              setSubView('overview');
              showSuccess('Correo electrónico actualizado correctamente.');
            }}
            className="p-6 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-medium text-[#64748b]">Correo actual</label>
              <input
                type="email"
                disabled
                value={currentEmail}
                className="h-[44px] px-3.5 rounded-[6px] border border-[#e2e8f0] bg-[#f8fafc] text-[14px] text-[#64748b]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-medium text-black">Nuevo email</label>
              <input
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="nuevo@correo.com"
                className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-medium text-black">Repetir email</label>
              <input
                type="email"
                required
                value={repeatEmail}
                onChange={(e) => setRepeatEmail(e.target.value)}
                placeholder="nuevo@correo.com"
                className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f1f5f9]">
              <button
                type="button"
                onClick={() => setSubView('overview')}
                className="px-6 h-[42px] rounded-[8px] border border-[#cbd5e1] hover:border-black bg-white text-black text-[14px] font-bold uppercase cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 h-[42px] rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] font-bold uppercase cursor-pointer transition-colors shadow-xs"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= SUBVIEW 3: CAMBIAR CONTRASEÑA (media_1793946633525_702e58b1.png) ================= */}
      {subView === 'change-password' && (
        <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-xs animate-fadeIn">
          <div className="bg-[#f8fafc] px-6 py-3.5 border-b border-[#e2e8f0]">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#475569]">
              Cambiar contraseña
            </span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (newPassword !== repeatPassword) {
                alert('Las contraseñas no coinciden.');
                return;
              }
              setSubView('overview');
              showSuccess('Contraseña cambiada con éxito.');
            }}
            className="p-6 flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-medium text-black">Contraseña actual</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-medium text-black">Contraseña</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-medium text-black">Repetir contraseña</label>
              <input
                type="password"
                required
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f1f5f9]">
              <button
                type="button"
                onClick={() => setSubView('overview')}
                className="px-6 h-[42px] rounded-[8px] border border-[#cbd5e1] hover:border-black bg-white text-black text-[14px] font-bold uppercase cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 h-[42px] rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] font-bold uppercase cursor-pointer transition-colors shadow-xs"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ================= SUBVIEW 4: EDITAR DATOS DE PERFIL (media_1793946643676_4d3105ba.png) ================= */}
      {subView === 'edit-profile' && (
        <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-xs animate-fadeIn">
          <div className="bg-[#f8fafc] px-6 py-3.5 border-b border-[#e2e8f0]">
            <span className="text-[13px] font-bold uppercase tracking-wider text-[#475569]">
              Editar datos de perfil
            </span>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubView('overview');
              showSuccess('Datos de perfil actualizados con éxito.');
            }}
            className="p-6 flex flex-col gap-5"
          >
            {/* Foto de perfil con botón "Seleccionar foto de perfil" */}
            <div className="flex flex-col items-center justify-center gap-3 py-2">
              <div className="w-[88px] h-[88px] rounded-full bg-[#cbd5e1] flex items-center justify-center text-white shrink-0">
                <User className="w-12 h-12 text-[#94a3b8]" />
              </div>
              <span className="text-[17px] font-bold text-black">
                {profileNombre} {profileApellidos}
              </span>
              <button
                type="button"
                className="px-5 h-[38px] rounded-[8px] border border-[#cbd5e1] hover:border-black bg-white text-black text-[13px] font-bold uppercase cursor-pointer transition-colors"
              >
                Seleccionar foto de perfil
              </button>
            </div>

            {/* Fila 1: Nombre* y Apellidos* */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-medium text-black">
                  Nombre<span className="text-[#d50475]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={profileNombre}
                  onChange={(e) => setProfileNombre(e.target.value)}
                  className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-medium text-black">
                  Apellidos<span className="text-[#d50475]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={profileApellidos}
                  onChange={(e) => setProfileApellidos(e.target.value)}
                  className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                />
              </div>
            </div>

            {/* Fila 2: Fecha de nacimiento (Día*, Mes*, Año*) y Sexo* */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-medium text-black">Fecha de nacimiento</label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    value={profileDia}
                    onChange={(e) => setProfileDia(e.target.value)}
                    placeholder="Día*"
                    className="h-[44px] px-3 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                  />
                  <select
                    value={profileMes}
                    onChange={(e) => setProfileMes(e.target.value)}
                    className="h-[44px] px-2 rounded-[6px] border border-[#cbd5e1] text-[13px] text-black bg-white focus:outline-none focus:border-[#d50475] cursor-pointer"
                  >
                    <option value="Enero">Enero</option>
                    <option value="Febrero">Febrero</option>
                    <option value="Marzo">Marzo</option>
                    <option value="Abril">Abril</option>
                    <option value="Mayo">Mayo</option>
                    <option value="Junio">Junio</option>
                    <option value="Julio">Julio</option>
                    <option value="Agosto">Agosto</option>
                    <option value="Septiembre">Septiembre</option>
                    <option value="Octubre">Octubre</option>
                    <option value="Noviembre">Noviembre</option>
                    <option value="Diciembre">Diciembre</option>
                  </select>
                  <input
                    type="number"
                    value={profileAno}
                    onChange={(e) => setProfileAno(e.target.value)}
                    placeholder="Año*"
                    className="h-[44px] px-3 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-medium text-black">
                  Sexo<span className="text-[#d50475]">*</span>
                </label>
                <select
                  value={profileSexo}
                  onChange={(e) => setProfileSexo(e.target.value)}
                  className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black bg-white focus:outline-none focus:border-[#d50475] cursor-pointer"
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
            </div>

            {/* Fila 3: País* y Ciudad* */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-medium text-black">
                  País<span className="text-[#d50475]">*</span>
                </label>
                <select
                  value={profilePais}
                  onChange={(e) => setProfilePais(e.target.value)}
                  className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black bg-white focus:outline-none focus:border-[#d50475] cursor-pointer"
                >
                  <option value="México">México</option>
                  <option value="España">España</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Argentina">Argentina</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-medium text-black">
                  Ciudad<span className="text-[#d50475]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={profileCiudad}
                  onChange={(e) => setProfileCiudad(e.target.value)}
                  className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                />
              </div>
            </div>

            {/* Fila 4: Código postal y Zona horaria* */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-medium text-black">Código postal</label>
                <input
                  type="text"
                  value={profileCodigoPostal}
                  onChange={(e) => setProfileCodigoPostal(e.target.value)}
                  className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-medium text-black">
                  Zona horaria<span className="text-[#d50475]">*</span>
                </label>
                <select
                  value={profileZonaHoraria}
                  onChange={(e) => setProfileZonaHoraria(e.target.value)}
                  className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black bg-white focus:outline-none focus:border-[#d50475] cursor-pointer"
                >
                  <option value="America/Mexico_City">America/Mexico_City</option>
                  <option value="Europe/Madrid">Europe/Madrid</option>
                  <option value="America/Bogota">America/Bogota</option>
                </select>
              </div>
            </div>

            {/* Fila 5: Teléfono 1* y Teléfono 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-medium text-black">
                  Teléfono 1<span className="text-[#d50475]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={profileTelefono1}
                  onChange={(e) => setProfileTelefono1(e.target.value)}
                  className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[13px] font-medium text-black">Teléfono 2</label>
                <input
                  type="tel"
                  value={profileTelefono2}
                  onChange={(e) => setProfileTelefono2(e.target.value)}
                  className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
                />
              </div>
            </div>

            {/* Fila 6: Número de póliza */}
            <div className="flex flex-col gap-1">
              <label className="text-[13px] font-medium text-black">Número de póliza</label>
              <input
                type="text"
                value={profilePoliza}
                onChange={(e) => setProfilePoliza(e.target.value)}
                className="h-[44px] px-3.5 rounded-[6px] border border-[#cbd5e1] text-[14px] text-black focus:outline-none focus:border-[#d50475]"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f1f5f9]">
              <button
                type="button"
                onClick={() => setSubView('overview')}
                className="px-6 h-[42px] rounded-[8px] border border-[#cbd5e1] hover:border-black bg-white text-black text-[14px] font-bold uppercase cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 h-[42px] rounded-[8px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] font-bold uppercase cursor-pointer transition-colors shadow-xs"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

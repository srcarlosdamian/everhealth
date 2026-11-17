import React, { useState } from 'react';
import {
  Upload,
  Check,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';
import { Tabs, TabItem } from '../design-system/molecules/Tabs';
import { Button } from '../design-system/atoms/Button';
import { TextInput } from '../design-system/atoms/TextInput';
import { Dropdown, DropdownOption } from '../design-system/atoms/Dropdown';
import { Badge } from '../design-system/atoms/Badge';

interface MiPerfilProps {
  userName?: string;
  userEmail?: string;
}

const PROFILE_TABS: TabItem[] = [
  { id: 'datos-personales', label: 'Datos personales' },
  { id: 'seguridad', label: 'Seguridad' },
];

const MESES_OPTIONS: DropdownOption[] = [
  { value: 'Enero', label: 'Enero' },
  { value: 'Febrero', label: 'Febrero' },
  { value: 'Marzo', label: 'Marzo' },
  { value: 'Abril', label: 'Abril' },
  { value: 'Mayo', label: 'Mayo' },
  { value: 'Junio', label: 'Junio' },
  { value: 'Julio', label: 'Julio' },
  { value: 'Agosto', label: 'Agosto' },
  { value: 'Septiembre', label: 'Septiembre' },
  { value: 'Octubre', label: 'Octubre' },
  { value: 'Noviembre', label: 'Noviembre' },
  { value: 'Diciembre', label: 'Diciembre' },
];

const SEXO_OPTIONS: DropdownOption[] = [
  { value: 'Masculino', label: 'Masculino' },
  { value: 'Femenino', label: 'Femenino' },
];

const PREFIJO_OPTIONS: DropdownOption[] = [
  { value: '+52', label: 'México - 52+' },
  { value: '+34', label: 'España - 34+' },
  { value: '+57', label: 'Colombia - 57+' },
  { value: '+54', label: 'Argentina - 54+' },
  { value: '+56', label: 'Chile - 56+' },
  { value: '+51', label: 'Perú - 51+' },
  { value: '+1', label: 'Estados Unidos - 1+' },
];

const PAIS_OPTIONS: DropdownOption[] = [
  { value: 'México', label: 'México' },
  { value: 'España', label: 'España' },
  { value: 'Colombia', label: 'Colombia' },
  { value: 'Argentina', label: 'Argentina' },
  { value: 'Chile', label: 'Chile' },
  { value: 'Perú', label: 'Perú' },
];

const ZONA_HORARIA_OPTIONS: DropdownOption[] = [
  { value: 'America/Mexico_City', label: 'America / México' },
  { value: 'Europe/Madrid', label: 'Europe / Madrid' },
  { value: 'America/Bogota', label: 'America / Bogotá' },
  { value: 'America/Argentina/Buenos_Aires', label: 'America / Buenos Aires' },
];

export const MiPerfil: React.FC<MiPerfilProps> = ({
  userName = 'Carlos Damian descarlosdamian',
  userEmail = 'contact@carlosdamian.com',
}) => {
  const [activeTab, setActiveTab] = useState('datos-personales');

  // Datos Personales Form State (información existente de Carlos Damián)
  const [profileNombre, setProfileNombre] = useState('Carlos Damian');
  const [profileApellidos, setProfileApellidos] = useState('descarlosdamian');
  const [profileDia, setProfileDia] = useState('28');
  const [profileMes, setProfileMes] = useState('Mayo');
  const [profileAno, setProfileAno] = useState('1991');
  const [profileSexo, setProfileSexo] = useState('Masculino');
  const [profilePrefijo, setProfilePrefijo] = useState('+52');
  const [profileTelefono1, setProfileTelefono1] = useState('2281381278');
  const [profileTelefono2, setProfileTelefono2] = useState('');
  const [profilePoliza, setProfilePoliza] = useState('486205');
  const [profilePais, setProfilePais] = useState('México');
  const [profileCiudad, setProfileCiudad] = useState('Veracruz');
  const [profileCodigoPostal, setProfileCodigoPostal] = useState('91700');
  const [profileZonaHoraria, setProfileZonaHoraria] = useState('America/Mexico_City');

  // Seguridad Form State
  const [currentEmail, setCurrentEmail] = useState(userEmail);
  const [newEmail, setNewEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // Toast / feedback message
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess('Datos de perfil actualizados con éxito.');
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail || !repeatEmail) {
      alert('Por favor introduce el nuevo correo en ambos campos.');
      return;
    }
    if (newEmail !== repeatEmail) {
      alert('Los correos electrónicos no coinciden.');
      return;
    }
    setCurrentEmail(newEmail);
    setNewEmail('');
    setRepeatEmail('');
    showSuccess('Correo de la cuenta actualizado correctamente.');
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      alert('Introduce tu contraseña actual.');
      return;
    }
    if (!newPassword || !repeatPassword) {
      alert('Introduce y confirma la nueva contraseña.');
      return;
    }
    if (newPassword !== repeatPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setRepeatPassword('');
    showSuccess('Contraseña cambiada con éxito.');
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col gap-6 animate-fadeIn font-[family-name:Helvetica]">
      
      {/* Encabezado Principal: Perfil */}
      <div className="flex flex-col gap-1">
        <h1 className="text-[28px] sm:text-[32px] leading-[38px] font-bold text-black tracking-tight">
          Perfil
        </h1>
        <p className="text-[14px] leading-[22px] text-[var(--color-page-subtitle)] font-normal">
          En esta sección puedes revisar y actualizar tu información
        </p>
      </div>

      {/* Navegación por Pestañas: Únicamente Datos personales y Seguridad */}
      <Tabs
        tabs={PROFILE_TABS}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Mensaje de confirmación flotante / superior */}
      {notificationMsg && (
        <div className="w-full bg-[#f0fdf4] border border-[#bbf7d0] rounded-[8px] p-3 text-[#166534] text-[14px] font-medium flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-[#166534]" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* ================= PESTAÑA 1: DATOS PERSONALES (RE-ACOMODO INSPIRADO EN LA REFERENCIA) ================= */}
      {activeTab === 'datos-personales' && (
        <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] p-6 sm:p-8 shadow-xs animate-fadeIn">
          <form onSubmit={handleSavePersonal} className="flex flex-col gap-8">
            
            {/* SECCIÓN 1: Información personal */}
            <div className="flex flex-col gap-5">
              <h2 className="text-[18px] font-bold text-black tracking-tight">
                Información personal
              </h2>

              {/* Fila 1: Imagen de perfil, Nombre *, Apellidos * */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Imagen de perfil integrada */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-normal text-black leading-tight">
                    Imagen de perfil
                  </label>
                  <div
                    onClick={() => showSuccess('Ventana para seleccionar imagen abierta.')}
                    className="h-[42px] px-3 rounded-[6px] border border-[#cbd5e1] hover:border-[#94a3b8] bg-white flex items-center justify-between gap-3 cursor-pointer transition-colors select-none"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-[28px] h-[28px] rounded-[4px] bg-[#f1f5f9] text-[#0f172a] font-bold text-[11px] flex items-center justify-center shrink-0 border border-[#cbd5e1]">
                        CD
                      </div>
                      <span className="text-[14px] text-[#475569] truncate">Actualizar imagen</span>
                    </div>
                    <Upload className="w-4 h-4 text-[#64748b] shrink-0" />
                  </div>
                </div>

                {/* Nombre * */}
                <TextInput
                  label="Nombre *"
                  required
                  value={profileNombre}
                  onChange={(e) => setProfileNombre(e.target.value)}
                  placeholder="Carlos Damian"
                />

                {/* Apellidos * */}
                <TextInput
                  label="Apellidos *"
                  required
                  value={profileApellidos}
                  onChange={(e) => setProfileApellidos(e.target.value)}
                  placeholder="descarlosdamian"
                />
              </div>

              {/* Fila 2: Fecha de nacimiento *, Sexo *, Número de póliza * */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Fecha de nacimiento * */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-normal text-black leading-tight">
                    Fecha de nacimiento *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <TextInput
                      type="number"
                      required
                      value={profileDia}
                      onChange={(e) => setProfileDia(e.target.value)}
                      placeholder="Día *"
                      min={1}
                      max={31}
                    />
                    <Dropdown
                      options={MESES_OPTIONS}
                      value={profileMes}
                      onChange={setProfileMes}
                      placeholder="Mes *"
                    />
                    <TextInput
                      type="number"
                      required
                      value={profileAno}
                      onChange={(e) => setProfileAno(e.target.value)}
                      placeholder="Año *"
                      min={1900}
                      max={2026}
                    />
                  </div>
                </div>

                {/* Sexo * */}
                <Dropdown
                  label="Sexo *"
                  required
                  options={SEXO_OPTIONS}
                  value={profileSexo}
                  onChange={setProfileSexo}
                  placeholder="Selecciona una opción"
                />

                {/* Número de póliza */}
                <TextInput
                  label="Número de póliza *"
                  value={profilePoliza}
                  onChange={(e) => setProfilePoliza(e.target.value)}
                  placeholder="486205"
                />
              </div>
            </div>

            <div className="h-[1px] bg-[#f1f5f9] w-full" />

            {/* SECCIÓN 2: Contacto */}
            <div className="flex flex-col gap-5">
              <h2 className="text-[18px] font-bold text-black tracking-tight">
                Contacto
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Prefijo * */}
                <Dropdown
                  label="Prefijo *"
                  required
                  options={PREFIJO_OPTIONS}
                  value={profilePrefijo}
                  onChange={setProfilePrefijo}
                  placeholder="México - 52+"
                />

                {/* Teléfono 1 * */}
                <TextInput
                  label="Teléfono *"
                  required
                  type="tel"
                  value={profileTelefono1}
                  onChange={(e) => setProfileTelefono1(e.target.value)}
                  placeholder="2281381278"
                />

                {/* Teléfono 2 (opcional) */}
                <TextInput
                  label="Teléfono secundario"
                  type="tel"
                  value={profileTelefono2}
                  onChange={(e) => setProfileTelefono2(e.target.value)}
                  placeholder="Teléfono 2 (opcional)"
                />
              </div>
            </div>

            <div className="h-[1px] bg-[#f1f5f9] w-full" />

            {/* SECCIÓN 3: Ubicación */}
            <div className="flex flex-col gap-5">
              <h2 className="text-[18px] font-bold text-black tracking-tight">
                Ubicación
              </h2>

              {/* Fila 1: País *, Ciudad *, Código postal */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Dropdown
                  label="País *"
                  required
                  options={PAIS_OPTIONS}
                  value={profilePais}
                  onChange={setProfilePais}
                  placeholder="Selecciona una opción"
                />
                <TextInput
                  label="Ciudad *"
                  required
                  value={profileCiudad}
                  onChange={(e) => setProfileCiudad(e.target.value)}
                  placeholder="Veracruz"
                />
                <TextInput
                  label="Código postal"
                  value={profileCodigoPostal}
                  onChange={(e) => setProfileCodigoPostal(e.target.value)}
                  placeholder="91700"
                />
              </div>

              {/* Fila 2: Zona horaria * */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Dropdown
                  label="Zona horaria *"
                  required
                  options={ZONA_HORARIA_OPTIONS}
                  value={profileZonaHoraria}
                  onChange={setProfileZonaHoraria}
                  placeholder="America / México"
                />
              </div>
            </div>

            <div className="h-[1px] bg-[#f1f5f9] w-full" />

            {/* Fila de Acciones: Cancelar y Actualizar datos (CTA Rosa) */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => showSuccess('Edición cancelada.')}
              >
                CANCELAR
              </Button>
              <Button
                variant="primary"
                type="submit"
              >
                ACTUALIZAR DATOS
              </Button>
            </div>

          </form>
        </div>
      )}

      {/* ================= PESTAÑA 2: SEGURIDAD (MISMO ESTILO A 3 COLUMNAS Y CONTENEDOR UNIFICADO) ================= */}
      {activeTab === 'seguridad' && (
        <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] p-6 sm:p-8 shadow-xs animate-fadeIn flex flex-col gap-8">
          
          {/* SECCIÓN 1: Suscripción y facturación */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-black tracking-tight">
                Suscripción y facturación
              </h2>
              <Badge variant="success">Suscripción Activa</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <TextInput
                label="Correo de la cuenta"
                disabled
                value={currentEmail}
              />
              <TextInput
                label="Plan contratado"
                disabled
                value={`Ever Health Total · Póliza #${profilePoliza}`}
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-normal text-black leading-tight">
                  Comprobantes
                </label>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full h-[44px] justify-center"
                  onClick={() => showSuccess('Detalles de facturación descargados.')}
                >
                  VER FACTURACIÓN
                </Button>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-[#f1f5f9] w-full" />

          {/* SECCIÓN 2: Cambiar correo de la cuenta */}
          <form onSubmit={handleSaveEmail} className="flex flex-col gap-5">
            <h2 className="text-[18px] font-bold text-black tracking-tight">
              Cambiar correo de la cuenta
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <TextInput
                label="Correo actual"
                disabled
                value={currentEmail}
              />
              <TextInput
                label="Nuevo email *"
                required
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="nuevo@correo.com"
              />
              <TextInput
                label="Repetir email *"
                required
                type="email"
                value={repeatEmail}
                onChange={(e) => setRepeatEmail(e.target.value)}
                placeholder="nuevo@correo.com"
              />
            </div>

            <div className="flex justify-end pt-1">
              <Button variant="primary" type="submit">
                CAMBIAR CORREO DE LA CUENTA
              </Button>
            </div>
          </form>

          <div className="h-[1px] bg-[#f1f5f9] w-full" />

          {/* SECCIÓN 3: Cambiar contraseña */}
          <form onSubmit={handleSavePassword} className="flex flex-col gap-5">
            <h2 className="text-[18px] font-bold text-black tracking-tight">
              Cambiar contraseña
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <TextInput
                label="Contraseña actual *"
                required
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
              />
              <TextInput
                label="Nueva contraseña *"
                required
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
              />
              <TextInput
                label="Repetir contraseña *"
                required
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                placeholder="••••••••••••"
              />
            </div>

            <div className="flex justify-end pt-1">
              <Button variant="primary" type="submit">
                CAMBIAR CONTRASEÑA
              </Button>
            </div>
          </form>

          <div className="h-[1px] bg-[#f1f5f9] w-full" />

          {/* SECCIÓN 4: Autenticación en dos pasos (2FA) */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-black tracking-tight">
                Autenticación en dos pasos (2FA)
              </h2>
              <Badge variant="success">Activado</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <TextInput
                label="Estado de protección"
                disabled
                value="2FA Habilitado en cada inicio"
              />
              <TextInput
                label="Canales de confirmación"
                disabled
                value={`SMS (${profileTelefono1}) y correo`}
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-normal text-black leading-tight">
                  Ajustes de seguridad
                </label>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full h-[44px] justify-center"
                  onClick={() => showSuccess('Configuración de 2FA actualizada.')}
                >
                  CONFIGURAR 2FA
                </Button>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

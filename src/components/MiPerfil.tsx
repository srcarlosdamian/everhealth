import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Calendar,
  FileSignature,
  Stamp,
  HeartHandshake,
  FileText,
  Check,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  Upload,
  CreditCard,
  MapPin,
  Phone,
  Hash,
} from 'lucide-react';
import { Tabs, TabItem } from '../design-system/molecules/Tabs';
import { Button } from '../design-system/atoms/Button';
import { TextInput } from '../design-system/atoms/TextInput';
import { Dropdown, DropdownOption } from '../design-system/atoms/Dropdown';
import { Checkbox } from '../design-system/atoms/Checkbox';
import { Badge } from '../design-system/atoms/Badge';

interface MiPerfilProps {
  userName?: string;
  userEmail?: string;
}

const PROFILE_TABS: TabItem[] = [
  { id: 'datos-personales', label: 'Datos personales' },
  { id: 'seguridad', label: 'Seguridad' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'firma', label: 'Firma' },
  { id: 'sello', label: 'Sello' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'receta-electronica', label: 'Receta electrónica' },
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

const PAIS_OPTIONS: DropdownOption[] = [
  { value: 'México', label: 'México' },
  { value: 'España', label: 'España' },
  { value: 'Colombia', label: 'Colombia' },
  { value: 'Argentina', label: 'Argentina' },
  { value: 'Chile', label: 'Chile' },
  { value: 'Perú', label: 'Perú' },
];

const ZONA_HORARIA_OPTIONS: DropdownOption[] = [
  { value: 'America/Mexico_City', label: 'America/Mexico_City (GMT-6)' },
  { value: 'Europe/Madrid', label: 'Europe/Madrid (GMT+1)' },
  { value: 'America/Bogota', label: 'America/Bogota (GMT-5)' },
  { value: 'America/Argentina/Buenos_Aires', label: 'America/Argentina/Buenos_Aires (GMT-3)' },
];

export const MiPerfil: React.FC<MiPerfilProps> = ({
  userName = 'Carlos Damian descarlosdamian',
  userEmail = 'contact@carlosdamian.com',
}) => {
  const [activeTab, setActiveTab] = useState('datos-personales');

  // Datos Personales Form State
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

  // Seguridad Form State
  const [currentEmail, setCurrentEmail] = useState(userEmail);
  const [newEmail, setNewEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // Agenda State
  const [agendaTimezone, setAgendaTimezone] = useState('America/Mexico_City');
  const [remindEmail, setRemindEmail] = useState(true);
  const [remindSms, setRemindSms] = useState(true);
  const [remindWhatsapp, setRemindWhatsapp] = useState(true);
  const [syncGoogle, setSyncGoogle] = useState(true);

  // Sello State
  const [autoStampRecords, setAutoStampRecords] = useState(true);
  const [biometricStampValidation, setBiometricStampValidation] = useState(true);

  // Receta State
  const [rxPharmacy, setRxPharmacy] = useState('Farmacias del Ahorro / Farmacias San Pablo');
  const [rxSms, setRxSms] = useState(true);
  const [rxPush, setRxPush] = useState(true);
  const [rxEmail, setRxEmail] = useState(true);

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

      {/* Navegación por Pestañas */}
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

      {/* ================= PESTAÑA 1: DATOS PERSONALES ================= */}
      {activeTab === 'datos-personales' && (
        <div className="flex flex-col gap-6 animate-fadeIn">
          
          {/* Tarjeta 1: Perfil Básico (Resumen de Identificación) */}
          <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-xs">
            <div className="bg-[#f8fafc] px-6 py-3.5 border-b border-[#e2e8f0] flex items-center justify-between">
              <span className="text-[13px] font-bold uppercase tracking-wider text-black">
                Perfil Básico
              </span>
              <Badge variant="success">Cuenta Titular</Badge>
            </div>

            <div className="p-6 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                {/* Avatar C D */}
                <div className="w-[76px] h-[76px] rounded-full bg-[#f1f5f9] text-[#0f172a] font-bold text-[22px] flex items-center justify-center shrink-0 border border-[#cbd5e1] shadow-xs">
                  C D
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[20px] font-bold text-black leading-tight">
                    {profileNombre} {profileApellidos}
                  </h2>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-[13px] text-black">
                    <span className="flex items-center gap-1.5 font-normal">
                      <Phone className="w-3.5 h-3.5 text-black" />
                      Teléfono {profileTelefono1}
                    </span>
                    <span className="flex items-center gap-1.5 font-normal">
                      <MapPin className="w-3.5 h-3.5 text-black" />
                      {profileCiudad}, {profilePais}
                    </span>
                    <span className="flex items-center gap-1.5 font-normal">
                      <Hash className="w-3.5 h-3.5 text-black" />
                      Póliza #{profilePoliza}
                    </span>
                  </div>
                </div>
              </div>

              {/* Botón Selecciona Foto */}
              <Button
                variant="outline"
                type="button"
                className="shrink-0 self-center sm:self-auto"
                onClick={() => showSuccess('Ventana para seleccionar foto abierta.')}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>SELECCIONA FOTO</span>
              </Button>
            </div>
          </div>

          {/* Tarjeta 2: Formulario Completo Editar datos de perfil */}
          <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-xs">
            <div className="bg-[#f8fafc] px-6 py-4 border-b border-[#e2e8f0]">
              <h2 className="text-[18px] sm:text-[20px] font-bold text-black">
                Editar datos de perfil
              </h2>
              <p className="text-[13px] text-[var(--color-text-description)] mt-0.5 font-normal">
                Revisa y actualiza tus datos identificativos, de residencia y de contacto clínico.
              </p>
            </div>

            <form onSubmit={handleSavePersonal} className="p-6 sm:p-8 flex flex-col gap-6">
              
              {/* Fila 1: Nombre* y Apellidos* */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Nombre*"
                  required
                  value={profileNombre}
                  onChange={(e) => setProfileNombre(e.target.value)}
                  placeholder="Carlos Damian"
                />
                <TextInput
                  label="Apellidos*"
                  required
                  value={profileApellidos}
                  onChange={(e) => setProfileApellidos(e.target.value)}
                  placeholder="descarlosdamian"
                />
              </div>

              {/* Fila 2: Fecha de nacimiento* (Día*, Mes*, Año*) y Sexo* */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-normal text-black leading-tight">
                    Fecha de nacimiento*
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <TextInput
                      type="number"
                      required
                      value={profileDia}
                      onChange={(e) => setProfileDia(e.target.value)}
                      placeholder="Día*"
                      min={1}
                      max={31}
                    />
                    <Dropdown
                      options={MESES_OPTIONS}
                      value={profileMes}
                      onChange={setProfileMes}
                      placeholder="Mes*"
                    />
                    <TextInput
                      type="number"
                      required
                      value={profileAno}
                      onChange={(e) => setProfileAno(e.target.value)}
                      placeholder="Año*"
                      min={1900}
                      max={2026}
                    />
                  </div>
                </div>

                <Dropdown
                  label="Sexo*"
                  required
                  options={SEXO_OPTIONS}
                  value={profileSexo}
                  onChange={setProfileSexo}
                  placeholder="Selecciona el sexo"
                />
              </div>

              {/* Fila 3: País y Ciudad* */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Dropdown
                  label="País"
                  options={PAIS_OPTIONS}
                  value={profilePais}
                  onChange={setProfilePais}
                  placeholder="Selecciona el país"
                />
                <TextInput
                  label="Ciudad*"
                  required
                  value={profileCiudad}
                  onChange={(e) => setProfileCiudad(e.target.value)}
                  placeholder="Veracruz"
                />
              </div>

              {/* Fila 4: Código postal y Zona horaria* */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Código postal"
                  value={profileCodigoPostal}
                  onChange={(e) => setProfileCodigoPostal(e.target.value)}
                  placeholder="91700"
                />
                <Dropdown
                  label="Zona horaria*"
                  required
                  options={ZONA_HORARIA_OPTIONS}
                  value={profileZonaHoraria}
                  onChange={setProfileZonaHoraria}
                  placeholder="America/Mexico_City"
                />
              </div>

              {/* Fila 5: Teléfono 1* y Teléfono 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Teléfono 1*"
                  required
                  type="tel"
                  value={profileTelefono1}
                  onChange={(e) => setProfileTelefono1(e.target.value)}
                  placeholder="2281381278"
                />
                <TextInput
                  label="Teléfono 2"
                  type="tel"
                  value={profileTelefono2}
                  onChange={(e) => setProfileTelefono2(e.target.value)}
                  placeholder="Teléfono secundario (opcional)"
                />
              </div>

              {/* Fila 6: Número de póliza */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Número de póliza"
                  value={profilePoliza}
                  onChange={(e) => setProfilePoliza(e.target.value)}
                  placeholder="486205"
                />
              </div>

              {/* Botones de acción homologados: Cancelar y Guardar Cambios */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#f1f5f9]">
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
                  GUARDAR CAMBIOS
                </Button>
              </div>
            </form>
          </div>

        </div>
      )}

      {/* ================= PESTAÑA 2: SEGURIDAD (CUENTA & SUSCRIPCIÓN) ================= */}
      {activeTab === 'seguridad' && (
        <div className="flex flex-col gap-6 animate-fadeIn">
          
          {/* Card 1: Suscripción y facturación */}
          <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-xs">
            <div className="bg-[#f8fafc] px-6 py-3.5 border-b border-[#e2e8f0] flex items-center justify-between">
              <span className="text-[13px] font-bold uppercase tracking-wider text-black">
                Suscripción y facturación
              </span>
              <Badge variant="success">Suscripción Activa</Badge>
            </div>

            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-bold uppercase tracking-wider text-black">
                  Correo de la cuenta
                </span>
                <span className="text-[17px] font-bold text-black">
                  {currentEmail}
                </span>
                <span className="text-[13px] text-black font-normal mt-0.5">
                  Plan de salud Ever Health Total · Póliza #{profilePoliza}
                </span>
              </div>
              <Button
                variant="outline"
                type="button"
                onClick={() => showSuccess('Detalles de facturación descargados.')}
              >
                VER FACTURACIÓN
              </Button>
            </div>
          </div>

          {/* Card 2: Cambiar correo de la cuenta */}
          <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-xs">
            <div className="bg-[#f8fafc] px-6 py-4 border-b border-[#e2e8f0]">
              <h2 className="text-[18px] font-bold text-black">
                Cambiar correo de la cuenta
              </h2>
              <p className="text-[13px] text-[var(--color-text-description)] mt-0.5 font-normal">
                Actualiza la dirección utilizada para iniciar sesión y recibir comunicaciones oficiales.
              </p>
            </div>

            <form onSubmit={handleSaveEmail} className="p-6 sm:p-8 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-normal text-black leading-tight">
                  Correo actual
                </label>
                <input
                  type="email"
                  disabled
                  value={currentEmail}
                  className="w-full h-[44px] px-4 rounded-[8px] border border-[#e2e8f0] bg-[#f8fafc] text-[15px] font-medium text-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Nuevo email*"
                  required
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="nuevo@correo.com"
                />
                <TextInput
                  label="Repetir email*"
                  required
                  type="email"
                  value={repeatEmail}
                  onChange={(e) => setRepeatEmail(e.target.value)}
                  placeholder="nuevo@correo.com"
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="primary" type="submit">
                  CAMBIAR CORREO DE LA CUENTA
                </Button>
              </div>
            </form>
          </div>

          {/* Card 3: Cambiar contraseña */}
          <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-xs">
            <div className="bg-[#f8fafc] px-6 py-4 border-b border-[#e2e8f0]">
              <h2 className="text-[18px] font-bold text-black">
                Cambiar contraseña
              </h2>
              <p className="text-[13px] text-[var(--color-text-description)] mt-0.5 font-normal">
                Asegúrate de utilizar una contraseña segura con mayúsculas, números y caracteres especiales.
              </p>
            </div>

            <form onSubmit={handleSavePassword} className="p-6 sm:p-8 flex flex-col gap-5">
              <TextInput
                label="Contraseña actual*"
                required
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Nueva contraseña*"
                  required
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                />
                <TextInput
                  label="Repetir contraseña*"
                  required
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  placeholder="••••••••••••"
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="primary" type="submit">
                  CAMBIAR CONTRASEÑA
                </Button>
              </div>
            </form>
          </div>

          {/* Card 4: Autenticación en dos pasos (2FA) */}
          <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] p-6 sm:p-8 flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h3 className="text-[16px] font-bold text-black">
                  Autenticación en dos pasos (2FA)
                </h3>
                <Badge variant="success">Activado</Badge>
              </div>
              <p className="text-[13px] text-[var(--color-text-description)] font-normal">
                Protege tu cuenta enviando un código de confirmación a tu teléfono {profileTelefono1} y correo en cada inicio de sesión.
              </p>
            </div>
            <Button variant="outline" type="button" className="shrink-0">
              CONFIGURAR 2FA
            </Button>
          </div>

        </div>
      )}

      {/* ================= PESTAÑA 3: AGENDA ================= */}
      {activeTab === 'agenda' && (
        <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-xs animate-fadeIn">
          <div className="bg-[#f8fafc] px-6 py-4 border-b border-[#e2e8f0]">
            <h2 className="text-[18px] sm:text-[20px] font-bold text-black">
              Preferencias de agenda y citas médicas
            </h2>
            <p className="text-[13px] text-[var(--color-text-description)] mt-0.5 font-normal">
              Personaliza cómo recibes recordatorios de tus citas y la sincronización con tus calendarios externos.
            </p>
          </div>

          <div className="p-6 sm:p-8 flex flex-col gap-6">
            <div className="max-w-[480px]">
              <Dropdown
                label="Zona horaria para visualización de consultas"
                options={ZONA_HORARIA_OPTIONS}
                value={agendaTimezone}
                onChange={setAgendaTimezone}
              />
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <span className="text-[14px] font-bold text-black">
                Recordatorios de citas
              </span>
              <div className="flex flex-col gap-2.5">
                <Checkbox
                  checked={remindEmail}
                  onChange={setRemindEmail}
                  label={`Notificaciones por correo electrónico (${currentEmail}) 24 horas y 1 hora antes`}
                />
                <Checkbox
                  checked={remindSms}
                  onChange={setRemindSms}
                  label={`Recordatorio vía SMS a tu número principal (${profileTelefono1})`}
                />
                <Checkbox
                  checked={remindWhatsapp}
                  onChange={setRemindWhatsapp}
                  label="Avisos instantáneos y enlaces directos a la videoconsulta vía WhatsApp"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-[#f1f5f9]">
              <span className="text-[14px] font-bold text-black">
                Sincronización de calendarios
              </span>
              <Checkbox
                checked={syncGoogle}
                onChange={setSyncGoogle}
                label="Sincronizar automáticamente consultas en Google Calendar / Apple iCal / Outlook"
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-[#f1f5f9]">
              <Button
                variant="primary"
                type="button"
                onClick={() => showSuccess('Preferencias de agenda guardadas correctamente.')}
              >
                GUARDAR PREFERENCIAS
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PESTAÑA 4: FIRMA ================= */}
      {activeTab === 'firma' && (
        <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-xs animate-fadeIn">
          <div className="bg-[#f8fafc] px-6 py-4 border-b border-[#e2e8f0]">
            <h2 className="text-[18px] sm:text-[20px] font-bold text-black">
              Firma digital médica del paciente
            </h2>
            <p className="text-[13px] text-[var(--color-text-description)] mt-0.5 font-normal">
              Firma digital autorizada utilizada para consentimientos informados y validación de trámites clínicos.
            </p>
          </div>

          <div className="p-6 sm:p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[15px] font-bold text-black">Firma registrada</span>
                <Badge variant="success">Verificada y activa</Badge>
              </div>
              <span className="text-[13px] text-black font-mono">ID: SIG-2026-98412-MX</span>
            </div>

            {/* Lienzo visual de muestra de firma */}
            <div className="w-full h-[180px] bg-[#fafafa] border-2 border-dashed border-[#cbd5e1] rounded-[8px] flex flex-col items-center justify-center p-4">
              <span className="font-serif italic text-[36px] text-black select-none tracking-wide">
                {profileNombre} {profileApellidos}
              </span>
              <span className="text-[11px] text-black mt-2 font-mono">
                Huella criptográfica: 8f4b29c91a02e64b73... (Certificada por Ever Health Trust)
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-[13px] text-black font-normal">
                Última actualización: 12 de Marzo de 2026 a las 10:45 hrs
              </span>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => showSuccess('Ventana de carga de firma habilitada.')}
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>SUBIR ARCHIVO</span>
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => showSuccess('Lienzo de firma habilitado.')}
                >
                  TRAZAR NUEVA FIRMA
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PESTAÑA 5: SELLO ================= */}
      {activeTab === 'sello' && (
        <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-xs animate-fadeIn">
          <div className="bg-[#f8fafc] px-6 py-4 border-b border-[#e2e8f0]">
            <h2 className="text-[18px] sm:text-[20px] font-bold text-black">
              Sello digital y certificación
            </h2>
            <p className="text-[13px] text-[var(--color-text-description)] mt-0.5 font-normal">
              Validación criptográfica y sellos de autenticidad para documentos médicos y recetas.
            </p>
          </div>

          <div className="p-6 sm:p-8 flex flex-col gap-6">
            <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fce7f3] text-[#d50475] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-black">
                    Certificado de Validación Ever Health Trust
                  </span>
                  <span className="text-[12px] text-black font-normal">
                    Algoritmo SHA-256 · RSA 2048-bit · Válido hasta 31/12/2028
                  </span>
                </div>
              </div>
              <Badge variant="success">Homologado</Badge>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[14px] font-bold text-black">
                Opciones de sellado automático
              </span>
              <Checkbox
                checked={autoStampRecords}
                onChange={setAutoStampRecords}
                label="Incluir automáticamente sello de verificación en descargas de historial clínico"
              />
              <Checkbox
                checked={biometricStampValidation}
                onChange={setBiometricStampValidation}
                label="Requerir validación biométrica facial antes de aplicar sello en consentimientos"
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-[#f1f5f9]">
              <Button
                variant="primary"
                type="button"
                onClick={() => showSuccess('Configuración de sellos actualizada.')}
              >
                GUARDAR CONFIGURACIÓN
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PESTAÑA 6: SERVICIOS ================= */}
      {activeTab === 'servicios' && (
        <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-xs animate-fadeIn">
          <div className="bg-[#f8fafc] px-6 py-4 border-b border-[#e2e8f0]">
            <h2 className="text-[18px] sm:text-[20px] font-bold text-black">
              Servicios y plan de cobertura
            </h2>
            <p className="text-[13px] text-[var(--color-text-description)] mt-0.5 font-normal">
              Consulta los servicios asistenciales disponibles en tu póliza médica Ever Health.
            </p>
          </div>

          <div className="p-6 sm:p-8 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px]">
              <div className="flex flex-col gap-1">
                <span className="text-[12px] font-bold uppercase tracking-wider text-black">
                  Plan Contratado
                </span>
                <span className="text-[20px] font-bold text-black">
                  Ever Health Total Familiar Plus
                </span>
                <span className="text-[13px] text-black font-normal">
                  Póliza vinculada: <strong>#{profilePoliza}</strong> · Renovación anual activa
                </span>
              </div>
              <Badge variant="success">Póliza Activa</Badge>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[14px] font-bold text-black">
                Prestaciones incluidas en tu cobertura
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[14px] text-black">
                <div className="flex items-center gap-2.5 p-3 rounded-[6px] border border-[#e2e8f0] bg-white">
                  <Check className="w-4 h-4 text-[#16a34a] shrink-0" />
                  <span>Videoconsulta general 24/7 sin cita previa</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-[6px] border border-[#e2e8f0] bg-white">
                  <Check className="w-4 h-4 text-[#16a34a] shrink-0" />
                  <span>Chat médico con especialistas certificados</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-[6px] border border-[#e2e8f0] bg-white">
                  <Check className="w-4 h-4 text-[#16a34a] shrink-0" />
                  <span>Receta médica electrónica oficial interoperable</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-[6px] border border-[#e2e8f0] bg-white">
                  <Check className="w-4 h-4 text-[#16a34a] shrink-0" />
                  <span>Escaneo biométrico facial de signos vitales (EVR 100)</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-[6px] border border-[#e2e8f0] bg-white">
                  <Check className="w-4 h-4 text-[#16a34a] shrink-0" />
                  <span>Cobertura para 4 familiares dependientes</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-[6px] border border-[#e2e8f0] bg-white">
                  <Check className="w-4 h-4 text-[#16a34a] shrink-0" />
                  <span>Asistencia veterinaria para hasta 3 mascotas</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#f1f5f9]">
              <Button
                variant="outline"
                type="button"
                onClick={() => showSuccess('Descargando condiciones de póliza en PDF...')}
              >
                DESCARGAR CONDICIONES DE PÓLIZA
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PESTAÑA 7: RECETA ELECTRÓNICA ================= */}
      {activeTab === 'receta-electronica' && (
        <div className="w-full bg-white border border-[#e2e8f0] rounded-[10px] overflow-hidden shadow-xs animate-fadeIn">
          <div className="bg-[#f8fafc] px-6 py-4 border-b border-[#e2e8f0]">
            <h2 className="text-[18px] sm:text-[20px] font-bold text-black">
              Configuración de receta electrónica
            </h2>
            <p className="text-[13px] text-[var(--color-text-description)] mt-0.5 font-normal">
              Preferencias para la emisión, recepción y dispensación de tus medicamentos prescritos.
            </p>
          </div>

          <div className="p-6 sm:p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px]">
              <div className="flex flex-col">
                <span className="text-[12px] font-bold uppercase tracking-wider text-black">
                  Identificador de Receta Electrónica (RE)
                </span>
                <span className="text-[16px] font-bold text-black font-mono mt-0.5">
                  REC-MX-982147
                </span>
              </div>
              <Badge variant="success">Habilitada</Badge>
            </div>

            <div className="max-w-[600px]">
              <TextInput
                label="Farmacia habitual preferente"
                value={rxPharmacy}
                onChange={(e) => setRxPharmacy(e.target.value)}
                placeholder="Farmacias del Ahorro / Farmacias San Pablo"
              />
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <span className="text-[14px] font-bold text-black">
                Formatos de recepción de recetas
              </span>
              <div className="flex flex-col gap-2.5">
                <Checkbox
                  checked={rxSms}
                  onChange={setRxSms}
                  label={`SMS inmediato con enlace cifrado y código QR al número ${profileTelefono1}`}
                />
                <Checkbox
                  checked={rxPush}
                  onChange={setRxPush}
                  label="Notificación push en la aplicación con receta descargable en formato PDF"
                />
                <Checkbox
                  checked={rxEmail}
                  onChange={setRxEmail}
                  label={`Envío de copia digital al correo registrado (${currentEmail})`}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[#f1f5f9]">
              <Button
                variant="primary"
                type="button"
                onClick={() => showSuccess('Preferencias de receta electrónica actualizadas.')}
              >
                GUARDAR PREFERENCIAS
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

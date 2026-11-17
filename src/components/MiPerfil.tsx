import React, { useState } from 'react';
import {
  Upload,
  Check,
  CreditCard,
  Download,
  FileText,
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
  { id: 'suscripcion-facturacion', label: 'Suscripción y facturación' },
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
  { value: '+34', label: 'España - 34+' },
  { value: '+52', label: 'México - 52+' },
  { value: '+57', label: 'Colombia - 57+' },
  { value: '+54', label: 'Argentina - 54+' },
  { value: '+56', label: 'Chile - 56+' },
  { value: '+51', label: 'Perú - 51+' },
  { value: '+1', label: 'Estados Unidos - 1+' },
];

const PAIS_OPTIONS: DropdownOption[] = [
  { value: 'España', label: 'España' },
  { value: 'México', label: 'México' },
  { value: 'Colombia', label: 'Colombia' },
  { value: 'Argentina', label: 'Argentina' },
  { value: 'Chile', label: 'Chile' },
  { value: 'Perú', label: 'Perú' },
];

const ZONA_HORARIA_OPTIONS: DropdownOption[] = [
  { value: 'Europe/Madrid', label: 'Europe / Madrid' },
  { value: 'America/Mexico_City', label: 'America / México' },
  { value: 'America/Bogota', label: 'America / Bogotá' },
  { value: 'America/Argentina/Buenos_Aires', label: 'America / Buenos Aires' },
];

export const MiPerfil: React.FC<MiPerfilProps> = ({
  userEmail = 'alejandro.navarro@everhealth.es',
}) => {
  const [activeTab, setActiveTab] = useState('datos-personales');

  // Datos Personales Form State (Usuario genérico español hombre)
  const [profileNombre, setProfileNombre] = useState('Alejandro');
  const [profileApellidos, setProfileApellidos] = useState('Navarro García');
  const [profileDia, setProfileDia] = useState('14');
  const [profileMes, setProfileMes] = useState('Mayo');
  const [profileAno, setProfileAno] = useState('1988');
  const [profileSexo, setProfileSexo] = useState('Masculino');
  const [profilePrefijo, setProfilePrefijo] = useState('+34');
  const [profileTelefono1, setProfileTelefono1] = useState('620184932');
  const [profileTelefono2, setProfileTelefono2] = useState('');
  const [profilePoliza, setProfilePoliza] = useState('486205');
  const [profilePais, setProfilePais] = useState('España');
  const [profileCiudad, setProfileCiudad] = useState('Madrid');
  const [profileCodigoPostal, setProfileCodigoPostal] = useState('28001');
  const [profileZonaHoraria, setProfileZonaHoraria] = useState('Europe/Madrid');

  // Seguridad Form State
  const [currentEmail, setCurrentEmail] = useState(userEmail);
  const [newEmail, setNewEmail] = useState('');
  const [repeatEmail, setRepeatEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  // Facturación Form State
  const [billingRazonSocial, setBillingRazonSocial] = useState('Alejandro Navarro García');
  const [billingNif, setBillingNif] = useState('47291845K');
  const [billingDireccion, setBillingDireccion] = useState('Calle de Serrano 48, 2º Izq.');
  const [billingCiudad, setBillingCiudad] = useState('Madrid');
  const [billingCp, setBillingCp] = useState('28001');
  const [billingPais, setBillingPais] = useState('España');

  // Toast / feedback message
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess('Datos personales actualizados correctamente.');
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

  const handleSaveBilling = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess('Datos de facturación guardados con éxito.');
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

      {/* ================= PESTAÑA 1: DATOS PERSONALES (SIN CONTENEDOR CON LÍNEA) ================= */}
      {activeTab === 'datos-personales' && (
        <div className="w-full animate-fadeIn">
          <form onSubmit={handleSavePersonal} className="flex flex-col gap-8">
            
            {/* SECCIÓN 1: Información personal */}
            <div className="flex flex-col gap-5">
              <h2 className="text-[18px] font-bold text-black tracking-tight">
                Información personal
              </h2>

              {/* Fila 1: Imagen de perfil, Nombre *, Apellidos * */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Imagen de perfil integrada con botón de actualizar imagen */}
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
                        AN
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
                  placeholder="Alejandro"
                />

                {/* Apellidos * */}
                <TextInput
                  label="Apellidos *"
                  required
                  value={profileApellidos}
                  onChange={(e) => setProfileApellidos(e.target.value)}
                  placeholder="Navarro García"
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
                  placeholder="España - 34+"
                />

                {/* Teléfono 1 * */}
                <TextInput
                  label="Teléfono *"
                  required
                  type="tel"
                  value={profileTelefono1}
                  onChange={(e) => setProfileTelefono1(e.target.value)}
                  placeholder="620184932"
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
                  placeholder="Madrid"
                />
                <TextInput
                  label="Código postal"
                  value={profileCodigoPostal}
                  onChange={(e) => setProfileCodigoPostal(e.target.value)}
                  placeholder="28001"
                />
              </div>

              {/* Fila 2: Zona horaria */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Dropdown
                  label="Zona horaria *"
                  required
                  options={ZONA_HORARIA_OPTIONS}
                  value={profileZonaHoraria}
                  onChange={setProfileZonaHoraria}
                  placeholder="Europe / Madrid"
                />
              </div>
            </div>

            {/* Fila de Acciones: Cancelar y Actualizar datos */}
            <div className="flex items-center justify-end gap-3 pt-4">
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

      {/* ================= PESTAÑA 2: SEGURIDAD (SIN 2FA, SIN CONTENEDOR CON LÍNEA) ================= */}
      {activeTab === 'seguridad' && (
        <div className="w-full animate-fadeIn flex flex-col gap-8">
          
          {/* SECCIÓN 1: Cambiar correo de la cuenta */}
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

            <div className="flex justify-end pt-2">
              <Button
                variant="primary"
                type="submit"
                disabled={!newEmail || !repeatEmail}
              >
                ACTUALIZAR CORREO
              </Button>
            </div>
          </form>

          {/* SECCIÓN 2: Cambiar contraseña */}
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
                placeholder="Mínimo 8 caracteres"
              />
              <TextInput
                label="Repetir nueva contraseña *"
                required
                type="password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                placeholder="Confirma la contraseña"
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button
                variant="primary"
                type="submit"
                disabled={!currentPassword || !newPassword || !repeatPassword}
              >
                CAMBIAR CONTRASEÑA
              </Button>
            </div>
          </form>

        </div>
      )}

      {/* ================= PESTAÑA 3: SUSCRIPCIÓN Y FACTURACIÓN (SIN CONTENEDOR CON LÍNEA) ================= */}
      {activeTab === 'suscripcion-facturacion' && (
        <div className="w-full animate-fadeIn flex flex-col gap-8">
          
          {/* SECCIÓN 1: Plan y suscripción activa */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-[18px] font-bold text-black tracking-tight">
                  Plan de suscripción activo
                </h2>
                <Badge variant="success">Suscripción Activa</Badge>
              </div>
              <span className="text-[13px] text-[#64748b]">
                Póliza: <strong className="text-black font-semibold">{profilePoliza}</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-4 rounded-[8px] bg-white border border-[#e2e8f0] flex flex-col gap-1">
                <span className="text-[12px] text-[#64748b] font-medium uppercase tracking-wider">Plan contratado</span>
                <span className="text-[16px] font-bold text-black">Ever Health Familiar Plus</span>
                <span className="text-[13px] text-[#475569]">199,00 € / año</span>
              </div>

              <div className="p-4 rounded-[8px] bg-white border border-[#e2e8f0] flex flex-col gap-1">
                <span className="text-[12px] text-[#64748b] font-medium uppercase tracking-wider">Próxima renovación</span>
                <span className="text-[16px] font-bold text-black">14 de Mayo de 2027</span>
                <span className="text-[13px] text-[#16a34a] font-medium">Renovación automática</span>
              </div>

              <div className="p-4 rounded-[8px] bg-white border border-[#e2e8f0] flex flex-col justify-between gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[12px] text-[#64748b] font-medium uppercase tracking-wider">Cobertura</span>
                  <span className="text-[14px] font-bold text-black">Titular + 3 beneficiarios</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    type="button"
                    className="h-[36px] text-[13px]"
                    onClick={() => {}}
                  >
                    Cambiar plan
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: Método de pago */}
          <div className="flex flex-col gap-5">
            <h2 className="text-[18px] font-bold text-black tracking-tight">
              Método de pago
            </h2>

            <div className="p-4 rounded-[8px] bg-white border border-[#e2e8f0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[6px] bg-white border border-[#cbd5e1] flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-black" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-bold text-black">Visa terminada en 4242</span>
                  <span className="text-[12px] text-[#64748b]">Caduca 08/2028 · Método predeterminado</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Button
                  variant="outline"
                  type="button"
                  className="h-[36px] text-[13px]"
                  onClick={() => {}}
                >
                  Actualizar tarjeta
                </Button>
              </div>
            </div>
          </div>

          {/* SECCIÓN 3: Datos de Facturación */}
          <form onSubmit={handleSaveBilling} className="flex flex-col gap-5">
            <h2 className="text-[18px] font-bold text-black tracking-tight">
              Datos de facturación
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TextInput
                label="Razón social / Nombre *"
                required
                value={billingRazonSocial}
                onChange={(e) => setBillingRazonSocial(e.target.value)}
                placeholder="Nombre o empresa"
              />
              <TextInput
                label="NIF / CIF / DNI *"
                required
                value={billingNif}
                onChange={(e) => setBillingNif(e.target.value)}
                placeholder="47291845K"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <TextInput
                label="Dirección fiscal *"
                required
                value={billingDireccion}
                onChange={(e) => setBillingDireccion(e.target.value)}
                placeholder="Calle y número"
              />
              <TextInput
                label="Ciudad *"
                required
                value={billingCiudad}
                onChange={(e) => setBillingCiudad(e.target.value)}
                placeholder="Madrid"
              />
              <TextInput
                label="Código postal *"
                required
                value={billingCp}
                onChange={(e) => setBillingCp(e.target.value)}
                placeholder="28001"
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button
                variant="primary"
                type="submit"
              >
                GUARDAR FACTURACIÓN
              </Button>
            </div>
          </form>

          {/* SECCIÓN 4: Historial de facturas descargables */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[18px] font-bold text-black tracking-tight">
              Historial de facturas
            </h2>

            <div className="w-full bg-white border border-[#e2e8f0] rounded-none overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white">
                <thead>
                  <tr className="bg-white border-b border-[#e2e8f0] text-[12px] font-bold uppercase tracking-wider text-black">
                    <th className="py-3.5 px-4 border-r border-[#e2e8f0]">FECHA</th>
                    <th className="py-3.5 px-4 border-r border-[#e2e8f0]">CONCEPTO</th>
                    <th className="py-3.5 px-4 border-r border-[#e2e8f0]">IMPORTE</th>
                    <th className="py-3.5 px-4 border-r border-[#e2e8f0]">ESTADO</th>
                    <th className="py-3.5 px-4 text-right w-[100px]">FACTURA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0] text-[14px] text-black bg-white">
                  <tr className="hover:bg-[#f8fafc] transition-colors">
                    <td className="py-3.5 px-4 border-r border-[#e2e8f0] font-medium text-black">14/05/2026</td>
                    <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-black">Suscripción Ever Health Anual</td>
                    <td className="py-3.5 px-4 border-r border-[#e2e8f0] font-bold text-black">199,00 €</td>
                    <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                      <Badge variant="success">Pagada</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => {}}
                        className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#d50475] hover:underline cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#f8fafc] transition-colors">
                    <td className="py-3.5 px-4 border-r border-[#e2e8f0] font-medium text-black">14/05/2025</td>
                    <td className="py-3.5 px-4 border-r border-[#e2e8f0] text-black">Suscripción Ever Health Anual</td>
                    <td className="py-3.5 px-4 border-r border-[#e2e8f0] font-bold text-black">189,00 €</td>
                    <td className="py-3.5 px-4 border-r border-[#e2e8f0]">
                      <Badge variant="success">Pagada</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => {}}
                        className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#d50475] hover:underline cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

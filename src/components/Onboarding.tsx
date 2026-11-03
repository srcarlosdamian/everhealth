import React, { useState } from 'react';
import { Globe, Circle, CheckCircle2, ArrowLeft, ChevronDown } from 'lucide-react';

interface OnboardingProps {
  initialEmail: string;
  onBackToLogin: () => void;
  onFinishOnboarding: (userData: { name: string; lastName: string; email: string }) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({
  initialEmail,
  onBackToLogin,
  onFinishOnboarding,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 2 state
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState('');
  const [phone2, setPhone2] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 3 state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [sex, setSex] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [timezone, setTimezone] = useState('');

  const logoSrc = `${import.meta.env.BASE_URL}assets/logo.png`;

  // Password validation rules (prototype interactive feedback, with default visual state matching Figma if empty)
  const hasMinLength = password.length >= 12;
  const hasUppercase = password.length === 0 ? true : /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@$!%*?&]/.test(password);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col">
      {/* Top Header (height 48px, centered 800px content) */}
      <header className="w-full h-[48px] border-b border-transparent flex items-center justify-center px-4">
        <div className="w-full max-w-[800px] h-[32px] flex items-center justify-between">
          <img
            src={logoSrc}
            alt="EVER HEALTH"
            onClick={onBackToLogin}
            className="w-[178px] h-[20px] object-contain object-left cursor-pointer"
          />
          <button
            type="button"
            className="h-[32px] px-[10px] rounded-[6px] border border-[#cbd5e1] bg-white hover:bg-[#f8fafc] flex items-center gap-[8px] text-[14px] leading-[20px] font-bold text-black transition-colors"
          >
            <Globe className="w-[18px] h-[18px] text-black" />
            <span>ES</span>
          </button>
        </div>
      </header>

      {/* Main Content Container (800px width, 40px top margin) */}
      <main className="flex-1 w-full flex justify-center px-4 pt-[40px] pb-[48px]">
        <div className="w-full max-w-[800px] p-[24px] flex flex-col">
          
          {/* ==================== PASO 1/3: TÉRMINOS Y CONDICIONES (EVR - 88) ==================== */}
          {step === 1 && (
            <div className="flex flex-col">
              {/* Title & Step Indicator */}
              <div className="flex flex-col mb-[32px]">
                <h1 className="text-[30px] leading-[36px] font-bold text-black mb-[16px]">
                  TÉRMINOS Y CONDICIONES DEL CLIENTE
                </h1>
                <div className="flex items-center gap-[8px] text-[14px] leading-[20px]">
                  <span className="font-bold text-black">PASO 1/3</span>
                  <span className="font-normal text-black">REVISA Y ACEPTA</span>
                </div>
              </div>

              {/* Section 1: AVISO IMPORTANTE */}
              <div className="flex flex-col gap-[8px] mb-[32px]">
                <h2 className="text-[20px] leading-[28px] font-bold text-black">
                  AVISO IMPORTANTE
                </h2>
                <div className="text-[16px] leading-[24px] font-normal text-black space-y-1">
                  <p>
                    Usted está accediendo al servicio de telemedicina de Ever Health. Recuerde que esta plataforma no está indicada para resolver emergencias médicas, por lo que le rogamos si sufre una no utilice este sitio web, deberá dirigirse a un centro de salud u hospital de inmediato o llamar al número de emergencias sanitarias.
                  </p>
                  <p className="pt-1">ACEPTACIÓN Y AUTORIZACIÓN</p>
                  <p>
                    Al presionar “ACEPTAR”, Usted manifiesta que es mayor de edad, ha leído con detenimiento este documento, se obliga a cumplir con lo aquí estipulado, acepta expresamente todas las disposiciones en él contenidas y cumple con otorgar la autorización correspondiente en favor de Ever Health para el uso de esta plataforma y en beneficio de los especialistas, para los procedimientos y/o consultas que obtenga a través de la misma. Autoriza a que le enviemos su informe médico, debidamente cifrado, tras mantener la consulta con los especialistas. Si usted dispone de este servicio a través de su compañía aseguradora, tenga en cuenta que también autoriza a que le enviemos una copia de su informe médico, en las mismas condiciones mencionadas en este párrafo, a dicha compañía.
                  </p>
                </div>
              </div>

              {/* Section 2: ACEPTACIÓN Y AUTORIZACIÓN */}
              <div className="flex flex-col gap-[8px] mb-[32px]">
                <h2 className="text-[20px] leading-[28px] font-bold text-black">
                  ACEPTACIÓN Y AUTORIZACIÓN
                </h2>
                <p className="text-[16px] leading-[24px] font-normal text-black">
                  Al presionar “ACEPTAR”, Usted manifiesta que es mayor de edad, ha leído con detenimiento este documento, se obliga a cumplir con lo aquí estipulado, acepta expresamente todas las disposiciones en él contenidas y cumple con otorgar la autorización correspondiente en favor de Ever Health para el uso de esta plataforma y en beneficio de los especialistas, para los procedimientos y/o consultas que obtenga a través de la misma. Autoriza a que le enviemos su informe médico, debidamente cifrado, tras mantener la consulta con los especialistas. Si usted dispone de este servicio a través de su compañía aseguradora, tenga en cuenta que también autoriza a que le enviemos una copia de su informe médico, en las mismas condiciones mencionadas en este párrafo, a dicha compañía.
                </p>
              </div>

              {/* Section 3: CONTENIDO DEL SITIO WEB */}
              <div className="flex flex-col gap-[8px] mb-[32px]">
                <h2 className="text-[20px] leading-[28px] font-bold text-black">
                  CONTENIDO DEL SITIO WEB
                </h2>
                <div className="text-[16px] leading-[24px] font-normal text-black space-y-4">
                  <p>
                    Queda establecido que Ever Health, no responderá por ningún daño o perjuicio que sea causado por el mal uso que el Usuario o cualquier tercero haga con la información que sea obtenida directa o indirectamente a través del sitio web, pues Usted entiende y acepta que ningún contenido disponible en el sitio web deberá ser interpretado como una opinión médica o de otra índole, a excepción de las informaciones que le suministre directamente y de forma individual el especialista, en el libre ejercicio de su profesión.
                  </p>
                  <p>
                    El Usuario, entiende que Ever Health está presente en los siguientes países: España y Estados Unidos Mexicanos y, que en cada uno de ellos, el servicio de Telemedicina es prestado por especialistas, que se encuentran legalmente facultados para ofrecer servicios en su país. De estos términos, entiende y acepta que eventualmente podría ser atendido por médicos residenciados y facultados para ejercer la medicina en un país distinto al suyo; en todos los casos, el personal médico garantiza el cumplimiento del juramento hipocrático y las normas y leyes vigentes del país en el que se encuentra.
                  </p>
                  <p>
                    Usted se compromete a proveer información correcta, veraz y actualizada al momento de registrarse o cuando realice la actualización de sus datos. En caso de proveer información falsa o incorrecta o de registrarse desde un país donde la empresa no tenga presencia, nos reservamos el derecho de suspender su cuenta y negarle el acceso al uso del sistema. En el caso de realizar la inscripción de un menor, esta deberá ser realizada por quien o quienes ostenten la patria potestad y queda bajo su responsabilidad el faltar a la verdad, de forma que usted/es manifiesta/n ostentar dicha patria potestad sobre su hijo/a, no habiéndole sido suspendida, limitada ni retirada por resolución judicial alguna, ni hallarse en trámites de procedimiento administrativo o jurisdiccional alguno con dicha finalidad o posible efecto.
                  </p>
                </div>
              </div>

              {/* Sticky/Bottom Action Bar (Frame 9157: #f8fafc surface) */}
              <div className="sticky bottom-4 w-full h-[68px] bg-[#f8fafc]/95 backdrop-blur-sm rounded-[8px] px-[16px] flex items-center justify-between mt-4">
                <button
                  type="button"
                  onClick={onBackToLogin}
                  className="h-[36px] px-[12px] rounded-[6px] border border-[#cbd5e1] bg-white text-[#94a3b8] hover:text-[#475569] text-[14px] leading-[20px] font-medium transition-colors cursor-pointer"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setStep(2);
                  }}
                  className="h-[36px] px-[16px] rounded-[6px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] leading-[20px] font-medium transition-colors cursor-pointer"
                >
                  Aceptar y continuar
                </button>
              </div>
            </div>
          )}

          {/* ==================== PASO 2/3: SEGURIDAD DE LA CUENTA (EVR - 86) ==================== */}
          {step === 2 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setStep(3);
              }}
              className="flex flex-col"
            >
              {/* Header Title & Step */}
              <div className="flex flex-col mb-[32px]">
                <h1 className="text-[30px] leading-[36px] font-bold text-black mb-[4px]">
                  Seguridad de la cuenta
                </h1>
                <div className="flex items-center gap-[8px] text-[14px] leading-[20px]">
                  <span className="font-bold text-black">PASO 2/3</span>
                  <span className="font-normal text-black">COMPLETA TU REGISTRO</span>
                </div>
              </div>

              {/* Row 1: Email * and Teléfono * */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] mb-[32px]">
                <div className="flex flex-col">
                  <label className="text-[16px] leading-[24px] font-normal text-black mb-[4px]">
                    Email *
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingresa tu email"
                    className="w-full h-[48px] px-[14px] bg-white border border-[#cbd5e1] rounded-[6px] text-[16px] leading-[24px] text-black placeholder:text-[#64748b] focus:outline-none focus:border-[#d50475]"
                  />
                  <span className="text-[12px] leading-[16px] text-[#64748b] mt-[8px]">
                    Usarás este correo para iniciar sesión y recuperar tu cuenta
                  </span>
                </div>

                <div className="flex flex-col">
                  <label className="text-[16px] leading-[24px] font-normal text-black mb-[4px]">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ingresa tu teléfono"
                    className="w-full h-[48px] px-[14px] bg-white border border-[#cbd5e1] rounded-[6px] text-[16px] leading-[24px] text-black placeholder:text-[#64748b] focus:outline-none focus:border-[#d50475]"
                  />
                  <span className="text-[12px] leading-[16px] text-[#64748b] mt-[8px]">
                    Usarás este teléfono para iniciar sesión
                  </span>
                </div>
              </div>

              {/* Row 2: Teléfono 2 */}
              <div className="flex flex-col mb-[32px]">
                <label className="text-[16px] leading-[24px] font-normal text-black mb-[4px]">
                  Teléfono 2
                </label>
                <input
                  type="tel"
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)}
                  placeholder="Ingresa tu Teléfono"
                  className="w-full h-[48px] px-[14px] bg-white border border-[#cbd5e1] rounded-[6px] text-[16px] leading-[24px] text-black placeholder:text-[#64748b] focus:outline-none focus:border-[#d50475]"
                />
              </div>

              {/* Section Subtitle: Contraseña */}
              <h2 className="text-[20px] leading-[28px] font-bold text-black mb-[32px]">
                Contraseña
              </h2>

              {/* Clave * */}
              <div className="flex flex-col mb-[32px]">
                <label className="text-[16px] leading-[24px] font-normal text-black mb-[4px]">
                  Clave *
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*******"
                  className="w-full h-[48px] px-[14px] bg-white border border-[#cbd5e1] rounded-[6px] text-[16px] leading-[24px] text-black placeholder:text-[#64748b] focus:outline-none focus:border-[#d50475]"
                />
              </div>

              {/* Password Rules Box (#f8fafc, 128px height) */}
              <div className="w-full bg-[#f8fafc] rounded-[8px] p-[12px] flex flex-col gap-[8px] mb-[32px]">
                <div className="flex items-center gap-[8px] h-[20px]">
                  {hasMinLength ? (
                    <CheckCircle2 className="w-[18px] h-[18px] text-[#0f172a] shrink-0" />
                  ) : (
                    <Circle className="w-[18px] h-[18px] text-[#475569] shrink-0" />
                  )}
                  <span className="text-[14px] leading-[20px] text-[#0f172a]">
                    Mínimo 12 caracteres
                  </span>
                </div>

                <div className="flex items-center gap-[8px] h-[20px]">
                  {hasUppercase ? (
                    <CheckCircle2 className="w-[18px] h-[18px] text-[#0f172a] shrink-0" />
                  ) : (
                    <Circle className="w-[18px] h-[18px] text-[#475569] shrink-0" />
                  )}
                  <span className="text-[14px] leading-[20px] text-[#0f172a]">
                    Al menos 1 letra mayúscula
                  </span>
                </div>

                <div className="flex items-center gap-[8px] h-[20px]">
                  {hasNumber ? (
                    <CheckCircle2 className="w-[18px] h-[18px] text-[#0f172a] shrink-0" />
                  ) : (
                    <Circle className="w-[18px] h-[18px] text-[#475569] shrink-0" />
                  )}
                  <span className="text-[14px] leading-[20px] text-[#0f172a]">
                    Al menos 1 número
                  </span>
                </div>

                <div className="flex items-center gap-[8px] h-[20px]">
                  {hasSpecial ? (
                    <CheckCircle2 className="w-[18px] h-[18px] text-[#0f172a] shrink-0" />
                  ) : (
                    <Circle className="w-[18px] h-[18px] text-[#475569] shrink-0" />
                  )}
                  <span className="text-[14px] leading-[20px] text-[#0f172a]">
                    Al menos 1 carácter especial (@$!%*?&)
                  </span>
                </div>
              </div>

              {/* Confirmar clave * */}
              <div className="flex flex-col mb-[32px]">
                <label className="text-[16px] leading-[24px] font-normal text-black mb-[4px]">
                  Confirmar clave *
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ingresa tu contraseña"
                  className="w-full h-[48px] px-[14px] bg-white border border-[#cbd5e1] rounded-[6px] text-[16px] leading-[24px] text-black placeholder:text-[#64748b] focus:outline-none focus:border-[#d50475]"
                />
              </div>

              {/* Bottom Action Bar */}
              <div className="w-full h-[68px] bg-[#f8fafc] rounded-[8px] px-[16px] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="h-[36px] px-[12px] rounded-[6px] border border-[#cbd5e1] bg-white hover:bg-[#f1f5f9] text-[#0f172a] text-[14px] leading-[20px] font-medium transition-colors cursor-pointer"
                >
                  Atrás
                </button>
                <button
                  type="submit"
                  className="h-[36px] px-[16px] rounded-[6px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] leading-[20px] font-medium transition-colors cursor-pointer"
                >
                  Continuar
                </button>
              </div>
            </form>
          )}

          {/* ==================== PASO 3/3: CUÉNTANOS UN POCO SOBRE TI (EVR - 89) ==================== */}
          {step === 3 && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onFinishOnboarding({
                  name: firstName || 'Carlos Damián',
                  lastName: lastName || '',
                  email: email || 'carlos@everhealth.com',
                });
              }}
              className="flex flex-col"
            >
              {/* Back Arrow + Title & Step */}
              <div className="flex flex-col mb-[32px]">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-[24px] h-[24px] mb-[16px] text-black hover:text-[#d50475] transition-colors flex items-center justify-center cursor-pointer"
                >
                  <ArrowLeft className="w-[20px] h-[20px]" />
                </button>
                <h1 className="text-[30px] leading-[36px] font-bold text-black mb-[4px]">
                  Cuéntanos un poco sobre ti
                </h1>
                <div className="flex items-center gap-[8px] text-[14px] leading-[20px]">
                  <span className="font-bold text-black">PASO 3/3</span>
                  <span className="font-normal text-black">REVISA TUS DATOS</span>
                </div>
              </div>

              {/* Section: Tus datos personales */}
              <h2 className="text-[20px] leading-[28px] font-bold text-black mb-[32px]">
                Tus datos personales
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] mb-[32px]">
                <div className="flex flex-col">
                  <label className="text-[16px] leading-[24px] font-normal text-black mb-[4px]">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ej.: Ana"
                    className="w-full h-[48px] px-[14px] bg-white border border-[#cbd5e1] rounded-[6px] text-[16px] leading-[24px] text-black placeholder:text-[#64748b] focus:outline-none focus:border-[#d50475]"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[16px] leading-[24px] font-normal text-black mb-[4px]">
                    Apellidos *
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Ej.: Pérez García"
                    className="w-full h-[48px] px-[14px] bg-white border border-[#cbd5e1] rounded-[6px] text-[16px] leading-[24px] text-black placeholder:text-[#64748b] focus:outline-none focus:border-[#d50475]"
                  />
                </div>
              </div>

              {/* ¿Qué sexo te asignaron al nacer? * */}
              <div className="flex flex-col mb-[32px]">
                <label className="text-[16px] leading-[24px] font-normal text-black mb-[4px]">
                  ¿Qué sexo te asignaron al nacer? *
                </label>
                <div className="relative">
                  <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    className={`w-full h-[48px] px-[14px] pr-[36px] bg-white border border-[#cbd5e1] rounded-[6px] text-[16px] leading-[24px] appearance-none focus:outline-none focus:border-[#d50475] ${
                      sex ? 'text-black' : 'text-[#64748b]'
                    }`}
                  >
                    <option value="">Elige la opción que corresponda</option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Intersexual / Otro">Intersexual / Otro</option>
                  </select>
                  <ChevronDown className="w-[18px] h-[18px] text-[#64748b] absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Section: Fecha de nacimiento */}
              <h2 className="text-[20px] leading-[28px] font-bold text-black mb-[32px]">
                Fecha de nacimiento
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-[16px] mb-[32px]">
                <div className="flex flex-col">
                  <label className="text-[16px] leading-[24px] font-normal text-black mb-[4px]">
                    Día
                  </label>
                  <div className="relative">
                    <select
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      className={`w-full h-[48px] px-[14px] pr-[36px] bg-white border border-[#cbd5e1] rounded-[6px] text-[16px] leading-[24px] appearance-none focus:outline-none focus:border-[#d50475] ${
                        birthDay ? 'text-black' : 'text-[#64748b]'
                      }`}
                    >
                      <option value="">Elige el día</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={String(d)}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-[18px] h-[18px] text-[#64748b] absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[16px] leading-[24px] font-normal text-black mb-[4px]">
                    Mes
                  </label>
                  <div className="relative">
                    <select
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className={`w-full h-[48px] px-[14px] pr-[36px] bg-white border border-[#cbd5e1] rounded-[6px] text-[16px] leading-[24px] appearance-none focus:outline-none focus:border-[#d50475] ${
                        birthMonth ? 'text-black' : 'text-[#64748b]'
                      }`}
                    >
                      <option value="">Elige el mes</option>
                      {[
                        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
                      ].map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-[18px] h-[18px] text-[#64748b] absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[16px] leading-[24px] font-normal text-black mb-[4px]">
                    Año
                  </label>
                  <div className="relative">
                    <select
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      className={`w-full h-[48px] px-[14px] pr-[36px] bg-white border border-[#cbd5e1] rounded-[6px] text-[16px] leading-[24px] appearance-none focus:outline-none focus:border-[#d50475] ${
                        birthYear ? 'text-black' : 'text-[#64748b]'
                      }`}
                    >
                      <option value="">Elige el año</option>
                      {Array.from({ length: 90 }, (_, i) => 2008 - i).map((y) => (
                        <option key={y} value={String(y)}>
                          {y}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-[18px] h-[18px] text-[#64748b] absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Section: Ubicación y zona horaria */}
              <h2 className="text-[20px] leading-[28px] font-bold text-black mb-[32px]">
                Ubicación y zona horaria
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] mb-[32px]">
                <div className="flex flex-col">
                  <label className="text-[16px] leading-[24px] font-normal text-black mb-[4px]">
                    País
                  </label>
                  <div className="relative">
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className={`w-full h-[48px] px-[14px] pr-[36px] bg-white border border-[#cbd5e1] rounded-[6px] text-[16px] leading-[24px] appearance-none focus:outline-none focus:border-[#d50475] ${
                        country ? 'text-black' : 'text-[#64748b]'
                      }`}
                    >
                      <option value="">Elige tu país</option>
                      <option value="México">México</option>
                      <option value="España">España</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Argentina">Argentina</option>
                    </select>
                    <ChevronDown className="w-[18px] h-[18px] text-[#64748b] absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[16px] leading-[24px] font-normal text-black mb-[4px]">
                    Ciudad
                  </label>
                  <div className="relative">
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`w-full h-[48px] px-[14px] pr-[36px] bg-white border border-[#cbd5e1] rounded-[6px] text-[16px] leading-[24px] appearance-none focus:outline-none focus:border-[#d50475] ${
                        city ? 'text-black' : 'text-[#64748b]'
                      }`}
                    >
                      <option value="">Elige tu ciudad</option>
                      <option value="Ciudad de México">Ciudad de México</option>
                      <option value="Madrid">Madrid</option>
                      <option value="Monterrey">Monterrey</option>
                      <option value="Guadalajara">Guadalajara</option>
                      <option value="Barcelona">Barcelona</option>
                    </select>
                    <ChevronDown className="w-[18px] h-[18px] text-[#64748b] absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] mb-[32px]">
                <div className="flex flex-col">
                  <label className="text-[16px] leading-[24px] font-normal text-black mb-[4px]">
                    Código postal
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="Ej.: 28001"
                      className="w-full h-[48px] px-[14px] pr-[36px] bg-white border border-[#cbd5e1] rounded-[6px] text-[16px] leading-[24px] text-black placeholder:text-[#64748b] focus:outline-none focus:border-[#d50475]"
                    />
                    <ChevronDown className="w-[18px] h-[18px] text-[#64748b] absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[16px] leading-[24px] font-normal text-black mb-[4px]">
                    Zona horaria
                  </label>
                  <div className="relative">
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className={`w-full h-[48px] px-[14px] pr-[36px] bg-white border border-[#cbd5e1] rounded-[6px] text-[16px] leading-[24px] appearance-none focus:outline-none focus:border-[#d50475] ${
                        timezone ? 'text-black' : 'text-[#64748b]'
                      }`}
                    >
                      <option value="">Elige tu zona horaria</option>
                      <option value="GMT-6 (Ciudad de México)">GMT-6 (Ciudad de México)</option>
                      <option value="GMT+1 (Madrid)">GMT+1 (Madrid)</option>
                      <option value="GMT-5 (Bogotá)">GMT-5 (Bogotá)</option>
                    </select>
                    <ChevronDown className="w-[18px] h-[18px] text-[#64748b] absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="w-full h-[68px] bg-[#f8fafc] rounded-[8px] px-[16px] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="h-[36px] px-[12px] rounded-[6px] border border-[#cbd5e1] bg-white hover:bg-[#f1f5f9] text-[#0f172a] text-[14px] leading-[20px] font-medium transition-colors cursor-pointer"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="h-[36px] px-[16px] rounded-[6px] bg-[#d50475] hover:bg-[#b80364] text-white text-[14px] leading-[20px] font-medium transition-colors cursor-pointer"
                >
                  Finalizar
                </button>
              </div>
            </form>
          )}

        </div>
      </main>
    </div>
  );
};

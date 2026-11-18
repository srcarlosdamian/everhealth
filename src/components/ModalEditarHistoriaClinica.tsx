import React, { useState, useEffect } from 'react';
import { X, Info } from 'lucide-react';
import { Button } from '../design-system/atoms/Button';
import { TextInput } from '../design-system/atoms/TextInput';
import { Dropdown } from '../design-system/atoms/Dropdown';
import { Checkbox } from '../design-system/atoms/Checkbox';
import { SegmentedToggle } from '../design-system/atoms/SegmentedToggle';

interface ModalEditarHistoriaClinicaProps {
  isOpen: boolean;
  onClose: () => void;
  sectionId: string | null;
  onSaveSection?: (sectionId: string, updatedSummary: string) => void;
}

export const ModalEditarHistoriaClinica: React.FC<ModalEditarHistoriaClinicaProps> = ({
  isOpen,
  onClose,
  sectionId,
  onSaveSection,
}) => {
  // Datos Generales
  const [peso, setPeso] = useState('70');
  const [altura, setAltura] = useState('175');
  const [tension, setTension] = useState('120/80');
  const [glucosa, setGlucosa] = useState('92');
  const [colesterolLdl, setColesterolLdl] = useState('110');
  const [colesterolHdl, setColesterolHdl] = useState('55');

  // Alergias
  const [hasAlergias, setHasAlergias] = useState<'si' | 'no'>('si');
  const [alergiasAlimentarias, setAlergiasAlimentarias] = useState('Sin alergias alimentarias conocidas.');
  const [alergiasMedicamentos, setAlergiasMedicamentos] = useState('Sin alergias medicamentosas conocidas.');
  const [otrasAlergias, setOtrasAlergias] = useState('Alergia primaveral a gramíneas.');

  // Enfermedades
  const [hasEnfermedades, setHasEnfermedades] = useState<'si' | 'no'>('no');
  const [enfermedadesSeleccionadas, setEnfermedadesSeleccionadas] = useState<string[]>([
    'Enfermedades reumatológicas, óseas o musculares',
    'Enfermedades infecciosas',
  ]);

  // Quirúrgicas
  const [hasCirugias, setHasCirugias] = useState<'si' | 'no'>('si');
  const [cirugiasTexto, setCirugiasTexto] = useState('Apendicectomía laparoscópica en 2018 sin complicaciones.');

  // Medicamentos
  const [hasMedicamentos, setHasMedicamentos] = useState<'si' | 'no'>('no');
  const [medicamentosTexto, setMedicamentosTexto] = useState('Sin tratamiento farmacológico habitual activo.');

  // Sustancias Tóxicas
  const [hasSustancias, setHasSustancias] = useState<'si' | 'no'>('si');
  const [selectedSustancias, setSelectedSustancias] = useState<string[]>(['Alcohol']);
  const [sustanciasTexto, setSustanciasTexto] = useState('No fumador. Consumo ocasional moderado de alcohol en reuniones sociales.');

  // Alimentación
  const [hasAlimentacion, setHasAlimentacion] = useState<'si' | 'no'>('no');
  const [situacionAlimentacion, setSituacionAlimentacion] = useState('Dieta equilibrada');

  // Psicología / Bienestar Emocional
  const [hasEmocional, setHasEmocional] = useState<'si' | 'no'>('no');
  const [psicologiaTexto, setPsicologiaTexto] = useState('Cuestionario de bienestar emocional completado. Nivel de estrés: bajo.');

  // Biometría
  const [ppmBiometria, setPpmBiometria] = useState('71');
  const [hrvBiometria, setHrvBiometria] = useState('58');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !sectionId) return null;

  const calculateIMC = () => {
    const p = parseFloat(peso);
    const a = parseFloat(altura) / 100;
    if (p > 0 && a > 0) {
      return (p / (a * a)).toFixed(1);
    }
    return '22.9';
  };

  const handleSave = () => {
    let summary = '';
    if (sectionId === 'general') {
      summary = `Estatura: ${altura} cm, Peso: ${peso} kg, IMC: ${calculateIMC()} (Normopeso). Tensión: ${tension}.`;
    } else if (sectionId === 'alergias') {
      summary = hasAlergias === 'si'
        ? `${alergiasMedicamentos} ${otrasAlergias}`
        : 'Sin alergias conocidas.';
    } else if (sectionId === 'enfermedades') {
      summary = hasEnfermedades === 'si'
        ? enfermedadesSeleccionadas.join(', ')
        : 'Sin enfermedades crónicas ni antecedentes familiares relevantes.';
    } else if (sectionId === 'quirurgicas') {
      summary = hasCirugias === 'si' ? cirugiasTexto : 'Sin antecedentes quirúrgicos.';
    } else if (sectionId === 'medicamentos') {
      summary = hasMedicamentos === 'si' ? medicamentosTexto : 'Sin tratamiento farmacológico habitual activo.';
    } else if (sectionId === 'sustancias') {
      summary = hasSustancias === 'si' ? sustanciasTexto : 'No fumador. Sin consumo de sustancias tóxicas.';
    } else if (sectionId === 'alimentacion') {
      summary = `${situacionAlimentacion}. 3-4 comidas al día.`;
    } else if (sectionId === 'psicologia') {
      summary = psicologiaTexto;
    } else if (sectionId === 'biometria') {
      summary = `PPG facial: ${ppmBiometria} LPM regular. HRV: ${hrvBiometria} ms.`;
    }

    if (onSaveSection) {
      onSaveSection(sectionId, summary);
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-editar-historia-title"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fadeIn font-[family-name:Helvetica]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[700px] min-h-[380px] sm:min-h-[520px] max-h-[90vh] bg-white rounded-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-[#e2e8f0] flex flex-col overflow-hidden animate-scaleUp cursor-default"
      >
        {/* ================= HEADER DEL MODAL EDITABLE ================= */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#f1f5f9] flex items-center justify-between shrink-0 bg-white">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#d50475]">
              Historia clínica · Completar perfil médico
            </span>
            <h2 id="modal-editar-historia-title" className="text-[20px] font-bold text-black tracking-tight leading-snug">
              {sectionId === 'general' && 'Editar Datos generales'}
              {sectionId === 'alergias' && 'Editar Alergias'}
              {sectionId === 'enfermedades' && 'Editar Enfermedades'}
              {sectionId === 'quirurgicas' && 'Editar Intervenciones quirúrgicas'}
              {sectionId === 'medicamentos' && 'Editar Medicamentos'}
              {sectionId === 'sustancias' && 'Editar Consumo de sustancias tóxicas'}
              {sectionId === 'alimentacion' && 'Editar Alimentación'}
              {sectionId === 'psicologia' && 'Editar Bienestar emocional / Psicología'}
              {sectionId === 'biometria' && 'Editar Análisis Biométricos'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-[#f1f5f9] flex items-center justify-center text-[#64748b] hover:text-black cursor-pointer transition-colors shrink-0"
            title="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ================= CONTENIDO DEL FORMULARIO EDITABLE SCROLLEABLE ================= */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5 custom-scrollbar-minimal bg-white">
          
          {/* SECCIÓN 1: DATOS GENERALES */}
          {sectionId === 'general' && (
            <div className="flex flex-col gap-5">
              <p className="text-[13.5px] text-[#475569] leading-relaxed">
                Registro de medidas antropométricas básicas y parámetros clínicos opcionales de control.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <TextInput
                  label="Peso (kg)"
                  type="number"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                  placeholder="70"
                />
                <TextInput
                  label="Altura (cm)"
                  type="number"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  placeholder="175"
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-normal text-black leading-tight">IMC (Calculado)</label>
                  <input
                    type="text"
                    readOnly
                    value={`${calculateIMC()} (Normopeso)`}
                    className="w-full h-[44px] px-4 rounded-[8px] border border-[#cbd5e1] bg-[#f8fafc] text-[15px] text-black font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] flex items-start gap-2.5 text-[12px]">
                <Info className="w-4 h-4 text-[#64748b] shrink-0 mt-0.5" />
                <span className="text-[#475569]">
                  Parámetros clínicos adicionales: puedes actualizar tu presión arterial y glucosa para seguimiento médico.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Tensión arterial (mmHg)"
                  value={tension}
                  onChange={(e) => setTension(e.target.value)}
                  placeholder="120/80"
                />
                <TextInput
                  label="Glucosa (mg/dl)"
                  value={glucosa}
                  onChange={(e) => setGlucosa(e.target.value)}
                  placeholder="92"
                />
                <TextInput
                  label="Colesterol LDL (mg/dl)"
                  value={colesterolLdl}
                  onChange={(e) => setColesterolLdl(e.target.value)}
                  placeholder="110"
                />
                <TextInput
                  label="Colesterol HDL (mg/dl)"
                  value={colesterolHdl}
                  onChange={(e) => setColesterolHdl(e.target.value)}
                  placeholder="55"
                />
              </div>
            </div>
          )}

          {/* SECCIÓN 2: ALERGIAS */}
          {sectionId === 'alergias' && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2.5">
                <label className="text-[14px] font-bold text-black">
                  ¿Tienes alergia a algún medicamento o alimento?
                </label>
                <div>
                  <SegmentedToggle
                    value={hasAlergias}
                    onChange={(val) => setHasAlergias(val as 'si' | 'no')}
                  />
                </div>
              </div>

              {hasAlergias === 'si' ? (
                <div className="flex flex-col gap-4 pt-2 border-t border-[#f1f5f9]">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[14px] font-normal text-black leading-tight">
                      Alergias a medicamentos
                    </label>
                    <textarea
                      rows={2}
                      value={alergiasMedicamentos}
                      onChange={(e) => setAlergiasMedicamentos(e.target.value)}
                      placeholder="Indica medicamentos que te causen reacción..."
                      className="w-full p-3.5 rounded-[8px] border border-[#cbd5e1] bg-white text-[14px] text-black placeholder:text-[#94a3b8] focus:outline-none focus:border-black transition-colors font-normal leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[14px] font-normal text-black leading-tight">
                      Alergias alimentarias
                    </label>
                    <textarea
                      rows={2}
                      value={alergiasAlimentarias}
                      onChange={(e) => setAlergiasAlimentarias(e.target.value)}
                      placeholder="Indica alimentos que te causen reacción..."
                      className="w-full p-3.5 rounded-[8px] border border-[#cbd5e1] bg-white text-[14px] text-black placeholder:text-[#94a3b8] focus:outline-none focus:border-black transition-colors font-normal leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[14px] font-normal text-black leading-tight">
                      Otras alergias (polen, ácaros, etc.)
                    </label>
                    <textarea
                      rows={2}
                      value={otrasAlergias}
                      onChange={(e) => setOtrasAlergias(e.target.value)}
                      placeholder="Indica otras sustancias o agentes ambientales..."
                      className="w-full p-3.5 rounded-[8px] border border-[#cbd5e1] bg-white text-[14px] text-black placeholder:text-[#94a3b8] focus:outline-none focus:border-black transition-colors font-normal leading-relaxed"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 pt-2 border-t border-[#f1f5f9]">
                  <div className="p-4 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0] text-[14px] text-[#475569] leading-relaxed flex items-start gap-3 mt-1">
                    <Info className="w-5 h-5 text-[#64748b] shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-black text-[14px]">Sin alergias conocidas</p>
                      <p className="text-[13px] text-[#64748b] leading-relaxed">
                        Has indicado que no presentas alergias a medicamentos, alimentos ni a otros agentes ambientales.
                        Al guardar cambios, tu historial clínico reflejará que no tienes alergias conocidas.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECCIÓN 3: ENFERMEDADES */}
          {sectionId === 'enfermedades' && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2.5">
                <label className="text-[14px] font-bold text-black">
                  ¿Tienes o has tenido alguna enfermedad importante?
                </label>
                <div>
                  <SegmentedToggle
                    value={hasEnfermedades}
                    onChange={(val) => setHasEnfermedades(val as 'si' | 'no')}
                  />
                </div>
              </div>

              {hasEnfermedades === 'si' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#f1f5f9]">
                  {[
                    { title: 'Enfermedades cardíacas, pulmonares o vasculares', desc: 'Indica el diagnóstico y el tratamiento' },
                    { title: 'Enfermedades metabólicas o digestivas', desc: 'Indica el diagnóstico y el tratamiento' },
                    { title: 'Enfermedades reumatológicas, óseas o musculares', desc: 'Zonas afectadas y evolución' },
                    { title: 'Enfermedades del sistema nervioso, los ojos o el oído', desc: 'Síntomas principales' },
                    { title: 'Enfermedades hematológicas', desc: 'Tratamiento recibido de la sangre' },
                    { title: 'Enfermedades renales o urológicas', desc: 'Riñones o vías urinarias' },
                    { title: 'Salud mental', desc: 'Tratamiento psicológico o psiquiátrico' },
                    { title: 'Enfermedades infecciosas', desc: 'Infección relevante pasada o actual' },
                    { title: 'Enfermedades dermatológicas', desc: 'Enfermedad de la piel' },
                    { title: 'Cáncer', desc: 'Tipo y fecha aproximada del diagnóstico' },
                  ].map((item, idx) => {
                    const isChecked = enfermedadesSeleccionadas.includes(item.title);
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setEnfermedadesSeleccionadas((prev) =>
                            prev.includes(item.title) ? prev.filter((i) => i !== item.title) : [...prev, item.title]
                          );
                        }}
                        className={`p-3.5 rounded-none border flex items-start gap-3 cursor-pointer select-none transition-all ${
                          isChecked
                            ? 'border-[#cbd5e1] bg-[#f8fafc] shadow-xs'
                            : 'border-[#e2e8f0] bg-white hover:border-[#cbd5e1] hover:bg-[#f8fafc]'
                        }`}
                      >
                        <Checkbox checked={isChecked} size="sm" className="mt-0.5" />
                        <div className="flex flex-col">
                          <span className="text-[13px] font-bold text-black leading-snug">{item.title}</span>
                          <span className="text-[11px] text-[#64748b] leading-tight mt-0.5">{item.desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-4 pt-2 border-t border-[#f1f5f9]">
                  <div className="p-4 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0] text-[14px] text-[#475569] leading-relaxed flex items-start gap-3 mt-1">
                    <Info className="w-5 h-5 text-[#64748b] shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-black text-[14px]">Sin enfermedades crónicas conocidas</p>
                      <p className="text-[13px] text-[#64748b] leading-relaxed">
                        Has indicado que no presentas antecedentes patológicos relevantes. Tu historial clínico se mantendrá actualizado sin antecedentes médicos personales significativos.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECCIÓN 4: QUIRÚRGICAS */}
          {sectionId === 'quirurgicas' && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2.5">
                <label className="text-[14px] font-bold text-black">
                  ¿Te han realizado alguna intervención quirúrgica?
                </label>
                <div>
                  <SegmentedToggle
                    value={hasCirugias}
                    onChange={(val) => setHasCirugias(val as 'si' | 'no')}
                  />
                </div>
              </div>

              {hasCirugias === 'si' ? (
                <div className="flex flex-col gap-1.5 pt-2 border-t border-[#f1f5f9]">
                  <label className="text-[14px] font-normal text-black leading-tight">
                    ¿Qué intervenciones quirúrgicas te han realizado?
                  </label>
                  <textarea
                    rows={4}
                    value={cirugiasTexto}
                    onChange={(e) => setCirugiasTexto(e.target.value)}
                    placeholder="Indica el tipo de intervención y la fecha aproximada."
                    className="w-full p-3.5 rounded-[8px] border border-[#cbd5e1] bg-white text-[14px] text-black placeholder:text-[#94a3b8] focus:outline-none focus:border-black transition-colors font-normal leading-relaxed"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-4 pt-2 border-t border-[#f1f5f9]">
                  <div className="p-4 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0] text-[14px] text-[#475569] leading-relaxed flex items-start gap-3 mt-1">
                    <Info className="w-5 h-5 text-[#64748b] shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-black text-[14px]">Sin antecedentes quirúrgicos</p>
                      <p className="text-[13px] text-[#64748b] leading-relaxed">
                        Has indicado que no te han realizado cirugías previas relevantes.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECCIÓN 5: MEDICAMENTOS */}
          {sectionId === 'medicamentos' && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2.5">
                <label className="text-[14px] font-bold text-black">
                  ¿Tomas algún medicamento de forma habitual?
                </label>
                <div>
                  <SegmentedToggle
                    value={hasMedicamentos}
                    onChange={(val) => setHasMedicamentos(val as 'si' | 'no')}
                  />
                </div>
              </div>

              {hasMedicamentos === 'si' ? (
                <div className="flex flex-col gap-1.5 pt-2 border-t border-[#f1f5f9]">
                  <label className="text-[14px] font-normal text-black leading-tight">
                    ¿Qué medicamentos tomas?
                  </label>
                  <textarea
                    rows={4}
                    value={medicamentosTexto}
                    onChange={(e) => setMedicamentosTexto(e.target.value)}
                    placeholder="Indica el nombre de cada medicamento, la dosis y la frecuencia."
                    className="w-full p-3.5 rounded-[8px] border border-[#cbd5e1] bg-white text-[14px] text-black placeholder:text-[#94a3b8] focus:outline-none focus:border-black transition-colors font-normal leading-relaxed"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-4 pt-2 border-t border-[#f1f5f9]">
                  <div className="p-4 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0] text-[14px] text-[#475569] leading-relaxed flex items-start gap-3 mt-1">
                    <Info className="w-5 h-5 text-[#64748b] shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-black text-[14px]">Sin tratamiento farmacológico habitual</p>
                      <p className="text-[13px] text-[#64748b] leading-relaxed">
                        Has indicado que actualmente no tomas medicamentos crónicos ni tratamientos continuados.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECCIÓN 6: SUSTANCIAS TÓXICAS */}
          {sectionId === 'sustancias' && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2.5">
                <label className="text-[14px] font-bold text-black">
                  ¿Consumes alcohol, tabaco u otras drogas?
                </label>
                <div>
                  <SegmentedToggle
                    value={hasSustancias}
                    onChange={(val) => setHasSustancias(val as 'si' | 'no')}
                  />
                </div>
              </div>

              {hasSustancias === 'si' ? (
                <div className="flex flex-col gap-4 pt-2 border-t border-[#f1f5f9]">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['Alcohol', 'Tabaco', 'Otras drogas'].map((item) => {
                      const isChecked = selectedSustancias.includes(item);
                      return (
                        <div
                          key={item}
                          onClick={() => {
                            setSelectedSustancias((prev) =>
                              prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
                            );
                          }}
                          className={`p-3.5 rounded-none border flex items-center gap-2.5 cursor-pointer text-[13px] text-black font-medium transition-all select-none ${
                            isChecked
                              ? 'border-[#cbd5e1] bg-[#f8fafc] shadow-xs'
                              : 'border-[#e2e8f0] bg-white hover:border-[#cbd5e1] hover:bg-[#f8fafc]'
                          }`}
                        >
                          <Checkbox checked={isChecked} size="sm" />
                          <span>{item}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[14px] font-normal text-black leading-tight">
                      ¿Qué cantidad consumes y con qué frecuencia?
                    </label>
                    <textarea
                      rows={3}
                      value={sustanciasTexto}
                      onChange={(e) => setSustanciasTexto(e.target.value)}
                      placeholder="Indica la cantidad y la frecuencia de consumo."
                      className="w-full p-3.5 rounded-[8px] border border-[#cbd5e1] bg-white text-[14px] text-black placeholder:text-[#94a3b8] focus:outline-none focus:border-black transition-colors font-normal leading-relaxed"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 pt-2 border-t border-[#f1f5f9]">
                  <div className="p-4 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0] text-[14px] text-[#475569] leading-relaxed flex items-start gap-3 mt-1">
                    <Info className="w-5 h-5 text-[#64748b] shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-black text-[14px]">Sin consumo de sustancias tóxicas</p>
                      <p className="text-[13px] text-[#64748b] leading-relaxed">
                        Has indicado que no consumes tabaco, alcohol ni otras sustancias tóxicas.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECCIÓN 7: ALIMENTACIÓN */}
          {sectionId === 'alimentacion' && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2.5">
                <label className="text-[14px] font-bold text-black">
                  ¿Consideras que tienes alguna dificultad relacionada con tu alimentación?
                </label>
                <div>
                  <SegmentedToggle
                    value={hasAlimentacion}
                    onChange={(val) => setHasAlimentacion(val as 'si' | 'no')}
                  />
                </div>
              </div>

              <div className="max-w-[480px] pt-2 border-t border-[#f1f5f9]">
                <Dropdown
                  label="¿Cuál es tu situación habitual?"
                  value={situacionAlimentacion}
                  onChange={setSituacionAlimentacion}
                  options={[
                    'Dieta equilibrada',
                    'Apetito disminuido',
                    'Restricción de gluten/lactosa',
                    'Trastorno de la conducta alimentaria',
                  ]}
                />
              </div>
            </div>
          )}

          {/* SECCIÓN 8: PSICOLOGÍA / BIENESTAR EMOCIONAL */}
          {sectionId === 'psicologia' && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2.5">
                <label className="text-[14px] font-bold text-black">
                  ¿Has vivido alguna situación difícil de superar en los últimos dos años?
                </label>
                <div>
                  <SegmentedToggle
                    value={hasEmocional}
                    onChange={(val) => setHasEmocional(val as 'si' | 'no')}
                  />
                </div>
              </div>

              {hasEmocional === 'si' ? (
                <div className="flex flex-col gap-1.5 pt-2 border-t border-[#f1f5f9]">
                  <label className="text-[14px] font-normal text-black leading-tight">
                    Detalles de bienestar emocional y descanso
                  </label>
                  <textarea
                    rows={4}
                    value={psicologiaTexto}
                    onChange={(e) => setPsicologiaTexto(e.target.value)}
                    placeholder="Describe cómo te has sentido a nivel anímico o de estrés."
                    className="w-full p-3.5 rounded-[8px] border border-[#cbd5e1] bg-white text-[14px] text-black placeholder:text-[#94a3b8] focus:outline-none focus:border-black transition-colors font-normal leading-relaxed"
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-4 pt-2 border-t border-[#f1f5f9]">
                  <div className="p-4 rounded-[8px] bg-[#f8fafc] border border-[#e2e8f0] text-[14px] text-[#475569] leading-relaxed flex items-start gap-3 mt-1">
                    <Info className="w-5 h-5 text-[#64748b] shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-black text-[14px]">Bienestar emocional estable</p>
                      <p className="text-[13px] text-[#64748b] leading-relaxed">
                        Has indicado que no has vivido situaciones recientes que afecten significativamente tu bienestar o nivel de descanso.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SECCIÓN 9: ANÁLISIS BIOMÉTRICOS */}
          {sectionId === 'biometria' && (
            <div className="flex flex-col gap-5">
              <p className="text-[13.5px] text-[#475569] leading-relaxed">
                Últimos registros de parámetros biométricos obtenidos mediante fotopletismografía facial.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextInput
                  label="Frecuencia Cardíaca (LPM)"
                  type="number"
                  value={ppmBiometria}
                  onChange={(e) => setPpmBiometria(e.target.value)}
                  placeholder="71"
                />
                <TextInput
                  label="Variabilidad Cardíaca - HRV (ms)"
                  type="number"
                  value={hrvBiometria}
                  onChange={(e) => setHrvBiometria(e.target.value)}
                  placeholder="58"
                />
              </div>
            </div>
          )}

        </div>

        {/* ================= FOOTER DEL MODAL HOMOLOGADO ================= */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-t border-[#f1f5f9] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 shrink-0 bg-white">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto h-[40px] px-6 text-[13px] font-bold uppercase rounded-[8px]"
          >
            CANCELAR
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            className="w-full sm:w-auto h-[40px] px-6 text-[13px] font-bold uppercase rounded-[8px]"
          >
            GUARDAR CAMBIOS
          </Button>
        </div>

      </div>
    </div>
  );
};

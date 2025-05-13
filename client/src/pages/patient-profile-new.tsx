import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

// Tipos para los datos del paciente
interface PatientData {
  name: string;
  lastName: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  weight: number;
  height: number;
  isSmoker: boolean;
  insurance: string;
}

// Tipo para medicamentos
interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  category: "diabetes" | "hipertension" | "otro";
  adherence: number;
  nextDose: string;
}

export default function PatientProfileNew() {
  // Estado para controlar la visibilidad del sidebar en móvil
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Estado para controlar la visibilidad del botón hamburguesa al hacer scroll
  const [showMenuButton, setShowMenuButton] = useState(true);
  
  // Detector de dispositivo móvil y control de scroll para el botón hamburguesa
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Control de scroll para ocultar/mostrar el botón hamburguesa
    const handleScroll = () => {
      // Si el usuario ha scrolleado más de 100px, ocultamos el botón
      // O si el sidebar está abierto, mantenemos el botón visible
      if (sidebarOpen) {
        setShowMenuButton(true);
      } else {
        setShowMenuButton(window.scrollY < 100);
      }
    };
    
    // Verificar al cargar y cuando cambie el tamaño de la ventana
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sidebarOpen]);
  
  // Estados de diálogos
  const [showEditProfileDialog, setShowEditProfileDialog] = useState(false);
  const [showConfirmLogoutDialog, setShowConfirmLogoutDialog] = useState(false);
  const [showAddMedicationDialog, setShowAddMedicationDialog] = useState(false);
  
  // Estado del paciente
  const [patientData, setPatientData] = useState<PatientData>({
    name: "José",
    lastName: "Ponce Ávila",
    age: 56,
    phone: "(+52) 55 1234 5678",
    email: "joseponce@email.com",
    address: "Av. Insurgentes Sur 1582, CDMX",
    weight: 95,
    height: 175,
    isSmoker: false,
    insurance: "IMSS"
  });
  
  // Estado de medicamentos
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Metformina",
      dosage: "850mg - 1 pastilla después del desayuno y cena",
      frequency: "2 veces al día",
      category: "diabetes",
      adherence: 96,
      nextDose: "Hoy 20:00"
    },
    {
      id: "2",
      name: "Glibenclamida",
      dosage: "5mg - 1 pastilla antes del desayuno",
      frequency: "1 vez al día",
      category: "diabetes",
      adherence: 82,
      nextDose: "Mañana 7:30"
    },
    {
      id: "3",
      name: "Losartán",
      dosage: "50mg - 1 pastilla en la mañana",
      frequency: "1 vez al día",
      category: "hipertension",
      adherence: 100,
      nextDose: "Mañana 8:00"
    }
  ]);
  
  // Estado del formulario de nuevo medicamento
  const [newMedication, setNewMedication] = useState<Omit<Medication, "id" | "adherence">>({
    name: "",
    dosage: "",
    frequency: "",
    category: "diabetes",
    nextDose: ""
  });
  
  // Manejador para guardar cambios del perfil
  const handleSaveProfile = () => {
    setShowEditProfileDialog(false);
    toast({
      title: "Perfil actualizado",
      description: "Los datos del perfil han sido actualizados exitosamente.",
    });
  };
  
  // Manejador para agregar medicamento
  const handleAddMedication = () => {
    if (!newMedication.name || !newMedication.dosage) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, completa al menos el nombre y la dosis del medicamento.",
        variant: "destructive"
      });
      return;
    }
    
    const medicationToAdd = {
      ...newMedication,
      id: Date.now().toString(),
      adherence: 100
    };
    
    setMedications([...medications, medicationToAdd]);
    setNewMedication({
      name: "",
      dosage: "",
      frequency: "",
      category: "diabetes",
      nextDose: ""
    });
    setShowAddMedicationDialog(false);
    
    toast({
      title: "Medicamento agregado",
      description: `${medicationToAdd.name} ha sido agregado a tu medicación activa.`,
    });
  };
  return (
    <div className="relative flex flex-col md:flex-row min-h-screen">
      {/* Botón de menú móvil - se oculta al hacer scroll hacia abajo */}
      {isMobile && showMenuButton && (
        <button 
          className="fixed top-4 left-4 z-50 p-2 bg-[--blue-main] rounded-md text-white shadow-md transition-opacity duration-300"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg 
            className="h-6 w-6" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {sidebarOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      )}
    
      {/* Barra lateral - Cambia en móvil vs desktop */}
      <div className={`${isMobile ? 'fixed z-40 inset-y-0 left-0 transform transition-transform duration-300 ease-in-out' : 'w-[220px]'} 
        ${isMobile && !sidebarOpen ? '-translate-x-full' : 'translate-x-0'} 
        bg-[--blue-light] border-r py-4 px-2 md:relative md:block`}>
        <div className="mb-8 px-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[--blue-main] rounded-md flex items-center justify-center">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path 
                  d="M8 3.5C5.2 3.5 3 5.7 3 8.5C3 12 5.5 15 12 20.5C18.5 15 21 12 21 8.5C21 5.7 18.8 3.5 16 3.5C14.3 3.5 12.9 4.3 12 5.5C11.1 4.3 9.7 3.5 8 3.5Z" 
                  stroke="currentColor" 
                  strokeWidth="1.8" 
                  fill="none"
                />
              </svg>
            </div>
            <span className="font-semibold text-[--black-soft]">CronApp</span>
          </div>
        </div>

        <nav className="space-y-1">
          <a href="/patient-profile-new" className="flex items-center py-2 px-4 text-sm bg-[--blue-main] text-white font-medium rounded-md shadow-sm">
            <svg className="mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Inicio
          </a>

          <a href="/diabetes" className="flex items-center py-2 px-4 text-sm text-[--black-soft] rounded-md hover:bg-white hover:shadow-sm transition-all">
            <svg className="mr-3 h-5 w-5 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 10v12"></path>
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
            </svg>
            Diabetes
          </a>

          <a href="/hypertension" className="flex items-center py-2 px-4 text-sm text-[--black-soft] rounded-md hover:bg-white hover:shadow-sm transition-all">
            <svg className="mr-3 h-5 w-5 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="8 14 12 10 16 14"></polyline>
            </svg>
            Hipertensión
          </a>
        </nav>

        <Separator className="my-4" />

        <h3 className="px-4 text-xs font-medium text-[--gray-medium] uppercase tracking-wider mb-2">Módulos Educativos</h3>
        <nav className="space-y-1">
          <a href="#" className="flex items-center py-2 px-4 text-sm text-[--black-soft] rounded-md hover:bg-white hover:shadow-sm transition-all">
            <svg className="mr-3 h-5 w-5 text-[--cyan-info]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Videos Educativos
          </a>
        </nav>
      </div>

      {/* Overlay para cerrar el sidebar en móvil cuando está abierto */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Contenido principal - con padding adicional en mobile para el botón hamburguesa */}
      <div className="flex-1 p-4 md:p-6 bg-[--gray-light]">
        <div className={`max-w-5xl mx-auto ${isMobile ? 'pt-8' : ''}`}>
          <header className="mb-6">
            <div className="flex justify-end items-center mb-4">
              {/* Área del header ahora con justify-end para mover todo a la derecha */}
              <div className="flex items-center space-x-2 md:space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <div className="flex items-center cursor-pointer hover:bg-[--blue-light]/20 p-2 rounded-lg transition-colors">
                      <div className="relative">
                        <svg className="h-6 w-6 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[--red-alert]"></span>
                      </div>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 mt-1 shadow-lg">
                    <DropdownMenuLabel className="text-[--blue-main] flex justify-between items-center">
                      <span>Notificaciones</span>
                      <span className="bg-[--red-alert] text-white text-xs px-1.5 py-0.5 rounded-full">2</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-64 overflow-y-auto">
                      <DropdownMenuItem className="cursor-pointer p-3 hover:bg-[--blue-light]/10">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-[--black-soft] text-sm">Resultado de análisis listo</span>
                            <span className="text-xs text-[--gray-medium]">Hoy</span>
                          </div>
                          <p className="text-xs text-[--gray-medium]">Su resultado de análisis de glucosa está disponible para revisar.</p>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer p-3 hover:bg-[--blue-light]/10">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-[--black-soft] text-sm">Recordatorio de cita</span>
                            <span className="text-xs text-[--gray-medium]">Ayer</span>
                          </div>
                          <p className="text-xs text-[--gray-medium]">Tiene una consulta de seguimiento programada para mañana a las 10:00 AM.</p>
                        </div>
                      </DropdownMenuItem>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer flex justify-center text-[--blue-main] text-sm hover:bg-[--blue-light]/10">
                      Ver todas las notificaciones
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <div className="flex items-center gap-2 cursor-pointer hover:bg-[--blue-light]/20 p-2 rounded-lg transition-colors">
                      <div className="h-8 w-8 rounded-full bg-[--blue-main] flex items-center justify-center text-white font-medium shadow-sm">
                        J
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-[--black-soft]">José Ponce A</span>
                        <span className="text-xs text-[--gray-medium]">Paciente</span>
                      </div>
                      <svg className="h-4 w-4 text-[--gray-medium]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-1 shadow-lg">
                    <DropdownMenuLabel className="text-[--blue-main]">Mi cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer flex items-center gap-2 text-[--black-soft]"
                      onClick={() => setShowEditProfileDialog(true)}
                    >
                      <svg className="h-4 w-4 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <path d="M20 8v6"></path>
                        <path d="M23 11h-6"></path>
                      </svg>
                      Editar perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-[--black-soft]">
                      <svg className="h-4 w-4 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
                        <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                        <path d="M12 2v2"></path>
                        <path d="M12 22v-2"></path>
                        <path d="m17 20.66-1-1.73"></path>
                        <path d="M11 10.27 7 3.34"></path>
                        <path d="m20.66 17-1.73-1"></path>
                        <path d="m3.34 7 1.73 1"></path>
                        <path d="M14 12h8"></path>
                        <path d="M2 12h2"></path>
                        <path d="m20.66 7-1.73 1"></path>
                        <path d="m3.34 17 1.73-1"></path>
                        <path d="m17 3.34-1 1.73"></path>
                        <path d="m7 20.66 1-1.73"></path>
                      </svg>
                      Configuración
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer flex items-center gap-2 text-[--red-alert]"
                      onClick={() => setShowConfirmLogoutDialog(true)}
                    >
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Datos del paciente */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-[--blue-main] mb-4">Datos del paciente</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5">
                  <div className="flex items-center">
                    <div className="w-14 h-14 flex-shrink-0 rounded-full bg-[--blue-main] flex items-center justify-center text-xl font-bold text-white shadow-sm">
                      {patientData.name.charAt(0)}{patientData.lastName.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium text-[--black-soft]">{patientData.name} {patientData.lastName}</h3>
                      <p className="text-sm text-[--gray-medium]">{patientData.age} años</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5">
                  <h3 className="text-sm font-medium text-[--blue-main] mb-2">Información de Contacto</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <svg className="mr-2 h-4 w-4 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span className="text-[--black-soft]">{patientData.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg className="mr-2 h-4 w-4 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span className="text-[--black-soft]">{patientData.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg className="mr-2 h-4 w-4 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span className="text-[--black-soft]">{patientData.address}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5">
                  <h3 className="text-sm font-medium text-[--blue-main] mb-2">Datos Basales</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <svg className="mr-2 h-4 w-4 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 20h20"></path>
                        <path d="M6 16V4"></path>
                        <path d="M10 16V10"></path>
                        <path d="M14 16v-6"></path>
                        <path d="M18 16V8"></path>
                      </svg>
                      <span className="text-[--black-soft]">Peso: {patientData.weight} kg</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg className="mr-2 h-4 w-4 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="2" x2="12" y2="6"></line>
                        <line x1="12" y1="18" x2="12" y2="22"></line>
                        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                        <line x1="2" y1="12" x2="6" y2="12"></line>
                        <line x1="18" y1="12" x2="22" y2="12"></line>
                        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                      </svg>
                      <span className="text-[--black-soft]">Estatura: {patientData.height} cm</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg className="mr-2 h-4 w-4 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 10h-4V4h-4v6H6l6 6 6-6z"></path>
                        <path d="M6 16v4h12v-4"></path>
                      </svg>
                      <span className="text-[--black-soft]">Fumador: {patientData.isSmoker ? 'Sí' : 'No'}</span>
                    </div>
                    <div className="flex items-center text-sm mt-1">
                      <svg className="mr-2 h-4 w-4 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                      <span className="text-[--black-soft]">Seguro: {patientData.insurance}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Button 
                className="bg-[--blue-main] hover:bg-[--blue-main]/90 text-white border-none shadow-sm"
                onClick={() => setShowEditProfileDialog(true)}
              >
                Editar perfil
              </Button>
              <Button className="bg-white hover:bg-[--blue-light] text-[--blue-main] border border-[--blue-main]/30 shadow-sm">Formulario</Button>
            </div>
          </div>

          {/* Panel de resumen de estado de salud */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-[--blue-main] mb-4">Resumen de Salud</h2>
            <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Indicador de glucosa */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-[--yellow-warning]">
                      <span className="text-lg font-bold text-[--black-soft]">145</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-[--black-soft]">Glucosa</h3>
                      <p className="text-sm text-[--gray-medium]">Promedio: 145 mg/dL</p>
                      <div className="mt-1 flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[--yellow-warning]"></div>
                        <span className="text-xs text-[--yellow-warning] font-medium">Elevada</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Indicador de presión arterial */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full flex flex-col items-center justify-center border-4 border-[--green-success]">
                      <span className="text-sm font-bold text-[--black-soft]">125/82</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-[--black-soft]">Presión arterial</h3>
                      <p className="text-sm text-[--gray-medium]">Promedio: 125/82 mmHg</p>
                      <div className="mt-1 flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[--green-success]"></div>
                        <span className="text-xs text-[--green-success] font-medium">Normal</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Indicador de IMC */}
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-[--red-alert]">
                      <span className="text-lg font-bold text-[--black-soft]">31.2</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-[--black-soft]">IMC</h3>
                      <p className="text-sm text-[--gray-medium]">Peso: 95 kg, Altura: 175 cm</p>
                      <div className="mt-1 flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[--red-alert]"></div>
                        <span className="text-xs text-[--red-alert] font-medium">Obesidad</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>



          {/* Gráficos */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-[--blue-main] mb-4">Gráficos semanales</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gráfico de Glucemia */}
              <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5">
                  <h3 className="text-sm font-medium text-[--blue-main] mb-4">Gráfico Semanal de Glucemia</h3>
                  <div className="aspect-video bg-white rounded-lg flex items-center justify-center p-6 border border-[--blue-light]">
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[--blue-light]">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="3" y1="9" x2="21" y2="9"></line>
                          <line x1="9" y1="21" x2="9" y2="9"></line>
                        </svg>
                      </div>
                      <p className="text-sm text-[--black-soft] font-medium">No tenemos datos para mostrar</p>
                      <p className="text-xs text-[--gray-medium] mt-1">Haz click aquí para poder agregar datos</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button className="bg-[--blue-main] hover:bg-[--blue-main]/90 text-white" size="sm">Agregar medición</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Gráfico de Presión sanguínea */}
              <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5">
                  <h3 className="text-sm font-medium text-[--blue-main] mb-4">Gráfico semanal de Presión sanguínea</h3>
                  <div className="aspect-video bg-white rounded-lg flex items-center justify-center p-6 border border-[--blue-light]">
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[--blue-light]">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="3" y1="9" x2="21" y2="9"></line>
                          <line x1="9" y1="21" x2="9" y2="9"></line>
                        </svg>
                      </div>
                      <p className="text-sm text-[--black-soft] font-medium">No tenemos datos para mostrar</p>
                      <p className="text-xs text-[--gray-medium] mt-1">Haz click aquí para poder agregar datos</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button className="bg-[--blue-main] hover:bg-[--blue-main]/90 text-white" size="sm">Agregar medición</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Metas y tendencias */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-[--blue-main] mb-4">Metas y Tendencias</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {/* Gráfico de tendencia de glucosa */}
              <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-[--black-soft]">Glucosa</h3>
                    <div className="flex items-center">
                      <svg 
                        className="h-5 w-5 text-[--green-success]" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6-6 6 6"/>
                        <path d="M6 12h12"/>
                        <path d="m6 15 6 6 6-6"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Mini gráfico de tendencia */}
                  <div className="h-12 w-full bg-white rounded mb-3 p-2 border border-[--blue-light]">
                    <div className="flex items-end justify-between h-full space-x-1">
                      <div className="w-1/7 h-[30%] bg-[--blue-main] rounded-t"></div>
                      <div className="w-1/7 h-[50%] bg-[--blue-main] rounded-t"></div>
                      <div className="w-1/7 h-[40%] bg-[--blue-main] rounded-t"></div>
                      <div className="w-1/7 h-[60%] bg-[--blue-main] rounded-t"></div>
                      <div className="w-1/7 h-[70%] bg-[--blue-main] rounded-t"></div>
                      <div className="w-1/7 h-[60%] bg-[--blue-main] rounded-t"></div>
                      <div className="w-1/7 h-[80%] bg-[--blue-main] rounded-t"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-[--gray-medium]">Meta: 120 mg/dL</p>
                      <div className="mt-1">
                        <Progress value={65} className="h-2 w-36" />
                      </div>
                    </div>
                    <Badge className="bg-[--yellow-warning] text-white">+25 mg/dL</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Gráfico de tendencia de presión arterial */}
              <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-[--black-soft]">Presión Arterial</h3>
                    <div className="flex items-center">
                      <svg 
                        className="h-5 w-5 text-[--red-alert]" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="m18 15-6-6-6 6"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Mini gráfico de tendencia */}
                  <div className="h-12 w-full bg-white rounded mb-3 p-2 border border-[--blue-light]">
                    <div className="flex items-end justify-between h-full space-x-1">
                      <div className="w-1/7 h-[50%] bg-[--red-alert] rounded-t"></div>
                      <div className="w-1/7 h-[60%] bg-[--red-alert] rounded-t"></div>
                      <div className="w-1/7 h-[65%] bg-[--red-alert] rounded-t"></div>
                      <div className="w-1/7 h-[70%] bg-[--red-alert] rounded-t"></div>
                      <div className="w-1/7 h-[60%] bg-[--red-alert] rounded-t"></div>
                      <div className="w-1/7 h-[75%] bg-[--red-alert] rounded-t"></div>
                      <div className="w-1/7 h-[80%] bg-[--red-alert] rounded-t"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-[--gray-medium]">Meta: 120/80 mmHg</p>
                      <div className="mt-1">
                        <Progress value={40} className="h-2 w-36" />
                      </div>
                    </div>
                    <Badge className="bg-[--red-alert] text-white">+10 mmHg</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Gráfico de tendencia de peso */}
              <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-[--black-soft]">Peso</h3>
                    <div className="flex items-center">
                      <svg 
                        className="h-5 w-5 text-[--green-success]" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="m18 15-6-6-6 6"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Mini gráfico de tendencia */}
                  <div className="h-12 w-full bg-white rounded mb-3 p-2 border border-[--blue-light]">
                    <div className="flex items-end justify-between h-full space-x-1">
                      <div className="w-1/7 h-[80%] bg-[--green-success] rounded-t"></div>
                      <div className="w-1/7 h-[75%] bg-[--green-success] rounded-t"></div>
                      <div className="w-1/7 h-[70%] bg-[--green-success] rounded-t"></div>
                      <div className="w-1/7 h-[65%] bg-[--green-success] rounded-t"></div>
                      <div className="w-1/7 h-[60%] bg-[--green-success] rounded-t"></div>
                      <div className="w-1/7 h-[58%] bg-[--green-success] rounded-t"></div>
                      <div className="w-1/7 h-[55%] bg-[--green-success] rounded-t"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-[--gray-medium]">Meta: 70 kg</p>
                      <div className="mt-1">
                        <Progress value={78} className="h-2 w-36" />
                      </div>
                    </div>
                    <Badge className="bg-[--green-success] text-white">-2.5 kg</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Medicación activa */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-[--blue-main] mb-4">Medicación Activa</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5">
                  <h3 className="text-sm font-medium text-[--blue-main] mb-4">Medicamentos para Diabetes</h3>
                  
                  <div className="space-y-4">
                    {medications.filter(med => med.category === "diabetes").map(medication => (
                      <div key={medication.id} className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[--blue-light] flex items-center justify-center">
                          <svg className="h-5 w-5 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                          </svg>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-medium text-[--black-soft]">{medication.name}</h4>
                            <Badge 
                              className={
                                medication.adherence >= 90 
                                ? "bg-[--green-success]/90" 
                                : medication.adherence >= 70 
                                ? "bg-[--yellow-warning]/90" 
                                : "bg-[--red-alert]/90"
                              }
                            >
                              {medication.adherence}% Adherencia
                            </Badge>
                          </div>
                          <p className="mt-1 text-xs text-[--gray-medium]">{medication.dosage}</p>
                          <div className="mt-2 text-xs flex items-center text-[--blue-main]">
                            <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            Próxima dosis: {medication.nextDose}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {medications.filter(med => med.category === "diabetes").length === 0 && (
                      <div className="flex items-center justify-center py-4 text-[--gray-medium] text-sm">
                        No hay medicamentos para diabetes registrados
                      </div>
                    )}
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 border-dashed border-[--blue-main] text-[--blue-main] hover:bg-[--blue-light]/10"
                      onClick={() => {
                        setNewMedication({...newMedication, category: "diabetes"});
                        setShowAddMedicationDialog(true);
                      }}
                    >
                      <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      Agregar medicamento
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5">
                  <h3 className="text-sm font-medium text-[--blue-main] mb-4">Medicamentos para Hipertensión</h3>
                  
                  <div className="space-y-4">
                    {medications.filter(med => med.category === "hipertension").map(medication => (
                      <div key={medication.id} className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[--blue-light] flex items-center justify-center">
                          <svg className="h-5 w-5 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                          </svg>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-medium text-[--black-soft]">{medication.name}</h4>
                            <Badge 
                              className={
                                medication.adherence >= 90 
                                ? "bg-[--green-success]/90" 
                                : medication.adherence >= 70 
                                ? "bg-[--yellow-warning]/90" 
                                : "bg-[--red-alert]/90"
                              }
                            >
                              {medication.adherence}% Adherencia
                            </Badge>
                          </div>
                          <p className="mt-1 text-xs text-[--gray-medium]">{medication.dosage}</p>
                          <div className="mt-2 text-xs flex items-center text-[--blue-main]">
                            <svg className="mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            Próxima dosis: {medication.nextDose}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {medications.filter(med => med.category === "hipertension").length === 0 && (
                      <div className="flex items-center justify-center py-4 text-[--gray-medium] text-sm">
                        No hay medicamentos para hipertensión registrados
                      </div>
                    )}
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 border-dashed border-[--blue-main] text-[--blue-main] hover:bg-[--blue-light]/10"
                      onClick={() => {
                        setNewMedication({...newMedication, category: "hipertension"});
                        setShowAddMedicationDialog(true);
                      }}
                    >
                      <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      Agregar medicamento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Panel de factores de riesgo */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-[--blue-main] mb-4">Factores de Riesgo Cardiovascular</h2>
            
            <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-[--black-soft]">Nivel de riesgo</h3>
                      <Badge className="bg-[--yellow-warning] text-white">Moderado-Alto</Badge>
                    </div>
                    
                    <div className="w-full h-32 flex items-center justify-center bg-gradient-to-r from-[--green-success] via-[--yellow-warning] to-[--red-alert] rounded-lg relative p-1">
                      <div className="absolute w-4 h-4 bg-white rounded-full border-2 border-black" style={{ left: '78%', bottom: '-8px' }}></div>
                      <div className="w-full h-full flex items-center justify-center bg-white rounded-md">
                        <span className="text-3xl font-bold text-[--yellow-warning]">78%</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-center mt-4 text-[--gray-medium]">Probabilidad de evento cardiovascular en 10 años</p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-[--black-soft]">Factores contribuyentes</h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[--black-soft]">Diabetes</span>
                        <Badge className="bg-[--red-alert] text-white">Alto</Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[--black-soft]">Hipertensión</span>
                        <Badge className="bg-[--yellow-warning] text-white">Moderado</Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[--black-soft]">Colesterol</span>
                        <Badge className="bg-[--yellow-warning] text-white">Moderado</Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[--black-soft]">Tabaquismo</span>
                        <Badge className="bg-[--green-success] text-white">Bajo</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-[--black-soft] mb-4">Recomendaciones</h3>
                    
                    <div className="space-y-3">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                          </svg>
                        </div>
                        <p className="ml-2 text-xs text-[--gray-medium]">Realizar actividad física moderada por 30 minutos, 5 veces por semana</p>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4.18 4.18C2.8 5.6 2 7.7 2 10c0 5.5 4.5 10 10 10 2.3 0 4.4-.8 6-2.18"></path>
                            <path d="m19.8 19.8 2-2"></path>
                            <path d="m2 2 20 20"></path>
                            <path d="M10.71 5.05A9 9 0 0 1 12 5c.97 0 1.92.15 2.83.43"></path>
                            <path d="M19.67 12.41c.2.46.33.96.33 1.49"></path>
                          </svg>
                        </div>
                        <p className="ml-2 text-xs text-[--gray-medium]">Evitar alimentos con alto contenido de sodio para controlar la presión arterial</p>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                          </svg>
                        </div>
                        <p className="ml-2 text-xs text-[--gray-medium]">Consulte con su médico sobre el ajuste de medicamentos para la diabetes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Calendario de próximas citas */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-[--blue-main] mb-4">Calendario de Atención</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5">
                  <h3 className="text-sm font-medium text-[--blue-main] mb-4">Próximas citas</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 bg-[--blue-main] rounded-lg flex items-center justify-center text-white font-medium">
                        20
                        <span className="text-[8px] ml-0.5">May</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-[--black-soft]">Control de Diabetes</h4>
                        <p className="text-xs text-[--gray-medium]">Dr. García - 10:30 AM</p>
                        <div className="mt-2">
                          <Badge className="bg-[--blue-light] text-[--blue-main]">Confirmada</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 bg-[--blue-main] rounded-lg flex items-center justify-center text-white font-medium">
                        02
                        <span className="text-[8px] ml-0.5">Jun</span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-[--black-soft]">Exámenes de Laboratorio</h4>
                        <p className="text-xs text-[--gray-medium]">Centro Médico - 8:00 AM</p>
                        <div className="mt-2">
                          <Badge className="bg-[--yellow-warning]/20 text-[--yellow-warning]">Por confirmar</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5">
                  <h3 className="text-sm font-medium text-[--blue-main] mb-4">Prescripciones y trámites</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[--blue-light] flex items-center justify-center">
                        <svg className="h-5 w-5 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="9" y1="3" x2="9" y2="21"></line>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-[--black-soft]">Renovar prescripción</h4>
                        <p className="text-xs text-[--gray-medium]">Losartán - Vence el 25 de Mayo</p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm" className="h-7 text-xs border-[--blue-main] text-[--blue-main] hover:bg-[--blue-light]/20">
                            Solicitar renovación
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[--cyan-info]/20 flex items-center justify-center">
                        <svg className="h-5 w-5 text-[--cyan-info]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 9h20"></path>
                          <path d="M15 3h5v18h-5z"></path>
                          <path d="M4 3h5v18H4z"></path>
                          <path d="M9 3h6v18H9z"></path>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-[--black-soft]">Resultado de análisis</h4>
                        <p className="text-xs text-[--gray-medium]">Hemoglobina glicosilada - Disponible</p>
                        <div className="mt-2">
                          <Button variant="outline" size="sm" className="h-7 text-xs border-[--cyan-info] text-[--cyan-info] hover:bg-[--cyan-info]/10">
                            Ver resultado
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Recursos educativos */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-[--blue-main] mb-4">Educación y Recursos</h2>
            
            <Tabs defaultValue="articulos" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-4 text-xs sm:text-sm">
                <TabsTrigger value="articulos" className="text-[--blue-main] px-1 md:px-3">Artículos</TabsTrigger>
                <TabsTrigger value="videos" className="text-[--blue-main] px-1 md:px-3">Videos</TabsTrigger>
                <TabsTrigger value="nutricion" className="text-[--blue-main] px-1 md:px-3">Nutrición</TabsTrigger>
              </TabsList>
              
              <TabsContent value="articulos">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="w-full h-40 bg-[--blue-light] rounded-t-lg flex items-center justify-center">
                        <svg className="h-20 w-20 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m18.4 11.9-4.1 4.2-1.9-1.9-3 3"></path>
                          <path d="M18.3 5.9 13 11.3"></path>
                          <path d="m2.5 17.5 3.3-3.2 3 3L16 10"></path>
                          <path d="m2.5 11.7 3.3-3.2 3 3"></path>
                          <path d="M13.5 3h5v5"></path>
                          <path d="M21.5 13v7a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h11"></path>
                        </svg>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-[--black-soft] mb-2">Controla tu diabetes con ejercicio</h3>
                        <p className="text-xs text-[--gray-medium] mb-3">Descubre cómo el ejercicio puede ayudarte a regular tus niveles de azúcar en sangre a lo largo del día.</p>
                        <div className="flex justify-between items-center">
                          <Badge className="bg-[--blue-light] text-[--blue-main]">Diabetes</Badge>
                          <Button size="sm" variant="link" className="text-[--blue-main] p-0 h-auto">Leer más</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="w-full h-40 bg-[--blue-light] rounded-t-lg flex items-center justify-center">
                        <svg className="h-20 w-20 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                          <line x1="9" y1="9" x2="9.01" y2="9"></line>
                          <line x1="15" y1="9" x2="15.01" y2="9"></line>
                        </svg>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-[--black-soft] mb-2">Manejo del estrés y presión arterial</h3>
                        <p className="text-xs text-[--gray-medium] mb-3">Aprende técnicas efectivas para reducir el estrés y su impacto en tu presión arterial.</p>
                        <div className="flex justify-between items-center">
                          <Badge className="bg-[--blue-light] text-[--blue-main]">Hipertensión</Badge>
                          <Button size="sm" variant="link" className="text-[--blue-main] p-0 h-auto">Leer más</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="w-full h-40 bg-[--blue-light] rounded-t-lg flex items-center justify-center">
                        <svg className="h-20 w-20 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 18a7 7 0 0 1 4-6.1 3 3 0 1 1 4-3.9 3 3 0 0 1 4 3.9 7 7 0 0 1 4 6.1"></path>
                          <line x1="12" y1="9" x2="12" y2="21"></line>
                        </svg>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-[--black-soft] mb-2">Adhesión a la medicación</h3>
                        <p className="text-xs text-[--gray-medium] mb-3">Consejos prácticos para mantener una rutina consistente con tus medicamentos.</p>
                        <div className="flex justify-between items-center">
                          <Badge className="bg-[--blue-light] text-[--blue-main]">Medicación</Badge>
                          <Button size="sm" variant="link" className="text-[--blue-main] p-0 h-auto">Leer más</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="videos">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="w-full aspect-video bg-[--blue-light] rounded-t-lg flex items-center justify-center relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-16 w-16 rounded-full bg-white/80 flex items-center justify-center">
                            <svg className="h-8 w-8 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                          </div>
                        </div>
                        <svg className="h-20 w-20 text-[--blue-main] opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m18.4 11.9-4.1 4.2-1.9-1.9-3 3"></path>
                          <path d="M18.3 5.9 13 11.3"></path>
                          <path d="m2.5 17.5 3.3-3.2 3 3L16 10"></path>
                          <path d="m2.5 11.7 3.3-3.2 3 3"></path>
                        </svg>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-[--black-soft] mb-2">Ejercicios para pacientes diabéticos</h3>
                        <p className="text-xs text-[--gray-medium] mb-3">Serie de ejercicios adaptados para personas con diabetes tipo 2.</p>
                        <div className="flex justify-between items-center">
                          <Badge className="bg-[--blue-light] text-[--blue-main]">15 min</Badge>
                          <Button size="sm" variant="link" className="text-[--blue-main] p-0 h-auto">Ver video</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="w-full aspect-video bg-[--blue-light] rounded-t-lg flex items-center justify-center relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-16 w-16 rounded-full bg-white/80 flex items-center justify-center">
                            <svg className="h-8 w-8 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                          </div>
                        </div>
                        <svg className="h-20 w-20 text-[--blue-main] opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4.18 4.18C2.8 5.6 2 7.7 2 10c0 5.5 4.5 10 10 10 2.3 0 4.4-.8 6-2.18"></path>
                          <path d="m19.8 19.8 2-2"></path>
                          <path d="m2 2 20 20"></path>
                          <path d="M10.71 5.05A9 9 0 0 1 12 5c.97 0 1.92.15 2.83.43"></path>
                          <path d="M19.67 12.41c.2.46.33.96.33 1.49"></path>
                        </svg>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-[--black-soft] mb-2">Cómo medir correctamente la presión arterial</h3>
                        <p className="text-xs text-[--gray-medium] mb-3">Guía paso a paso para obtener lecturas precisas en casa.</p>
                        <div className="flex justify-between items-center">
                          <Badge className="bg-[--blue-light] text-[--blue-main]">8 min</Badge>
                          <Button size="sm" variant="link" className="text-[--blue-main] p-0 h-auto">Ver video</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="nutricion">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="w-full h-40 bg-[--green-success]/10 rounded-t-lg flex items-center justify-center">
                        <svg className="h-20 w-20 text-[--green-success]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 21H3"></path>
                          <path d="M15 10 3 10 3 21 15 21 15 10"></path>
                          <path d="M6 17l3-2 3 2"></path>
                          <path d="M19 3v14"></path>
                          <path d="M13 7a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V7z"></path>
                        </svg>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-[--black-soft] mb-2">Plan de alimentación para diabetes</h3>
                        <p className="text-xs text-[--gray-medium] mb-3">Menú semanal adaptado a tus necesidades específicas.</p>
                        <div className="flex justify-between items-center">
                          <Badge className="bg-[--green-success]/20 text-[--green-success]">Personalizado</Badge>
                          <Button size="sm" variant="link" className="text-[--blue-main] p-0 h-auto">Ver plan</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="w-full h-40 bg-[--green-success]/10 rounded-t-lg flex items-center justify-center">
                        <svg className="h-20 w-20 text-[--green-success]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="5" r="3"></circle>
                          <line x1="12" y1="22" x2="12" y2="8"></line>
                          <path d="M5 12H2a10 10 0 0 0 20 0h-3"></path>
                        </svg>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-[--black-soft] mb-2">Alimentos que ayudan a controlar la presión</h3>
                        <p className="text-xs text-[--gray-medium] mb-3">Lista de alimentos recomendados para pacientes hipertensos.</p>
                        <div className="flex justify-between items-center">
                          <Badge className="bg-[--green-success]/20 text-[--green-success]">Hipertensión</Badge>
                          <Button size="sm" variant="link" className="text-[--blue-main] p-0 h-auto">Ver lista</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="w-full h-40 bg-[--green-success]/10 rounded-t-lg flex items-center justify-center">
                        <svg className="h-20 w-20 text-[--green-success]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11.5 3a17.8 17.8 0 0 0-8 5.5C1 12 1 14 3 15c2.8 1.5 5 1 7.5-1"></path>
                          <path d="M11.5 3a17.8 17.8 0 0 1 8 5.5c2.5 3.5 2.5 5.5.5 6.5-2.8 1.5-5 1-7.5-1"></path>
                          <path d="M11.5 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                        </svg>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-[--black-soft] mb-2">Entendiendo el índice glucémico</h3>
                        <p className="text-xs text-[--gray-medium] mb-3">Guía completa para elegir alimentos de bajo índice glucémico.</p>
                        <div className="flex justify-between items-center">
                          <Badge className="bg-[--green-success]/20 text-[--green-success]">Diabetes</Badge>
                          <Button size="sm" variant="link" className="text-[--blue-main] p-0 h-auto">Ver guía</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Dashboard de actividad física */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-[--blue-main] mb-4">Actividad Física</h2>
            
            <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-[--black-soft] mb-4">Progreso semanal</h3>
                    
                    <div className="h-40 flex items-end justify-between gap-2">
                      {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((dia, index) => (
                        <div key={index} className="flex flex-col items-center w-full">
                          <div 
                            className={`w-full rounded-t-sm ${
                              index < 4 
                                ? 'bg-[--blue-main]' 
                                : (index === 4 ? 'bg-[--blue-light]' : 'bg-gray-200')
                            }`} 
                            style={{ 
                              height: `${
                                index === 0 ? '60%' : 
                                index === 1 ? '85%' : 
                                index === 2 ? '50%' : 
                                index === 3 ? '75%' : 
                                index === 4 ? '20%' : '0%'
                              }`
                            }}
                          ></div>
                          <span className="text-xs text-[--gray-medium] mt-1">{dia}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3 text-center">
                      <p className="text-sm text-[--black-soft]">4 de 7 días completados</p>
                      <p className="text-xs text-[--gray-medium]">Meta: 30 min/día, 5 días/semana</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-[--black-soft] mb-4">Resumen de actividades</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[--blue-light] flex items-center justify-center">
                            <svg className="h-4 w-4 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="m18 14-6-6-6 6"></path>
                            </svg>
                          </div>
                          <span className="ml-2 text-sm text-[--black-soft]">Caminata</span>
                        </div>
                        <span className="text-sm font-medium text-[--black-soft]">90 min</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[--blue-light] flex items-center justify-center">
                            <svg className="h-4 w-4 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"></circle>
                              <path d="m16 12-4-4-4 4M12 8v8"></path>
                            </svg>
                          </div>
                          <span className="ml-2 text-sm text-[--black-soft]">Bicicleta</span>
                        </div>
                        <span className="text-sm font-medium text-[--black-soft]">45 min</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[--blue-light] flex items-center justify-center">
                            <svg className="h-4 w-4 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                          </div>
                          <span className="ml-2 text-sm text-[--black-soft]">Natación</span>
                        </div>
                        <span className="text-sm font-medium text-[--black-soft]">30 min</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[--black-soft]">Total semanal</span>
                        <span className="text-sm font-medium text-[--blue-main]">165 min</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-[--black-soft] mb-4">Recomendaciones personalizadas</h3>
                    
                    <div className="space-y-3">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-[--green-success]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                            <path d="m9 12 2 2 4-4"></path>
                          </svg>
                        </div>
                        <p className="ml-2 text-xs text-[--gray-medium]">Continúa con tu rutina de caminata diaria, excelente para controlar tu glucosa</p>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                            <path d="M12 8v4"></path>
                            <path d="M12 16h.01"></path>
                          </svg>
                        </div>
                        <p className="ml-2 text-xs text-[--gray-medium]">Considera agregar ejercicios de fuerza 2 veces por semana para mejorar tu sensibilidad a la insulina</p>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-[--yellow-warning]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                            <path d="M12 8v4"></path>
                            <path d="M12 16h.01"></path>
                          </svg>
                        </div>
                        <p className="ml-2 text-xs text-[--gray-medium]">No olvides medir tu glucosa antes y después del ejercicio para entender cómo afecta a tu cuerpo</p>
                      </div>
                      
                      <div className="mt-4">
                        <Button className="w-full bg-[--blue-main] hover:bg-[--blue-main]/90 text-white" size="sm">Ver plan personalizado</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Integración de datos dietéticos */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-[--blue-main] mb-4">Alimentación e Impacto en Glucosa</h2>
            
            <Card className="shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-[--black-soft] mb-4">Registro de comidas recientes</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[--blue-light] flex items-center justify-center">
                          <svg className="h-5 w-5 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 8h12"></path>
                            <path d="M8 2h8"></path>
                            <path d="M12 19v-5"></path>
                            <path d="M18 19c0-4.4-6-3.1-6-8"></path>
                            <rect x="4" y="10" width="16" height="2" rx="1" ry="1"></rect>
                          </svg>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-medium text-[--black-soft]">Desayuno</h4>
                            <p className="text-xs text-[--gray-medium]">7:30 AM</p>
                          </div>
                          <p className="mt-1 text-xs text-[--gray-medium]">Avena con frutas, yogurt natural y té verde</p>
                          <div className="mt-2 flex items-center">
                            <Badge className="bg-[--green-success]/20 text-[--green-success] mr-2">
                              +15 mg/dL
                            </Badge>
                            <span className="text-xs text-[--gray-medium]">Glucosa post: 130 mg/dL</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[--blue-light] flex items-center justify-center">
                          <svg className="h-5 w-5 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
                            <line x1="6" y1="17" x2="18" y2="17"></line>
                          </svg>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-medium text-[--black-soft]">Almuerzo</h4>
                            <p className="text-xs text-[--gray-medium]">1:00 PM</p>
                          </div>
                          <p className="mt-1 text-xs text-[--gray-medium]">Ensalada de pollo, arroz integral y vegetales</p>
                          <div className="mt-2 flex items-center">
                            <Badge className="bg-[--yellow-warning]/20 text-[--yellow-warning] mr-2">
                              +35 mg/dL
                            </Badge>
                            <span className="text-xs text-[--gray-medium]">Glucosa post: 150 mg/dL</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[--blue-light] flex items-center justify-center">
                          <svg className="h-5 w-5 text-[--blue-main]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v2"></path>
                            <path d="M12 8v2"></path>
                            <path d="M12 14v2"></path>
                            <path d="M12 20v2"></path>
                            <path d="M18.4 4.6 16.3 6.7"></path>
                            <path d="M7.8 7.7 5.6 9.9"></path>
                            <path d="M16.3 17.3l2.1 2.1"></path>
                            <path d="M5.6 14.1l2.2 2.2"></path>
                            <path d="M2 12h2"></path>
                            <path d="M8 12h2"></path>
                            <path d="M14 12h2"></path>
                            <path d="M20 12h2"></path>
                          </svg>
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-medium text-[--black-soft]">Merienda</h4>
                            <p className="text-xs text-[--gray-medium]">4:30 PM</p>
                          </div>
                          <p className="mt-1 text-xs text-[--gray-medium]">Nueces mixtas y manzana</p>
                          <div className="mt-2 flex items-center">
                            <Badge className="bg-[--green-success]/20 text-[--green-success] mr-2">
                              +10 mg/dL
                            </Badge>
                            <span className="text-xs text-[--gray-medium]">Glucosa post: 125 mg/dL</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button size="sm" className="bg-[--blue-main] hover:bg-[--blue-main]/90 text-white">
                        Registrar comida
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-[--black-soft] mb-4">Sugerencias alimentarias</h3>
                    
                    <div className="space-y-4">
                      <div className="p-3 bg-[--green-success]/10 rounded-lg">
                        <h4 className="text-sm font-medium text-[--green-success] mb-2">
                          Alimentos recomendados
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center text-xs text-[--gray-medium]">
                            <svg className="h-4 w-4 text-[--green-success] mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                              <path d="m9 12 2 2 4-4"></path>
                            </svg>
                            Vegetales de hoja verde (espinacas, kale, lechuga)
                          </li>
                          <li className="flex items-center text-xs text-[--gray-medium]">
                            <svg className="h-4 w-4 text-[--green-success] mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                              <path d="m9 12 2 2 4-4"></path>
                            </svg>
                            Proteínas magras (pollo sin piel, pescado, tofu)
                          </li>
                          <li className="flex items-center text-xs text-[--gray-medium]">
                            <svg className="h-4 w-4 text-[--green-success] mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                              <path d="m9 12 2 2 4-4"></path>
                            </svg>
                            Grasas saludables (aguacate, aceite de oliva, nueces)
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-3 bg-[--yellow-warning]/10 rounded-lg">
                        <h4 className="text-sm font-medium text-[--yellow-warning] mb-2">
                          Alimentos con moderación
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center text-xs text-[--gray-medium]">
                            <svg className="h-4 w-4 text-[--yellow-warning] mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                              <path d="M12 8v4"></path>
                              <path d="M12 16h.01"></path>
                            </svg>
                            Carbohidratos complejos (arroz integral, quinoa)
                          </li>
                          <li className="flex items-center text-xs text-[--gray-medium]">
                            <svg className="h-4 w-4 text-[--yellow-warning] mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                              <path d="M12 8v4"></path>
                              <path d="M12 16h.01"></path>
                            </svg>
                            Frutas enteras (manzanas, peras, bayas)
                          </li>
                        </ul>
                      </div>
                      
                      <div className="p-3 bg-[--red-alert]/10 rounded-lg">
                        <h4 className="text-sm font-medium text-[--red-alert] mb-2">
                          Alimentos a evitar
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center text-xs text-[--gray-medium]">
                            <svg className="h-4 w-4 text-[--red-alert] mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                              <path d="m15 9-6 6"></path>
                              <path d="m9 9 6 6"></path>
                            </svg>
                            Azúcares refinados (dulces, postres, bebidas azucaradas)
                          </li>
                          <li className="flex items-center text-xs text-[--gray-medium]">
                            <svg className="h-4 w-4 text-[--red-alert] mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                              <path d="m15 9-6 6"></path>
                              <path d="m9 9 6 6"></path>
                            </svg>
                            Carbohidratos simples (pan blanco, arroz blanco)
                          </li>
                          <li className="flex items-center text-xs text-[--gray-medium]">
                            <svg className="h-4 w-4 text-[--red-alert] mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                              <path d="m15 9-6 6"></path>
                              <path d="m9 9 6 6"></path>
                            </svg>
                            Alimentos procesados con alto contenido de sodio
                          </li>
                        </ul>
                      </div>
                      
                      <div className="mt-2">
                        <Button size="sm" variant="outline" className="w-full border-[--blue-main] text-[--blue-main] hover:bg-[--blue-light]/20">
                          Ver plan de alimentación personalizado
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Diálogo para editar perfil */}
        <Dialog open={showEditProfileDialog} onOpenChange={setShowEditProfileDialog}>
          <DialogContent className="max-w-[90vw] sm:max-w-[500px] border border-[--blue-light] shadow-lg overflow-y-auto max-h-[90vh]">
            <DialogHeader>
              <DialogTitle className="text-[--blue-main] text-xl">Editar Perfil</DialogTitle>
              <DialogDescription className="text-[--gray-medium]">
                Actualiza tus datos personales y de contacto.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-5 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-[--black-soft]">Nombre</Label>
                  <Input 
                    id="name" 
                    value={patientData.name} 
                    onChange={(e) => setPatientData({...patientData, name: e.target.value})}
                    className="border-[--blue-light] focus-visible:ring-[--blue-main]" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastname" className="text-[--black-soft]">Apellido</Label>
                  <Input 
                    id="lastname" 
                    value={patientData.lastName} 
                    onChange={(e) => setPatientData({...patientData, lastName: e.target.value})}
                    className="border-[--blue-light] focus-visible:ring-[--blue-main]" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age" className="text-[--black-soft]">Edad</Label>
                <Input 
                  id="age" 
                  type="number" 
                  value={patientData.age} 
                  onChange={(e) => setPatientData({...patientData, age: parseInt(e.target.value) || 0})}
                  className="border-[--blue-light] focus-visible:ring-[--blue-main]" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[--black-soft]">Correo electrónico</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={patientData.email} 
                  onChange={(e) => setPatientData({...patientData, email: e.target.value})}
                  className="border-[--blue-light] focus-visible:ring-[--blue-main]" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[--black-soft]">Teléfono</Label>
                <Input 
                  id="phone" 
                  value={patientData.phone}
                  onChange={(e) => setPatientData({...patientData, phone: e.target.value})}
                  className="border-[--blue-light] focus-visible:ring-[--blue-main]" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address" className="text-[--black-soft]">Dirección</Label>
                <Input 
                  id="address" 
                  value={patientData.address}
                  onChange={(e) => setPatientData({...patientData, address: e.target.value})}
                  className="border-[--blue-light] focus-visible:ring-[--blue-main]" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-[--black-soft]">Peso (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    value={patientData.weight}
                    onChange={(e) => setPatientData({...patientData, weight: parseInt(e.target.value) || 0})}
                    className="border-[--blue-light] focus-visible:ring-[--blue-main]" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-[--black-soft]">Estatura (cm)</Label>
                  <Input 
                    id="height" 
                    type="number" 
                    value={patientData.height}
                    onChange={(e) => setPatientData({...patientData, height: parseInt(e.target.value) || 0})}
                    className="border-[--blue-light] focus-visible:ring-[--blue-main]" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="insurance" className="text-[--black-soft]">Seguro Médico</Label>
                <Input 
                  id="insurance" 
                  value={patientData.insurance}
                  onChange={(e) => setPatientData({...patientData, insurance: e.target.value})}
                  className="border-[--blue-light] focus-visible:ring-[--blue-main]" 
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="smoker" 
                  checked={patientData.isSmoker}
                  onCheckedChange={(checked) => setPatientData({...patientData, isSmoker: checked})}
                />
                <Label htmlFor="smoker" className="text-[--black-soft]">Fumador</Label>
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowEditProfileDialog(false)} 
                className="border-[--blue-main]/30 text-[--blue-main] hover:bg-[--blue-light]/20"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleSaveProfile}
                className="bg-[--blue-main] hover:bg-[--blue-main]/90 text-white"
              >
                Guardar cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Diálogo para confirmar cierre de sesión */}
        <Dialog open={showConfirmLogoutDialog} onOpenChange={setShowConfirmLogoutDialog}>
          <DialogContent className="sm:max-w-[425px] border border-[--red-alert]/20 shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-[--red-alert] text-xl">Confirmar cierre de sesión</DialogTitle>
              <DialogDescription className="text-[--gray-medium]">
                ¿Estás seguro de que deseas cerrar la sesión?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setShowConfirmLogoutDialog(false)} className="border-[--gray-medium]/30 text-[--gray-medium] hover:bg-[--gray-light]">
                Cancelar
              </Button>
              <Button 
                onClick={() => {
                  // Aquí iría la lógica para cerrar sesión, por ahora solo vamos a la página de login
                  window.location.href = "/auth";
                }}
                className="bg-[--red-alert] hover:bg-[--red-alert]/90 text-white"
              >
                Cerrar sesión
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Diálogo para agregar medicamento */}
        <Dialog open={showAddMedicationDialog} onOpenChange={setShowAddMedicationDialog}>
          <DialogContent className="sm:max-w-[500px] border border-[--blue-light] shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-[--blue-main] text-xl">Agregar Medicamento</DialogTitle>
              <DialogDescription className="text-[--gray-medium]">
                Complete la información del medicamento que desea agregar a su tratamiento.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-5 py-4">
              <div className="space-y-2">
                <Label htmlFor="med-name" className="text-[--black-soft]">Nombre del medicamento</Label>
                <Input 
                  id="med-name" 
                  value={newMedication.name} 
                  onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                  placeholder="Ej. Metformina, Losartán, etc." 
                  className="border-[--blue-light] focus-visible:ring-[--blue-main]" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="med-dosage" className="text-[--black-soft]">Dosis</Label>
                <Input 
                  id="med-dosage" 
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                  placeholder="Ej. 850mg - 1 pastilla después del desayuno" 
                  className="border-[--blue-light] focus-visible:ring-[--blue-main]" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="med-frequency" className="text-[--black-soft]">Frecuencia</Label>
                <Select 
                  value={newMedication.frequency}
                  onValueChange={(value) => setNewMedication({...newMedication, frequency: value})}
                >
                  <SelectTrigger className="border-[--blue-light] focus-visible:ring-[--blue-main]">
                    <SelectValue placeholder="Seleccione frecuencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 vez al día">1 vez al día</SelectItem>
                    <SelectItem value="2 veces al día">2 veces al día</SelectItem>
                    <SelectItem value="3 veces al día">3 veces al día</SelectItem>
                    <SelectItem value="Cada 12 horas">Cada 12 horas</SelectItem>
                    <SelectItem value="Cada 8 horas">Cada 8 horas</SelectItem>
                    <SelectItem value="Semanal">Semanal</SelectItem>
                    <SelectItem value="Según necesidad">Según necesidad</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="med-category" className="text-[--black-soft]">Categoría</Label>
                <RadioGroup 
                  value={newMedication.category}
                  onValueChange={(value) => setNewMedication({
                    ...newMedication, 
                    category: value as "diabetes" | "hipertension" | "otro"
                  })}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="diabetes" id="diabetes" />
                    <Label htmlFor="diabetes" className="cursor-pointer">Diabetes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hipertension" id="hipertension" />
                    <Label htmlFor="hipertension" className="cursor-pointer">Hipertensión</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="otro" id="otro" />
                    <Label htmlFor="otro" className="cursor-pointer">Otro</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="med-next-dose" className="text-[--black-soft]">Próxima dosis</Label>
                <Input 
                  id="med-next-dose" 
                  value={newMedication.nextDose}
                  onChange={(e) => setNewMedication({...newMedication, nextDose: e.target.value})}
                  placeholder="Ej. Hoy 20:00, Mañana 8:00" 
                  className="border-[--blue-light] focus-visible:ring-[--blue-main]" 
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowAddMedicationDialog(false)} 
                className="border-[--blue-main]/30 text-[--blue-main] hover:bg-[--blue-light]/20"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleAddMedication}
                className="bg-[--blue-main] hover:bg-[--blue-main]/90 text-white"
                disabled={!newMedication.name || !newMedication.dosage}
              >
                Agregar medicamento
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
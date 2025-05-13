import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export default function PatientProfile() {
  const [activeTab, setActiveTab] = useState("historia-clinica");

  // Datos de monitoreo de riesgo (ejemplos)
  const riskData = [
    { id: "1", patientName: "Paciente #1", time: "12:42 AM", risk: 35 },
    { id: "1", patientName: "Paciente #1", time: "05:28 PM", risk: 65 },
    { id: "2", patientName: "Paciente #2", time: "01:15 AM", risk: 80 },
    { id: "3", patientName: "Paciente #3", time: "08:09 AM", risk: 40 },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header / Navegación Superior */}
      <header className="sticky top-0 z-50 border-b bg-background">
        <div className="flex h-16 items-center px-4 sm:px-6">
          <div className="flex items-center">
            <div className="w-8 h-8 mr-2 flex items-center justify-center bg-primary rounded-md">
              <svg 
                width="20" 
                height="20" 
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
                <path 
                  d="M8 9H9.5L10.5 7.5L12 11L13.5 9H15" 
                  stroke="currentColor" 
                  strokeWidth="1.8" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  fill="none"
                />
                <path 
                  d="M12 14C12 14 13.5 14.5 15 16C16.5 17.5 17.5 19 17.5 19" 
                  stroke="currentColor" 
                  strokeWidth="1.8" 
                  strokeLinecap="round" 
                  fill="none"
                />
                <circle 
                  cx="18" 
                  cy="19.5" 
                  r="1.2" 
                  stroke="currentColor" 
                  strokeWidth="1.8" 
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="font-semibold text-lg">CronApp</span>
          </div>
          
          <nav className="flex items-center ml-6 space-x-4">
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Dashboard</a>
            <a href="#" className="text-sm font-medium transition-colors text-primary">Pacientes</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Condiciones</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Estadísticas</a>
          </nav>
          
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
              </svg>
              <span className="sr-only">Notificaciones</span>
            </Button>
            <div className="h-6 w-px bg-muted"></div>
            <Button variant="ghost" size="sm" className="gap-2">
              <span>Dr. CronApp</span>
              <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 py-6 px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">Perfil del Paciente</h1>
            <span className="text-sm text-muted-foreground">1 de 1</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Atrás</Button>
            <Button variant="outline" size="sm">Descargar Historia</Button>
          </div>
        </div>

        {/* Perfil de Paciente */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h2 className="text-xl font-medium mb-1">undefined undefined</h2>
                  <p className="text-sm text-muted-foreground mb-1">65 años • Masculino</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium">Historia Clínica</span>
                    <p className="text-sm text-muted-foreground">No hay historial clínico disponible para este paciente.</p>
                  </div>

                  <div>
                    <span className="text-sm font-medium">Contacto</span>
                    <div className="grid grid-cols-[20px_1fr] gap-x-2 gap-y-1 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span className="text-sm text-muted-foreground">Sin información</span>
                      
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span className="text-sm text-muted-foreground">ejemplo.texto@example.com</span>
                      
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span className="text-sm text-muted-foreground">Sin información</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-medium">Datos Basales</span>
                    <div className="grid grid-cols-[20px_1fr] gap-x-2 gap-y-1 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                      </svg>
                      <span className="text-sm text-muted-foreground">Peso: Sin información</span>
                      
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                      <span className="text-sm text-muted-foreground">Estatura: Sin información</span>
                      
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 19H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"></path>
                        <path d="M8 19l3-3 3 3"></path>
                        <path d="M11 16V4"></path>
                      </svg>
                      <span className="text-sm text-muted-foreground">Fumador: Sin información</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:w-2/3">
            <Card>
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full bg-muted/50 rounded-none justify-start px-4 pt-2 border-b">
                    <TabsTrigger value="historia-clinica" className="rounded-t-md rounded-b-none">Historia Clínica</TabsTrigger>
                    <TabsTrigger value="tratamientos" className="rounded-t-md rounded-b-none">Tratamientos</TabsTrigger>
                    <TabsTrigger value="notas" className="rounded-t-md rounded-b-none">Notas</TabsTrigger>
                    <TabsTrigger value="estadisticas" className="rounded-t-md rounded-b-none">Estadísticas</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="historia-clinica" className="p-6">
                    <h3 className="text-lg font-medium mb-4">Historial Clínico</h3>
                    <p className="text-muted-foreground">No hay historial clínico disponible para este paciente.</p>
                  </TabsContent>
                  
                  <TabsContent value="tratamientos" className="p-6">
                    <h3 className="text-lg font-medium mb-4">Tratamientos</h3>
                    <p className="text-muted-foreground">No hay condiciones médicas registradas.</p>
                  </TabsContent>
                  
                  <TabsContent value="notas" className="p-6">
                    <h3 className="text-lg font-medium mb-4">Notas</h3>
                    <p className="text-muted-foreground">No hay notas disponibles para este paciente.</p>
                  </TabsContent>
                  
                  <TabsContent value="estadisticas" className="p-6">
                    <h3 className="text-lg font-medium mb-4">Estadísticas</h3>
                    <p className="text-muted-foreground">No hay estadísticas disponibles para este paciente.</p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Monitoreo de Riesgo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Monitoreo de Riesgo</h3>
                    <Button variant="outline" size="sm">Ver Todos</Button>
                  </div>
                  
                  <div className="space-y-4">
                    {riskData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{item.patientName}</p>
                            <p className="text-xs text-muted-foreground">{item.time}</p>
                          </div>
                          <span className="text-xs font-medium">{item.risk}%</span>
                        </div>
                        <div className="risk-progress-bar">
                          <div 
                            className={`risk-progress-bar-indicator ${item.risk > 70 ? 'high' : item.risk > 50 ? 'medium' : 'low'}`} 
                            style={{ width: `${item.risk}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Educación Clínica */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Educación Clínica</h3>
                    <Button variant="outline" size="sm">Ver Biblioteca Clínica</Button>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">Recursos clínicos sobre gestión de condiciones</p>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        </svg>
                      </div>
                      <span className="text-xs text-center">Guía de Hipertensión</span>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="12" y1="8" x2="12" y2="16"></line>
                          <line x1="8" y1="12" x2="16" y2="12"></line>
                        </svg>
                      </div>
                      <span className="text-xs text-center">Control de Glucosa</span>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                          <line x1="6" y1="1" x2="6" y2="4"></line>
                          <line x1="10" y1="1" x2="10" y2="4"></line>
                          <line x1="14" y1="1" x2="14" y2="4"></line>
                        </svg>
                      </div>
                      <span className="text-xs text-center">Ejercicio Respiratorio</span>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                          <line x1="4" y1="22" x2="4" y2="15"></line>
                        </svg>
                      </div>
                      <span className="text-xs text-center">Alimentación Saludable</span>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                        </svg>
                      </div>
                      <span className="text-xs text-center">Técnicas de Relajación</span>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-xs text-center">Adherencia a Medicamentos</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
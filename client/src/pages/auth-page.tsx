import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthForm from "@/components/auth/auth-form";

export default function AuthPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="healthcare-card">
          {/* Logo and Header */}
          <div className="p-6 flex flex-col items-center">
            {/* Logo */}
            <div className="healthcare-logo mb-4">
              <div className="w-16 h-16 relative flex items-center justify-center">
                <svg 
                  width="44" 
                  height="44" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Corazón con estetoscopio - trazado exacto (agrandado) */}
                  <path 
                    d="M8 3.5C5.2 3.5 3 5.7 3 8.5C3 12 5.5 15 12 20.5C18.5 15 21 12 21 8.5C21 5.7 18.8 3.5 16 3.5C14.3 3.5 12.9 4.3 12 5.5C11.1 4.3 9.7 3.5 8 3.5Z" 
                    stroke="white" 
                    strokeWidth="1.8" 
                    fill="none"
                  />
                  
                  {/* Línea de ECG dentro del corazón */}
                  <path 
                    d="M8 9H9.5L10.5 7.5L12 11L13.5 9H15" 
                    stroke="white" 
                    strokeWidth="1.8" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    fill="none"
                  />
                  
                  {/* Estetoscopio - curva */}
                  <path 
                    d="M12 14C12 14 13.5 14.5 15 16C16.5 17.5 17.5 19 17.5 19" 
                    stroke="white" 
                    strokeWidth="1.8" 
                    strokeLinecap="round" 
                    fill="none"
                  />
                  
                  {/* Estetoscopio - cabeza circular */}
                  <circle 
                    cx="18" 
                    cy="19.5" 
                    r="1.2" 
                    stroke="white" 
                    strokeWidth="1.8" 
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <h1 className="cronapp-title mb-2">CronApp</h1>
            <p className="text-accent text-sm mb-6">Inicia sesión para continuar</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="hidden">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="mt-0">
              <CardContent className="p-0">
                <AuthForm type="login" />
              </CardContent>
            </TabsContent>
            
            <TabsContent value="register" className="mt-0">
              <CardContent className="p-0">
                <AuthForm type="register" />
              </CardContent>
            </TabsContent>
          </Tabs>
          
          {/* Register Link */}
          <div className="border-t border-gray-200 py-5 text-center bg-muted">
            <p className="text-secondary">
              ¿No tienes cuenta?{" "}
              <a href="#" className="text-primary font-medium hover:underline transition-all">
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

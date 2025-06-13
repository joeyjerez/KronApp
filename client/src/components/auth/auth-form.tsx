import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { validateEmail } from "@/lib/utils";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";

interface AuthFormProps {
  type: "login" | "register";
}

// Schema for login form
const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es obligatorio" })
    .refine(validateEmail, { message: "Ingrese un email válido" }),
  password: z.string().min(1, { message: "La contraseña es obligatoria" }),
});

// Schema for register form (can be extended as needed)
const registerSchema = loginSchema.extend({
  confirmPassword: z.string().min(1, { message: "Confirmar contraseña es obligatorio" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthForm({ type }: AuthFormProps) {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Get the current form based on the type
  const form = type === "login" ? loginForm : registerForm;

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // Handle form submission
  const onSubmit = async (values: LoginFormValues | RegisterFormValues) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      toast({
        title: type === "login" ? "Inicio de sesión exitoso" : "Registro exitoso",
        description: type === "login" ? "Bienvenido de vuelta" : "Su cuenta ha sido creada",
        variant: "default",
      });
      
      // Reset form if needed
      if (type === "register") {
        registerForm.reset();
      }
    } catch (error) {
      // Show error message
      toast({
        title: type === "login" ? "Error al iniciar sesión" : "Error al registrarse",
        description: "Ha ocurrido un error, inténtelo de nuevo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    toast({
      title: "Restablecer contraseña",
      description: "Se enviará un correo para restablecer su contraseña",
      variant: "default",
    });
  };

  const handleGoogleLogin = () => {
    toast({
      title: "Google",
      description: "Iniciando sesión con Google...",
      variant: "default",
    });
  };

  return (
    <div className="px-6 pb-6">
      {/* Google Login Button */}
      <div className="mb-5">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 py-6 border-gray-300 shadow-sm hover:shadow" 
          onClick={handleGoogleLogin}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="#4285F4"
          >
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          <span className="font-medium">Ingresar con Google</span>
        </Button>
      </div>

      {/* Divider */}
      <div className="flex items-center mb-5">
        <Separator className="flex-1" />
        <span className="px-3 text-sm text-muted-foreground">o</span>
        <Separator className="flex-1" />
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent h-4 w-4" />
                    <Input 
                      placeholder="ejemplo@correo.com" 
                      className="pl-10 border-[1.5px] shadow-sm" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel>Contraseña</FormLabel>
                  {type === "login" && (
                    <a 
                      href="#" 
                      className="text-sm text-accent hover:text-secondary transition-colors"
                      onClick={handleForgotPassword}
                    >
                      Olvidé mi contraseña
                    </a>
                  )}
                </div>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent h-4 w-4" />
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      className="pl-10 border-[1.5px] shadow-sm" 
                      {...field} 
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors h-8 w-8 p-0"
                      onClick={togglePasswordVisibility}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Field (only for registration) */}
          {type === "register" && (
            <FormField
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent h-4 w-4" />
                      <Input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="pl-10 border-[1.5px] shadow-sm" 
                        {...field} 
                      />
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors h-8 w-8 p-0"
                        onClick={toggleConfirmPasswordVisibility}
                        aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full py-6 bg-primary hover:bg-primary/90 text-white font-medium transition-all duration-200 mt-5 border border-primary/30 shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {type === "login" ? "Iniciando sesión..." : "Registrando..."}
              </>
            ) : (
              <>{type === "login" ? "Ingresar" : "Registrarse"}</>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

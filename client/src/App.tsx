import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import PatientProfile from "@/pages/patient-profile";
import PatientProfileNew from "@/pages/patient-profile-new";
import DiabetesModule from "@/pages/diabetes-module";
import HypertensionModule from "@/pages/hypertension-module";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AuthPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/patient-profile" component={PatientProfile} />
      <Route path="/patient-profile-new" component={PatientProfileNew} />
      <Route path="/diabetes" component={DiabetesModule} />
      <Route path="/hypertension" component={HypertensionModule} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return <Router />;
}

export default App;

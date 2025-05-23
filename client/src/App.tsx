import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

function ThankYou() {
  return (
    <div>
      <h1>Thank You!</h1>
      <p>Your purchase is complete.</p>
    </div>
  );
}

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/thank-you" component={ThankYou} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
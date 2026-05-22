import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <div>
        <Toaster position="top-right" richColors />
        <AppRoutes />
      </div>
    </MantineProvider>
  );
}

export default App;

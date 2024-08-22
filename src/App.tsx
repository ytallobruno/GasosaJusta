import { Box, Center, ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import GasForm from "./pages/GasForm";

export default function App() {
  return (
    <ChakraProvider>
      <Center width="100vw" height="100vh">
        <Box className="gasForm">
          <GasForm />
        </Box>
      </Center>
    </ChakraProvider>
  );
}

import { Alert, Box, Button, VStack } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { AlertContext } from "./AlertContext.js";

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState([]);
  const timeoutIds = useRef(new Map());

  const closeAlert = useCallback((id) => {
    setAlerts((currentAlerts) => currentAlerts.filter((alert) => alert.id !== id));
    const timeoutId = timeoutIds.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutIds.current.delete(id);
    }
  }, []);

  const showAlert = useCallback(({ title, description, status = "info", duration = 5000 }) => {
    const id = `${Date.now()}-${Math.random()}`;
    setAlerts((currentAlerts) => [...currentAlerts, { id, title, description, status }]);

    if (duration > 0) {
      const timeoutId = setTimeout(() => closeAlert(id), duration);
      timeoutIds.current.set(id, timeoutId);
    }
  }, [closeAlert]);

  useEffect(() => () => {
    timeoutIds.current.forEach((timeoutId) => clearTimeout(timeoutId));
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <Box
        position="fixed"
        top={4}
        right={{ base: 4, md: 6 }}
        zIndex={20}
        width={{ base: "calc(100% - 2rem)", md: "400px" }}
      >
        <VStack align="stretch" gap={3}>
          {alerts.map((alert) => (
            <Alert.Root key={alert.id} status={alert.status} variant="subtle" boxShadow="lg">
              <Alert.Indicator />
              <Alert.Content>
                {alert.title && <Alert.Title>{alert.title}</Alert.Title>}
                <Alert.Description>{alert.description}</Alert.Description>
              </Alert.Content>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Cerrar aviso"
                onClick={() => closeAlert(alert.id)}
              >
                Cerrar
              </Button>
            </Alert.Root>
          ))}
        </VStack>
      </Box>
    </AlertContext.Provider>
  );
}
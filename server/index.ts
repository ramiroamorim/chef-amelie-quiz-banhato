import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configurar servir arquivos de mídia com tipos MIME corretos
app.use('/audio', express.static('public/audio', {
  setHeaders: (res, path) => {
    if (path.endsWith('.mp4')) {
      res.set('Content-Type', 'video/mp4');
    } else if (path.endsWith('.mp3')) {
      res.set('Content-Type', 'audio/mpeg');
    } else if (path.endsWith('.wav')) {
      res.set('Content-Type', 'audio/wav');
    }
    res.set('Accept-Ranges', 'bytes');
  }
}));

// Middleware de logging melhorado
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
    if (capturedJsonResponse) {
      logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
    }

    if (logLine.length > 80) {
      logLine = logLine.slice(0, 79) + "…";
    }

    log(logLine);
  });

  next();
});

// Função para iniciar o servidor
async function startServer() {
  try {
    const server = await registerRoutes(app);

    // Tratamento de erros global
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      
      log(`Error: ${message}`, "error");
      res.status(status).json({ message });
    });

    // Configuração do Vite em desenvolvimento
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    const port = 5001;
    
    // Configuração do servidor com tratamento de erros
    server.on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        log(`Porta ${port} em uso. Tentando reconectar...`, "error");
        setTimeout(() => {
          server.close();
          startServer();
        }, 1000);
      } else {
        log(`Erro no servidor: ${error.message}`, "error");
      }
    });

    // Configuração de eventos do servidor
    server.on('listening', () => {
      log(`Servidor rodando na porta ${port}`);
    });

    server.on('close', () => {
      log('Servidor fechado');
    });

    // Iniciar o servidor
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    });

    // Tratamento de sinais do sistema
    process.on('SIGTERM', () => {
      log('SIGTERM recebido. Fechando servidor...');
      server.close(() => {
        log('Servidor fechado');
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      log('SIGINT recebido. Fechando servidor...');
      server.close(() => {
        log('Servidor fechado');
        process.exit(0);
      });
    });

  } catch (error) {
    log(`Erro ao iniciar servidor: ${error}`, "error");
    process.exit(1);
  }
}

// Iniciar o servidor
startServer();

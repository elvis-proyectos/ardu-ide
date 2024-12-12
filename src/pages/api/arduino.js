import { exec } from 'child_process';

export default function handler(req, res) {
    const { command, args } = req.body;

    // Ruta del Arduino CLI desde .env.local
    const arduinoCLIPath = process.env.ARDUINO_CLI_PATH || 'arduino-cli';

    // Construir el comando
    const fullCommand = `${arduinoCLIPath} ${command} ${args.join(' ')}`;

    // Ejecutar el comando
    exec(fullCommand, (error, stdout, stderr) => {
        if (error) {
            res.status(500).json({ error: stderr });
        } else {
            res.status(200).json({ output: stdout });
        }
    });
}

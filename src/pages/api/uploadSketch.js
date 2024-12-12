import { exec } from 'child_process';
import path from 'path';

export default function handler(req, res) {
    const { port, buildDir } = req.body; // Recibir la ruta buildDir desde la solicitud

    exec(
        `arduino-cli upload -p ${port} --fqbn arduino:avr:uno --input-dir ${buildDir}`,
        (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ error: stderr });
            }
            res.status(200).json({ output: stdout });
        }
    );
}

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const { code } = req.body;

    // Directorio temporal para el sketch
    const sketchDir = 'C:\\tmp\\codigo';
    const sketchFile = path.join(sketchDir, 'codigo.ino');

    // Asegurar que el directorio existe
    if (!fs.existsSync(sketchDir)) {
        fs.mkdirSync(sketchDir, { recursive: true });
    }

    // Guardar el código en el archivo
    fs.writeFileSync(sketchFile, code);

    // Ejecutar la compilación con un directorio de salida
    const buildOutputDir = path.join(sketchDir, 'build');
    exec(
        `arduino-cli compile --fqbn arduino:avr:uno --output-dir ${buildOutputDir} ${sketchFile}`,
        (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ error: stderr });
            }

            res.status(200).json({ output: stdout, buildDir: buildOutputDir });
        }
    );
}

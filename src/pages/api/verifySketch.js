import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { code } = req.body;

            if (!code) {
                return res.status(400).json({ error: 'No se ha enviado el código para verificar.' });
            }

            const tempSketchPath = path.join(__dirname, '../../../temp_verify.ino');

            // Guardar el código temporalmente en el servidor
            fs.writeFileSync(tempSketchPath, code);

            exec(
                `arduino-cli compile --fqbn arduino:avr:uno ${tempSketchPath}`,
                (error, stdout, stderr) => {
                    fs.unlinkSync(tempSketchPath); // Eliminar archivo temporal después de verificar
                    if (error) {
                        return res.status(500).json({ error: stderr });
                    }
                    return res.status(200).json({ output: stdout });
                }
            );
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        return res.status(405).json({ error: 'Método no permitido' });
    }
}

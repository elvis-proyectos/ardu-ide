import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { portName, code } = req.body;
        const tempFilePath = './temp_code.ino';

        try {
            // Guarda el código temporalmente en un archivo
            const fs = require('fs');
            fs.writeFileSync(tempFilePath, code);

            // Compilar y enviar el código usando arduino-cli
            const compileCommand = `arduino-cli compile --port ${portName} ${tempFilePath}`;
            const uploadCommand = `arduino-cli upload -p ${portName} --fqbn arduino:avr:uno ${tempFilePath}`;

            // Ejecutar el comando de compilación
            await execAsync(compileCommand);
            console.log('Código compilado exitosamente.');

            // Ejecutar el comando para enviar código
            await execAsync(uploadCommand);
            console.log('Código enviado exitosamente.');

            res.status(200).json({ message: 'Código compilado y enviado correctamente' });
        } catch (error) {
            console.error('Error al enviar código al Arduino:', error);
            res.status(500).json({ message: 'Error al enviar código al Arduino' });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}

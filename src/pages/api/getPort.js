import { exec } from 'child_process';

export default function handler(req, res) {
    if (req.method === 'GET') {
        exec('arduino-cli board list', (error, stdout, stderr) => {
            if (error) {
                return res.status(500).json({ error: stderr });
            }

            const ports = stdout
                .split('\n')
                .filter(line => line.includes('/dev/') || line.includes('COM'))
                .map(line => line.split('\t')[0]);

            if (ports.length === 0) {
                return res.status(200).json({ port: null });
            }

            // Retornar solo el primer puerto conectado
            res.status(200).json({ port: ports[0] });
        });
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}

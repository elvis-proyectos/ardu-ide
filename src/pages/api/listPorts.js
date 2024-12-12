import { exec } from 'child_process';

export default function handler(req, res) {
    exec('arduino-cli board list', (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr });
        }

        const ports = stdout
            .split('\n')
            .filter((line) => line.includes('tty') || line.includes('COM'))
            .map((line) => line.split(/\s+/)[0]); // Extraer los puertos

        res.status(200).json({ ports });
    });
}

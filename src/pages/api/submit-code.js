// pages/api/submit-code.js
export default function handler(req, res) {
    if (req.method === 'POST') {
        const { code } = req.body;

        console.log('Código enviado:', code);

        // Aquí se puede enviar el código al agente de Arduino Cloud
        // Lógica de envío simulada
        res.status(200).json({ status: 'Código enviado correctamente', code });
    } else {
        res.status(405).json({ error: 'Método no permitido' });
    }
}

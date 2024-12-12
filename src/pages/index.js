import { useState, useEffect } from 'react';

// Página principal de la aplicación Next.js
export default function Home() {
  const [ports, setPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState('');
  const [userCode, setUserCode] = useState('');
  const [status, setStatus] = useState('');
  const [debugInfo, setDebugInfo] = useState('');

  // Función para cargar puertos dinámicamente
  async function fetchPorts() {
    const response = await fetch('/api/listPorts');
    const data = await response.json();
    setPorts(data.ports);
    if (data.ports.length > 0) setSelectedPort(data.ports[0]);
  }

  useEffect(() => {
    fetchPorts();
  }, []);

  // Función para compilar código
  async function compileSketch() {
    if (!userCode) {
      setDebugInfo('Por favor, pega el código para compilar');
      return;
    }

    setDebugInfo('Guardando código y compilando...');
    const response = await fetch('/api/compileSketch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: userCode }),
    });

    const data = await response.json();
    if (response.ok) {
      setStatus(data.output);
      setDebugInfo('Código compilado con éxito');
    } else {
      setDebugInfo(`Error al compilar: ${data.error}`);
    }
  }

  // Función para compilar y luego subir
  async function uploadSketch() {
    setDebugInfo('Subiendo código...');

    // Paso 1: Compilar el código
    const response = await fetch('/api/compileSketch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: userCode }),
    });

    const data = await response.json();
    if (!response.ok) {
      setDebugInfo(`Error al compilar: ${data.error}`);
      return;
    }

    // Paso 2: Enviar el comando para subir
    const uploadResponse = await fetch('/api/uploadSketch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ port: selectedPort, buildDir: data.buildDir }),
    });

    const uploadData = await uploadResponse.json();
    if (uploadResponse.ok) {
      setStatus(uploadData.output);
      setDebugInfo('Código subido correctamente');
    } else {
      setDebugInfo(`Error al subir: ${uploadData.error}`);
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Arduino Cloud Custom Web App</h1>

      {/* Selector de puertos */}
      <label htmlFor="port">Seleccionar dispositivo (puerto):</label>
      <select
        id="port"
        value={selectedPort}
        onChange={(e) => setSelectedPort(e.target.value)}
      >
        {ports.map((port) => (
          <option key={port} value={port}>
            {port}
          </option>
        ))}
      </select>

      <br />
      <br />

      {/* Cuadro para pegar código */}
      <label htmlFor="code">Pega tu código aquí:</label>
      <textarea
        id="code"
        value={userCode}
        onChange={(e) => setUserCode(e.target.value)}
        rows={10}
        cols={50}
        style={{ display: 'block', marginBottom: '10px' }}
      />

      {/* Botones para compilar y subir */}
      <button onClick={compileSketch}>Compilar Código</button>
      <button onClick={uploadSketch}>Subir Código</button>

      <h3>Estado del proceso:</h3>
      <pre>{debugInfo}</pre>
      <h3>Resultado:</h3>
      <pre>{status}</pre>
    </div>
  );
}

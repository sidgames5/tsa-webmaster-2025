export default async function handler(req, res) {
 
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const flaskResponse = await fetch('http://localhost:5000/submit-review', {
      method: 'POST',
      headers: {
        
        ...(req.headers['content-type'] && {'Content-Type': req.headers['content-type']})
      },
      body: req.body
    });

    
    const contentType = flaskResponse.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await flaskResponse.text();
      throw new Error(`Expected JSON but got: ${text.substring(0, 100)}...`);
    }

    const data = await flaskResponse.json();
 
    return res.status(flaskResponse.status).json(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
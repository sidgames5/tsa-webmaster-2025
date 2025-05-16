export default async function handler(req, res) {
    try {
      const flaskResponse = await fetch('http://localhost:5000/get-reviews');
      const data = await flaskResponse.json();
      return res.status(flaskResponse.status).json(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
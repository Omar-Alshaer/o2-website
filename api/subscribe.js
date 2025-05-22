const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  try {
    await client.connect();
    const db = client.db('O2DB');
    const collection = db.collection('emails');
    await collection.insertOne({ email, subscribedAt: new Date() });
    await client.close();
    return res.status(200).json({ message: 'Subscribed successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error: ' + error.message });
  }
}

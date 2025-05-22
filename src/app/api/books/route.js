const { getDb } = require('../../../lib/db');

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const offset = (page - 1) * limit;

  return new Promise((resolve, reject) => {
    const db = getDb();
    db.all('SELECT * FROM books LIMIT ? OFFSET ?', [limit, offset], (err, rows) => {
      if (err) {
        db.close();
        resolve(new Response(JSON.stringify({ error: err.message }), { status: 500 }));
      } else {
        db.get('SELECT COUNT(*) as total FROM books', [], (err2, countRow) => {
          db.close();
          if (err2) {
            resolve(new Response(JSON.stringify({ error: err2.message }), { status: 500 }));
          } else {
            resolve(new Response(JSON.stringify({ books: rows, total: countRow.total }), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }));
          }
        });
      }
    });
  });
} 
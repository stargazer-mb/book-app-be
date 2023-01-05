import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'm9m1b8y2',
  database: 'bookapp',
});

const PORT = 8800;

// For Development
// app.listen(8800, () => {
//   console.log('Connected to backend, hello');
// });

// For Deployment
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on ${PORT}`);
});

app.use(express.json()); // express server middleware, allows to send raw data from client to db
app.use(cors()); // parameter can be a URL

// app.get('/', (req, res) => {
//   res.json('This is the backend');
// });

app.get('/books', (req, res) => {
  const q = 'SELECT * FROM bookapp.books';
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      console.log(data);
      return res.json(data);
    }
  });
});

// app.get('/books/:id', (req, res) => {
//   const q = 'SELECT * FROM books WHERE id = ?';
//   console.log(req.params);
//   const bookID = req.params.id;
//   db.query(q, [bookID], (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       console.log(data);
//       return res.json(data);
//     }
//   });
// });

// app.get('/books/:id', (req, res) => {
//   const bookID = req.params.id;
//   return res.json(bookID);
//   if(bookID !== null)
//   {

//   }
// });

// app.post('/books', (req, res) => {
//   const q = 'INSERT INTO books(`title`,`desc`,`pic`) VALUES (?)';
//   const values = [
//     'title from backend',
//     'description from backend. Lorem ipsum dolor sit amet',
//     'coverpicfrombackend.png',
//   ];

//   db.query(q, [values], (err, data) => {
//     if (err) return res.json(err);
//     else return res.json(data);
//   });
// });

app.post('/books', (req, res) => {
  const q = 'INSERT INTO books(`title`,`desc`,`pic`) VALUES (?)';
  const values = [req.body.title, req.body.desc, req.body.pic];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
});

app.delete('/books/:id', (req, res) => {
  const bookID = req.params.id;
  const q = 'DELETE FROM books WHERE id = ?';

  db.query(q, [bookID], (err, data) => {
    if (err) return res.json(err);
    else return res.json('Deleted Sucessfully');
  });
});

app.put('/books/:id', (req, res) => {
  const bookID = req.params.id;
  const q = 'UPDATE books SET `title` = ?, `desc` = ?, `pic` = ? WHERE id = ?';
  const values = [req.body.title, req.body.desc, req.body.pic];

  db.query(q, [...values, bookID], (err, data) => {
    if (err) return res.json(err);
    return res.json('Updated successfully');
  });
});

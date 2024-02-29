<<<<<<< Updated upstream
import express from "express";
import Product from "../models/storeItems.js";

const router = express.Router();

router.get('/', async (request, response) => {
    try {
      const items = await Product.find({});
  
      return response.status(200).json({
        count: items.length,
        data: items,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

router.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const item = await Product.findById(id);
  
      return response.status(200).json(item);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

router.get('/search', (request, response) => {
    const query = request.query.q;

    Product.find({ $text: { $search: query } })
        .then((products) => {
            response.json(products);
        })
        .catch((err) => {
            console.error('Error searching for products:', err);
            response.status(500).json({ error: 'Failed to search for products' });
        });
});
//   app.post('/books', async (request, response) => {
//     try {
//         if (
//             !request.body.title ||
//             !request.body.author ||
//             !request.body.publishYear
//         ) {
//             return response.status(400).send({message: 'Send all the required fields: title, author, publishYear,'});
//         }
//             const newBook= {
//                 title: request.body.title,
//                 author: request.body.author,
//                 publishYear: request.body.publishYear,
//             };
//             const book= await Book.create(newBook);
//             return response.status(201).send(book);
//     } catch(error) {
//         // console.log(error.message);
//         response.status(500).send({message: error.message});
//     }
// });

=======
import express from "express";
import Product from "../models/storeItems.js";

const router = express.Router();

router.get('/', async (request, response) => {
    try {
      const items = await Product.find({});
  
      return response.status(200).json({
        count: items.length,
        data: items,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

router.get('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const item = await Product.findById(id);
  
      return response.status(200).json(item);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

router.get('/search', (request, response) => {
    const query = request.query.q;

    Product.find({ $text: { $search: query } })
        .then((products) => {
            response.json(products);
        })
        .catch((err) => {
            console.error('Error searching for products:', err);
            response.status(500).json({ error: 'Failed to search for products' });
        });
});
//   app.post('/books', async (request, response) => {
//     try {
//         if (
//             !request.body.title ||
//             !request.body.author ||
//             !request.body.publishYear
//         ) {
//             return response.status(400).send({message: 'Send all the required fields: title, author, publishYear,'});
//         }
//             const newBook= {
//                 title: request.body.title,
//                 author: request.body.author,
//                 publishYear: request.body.publishYear,
//             };
//             const book= await Book.create(newBook);
//             return response.status(201).send(book);
//     } catch(error) {
//         // console.log(error.message);
//         response.status(500).send({message: error.message});
//     }
// });

>>>>>>> Stashed changes
export default router;
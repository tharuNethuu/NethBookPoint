const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const bodyParser = require('body-parser');

const cors = require('cors')
app.use(bodyParser.json());




//middleware
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

//PXT8vWiAXOIcvLVD

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//mongodb configuration



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mern-book-store:W5WKP1xB1kpD8t9H@cluster0.ur1zclj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//notifications
app.use(cors());
app.use(express.json());


client.connect()
  .then(() => {
    db = client.db('BookInventontary'); // Ensure this matches your database name
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });

  const notificationsCollection = client.db("BookInventontary").collection("notifications");

  app.get('/notifications/:email', async (req, res) => {
    try {
      const { email } = req.params;
      const notifications = await notificationsCollection.find({ email }).toArray();
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch notifications' });
    }
  });



app.post('/notifications/:email', async (req, res) => {
  const email = req.params.email;
  const { message } = req.body;
  console.log(`Received message: ${message} for email: ${email}`);

  if (!message) {
    console.log('Message content is required');
    return res.status(400).json({ error: 'Message content is required' });
  }

  const newNotification = {
    email,
    message,
    timestamp: new Date(),
  };

  try {
    const result = await db.collection('notifications').insertOne(newNotification);
    const insertedNotification = await db.collection('notifications').findOne({ _id: result.insertedId });
    console.log('Notification inserted:', insertedNotification);
    res.json(insertedNotification);
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: 'Failed to send notification' });
  }
});

app.get('/notifications/:email', async (req, res) => {
  const notificationsCollection = client.db("BookInventontary").collection("notifications");

  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    const notifications = await notificationsCollection.find({ email }).sort({ timestamp: -1 }).toArray();

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch notifications' });
  }
});

app.delete('/notifications/:email/:messageId', async (req, res) => {
  const notificationsCollection = client.db("BookInventontary").collection("notifications");

  try {
    const { email, messageId } = req.params;

    // Validate email and messageId to prevent injection attacks
    if (!email || !messageId) {
      return res.status(400).json({ success: false, error: 'Email and messageId are required' });
    }

    // Convert messageId to ObjectId if necessary
    const messageObjectId = new ObjectId(messageId);

    // Delete the message
    const result = await notificationsCollection.deleteOne({ email: email, _id: messageObjectId });

    if (result.deletedCount === 1) {
      res.status(200).json({ success: true, message: 'Message deleted successfully' });
    } else {
      res.status(404).json({ success: false, error: 'Message not found' });
    }
  } catch (error) {
    // Return an error response if something goes wrong
    console.error('Error deleting message:', error);
    res.status(500).json({ success: false, error: 'Failed to delete message' });
  }
});


//orders
app.post('/orders', (req, res) => {
  const order = req.body;
  const ordersCollection = client.db("BookInventontary").collection("orders");

  ordersCollection.insertOne(order)
    .then(result => {
      res.status(200).json({ message: 'Order placed successfully', result });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Failed to place order', error });
    });
});

//get all orders
app.get('/orders', async (req, res) => {
  try {
   const { status, province } = req.query;
    const query = {};
    if (status) query.status = status;

    const ordersCollection = client.db("BookInventontary").collection("orders");
    const orders = await ordersCollection.find(query).toArray();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error); // Logging error
    res.status(500).json({ error: error.message });
  }
});

app.get('/ordersdelivery', async (req, res) => {
  try {
    const { status, province, assignedPerson } = req.query;
    const query = {};
    if (status) query.status = status;
    if (province) query.province = province; // Replace hyphens with spaces
    if (assignedPerson) query.assignedPerson = assignedPerson;

    const ordersCollection = client.db("BookInventontary").collection("orders");
    const orders = await ordersCollection.find(query).toArray();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: error.message });
  }
});
 
//search book
app.get('/searchBook', async (req, res) => {
  try {
    const { name } = req.query;

    // Searching for a book by name in the "books" collection
    const booksCollection = client.db("BookInventontary").collection("books");
    const book = await booksCollection.findOne({ bookTitle: name });

    if (book) {
      // If book is found, return it
      res.json({ book });
    } else {
      // If book is not found, return null
      res.json({ book: null });
    }
  } catch (error) {
    console.error('Error searching for book:', error);
    res.status(500).json({ error: 'Error searching for book' });
  }
});




// DELETE route for deleting an order by ID
app.delete('/orders/:id', (req, res) => {
  const ordersCollection = client.db("BookInventontary").collection("orders");

  const { id } = req.params;
  ordersCollection.deleteOne({ _id: new ObjectId(id) })
    .then(result => {
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Order deleted successfully' });
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete order', error });
    });
});


// Route to update order status by ID
app.put('/orders/:id', (req, res) => {
  const ordersCollection = client.db("BookInventontary").collection("orders");

  const { id } = req.params;
  const { status } = req.body;

  ordersCollection.updateOne({ _id: new ObjectId(id) }, { $set: { status } })
    .then(result => {
      if (result.matchedCount === 1) {
        res.status(200).json({ message: 'Order updated successfully' });
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Failed to update order', error });
    });
});

//assigning a person
app.put('/orders/:orderId/assign', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { assignedPerson } = req.body;

    const ordersCollection = client.db("BookInventontary").collection("orders");
    await ordersCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { assignedPerson } }
    );

    res.status(200).json({ message: 'Assigned person updated successfully' });
  } catch (error) {
    console.error('Error updating assigned person:', error);
    res.status(500).json({ error: error.message });
  }
});

//delivery status
app.put('/ordersdelivery/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { delivered } = req.body;

      if (!ObjectId.isValid(id)) {
          return res.status(400).json({ error: 'Invalid order ID format' });
      }

      const objectId = new ObjectId(id);
      const result = await db.collection("orders").updateOne(
          { _id: objectId },
          { $set: { delivered: delivered ? 'Yes' : 'No' } }
      );

      if (result.modifiedCount === 1) {
          res.status(200).json({ message: 'Order delivery status updated successfully' });
      } else {
          res.status(404).json({ message: 'Order not found' });
      }
  } catch (error) {
      console.error('Error updating delivery status:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


// Notifications collection operations
const notificationsCollection = client.db("BookInventontary").collection("notifications");




//create a collection of documents
const bookCollection = client.db("BookInventontary").collection("books");




//insert a book to the db: post method
app.post("/upload-book", async(req, res) => {
    const data = req.body;
    const result = await bookCollection.insertOne(data);
    res.send(result);
})


// get all books from the database
/*  app.get("/all-books",async(req, res) =>{
 const books = bookCollection.find();
 const result = await books.toArray();
 res.send(result);
})  */ 

//update a book data : patch or update methods
app.patch("/book/:id",async(req, res) =>{
    const id = req.params.id;
    //console.log(id);
    const updateBookData = req.body;
    const filter = {_id: new ObjectId(id)};
    const options = { upsert: true };

    const updateDoc = {
        $set: {
            ...updateBookData
        }
    }

    //update
    const result = await bookCollection.updateOne(filter, updateDoc, options);
    res.send(result);
})


//delete a book data
app.delete("/book/:id",async(req, res) =>{
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)};
    const result = await bookCollection.deleteOne(filter);
    res.send(result);

})


//find by category

app.get("/all-books", async (req, res) => {
  let query = {};

  if (req.query.category) {
      query.category = req.query.category; // Use the query parameter to filter
  }

  try {
      const books = bookCollection.find(query); // Apply the query filter
      const result = await books.toArray();
      
      if (result.length === 0) {
          res.status(404).send({ message: "No books found for the specified category." });
      } else {
          res.send(result);
      }
  } catch (error) {
      res.status(500).send({ message: "An error occurred while fetching the books." });
  }
});



//get single book
app.get("/books/:id",async(req, res) =>{
  const id = req.params.id;
 const filter = {_id: new ObjectId(id)};
 const result = await bookCollection.findOne(filter);
 res.send(result);

})
 
 
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

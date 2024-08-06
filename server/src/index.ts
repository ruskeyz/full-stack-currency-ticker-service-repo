import { app } from "./app";

// App Variables
const port = 3001;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

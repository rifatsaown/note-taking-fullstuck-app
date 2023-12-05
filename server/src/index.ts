import "dotenv/config";
import app from './app';
import { connectToDatabase } from './utils/dbConnect';

const port = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectToDatabase();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};
startServer();
import express, { Application} from 'express';    
import dutyRoutes from './routes/duty.routes'

const app: Application = express();

app.use(express.json());
// app.use(cors({
//     origin: '*'
// }));

app.use('/duty', dutyRoutes)

export default app;

import express, { Application} from 'express';    
import dutyRoutes from './routes/duty.routes'
import morgan from 'morgan';

const app: Application = express();

app.use(morgan('dev'));
app.use(express.json());
// app.use(cors({
//     origin: '*'
// }));

app.use('/duty', dutyRoutes)

export default app;

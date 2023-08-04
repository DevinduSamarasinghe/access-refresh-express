import express, {Express, Request, Response} from 'express';
import cors from "cors";
import routes from './routes/routes';
import deserializeUser from './middleware/deserializeUser';


const app:Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = 8080 || process.env.PORT;
const corsOptions = {
    origin: '*',
}
app.use(cors(corsOptions));

//simple route 

app.use(deserializeUser);

app.get('/',(res:Response)=>{
    res.json({message:"Welcome to my application"});
})

function main (){
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })

    routes(app);
}

main();
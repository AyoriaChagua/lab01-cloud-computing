import express from "express";
import { PORT } from "./config.js";
import morgan from "morgan";
import { router} from "./routes/index.js";
import { router_contact } from "./routes/contacts.js";
import { router_auth  } from "./routes/auth.js";
import exphbs from "express-handlebars";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//Settings
app.set("views", path.join(__dirname, "views"))

app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs"
  })
);

app.set("view engine", ".hbs");

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//Global Variables
app.use((req, res, next)=>{
    next();
})

//Rutas
app.use(router);
app.use(router_auth);
app.use('/contacts', router_contact);

//Public
app.use(express.static(path.join(__dirname, 'public')))

//Starting Server
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

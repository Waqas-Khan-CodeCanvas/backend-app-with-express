import cors from "cors";
import { ENV } from "./env";


const corsOption = {
    origin:ENV.CLIENT_URL,
    Credential:true
}

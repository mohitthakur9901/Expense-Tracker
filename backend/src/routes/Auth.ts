import express from 'express'
import { RegisterUser , LoginUser , LogoutUser} from "../controllers/Auth";


const router = express.Router();

router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.post('/logout', LogoutUser);



export default router
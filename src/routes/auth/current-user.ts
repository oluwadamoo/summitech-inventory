import { Router } from 'express';
import { currentUser } from '../../middlewares';
import { User } from '../../models';

const router = Router()

router.get("/api/users/currentuser", currentUser, async (req, res) => {
    let currentUser;

    if (!req.currentUser) {
        currentUser = null
    } else {
        currentUser = await User.findOne({
            where: {
                id: req.currentUser.id
            }
        })
    }
    res.send({ currentUser })
})

export { router as currentUserRouter }
import { Router } from "express";
import followUser from "../../controllers/followers/followUser.js";
import getFollowers from "../../controllers/followers/getFollowers.js";
import getFollowing from "../../controllers/followers/getFollowing.js";
import unfollow from "../../controllers/followers/unfollow.js";
import fetchFollowersInfo from "../../controllers/followers/fetchFollowersInfo.js";
const followerRouter = Router();
followerRouter.post('/follow', followUser);
followerRouter.get('/followed/:username', getFollowers);
followerRouter.get('/following/:username', getFollowing);
followerRouter.delete('/unfollow/:id', unfollow);
followerRouter.get('/followersInfo', fetchFollowersInfo);









export default followerRouter;
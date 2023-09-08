import { Router } from "express";
import followUser from "../../controllers/followers/followUser.ts";
import getFollowers from "../../controllers/followers/getFollowers.ts";
import getFollowing from "../../controllers/followers/getFollowing.ts";
import unfollow from "../../controllers/followers/unfollow.ts";
import fetchFollowersInfo from "../../controllers/followers/fetchFollowersInfo.ts";
const followerRouter = Router();
followerRouter.post("/follow", followUser);
followerRouter.get("/followed/:username", getFollowers);
followerRouter.get("/following/:username", getFollowing);
followerRouter.delete("/unfollow/:id", unfollow);
followerRouter.get("/followersInfo", fetchFollowersInfo);

export default followerRouter;

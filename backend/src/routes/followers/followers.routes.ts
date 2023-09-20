import { Router } from "express";
import followUser from "../../controllers/followers/followUser.ts";
import getFollowers from "../../controllers/followers/getFollowers.ts";
import getFollowing from "../../controllers/followers/getFollowing.ts";
import unfollow from "../../controllers/followers/unfollow.ts";
import fetchFollowersInfo from "../../controllers/followers/fetchFollowersInfo.ts";
import getNotFollowed from "../../controllers/followers/getNotFollowed.ts";
const followerRouter = Router();
followerRouter.post("/follow", followUser);
followerRouter.get("/followed/:id", getFollowers);
followerRouter.get("/notFollowed/:id", getNotFollowed);
followerRouter.get("/following/:id", getFollowing);
followerRouter.delete("/unfollow/:id", unfollow);
followerRouter.get("/followersInfo", fetchFollowersInfo);

export default followerRouter;

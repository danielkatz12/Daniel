import Review, {ReviewData} from "../models/review-model";
import {Response} from "express";
import {AuthRequest} from "../common/auth_middleware";
import {AuthBaseController} from "./auth-base-controller";

class ReviewController extends AuthBaseController<ReviewData> {
    constructor() {
        super(Review);
    }

    async getReviewsByPostId(req: Request, res: Response) {

    }

    async insert(req: AuthRequest, res: Response) {
        console.log("add review:" + req.body);
        super.insert(req, res);
    }
}

export default new ReviewController();

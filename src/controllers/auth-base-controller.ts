import {BaseController} from "./base_controller";
import {AuthRequest} from "../common/auth_middleware";
import {Response} from "express";
import {Model} from "mongoose";

export class AuthBaseController<T> extends BaseController<T> {

    constructor(model: Model<T>) {
        super(model);
    }

    async insert(req: AuthRequest, res: Response) {
        const _id = req.user._id;
        req.body.user = _id;
        super.insert(req, res);
    }

}

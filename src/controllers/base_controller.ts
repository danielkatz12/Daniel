import {Request, Response} from "express";
import {model, Model} from "mongoose";

export class BaseController<T>{
    model: Model<T>;
    constructor(model:Model<T>) {
        this.model = model;
    }

     async get(req : Request, res: Response)  {

        console.log("get all Objects of Model: ");
        try {
            let students;
            if(req.query.name){
                students = await this.model.find({name: req.query.name})
            } else {
                students = await this.model.find();
            }
            res.send(students);
        } catch (err) {
            res.status(500).json({message: err.message});
        }

    }

    async getById(req : Request, res: Response) {
        try {
            const obj = await this.model.findById(req.params.id);
            res.send(obj);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async insert(req : Request, res: Response) {
        console.log("insert object ", req.body);
        // const student = new this.model(req.body);
        try {
            // await student.save();
            const object = await this.model.create(req.body);
            res.status(201).send(object)
        } catch (err) {
            res.status(409).send("Failed to save object... message: " + err.message);
        }


    }

   async putById(req : Request, res: Response) {
        console.log("about to PUT/UPDATE object by ID: " + req.params.id);
        try {
            // const  student = await this.model.findByIdAndUpdate(req.params.id, new Student(req.body), {returnOriginal : false});
            const  student = await this.model.findByIdAndUpdate(req.params.id, req.body, {returnOriginal : false});
            student ?  res.status(200).json({message: "update successfully the object: ", student: student}) :  res.send("update failed for object with ID: " + req.params.id);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async deleteById(req : Request, res: Response){
        console.log("about to delete object with id: " + req.params.id);
        try{
            const student =  await this.model.findByIdAndDelete(req.params.id);
            console.log("deleted successfully object: ", student);
            res.status(200).json({message: "Object with ID: " + req.params.id + " has been deleted successfully", student: student})
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

}

const createController = <T>(model: Model<T>) => {
    return new BaseController<T>(model);
}

export default createController;

import {Request, Response} from "express";
import {Model} from "mongoose";

export class BaseController<T>{
    model: Model<T>;
    constructor(model:Model<T>) {
        this.model = model;
    }

     async get(req : Request, res: Response)  {

        console.log("get all Students");
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
        console.log("get student??? by ID: " + req.params.id);
        try {
            const student = await this.model.findById(req.params.id);
            console.log("enable null value -> will not be catching!! student: ", student)
            res.send(student);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async insert(req : Request, res: Response) {
        console.log("post student ", req.body);
        // const student = new this.model(req.body);
        try {
            // await student.save();
            const object = await this.model.create(req.body);
            res.status(201).send(object)
        } catch (err) {
            res.status(409).send("Failed to save student... message: " + err.message);
        }


    }

   async putById(req : Request, res: Response) {
        console.log("about to PUT/UPDATE student by ID: " + req.params.id);
        try {
            // const  student = await this.model.findByIdAndUpdate(req.params.id, new Student(req.body), {returnOriginal : false});
            const  student = await this.model.findByIdAndUpdate(req.params.id, req.body, {returnOriginal : false});
            student ?  res.status(200).json({message: "update successfully the student: ", student: student}) :  res.send("update failed for student with ID: " + req.params.id);
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

    async deleteById(req : Request, res: Response){
        console.log("about to delete student with id: " + req.params.id);
        try{
            const student =  await this.model.findByIdAndDelete(req.params.id);
            console.log("deleted successfully student: ", student);
            res.status(200).json({message: "Student with ID: " + req.params.id + " has been deleted successfully", student: student})
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }

}

const createController = <T>(model: Model<T>) => {
    return new BaseController<T>(model);
}

export default createController;

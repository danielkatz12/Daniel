import UserProfileDetailsModel, {UserProfileDetailsData} from "../models/user_profile_details_model";
import {Response} from "express";
import {AuthRequest} from "../common/auth_middleware";
import {AuthBaseController} from "./auth-base-controller";

class UserProfileDetailsController extends AuthBaseController<UserProfileDetailsData> {
    constructor() {
        super(UserProfileDetailsModel);
    }

    async insert(req: AuthRequest, res: Response) {
        console.log("post-User-Details:" + req.body);
        super.insert(req, res);
    }

    async deleteById(req: AuthRequest, res: Response) {
        //todo: TO-IMPLEMENT: first you need to delete the image from the server -> transaction?
        super.deleteById(req, res);
    }

    async getByUserId(req: AuthRequest, res: Response) {
        try {
            const user = await UserProfileDetailsModel.findOne({user: req.params.id}).exec();
            if (user) {
                console.log('User Details found:', user);
                res.status(200).send(user);
            } else {
                console.log('User Details not found');
                res.status(404).send('User Details not found')
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).send(`Error fetching user:, ${error}`);
        }
    }

    async updateByUserId(req: AuthRequest, res: Response) {
        try {
            const user = await UserProfileDetailsModel.findOneAndUpdate({user: req.params.id}, req.body,{returnOriginal: false}).exec();
            if (user) {
                console.log('Updated User Details successfully:', user);
                res.status(200).send(user);
            } else {
                console.log('User Details not found');
                res.status(404).send('User Details not found')
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).send(`Error fetching user:, ${error}`);
        }
    }
}

export default new UserProfileDetailsController();


// import {Request, Response} from "express";
// const mongoose = require("mongoose");
// import createController from "./base_controller";
// const userProfileDetailsController = createController<UserProfileDetailsData>(UserProfileDetailsModel);
// export default userProfileDetailsController

// const getAllStudents = async (req : Request, res: Response) => {
//
//     console.log("get all students");
//     try {
//         let students;
//         if(req.query.name){
//             students = await Student.find({name: req.query.name})
//         } else {
//             students = await Student.find();
//         }
//         res.send(students);
//     } catch (err) {
//         res.status(500).json({message: err.message});
//     }
//
//
// }
//
// const getStudentById = async (req : Request, res: Response) => {
//     console.log("get student by ID: " + req.params.id);
//     try {
//         const student = await Student.findById(req.params.id);
//         console.log("enable null value -> will not be catching!! student: ", student)
//         res.send(student);
//     } catch (err) {
//         res.status(500).json({message: err.message});
//     }
// }
//
// const postStudent = async (req : Request, res: Response) => {
//     console.log("post student ", req.body);
//     const student = new Student(req.body);
//     try {
//         await student.save();
//         res.status(201).json({message:"succeeded to save student in post request"})
//     } catch (err) {
//         res.status(409).send("Failed to save student... message: " + err.message);
//     }
//
//
// }
//
// const putStudentById = async (req : Request, res: Response) => {
//     console.log("about to PUT/UPDATE student by ID: " + req.params.id);
//     try {
//        const  student = await Student.findByIdAndUpdate(req.params.id, new Student(req.body), {returnOriginal : false});
//        student ?  res.status(200).json({message: "update successfully the student: ", student: student}) :  res.send("update failed for student with ID: " + req.params.id);
//     } catch (err) {
//         res.status(500).json({message: err.message});
//     }
// }
//
// const deleteStudentById = async (req : Request, res: Response) => {
//     console.log("about to delete student with id: " + req.params.id);
//     try{
//         const student =  await Student.findByIdAndDelete(req.params.id);
//         console.log("deleted successfully student: ", student);
//         res.status(200).json({message: "Student with ID: " + req.params.id + " has been deleted successfully", student: student})
//     } catch (err) {
//         res.status(500).json({message: err.message});
//     }
// }
// export default {
//     getAllStudents,
//     getStudentById,
//     postStudent,
//     putStudentById,
//     deleteStudentById
// };


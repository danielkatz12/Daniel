const Student = require("../models/student_model");
const e = require("express");
const {log} = require("debug");
// const mongoose = require("mongoose");


const getAllStudents = async (req, res) => {

    console.log("get all students");
    try {
        let students = "";
        if(req.query.name){
            students = await Student.find({name: req.query.name})
        } else {
            students = await Student.find();
        }
        res.send(students);
    } catch (err) {
        res.status(500).json({message: err.message});
    }


}

const getStudentById = async (req, res) => {
    console.log("get student by ID: " + req.params.id);
    try {
        const student = await Student.findById(req.params.id);
        console.log("enable null value -> will not be catching!! student: ", student)
        res.send(student);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const postStudent = async (req, res) => {
    console.log("post student ", req.body);
    const student = new Student(req.body);
    try {
        await student.save();
        res.send("succeeded to save student in post request")
    } catch (err) {
        res.send("Failed to save student... message: " + err.message);
    }


}

const putStudentById = async (req, res) => {
    console.log("about to PUT/UPDATE student by ID: " + req.params.id);
    try {
       const  student = await Student.findByIdAndUpdate(req.params.id, new Student(req.body), {returnOriginal : false});
       student ?  res.send("update successfully the student: " + student) :  res.send("update failed for student with ID: " + req.params.id);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const deleteStudentById = async (req, res) => {
    console.log("about to delete student with id: " + req.params.id);
    try{
        const student =  await Student.findByIdAndDelete(req.params.id);
        console.log("deleted successfully student: ", student);
        res.status(200).json("Student: " + student + " has been deleted successfully")
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}


module.exports = {
    getAllStudents,
    getStudentById,
    postStudent,
    putStudentById,
    deleteStudentById
};


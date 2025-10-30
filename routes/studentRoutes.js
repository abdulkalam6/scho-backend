import express from "express";
import student from "../models/Students.js";

const router = express.Router();

// create student post -- sending data to database

router.post("/", async (req, res)=>{
    try{
        const newStudent = new student(req.body);
        const saved = await newStudent.save();
        res.status(201).json(saved);
    }catch(err){
        res.status(500).json({message: err.message});
}});

// get all students

router.get("/", async (req, res)=>{
    const students = await student.find();
    res.json(students);
});

// read a student by id

router.get("/:id", async (req,res) =>{
    const studenties = await student.findById(req.params.id);
    res.json(studenties);
});

// update a student by id

router.put("/:id", async (req, res) =>{
    const updatestudent = await student.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updatestudent)
});

// delete a student by id

router.delete("/:id", async (req, res)=>{
    await student.findByIdAndDelete(req.params.id);
    res.json({message: "Student deleted successfully"})
});

export default router;


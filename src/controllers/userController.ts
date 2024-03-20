import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import fs from 'fs';
import Staff from "../models/UserSchema";
import bcrypt from 'bcrypt';
import { generateToken } from "../utils";

export const createUser = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
        const newStaff = new Staff({
          name: req.body.name,
          staffId: req.body.staffId,
          email: req.body.email,
          department: req.body.department,
          password: bcrypt.hashSync(req.body.password,10),
          userName: req.body.userName,
          managerName: req.body.managerName,
          isVerified: false,
        });
        const staff = await newStaff.save();
        res.status(201).send({
          message: "New Staff succesfully Saved",
        });
      } catch (err) {
        res.status(400).send({
          message:"Staff Failed to save",
        });
      }
    });

  export const login = expressAsyncHandler(async(req:Request,res:Response):Promise<void>=>{
    const staff = await Staff.findOne({ email: req.body.email });
  if (staff) {
    try { console.log("debug1");
      if (bcrypt.compareSync(req.body.password, staff.password)) {
        res.status(200).send({
          name: staff.name,
          staffId: staff.staffId,
          email: staff.email,
          department: staff.department,
          userName: staff.userName,
          managerName: staff.managerName,
          isVerified: false,
          isBusiness: false,
          id: staff._id,
          token: generateToken(staff),
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).send({
        message: "Error signing check input details",
      });
    }
  } else {
    res.status(400).send({
      message: "Invalid email or password ",
    });
  }  

  });
export const updateUser = expressAsyncHandler(async (req: Request, res: Response): Promise<void> => {
    const foundStaff = await Staff.findById(req.params.id);
    console.log(foundStaff);
    try {
      if (foundStaff) {
        foundStaff.name = req.body.name ? req.body.name : foundStaff.name;
        foundStaff.email = req.body.email ? req.body.email : foundStaff.email;
        foundStaff.department = req.body.department ? req.body.department : foundStaff.department;
        foundStaff.userName = req.body.userName ? req.body.userName : foundStaff.userName;
        foundStaff.managerName =req.body.managerName?req.body.managerName:foundStaff.managerName;
        
          console.log(foundStaff);
        await foundStaff.save();
        console.log("debug2");
        res.status(201).send({
          message: "Client updated succesfully",
        });
      } else {
        res.status(400).send({
          message: "An error occured",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).send({
        message: err,
      });
    }
});


export const deleteUser = expressAsyncHandler(async(req:Request,res:Response):Promise<void>=>{
  try {
    const deletedStaff = await Staff.findByIdAndDelete(req.params.id);
    if (deletedStaff) {
        res.status(200).send({
            message: "Staff deleted successfully",
        });
    } else {
        res.status(404).send({
            message: "Staff not found",
        });
    }
} catch (err) {
    console.error(err);
    res.status(500).send({
        message: "Internal server error",
    });
}
});


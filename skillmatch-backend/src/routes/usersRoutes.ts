import express from 'express';
import {getAllJobSeekers,getAllRecruiters, deleteJobSeekers, deleteRecruiter} from '../controllers/usersControllers';

const  usersRouter= express.Router()

usersRouter.get("/JobSeekers", getAllJobSeekers)
usersRouter.get("/Recruiters",  getAllRecruiters)
usersRouter.delete("/:id", deleteJobSeekers)
usersRouter.delete("/:id", deleteRecruiter)


  export default usersRouter;


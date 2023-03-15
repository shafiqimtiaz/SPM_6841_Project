import express from "express";
import * as counselorService from "../../service/counselor.service";
import * as userService from "../../service/user.service";
import { authorizeRoles } from "../../middleware/auth";
const counselorRouter = express.Router();

counselorRouter.post(
  "/appointment",
  authorizeRoles("medical_staff"),
  async (req, res) => {
    const { medicalStaff_Id, patient_Id, assignedStaff_Id, appointmentDate } =
      req.body;

    const user = await userService.findUserById(medicalStaff_Id);
    if (!user) {
      return res.status(404).send("Medical Staff record not found");
    }

    try {
      const appointment = await counselorService.createAppointment(
        appointmentDate,
        patient_Id,
        assignedStaff_Id,
        user
      );
      res.status(200).json(appointment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to create appointment");
    }
  }
);

counselorRouter.get(
  "/patients",
  authorizeRoles("medical_staff"),
  async (req, res) => {
    try {
      const patients = await counselorService.getAllPatients();
      res.status(200).json(patients);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to get patients");
    }
  }
);

counselorRouter.get(
  "/assessments",
  authorizeRoles("medical_staff"),
  async (req, res) => {
    try {
      const assessments = await counselorService.getWaitingAssessments();
      res.status(200).json(assessments);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to get assessments");
    }
  }
);

// Physical delete of an assessment
counselorRouter.delete(
  "/assessments/delete/:assessmentId",
  authorizeRoles("medical_staff"),
  async (req, res) => {
    const { assessmentId } = req.params;

    try {
      const assessment = await counselorService.deleteAssessment(assessmentId);
      res.status(200).json({ deleted: assessment });
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to delete assessment");
    }
  }
);

// Logical delete of an assessment
counselorRouter.put(
  "/assessments/deactivate/:assessmentId",
  authorizeRoles("medical_staff"),
  async (req, res) => {
    const { assessmentId } = req.params;

    try {
      const deactivatedAssessment = await counselorService.deactivateAssessment(
        assessmentId
      );
      res.status(200).json(deactivatedAssessment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to deactivate assessment");
    }
  }
);

counselorRouter.put(
  "/assessments/approve/:assessmentId",
  authorizeRoles("medical_staff"),
  async (req, res) => {
    const { assessmentId } = req.params;
    const { medicalStaff_Id } = req.body;

    try {
      const approvedAssessment = await counselorService.approveAssessment(
        assessmentId,
        medicalStaff_Id
      );

      res.status(200).json(approvedAssessment);
    } catch (error) {
      console.error(error);
      res.status(500).send("Unable to approve assessment");
    }
  }
);

export default counselorRouter;

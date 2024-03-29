# SOEN6841 Winter 2023 Project
## Medical Appointment System

https://med-spm-app.netlify.app/

```
LOGIN INFO
=========================
|-- Manager (1)
    |-- email: m@spm.com
    |-- password: 123456
|-- Patient (4)
    |-- email: p1@spm.com / p2@spm.com / p3@spm.com / p4@spm.com
    |-- password: 123456
|-- Counselor (3)
    |-- email: c1@spm.com / c2@spm.com / c3@spm.com
    |-- password: 123456
|-- Doctor (3)
    |-- email: d1@spm.com / d2@spm.com / d3@spm.com
    |-- password: 123456
```

### Project Title: Collecting data for patients with depression

The objective of this project is to provide an app or a website to help patients, counselors and doctors to have access faster to the medical system. In this system, patients are able to register and perform a self-assessment test in order to get help from a doctor or a counselor. After registering and performing the self-assessment test, these data will be communicated to a counselor for consultation. A counselor will determine to consult more with the patient by giving him/her appointment, or assign the patient to a doctor, or not accepting the patient because the symptoms are not serious. After assigning a patient to a doctor, doctor can go over the patient’s information including the self-assessment test and provide an appointment to the patient. If there is no need to see the patient, the doctor can reject the patient. In either case, the patient will be notified. All the data will be stored in a database in order to provide different type of reports for the management.

The following are the capabilities of each user:

Patient:
1. Registration (Full name, address, date of birth, address, phone number, email address)
2. Self-assessment, see the link down
3. Cancel the assessment
4. See the appointment with a counselor or a doctor
5. Accept or Cancel the appointment

Counselor:
1. Registration (Full name, address, date of birth, address, phone number, email address, counselor registration number)
2. List of patients
3. Self-assessment results
4. Appointments with patients
5. Assigning a patient to a Dr
6. Rejecting a patient

Doctor:
1. Registration (Full name, address, date of birth, address, phone number, email address, doctor registration number)
2. List of his/her patients
3. Self-assessment results for the assigned patients
4. Appointments with Patients
5. Modifying the appointments
6. Rejecting a patient

Manager:
1. Accept or reject a doctor
2. Accept or reject a counselor
3. Add or remove a patient
4. Report: number of patients (day, week, month)

Self-assessment test can be used for this project. It has 9 different questions. How the patients can see the questions is up to you, one questions at a time, or all 9 questions.


import React from "react";
import { TeacherExerciseManager } from "./TeacherExerciseManager";

export const TeacherDashboard = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-education-primary">Painel do Professor</h1>
      <TeacherExerciseManager />
    </div>
  );
};

export default TeacherDashboard;

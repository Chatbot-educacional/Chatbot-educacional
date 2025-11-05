/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_student_mission_progress");

  // Adicionar índice para completed_at para melhor performance em queries
  collection.indexes = [
    "CREATE INDEX `idx_student_mission_progress_mission` ON `student_mission_progress` (`mission`)",
    "CREATE INDEX `idx_student_mission_progress_student` ON `student_mission_progress` (`student`)",
    "CREATE INDEX `idx_student_mission_progress_status` ON `student_mission_progress` (`status`)",
    "CREATE INDEX `idx_student_mission_progress_completed_at` ON `student_mission_progress` (`completed_at`)",
    "CREATE UNIQUE INDEX `idx_unique_student_mission` ON `student_mission_progress` (`mission`, `student`)"
  ];

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_student_mission_progress");
  
  // Remover índice de completed_at
  collection.indexes = [
    "CREATE INDEX `idx_student_mission_progress_mission` ON `student_mission_progress` (`mission`)",
    "CREATE INDEX `idx_student_mission_progress_student` ON `student_mission_progress` (`student`)",
    "CREATE INDEX `idx_student_mission_progress_status` ON `student_mission_progress` (`status`)",
    "CREATE UNIQUE INDEX `idx_unique_student_mission` ON `student_mission_progress` (`mission`, `student`)"
  ];

  return app.save(collection);
})

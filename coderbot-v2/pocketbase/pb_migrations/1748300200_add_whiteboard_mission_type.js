/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_class_missions");

  // Atualizar campo type para incluir whiteboard_interaction
  const typeField = collection.fields.find(f => f.name === "type");
  if (typeField) {
    typeField.values = [
      "chat_interaction",
      "code_execution",
      "exercise_completion",
      "notes_creation",
      "whiteboard_interaction",
      "custom"
    ];
  }

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_class_missions");
  
  // Reverter para valores anteriores
  const typeField = collection.fields.find(f => f.name === "type");
  if (typeField) {
    typeField.values = [
      "chat_interaction",
      "code_execution",
      "exercise_completion",
      "notes_creation",
      "custom"
    ];
  }

  return app.save(collection);
})

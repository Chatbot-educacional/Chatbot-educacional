/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_class_missions");

  // Adicionar campo module_type para relacionar missões com módulos do sistema
  collection.fields.addAt(13, new Field({
    "hidden": false,
    "id": "sel_module_type",
    "maxSelect": 1,
    "name": "module_type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "chat",
      "notes",
      "quadro",
      "ide",
      "general"
    ]
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_class_missions");
  
  // Remover campo module_type
  collection.fields.removeById("sel_module_type");

  return app.save(collection);
})

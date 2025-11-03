/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("contextual_examples")

  // Adicionar campo JSON 'steps' para armazenar estrutura hierárquica de passos
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "json_steps",
    "maxSize": 5000000,
    "name": "steps",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("contextual_examples")

  // Remove o campo 'steps' no rollback
  collection.fields.removeById("json_steps")

  return app.save(collection)
})

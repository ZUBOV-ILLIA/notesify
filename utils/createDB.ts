import { addRxPlugin, createRxDatabase } from "rxdb/plugins/core";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";

export async function makeRxDB() {
  addRxPlugin(RxDBDevModePlugin);

  const db = await createRxDatabase({
    name: "notesify_db",
    storage: wrappedValidateAjvStorage({
      storage: getRxStorageDexie(),
    }),
  });

  await db.addCollections({
    notes: {
      schema: {
        version: 0,
        primaryKey: "id",
        type: "object",
        properties: {
          id: {
            type: "string",
            maxLength: 100,
          },
          title: {
            type: "string",
          },
          body: {
            type: "string",
          },
        },
      },
    },
  });

  return db;
}

import { addRxPlugin, createRxDatabase } from "rxdb/plugins/core";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";

// addRxPlugin(RxDBDevModePlugin);

addRxPlugin(RxDBUpdatePlugin);

export async function makeRxDB() {
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
          updated: {
            type: "number",
          },
        },
      },
    },
  });

  return db;
}

import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  const id = await store.put({ id:1, value:content });
  await tx.complete;
  console.log(`Added content with ID ${id} to the database`);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const allContent = await store.get(1);
  await tx.complete;
  console.log(`Retrieved ${allContent.length} items from the database`);
  return allContent;
};

initdb();

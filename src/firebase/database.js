/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
import app from "../../firebaseConfig";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  updateDoc,
  setDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
const db = getFirestore(app);

const Collection = (name) => {
  return collection(db, name);
};

const Doc = (collection, id = "") => {
  return doc(db, collection, id);
};

const addData = async (data, collection = "users") => {
  return new Promise(async (resolve, reject) => {
    try {
      const useRef = Doc(collection, data.uid);
      await setDoc(useRef, data);
      resolve("Data Berhasil Ditambahkan");
    } catch (error) {
      reject("Data gagal ditambahkan");
    }
  });
};

const readDataAll = async (collection = "users") => {
  return new Promise(async (resolve, reject) => {
    try {
      const useRef = Collection(collection);
      onSnapshot(useRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        resolve(data);
      });
    } catch (error) {
      resolve(error);
    }
  });
};

const readDataSingle = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const useRef = Doc("users", id);
      const data = await getDoc(useRef);
      resolve(data.data());
    } catch (error) {
      reject("ERROR: " + error);
    }
  });
};

const updateData = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const useRef = Doc("users", id);
      await updateDoc(useRef, data);
      resolve("Data Berhasil Diupdate");
    } catch (error) {
      reject("Data gagal diupdate");
    }
  });
};

const hapusData = async (document, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const useRef = Doc(document, id);
      await deleteDoc(useRef);
      resolve("Data Berhasil Dihapus");
    } catch (error) {
      reject("Data gagal dihapus");
    }
  });
};

export { addData, readDataAll, updateData, readDataSingle, hapusData };

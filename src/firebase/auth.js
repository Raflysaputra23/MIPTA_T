/* eslint-disable no-async-promise-executor */
/* eslint-disable no-unused-vars */
/* eslint-disable no-extra-boolean-cast */
import app from "../../firebaseConfig";
import { addData, readDataAll, readDataSingle, updateData } from "./database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  confirmPasswordReset,
} from "firebase/auth";
const auth = getAuth(app);

const Authentication = (access) => {
  onAuthStateChanged(auth, (user) => {
    access(user);
  });
};

const daftarWithManual = async (email, password, dataUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const data = { uid: user.uid, email: user.email, ...dataUser };
      await addData(data);
      await sendEmailVerification(user);
      resolve("Akun Berhasil Dibuat");
    } catch (error) {
      reject("Akun sudah terdaftar");
    }
  });
};

const daftarWithGoogle = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      const data = {
        uid: user.uid,
        email: user.email,
        username: user.displayName,
        role: "user",
        photoURL: user.photoURL,
        kelas: "",
        createAt: new Date(),
      };
      const response = await readDataSingle(user.uid);
      if (!response) await addData(data);
      resolve("Login Berhasil");
    } catch (error) {
      reject("Login Gagal");
    }
  });
};

const resetPassword = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await readDataAll();
      const find = data.some((item) => item.email === email);
      if (find) {
        await sendPasswordResetEmail(auth, email);
        resolve("Silahkan cek email anda");
      } else {
        reject("Email tidak terdaftar");
      }
    } catch (error) {
      reject("Terjadi kesalahan");
      console.log(error);
    }
  });
};

const confirmResetPassword = (token, passwordBaru) => {
  return new Promise(async (resolve, reject) => {
    try {
      await confirmPasswordReset(auth, token, passwordBaru);
      resolve("Reset Password Berhasil");
    } catch (error) {
      reject("Reset Password Gagal");
    }
  });
};

const loginWithManual = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      resolve("Login Berhasil");
    } catch (error) {
      reject("Username / Password Salah");
    }
  });
};

const logout = async (uid) => {
  try {
    signOut(auth);
    await updateData(uid, {status: false});
  } catch(error) {
    console.log(error);
  }

};

export {
  daftarWithManual,
  daftarWithGoogle,
  loginWithManual,
  Authentication,
  logout,
  resetPassword,
  confirmResetPassword,
};

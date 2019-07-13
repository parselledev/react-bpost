import app from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAK_qUQUdk4T1eAn8DIMGuqKrSFym7tpF4",
  authDomain: "bpost-666.firebaseapp.com",
  databaseURL: "https://bpost-666.firebaseio.com",
  projectId: "bpost-666",
  storageBucket: "bpost-666.appspot.com",
  messagingSenderId: "604498189670",
  appId: "1:604498189670:web:d7682d0aedb09de2"
};

export default class ApiService {

  app = app.initializeApp(firebaseConfig);
  db = this.app.database();
  storage = this.app.storage();

  getResource = async (query) => {
    const res = await this.db.ref(query).once('value')
      .then(data => data.val())
      .catch(err => {throw new Error('Ошибка подключения к серверу')});
    return await res;
  };

  updateUsersCount = async (number) => {
    await this.db.ref('users/count').set(number)
  }

  getMails = async () => {
    const res = await this.getResource('mails/data');
    return res;
  }

  putMails = async (mails) => {
    const mailsRef = await this.db.ref('mails');
    await mailsRef.set({...mails});
  }

  updateMail = async (id, mail) => {
    const mailRef = await this.db.ref(`mails/data/${id}`);
    await mailRef.set({...mail});
  }

  addMail = async(mail) => {
    const mailRef = await this.db.ref('mails/data').push({...mail});
    return mailRef.key;
  }

  deleteMail = async(id) => {
    await this.db.ref(`mails/data/${id}`).remove()
      .catch(err => {throw new Error('Ошибка удаления письма')});
  }

  uploadFile = async(dir, file) => {
    const newImgRef = await this.storage.ref().child(`${dir}/${file.name}`).put(file)
      .then(snapshot => snapshot.ref.getDownloadURL())
    return newImgRef;
  }

}
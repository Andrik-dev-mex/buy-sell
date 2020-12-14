import firebase from "firebase/app"
import "firebase/storage";
import "firebase/database"

export const loadUser = (uid) => {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`/users/${uid}`)
      .once("value")
      .then((snapshot) => {
        const userData = snapshot.val();
        //aqui se valida si tiene asciada una imagen de avatar
        if (userData.avatar) {
          //cargar url de avatar
          firebase
            .storage()
            .ref()
            .child(`/avatars/${userData.avatar}`)
            .getDownloadURL()
            .then(
              (url) => {
                //aqui se actuliza el atrivuto avatar
                userData.avatar = url;
                resolve(userData);
              },
              (error) => {
                resolve(userData);
              }
            );
        } else {
          resolve(userData);
        }
      })
      .catch((error) => {
        reject(new Error("Error al leer los datos del usuario"));
      });
  });
};

export function loadPublication(id) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`/publications/${id}`)
      .once("value")
      .then((snapshot) => {
        const productData = snapshot.val();
        //aqui se valida si tiene asciada una imagen de avatar
        if (productData.image) {
          //cargar url de avatar
          firebase
            .storage()
            .ref()
            .child(`/images/${productData.image}`)
            .getDownloadURL()
            .then(
              (url) => {
                //aqui se actuliza el atrivuto avatar
                productData.image = url;
                resolve(productData);
              },
              (error) => {
                resolve(productData);
              }
            );
        } else {
          resolve(productData);
        }
      })
      .catch((error) => {
        reject(new Error("Error al leer los datos de las publicaciones"));
      });
  });
}

export function loadProduct(id) {
  return new Promise((resolve, reject) => {
    firebase
      .database()
      .ref(`/publication/${id}`)
      .once("value")
      .then((snapshot) => {
        const productData = snapshot.val();
        //aqui se valida si tiene asciada una imagen de avatar
        if (productData.image) {
          //cargar url de avatar
          firebase
            .storage()
            .ref()
            .child(`/images/${productData.image}`)
            .getDownloadURL()
            .then(
              (url) => {
                //aqui se actuliza el atrivuto avatar
                productData.image = url;
                resolve(productData);
              },
              (error) => {
                resolve(productData);
              }
            );
        } else {
          resolve(productData);
        }
      })
      .catch((error) => {
        reject(new Error("Error al leer los datos de las publicaciones"));
      });
  });
}

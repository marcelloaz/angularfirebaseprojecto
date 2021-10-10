const functions = require("firebase-functions");
const admin = require("firebase-admin");


const firebaseConfig = {
    apiKey: "AIzaSyB-hC7sLmz1Ix4fOCKWzIW1tBWCVw1IzLg",
    authDomain: "vendafacil-2d9db.firebaseapp.com",
    databaseURL: "https://vendafacil-2d9db.firebaseio.com",
    projectId: "vendafacil-2d9db",
    storageBucket: "vendafacil-2d9db.appspot.com",
    messagingSenderId: "866052965084",
    appId: "1:866052965084:web:fa109cafff53e1609baa19",
    measurementId: "G-7T83JPGM3G"
  };

admin.initializeApp(firebaseConfig);
admin.messaging();
exports.addUsuariosPush = functions.database.ref('usuarios/{usuarioId}').onCreate(async (snapshot, context) => {

    if (snapshot.empty) {
        console.log('No Devices');
        return;
    }

    const payload = {
        notification: {
            title: 'Novo Usuário cadastrado',
            body: 'isso e uma mensagem de testes',
            icon: 'default'
            }
        };

    try {

        const token = 'eobiSU4BBxq97e9_hrDt6N:APA91bGhhZhENMK1u5xftKOeehmvwBt';
        const response = await admin.messaging().sendToDevice(token,payload);

    } catch (err) {
        console.log(err);
    }

})

exports.addCategoria = functions.database.ref('categorias/{categoriaId}').onCreate((snapshot, context) => {

})

exports.updateProduto = functions.database.ref('produtos/{detalhe}').onUpdate((snapshot, context) => {
    console.info("Produto Update");

     const uppercase = snapshot.after.val().value + " log registrado";
     return snapshot.after.ref.child("detalhe").set(uppercase);
})

exports.updateCategoria = functions.database.ref('categoria/{categoriaId}').onUpdate((change, context) => {

        //codigo da net
         if (change.before.exists()) {
            return null;
          }

          if (!change.after.exists()) {
            return null;
          }

          const original = change.after.val();
          console.log('Uppercasing', context.params.pushId, original);
          const uppercase = original.toUpperCase();

          return change.after.ref.parent.child('uppercase').set(uppercase);
})

exports.deleteCategoria = functions.database.ref('categoria/{categoriaId}').onDelete((snapshot, context) => {
    console.log("Categoria delete");
})

exports.changeCategoria = functions.database.ref('categoria/{categoriaId}').onWrite((snapshot, context) => {
    console.log("change change");
})


exports.cardAdded = functions.firestore.document('card/{cardId}').onCreate((snap, context) => {
    console.info('Um novo card adicionado');
})

exports.cardUpdated = functions.firestore.document('card/{cardId}').onUpdate((snap, context) => {
    console.info('Um novo card atualizado');
    const newValue = snap.after.data();
    const oldValue = snap.before.data();
    console.log("New - ", newValue);
    console.log("Old - ", oldValue);
    return snap.after.ref.set({comentario: "teste novo comentario card."}, {merge: true})
})

exports.cardDeleted = functions.firestore.document('card/{cardId}').onDelete((snap, context) => {
    console.info('Um novo card deletado');
})

exports.cardChanged = functions.firestore.document('card/{cardId}').onWrite((snap, context) => {
    console.info('Um novo card changed');
})


exports.addUsuario = functions.https.onCall((data, context) => {

   console.log(data);

    return admin.database().ref("/usuarios").push(data).then(() => {

    }).catch(erro => {console.log(erro)})

 });

 exports.MsgUsuario = functions.https.onCall((data, context) => {

    // const payload = {
    //     notification: {
    //         title: "data.titulo",
    //         body: "data.mensagem",
    //         icon: 'default'
    //         }
    //     };

    // try {

    //     const token = 'eobiSU4BBxq97e9_hrDt6N:APA91bGhhZhENMK1u5xftKOeehmvwBt';
    //     const response = admin.messaging().sendToDevice(token,payload);

    // } catch (err) {
    //     console.log(err);
    // }

  });

exports.Notificar = functions.https.onCall(async(data, context) => {

  const payload = {
    notification: {
        title: data.titulo,
        body: data.mensagem,
        icon: 'default'
        }
    };

    console.log(data.token);

    //local"dBBeCNP5yC2CRW5tkXmhRv:APA91bH8IfxQd63GZNHgK1LM3PlHORP_aCWkY8a9eSv25b2BHGeHYx5F8N8IrrPD7JbQOtv-DrPlM85ZVLwYbCmwUHO7nPQQp9R0Na3K-1FwK3g0gpmEhK_Ode8WN1-sEmaCtyqnRKB4";
    const response = await admin.messaging().sendToDevice(data.token,payload);

    return "mensagem enviada";

});

exports.addCard = functions.https.onCall((data, context) => {

     return admin.database().ref("/produtos").push(
        {
            id: data.id,
            nome: data.nome,
            quantidade: data.quantidade,
            detalhe: data.detalhe,
            categoria: data.categoria,
            valor: data.valor,
            valorFormata: data.valorFormata,
            imagemURL: data.imagemURL,
            imagemSRC: data.imagemSRC,
            categoriaId: data.categoriaId
        }
     ).then(() => {


     }).catch(erro => {console.log(erro)})

});

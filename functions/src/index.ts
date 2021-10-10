import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.addCard = functions.https.onCall((data, context) => {
  return {
    id: data.id,
    nome: data.nome,
    quantidade: data.quantidade,
    detalhe: data.detalhe,
    categoria: data.categoria,
    valor: data.valor,
    valorFormata: data.valorFormata,
    imagemURL: data.imagemURL,
    imagemSRC: data.imagemSRC,
    categoriaId: data.categoriaId,
  };
});

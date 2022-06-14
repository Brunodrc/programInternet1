const { request, response } = require('express');
const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// configuração firestone
var admin =require("firebase-admin");

var serviceAccount = require("./keys.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const bancod = admin.firestore();

//Atividade
// classe postagem

class Postagem{
    
    constructor(text, likes, data) {
        this.text = text;
        this.likes = likes;
        this.data = data
    }
}

class Bloguinho{
    constructor (){
        this.conjupostagens = [];
    }

    localizapost(id){
        const objetoconsutlado = bancod.collection('posts');
        return objetoconsutlado.where('id','==',id);
    }
    criarpost(objetopost){
        
        const criapostnobanco = bancod.collection('posts').add(objetopost);
        response.status(201).json({id: criapostnobanco.id,...objetopost});
    }
}

let meubloguinho1 = new Bloguinho

app.post('/Posts', async (require, response) => {
    let apostagem = new Postagem(require.body.text, require.body.likes, require.body.data);
    meubloguinho1.criarpost(apostagem)
})
app.listen(3000, ()=>{
    console.log("Servidor está rodando!!!");
})

/* aula dia 26/05/22
//rotas

app.get('/Posts',async (request, response) => {
    postsDoc = await bancod.collection("Posts").get();

    const posts = []

    postsDoc.forEach(doc => posts.push({id: doc.id, ...doc.data()}))

    response.status(200).json(posts);
})

app.post('/Posts', async (request, response) =>{
    const {text, likes} = request.body

    const post = {text, likes}

    //retorna o item inserido
    const result = await bancod.collection('posts').add(post);

    response.status(201).json({id: result.id,...post});
})
*/
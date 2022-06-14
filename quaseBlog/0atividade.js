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

//configurar a politica cors
const cors = require('cors')
app.use(cors())

//criar postagem e enviar para o banco de dados
app.post('/Posts', async (request, response) =>{
    let {text, likes, data} = request.body;
    const dataatual = new Date();
    data = dataatual.toLocaleDateString('pt-BR');
    const post = {text, likes, data};

    //retorna o item inserido
    const result = await bancod.collection('posts').add(post);

    response.status(201).json({id: result.id,...post});
})

//buscar uma postagem
app.get('/posts',async (request, response) => {
    
    const postsRef = bancod.collection('posts')

    const postsDoc = await postsRef.get()

    const posts = []

    postsDoc.docs.forEach(doc => posts.push({id: doc.id, ...doc.data()}))

    response.status(200).json(posts);
})
//busca por id
app.get('/posts/:id', async (request, response) =>{
    const id = request.params.id 
    const post = await bancod.collection('posts').doc(id).get()

    return response.json({id: post.id, ...post.data()})
})

app.put('/Posts/:id', (request, response) =>{
    // pegar o objeto pelo id e a atualizar seus valores
    //retornar o objeto com os novos valores
    const { id } = request.params
    //const post = {id, nome} 
    return response.json(post)
})

app.listen(3000, ()=>{
    console.log("Servidor está rodando!!! no http://localhost:3000");
})
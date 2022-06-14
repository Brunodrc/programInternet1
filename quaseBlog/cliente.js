//criar a postagem
const criaPostagem = (item) =>{
    //acessa o elemento template
    const template = document.getElementById('posts-template');

    //faz o clone do elemento template
    const elementoPostagem = document.importNode(template.content, true);

    //os dados que irão constar no template
    const itens_post = elementoPostagem.querySelectorAll('span');
    itens_post[0].innerText = item.text;
    itens_post[1].innerText = item.likes;
    itens_post[2].innerText = Date(item.data);

    return elementoPostagem;
}

//conectar com o backend e listar os posts do banco
const listarPosts = async () =>{
    //fetch é uma promisse, por isso precisa do async e await
    const response = await fetch('http://localhost:3000/posts');
    const dados = await response.json();
    console.log(dados);
    
    dados.forEach(item => {
        //acessa a div time line 
        const divTimeLine = document.getElementById('timeLine');
        
        const elementoPostagem = criaPostagem(item);

        //adiciona um novo post à div time line
        divTimeLine.append(elementoPostagem);

    });
}
const novoPost = async() =>{
        
    const elementoPostTexto = document.getElementById('text');
    const elementoPostLike = document.getElementById('like');

    //cria o objeto pra enviar pro banco de dados
    const dataAtual = new Date();
    
    const postagem = {
        text: elementoPostTexto.value,
        likes: Number(elementoPostLike.value),
        data: dataAtual
    }
    console.log(postagem);
    //chama o metodo post do client (fetch API)
    const init = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(postagem)
    }

    const response = await fetch('http://localhost:3000/posts', init);
    const dados = await response.json();
    console.log(dados);
    
    const divTimeLine = document.getElementById('timeLine');
        
    const elementoPostagem = criaPostagem(dados);

    //adiciona um novo post à div time line
        
    divTimeLine.append(elementoPostagem);

}
//evento botao delete
const eventodelete = () =>{
    
}

//deletar postagem
const deletePost = async()=>{
    //o parametro a ser recebido seria saber qual botao de delete foi clicado, depois deleta o post relacionado ao template do botao delte clicdo, enviar mensagem indicando que o delete foi feito
}

//criar um evento para que tudo só funcione após a pg ser carregada
window.onload = () =>{
    listarPosts();
    
    const botaoAdicionar = document.getElementById('btnPostar');
    botaoAdicionar.onclick = novoPost;

    const btndeletar = document.getElementById('btnDeletar');
    btndeletar.onclick = deletePost;
    
    console.log("tá funcionando!");
}
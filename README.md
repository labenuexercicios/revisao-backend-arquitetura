# Revisão Backend 2

Esse é o repositório de referência para o material de revisão de backend. Temos abaixo um exemplo de enunciado de projeto baseado em um app de playlists que será desenvolvido na dinâmica por meio dos materiais assíncronos. <br>

Leia-o com atenção antes de assistir os vídeos, pois o contexto dos schemas e das funcionalidades são importantes para o entendimento.

# Conteúdos abordados
- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- POO
- Arquitetura em camadas
- Geração de UUID
- Geração de hashes
- Autenticação e autorização
- Roteamento
- Postman

# Banco de dados
![Revisão Backend 2](https://user-images.githubusercontent.com/29845719/218814910-bf37f2b0-b58b-4f3d-9590-b6c12d618da8.png)

https://dbdiagram.io/d/63ebc288296d97641d80ea1c

# Lista de requisitos
- Endpoints
    - [ ]  signup
    - [ ]  login
    - [ ]  get playlists
    - [ ]  create playlist
    - [ ]  edit playlist
    - [ ]  delete playlist
    - [ ]  like / dislike playlist

- Autenticação e autorização
    - [ ]  identificação UUID
    - [ ]  senhas hasheadas com Bcrypt
    - [ ]  tokens JWT
 
 - Código
    - [ ]  POO
    - [ ]  Arquitetura em camadas
    - [ ]  Roteadores no Express

# Exemplos de requisição

## Signup
Endpoint público utilizado para cadastro. Devolve um token jwt.
```typescript
// request POST /users/signup
// body JSON
{
  "name": "Beltrana",
  "email": "beltrana@email.com",
  "password": "beltrana00"
}

// response
// status 201 CREATED
{
  token: "um token jwt"
}
```

## Login
Endpoint público utilizado para login. Devolve um token jwt.
```typescript
// request POST /users/login
// body JSON
{
  "email": "beltrana@email.com",
  "password": "beltrana00"
}

// response
// status 200 OK
{
  token: "um token jwt"
}
```

## Get playlists
Endpoint protegido, requer um token jwt para acessá-lo.
```typescript
// request GET /playlists
// headers.authorization = "token jwt"

// response
// status 200 OK
[
    {
        "id": "uma uuid v4",
        "name": "Samba churrasco",
        "likes": 2,
        "dislikes": 1,
        "createdAt": "2023-01-20T12:11:47:000Z"
        "updatedAt": "2023-01-20T12:11:47:000Z"
        "creator": {
            "id": "uma uuid v4",
            "name": "Fulano"
        }
    },
    {
        "id": "uma uuid v4",
        "name": "Rock and Roll",
        "likes": 0,
        "dislikes": 0,
        "createdAt": "2023-01-20T15:41:12:000Z"
        "updatedAt": "2023-01-20T15:49:55:000Z"
        "creator": {
            "id": "uma uuid v4",
            "name": "Ciclana"
        }
    }
]
```

## Create playlists
Endpoint protegido, requer um token jwt para acessá-lo.
```typescript
// request POST /playlists
// headers.authorization = "token jwt"
// body JSON
{
    "name": "Coding Focus"
}

// response
// status 201 CREATED
```

## Edit playlist
Endpoint protegido, requer um token jwt para acessá-lo.<br>
Só quem criou a playlist pode editá-lo e somente o nome pode ser editado.
```typescript
// request PUT /playlists/:id
// headers.authorization = "token jwt"
// body JSON
{
    "name": "Rock & Roll"
}

// response
// status 200 OK
```

## Delete playlist
Endpoint protegido, requer um token jwt para acessá-lo.<br>
Só quem criou a playlist pode deletá-lo. Admins podem deletar a playlist de qualquer pessoa.

```typescript
// request DELETE /playlists/:id
// headers.authorization = "token jwt"

// response
// status 200 OK
```

## Like or dislike playlist (mesmo endpoint faz as duas coisas)

Endpoint protegido, requer um token jwt para acessá-lo.<br>
Quem criou a playlist não pode dar like ou dislike na mesma.<br><br>
Caso dê um like em uma playlist que já tenha dado like, o like é desfeito.<br>
Caso dê um dislike em uma playlist que já tenha dado dislike, o dislike é desfeito.<br><br>
Caso dê um like em uma playlist que tenha dado dislike, o like sobrescreve o dislike.<br>
Caso dê um dislike em uma playlist que tenha dado like, o dislike sobrescreve o like.
### Like (funcionalidade 1)
```typescript
// request PUT /playlists/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    "like": true
}

// response
// status 200 OK
```

### Dislike (funcionalidade 2)
```typescript
// request PUT /playlists/:id/like
// headers.authorization = "token jwt"
// body JSON
{
    "like": false
}

// response
// status 200 OK
```

### Para entender a tabela likes_dislikes
- no SQLite, lógicas booleanas devem ser controladas via 0 e 1 (INTEGER)
- quando like valer 1 na tabela é porque a pessoa deu like na playlist
    - na requisição like é true
    
- quando like valor 0 na tabela é porque a pessoa deu dislike na playlist
    - na requisição like é false
    
- caso não exista um registro na tabela de relação, é porque a pessoa não deu like nem dislike
- caso dê like em uma playlist que já tenha dado like, o like é removido (deleta o item da tabela)
- caso dê dislike em uma playlist que já tenha dado dislike, o dislike é removido (deleta o item da tabela)

# Documentação POSTMAN
https://documenter.getpostman.com/view/21151478/2s93CExHF2

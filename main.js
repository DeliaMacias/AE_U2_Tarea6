/*
    Autor: Delia Macias Urzua
    correo: demamaciasur@ittepic.edu.mx
    NoControl: 15401021
    Instituto Tecnológico de Tepic
*/
//conection

var mongoose = require('mongoose');
var schema = require('./schema');

mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser: true, useFindAndModify: false  });

//MODELO 
//Parameters , mode name, shcema,collection name
//                        nombre del modelo  coleccion en la base de atos
var Book = mongoose.model('Book',schema,'book');

//DOCUMENTO (al guardar un elemento)


function post(book){
    book.save((error) => {
        if(error){
            console.log(error);
            process.exit(1);
        }
        console.log("<-----------Libro Guardado Exitosamente----------->");
        process.exit(0);
    });
}


function getAll(){
    Book.find({}, (error, docs) => {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        console.log("<----------Consulta General--------->");
        console.log(docs);
        process.exit(0);
    });
}

function getByAuthor(author){
    //find --todos
    //findOne -- solo uno
    Book.findOne({author:author}, (error, docs) => {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        console.log("<----------Consulta por Author:--------->");
        console.log(docs);
        process.exit(0);
    });
}

function put(author,book){                     //retornar documento nuevo
    Book.findOneAndUpdate({author:author}, book, {new:true}, (error,docs) => {
        if (error) {
            console.log(error);
            process.exit(1);
        }
        console.log("<--------Actualización--------->");
        console.log(docs);
        process.exit(0);
    });
}

    

function delet(author){
    Book.findOneAndRemove ({author:author},  (error,docs) => {
        if (error){
            console.log(error);
            process.exit(1);
        }
        console.log("<-----------Eliminado----------->")
        console.log(docs);
        process.exit(0);
    });
}
var busqueda="Lora C.";
var act={
    meta:{
        votes: 22,
        favs: 2
    },
    comments:[{
        date:'2019-06-30'
    }],
    date: '2019-06-30',
    hidden: true
}



var book = new Book({
    title: '100 canciones par vivir',
    author: 'Lora C.',
    body: 'No hay nada mejor que la verdad.',
    comments:[{
        body: 'Me agradó bastante',
        date: '2019-02-12'
    }],
    date: '2018-01-28',
    hidden: true,
    meta: {
        votes: 1021,
        favs: 1000
    }
});
post(book);
getAll();
getByAuthor(busqueda);
put(busqueda,act);
delet(busqueda);




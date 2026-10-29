let form = document.getElementById('form-1')
let title = document.getElementById('title');
let auteur = document.getElementById('auteur')
let year = document.getElementById('year')
let genre = document.getElementById('genre')
let description = document.getElementById('description')
let stats = document.getElementById('status')
let btnAjouterlivre = document.getElementById('Ajouterlivre')
let errortitle = document.getElementById('error-title')
let errorauteur = document.getElementById('error-auteur')
let tbodylivre = document.getElementById('tbody-livre')

let searchtitle = document.getElementById('searchtitle')
let searchauthor = document.getElementById('searchauthor')


let mood = "create";
let tmp;



// console.log(title,auteur,year,genre,description,stats,btnAjouterlivre)


//creer livre
let datalivre ;

if(localStorage.Livre!=null){
    datalivre = JSON.parse(localStorage.Livre)
}else{
    datalivre = [];
}



function createlivre(){
    let newlivre = {
        title : title.value.toLowerCase() ,
        auteur : auteur.value.toLowerCase(),
        year : year.value,
        genre : genre.value,
        description : description.value,
        stats : stats.value
    }
        datalivre.push(newlivre)
    
    localStorage.setItem('Livre',   JSON.stringify(datalivre)      )
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    let titreValide = validerTitle();
    let auteurValide = validerauteur();

    if (!titreValide) {
        title.focus();
    } else if (!auteurValide) {
        auteur.focus();
    } else if (mood === "create") {
        createlivre();
    } else {
        datalivre[tmp] = {
            title: title.value.toLowerCase(),
            auteur: auteur.value.toLowerCase(),
            year: year.value,
            genre: genre.value,
            description: description.value,
            stats: stats.value
        };
        

        localStorage.setItem('Livre', JSON.stringify(datalivre));
    }

    if (titreValide && auteurValide) {
        showdata();
        cleardata();

        mood = "create";
        btnAjouterlivre.textContent = "Ajouter";
    }
});


function validerTitle() {
    let nomLivre = title.value.trim();

    if (nomLivre === "") {
        errortitle.textContent = "Le nom du livre est obligatoire";
        errortitle.classList.remove("hidden");
        return false;
    } else {
        errortitle.textContent = "";
        errortitle.classList.add("hidden");
        return true;
    }
}




function validerauteur(){
    let nomAuteur = auteur.value.trim();
    let regexAuteur = /^[a-zA-ZÀ-ÿ\s'-]+$/;


    if (nomAuteur === "") {
        errorauteur.textContent = "Le nom d'auteur est obligatoire";
        errorauteur.classList.remove("hidden");
        return false;

    } else if (!regexAuteur.test(nomAuteur)) {
        errorauteur.textContent = "Nom invalide";
        errorauteur.classList.remove("hidden");
        return false;

    } else {
        errorauteur.textContent = "";
        errorauteur.classList.add("hidden");
        return true;
    }
}
//afficher dans le tableau

function showdata(){
    let table = '';

    for(let i = 0 ; i<datalivre.length ; i++){
        table+=`
        <tr>
                    <td>${datalivre[i].title}</td>
                    <td>${datalivre[i].auteur}</td>
                    <td>${datalivre[i].year}</td>
                    <td>${datalivre[i].genre}</td>
                    <td>${datalivre[i].description}</td>
                    <td><span>${datalivre[i].stats}</span></td>
                    <td><button onclick="updatedata(${i})" type="button" id="Modifier">Modifier</button></td>
                    <td><button type="button" id="Supprimer">Supprimer</button></td>
        </tr>
        `

    }
    tbodylivre.innerHTML = table;
}

function cleardata(){
    title.value='';
    auteur.value='';
    year.value='';
    genre.value='';
    description.value='';
    stats.value='';

    
}
showdata();


// search mood 

let searchmood="title";

function getsearchmood(id){
    let search=document.getElementById('search')

    if(id== "searchtitle"){
        searchmood = "title";
        search.placeholder='Search by title'
    }else{
        searchmood = "category"
        search.placeholder="Search by author";

    }
    search.focus()
    search.value="";
    showdata();
}

function searchdata(value) {
    let table = "";

    for (let i = 0; i < datalivre.length; i++) {

        if (searchmood === "title") {
            if (datalivre[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${datalivre[i].title}</td>
                        <td>${datalivre[i].auteur}</td>
                        <td>${datalivre[i].year}</td>
                        <td>${datalivre[i].genre}</td>
                        <td>${datalivre[i].description}</td>
                        <td><span>${datalivre[i].stats}</span></td>
                        <td><button type="button" id="Modifier">Modifier</button></td>
                        <td><button type="button" id="Supprimer">Supprimer</button></td>
                    </tr>`;
            }
        } else {
            if (datalivre[i].auteur.toLowerCase().includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${datalivre[i].title}</td>
                        <td>${datalivre[i].auteur}</td>
                        <td>${datalivre[i].year}</td>
                        <td>${datalivre[i].genre}</td>
                        <td>${datalivre[i].description}</td>
                        <td><span>${datalivre[i].stats}</span></td>
                        <td><button type="button" id="Modifier">Modifier</button></td>
                        <td><button type="button" id="Supprimer">Supprimer</button></td>
                    </tr>`;
            }
        }
    }

    tbodylivre.innerHTML = table;
}



let tri = document.getElementById('tri');
tri.addEventListener('change', function () {
    if (tri.value === 'title') {
        datalivre.sort(function (a, b) {
            return a.title.localeCompare(b.title);
        });
    }else if(tri.value === 'year') {
    datalivre.sort(function (a, b) {
        return Number(a.year) - Number(b.year);
    });
}else if (tri.value === 'auteur') {
    datalivre.sort(function (a, b) {
        return a.auteur.localeCompare(b.auteur);
    });
}

    showdata();

    });
    


    //update

    function updatedata(i)
    {
        title.value = datalivre[i].title;
        auteur.value = datalivre[i].auteur;
        year.value = datalivre[i].year;
        genre.value = datalivre[i].genre;
        description.value = datalivre[i].description;
        stats.value = datalivre[i].stats;

        btnAjouterlivre.textContent="Update"


        mood="update"
        tmp = i;
        title.focus();
    }

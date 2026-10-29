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
        title : title.value ,
        auteur : auteur.value,
        year : year.value,
        genre : genre.value,
        description : description.value,
        stats : stats.value
    }
    datalivre.push(newlivre)
    localStorage.setItem('Livre',   JSON.stringify(datalivre)      )
}
form.addEventListener('submit',function(e){
    e.preventDefault();
    let titreValide = validerTitle();
    let auteurValide = validerauteur();

    if (!titreValide) {
    title.focus();
} else if (!auteurValide) {
    auteur.focus();
} else {
    createlivre();
    showdata();
    cleardata()
}

})

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
                    <td><button type="button" id="Modifier">Modifier</button></td>
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
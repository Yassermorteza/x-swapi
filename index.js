var mainElement = document.querySelector('main');

function loadPeople(url, done) {
  fetch(url)
  .then((response)=> response.json())
  .then(load)
  .catch((err)=> console.log('Request failed', err));

  function load(people){
    done(people); 
  }

}


function renderPeople(people) {
  mainElement.innerHTML="";
  var nav = document.createElement('nav');
  var container = document.createElement('div');
  container.classList.add('card');
  people.results.forEach(el=>{
    var section = document.createElement('section');
    section.classList.add('person');
    var gender = '';
    switch (el.gender){
      case 'male':
      gender = '♂';
      break;

      case 'female':
      gender = '♀';
      break;

      case 'n/a':
      gender = '?';
      break;
    }

    section.innerHTML = `<header><h1>
                          <span>${el.name}</span>
                          <span class="gender">${gender}</span>
                        </h1></header>
                        <div>
                         <ul>
                          <li>
                            <span class="label">Birth Year:</span>
                            <span class="value">${el.birth_year}</span>
                          </li>
                          <li>
                            <span class="label">Eye Color:</span>
                            <span class="value">${el.eye_color}</span>
                          </li>
                          <li>
                            <span class="label">Skin Color:</span>
                            <span class="value">${el.skin_color}</span>
                          </li>
                          <li>
                            <span class="label">Hair Color:</span>
                            <span class="value">${el.hair_color}</span>
                          </li>
                          <li>
                            <span class="label">Height:</span>
                            <span class="value">${el.height/10}m</span>
                          </li>
                          <li>
                            <span class="label">Mass:</span>
                            <span class="value">${el.mass}kg</span>
                          </li>
                         </ul>
                        </div>`; 
     container.appendChild(section);
    });
   mainElement.appendChild(container);
   mainElement.appendChild(nav);
   // nav.innerHTML="";
   addButton(people.next,'next', nav);
   addButton(people.previous,'previous', nav);
}

loadPeople('https://swapi.co/api/people/?page=1', renderPeople);

function addButton(url, text, navbar){

  if(!url) return;
  var btn = document.createElement('button');
  btn.textContent = text;
  btn.classList.add(text);
  navbar.appendChild(btn);

  btn.addEventListener('click', ()=>{
   loadPeople(url, renderPeople); 
  });
}






// function createModal(){
//   var modal = document.createElement('div');
//   modal.classList.add('modal');
//   modal.innerHTML = `<div class="body">
//                       <div class="controls">
//                         <nextBtn>close</nextBtn>
//                           </div>
//                           <div class="content"></div>
//                     </div>
//                     <div class="underlay"></div>`;

//   return modal;
// }


// function showModal(contentElement){
//    var content = document.querySelectorAll('.content')
// }


// function loadData(done, url){
   
// }
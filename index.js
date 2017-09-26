var mainElement = document.querySelector('main');

var people = ["name",
              "height",
              "mass",
              "hair_color",
              "skin_color",
              "eye_color",
              "birth_year",
              "gender"];

var planets = ["name", 
                "rotation_period", 
                "orbital_period", 
                "diameter", 
                "climate", 
                "gravity", 
                "terrain", 
                "surface_water", 
                "population"];

var films = ["title", 
              "episode_id", 
              "director", 
              "producer", 
              "release_date", ];

var species = ["name", 
                "classification", 
                "designation", 
                "average_height", 
                "skin_colors", 
                "hair_colors", 
                "eye_colors", 
                "average_lifespan", 
                "language"];

var vehicles = [ "name", 
                  "model", 
                  "manufacturer", 
                  "cost_in_credits", 
                  "length", 
                  "max_atmosphering_speed", 
                  "crew", 
                  "passengers", 
                  "cargo_capacity", 
                  "consumables", 
                  "vehicle_class"];

var starships = ["name", 
                  "model", 
                  "manufacturer", 
                  "cost_in_credits", 
                  "length", 
                  "max_atmosphering_speed", 
                  "crew", 
                  "passengers", 
                  "cargo_capacity", 
                  "consumables", 
                  "hyperdrive_rating", 
                  "MGLT", 
                  "starship_class"];

var arr = '';

function loadData(url, done, keys) {
  fetch(url)
  .then((response)=> response.json())
  .then(load)
  .catch((err)=> console.log('Request failed', err));
  
  function load(data){
    done(data, keys); 
  }
}


function renderData(data, aspects) {

  mainElement.innerHTML="";
  
  var nav = document.createElement('nav');
  var container = document.createElement('div');

  container.classList.add('card');

  data.results.forEach(el=>{
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

        var ul =`<header><h1>
                  <span>${el.name || el.title}</span>
                  <span class="gender">${gender}</span>
                 </h1></header>
                 ${el.opening_crawl ? el.opening_crawl.split('\n').join('<br>') : ''}
                 <div>
                  <ul>`;
        
         aspects.forEach(k=>{

           ul += `<li>
                    <span class="label">${k}:</span>
                    <span class="value">${el[k]}</span>
                  </li>`;
         });

         ul += `</ul></div>`;
        section.innerHTML =  ul;     
       
        container.appendChild(section);
    });

   mainElement.appendChild(container);
   mainElement.appendChild(nav);

   addButton(data.next,'next', nav);
   addButton(data.previous,'previous', nav);
}

function renderMenu(data){
  var ulElement = document.querySelector('body>header nav ul');
  Object.keys(data).forEach((key)=>{

    var itemElement = document.createElement('li');
    var linkElement = document.createElement('a');
    ulElement.appendChild(linkElement);
    ulElement.appendChild(itemElement);
    linkElement.textContent = key;
     linkElement.addEventListener('click', ()=>{
          arr = (eval(key));
          loadData(data[key], renderData, arr);
     });
  });

  loadData('https://swapi.co/api/people', renderData, people); 
}

loadData('https://swapi.co/api/', renderMenu);

function addButton(url, text, navbar){
  if(!url) return;
  var btn = document.createElement('button');
  btn.textContent = text;
  btn.classList.add(text);
  navbar.appendChild(btn);
  
  btn.addEventListener('click', ()=>{
      loadData(url, renderData, arr); 
  });
}



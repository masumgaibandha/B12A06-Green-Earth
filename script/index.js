const loadCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};
// {
//     "id": 1,
//     "category_name": "Fruit Tree",
//     "small_description": "Trees that bear edible fruits like mango, guava, and jackfruit."
// }


const displayCategory = (categories) => {
  // console.log(categories)
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";

  const allLi = document.createElement("li");
  allLi.id = "all"
  allLi.className = "pt-3 hover:bg-[#15803D] rounded cursor-pointer";
allLi.textContent = "All trees";
categoryContainer.append(allLi);

for (const category of categories) {
  const li = document.createElement("li");
  li.id = String(category.id);
  li.className = "pt-3 hover:bg-[#15803D] rounded cursor-pointer";
  li.textContent = category.category_name;
  categoryContainer.append(li);
}
  
  categoryContainer.addEventListener("click", (e) => {
    const allLi = categoryContainer.querySelectorAll("li");
    allLi.forEach((li) => {
      li.classList.remove("bg-[#15803D]", "text-white", "rounded");
    });
    if (e.target.localName === "li") {
      e.target.classList.add("bg-[#15803D]", "text-white", "rounded");
      if(e.target.id === "all"){
        loadAllPlants();
      }
      else{
        loadPlantsCategories(e.target.id)
      }
      
    }
  });
  const allTreesLi = document.getElementById("all");
if (allTreesLi) {
  allTreesLi.classList.add("bg-[#15803D]", "text-white", "rounded");
}
};



const loadPlantsCategories = (categoryId) => {
  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      displayPlants(data.plants);
    })
    .catch((err) => {
      console.log(err);
    });
};
const loadAllPlants = async () => {
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();
    const ids = data.categories.map(cat => cat.id);
    const all = await Promise.all(
      ids.map(id =>
        fetch(`https://openapi.programming-hero.com/api/category/${id}`)
          .then(r => r.json())
          .then(j => j.plants || [])
      )
    );
  displayPlants(all.flat());
  } catch (err) {
    console.error("Error loading all plants:", err);
  }
};
// Modal Tree details
const loadTreeDetails = (id) =>{
  const url = `https://openapi.programming-hero.com/api/plant/${id}`
  fetch(url)
  .then(res => res.json())
  .then((data) => displayTreesDetails(data.plants))

}
// const displayLoadTreeDetails = (plants) =>{

// }

const displayPlants = (plants) => {
  treeContainer.innerHTML = "";
  plants.forEach((plant) => {
    treeContainer.innerHTML += `
 
     <div class="trees-card shadow-lg p-3 rounded-2xl bg-white">
       <div>
        <img src="${plant.image}" alt="" class="h-[350px] rounded-2xl w-full pb-5">
      </div>
      <div>
        <h1 onClick ="loadTreeDetails(${plant.id})" class="font-bold pb-3">${plant.name}</h1>
      <p>${plant.description}</p>
      <div class="flex justify-between py-2">
        <button class="btn rounded-2xl bg-[#DCFCE7]  text-[#15803D]">
        ${plant.category}
      </button>
      <span>৳${plant.price}</span>
      </div>

      </div>
      <!-- Button -->
      <div class="btn w-full rounded-3xl bg-[#15803D] text-white">
        Add to Cart
      </div>

     
     </div>
       
`;
  });
};

const displayTreesDetails = (plant) =>{
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <div class="shadow-lg trees-card p-3 rounded-2xl shadow-[0_8px_30px_rgba(255,255,255,0.8)]">
       <div>
        <img src="${plant.image}" alt="" class="h-[350px] rounded-2xl w-full pb-5">
      </div>
      <div>
        <h1 class="font-semibold">${plant.name}</h1>
      <p>${plant.description}</p>
      <div class="flex justify-between py-2">
        <button class="btn rounded-2xl bg-[#DCFCE7]  text-[#15803D]">
        ${plant.category}
      </button>
      <span>৳${plant.price}</span>
      </div>

      </div>
      <!-- Button -->
      <div class="btn w-full rounded-3xl bg-[#15803D] text-white">
        Add to Cart
      </div>
     </div>
  `;
  document.getElementById('my_modal_3').showModal();
  

}

const treeContainer = document.getElementById("tree-container");

loadCategories();
loadAllPlants();

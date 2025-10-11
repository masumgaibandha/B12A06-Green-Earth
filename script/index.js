const loadCategories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};
let cart = [];
let total = 0;
const cartLimit = 10;

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
  document.getElementById("tree-container").classList.add("hidden");
  document.getElementById("loading-spinner").classList.remove("hidden");

  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      displayPlants(data.plants);
    })
    .catch((err) => {
      console.log(err);
    document.getElementById("loading-spinner").classList.add("hidden");
    document.getElementById("tree-container").classList.remove("hidden");
    });
};
const loadAllPlants = async () => {
  document.getElementById("tree-container").classList.add("hidden");
  document.getElementById("loading-spinner").classList.remove("hidden");
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


const displayPlants = (plants) => {
  treeContainer.innerHTML = "";
  plants.forEach((plant) => {
    treeContainer.innerHTML += `
 
     <div class="trees-card shadow-lg p-3 rounded-2xl bg-white">
       <div>
        <img src="${plant.image}" alt="" class="h-[280px] rounded-2xl w-full pb-5">
      </div>
      <div>
        <h1 onClick ="loadTreeDetails(${plant.id})" class="font-bold pb-3 tree-title">${plant.name}</h1>
      <p>${plant.description}</p>
      <div class="flex justify-between py-2">
        <button class="btn rounded-2xl bg-[#DCFCE7]  text-[#15803D]">
        ${plant.category}
      </button>
      <span class="tree-price">${plant.price}</span>
      </div>

      </div>
      
      <div>
        <button onClick = "addToCard(this)" class="btn btn-active w-full rounded-3xl bg-[#15803D] text-white btn-add">Add to Cart</button>
      </div>

     
     </div>
       
`;
  });
   document.getElementById("tree-container").classList.remove("hidden");
  document.getElementById("loading-spinner").classList.add("hidden");
};

// Modals details
const displayTreesDetails = (plant) =>{
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <div class="shadow-lg trees-card p-3 rounded-2xl shadow-[0_8px_30px_rgba(255,255,255,0.8)]">
       <div>
        <img src="${plant.image}" alt="" class="h-[350px] rounded-2xl w-full pb-5">
      </div>
      <div>
        <h1 class="font-semibold tree-title">${plant.name}</h1>
      <p>${plant.description}</p>
      <div class="flex justify-between py-2">
        <button class="btn rounded-2xl bg-[#DCFCE7]  text-[#15803D]">
        ${plant.category}
      </button>
      <span class="tree-price">${plant.price}</span>
      </div>

      </div>
      <div>
        <button onClick = "addToCard()" class="btn btn-active w-full rounded-3xl bg-[#15803D] text-white btn-add">Add to Cart</button>
      </div>
      
     </div>
  `;
  document.getElementById('my_modal_3').showModal();
  

}

const treeContainer = document.getElementById("tree-container");

loadCategories();
loadAllPlants();


const addToCard = (btn) =>{
  if(cart.length >= cartLimit){
    showCartNotice(`Limit Reached: maximum ${cartLimit} items.`);
    disableAddButtons(true);
    return;
  }
 const card = btn.parentNode.parentNode;
 const treeTitle = card.querySelector(".tree-title").innerText;
 const treePrice = card.querySelector(".tree-price").innerText;
 const treePriceNum = Number(treePrice);
//  console.log(treeTitle, treePriceNum);

const selectedItem = {
  treeTitle: treeTitle,
  treePrice: treePriceNum,
}
cart.push(selectedItem)
console.log(cart)
total += treePriceNum;
displayCart(cart)
displayTotal(total); 
}
 const displayTotal = (val) => {
  document.getElementById('cart-total').innerHTML = `৳${val}`;
 }
// {
//     "treeTitle": "Mango Tree",
//     "treePrice": 500
// }
const displayCart = (cart) =>{
const cartContainer = document.getElementById('cart-container');
cartContainer.innerHTML = "";
for(let item of cart){
  const newItem = document.createElement("div")
  newItem.innerHTML = `
  <div class="card bg-[#f0fdf4] shadow-lg gap-6 mb-3 rounded">
 
   <div class="flex justify-center items-center">
    <div class="card-body">
    <h2 class="card-title">${item.treeTitle}</h2>
    <span class="item-price">৳${item.treePrice}</span>
    
  </div> 
  <div  onClick = "removeCart(this)"><i class="fa-solid fa-xmark mr-8"></i></div>
   </div>
  </div>
  `
  cartContainer.append(newItem);
}
}
const removeCart = (btn) =>{
  const item = btn.parentNode;
  const treeTitle = item.querySelector('.card-title').innerText;
  const treePrice = Number(item.querySelector('.item-price').innerText);
  console.log(treeTitle)
  
  cart = cart.filter((item) => item.treeTitle != treeTitle);
  total = 0;
  cart.forEach((item) => (total += item.treePrice));
  displayCart(cart)
  displayTotal(total);
  
  
}
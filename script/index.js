const loadCategories = () =>{
  const url = "https://openapi.programming-hero.com/api/categories"
  fetch(url)
  .then(res => res.json())
  .then(data => displayCategory(data.categories))
  
}
// {
//     "id": 1,
//     "category_name": "Fruit Tree",
//     "small_description": "Trees that bear edible fruits like mango, guava, and jackfruit."
// }

const displayCategory = (categories) =>{
  // console.log(categories)
  const categoryContainer = document.getElementById('category-container')
  categoryContainer.innerHTML = "";
  
  const allTrees = document.createElement("ul");
  allTrees.innerHTML = `
    <ul class="pt-3 hover:bg-[#15803D] rounded cursor-pointer">
      <li>All trees</li>
    </ul>
  `;
  categoryContainer.append(allTrees);

  for(let category of categories){
    const categoryCard = document.createElement("ul")
    categoryCard.innerHTML = `
    <ul  id="category-container" class=" pt-3 hover:bg-[#15803D] rounded cursor-pointer">
            <li id="${category.id}">${category.category_name}</li>
    </ul>
    `
    categoryContainer.append(categoryCard)
  }
  categoryContainer.addEventListener('click', (e) =>{
    if(e.target.localName === 'li'){
      document.querySelectorAll('#category-container li').forEach(li => {
        li.classList.remove('bg-[#15803D]', 'text-white', 'rounded');

      })
      
      e.target.classList.add('bg-[#15803D]', 'text-white', 'rounded')
    }
  })
}
loadCategories();
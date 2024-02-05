const url = "https://fakestoreapi.com/products/category/"
const seller__tabs = document.querySelector(".seller__tabs")
const tab_all = document.querySelector(".tab_all");
const content__all = document.querySelector(".content__text_all")
const content_electronics = document.querySelector(".content__text_electronics")
const content_jewelery = document.querySelector(".content__text_jewelery")
const content_men = document.querySelector(".content__text_men")
const content_women = document.querySelector(".content__text_women")
const seller__all = document.querySelector(".seller__all")
const seller__electronics = document.querySelector(".seller__electronics")
const seller__jewelery = document.querySelector(".seller__jewelery")
const seller__men = document.querySelector(".seller__men")
const seller__women = document.querySelector(".seller__women")
const content_box = document.querySelector(".content_box")
const open__modal = document.querySelector(".open__modal")
const modal = document.querySelector(".modal")
const close__btn = document.querySelector(".close__btn")
const modal__block = document.querySelector(".modal__block")
const top__bin = document.querySelector(".top__bin")
const modal__sum = document.querySelector(".modal__sum")
const modal__cost = document.querySelector(".modal__total_cost")
const count=document.querySelector(".bin_count_bg")
const modal__total_fee=document.querySelector(".modal__total_fee")


// render
const getRenderAll = (data) => {
  content__all.innerHTML = data.map((item) => `
    <li class="seller__item">
      <img class="seller__photos" src="${item.image}" url="img"></img>
      <h3 class="card__title">${item.title.length > 25 ? item.title.slice(0, 25) + "..." : item.title}</h3>
      <img class="seller__rating" src="./img/rate.svg" url="img"></img>
      <div class="seller__item_block">
        <p class="card__price">$${item.price}</p>
        <p class="card__cost">$599</p>
        <p class="card__dis">24% Off</p>
      </div>
      <button class="add__button" data-id="${item.id}">Buy
      </button>
    </li>
    `).join("")
}

// get data
const getAllObjects = async () => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products`);
    const data = await res.json()
    getRenderAll(data)
  } catch (error) {
    return error
  }
}
getAllObjects()

// --------------------------
seller__tabs.addEventListener("click", (e) => {
  if (e.target.dataset.id == "1") {
    seller__all.classList.add("active")
    seller__electronics.classList.remove("active")
    seller__jewelery.classList.remove("active")
    seller__men.classList.remove("active")
    seller__women.classList.remove("active")
  } else if (e.target.dataset.id == "electronics") {
    seller__all.classList.remove("active")
    seller__electronics.classList.add("active")
    seller__jewelery.classList.remove("active")
    seller__men.classList.remove("active")
    seller__women.classList.remove("active")
  } else if (e.target.dataset.id == "jewelery") {
    seller__all.classList.remove("active")
    seller__electronics.classList.remove("active")
    seller__jewelery.classList.add("active")
    seller__men.classList.remove("active")
    seller__women.classList.remove("active")
  } else if (e.target.dataset.id == "men's clothing") {
    seller__all.classList.remove("active")
    seller__electronics.classList.remove("active")
    seller__jewelery.classList.remove("active")
    seller__men.classList.add("active")
    seller__women.classList.remove("active")
  } else if (e.target.dataset.id == "women's clothing") {
    seller__all.classList.remove("active")
    seller__electronics.classList.remove("active")
    seller__jewelery.classList.remove("active")
    seller__men.classList.remove("active")
    seller__women.classList.add("active")
  }
})

const getRenderCategories = async (data) => {
  seller__jewelery.innerHTML = data.map((item) => `
    <li class="seller__item">
      <img class="seller__photos" src="${item.image}" url="img"></img>
      <h3 class="card__title">${item.title.length > 25 ? item.title.slice(0, 25) + "..." : item.title}</h3>
      <img class="seller__rating" src="./img/rate.svg" url="img"></img>
      <div class="seller__item_block">
        <p class="card__price">$${item.price}</p>
        <p class="card__cost">$599</p>
        <p class="card__dis">24% Off</p>
      </div>
      <button class="add__button" data-id="${item.id}">Buy
      </button>
    </li>
    `).join("")
}

const getCategoriesData = async (category) => {
  try {
    const res = await fetch(`${url}${category}`)
    const data = await res.json()
    getRenderCategories(data);
  } catch (error) {

  }
}
getCategoriesData()

const getId = (id) => {
  getCategoriesData(id)
}

seller__tabs.addEventListener("click", (e) => {
  const id = e.target.dataset.id
  if (id) {
    getId(id);
  }

})
const addStorage = (data) => {
  const oldData = getStorageData();
  if (oldData) {
    localStorage.setItem("product", JSON.stringify([...oldData, data]))
  } else {
    localStorage.setItem("product", JSON.stringify([data]))
  }
}

const getStorageData = () => {
  const total = JSON.parse(localStorage.getItem("product"))
  count.textContent=total.length
  return total
}

const getSingleData = async (e) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${e.target.dataset.id}`)
    const data = await res.json()
    addStorage(data);
  } catch (error) {
  }
  open__modal.classList.add("active")
}

content_box.addEventListener("click", getSingleData)



// storage

// modal
const renderModalData = () => {
    const data = getStorageData()
  if (data) {
    modal__block.innerHTML = data.map((item) => `
    <div class="modal__box">
       <button data-id="${item.id}" class="modal__clear">x</button>
       <img class="modal__image" src="${item.image}" alt="img">
       <h2 class="modal__name">${item.title.length > 15 ? item.title.slice(0, 15) + "..." : item.title}</h2>
       <p class="modal__cost">$${item.price}</p>
    </div>
    `).join("")
  }
}


modal__block.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id)
  if (id) {
    const data = getStorageData();
    localStorage.setItem("product", JSON.stringify(data.filter((item) => item.id !== id)))
  }
  renderModalData()
  renderPrice()
})

const getStorage = () => {
  const result = JSON.parse(localStorage.getItem("product"));

  return result;
}

const renderPrice = () => {
  const data = getStorage();
  let sum = 0;
  if(data) {
      data.forEach((item) => {
        sum += item.price;
      })
    }
    modal__cost.textContent = `$${parseInt(sum)}`;
    modal__total_fee.textContent = `$${parseInt(sum + 20)}`;
  };

  top__bin.addEventListener("click", () => {
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
    renderModalData()
    renderPrice()
  })
  

  open__modal.addEventListener("click", () => {
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
  renderModalData()
  renderPrice()
})
close__btn.addEventListener("click", () => {
  modal.classList.remove("active")
  document.body.style.overflow = "auto"
  
})
// modal

// // search
// const search__btn=document.querySelector(".seller__search_btn");
// const search__data=document.querySelector(".search__data")
// const seller_input=document.querySelector(".seller_input")

// const getSearchData = async () => {
//   try {
//     const res = await fetch(`https://fakestoreapi.com/products`);
//     const data = await res.json()
//     return data
//   } catch (error) {
//     return error
//   }
// }

// seller_input.addEventListener("keydown", async(e)=>{
//   const info= await getSearchData()
//   // console.log(info);
//     search__data.innerHTML=info.filter((item)=>
//     item.name.toLowerCase().includes(input.value.toLowerCase())
//     ).map((item)=>
//     `<h1>${item.id} ${item.title}</h1>`
//     ).join("")
// })


















$('.slider').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1
});
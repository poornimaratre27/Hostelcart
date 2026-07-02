const products = [
    {
        id:1,
        name:"Nescafé Classic Coffee",
        category:"Snacks & Beverages",
        price:160,
        image:"newfolder/coffeee.webp",
        featured:true
    },
    {
        id:2,
        name:"Kellogg's Muesli",
        category:"Snacks & Beverages",
        price:320,
        image:"newfolder/kellogs.webp",
        featured:false
    },
    {
        id:3,
        name:"Maggi 2-Min Noodles",
        category:"Snacks & Beverages",
        price:14,
        image:"newfolder/maggi.webp",
        featured:true
    },
    {
        id:4,
        name:"Classmate Notebook",
        category:"Study Essentials",
        price:70,
        image:"newfolder/classmatenote.webp",
        featured:true
    },
    {
        id:5,
        name:"Pentonic Pen Pack",
        category:"Study Essentials",
        price:100,
        image:"newfolder/pen.jpg",
        featured:false
    },
    {
        id:6,
        name:"Mamaearth Face Wash",
        category:"Personal Care",
        price:250,
        image:"newfolder/mamaearth.jpg",
        featured:false
    },
    {
        id:7,
        name:"Mamaearth Body Wash",
        category:"Personal Care",
        price:379,
        image:"newfolder/mamaearth-deeply-nourishing-body-wash-400-ml.webp",
        featured:false
    },
    {
        id:8,
        name:"BoAt Earphones",
        category:"Tech Essentials",
        price:399,
        image:"newfolder/boat.webp",
        featured:true
    },
    {
        id:9,
        name:"Mi Power Bank 10000mAh",
        category:"Tech Essentials",
        price:1199,
        image:"newfolder/Power-Bank.avif",
        featured:false
    },
    {
        id:10,
        name:"Water Bottle",
        category:"Room Essentials",
        price:150,
        image:"newfolder/school-water-bottle-1536x1536.jpeg",
        discount:"32% Off",
        featured:false
    },
    {
        id:11,
        name:"Cloth Hangers",
        category:"Room Essentials",
        price:120,
        image:"newfolder/h1.jpg",
        featured:false
    },
    {
        id:12,
        name:"Laptop",
        category:"Tech Essentials",
        price:153999,
        image:"newfolder/laptop.webp",
        featured:false
    }
];

let cart=[];
let discountAmount=0;
let currentCategory="All";


document.addEventListener("DOMContentLoaded",()=>{

    setupTheme();
    renderFeatured();
    renderCategories();
    renderProducts(products);
    updateCartDOM();
    switchView("home");

});


/* PAGE SWITCH */

function switchView(viewName){

    document
    .querySelectorAll(".page-view")
    .forEach(view=>view.classList.add("hidden"));

    document
    .querySelectorAll(".nav-links a")
    .forEach(link=>link.classList.remove("active"));

    document
    .getElementById(`view-${viewName}`)
    .classList.remove("hidden");

    if(viewName==="home"){
        document.getElementById("nav-home").classList.add("active");
    }

    if(viewName==="shop"){
        document.getElementById("nav-shop").classList.add("active");
    }

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}


/* THEME */

function setupTheme(){

    const themeBtn=
    document.getElementById("theme-toggle");

    themeBtn.addEventListener("click",()=>{

        const dark=
        document.documentElement.getAttribute("data-theme")==="dark";

        document.documentElement.setAttribute(
            "data-theme",
            dark ? "light":"dark"
        );

        themeBtn.innerHTML=
        dark
        ?'<i class="fas fa-moon"></i>'
        :'<i class="fas fa-sun"></i>';

    });

}


/* FEATURED */

function renderFeatured(){

    const featured=
    products.filter(product=>product.featured);

    document.getElementById(
        "featured-grid"
    ).innerHTML=
    generateProductsHTML(featured);

}


/* CATEGORY */

function renderCategories(){

    const categories=[
        "All",
        ...new Set(
            products.map(
                product=>product.category
            )
        )
    ];

    document.getElementById(
        "category-filters"
    ).innerHTML=

    categories.map(category=>`

    <button
    class="cat-tab ${category==="All"?"active":""}"
    onclick="filterByCategory('${category}',this)">
    ${category}
    </button>

    `).join("");

}


function filterByCategory(category,button){

    currentCategory=category;

    document
    .querySelectorAll(".cat-tab")
    .forEach(tab=>tab.classList.remove("active"));

    button.classList.add("active");

    filterProducts();

}


/* SEARCH */

function filterProducts(){

    const search=
    document
    .getElementById("search-input")
    .value
    .toLowerCase();

    const filtered=
    products.filter(product=>{

        const categoryMatch=
        currentCategory==="All" ||
        product.category===currentCategory;

        const searchMatch=
        product.name.toLowerCase().includes(search);

        return categoryMatch && searchMatch;

    });

    renderProducts(filtered);

}


/* PRODUCTS */

function renderProducts(productList){

    document.getElementById(
        "products-grid"
    ).innerHTML=
    generateProductsHTML(productList);

}


function generateProductsHTML(productList){

    return productList.map(product=>`

    <div class="product-card">

        ${product.discount?
        `<span class="discount-badge">${product.discount}</span>`
        :""
        }

        <div class="img-container">
            <img src="${product.image}">
        </div>

        <div class="card-details">

            <span class="brand">
            ${product.category}
            </span>

            <h4 class="title">
            ${product.name}
            </h4>

            <div class="card-footer">

                <span class="price">
                ₹${product.price}
                </span>

                <button
                class="cart-action-btn"
                onclick="addToCart(${product.id})">

                <i class="fas fa-shopping-cart"></i>

                </button>

            </div>

        </div>

    </div>

    `).join("");

}


/* CART */

function addToCart(id){

    const product=
    products.find(item=>item.id===id);

    const existing=
    cart.find(item=>item.id===id);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({
            ...product,
            quantity:1
        });

    }

    updateCartDOM();

    showToast(`Item added to cart ✓`);

}


function changeQty(id,amount){

    const item=
    cart.find(product=>product.id===id);

    item.quantity+=amount;

    if(item.quantity<=0){

        cart=
        cart.filter(product=>product.id!==id);

    }

    updateCartDOM();

}


function applyCoupon(){

    const coupon=
    document.getElementById("coupon-input")
    .value
    .trim()
    .toUpperCase();

    if(coupon==="HOSTEL10"){

        discountAmount=10;

    }else if(coupon==="STUDENT20"){

        discountAmount=20;

    }else{

        discountAmount=0;
        alert("Invalid Coupon");

    }

    updateCartDOM();

}


function updateCartDOM(){

    document.getElementById(
        "cart-count"
    ).innerText=
    cart.reduce(
        (sum,item)=>sum+item.quantity,
        0
    );

    const cartContainer=
    document.getElementById(
        "cart-items-container"
    );

    if(cart.length===0){

        cartContainer.innerHTML=`
        <p style="
        text-align:center;
        padding:30px;
        color:gray;">
        Your cart is empty
        </p>
        `;

    }else{

        cartContainer.innerHTML=
        cart.map(item=>`

        <div class="cart-list-item">

            <div class="cart-img">
                <img src="${item.image}">
            </div>

            <div class="cart-meta">

                <h5>${item.name}</h5>

                <p>
                ₹${item.price*item.quantity}
                </p>

                <div class="quantity-cluster">

                    <button
                    class="cluster-btn"
                    onclick="changeQty(${item.id},-1)">
                    -
                    </button>

                    <span>
                    ${item.quantity}
                    </span>

                    <button
                    class="cluster-btn"
                    onclick="changeQty(${item.id},1)">
                    +
                    </button>

                </div>

            </div>

        </div>

        `).join("");

    }

    const subtotal=
    cart.reduce(
        (sum,item)=>
        sum+(item.price*item.quantity),
        0
    );

    const delivery=
    subtotal>0 && subtotal<100
    ?40
    :0;

    let total=
    subtotal+delivery;

    if(discountAmount>0){

        total=
        total-
        (total*discountAmount/100);

    }

    document.getElementById(
        "subtotal-val"
    ).innerText=`₹${subtotal}`;

    document.getElementById(
        "delivery-val"
    ).innerText=
    delivery===0 && subtotal>0
    ?"FREE"
    :`₹${delivery}`;

    document.getElementById(
        "discount-val"
    ).innerText=
    `${discountAmount}%`;

    document.getElementById(
        "total-val"
    ).innerText=
    `₹${total}`;

}

function showToast(message){

    const toast =
    document.getElementById("toast");

    const text =
    document.getElementById("toast-text");

    text.innerText = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}


function checkout(){

    if(cart.length===0){

        alert("Your cart is empty");
        return;

    }

    alert("Order placed successfully!");

    cart=[];

    updateCartDOM();

    switchView("home");

}


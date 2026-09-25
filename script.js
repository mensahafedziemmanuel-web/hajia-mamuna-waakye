const PHONE = "233509333376";
const PHONE_DISPLAY = "050 933 3376";
const menuItems = [
  {id:1,name:"Classic Waakye",description:"Rice and beans served with gari, spaghetti, rich shito and fresh salad.",price:25,image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Waakye_with_vegetables%2C_fish_and_egg_with_ripe_plantains.jpg/960px-Waakye_with_vegetables%2C_fish_and_egg_with_ripe_plantains.jpg",tag:"Popular"},
  {id:2,name:"Waakye Special",description:"A generous serving with egg, wele, gari, spaghetti and shito.",price:40,image:"https://commons.wikimedia.org/wiki/Special:FilePath/Waakye.jpg?width=960",tag:"Best value"},
  {id:3,name:"Waakye with Chicken",description:"Authentic waakye served with tender chicken and your favourite sides.",price:50,image:"https://commons.wikimedia.org/wiki/Special:FilePath/Ghanaian%20waakye.jpg?width=719",tag:"Customer favourite"},
  {id:4,name:"Waakye Family Pack",description:"A hearty waakye pack made for sharing with family, friends or colleagues.",price:120,image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Waakye_with_vegetables%2C_fish_and_egg_with_ripe_plantains.jpg/960px-Waakye_with_vegetables%2C_fish_and_egg_with_ripe_plantains.jpg",tag:"Made to share"}
];
const cart = {};
const $ = id => document.getElementById(id);
const menuGrid=$("menuGrid"),cartPanel=$("cart"),overlay=$("overlay"),cartItems=$("cartItems"),cartCount=$("cartCount"),cartTotal=$("cartTotal"),whatsappOrder=$("whatsappOrder"),momoOrder=$("momoOrder"),paymentModal=$("paymentModal");
let currentTotal=0;
function renderMenu(){menuGrid.innerHTML=menuItems.map(i=>`<article class="menu-card reveal"><div class="image-box"><img src="${i.image}" alt="${i.name}"><span class="tag">${i.tag}</span></div><div class="card-body"><h3>${i.name}</h3><p>${i.description}</p><div class="card-bottom"><span class="price">GH₵${i.price}</span>${cart[i.id]?`<div class="qty"><button onclick="changeQty(${i.id},-1)" aria-label="Remove one ${i.name}">−</button><span>${cart[i.id]}</span><button onclick="changeQty(${i.id},1)" aria-label="Add one ${i.name}">+</button></div>`:`<button class="add-btn" onclick="changeQty(${i.id},1)" aria-label="Add ${i.name}">+</button>`}</div></div></article>`).join("")}
function changeQty(id,amount){cart[id]=Math.max(0,(cart[id]||0)+amount);renderMenu();renderCart()}
function selectedItems(){return menuItems.filter(i=>cart[i.id])}
function orderText(){const lines=selectedItems().map(i=>`${cart[i.id]} x ${i.name} - GH₵${cart[i.id]*i.price}`).join("\n");return `Hello Hajia Mamuna Waakye, I would like to place an order:\n\n${lines}\n\nTotal: GH₵${currentTotal}\nOrder type: Pickup / Delivery\nPayment: Mobile Money / Pay on pickup\nMy location: `}
function renderCart(){const selected=selectedItems();const count=selected.reduce((s,i)=>s+cart[i.id],0);currentTotal=selected.reduce((s,i)=>s+cart[i.id]*i.price,0);cartCount.textContent=count;cartTotal.textContent=`GH₵${currentTotal}`;momoOrder.textContent=`Pay GH₵${currentTotal} with MoMo`;whatsappOrder.disabled=!count;momoOrder.disabled=!count;cartItems.innerHTML=count?selected.map(i=>`<div class="cart-row"><img src="${i.image}" alt=""><div><h4>${i.name}</h4><strong>GH₵${i.price*cart[i.id]}</strong></div><div class="mini-qty"><button onclick="changeQty(${i.id},-1)">−</button><b>${cart[i.id]}</b><button onclick="changeQty(${i.id},1)">+</button></div></div>`).join(""):`<div class="empty">🛍️<h3>Your basket is empty</h3><p>Add something delicious from the menu.</p></div>`;whatsappOrder.onclick=()=>window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(orderText())}`,"_blank")}
function openCart(){cartPanel.classList.add("open");overlay.classList.add("open");cartPanel.setAttribute("aria-hidden","false")}
function closeCart(){cartPanel.classList.remove("open");overlay.classList.remove("open");cartPanel.setAttribute("aria-hidden","true")}
function openPayment(){closeCart();$("paymentTotal").textContent=currentTotal?`Order total: GH₵${currentTotal}`:"Confirm the amount on WhatsApp before payment.";const msg=`Hello Hajia Mamuna Waakye, I want to pay${currentTotal?` GH₵${currentTotal}`:""} by Mobile Money. Please confirm the registered MoMo name and payment instructions.`;$("confirmPayment").href=`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`;paymentModal.classList.add("open");paymentModal.setAttribute("aria-hidden","false")}
function closePayment(){paymentModal.classList.remove("open");paymentModal.setAttribute("aria-hidden","true")}
$("basketBtn").onclick=openCart;$("closeCart").onclick=closeCart;overlay.onclick=closeCart;$("momoOrder").onclick=openPayment;$("contactPayBtn").onclick=openPayment;$("closePayment").onclick=closePayment;paymentModal.onclick=e=>{if(e.target===paymentModal)closePayment()};
$("copyNumber").onclick=async()=>{try{await navigator.clipboard.writeText(PHONE_DISPLAY.replaceAll(" ",""));$("copyNumber").textContent="Copied";setTimeout(()=>$("copyNumber").textContent="Copy",1800)}catch{$("copyNumber").textContent=PHONE_DISPLAY}};
const menuToggle=$("menuToggle"),mainNav=$("mainNav");menuToggle.onclick=()=>{mainNav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",mainNav.classList.contains("open"))};mainNav.querySelectorAll("a").forEach(a=>a.onclick=()=>mainNav.classList.remove("open"));
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeCart();closePayment()}});renderMenu();renderCart();
// Replace any image that fails to load with a verified waakye photograph.
document.addEventListener("error", event => {
  if (event.target.tagName === "IMG" && event.target.src !== "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Waakye_with_vegetables%2C_fish_and_egg_with_ripe_plantains.jpg/960px-Waakye_with_vegetables%2C_fish_and_egg_with_ripe_plantains.jpg") {
    event.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Waakye_with_vegetables%2C_fish_and_egg_with_ripe_plantains.jpg/960px-Waakye_with_vegetables%2C_fish_and_egg_with_ripe_plantains.jpg";
  }
}, true);

const guitarProducts = [
// قسم جيتارات Fender
{ id: 'f1', brand: 'Fender', name: 'Jazz Bass', price: 1003, image: 'JazzBass.JPG' },
{ id: 'f2', brand: 'Fender', name: 'Precision Bass', price: 981, image: 'PrecisionBass.JPG' },
{ id: 'f3', brand: 'Fender', name: 'Stratocaster', price: 942, image: 'Stratocaster.JPG' },
{ id: 'f4', brand: 'Fender', name: 'Telecaster', price: 1049, image: 'Telecaster.JPG' },    
// قسم جيتارات Gibson
{ id: 'gib1', brand: 'Gibson', name: 'ES-335', price: 1033, image: 'ES-335.JPG' },
{ id: 'gib2', brand: 'Gibson', name: 'Les Paul', price: 1140, image: 'LesPaul.JPG' },
{ id: 'gib3', brand: 'Gibson', name: 'SG', price: 1065, image: 'SG.JPG' },    
// قسم جيتارات Ibanez
{ id: 'ib1', brand: 'Ibanez', name: 'JS1200', price: 1076, image: 'js.JPG' },
{ id: 'ib2', brand: 'Ibanez', name: 'RG550', price: 1059, image: 'rg.JPG' },   
// قسم جيتارات PRS
{ id: 'prs1', brand: 'PRS', name: 'Custom 24', price: 1088, image: 'Custom24.JPG' },
{ id: 'prs2', brand: 'PRS', name: 'SE Standard 24', price: 977, image: 'SEStandard24.JPG' },    
// قسم جيتارات Yamaha
{ id: 'yam1', brand: 'Yamaha', name: 'FG800', price: 1047, image: 'FG800.JPG' },
{ id: 'yam2', brand: 'Yamaha', name: 'P-45', price: 1117, image: 'P-45.JPG' },
{ id: 'yam3', brand: 'Yamaha', name: 'Stage Custom', price: 1001, image: 'StageCustom.JPG' }
];
let cart = JSON.parse(localStorage.getItem('mosiqati_cart')) || [];
document.addEventListener('DOMContentLoaded', () => {
updateCartCount();
renderCartPage();
displayProducts('all');
initSite();
updateGiftsInterface(); 
});
function initSite() {
const sections = document.querySelectorAll('.page-section');
sections.forEach(sec => {
if (sec.id === 'home') {
sec.classList.add('active-section');
} else {
sec.classList.remove('active-section');
}
});
}
function showSection(sectionId, event) {
if (event) event.preventDefault();  
const sections = document.querySelectorAll('.page-section');
sections.forEach(sec => sec.classList.remove('active-section'));
const targetSection = document.getElementById(sectionId);
if (targetSection) targetSection.classList.add('active-section');
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => link.classList.remove('active'));    
if (event && event.currentTarget) {
event.currentTarget.classList.add('active');
}
window.scrollTo({ top: 0, behavior: 'smooth' });
}
function displayProducts(brandFilter) {
const grid = document.getElementById('store-products-grid');
if (!grid) return;
grid.innerHTML = '';
const filtered = brandFilter === 'all' 
? guitarProducts 
: guitarProducts.filter(p => p.brand === brandFilter);
filtered.forEach(product => {
const card = document.createElement('div');
card.className = 'product-card';
card.innerHTML = `
<div class="product-image-wrapper">
<img src="${product.image}" alt="${product.name}">
</div>
<h3>${product.name}</h3>
<div class="product-brand">${product.brand}</div>
<div class="product-price">${product.price} دينار</div>
<button class="btn-add" onclick="addToCart('${product.id}', '${product.brand} - ${product.name}', ${product.price})">إضافة إلى السلة</button>
`;
grid.appendChild(card);
});
}
function filterBrand(brandName, event) {
if (event) event.preventDefault();
const filterButtons = document.querySelectorAll('.btn-filter');
filterButtons.forEach(btn => btn.classList.remove('active'));
if (event && event.target) {
event.target.classList.add('active');
}
displayProducts(brandName);
}
function addToCart(id, name, price) {
const existingItem = cart.find(item => item.id === id);
if (existingItem) {
existingItem.quantity += 1;
} else {
cart.push({ id, name, price, quantity: 1 });
}
saveCart();
updateCartCount();
renderCartPage();
alert(`تم إضافة ${name} إلى السلة بنجاح!`);
}
function saveCart() {
localStorage.setItem('mosiqati_cart', JSON.stringify(cart));
updateGiftsInterface(); 
}
function updateCartCount() {
const cartCountElements = document.querySelectorAll('.cart-count');
const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
cartCountElements.forEach(el => el.innerText = totalItems);
}
function renderCartPage() {
const container = document.getElementById('cart-items-container');
const totalElement = document.getElementById('cart-total-price'); 
if (!container || !totalElement) return;
if (cart.length === 0) {
container.innerHTML = '<p style="text-align:center; padding:20px;">سلة المشتريات فارغة حالياً.</p>';
totalElement.innerText = '0 دينار';
return;
}
container.innerHTML = '';
let total = 0;
cart.forEach(item => {
const itemTotal = item.price * item.quantity;
total += itemTotal;
const row = document.createElement('div');
row.style.display = 'flex';
row.style.justify = 'space-between';
row.style.alignItems = 'center';
row.style.padding = '15px';
row.style.borderBottom = '1px solid #333';
row.innerHTML = `
<div>
<h4>${item.name}</h4>
<p>السعر: ${item.price} دينار × ${item.quantity}</p>
</div>
<div>
<span style="color:#ff0000; font-weight:bold; margin-left:15px;">${itemTotal} دينار</span>
<button onclick="removeFromCart('${item.id}')" style="background:none; border:none; color:#ff0000; cursor:pointer; font-weight:bold;">حذف</button>
</div>
`;
container.appendChild(row);
});
totalElement.innerText = total + ' دينار';
}
function removeFromCart(id) {
cart = cart.filter(item => item.id !== id);
saveCart();
updateCartCount();
renderCartPage();
}
function updateGiftsInterface() {
const giftsContainer = document.getElementById('gifts-status-container');
const cartGiftsContainer = document.getElementById('cart-gifts-status-container');
const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
let statusHTML = "";
const gift1_secured = total >= 1200;
const gift2_secured = total >= 3000;
const gift3_secured = total >= 5000;
if (total < 1200) {
statusHTML += `
<div class="gift-status-box" style="background-color: #1e1e1e; padding: 30px; border-radius: 8px; border: 1px dashed #ff0000; text-align: center; margin-bottom: 25px;">
<div style="font-size: 40px; margin-bottom: 10px;">🎁</div>
<h3 style="color: #fff; margin-bottom: 10px; font-size: 20px;">المكافآت التلقائية مقفلة</h3>
<p style="font-size: 15px; color: #ccc;">تبدأ الهدايا التراكمية عند الشراء بقيمة <b style="color:#ff0000;">1200 دينار</b> أو أكثر.</p>${total > 0 ? `<p style="font-size: 14px; color: #aaa; margin-top: 10px;">متبقي لك <b style="color:#ff0000;">${1200 - total} دينار</b> فقط لفتح أول هدية!</p>` : ''}
</div>
`;
} else {
let nextTierMsg = "";
if (!gift2_secured) {
nextTierMsg = `متبقي لك <b style="color:#ff0000;">${3000 - total} دينار</b> لفتح الهدية التالية: <b>حامل النوتة الفاخر!</b>`;
} else if (!gift3_secured) {
nextTierMsg = `متبقي لك <b style="color:#ff0000;">${5000 - total} دينار</b> لفتح الجائزة الكبرى: <b>خصم الـ 50 دينار كاش!</b>`;
} else {
nextTierMsg = `👑 <b>تهانينا الأسطورية!</b> لقد قمت بفتح جميع الهدايا والخصومات المتاحة في المتجر!`;
}
statusHTML += `
<div class="gift-status-box secured" style="background-color: #142016; padding: 25px; border-radius: 8px; border-right: 4px solid #28a745; margin-bottom: 25px; text-align: center;">
<h3 style="color: #fff; margin-bottom: 5px; font-size: 18px;">🎉 نظام الهدايا التراكمي نشط الآن!</h3>
<p style="font-size: 14px; color: #ccc;">${nextTierMsg}</p>
</div>
`;
}
if (total >= 1200) {
statusHTML += `<div class="products-grid" style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-top: 20px;">`;
statusHTML += `
<div class="product-card" style="border: 1px solid #28a745; background-color: #1a1a1a; max-width: 280px; width: 100%; text-align: center; padding: 15px;">
<div class="product-image-wrapper" style="position: relative; height: 160px;">
<span style="position: absolute; top: 5px; right: 5px; background: #28a745; color: #fff; padding: 3px 8px; font-size: 10px; border-radius: 4px; font-weight: bold;">هدية مستحقة ✔</span>
<img src="41fqVO8GPfS.jpg" alt="جهاز دوزان">
</div>
<h3 style="font-size:16px; margin-top:10px;">جهاز دوزان الآلات الرقمي</h3>
<div class="product-brand" style="color: #28a745; font-size:11px;">مكافأة المستوى 1</div>
<button class="btn-add" style="background-color: #222; color: #555; border-color: #333; font-size:12px; padding:6px;" disabled>مضافة تلقائياً</button>
</div>
`;
if (gift2_secured) {
statusHTML += `
<div class="product-card" style="border: 1px solid #28a745; background-color: #1a1a1a; max-width: 280px; width: 100%; text-align: center; padding: 15px;">
<div class="product-image-wrapper" style="position: relative; height: 160px;">
<span style="position: absolute; top: 5px; right: 5px; background: #28a745; color: #fff; padding: 3px 8px; font-size: 10px; border-radius: 4px; font-weight: bold;">هدية مستحقة ✔</span>
<img src="song-score-rack48feffc6-18f5-45fa-a997-7819d50a38de.WEBP" alt="حامل نوتة">
</div>
<h3 style="font-size:16px; margin-top:10px;">حامل نوتة موسيقية معدني</h3>
<div class="product-brand" style="color: #28a745; font-size:11px;">مكافأة المستوى 2</div>
<button class="btn-add" style="background-color: #222; color: #555; border-color: #333; font-size:12px; padding:6px;" disabled>مضافة تلقائياً</button>
</div>
`;
}
if (gift3_secured) {
statusHTML += `
<div class="product-card" style="border: 1px solid #ffc107; background-color: #1a1a1a; max-width: 280px; width: 100%; text-align: center; padding: 15px;">
<div class="product-image-wrapper" style="position: relative; height: 160px;">
<span style="position: absolute; top: 5px; right: 5px; background: #ffc107; color: #000; padding: 3px 8px; font-size: 10px; border-radius: 4px; font-weight: bold;">خصم مباشر 💰</span>
<img src="89dabe5e-9fbb-4750-b1a8-285edc299540-1000x1000-mWmkYX9aHFOsYwQUMB45SPe2glVxzQ7OkLEYgipc.WEBP" alt="خصم كاش">
</div>
<h3 style="font-size:16px; margin-top:10px;">خصم 50 دينار مباشر</h3>
<div class="product-brand" style="color: #ffc107; font-size:11px;">المكافأة الكبرى</div>
<button class="btn-add" style="background-color: #222; color: #555; border-color: #333; font-size:12px; padding:6px;" disabled>مطبق على الفاتورة</button>
</div>
`;
}
statusHTML += `</div>`;
}
if (giftsContainer) giftsContainer.innerHTML = statusHTML;   
if (cartGiftsContainer) cartGiftsContainer.innerHTML = statusHTML;
}
function checkoutWhatsApp() {
if (cart.length === 0) {
alert('السلة فارغة، أضف بعض الآلات أولاً!');
return;
}
const phoneNumber = "962780900594"; 
let message = "مرحبا متجر موسيقاتي، أود تأكيد الطلب التالي:\n\n";
let total = 0;
cart.forEach((item, index) => {
const itemTotal = item.price * item.quantity;
total += itemTotal;
message += `${index + 1}. ${item.name}\n   الكمية: ${item.quantity} | السعر: ${itemTotal} دينار\n`;
});
message += `\n---------------------------------\n`;
message += `المجموع الأولي للمشتريات: ${total} دينار أردني\n`;
message += `\n🎁 الهدايا التراكمية المستحقة مجاناً مع الطلب:\n`;
let discount = 0;
let hasGifts = false;
if (total >= 1200) {
message += `✅ جهاز الدوزان الإلكتروني الاحترافي\n`;
hasGifts = true;
}
if (total >= 3000) {
message += `✅ حامل النوتة الموسيقية الفاخر\n`;
}
if (total >= 5000) {
message += `✅ خصم كاش مباشر بقيمة 50 دينار أردني\n`;
discount = 50;
}
if (!hasGifts) {
message += `❌ لا توجد هدايا مستحقة (لم يتم الوصول للحد الأدنى 1200 دينار)\n`;
}
message += `---------------------------------\n`;
if (discount > 0) {
const finalTotal = total - discount;
message += `💰 قيمة الخصم المالي: -${discount} دينار\n`;
message += `\n🔥 **المجموع النهائي بعد الخصم: ${finalTotal} دينار أردني**\n`;
} else {
message += `\n⭐ **المجموع الكلي: ${total} دينار أردني**\n`;
}
message += `---------------------------------\n`;
message += "\nيرجى التواصل معي لتأكيد موعد التسليم وعملية الشحن.";
const encodedMessage = encodeURIComponent(message);
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
localStorage.removeItem('mosiqati_cart');
cart = [];
saveCart();
updateCartCount();
renderCartPage();
updateGiftsInterface();
window.open(whatsappUrl, '_blank');
}
function sendContactToWhatsApp(event) {
event.preventDefault();  
const clientName = document.getElementById('contact-name').value;
const clientEmail = document.getElementById('contact-email').value;
const clientMsg = document.getElementById('contact-message').value;  
const myWhatsAppNumber = "962780900594"; 
const formattedText = `📬 *رسالة استفسار جديدة - متجر موسيقاتي*:\n\n` +
`👤 *اسم العميل:* ${clientName}\n` +
`📧 *البريد الإلكتروني:* ${clientEmail}\n\n` +
`📝 *نص الاستفسار:* \n"${clientMsg}"`;
const fullWhatsAppUrl = `https://api.whatsapp.com/send?phone=${myWhatsAppNumber}&text=${encodeURIComponent(formattedText)}`;
window.open(fullWhatsAppUrl, '_blank');
}
function openArticle(articleId) {
const modal = document.getElementById('article-modal');
const bodyContent = document.getElementById('modal-body-content');
if (!modal || !bodyContent) return;
if (articleId === 'guitar-strings') {
bodyContent.innerHTML = `
<h2 style="color:#ff0000; margin-bottom:15px; border-right: 4px solid #ff0000; padding-right: 15px;">كيف تحافظ على أوتار الجيتار?</h2>
<p style="line-height:1.8; font-size:16px; color:#fff; text-align:right;">
للحفاظ على أوتار جيتارك لفترة طويلة وحمايتها من التآكل والصدأ، ننصحك باتباع الإرشادات التالية من خبراء موسيقاتي:<br><br>
1. <b>مسح الأوتار بعد العزف:</b> استخدم قطعة قماش قطنية جافة ونظيفة لمسح الأوتار بعد كل جلسة عزف لإزالة العرق والزيوت العالقة.<br><br>
2. <b>حفظ الجيتار في حقيبته الاحترافية:</b> احرص على وضع الجيتار داخل حقيبته المبطنة عند الانتهاء من العزف لحمايته من عوامل الرطوبة.<br><br>
3. <b>استخدام منظفات مخصصة:</b> يمكنك استخدام مواد تنظيف الأوتار الاحترافية (مثل Fast-Fret أو Dunlop 65) مرة أسبوعياً للحفاظ على نقاء ولمعان صوتها.
</p>
`;
}
modal.style.display = "flex";
}
function closeArticle() {
const modal = document.getElementById('article-modal');
if (modal) modal.style.display = "none";
}
window.addEventListener('click', function(event) {
const modal = document.getElementById('article-modal');
if (event.target === modal) {
modal.style.display = "none";
}
});
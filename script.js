const menuButton=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');
menuButton.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(opened));menuButton.textContent=opened?'×':'☰';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='☰';}));
document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('bookingForm').addEventListener('submit',e=>{
 e.preventDefault();const d=new FormData(e.currentTarget);
 const msg=['Hello Epicene Salon & Spa, I would like to request an appointment.',`Name: ${d.get('name')}`,`Service: ${d.get('service')}`,d.get('style')?`Style / length: ${d.get('style')}`:'',d.get('date')?`Preferred date: ${d.get('date')}`:'',d.get('time')?`Preferred time: ${d.get('time')}`:'',d.get('message')?`Extra details: ${d.get('message')}`:'','Please confirm availability and final price. Thank you!'].filter(Boolean).join('\n');
 window.open('https://wa.me/27682867446?text='+encodeURIComponent(msg),'_blank','noopener');
});
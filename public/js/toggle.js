const navbarToggler = document.querySelector('.toggler');
const sideBar = document.querySelector('.sideBar')
navbarToggler.addEventListener('click', ()=>{
   sideBar.classList.toggle('show-bar');
})
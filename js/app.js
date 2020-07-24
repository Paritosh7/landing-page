/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/** Initialising global variables 
 * const mainContentSections -> provides us a live html collection
 * listItemArray -> for keeping a track the items in the navbar
 * listDocumentFragment -> for lightwight addition of navbar items to the                             navbar
 * topBtn -> to access the floating btn
 */
const mainContentSections = document.getElementsByTagName('section');
let listItemArray = [];
let listDocumentFragment = document.createDocumentFragment();
const topBtn = document.querySelector('#top');

console.log(window.innerHeight)
console.log(document.documentElement.clientHeight)

/** programmatic initialisation of the navbar. */
function initialiseNavbar() {
  for (let section of mainContentSections) {
      createNavbarListItem(section);
  }
}

/** creating navbar items based on sections. */
function createNavbarListItem(section){

  const li = document.createElement('li');
  const a = document.createElement('a');

  a.textContent = section.dataset.nav;
  a.classList.add("menu__link");
  a.setAttribute('href',"#"+section.getAttribute('id'))

  listItemArray.push(a);

  li.appendChild(a);

  addNavbarListItemToFragment(li);
}

/** adding list in the navbar based on
 * the sections present at a given time.
 */
function addNavbarListItemToFragment(li){
  listDocumentFragment.appendChild(li);
}


/** calling initialiseNavbar() the first 
 * time to initialise the navbar.
 */
initialiseNavbar();

/** initial addition of items to the
 *  navbar
 */
appendFragmentToNavbar();


/** to add items based on the user requirement.  */
document.querySelector('.add-icon').addEventListener('click',function(eve) {
  
  addSection(eve);

  appendFragmentToNavbar()

})

/** adding section before the end of the current main#main_content,
 * then adding creating navbar item for the same section
 */
function addSection(eve){

  document.getElementById('main__content').insertAdjacentHTML("beforeend",returnSectionString())

  createNavbarListItem(mainContentSections[listItemArray.length]);

}


/** appending fragment to the navbar */
function appendFragmentToNavbar(){
  let navbarList = document.getElementById('navbar__list');
  console.log(listDocumentFragment.children)
  navbarList.appendChild(listDocumentFragment);
}

/** method to check the scrolling state for a section, 
 * based on which add or remove class (methods) for the navbar items
 * as well sections are called. 
 */
let activeScrollingCheck = ()=> {

  listItemArray.forEach(link => {
    let section = document.querySelector(link.hash);

    const sectionOffset = Math.floor(section.getBoundingClientRect().top)


    removeActiveClass(link,section);

    addActiveClass((sectionOffset < 200 && sectionOffset >= -200),link,section);

  })

  changeFloatingBtnVisibility();
}

/**  method to change the visibility of the scroll to top button*/
function changeFloatingBtnVisibility(){
  let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;

  (scrollHeight > 500) ? topBtn.style.visibility = "visible" : topBtn.style.visibility = "hidden";
}

/** listening for a click floating button, 
 *  scroll to top of the page */
topBtn.addEventListener('click',()=>{window.scrollTo(0,0)})

/**  add class */
function addActiveClass(visible,link,section){
  if(visible){
    link.classList.add("active");
    section.classList.add('your-active-class');
  }
}

/** remove class */
function removeActiveClass(link,section){
  link.classList.remove("active");
  section.classList.remove('your-active-class');
}

/** listen to the scrolling event */
window.addEventListener('scroll', activeScrollingCheck )


/** returns template string for section */
function returnSectionString() { 
  return `<section id="section${listItemArray.length+1}" data-nav="Section ${listItemArray.length+1}">
  <div class="landing__container">
    <h2>Section ${listItemArray.length+1}</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

    <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
  </div>
</section>`
}



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
*/
const mainContentSections = document.getElementsByTagName('section');
let listItemArray = [];

let listDocumentFragment = document.createDocumentFragment();

/** initial programmatic initialisation 
 * of navbar
 */
function initialiseNavbar() {
  for (let section of mainContentSections) {
      createNavbarListItem(section);
  }
}

/** creating navbar items based on sections. 
 */
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
  console.log(listDocumentFragment)
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
document.querySelector('.add-section').addEventListener('click',function(eve) {
  
  addSection(eve);

  appendFragmentToNavbar()

})

function addSection(eve){

  document.getElementById('main__content').insertAdjacentHTML("beforeend",returnSectionString())

  createNavbarListItem(mainContentSections[listItemArray.length]);

}



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


/** appending fragment to the navbar */
function appendFragmentToNavbar(){
  let navbarList = document.getElementById('navbar__list');
  console.log(listDocumentFragment)
  navbarList.appendChild(listDocumentFragment);
}

let activeScrollingCheck = ()=> {

  listItemArray.forEach(link => {
    let section = document.querySelector(link.hash);

    const sectionOffset = Math.floor(section.getBoundingClientRect().top)


    removeActiveClass(link,section);

    addActiveClass((sectionOffset < 200 && sectionOffset >= -200),link,section);

  })
}

function addActiveClass(visible,link,section){
  console.log('adding called')
  if(visible){
    console.log('adding')
    link.classList.add("active");
    section.classList.add('your-active-class');
  }
}

function removeActiveClass(link,section){
  console.log('removing')
  link.classList.remove("active");
  section.classList.remove('your-active-class');
}


window.addEventListener('scroll', activeScrollingCheck )




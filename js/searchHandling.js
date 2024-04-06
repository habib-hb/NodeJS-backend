const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const dropdownContent = document.querySelector(".dropdown-content");

//redirect after search and button click------
searchBtn.addEventListener("click" , ()=>{
    const searchValue = searchInput.value;
    console.log("search value : " , searchValue);
    
    switch (searchValue){
        case "about":
        case "About":
            window.location.hash = "about";
            break;

        case "services":
        case "Services":
        case "service":
        case "Service":
            window.location.hash = "services";
            break;

        case "contact":
        case "Contact":
            window.location.hash = "contact";
            break;

        default:
            alert("Search Value Not Found. Try- 'about', 'services', 'contact'");
            break;
    
        }
})

//filtering options by input value--------
searchInput.addEventListener("input" , function(){
    let inputText = searchInput.value.toLowerCase();
    let options = document.querySelectorAll(".dropdown-content a");
    options.forEach((item)=>{
        let itemText = item.textContent.toLowerCase();
        if(itemText.includes(inputText)){
            item.style.display = "block";
        }
        else{
            item.style.display = "none";
        }
    })
    dropdownContent.style.display = "block";
        
})

//redirect based on the input value after "Enter" press -------- 
searchInput.addEventListener("keydown" , (e)=>{
    if(e.key==="Enter"){
        let searchValue = searchInput.value.toLowerCase();
        let options = document.querySelectorAll(".dropdown-content a");
        options.forEach((item)=>{
            let itemText = item.textContent.toLowerCase();
            let foundFirstValue = false;
            if(itemText.includes(searchValue) && !foundFirstValue) {
                foundFirstValue = true;
                window.location.hash = itemText=== "contact us" ? "contact" : itemText;
                dropdownContent.style.display = "none";
                searchInput.value = "";
             }

        })
    }
})

//showing dropdown after clicking the input section -------
searchInput.addEventListener("click" , ()=>{
     dropdownContent.style.display = "block";
})

//hide dropdown after clicking outside of it -------- 
window.addEventListener("click" , (e)=>{
    if(!e.target.matches("#search")){
    dropdownContent.style.display = "none";
    }
})
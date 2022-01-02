"use strict";

let counter=0;
let authorArray=[];

/**
 * [Starts Code, when window has loaded.]
 */
window.onload=function() {
  let add=document.querySelector("#add");
  add.onclick=function() {
    addBug(counter, authorArray);
  }
  
  let showAllBtn=document.querySelector("#showAll");
  showAllBtn.addEventListener("click", showAll);
  
  let showOpenBtn=document.querySelector("#showOpen");
  showOpenBtn.addEventListener("click", showOpen);
  
  let delClosedBtn=document.querySelector("#deleteClosed");
  delClosedBtn.addEventListener("click", deleteClosed);
  
  let filterBtn=document.querySelector("#filter");
  filterBtn.addEventListener("click", filter);
}

/**
 * [Dynamically dds a new open bug if other and title have an input.
 * Description does not need  an input. New elements are added at the end
 * of the list.]
 */
function addBug() {
  let titleInp=document.querySelector("input[name='title']").value;
  let authorInp=document.querySelector("input[name='author']").value;
  let descriptionInp=document.querySelector("textarea[name='description']").value;
  if(titleInp!=="" && authorInp!=="") {
    let bugEntries=document.querySelector(".bugEntries");
    
    // <div class="bugEntry open">
    let entry=document.createElement("div");
    bugEntries.appendChild(entry);
    entry.className="bugEntry";
    entry.classList.add("open");
    
    // <hr>
    let hr=document.createElement("hr");
    entry.appendChild(hr);
    
    let row=document.createElement("div");
    row.className="row";
    entry.appendChild(row);
    
    // <input type="checkbox" id="..." name="...." value="authorInp">
    let checkbox=document.createElement("input");
    checkbox.type="checkbox";
    let idAndName=authorInp+counter;
    checkbox.id=idAndName;
    checkbox.name=idAndName;
    checkbox.value=authorInp;
    row.appendChild(checkbox);
    counter++;
    
    // [add author to an array of authors.]
    handleAuthor(authorInp);
    
    //[adds click Handler to checkboxes.]
    let checkboxElements=document.querySelectorAll("input[type='checkbox']");
    for(let cB of checkboxElements) {
      cB.onclick=function() {
        handleCheckbox(cB);
      }
    }
    
    // <div class="bugHeader"></div>
    let bugHeader=document.createElement("div");
    row.appendChild(bugHeader);
    bugHeader.className="bugHeader";
    
    // <label for=" "></label>
    let label=document.createElement("label");
    bugHeader.appendChild(label);
    label.htmlFor=idAndName;
    
    // <span class="bugTitle"> Title </span>
    let title=document.createElement("span");
    title.className="bugTitle";
    label.appendChild(title);
    title.appendChild(document.createTextNode(titleInp));
    
    //<span class="bugAuthor"> (Author)</span>
    let author=document.createElement("span");
    author.className="bugAuthor";
    label.appendChild(author);
    author.appendChild(document.createTextNode(" ("+authorInp+")"));
    
    //<div class="bugDescription"></div>
    if(descriptionInp!=="") {
      let description=document.createElement("div");
      entry.appendChild(description);
      description.className="bugDescription";
      //<p> bug description </p>
      let p=document.createElement("p");
      description.appendChild(p);
      p.appendChild(document.createTextNode(descriptionInp));
    }
    console.log("Bug Entry added");
  } else {
    if(titleInp==="") {
      alert("Please enter title");
    }
    if(authorInp==="") {
      alert("Please enter title");
    }
  }
}

/**
 * [If author doesn't yet exist in the author array, it adds the new author
 * and creates a selection entry so the bugs can be filtered by author later.]
 * @param authorInp [author for new bug entry.]
 */
function handleAuthor(authorInp) {
  let selectAuthor=document.querySelector("#filterAuthor");
  let option=document.createElement("option");
  if(authorArray.length===0) {
    authorArray.push(authorInp);
    option.value=authorInp;
    selectAuthor.appendChild(option);
    option.appendChild(document.createTextNode(authorInp));
  } else if(!authorArray.includes(authorInp)) {
    authorArray.push(authorInp);
    option.value=authorInp;
    selectAuthor.appendChild(option);
    option.appendChild(document.createTextNode(authorInp));
  }
}

/**
 * [Toggles closed/open on the checkox.]
 * @param checkbox [clicked checkbox.]
 */
function handleCheckbox(checkbox) {
  let row=checkbox.parentNode;
  let bugEntry=row.parentNode;
  if(checkbox.checked) {
    bugEntry.classList.remove("open");
    bugEntry.classList.add("closed");
  } else if(!checkbox.checked) {
    bugEntry.classList.remove("closed");
    bugEntry.classList.add("open");
  }
  
}

/**
 * [Shows all bug entries. (by all authors, open and closed ones.)]
 */
function showAll() {
  let closedBugs=document.querySelectorAll(".hide");
  for(let closed of closedBugs) {
    closed.classList.remove("hide");
  }
}

/**
 * [Only shows open bugs.]
 */
function showOpen() {
  let closedBugs=document.querySelectorAll(".closed");
  for(let closed of closedBugs) {
    closed.classList.add("hide");
  }
}

/**
 * [Delets all closed bugs.]
 */
function deleteClosed() {
  let closedBugs=document.querySelectorAll(".closed");
  for(let closed of closedBugs) {
    closed.querySelector("input[type='checkbox']").name;
    closed.remove();
  }
}

/**
 * [Shows open and closed bugs by selected author.]
 */
function filter() {
  let authorFilter=document.querySelector("#filterAuthor").value;
  let allAuthorNames=document.querySelectorAll("input[type='checkbox']");
  for(let bug of allAuthorNames) {
    if(bug.value!==authorFilter) {
      bug.parentNode.parentNode.classList.add("hide");
    } else {
      bug.parentNode.parentNode.classList.remove("hide");
    }
  }
}
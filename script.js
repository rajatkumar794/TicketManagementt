let allFilter = document.querySelectorAll(".filter")
let ticketContent = document.querySelector(".ticket-content")
let modalOpen = document.querySelector(".open-modal")
let modalClose = document.querySelector(".close-modal")
let modal_text = document.querySelector(".modal-text")

let filterCodes = {
    "red": "#ee5253",
    "blue":"#00a8ff",
    "yellow":"#fbc531",
    "green":"#4cd137",
}
let activeModalFilter="green"

for(let i=0; i<allFilter.length; ++i)
{
    allFilter[i].addEventListener("click", function(elem){
        let filter = elem.target.classList[1];

        if(elem.target.classList.contains("active-filter"))
        {   elem.target.classList.remove("active-filter")
            ticketContent.style.background="#dcdde1";
            return;
        }
        
        
        if(document.querySelector(".active-filter"))
            document.querySelector(".active-filter").classList.remove("active-filter")

        elem.target.classList.add("active-filter")
        ticketContent.style.background=filterCodes[filter];
    })

}

modalOpen.addEventListener("click", openModal)
modalClose.addEventListener("click", closeModal)

function openModal(ele)
{   
    if(document.querySelector(".modal"))
        return;
    let modalDiv = document.createElement("div");
    modalDiv.classList.add("modal");
    modalDiv.innerHTML = `<div class="modal">
                            <div class="modal-text" contenteditable="true" spellcheck="false" data-typed="false">Enter text</div>
                            <div class="modal-filter-option">
                                <div class="modal-filter red"></div>
                                <div class="modal-filter blue"></div>
                                <div class="modal-filter yellow"></div>
                                <div class="modal-filter green active-filter"></div>
                            </div>
                        </div>`
    
    let modalFilters = modalDiv.querySelectorAll(".modal-filter")
    for(let i=0; i<allFilter.length; ++i)
    {
        modalFilters[i].addEventListener("click", function(elem){
            let filter = elem.target.classList[1];

            if(elem.target.classList.contains("active-filter"))
                return;
            
            if(document.querySelector(".active-filter"))
                document.querySelector(".active-filter").classList.remove("active-filter")

            elem.target.classList.add("active-filter")
            activeModalFilter=filter;
        })

    }

    modalDiv.querySelector(".modal-text").addEventListener('keypress', function(e){
        
        if(e.target.getAttribute("data-typed")=="true")
        {
            if(e.key==='Enter')
            {   addTicket(e,e.target.innerHTML)
                document.querySelector(".modal").remove()
            }
            return;
        }
        e.target.innerHTML=""
        e.target.setAttribute("data-typed", "true")
        
    })
    ticketContent.append(modalDiv)
}

function closeModal(ele)
{
    if(document.querySelector(".modal"))
    {
        document.querySelector(".modal").remove();
        return;
    }
}
function addTicket(ele, text)
{
    let ticket = document.createElement("div")
    ticket.classList.add("ticket")
    ticket.innerHTML=`<div class="ticket-head ${activeModalFilter}"></div>
                        <div class="ticket-body">
                            <div class="ticket-title"><b>#ticket</b></div>
                            <div class="ticket-text"></div>
                        </div>`

    ticket.querySelector(".ticket-head").addEventListener("click", function(e){
        let ticketFilters = [ "red" , "blue" , "yellow" , "green" ];
        let currentFilter = e.target.classList[1];
        let idx = ticketFilters.indexOf(currentFilter);
        idx++;
        idx = idx%4;
        e.target.classList.remove(currentFilter);
        e.target.style.background=filterCodes[ticketFilters[idx]]
        e.target.classList.add(ticketFilters[idx]);
    })
    ticket.querySelector(".ticket-head").style.background=filterCodes[activeModalFilter]
    activeModalFilter="green"
    ticket.querySelector(".ticket-text").innerHTML=text;
    ticket.addEventListener("click", removeTicket)
    ticketContent.append(ticket)
    
}

function deleteMode(ele)
{   
    if(ele.path[0].classList.contains("active-modal"))
    {   
        ele.path[0].classList.remove("active-modal")
        return;
    }
    ele.path[0].classList.add("active-modal")
}

function removeTicket(ele)
{   
    //console.log(ele.target);
}
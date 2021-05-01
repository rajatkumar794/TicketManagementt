
for(let i=0; i<allFilter.length; ++i)
{
    allFilter[i].addEventListener("click", function(elem){
        let filter = elem.target.classList[1];

        if(elem.target.classList.contains("active-filter"))
        {   elem.target.classList.remove("active-filter")
            ticketContent.style.background="#dcdde1";
            ticketContent.innerHTML=""
            initTickets()
            return;
        }
        
        
        if(document.querySelector(".active-filter"))
            document.querySelector(".active-filter").classList.remove("active-filter")

        elem.target.classList.add("active-filter")
        sortTickets(filter)
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

function addTicket(ele, ticketText)
{
    let ticket = document.createElement("div")
    let ticketId = uid();
    ticket.classList.add("ticket")
    ticket.innerHTML=`<div id=${ticketId} class="ticket-head ${activeModalFilter}"></div>
                        <div class="ticket-body">
                            <div class="ticket-info">
                                <div class="ticket-title"><b>${ticketId}</b></div>
                                <div class="ticket-delete"><i ticketId = ${ticketId} class="fas fa-trash"></i></div>
                            </div>
                            <div class="ticket-text">${ticketText}</div>
                        </div>`


    ticket.querySelector(".ticket-delete").addEventListener("click" , function(e){
        let ticketId = e.target.getAttribute("ticketId");
        ticket.remove();

        let allTickets = JSON.parse(localStorage.getItem("allTickets"));
        let filteredTickets = allTickets.filter(function(ticketObj){
            return ticketObj.ticketId != ticketId;
        })
        localStorage.setItem("allTickets" , JSON.stringify(filteredTickets));
    })

    // ticket.querySelector(".ticket-head").style.background=filterCodes[activeModalFilter]
    ticketContent.append(ticket)

    let ticketObject = {
        ticketId:ticketId,
        ticketText:ticketText,
        ticketFilter:activeModalFilter
    }

        let allTickets = JSON.parse(localStorage.getItem("allTickets"))
        allTickets.push(ticketObject)
        localStorage.setItem("allTickets" , JSON.stringify(allTickets));
        activeModalFilter="green"
        ticket.querySelector(".ticket-head").addEventListener("click", function(e){
            let ticketFilters = [ "red" , "blue" , "yellow" , "green" ];
            let currentFilter = e.target.classList[1];
            let idx = ticketFilters.indexOf(currentFilter);
            idx++;
            idx = idx%4;
            e.target.classList.remove(currentFilter);
            e.target.style.background=filterCodes[ticketFilters[idx]]
            e.target.classList.add(ticketFilters[idx]);

            let ticketId = e.target.id;
            let allTickets = JSON.parse(localStorage.getItem("allTickets"));

            for(let i=0; i<allTickets.length; ++i)
            {
                if(allTickets[i].ticketId==ticketId)
                {
                    allTickets[i].ticketFilter=ticketFilters[idx];
                    break;
                }
            }
            localStorage.setItem("allTickets", JSON.stringify(allTickets))
        })
}

function sortTickets(filter)
{
    let allTickets = JSON.parse(localStorage.getItem("allTickets"))
    allTickets = allTickets.filter(function(obj){
        return obj.ticketFilter==filter
    })
    ticketContent.innerHTML="";
    for(let i=0; i<allTickets.length; ++i)
        appendTickets(allTickets[i])
}


function deleteMode(ele)
{   if(document.querySelectorAll(".ticket").length==0)
        return;
    if(ele.path[0].classList.contains("active-modal"))
    {   
        ele.path[0].classList.remove("active-modal")
        return;
    }
    ele.path[0].classList.add("active-modal")
}

function removeTicket(ele)
{   
    console.log(ele.path[1].remove());
}
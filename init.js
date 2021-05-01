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
let activeModalFilter="green";


function appendTickets(ticketObj)
{
    
    let {ticketId, ticketText, ticketFilter} = ticketObj
    let ticketDiv = document.createElement("div")
    ticketDiv.classList.add("ticket")
    ticketDiv.innerHTML=`<div id=${ticketId} class="ticket-head ${ticketFilter}"></div>
                        <div class="ticket-body">
                            <div class="ticket-info">
                                <div class="ticket-title"><b>${ticketId}</b></div>
                                <div class="ticket-delete"><i ticketId = ${ticketId} class="fas fa-trash"></i></div>
                            </div>
                            <div class="ticket-text">${ticketText}</div>
                        </div>`
    
    ticketDiv.querySelector(".ticket-delete").addEventListener("click" , function(e){
        let ticketId = e.target.getAttribute("ticketId");
        ticketDiv.remove();

        let allTickets = JSON.parse(localStorage.getItem("allTickets"));
        let filteredTickets = allTickets.filter(function(ticketObj){
            return ticketObj.ticketId != ticketId;
            })
        localStorage.setItem("allTickets" , JSON.stringify(filteredTickets));
    })
    ticketDiv.querySelector(".ticket-head").addEventListener("click", function(e){
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
    ticketContent.append(ticketDiv)
}

function initTickets()
{
    let allTickets = localStorage.getItem("allTickets")
    allTickets = JSON.parse(allTickets)

    if(!allTickets)
    {   
        localStorage.setItem("allTickets", JSON.stringify([]))
        return; 
    }

    for(let i=0; i<allTickets.length; ++i)
    {
        let ticket = allTickets[i];
        appendTickets(ticket)
    }
}

initTickets();
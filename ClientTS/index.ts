const settings = {
	"async": true,
	"crossDomain": true,
	"url": "http://localhost:5102/api/Enterprise/GetAllEnterprises",
	"method": "GET"
};


var enterprise:Object;
interface Enterprise{
    nameOfPR:string
    phoneNumber:string;
    email:string;
    corpName:string;
    corpAddress:string;
    pib:number;
}
interface InvoiceResponse{
    data:Array<Invoice>;
    meta:{
        total_pages:number;
        current_page:number;
        next_page:number;
    }
}
interface Invoice{
    id:number;
    pibSentFrom:number;
    pibSentTo:number;
    dateOfCreation:string;
    paymentDeadline:string;
    paymentAmount:number;
    invoiceType:string;
    name:string;
    pricePerUnit:number;
    unitType:string;
    amount:number;
}
class RadSaPrikazom{
    static ShowEnterprisesDetails(enterprises:Array<Enterprise>){
        console.log(enterprises);
        let prikaz="";
        enterprises.forEach(a=>{
            prikaz+=`<div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne-tim-${a.pib}">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne-tim-${a.pib}" aria-expanded="false" aria-controls="flush-collapseOne-tim-${a.pib}">
                ${a.corpName}
              </button>
            </h2>
            <div id="flush-collapseOne-tim-${a.pib}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne-tim-${a.pib}" data-bs-parent="#accordionFlushExample">
              <button id="${a.pib}" class="entBtns">Enterprise name: ${a.corpName}<br>
              Enterpris address: ${a.corpAddress}<br>
              PR name: ${a.nameOfPR}<br>
              Enterpriss pib: ${a.pib}</button><br>
              <button id="${a.pib}" class="btnInvoice">Add Invoices</button>
              <button id="${a.pib}" class="btnShowInvoice">Show Invoices</button>
              <input type="date" placeholder="PIB" name="pib" id="date1">
              <input type="date" placeholder="NAME" name="pib" id="date2">
              <button id="${a.pib}" class="btnShowIncome">Show Income</button>
              
            </div>
            
          </div>`
        })
        return prikaz
    }
    static ShowAllEnterprises(div:HTMLElement){
        let enterprises=[];
        $.ajax(settings).done(function (response) {
            div.innerHTML =`
            <div class="accordion accordion-flush" id="accordionFlushExample">${RadSaPrikazom.ShowEnterprisesDetails(response)}</div>
            <li><input type="string" placeholder="name" name="pib" id="filter1">
            <input type="number" placeholder="amount" name="pib" id="filter2">
            <button id="" class="btnShowInvoiceFilter">Show Invoice</button></li>`
        });
    }
    
    static ShowFilteredByPiB(div:HTMLElement){
        let enterprises=[];
        let url = "http://localhost:5102/api/Enterprise/filterEnterprisesByPIB";
        let pib = document.getElementById("pib") as HTMLInputElement;
        fetch(url + `?filterData=${pib.value}`).then(resp => resp.json()).then((data) => {
        
            div.innerHTML =`
            <div class="accordion accordion-flush" id="accordionFlushExample">${RadSaPrikazom.ShowEnterprisesDetails(data)}</div>`
       
        }).catch(err => console.log(err))
    }
    static ShowFilteredByName(div:HTMLElement){
        let enterprises=[];
        let url = "http://localhost:5102/api/Enterprise/filterEnterprisesByName";
        let name = document.getElementById("name") as HTMLInputElement;
        fetch(url + `/${name.value}`).then(resp => resp.json()).then((data) => {
            div.innerHTML =`
            <div class="accordion accordion-flush" id="accordionFlushExample">${RadSaPrikazom.ShowEnterprisesDetails(data)}</div>`
        }).catch(err => console.log(err))
    }
    static ShowFilteredByNameAndPib(div:HTMLElement){
        let enterprises=[];
        let url = "http://localhost:5102/api/Enterprise/filterEnterprisesByNameAndPib";
        let name = document.getElementById("name") as HTMLInputElement;
        let pib = document.getElementById("pib") as HTMLInputElement;
        fetch(url + `/${name.value}/${pib.value}`).then(resp => resp.json()).then((data) => {
            div.innerHTML =`
            <div class="accordion accordion-flush" id="accordionFlushExample">${RadSaPrikazom.ShowEnterprisesDetails(data)}</div>`
        }).catch(err => console.log(err))
    }
}
class AddEnterpraise{
    static AddEnterprise(div:HTMLElement){
        var url='http://localhost:5102/api/Enterprise/AddEnterprise';
        divAddEdit.innerHTML=`<form id="postForm" class="editForm" action="http://localhost:5102/api/Enterprise/AddEnterprise" method="post">
        PR name:<input type="text" name="nameOfPR" id="nameOfPR"> Contact number:<input type="text" name="phoneNumber" id="phoneNumber"> Email:
        <input type="text" name="email" id="email"> Enterprise name:<input type="text" name="corpName" id="corpName"> Enterprise address:<input type="text" name="corpAddress" id="corpAddress">
        <button id="btnPost1">POST</button>
        </form>`
        $("#postForm").submit((e) => {
        e.preventDefault();
        $.ajax({
        url: "http://localhost:5102/api/Enterprise/AddEnterprise",
        type: "post",
        data: $("#postForm").serialize(),
        success: () => {
            pageReload();
        }
    });
    }) 
         
    }
}
class EditEnterprise{
    
    static EditEnterprise(div:HTMLElement,id:string){
        let url = "http://localhost:5102/api/Enterprise/filterEnterprisesByPIB"
        fetch(url + `?filterData=${id}`).then(resp => resp.json()).then((data) => {
            data.forEach(element => {
            divAddEdit.innerHTML=`<form id="postForm" class="editForm" action="http://localhost:5102/api/Enterprise/AddEnterprise" method="post">
            PR name:<input type="text" name="nameOfPR" id="nameOfPR" value="${element.nameOfPR}"> 
            Contact number:<input type="text" name="phoneNumber" id="phoneNumber" value="${element.phoneNumber}"> 
            Email:<input type="text" name="email" id="email" value="${element.email}"> 
            Enterprise name:<input type="text" name="corpName" id="corpName" value="${element.corpName}"> 
            Enterprise address:<input type="text" name="corpAddress" id="corpAddress" value="${element.corpAddress}">
            <button id="btnPost1">POST</button>
            </form>`
        });
        $("#postForm").submit((e) => {
            e.preventDefault();
            $.ajax({
            url: `http://localhost:5102/api/Enterprise/EditEnterprise/+${id}`,
            type: "post",
            data: $("#postForm").serialize(),
            success: () => {
                pageReload(); 
            }
        });
        })  
          
    })
}
    static AddInvoice(div:HTMLElement,id:string){
        divAddEdit.innerHTML=`<form id="postForm" class="editForm">
        pibSentFrom:<input type="text" name="pibSentFrom" id="pibSentFrom" value="${id}"> 
        pibSentTo:<input type="text" name="pibSentTo" id="pibSentTo"> 
        dateOfCreation:<input type="date" name="dateOfCreation" id="dateOfCreation"> 
        paymentDeadline:<input type="date" name="paymentDeadline" id="paymentDeadline"> 
        invoiceType:<input type="text" name="invoiceType" id="invoiceType">
        name:<input type="text" name="name" id="name">
        pricePerUnit:<input type="number" name="pricePerUnit" id="pricePerUnit">
        unitType:<input type="text" name="unitType" id="unitType">
        amount:<input type="number" name="amount" id="amount">
        <button id="btnPostInvoice">POST</button>
        </form>`
        $("#postForm").submit((e) => {
        e.preventDefault();
        $.ajax({
        url: "http://localhost:5102/api/Invoice/addNewInvoice",
        type: "post",
        data: $("#postForm").serialize(),
        success: () => {
            pageReload();
        }
    });
    })      
    
    }
}
class InvoiceRepo{
    // static ShowAllInvoicesForPIB(div:HTMLElement,id:string){
    //     let enterprises=[];
    //     let url = "http://localhost:5102/api/Invoice";
    //     fetch(url + `/${id}/${1}`).then(resp => resp.json()).then((data) => {
            
    //         div.innerHTML ="";
    //         if(data!=null)
    //         data.forEach(item=>{
    //             div.innerHTML +=`
    //             <button id="${item.id}" class="${item.invoiceType}">
    //             <ul>
    //             <li>ID: ${item.id}</li>
    //             <li>pibSentFrom: ${item.pibSentFrom}</li>
    //             <li>pibSentTo: ${item.pibSentTo}</li>
    //             <li>dateOfCreation: ${item.dateOfCreation}</li>
    //             <li>paymentDeadline: ${item.paymentDeadline}</li>
    //             <li>paymentAmount: ${item.paymentAmount}</li>
    //             <li>invoiceType: ${item.invoiceType}</li>
    //             <li>name: ${item.name}</li>
    //             <li>pricePerUnit: ${item.pricePerUnit}</li>
    //             <li>unitType: ${item.unitType}</li>
    //             <li>amount: ${item.amount}</li>
    //         </ul> </button>
    //             `
    //         })
    //         else{
    //             div.innerHTML =`<p>staaa</p>`;
    //         }
            
    //     }).catch(err => console.log(err))
    // }
    static ShowAllInvoicesForPIB(div:HTMLElement,id:string,page:number){
        
        settings.url=`http://localhost:5102/api/Invoice/${id}/${page}`
        div.innerHTML="";
        $.ajax(settings).done(function (response) {
           
            response.forEach(item=>{
                
                div.innerHTML+=`
                <button id="${item.id}" class="${item.invoiceType}">
                <ul>
                <li>ID: ${item.id}</li>
                <li>pibSentFrom: ${item.pibSentFrom}</li>
                <li>pibSentTo: ${item.pibSentTo}</li>
                <li>dateOfCreation: ${item.dateOfCreation}</li>
                <li>paymentDeadline: ${item.paymentDeadline}</li>
                <li>paymentAmount: ${item.paymentAmount}</li>
                <li>invoiceType: ${item.invoiceType}</li>
                <li>name: ${item.name}</li>
                <li>pricePerUnit: ${item.pricePerUnit}</li>
                <li>unitType: ${item.unitType}</li>
                <li>amount: ${item.amount}</li>
            </ul> </button>
                `
            })
            div.innerHTML+=`<ul class="pagination">
            <li class="page-item"><a class="page-link" id="previous_page" data-page=${page-1}>Previous</a></li>
            <li class="page-item"><a class="page-link" id="next_page" data-page=${page+1}>Next</a></li>
           
          </ul>`
          document.querySelector("#previous_page").addEventListener("click",()=>{
            let page=parseInt(document.querySelector("#previous_page").getAttribute("data-page"));  
            
            if(page<0){
                page=0;
            }
            InvoiceRepo.ShowAllInvoicesForPIB(div,id,page);
          })
          document.querySelector("#next_page").addEventListener("click",()=>{
            let page=parseInt(document.querySelector("#next_page").getAttribute("data-page"));
            InvoiceRepo.ShowAllInvoicesForPIB(div,id,page);
        })
        });
        
    }
    static filterInvoiceByName(div:HTMLElement){
        let enterprises=[];
        let url = "http://localhost:5102/api/Invoice/filterInvoiceByPIB";
        let pib = document.getElementById("filter1") as HTMLInputElement;
        fetch(url + `/${pib.value}`).then(resp => resp.json()).then((data) => {
        
            div.innerHTML =""
            data.forEach(item=>{
                            div.innerHTML +=`
                            <button id="${item.id}" class="${item.invoiceType}">
                            <ul>
                            <li>ID: ${item.id}</li>
                            <li>pibSentFrom: ${item.pibSentFrom}</li>
                            <li>pibSentTo: ${item.pibSentTo}</li>
                            <li>dateOfCreation: ${item.dateOfCreation}</li>
                            <li>paymentDeadline: ${item.paymentDeadline}</li>
                            <li>paymentAmount: ${item.paymentAmount}</li>
                            <li>invoiceType: ${item.invoiceType}</li>
                            <li>name: ${item.name}</li>
                            <li>pricePerUnit: ${item.pricePerUnit}</li>
                            <li>unitType: ${item.unitType}</li>
                            <li>amount: ${item.amount}</li>
                        </ul> </button>`
       
        }).catch(err => console.log(err))
    })}
    static filterInvoiceByAmount(div:HTMLElement){
        let enterprises=[];
        let url = "http://localhost:5102/api/Invoice/filterInvoiceByAmount";
        let name = document.getElementById("filter2") as HTMLInputElement;
        fetch(url + `/${name.value}`).then(resp => resp.json()).then((data) => {
            div.innerHTML =""
            data.forEach(item=>{
                            div.innerHTML +=`
                            <button id="${item.id}" class="${item.invoiceType}">
                            <ul>
                            <li>ID: ${item.id}</li>
                            <li>pibSentFrom: ${item.pibSentFrom}</li>
                            <li>pibSentTo: ${item.pibSentTo}</li>
                            <li>dateOfCreation: ${item.dateOfCreation}</li>
                            <li>paymentDeadline: ${item.paymentDeadline}</li>
                            <li>paymentAmount: ${item.paymentAmount}</li>
                            <li>invoiceType: ${item.invoiceType}</li>
                            <li>name: ${item.name}</li>
                            <li>pricePerUnit: ${item.pricePerUnit}</li>
                            <li>unitType: ${item.unitType}</li>
                            <li>amount: ${item.amount}</li>
                        </ul> </button>`
        
        }).catch(err => console.log(err))
    })
}





    static EditInvoicesForPIB(div:HTMLElement,id:string){
        
        let url ="http://localhost:5102/api/Invoice/filterInvoiceByPIB";
        fetch(url + `/${id}`).then(resp => resp.json()).then((data) => {
            data.forEach(element => {
                alert("1")
                divAddEdit.innerHTML=`<form id="postForm" class="editForm">
            dateOfCreation:<input type="date" name="dateOfCreation" id="dateOfCreation" value="${element.dateOfCreation}"> 
            paymentDeadline:<input type="date" name="paymentDeadline" id="paymentDeadline" value="${element.paymentDeadline}"> 
            invoiceType:<input type="text" name="invoiceType" id="invoiceType" value="${element.invoiceType}"> 
            name:<input type="text" name="name" id="name" value="${element.name}"> 
            pricePerUnit:<input type="number" name="pricePerUnit" id="pricePerUnit" value="${element.pricePerUnit}">
            unitType:<input type="text" name="unitType" id="unitType" value="${element.unitType}">
            amount:<input type="number" name="amount" id="amount" value="${element.amount}">
            <button id="btnPost1">POST</button>
            </form>`
        });
        $("#postForm").submit((e) => {
            e.preventDefault();
            $.ajax({
            url: `http://localhost:5102/api/Invoice/editInvoice/${id}`,
            type: "post",
            data: $("#postForm").serialize(),
            success: () => {
                pageReload();
            }
        });
        })  
            
    })
   
    }
    static showEnterpriseIncome(div:HTMLElement,id:string){
        var date1=document.querySelector("#date1") as HTMLInputElement;
        var date2=document.querySelector("#date2") as HTMLInputElement;
    
        let url ="http://localhost:5102/api/Invoice/EnterpriseIncome";
        fetch(url + `?PIB=${id}&dateFrom=${date1.value}&dateTo=${date2.value}`).then(resp => resp.json()).then((data) => {
            
                divAddEdit.innerHTML=`Income for PIB(${id})=${data} eur`
        
            
    })
   
    }
}


const buttonShow:HTMLButtonElement=document.getElementById("btnShow") as HTMLButtonElement;
const buttonAdd:HTMLButtonElement=document.getElementById("btnAdd") as HTMLButtonElement;
const buttonAddInvoice:HTMLButtonElement=document.getElementById("btnAddInvoice") as HTMLButtonElement;



var divShow=document.querySelector("#showEnterprises") as HTMLDivElement;
buttonShow.addEventListener('click',(e:Event)=>RadSaPrikazom.ShowAllEnterprises(divShow));
var divAddEdit=document.querySelector("#addEditEnteprise") as HTMLDivElement;
buttonAdd.addEventListener('click',(e:Event)=>AddEnterpraise.AddEnterprise(divAddEdit))
var divAddEditInvoice=document.querySelector("#addEditInvoice") as HTMLDivElement;
var divshowInvoice=document.querySelector("#showInvoices") as HTMLDivElement;

document.addEventListener('click',function(e){
   const target=e.target as Element;
    if(target && target.className=="entBtns"){
        EditEnterprise.EditEnterprise(divAddEdit,target.id);
            
    }
    if(target && target.className=="btnInvoice"){
      
        EditEnterprise.AddInvoice(divAddEdit,target.id);
           
    }
    if(target && target.className=="outgoing"){
        alert("1");
        InvoiceRepo.EditInvoicesForPIB(divAddEdit,target.id);  
       
         
    }
    if(target && target.className=="btnShowInvoice"){
      
        InvoiceRepo.ShowAllInvoicesForPIB(divshowInvoice,target.id,1); 
         
    }
    if(target && target.className=="btnShowIncome"){
        
        InvoiceRepo.showEnterpriseIncome(divshowInvoice,target.id); 
         
    }
    if(target && target.className=="btnShowInvoiceFilter"){
        let amount = document.getElementById("filter2") as HTMLInputElement;
        let name = document.getElementById("filter1") as HTMLInputElement;
        if(amount.value != "" && name.value == ""){
            InvoiceRepo.filterInvoiceByAmount(divshowInvoice); 
        }
        if(name.value != "" && amount.value == ""){
            InvoiceRepo.filterInvoiceByName(divshowInvoice); 
        }
        
         
    }
    
    if(target && target.className=="reloadbtn"){
        pageReload();
          
    }
   
})
function pageReload(){
    this.location.reload(); 
}
let pibInput = document.querySelector("#pib") as HTMLInputElement;
let nameInput = document.querySelector("#name")  as HTMLInputElement;
const btnFilter=document.getElementById("btnFilter") as HTMLButtonElement;

btnFilter.addEventListener("click", () => {

    if (pibInput.value != "" && nameInput.value == "") {

        RadSaPrikazom.ShowFilteredByPiB(divShow);
    } else if (nameInput.value != "" && pibInput.value == "") {

        RadSaPrikazom.ShowFilteredByName(divShow);
    } 
    else if(nameInput.value != "" &&  pibInput.value != "") {
        RadSaPrikazom.ShowFilteredByNameAndPib(divShow);
    }
    
})








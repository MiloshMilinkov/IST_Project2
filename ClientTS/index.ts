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
    dateOfCreation:Date;
    paymentDeadline:Date;
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
              <button id="${a.pib}" class="entBtns">${a.corpAddress}-${a.nameOfPR}-${a.pib}</button>
            </div>
          </div>`
        })
       
        return prikaz
    }
    static ShowEnterprises(div:HTMLElement){
        let enterprises=[];
        $.ajax(settings).done(function (response) {
            div.innerHTML =`
        <div class="accordion accordion-flush" id="accordionFlushExample">${RadSaPrikazom.ShowEnterprisesDetails(response)}</div>`
        });
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
            alert("Added ent!")
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
                alert("Added ent!")
            }
        });
        })  
            
    })
}
}


const buttonShow:HTMLButtonElement=document.getElementById("btnShow") as HTMLButtonElement;
const buttonAdd:HTMLButtonElement=document.getElementById("btnAdd") as HTMLButtonElement;




var divShow=document.querySelector("#showEnterprises") as HTMLDivElement;
buttonShow.addEventListener('click',(e:Event)=>RadSaPrikazom.ShowEnterprises(divShow));
var divAddEdit=document.querySelector("#addEditEnteprise") as HTMLDivElement;
buttonAdd.addEventListener('click',(e:Event)=>AddEnterpraise.AddEnterprise(divAddEdit))

document.addEventListener('click',function(e){
   const target=e.target as Element
    if(target && target.className=="entBtns"){
        EditEnterprise.EditEnterprise(divAddEdit,target.id)
    }
})








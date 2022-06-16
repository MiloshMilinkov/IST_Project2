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
    PIB:number;
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
            <h2 class="accordion-header" id="flush-headingOne-tim-${a.PIB}">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne-tim-${a.PIB}" aria-expanded="false" aria-controls="flush-collapseOne-tim-${a.PIB}">
                ${a.corpName}
              </button>
            </h2>
            <div id="flush-collapseOne-tim-${a.PIB}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne-tim-${a.PIB}" data-bs-parent="#accordionFlushExample">
              <button class="accordion-body">${a.corpAddress}-${a.nameOfPR}</button>
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
        divAdd.innerHTML=`<form id="postForm" class="editForm" action="http://localhost:5102/api/Enterprise/AddEnterprise" method="post">
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

const buttonShow:HTMLButtonElement=document.getElementById("dugmeShow") as HTMLButtonElement;
const buttonAdd:HTMLButtonElement=document.getElementById("dugmeAdd") as HTMLButtonElement;

var divShow=document.querySelector("#timovi") as HTMLDivElement;
buttonShow.addEventListener('click',(e:Event)=>RadSaPrikazom.ShowEnterprises(divShow));
var divAdd=document.querySelector("#addEnteprise") as HTMLDivElement;
buttonAdd.addEventListener('click',(e:Event)=>AddEnterpraise.AddEnterprise(divAdd))





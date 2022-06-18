var settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:5102/api/Enterprise/GetAllEnterprises",
    "method": "GET"
};
var enterprise;
var RadSaPrikazom = /** @class */ (function () {
    function RadSaPrikazom() {
    }
    RadSaPrikazom.ShowEnterprisesDetails = function (enterprises) {
        console.log(enterprises);
        var prikaz = "";
        enterprises.forEach(function (a) {
            prikaz += "<div class=\"accordion-item\">\n            <h2 class=\"accordion-header\" id=\"flush-headingOne-tim-".concat(a.pib, "\">\n              <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseOne-tim-").concat(a.pib, "\" aria-expanded=\"false\" aria-controls=\"flush-collapseOne-tim-").concat(a.pib, "\">\n                ").concat(a.corpName, "\n              </button>\n            </h2>\n            <div id=\"flush-collapseOne-tim-").concat(a.pib, "\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingOne-tim-").concat(a.pib, "\" data-bs-parent=\"#accordionFlushExample\">\n              <button id=\"").concat(a.pib, "\" class=\"entBtns\">Enterprise name: ").concat(a.corpName, "<br>\n              Enterpris address: ").concat(a.corpAddress, "<br>\n              PR name: ").concat(a.nameOfPR, "<br>\n              Enterpriss pib: ").concat(a.pib, "</button><br>\n              <button id=\"").concat(a.pib, "\" class=\"btnInvoice\">Add Invoices</button>\n              <button id=\"").concat(a.pib, "\" class=\"btnShowInvoice\">Show Invoices</button>\n              <input type=\"date\" placeholder=\"PIB\" name=\"pib\" id=\"date1\">\n              <input type=\"date\" placeholder=\"NAME\" name=\"pib\" id=\"date2\">\n              <button id=\"").concat(a.pib, "\" class=\"btnShowIncome\">Show Income</button>\n              \n            </div>\n            \n          </div>");
        });
        return prikaz;
    };
    RadSaPrikazom.ShowAllEnterprises = function (div) {
        var enterprises = [];
        $.ajax(settings).done(function (response) {
            div.innerHTML = "\n            <div class=\"accordion accordion-flush\" id=\"accordionFlushExample\">".concat(RadSaPrikazom.ShowEnterprisesDetails(response), "</div>\n            <li><input type=\"string\" placeholder=\"name\" name=\"pib\" id=\"filter1\">\n            <input type=\"number\" placeholder=\"amount\" name=\"pib\" id=\"filter2\">\n            <button id=\"\" class=\"btnShowInvoiceFilter\">Show Invoice</button></li>");
        });
    };
    RadSaPrikazom.ShowFilteredByPiB = function (div) {
        var enterprises = [];
        var url = "http://localhost:5102/api/Enterprise/filterEnterprisesByPIB";
        var pib = document.getElementById("pib");
        fetch(url + "?filterData=".concat(pib.value)).then(function (resp) { return resp.json(); }).then(function (data) {
            div.innerHTML = "\n            <div class=\"accordion accordion-flush\" id=\"accordionFlushExample\">".concat(RadSaPrikazom.ShowEnterprisesDetails(data), "</div>");
        })["catch"](function (err) { return console.log(err); });
    };
    RadSaPrikazom.ShowFilteredByName = function (div) {
        var enterprises = [];
        var url = "http://localhost:5102/api/Enterprise/filterEnterprisesByName";
        var name = document.getElementById("name");
        fetch(url + "/".concat(name.value)).then(function (resp) { return resp.json(); }).then(function (data) {
            div.innerHTML = "\n            <div class=\"accordion accordion-flush\" id=\"accordionFlushExample\">".concat(RadSaPrikazom.ShowEnterprisesDetails(data), "</div>");
        })["catch"](function (err) { return console.log(err); });
    };
    RadSaPrikazom.ShowFilteredByNameAndPib = function (div) {
        var enterprises = [];
        var url = "http://localhost:5102/api/Enterprise/filterEnterprisesByNameAndPib";
        var name = document.getElementById("name");
        var pib = document.getElementById("pib");
        fetch(url + "/".concat(name.value, "/").concat(pib.value)).then(function (resp) { return resp.json(); }).then(function (data) {
            div.innerHTML = "\n            <div class=\"accordion accordion-flush\" id=\"accordionFlushExample\">".concat(RadSaPrikazom.ShowEnterprisesDetails(data), "</div>");
        })["catch"](function (err) { return console.log(err); });
    };
    return RadSaPrikazom;
}());
var AddEnterpraise = /** @class */ (function () {
    function AddEnterpraise() {
    }
    AddEnterpraise.AddEnterprise = function (div) {
        var url = 'http://localhost:5102/api/Enterprise/AddEnterprise';
        divAddEdit.innerHTML = "<form id=\"postForm\" class=\"editForm\" action=\"http://localhost:5102/api/Enterprise/AddEnterprise\" method=\"post\">\n        PR name:<input type=\"text\" name=\"nameOfPR\" id=\"nameOfPR\"> Contact number:<input type=\"text\" name=\"phoneNumber\" id=\"phoneNumber\"> Email:\n        <input type=\"text\" name=\"email\" id=\"email\"> Enterprise name:<input type=\"text\" name=\"corpName\" id=\"corpName\"> Enterprise address:<input type=\"text\" name=\"corpAddress\" id=\"corpAddress\">\n        <button id=\"btnPost1\">POST</button>\n        </form>";
        $("#postForm").submit(function (e) {
            e.preventDefault();
            $.ajax({
                url: "http://localhost:5102/api/Enterprise/AddEnterprise",
                type: "post",
                data: $("#postForm").serialize(),
                success: function () {
                    pageReload();
                }
            });
        });
    };
    return AddEnterpraise;
}());
var EditEnterprise = /** @class */ (function () {
    function EditEnterprise() {
    }
    EditEnterprise.EditEnterprise = function (div, id) {
        var url = "http://localhost:5102/api/Enterprise/filterEnterprisesByPIB";
        fetch(url + "?filterData=".concat(id)).then(function (resp) { return resp.json(); }).then(function (data) {
            data.forEach(function (element) {
                divAddEdit.innerHTML = "<form id=\"postForm\" class=\"editForm\" action=\"http://localhost:5102/api/Enterprise/AddEnterprise\" method=\"post\">\n            PR name:<input type=\"text\" name=\"nameOfPR\" id=\"nameOfPR\" value=\"".concat(element.nameOfPR, "\"> \n            Contact number:<input type=\"text\" name=\"phoneNumber\" id=\"phoneNumber\" value=\"").concat(element.phoneNumber, "\"> \n            Email:<input type=\"text\" name=\"email\" id=\"email\" value=\"").concat(element.email, "\"> \n            Enterprise name:<input type=\"text\" name=\"corpName\" id=\"corpName\" value=\"").concat(element.corpName, "\"> \n            Enterprise address:<input type=\"text\" name=\"corpAddress\" id=\"corpAddress\" value=\"").concat(element.corpAddress, "\">\n            <button id=\"btnPost1\">POST</button>\n            </form>");
            });
            $("#postForm").submit(function (e) {
                e.preventDefault();
                $.ajax({
                    url: "http://localhost:5102/api/Enterprise/EditEnterprise/+".concat(id),
                    type: "post",
                    data: $("#postForm").serialize(),
                    success: function () {
                        pageReload();
                    }
                });
            });
        });
    };
    EditEnterprise.AddInvoice = function (div, id) {
        divAddEdit.innerHTML = "<form id=\"postForm\" class=\"editForm\">\n        pibSentFrom:<input type=\"text\" name=\"pibSentFrom\" id=\"pibSentFrom\" value=\"".concat(id, "\"> \n        pibSentTo:<input type=\"text\" name=\"pibSentTo\" id=\"pibSentTo\"> \n        dateOfCreation:<input type=\"date\" name=\"dateOfCreation\" id=\"dateOfCreation\"> \n        paymentDeadline:<input type=\"date\" name=\"paymentDeadline\" id=\"paymentDeadline\"> \n        invoiceType:<input type=\"text\" name=\"invoiceType\" id=\"invoiceType\">\n        name:<input type=\"text\" name=\"name\" id=\"name\">\n        pricePerUnit:<input type=\"number\" name=\"pricePerUnit\" id=\"pricePerUnit\">\n        unitType:<input type=\"text\" name=\"unitType\" id=\"unitType\">\n        amount:<input type=\"number\" name=\"amount\" id=\"amount\">\n        <button id=\"btnPostInvoice\">POST</button>\n        </form>");
        $("#postForm").submit(function (e) {
            e.preventDefault();
            $.ajax({
                url: "http://localhost:5102/api/Invoice/addNewInvoice",
                type: "post",
                data: $("#postForm").serialize(),
                success: function () {
                    pageReload();
                }
            });
        });
    };
    return EditEnterprise;
}());
var InvoiceRepo = /** @class */ (function () {
    function InvoiceRepo() {
    }
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
    InvoiceRepo.ShowAllInvoicesForPIB = function (div, id, page) {
        settings.url = "http://localhost:5102/api/Invoice/".concat(id, "/").concat(page);
        div.innerHTML = "";
        $.ajax(settings).done(function (response) {
            response.forEach(function (item) {
                div.innerHTML += "\n                <button id=\"".concat(item.id, "\" class=\"").concat(item.invoiceType, "\">\n                <ul>\n                <li>ID: ").concat(item.id, "</li>\n                <li>pibSentFrom: ").concat(item.pibSentFrom, "</li>\n                <li>pibSentTo: ").concat(item.pibSentTo, "</li>\n                <li>dateOfCreation: ").concat(item.dateOfCreation, "</li>\n                <li>paymentDeadline: ").concat(item.paymentDeadline, "</li>\n                <li>paymentAmount: ").concat(item.paymentAmount, "</li>\n                <li>invoiceType: ").concat(item.invoiceType, "</li>\n                <li>name: ").concat(item.name, "</li>\n                <li>pricePerUnit: ").concat(item.pricePerUnit, "</li>\n                <li>unitType: ").concat(item.unitType, "</li>\n                <li>amount: ").concat(item.amount, "</li>\n            </ul> </button>\n                ");
            });
            div.innerHTML += "<ul class=\"pagination\">\n            <li class=\"page-item\"><a class=\"page-link\" id=\"previous_page\" data-page=".concat(page - 1, ">Previous</a></li>\n            <li class=\"page-item\"><a class=\"page-link\" id=\"next_page\" data-page=").concat(page + 1, ">Next</a></li>\n           \n          </ul>");
            document.querySelector("#previous_page").addEventListener("click", function () {
                var page = parseInt(document.querySelector("#previous_page").getAttribute("data-page"));
                if (page < 0) {
                    page = 0;
                }
                InvoiceRepo.ShowAllInvoicesForPIB(div, id, page);
            });
            document.querySelector("#next_page").addEventListener("click", function () {
                var page = parseInt(document.querySelector("#next_page").getAttribute("data-page"));
                InvoiceRepo.ShowAllInvoicesForPIB(div, id, page);
            });
        });
    };
    InvoiceRepo.filterInvoiceByName = function (div) {
        var enterprises = [];
        var url = "http://localhost:5102/api/Invoice/filterInvoiceByPIB";
        var pib = document.getElementById("filter1");
        fetch(url + "/".concat(pib.value)).then(function (resp) { return resp.json(); }).then(function (data) {
            div.innerHTML = "";
            data.forEach(function (item) {
                div.innerHTML += "\n                            <button id=\"".concat(item.id, "\" class=\"").concat(item.invoiceType, "\">\n                            <ul>\n                            <li>ID: ").concat(item.id, "</li>\n                            <li>pibSentFrom: ").concat(item.pibSentFrom, "</li>\n                            <li>pibSentTo: ").concat(item.pibSentTo, "</li>\n                            <li>dateOfCreation: ").concat(item.dateOfCreation, "</li>\n                            <li>paymentDeadline: ").concat(item.paymentDeadline, "</li>\n                            <li>paymentAmount: ").concat(item.paymentAmount, "</li>\n                            <li>invoiceType: ").concat(item.invoiceType, "</li>\n                            <li>name: ").concat(item.name, "</li>\n                            <li>pricePerUnit: ").concat(item.pricePerUnit, "</li>\n                            <li>unitType: ").concat(item.unitType, "</li>\n                            <li>amount: ").concat(item.amount, "</li>\n                        </ul> </button>");
            })["catch"](function (err) { return console.log(err); });
        });
    };
    InvoiceRepo.filterInvoiceByAmount = function (div) {
        var enterprises = [];
        var url = "http://localhost:5102/api/Invoice/filterInvoiceByAmount";
        var name = document.getElementById("filter2");
        fetch(url + "/".concat(name.value)).then(function (resp) { return resp.json(); }).then(function (data) {
            div.innerHTML = "";
            data.forEach(function (item) {
                div.innerHTML += "\n                            <button id=\"".concat(item.id, "\" class=\"").concat(item.invoiceType, "\">\n                            <ul>\n                            <li>ID: ").concat(item.id, "</li>\n                            <li>pibSentFrom: ").concat(item.pibSentFrom, "</li>\n                            <li>pibSentTo: ").concat(item.pibSentTo, "</li>\n                            <li>dateOfCreation: ").concat(item.dateOfCreation, "</li>\n                            <li>paymentDeadline: ").concat(item.paymentDeadline, "</li>\n                            <li>paymentAmount: ").concat(item.paymentAmount, "</li>\n                            <li>invoiceType: ").concat(item.invoiceType, "</li>\n                            <li>name: ").concat(item.name, "</li>\n                            <li>pricePerUnit: ").concat(item.pricePerUnit, "</li>\n                            <li>unitType: ").concat(item.unitType, "</li>\n                            <li>amount: ").concat(item.amount, "</li>\n                        </ul> </button>");
            })["catch"](function (err) { return console.log(err); });
        });
    };
    InvoiceRepo.EditInvoicesForPIB = function (div, id) {
        var url = "http://localhost:5102/api/Invoice/filterInvoiceByPIB";
        fetch(url + "/".concat(id)).then(function (resp) { return resp.json(); }).then(function (data) {
            data.forEach(function (element) {
                alert("1");
                divAddEdit.innerHTML = "<form id=\"postForm\" class=\"editForm\">\n            dateOfCreation:<input type=\"date\" name=\"dateOfCreation\" id=\"dateOfCreation\" value=\"".concat(element.dateOfCreation, "\"> \n            paymentDeadline:<input type=\"date\" name=\"paymentDeadline\" id=\"paymentDeadline\" value=\"").concat(element.paymentDeadline, "\"> \n            invoiceType:<input type=\"text\" name=\"invoiceType\" id=\"invoiceType\" value=\"").concat(element.invoiceType, "\"> \n            name:<input type=\"text\" name=\"name\" id=\"name\" value=\"").concat(element.name, "\"> \n            pricePerUnit:<input type=\"number\" name=\"pricePerUnit\" id=\"pricePerUnit\" value=\"").concat(element.pricePerUnit, "\">\n            unitType:<input type=\"text\" name=\"unitType\" id=\"unitType\" value=\"").concat(element.unitType, "\">\n            amount:<input type=\"number\" name=\"amount\" id=\"amount\" value=\"").concat(element.amount, "\">\n            <button id=\"btnPost1\">POST</button>\n            </form>");
            });
            $("#postForm").submit(function (e) {
                e.preventDefault();
                $.ajax({
                    url: "http://localhost:5102/api/Invoice/editInvoice/".concat(id),
                    type: "post",
                    data: $("#postForm").serialize(),
                    success: function () {
                        pageReload();
                    }
                });
            });
        });
    };
    InvoiceRepo.showEnterpriseIncome = function (div, id) {
        var date1 = document.querySelector("#date1");
        var date2 = document.querySelector("#date2");
        var url = "http://localhost:5102/api/Invoice/EnterpriseIncome";
        fetch(url + "?PIB=".concat(id, "&dateFrom=").concat(date1.value, "&dateTo=").concat(date2.value)).then(function (resp) { return resp.json(); }).then(function (data) {
            divAddEdit.innerHTML = "Income for PIB(".concat(id, ")=").concat(data, " eur");
        });
    };
    return InvoiceRepo;
}());
var buttonShow = document.getElementById("btnShow");
var buttonAdd = document.getElementById("btnAdd");
var buttonAddInvoice = document.getElementById("btnAddInvoice");
var divShow = document.querySelector("#showEnterprises");
buttonShow.addEventListener('click', function (e) { return RadSaPrikazom.ShowAllEnterprises(divShow); });
var divAddEdit = document.querySelector("#addEditEnteprise");
buttonAdd.addEventListener('click', function (e) { return AddEnterpraise.AddEnterprise(divAddEdit); });
var divAddEditInvoice = document.querySelector("#addEditInvoice");
var divshowInvoice = document.querySelector("#showInvoices");
document.addEventListener('click', function (e) {
    var target = e.target;
    if (target && target.className == "entBtns") {
        EditEnterprise.EditEnterprise(divAddEdit, target.id);
    }
    if (target && target.className == "btnInvoice") {
        EditEnterprise.AddInvoice(divAddEdit, target.id);
    }
    if (target && target.className == "outgoing") {
        alert("1");
        InvoiceRepo.EditInvoicesForPIB(divAddEdit, target.id);
    }
    if (target && target.className == "btnShowInvoice") {
        InvoiceRepo.ShowAllInvoicesForPIB(divshowInvoice, target.id, 1);
    }
    if (target && target.className == "btnShowIncome") {
        InvoiceRepo.showEnterpriseIncome(divshowInvoice, target.id);
    }
    if (target && target.className == "btnShowInvoiceFilter") {
        var amount = document.getElementById("filter2");
        var name_1 = document.getElementById("filter1");
        if (amount.value != "" && name_1.value == "") {
            InvoiceRepo.filterInvoiceByAmount(divshowInvoice);
        }
        if (name_1.value != "" && amount.value == "") {
            InvoiceRepo.filterInvoiceByName(divshowInvoice);
        }
    }
    if (target && target.className == "reloadbtn") {
        pageReload();
    }
});
function pageReload() {
    this.location.reload();
}
var pibInput = document.querySelector("#pib");
var nameInput = document.querySelector("#name");
var btnFilter = document.getElementById("btnFilter");
btnFilter.addEventListener("click", function () {
    if (pibInput.value != "" && nameInput.value == "") {
        RadSaPrikazom.ShowFilteredByPiB(divShow);
    }
    else if (nameInput.value != "" && pibInput.value == "") {
        RadSaPrikazom.ShowFilteredByName(divShow);
    }
    else if (nameInput.value != "" && pibInput.value != "") {
        RadSaPrikazom.ShowFilteredByNameAndPib(divShow);
    }
});

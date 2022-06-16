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
            prikaz += "<div class=\"accordion-item\">\n            <h2 class=\"accordion-header\" id=\"flush-headingOne-tim-".concat(a.pib, "\">\n              <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#flush-collapseOne-tim-").concat(a.pib, "\" aria-expanded=\"false\" aria-controls=\"flush-collapseOne-tim-").concat(a.pib, "\">\n                ").concat(a.corpName, "\n              </button>\n            </h2>\n            <div id=\"flush-collapseOne-tim-").concat(a.pib, "\" class=\"accordion-collapse collapse\" aria-labelledby=\"flush-headingOne-tim-").concat(a.pib, "\" data-bs-parent=\"#accordionFlushExample\">\n              <button id=\"").concat(a.pib, "\" class=\"entBtns\">").concat(a.corpAddress, "-").concat(a.nameOfPR, "-").concat(a.pib, "</button>\n            </div>\n          </div>");
        });
        return prikaz;
    };
    RadSaPrikazom.ShowEnterprises = function (div) {
        var enterprises = [];
        $.ajax(settings).done(function (response) {
            div.innerHTML = "\n        <div class=\"accordion accordion-flush\" id=\"accordionFlushExample\">".concat(RadSaPrikazom.ShowEnterprisesDetails(response), "</div>");
        });
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
                    alert("Added ent!");
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
                        alert("Added ent!");
                    }
                });
            });
        });
    };
    return EditEnterprise;
}());
var buttonShow = document.getElementById("btnShow");
var buttonAdd = document.getElementById("btnAdd");
var divShow = document.querySelector("#showEnterprises");
buttonShow.addEventListener('click', function (e) { return RadSaPrikazom.ShowEnterprises(divShow); });
var divAddEdit = document.querySelector("#addEditEnteprise");
buttonAdd.addEventListener('click', function (e) { return AddEnterpraise.AddEnterprise(divAddEdit); });
document.addEventListener('click', function (e) {
    var target = e.target;
    if (target && target.className == "entBtns") {
        EditEnterprise.EditEnterprise(divAddEdit, target.id);
    }
});

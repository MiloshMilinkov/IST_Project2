var inputPR;
var inputPN
var inputEM
var inputEN
var inputEA
const callInputs = () => {
    inputPR = document.querySelector("#nameOfPR")
    inputPN = document.querySelector("#phoneNumber")
    inputEM = document.querySelector("#email")
    inputEN = document.querySelector("#corpName")
    inputEA = document.querySelector("#corpAddress")
}

const FilterEnterprisesbyPib = () => {
    let size = 0
    let url = "http://localhost:5102/api/Enterprise/filterEnterprisesByPIB"

    let selectbox = document.querySelector("#select");
    selectbox.innerHTML = "";

    let PIB = document.getElementById("pib").value

    fetch(url + `?filterData=${PIB}`).then(resp => resp.json()).then((data) => {

        data.forEach(element => {
            let option = document.createElement("option");
            size++;
            option.id = element.pib;
            option.text = element.pib + " " + element.nameOfPR + " " + element.corpName + " " + element.corpAddress;
            selectbox.appendChild(option);
        });
        selectbox.size = size;
        size = 0

    }).catch(err => console.log(err))
}

const FilterEnterprisesbyName = () => {
    let size = 0
    let url = "http://localhost:5102/api/Enterprise/filterEnterprisesByName"

    let selectbox = document.querySelector("#select");
    selectbox.innerHTML = "";

    let name = document.getElementById("name").value

    fetch(url + `/${name}`).then(resp => resp.json()).then((data) => {

        data.forEach(element => {
            let option = document.createElement("option");
            size++;
            option.id = element.pib;
            option.text = element.pib + " " + element.nameOfPR + " " + element.corpName + " " + element.corpAddress;
            selectbox.appendChild(option);
        });
        selectbox.size = size;
        size = 0

    }).catch(err => console.log(err))
}
const FilterEnterprisesbyNameAdnPIB = () => {
    let size = 0
    let url = "http://localhost:5102/api/Enterprise/filterEnterprisesByName"

    let selectbox = document.querySelector("#select");
    selectbox.innerHTML = "";

    let name = document.getElementById("name").value

    fetch(url + `/${name}`).then(resp => resp.json()).then((data) => {

        data.forEach(element => {
            let option = document.createElement("option");
            size++;
            option.id = element.pib;
            option.text = element.pib + " " + element.nameOfPR + " " + element.corpName + " " + element.corpAddress;
            selectbox.appendChild(option);
        });
        selectbox.size = size;
        size = 0

    }).catch(err => console.log(err))
}
const IzmenaPreduzeca = (id) => {
    callInputs();
    let url = "http://localhost:5102/api/Enterprise/filterEnterprisesByPIB"
    fetch(url + `?filterData=${id}`).then(resp => resp.json()).then((data) => {

        data.forEach(element => {
            inputPR.value = element.nameOfPR;
            inputPN.value = element.phoneNumber;
            inputEM.value = element.email;
            inputEN.value = element.corpName;
            inputEA.value = element.corpAddress;
        });


    }).catch(err => console.log(err))
    $("#editForm").submit((e) => {

        e.preventDefault();
        $.ajax({
            url: `http://localhost:5102/api/Enterprise/EditEnterprise/+${id}`,
            type: "post",
            data: $(".editForm").serialize(),
            success: () => {
                alert("Edited ent!")
            }

        });




    })

}
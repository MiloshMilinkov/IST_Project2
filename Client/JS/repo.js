const FilterEnterprises = () => {
    let size = 0
    let url = "http://localhost:5102/api/Enterprise/filterEnterprisesByPIB"

    let selectbox = document.querySelector("#select");
    selectbox.innerHTML = "";

    let PIB = document.getElementById("pib").value

    fetch(url + `?filterData=${PIB}`).then(resp => resp.json()).then((data) => {

        data.forEach(element => {
            let option = document.createElement("option");
            size++;
            option.text = element.pib + " " + element.nameOfPR + " " + element.corpName + " " + element.corpAddress;
            selectbox.appendChild(option);
        });
        selectbox.size = size;
        size = 0

    }).catch(err => console.log(err))
}
let size = 0
document.getElementById("showEnt").addEventListener("click", () => {
    let container = document.getElementById("showeEntContainer")

    let selectbox = document.querySelector("#select");
    let url = "http://localhost:5102/api/Enterprise/GetAllEnterprises"


    fetch(url).then(resp => resp.json()).then((data) => {
        data.forEach(element => {
            let option = document.createElement("option");
            size++;
            option.text = element.pib + " " + element.nameOfPR + " " + element.corpName + " " + element.corpAddress;
            selectbox.appendChild(option);
        });
        selectbox.size = size;
    }).catch(err => console.log(err))
})
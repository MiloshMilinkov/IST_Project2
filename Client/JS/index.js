let size = 0
document.getElementById("showEnt").addEventListener("click", () => {
    let container = document.getElementById("showeEntContainer")

    let selectbox = document.querySelector("#select");
    selectbox.innerHTML = "";

    let url = "http://localhost:5102/api/Enterprise/GetAllEnterprises"


    fetch(url).then(resp => resp.json()).then((data) => {
        data.forEach(element => {
            let option = document.createElement("option");
            size++;
            option.text = element.pib + " " + element.nameOfPR + " " + element.corpName + " " + element.corpAddress;
            selectbox.appendChild(option);
        });
        selectbox.size = size;
        size = 0
    }).catch(err => console.log(err))
})


document.getElementById("addEnt").addEventListener("click", () => {
    let container = document.getElementById("addEntContainer")
    let url = 'http://localhost:5102/api/Enterprise/AddEnterprise'


    fetch(url).then(resp => resp.json()).then((data) => {
        data.forEach(element => {
            let option = document.createElement("option");
            size++;
            option.text = element.pib + element.nameOfPR + element.corpName + element.corpAddress;
            selectbox.appendChild(option);
        });
        selectbox.size = size;
        size = 0
    }).catch(err => console.log(err))
})

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
document.getElementById("btnFilter").addEventListener("click", () => {
    FilterEnterprises();
})
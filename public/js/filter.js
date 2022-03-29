
const filterFormHandler = async (event) => {
    event.preventDefault();
    const zipcode = document.querySelector('#zipcode').value.trim();
console.log(zipcode);
    if(zipcode){
        const response = await fetch("/api/properties/filtered/:zip", {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });

        if(response.ok){
            window.location.replace(`/filtered/${zipcode}`);
        } else {
            alert(response.statusText)
        }
    }

}

document.querySelector("#submit-zip").addEventListener("click", filterFormHandler)
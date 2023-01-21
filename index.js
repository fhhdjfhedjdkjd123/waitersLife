function saveToStorage(event){
    event.preventDefault();
    let form = document.getElementById("form");
    let price = document.getElementById("price").value;
    let dish = document.getElementById("dish").value;
    let table = document.getElementById("table").value;
    let obj = {
        price:price,
        dish:dish,
        table:table
    }
    axios.post("https://crudcrud.com/api/3d174c901edb41aea676f28ef5d47110/waitersLife",obj)
    .then((response)=>{
        userDetailsOnScreen(response.data);
        console.log(response.data);
    })
    .catch((err)=>{
        console.log(err);
    })
    //userDetailsOnScreen(obj);
}
window.addEventListener("DOMContentLoaded", ()=>{
    axios.get("https://crudcrud.com/api/3d174c901edb41aea676f28ef5d47110/waitersLife")
        .then((response)=>{
            for(let i=0;i<response.data.length;i++){
                userDetailsOnScreen(response.data[i]);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
})
function userDetailsOnScreen(user){
    document.getElementById("price").value = "";
    document.getElementById("dish").value = "";
    if(user.table=="Table 1"){
        let table1 = document.getElementById("table1Orders");
        let childHtml = `<li id=${user._id}> ${user.price} - ${user.dish} - ${user.table}
                        <button class="delete" onclick=deleteUser('${user._id}')>Delete User</button> 
                        </li>`;
        table1.innerHTML = table1.innerHTML + childHtml;
    }
    else if(user.table=="Table 2"){
        let table2 = document.getElementById("table2Orders");
        let childHtml = `<li id=${user._id}> ${user.price} - ${user.dish} - ${user.table}
                        <button class="delete" onclick=deleteUser('${user._id}')>Delete User</button> 
                        </li>`;
        table2.innerHTML = table2.innerHTML + childHtml;
    }else{
        let table3 = document.getElementById("table3Orders");
        let childHtml = `<li id=${user._id}> ${user.price} - ${user.dish} - ${user.table}
                        <button class="delete" onclick=deleteUser('${user._id}')>Delete User</button> 
                        </li>`;
        table3.innerHTML = table3.innerHTML + childHtml;
    }
}
function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/3d174c901edb41aea676f28ef5d47110/waitersLife/${userId}`)
    .then((response)=>{
        removeUserFromScreen(userId);
    })
    .catch((err)=>{
        console.log(err);
    })
}
function removeUserFromScreen(userId){
    let table1 = document.getElementById("table1Orders");
    let table2 = document.getElementById("table2Orders");
    let table3 = document.getElementById("table3Orders");

    let childTable = document.getElementById(userId);
    if(table1){
        table1.removeChild(childTable);
    }
    else if(table2){
        table2.removeChild(childTable);
   }
    else if(table3){
      table3.removeChild(childTable);
    }

}

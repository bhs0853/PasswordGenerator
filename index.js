let length;
let finalPassword;
let lengthEle = document.getElementById("length");
function updateLength() {
  document.getElementById("passLength").innerHTML = `${lengthEle.value}`;
  length = lengthEle.value;
}
updateLength();
lengthEle.addEventListener("input", function () {
  updateLength();
});
document.getElementById("generateBtn").addEventListener("click", function () {
  const password = generatePassword();
  //console.log(password);
  document.getElementById("innerdiv1").style.padding = "0.93rem";
  document.getElementById("innerdiv1").style.fontWeight = "bold";
  document.getElementById("GenPass").innerHTML = password;
  finalPassword=password;
});
function generate(string){
    let password = "";
    for(let i=0;i<length;i++){
        password += (string[Math.floor(Math.random()*string.length)]);
    }
   // console.log(string.length);
    return password;
}
const upperCase = document.getElementById("upperCase").value;

function generatePassword(){
    //console.log("start");
    const upperCase = document.getElementById("upperCase").checked;
    const lowerCase = document.getElementById("lowerCase").checked;
    const number = document.getElementById("number").checked;
    const symbol = document.getElementById("symbol").checked;
    const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz$#@"
    let password;
    let filteredstr = "";
    //console.log(upperCase)
    if(upperCase){
        filteredstr += str.slice(0,26);
    }
    if(number){
        filteredstr += str.slice(26,36);
    }
    if(lowerCase){
        filteredstr += str.slice(36,62);
    }
    if(symbol){
        filteredstr += str.slice(62,65);
    }
    if(filteredstr.length>2){
        password = generate(filteredstr);
    }
    else{
        password = generate(str.slice(36,62));
    }
    //check for strength
    if(upperCase && lowerCase && (number || symbol) && length>=8){
        document.getElementById("strength").innerHTML = "Strong";
        document.getElementById("strength").style.color = "#0f0";
    }
    else if(upperCase && lowerCase && (number || symbol) && length>=6){
        document.getElementById("strength").innerHTML = "Good";
        document.getElementById("strength").style.color = "#ff0";
    }
    else{
        document.getElementById("strength").innerHTML = "Weak";
        document.getElementById("strength").style.color = "#f00";
    }
    // console.log(filteredstr.length)
    // console.log("end");
    return password;
}
document.getElementById("copyContent").addEventListener("click",() => {
    if(finalPassword){
        copyContent();
    }
});
async function copyContent(){
    try{
        await navigator.clipboard.writeText(finalPassword);
        document.getElementById("copyText").innerText = "copied";
        document.getElementById("copyText").style.display = "inline";
        setTimeout(function (){
            document.getElementById("copyText").style.display = "none";
        },1000)
    }
    catch(e){
        document.getElementById("copyText").innerText = "failed";
        document.getElementById("copyText").style.display = "inline";
        setTimeout(function (){
            document.getElementById("copyText").style.display = "none";
        },1000)
    }
}
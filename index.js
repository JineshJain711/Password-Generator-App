const inputSlider = document.querySelector('[data-lengthslider]');
const lengthDisplay = document.querySelector('[data-lengthNumber]');
const passwordDisplay = document.querySelector('[data-passwordDisplay]');
const copyBtn = document.querySelector('[data-copy]');
const copyMsg = document.querySelector('[data-copyMsg]');
const uppercaseCheck = document.querySelector('#uppercase');
const lowercaseCheck = document.querySelector('#lowercase');
const numbersCheck = document.querySelector('#numbers');
const symbolsCheck = document.querySelector('#symbols');
const indicator = document.querySelector('[data-indicator]');
const generateButton = document.querySelector('.generateButton');
const allCheckBoxes = document.querySelectorAll('input[type="checkbox"]');

let password = "";
let passwordLength = 10;
let checkCount = 0;
//set streangth circle color gray color
handleSlider();


function handleSlider()
{
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}
function setIndicator(color) {
    indicator.style.backgroundColor = color;
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function generateRandomNumber()
{
    return getRandomInt(0, 9);
}
function genrateRandomLowercase()
{
    return String.fromCharCode(getRandomInt(97, 123));
}
function generateRandomUppercase()
{
    return String.fromCharCode(getRandomInt(65, 91));
}
function generateRandomSymbol()
{
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
    return symbols.charAt(getRandomInt(0, symbols.length));
}
function shuffled(array)
{
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => {
        str += el;
    });
    return str;
}
function calculateStrength() {
    let strength = 0;
    allCheckBoxes.forEach((check) => {
        if(check.checked)
        {
            strength += 1; 
        }
    })
    if (passwordLength >= 8 && strength > 2) 
        {
        setIndicator("green");
    } else if (passwordLength >= 6 && strength > 1) {
        setIndicator("yellow");
    } else {
        setIndicator("red");
    }
}
async function copyContent() {
    try 
    {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied!";
    } catch (error) {
        copyMsg.innerText = "Failed to copy!";
    }
    copyMsg.classList.add("active");
    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

inputSlider.addEventListener('input', (e) =>{
    passwordLength = e.target.value;
    console.log("ok");
    console.log(inputSlider.value)
    handleSlider();
})
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
})
function handleChekBoxChange() {
    checkCount = 0;
    allCheckBoxes.forEach((check) => {
        if (check.checked) {
            checkCount++;
        }
    });
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}
generateButton.addEventListener('click', ()=>{
    if (checkCount <= 0) {
        return;
    }        
    
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
    password = "";
//     if(uppercaseCheck.checked) {
//         password += generateRandomUppercase();
//     }
//     if(lowercaseCheck.checked) {
//         password += genrateRandomLowercase();
//     }
//     if(numbersCheck.checked) {
//         password += generateRandomNumber();
//     }
//     if(symbolsCheck.checked) {
//         password += generateRandomSymbol();
//     }
//
    let funcArr = [];
    if(uppercaseCheck.checked) {
        funcArr.push(generateRandomUppercase);
    }
    if(lowercaseCheck.checked) {
        funcArr.push(genrateRandomLowercase);
    }
    if(numbersCheck.checked) {
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked) {
        funcArr.push(generateRandomSymbol);
    }
    for(let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
        console.log(password);
    }

    for(let i = 0; i < passwordLength - funcArr.length; i++) {
        let randomIndex = getRandomInt(0, funcArr.length);
        password += funcArr[randomIndex]();
        console.log(password);
    }
    passwordDisplay.innerText = password;



   password = shuffled(Array.from(password));
    passwordDisplay.value = password;
    calculateStrength();
})
allCheckBoxes.forEach((check) =>{
    check.addEventListener('change', handleChekBoxChange);
})                                                                                                
const username =document.getElementById('username');
const email= document.getElementById('Email');
const password = document.getElementById('Password');
const gender = document.getElementsByName('Gender');

const gitBaseUrl ="https://wesamkhaledmorsy.github.io/Smart-login-System/"
const localBaseUrl = "http://127.0.0.1:5501/"
let isuser= false;
let loginedUser = "";
const usersData = [];
if(JSON.parse(localStorage.getItem('users')) != null){

}

function redirectPageUrl(pageName){
    if (window.location.origin+'/'== localBaseUrl) {
        window.location.href = localBaseUrl+`${pageName}`;                                    
    }else{
        window.location.href = gitBaseUrl+`${pageName}`;                                    
    }   
}

let GettingUserData = JSON.parse(localStorage.getItem('users'));
function AddSignupData(){
    const user ={
        name:username.value,
        userEmail:email.value,
        userPass:password.value,
        usergender: [...gender].filter((_gender)=>{return _gender.checked})[0].value
    }

    if(nameValidation() && emailValidation() && passwordValidation()){
        if(GettingUserData != null){
            if(IsUser())
            {
                Swal.fire({
                    position: "center",
                    icon: "info",
                    title: "This email is excited or the User Name is excited",           
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Ok"
                });            
            }
            else{
                GettingUserData.push(user);
                localStorage.setItem('users', JSON.stringify(GettingUserData));
                resetForm();
                // sweet alert of success signup 
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You are Signed up Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                // redirect to login page
                const redirectPage="index.html";
                redirectPageUrl(redirectPage);
            }
        } else if(GettingUserData == null){
            GettingUserData = [];
            GettingUserData.push(user);
                localStorage.setItem('users', JSON.stringify(GettingUserData));
                resetForm();            
                const homePage="home.html";
                redirectPageUrl(homePage);
                // sweet alert of success signup 
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You are Signed up Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });                               
                redirectPageUrl(redirectPage);
        }              
        
    }else{
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Please enter correct and valid email and correct password",           
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok"
        });
    }
}

function SignIN(){
    const user ={     
        userEmail:email.value,
        userPass:password.value       
    }
    if(emailValidation() && passwordValidation()){
        if(GettingUserData != null){
            if(CheckUserCorrectAccount())
            {
                   // redirect to home page                  
                    const redirectPage="home.html";
                    redirectPageUrl(redirectPage);
                    resetForm();
            }
            else{
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Invalid Email or password",           
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Ok"
                });
            }
        } 
        
    }else{
        Swal.fire({
            position: "center",
            icon: "warning",
            title: "Invalid Email or password",           
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Ok"
        });
    }
}
console.log(window.location)

// check if the user exicte or not
    function IsUser(){
        for (let i = 0; i < GettingUserData.length; i++) {
            if(email.value == GettingUserData[i].userEmail || username.value== GettingUserData[i].name){
                return true;
            }else{
                return false;
            }
            
        }
    }

// check if the user exicte or not
function CheckUserCorrectAccount(){
    let count = 0;    
    do {
            if(email.value == GettingUserData[count].userEmail && password.value== GettingUserData[count].userPass){            
                isuser =true;
                loginedUser=GettingUserData[count];
                const currentuser = localStorage.setItem('currentUser',JSON.stringify(loginedUser))
                break;
            }else{
                isuser=false;                
            }                    
        count++;       
    } while (count < GettingUserData.length);
    return isuser;
}
function getUserDataByEmail(){
    const userdatabyEmail = JSON.parse(localStorage.getItem('currentUser'));
    loginedUser=userdatabyEmail;
    const htmlWelcomeHeader = document.getElementById('welcome-word');
    if(loginedUser != null)
        htmlWelcomeHeader.innerText = `Welcome ${loginedUser.name}`
    if(loginedUser != null)
        return userdatabyEmail.name;
}

getUserDataByEmail();

function logOut(){
    localStorage.removeItem('currentUser');      
    const redirectPage="index.html";
    redirectPageUrl(redirectPage);
}

function resetForm(){
    username.value='';
    email.value="";
    password.value="";
    username.classList.remove('valid');
    email.classList.remove('valid');
    password.classList.remove('valid');
}

username.addEventListener('keydown',nameValidation);
function nameValidation(){
    const name = username.value;
    const namePattern = /^[A-Za-z]{3,10}([^0-9]*)$/;
    if(namePattern.test(name) === true){
        username.classList.remove('inValid');
        username.classList.add('valid');
        return true;
    }else{
        username.classList.add('inValid');
        username.classList.remove('valid');
        return false;
    }
}

email.addEventListener('keydown',emailValidation);
function emailValidation(){
    const userEmail = email.value;
    const emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    if(emailPattern.test(userEmail) === true){
        email.classList.remove('inValid');
        email.classList.add('valid');               
        return true;
    }else{
        email.classList.add('inValid');
        email.classList.remove('valid');       
        return false;
    }
}

password.addEventListener('keydown',passwordValidation);
function passwordValidation(){
    const userPass= password.value;
    const passwordPattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!%#*?&]{8,}$/ ;
    if(passwordPattern.test(userPass)===true){
        password.classList.remove('inValid');
        password.classList.add('valid');
        return true;
    }else{
        password.classList.add('inValid');
        password.classList.remove('valid');
        return false;
    }
}


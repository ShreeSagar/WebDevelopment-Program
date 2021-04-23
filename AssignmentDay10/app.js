const resultEl = document.querySelector(".result");
const detailsEl = document.querySelector(".details");

//Getting users 
async function getUsers(){
    let url='https://api.github.com/users';
    try {
        let res=await fetch(url);
        return res.json();
        
    } catch (error) {
        console.log("Error..")
    }
}

//Rendering users


    async function renderUsers() {
        let users = await getUsers();
        let html = '';
        users.forEach(user => {
            let htmlSegment =  `<ul class="user">
            <li><img src="${user.avatar_url}" ></li>
            <li>${user.login}</li>
        </ul>`;
    
            html += htmlSegment;
        });
        resultEl.innerHTML = html;
    }
    
    renderUsers();


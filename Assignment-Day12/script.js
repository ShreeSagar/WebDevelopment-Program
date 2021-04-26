const resultEl = document.querySelector(".result");
const detailsEl = document.querySelector(".details");
        
        //Getting users 
        async function getUsers(){
            let url='https://api.github.com/users';
            try {
                let response=await fetch(url);
                return response.json();
                
            } catch (error) {
                console.log("Error..")
            }
            
        }
        
        //Rendering users
        async function renderUsers() {
        let users = await getUsers();
        let html = '';
        users.forEach(user => {
         let htmlSegment =  ` <table class="item">
         <tr>
            <td><img src="${user.avatar_url}" height="120px"></td>
            <td>${user.login}</td>
            <td><button data-abc="${user.login}">Show Details</button></td>
         </tr>
         </table>`;

    html += htmlSegment;
});
resultEl.innerHTML = html;
}

//Getting user details
async function fetchRepos(login){
    detailsEl.innerHTML='';
    let url=`https://api.github.com/users/${login}/repos`;
    try {
        let response=await fetch(url);
        let result=await response.json();
        renderRepos(result);
    } catch (error) {
        console.log("error..");
    }
    }
    
    //Rendering user details
    async function renderRepos(repos){
        let html='';
        repos.forEach(repo=>{
            let htmlSegment=`<p>${repo.full_name}</p>`;
            html+=htmlSegment;
        });
        detailsEl.innerHTML = html;
    }
    
    //Adding event listener
    resultEl.addEventListener('click', (e) => {
        e.stopPropagation();
        const username = e.target.getAttribute('data-abc');
        if (username) {
            const items = document.querySelectorAll('.item');
            items.forEach(item => item.classList.remove('active'));
    
            e.target.parentElement.parentElement.classList.add('active');
            fetchRepos(username);
        }
    });
   
renderUsers();
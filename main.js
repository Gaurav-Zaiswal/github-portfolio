window.onload = function (){
    var page_number=1;
    const nxtbtn = document.querySelector('.nxt-btn');
    const prevbtn = document.querySelector('.prev-btn');

    fetchRepo();


    fetch('https://api.github.com/users/gaurav-zaiswal')
    .then(response => response.json())
    .then(function(data){
        // console.log(data);

        //selectors
        const avatar = this.document.getElementsByTagName('img');
        const linkToGithub = this.document.getElementsByTagName('a');
        const callingName = this.document.querySelector('.calling-name');
        const email = this.document.querySelector('.email');
        const bio = this.document.querySelector('.bio');
        const followFollower = this.document.querySelector('.follower-following');

        //create elements
        let following_follower = document.createElement('span');
        let follower = document.createElement('span');
    
        avatar[0].setAttribute("src", data['avatar_url']);
        callingName.textContent = data['name'];
        linkToGithub[0].setAttribute('href', data['html_url']);
        linkToGithub[0].firstChild.textContent = `@${data['login']}`;
        email.textContent = data['email'];
        bio.textContent = data['bio'];
        following_follower.textContent = `Following ${data['following']} | Follower ${data['followers']}`;
        followFollower.appendChild(following_follower);
    });

    function fetchRepo(event){

    fetch("https://api.github.com/users/gaurav-zaiswal/repos")
    .then(response => response.json())
    .then(function(data){
        console.log(data);

        //selectors
    const repoContainer = document.querySelector('.right-or-down');

    //events


        //create elements
    data.forEach(element => {
        const repoLink = document.createElement('a');
        repoLink.setAttribute('href', element['clone_url']);
        const repoCard = document.createElement('div');
        repoLink.classList.add('repo-card');
        repoCard.textContent = element['name'];
        repoLink.appendChild(repoCard);
        repoContainer.appendChild(repoLink);    
    });

    });
}

}
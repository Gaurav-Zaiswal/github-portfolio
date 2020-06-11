window.onload = function () {
    var page_number = 1;
    const loadingDiv = document.querySelector('#loading-div');
    const leftTop = document.querySelector('#left-or-top');
    const rightDown = document.querySelector('#right-or-down');
    const nxtbtn = document.querySelector('#nxt-btn');
    const prevbtn = document.querySelector('.prev-btn');

    fetchRepo();
    nxtbtn.addEventListener('click', (event) => {
        page_number++;
        fetchRepo();
    });

    fetch('https://api.github.com/users/gaurav-zaiswal')
        .then(response => response.json())
        .then(function (data) {
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


            loadingDiv.hidden = true;

            leftTop.hidden = false;

        });




    function fetchRepo(event) {

        fetch(`https://api.github.com/users/gaurav-zaiswal/repos?page=${page_number}&per_page=6`)
            .then(response => response.json())
            .then(function (data) {
                console.log(data);
                lenOfData = data.length;

                //selectors
                const repoContainer = document.querySelector('.repo-parent');

                //events


                //create elements
                if (data.length > 0) {
                    data.forEach(element => {
                        const repoLink = document.createElement('a');
                        repoLink.setAttribute('href', element['clone_url']);
                        const repoCard = document.createElement('div');
                        repoLink.classList.add('repo-card');
                        repoCard.textContent = element['name'];
                        repoLink.appendChild(repoCard);
                        repoContainer.appendChild(repoLink);
                    });
                } else {
                    nxtbtn.setAttribute('disabled', 'disabled');
                    nxtbtn.id = "nxt-btn-disabled";
                }
                loadingDiv.hidden = true;
                rightDown.hidden = false;

            });

    }
}
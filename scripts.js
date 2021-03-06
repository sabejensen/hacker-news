const main = document.querySelector('main');

let stories = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
let story1 = 'https://hacker-news.firebaseio.com/v0/item/'
let story2 = '.json?print=pretty'
let storyArray = []

const storyPromise = new Promise((resolve, reject) => {
    fetch(stories)
        .then((resp) => resp.json()
        .then((data) => {
            storyArray.push(data)
            console.log(storyArray[0])
    }))
    setTimeout(() => resolve(), 500)
    
}).then(() => {

    const topGet = async () => {
        for (let i = 0; i < 30; i++) {
            await new Promise(resolve => setTimeout(resolve, 200))

            let url = story1 + storyArray[0][i] + story2

            fetch(url)
            .then((resp) => resp.json()
            .then((data) => {
                let container = document.createElement('div')
                let h2 = document.createElement('h2')
                let arrow = document.createElement('span')
                h2.textContent = (i+1).toString() + '. '
                arrow.innerHTML = '&#x25B2;'
                h2.appendChild(arrow)
                container.appendChild(h2)

                let innerContainer = document.createElement('div')

                let title = document.createElement('p')
                let titleLink = document.createElement('span')
                title.textContent = data.title
                titleLink.textContent = ' (' + data.url + ')'
                title.appendChild(titleLink)

                let details = document.createElement('p')
                let detailsContent = document.createElement('span')
                detailsContent.textContent = data.score.toString() + ' points by ' + data.by + ' | ' + data.descendants + ' comments'
                details.appendChild(detailsContent)

                innerContainer.appendChild(title)
                innerContainer.appendChild(details)

                container.appendChild(innerContainer)

                main.appendChild(container)
            }))
        }
    }

    topGet()
})

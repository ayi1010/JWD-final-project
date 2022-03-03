class ProfileManager {
    constructor(name, location) {
        this.name = name;
        this.location = location;
    }
    delete() {
        localStorage.setItem("name", "")
        localStorage.setItem("location", "")
    }
    save() {
        const name = JSON.stringify(this.name)
        localStorage.setItem("name", name)
        const location = JSON.stringify(this.location)
        localStorage.setItem("location", location)
    }
    load() {
        const name = localStorage.getItem("name")
        const location = localStorage.getItem("location")
        if (name || location) {
            displayManager()
            if (name) {
                this.name = JSON.parse(name)
            }
            if (location) {
                this.location = JSON.parse(location)
            }
        }
    }
    async render() {
        let firstName = document.querySelector('#firstName')
        firstName.innerText = this.name

        const data = await getWeather(this.location)
        try {
            const { name } = data;
            const { icon, description } = data.weather[0];
            const { temp, humidity } = data.main;
            const { speed } = data.wind;

            document.querySelector(".city").innerText = "Weather in " + name;
            document.querySelector(".icon").src =
                "https://openweathermap.org/img/wn/" + icon + ".png";
            document.querySelector(".description").innerText = description;
            document.querySelector(".temp").innerText = Math.floor(temp) + "°C";
            document.querySelector(".humidity").innerText =
                "Humidity: " + humidity + "%";
            document.querySelector(".wind").innerText =
                "Wind speed: " + speed + " km/h";
            document.querySelector(".weatherCard").style.backgroundImage =
                "url('https://source.unsplash.com/255x305/?" + name + "')";
        }
        catch {
            document.querySelector(".city").innerText = "No Data"
            document.querySelector(".weatherCardText").innerHTML = ""
        }

        // greeting
        const greeting = document.querySelector('#greeting')
        let today = new Date();
        const hour = today.getHours()
        switch (true) {
            case 5 <= hour && hour < 12:
                greeting.innerHTML = "Good morning"
                break;
            case 12 < hour && hour < 18:
                greeting.innerHTML = "Good afternoon"
                break;
            case 18 <= hour && hour < 21:
                greeting.innerHTML = "Good evening"
                break;
            case 21 <= hour && hour < 5:
                greeting.innerHTML = "Good evening"
                break;
        }
    }
}

const btnStart = document.querySelector('#btnStart');
btnStart.addEventListener('click', function () {
    let firstNameInput = document.querySelector('#firstNameInput').value
    if (firstNameInput) {
        profileManager.name = firstNameInput
    }
    let cityInput = document.querySelector('.search-city').value
    if (cityInput) {
        profileManager.location = cityInput
    }
    displayManager()
    profileManager.render()
    profileManager.save()
})

const btn = document.querySelector('#btnEdit');
btn.addEventListener('click', function () {
    profileManager.delete()
    hideManager()
})

function displayManager() {
    const startContainer = document.querySelector('#startContainer');
    const navbarContainer = document.querySelector('#navbarContainer')
    const taskContainer = document.querySelector('#taskContainer')

    startContainer.classList.add('d-none')
    startContainer.classList.remove('d-flex')
    navbarContainer.classList.remove('d-none')
    taskContainer.classList.remove('d-none')
}

function hideManager() {
    const startContainer = document.querySelector('#startContainer');
    const navbarContainer = document.querySelector('#navbarContainer')
    const taskContainer = document.querySelector('#taskContainer')

    startContainer.classList.remove('d-none')
    startContainer.classList.add('d-flex')
    navbarContainer.classList.add('d-none')
    taskContainer.classList.add('d-none')
}

// Weather API
const getWeather = async city => {
    try {
        const apiKey = "92329e9f76cb0a86293be4e3fa64f5c9"
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        const data = res.data
        return data
    } catch (e) {
        console.log('Error!', e)
    }
}
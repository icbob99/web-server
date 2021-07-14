
function fecthWeather(location){
    
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        response.json().then((data={})=>{
     
            const message1 = document.querySelector('#message-1')            
            const message2 = document.querySelector('#message-2')
                    

            if(data.error)
    {
        message1.textContent = data.error
                console.log(data.error)
        }
            else{
                console.log(data.location)
                console.log(data.address)
                console.log(data.forecast)
                message1.textContent = data.address
                message2.textContent = data.forecast
            }
        })
    })
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location=search.value

    const message1 = document.querySelector('#message-1')            
    const message2 = document.querySelector('#message-2')
    message1.textContent = 'Loading ...'
    message2.textContent = ''
    fecthWeather(location)
})
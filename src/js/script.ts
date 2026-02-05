let input: HTMLInputElement = document.querySelector(".url_input")
let submitButton: HTMLElement = document.querySelector(".submit_button")

async function getTinyUrl(urlToConvert: URL|string){
    let response = await fetch("https://api.tinyurl.com/create",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            authorization: 'Bearer 2nLQGpsuegHP8l8J0Uq1TsVkCzP3un3T23uQ5YovVf5lvvGOucGmFOYRVj6L'
        },
        body:JSON.stringify({
            url: `${urlToConvert}`
        })
    })

    interface TinyUrlData {
        data:{
            tiny_url:string
        }
    }

    let data:TinyUrlData = await response.json()
    if(Object.keys(data).length>0){
        return data.data.tiny_url
    }
    
    

}

//on submit generate the tinyurl
submitButton.addEventListener("click",async (event:Event)=>{
    let inputValue:string = input.value
    try{
        let checkValidity:URL = new URL(inputValue) // checks if the url is valid, this throws an error if the url is malformed
        let tinyUrl:string = await getTinyUrl(checkValidity) // generates the tinyUrl
        let copyButton:HTMLElement = document.querySelector("[class^='copy']")
        //adds a simple event listener to the button to copy the url
        copyButton.addEventListener("click",()=>{
            navigator.clipboard.writeText(tinyUrl)
            copyButton.textContent = "Copied!"
            setTimeout(()=>{
                copyButton.classList+="--hidden"
            },1000)
        },{once:true})

        copyButton.classList = "copy"
    }catch(err){
        console.log("URL not valid")
    }
    
})

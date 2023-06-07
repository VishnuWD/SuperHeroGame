const token = 1448525192579645
const baseURL = `https://superheroapi.com/api.php/${token}`
const supImage = document.getElementById("supImage")
const buttonRan = document.getElementById("randomHero")
const input = document.getElementById("input")
const search = document.getElementById("search")
const play = document.getElementById("play")
const result =document.getElementById("results")

// first box
const powerStats = document.getElementById("powerStats")
const title = document.getElementById("title")
const bio =document.getElementById("biography")
const bioHead = document.getElementById("bioHead") 
const StatHead = document.getElementById("powerStatHead")

//second box
const powerStats1 =document.getElementById("powerStats1")
const title1 = document.getElementById("title1")
const bio1 =document.getElementById("biography1")
const bioHead1 = document.getElementById("bioHead1") 
const StatHead1 = document.getElementById("powerStatHead1")
const supImage1 = document.getElementById("supImage1")


//first box function
const randomSup = () => {
   return Math.floor(Math.random() * 731)+1
}

const ranSuperHero = ( id , name) => {
    
    fetch(`${baseURL}/${randomSup()}`).then(
        response => response.json()
    )
    .then(json => {
        // title.innerText = json.name
        // supImage.innerHTML = `<img src="${json.image.url}" height=200px/>`
        
        powerStats.innerHTML = addingStats(json)
        bio.innerHTML = bioG(json)

        const string2 = Object.keys(json.powerstats)
    string2.forEach(stat2 => {
        
        resultsP.push(Number(json.powerstats[stat2]))
             
      });
      
      const lastSixElements = resultsP.slice(-6);
      
    
      resultsTotalP = lastSixElements.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
    })
}

//second box random
 
 const ranSuperHero1 = ( id , name) => {
     

     fetch(`${baseURL}/${Math.floor(Math.random() * 731)+1}`).then(
         response => response.json()
     ).then(json => {
         // title.innerText = json.name
         // supImage.innerHTML = `<img src="${json.image.url}" height="200px"/>`
         
        //  console.log(json.biography)
        powerStats1.innerHTML = addingStats1(json)
         bio1.innerHTML = bioG1(json)

         let string2 = Object.keys(json.powerstats)
    
    
        //This adds stats to the results
        string2.forEach(stat2 => {
            
            results.push(Number(json.powerstats[stat2]))
                 
          });
          const lastSixElements = results.slice(-6);
          
        
          resultsTotal = lastSixElements.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          );
     })

 }









// SUP SEARCH FUNCTIONS
const supSearch = (name) => {
    name = input.value
    fetch(`${baseURL}/search/${name}`).then(
        response => response.json()
    ).then(json => {

      bioHead.innerHTML="<h2 class='headings'>biography</h2>"
    powerStats.innerHTML = addingStats(json.results[0])
   bio.innerHTML = bioG(json.results[0])

   const string2 = Object.keys(json.results[0].powerstats)
    string2.forEach(stat2 => {
        
        resultsP.push(Number(json.results[0].powerstats[stat2]))
             
      });
      
      const lastSixElements = resultsP.slice(-6);
      
    
      resultsTotalP = lastSixElements.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
})
    
}


const emojisForStats = {
    intelligence: "🧠 ",
    strength: "💪 ",
    speed: "⚡ ",
    durability: "⛹️‍♀️ ",
    power: "🏋️‍♂️ ",
    combat:"⚔ "
}





// ADDING STATS FUNCTIONS
const addingStats = (character) => {
    resultsP;
    resultsTotalP;
  
    const string = Object.keys(character.powerstats).map(
        stat => {
         const p = `<p style= "margin:5px 10px">${emojisForStats[stat]}${stat.toUpperCase()}:${character.powerstats[stat]}</p>`
         
            return  p
        }
            
    )
    
           title.innerText = "🧑" + character.name
    supImage.innerHTML = `<img src="${character.image.url}" height="200px" style="border-radius: 5px; margin-bottom: 2rem;"/>`
    

    
        //    console.log(string)
           return string.join("")
}



const bioG = (character) => {
    const bio = Object.keys(character.biography).map(
        stat => {
         return  `<p class="left">${stat}:</p> <p class="right">${character.biography[stat]}</p>`
        }
           )
        //    console.log(bio)
           return bio.join("")
}

//second one
const addingStats1 = (character) => {

    results;
    resultsTotal;
  
    const string1 = Object.keys(character.powerstats).map(
        stat => {
       
         return  `<p style= "margin:5px 10px">${emojisForStats[stat]}${stat.toUpperCase()}:${character.powerstats[stat]}</p>`
        }
           )
           
           title1.innerText = "🤖"+character.name
    supImage1.innerHTML = `<img src="${character.image.url}" height=200px style="border-radius: 5px; margin-bottom: 2rem; "/>`
    
    
    //   console.log(resultsTotal);
        //    console.log(string)
           return string1.join("")
}



const bioG1 = (character) => {
    const bio = Object.keys(character.biography).map(
        stat1 => {
         return  `<p class="left">${stat1}:</p> <p class="right">${character.biography[stat1]}</p>`
        }
           )
        //    console.log(bio)
        //    console.log(stat)
           return bio.join("")
}

let results = [];
let resultsP = [];

let resultsTotal = 0;
let resultsTotalP = 0;


// buttons for click
buttonRan.onclick = () =>{
    ranSuperHero()
    bioHead.innerHTML="<h2 class='headings'>Biography</h2>"
    StatHead.innerHTML="<h2 class='headings'>Power Stats</h2>"
    setTimeout(() => {
        console.log("results Player: "+ resultsTotalP)
      }, "1000");
}

search.onclick = () => {
    supSearch()
    bioHead.innerHTML="<h2 class='headings'>Biography</h2>"
    StatHead.innerHTML="<h2 class='headings'>Power Stats</h2>"
}

    const score = () =>{
        result;
        
        setTimeout(() => {
            if(resultsTotal > resultsTotalP){
                result.innerHTML = "You Lose"
            }else if(resultsTotal < resultsTotalP){
                result.innerHTML = `<p style=" background-image: url(confetti.gif); z-index:1; background-position: center; background-size: cover;height: 100px";>You win</p>`
            }else if (resultsTotal >= 0 || resultsTotalP >= 0){
                result.innerText = "☹ One of the player doesn't have enough stats"
            }else if(resultsTotal == resultsTotalP){
                result.innerText = "Draw"
            }else{
                result.innerText = "☹ One of the player doesn't have enough stats"
            }
        }, 1000);


    }


play.onclick = () => {
    ranSuperHero1()
     bioHead1.innerHTML="<h2 class='headings'>Biography</h2>"
     StatHead1.innerHTML="<h2 class='headings'>Power Stats</h2>"
     
    

        score()
        setTimeout(() => {
            console.log("results bot: "+ resultsTotal)
          }, "1000");

}




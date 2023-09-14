import React, { useState } from 'react';


 async function getPrompt() {
  const res = await fetch('https://api.example.com/...')
  
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default function Home(props) {

  const thisvalue = "How many languages do you understand, and are you also " + 
  "knowledgeable about the subjects of Art, Literature, and History, "+
  "and well-versed in various fields of Science, such as Newtonian " + 
  "Physics, the theory of General Relativity, and Quantum Mechanics? " +
  "Please answer the above question in English and traditional Chinese."
  
  const [inputValue, setinputValue] = React.useState("")

  const [btndisabled, setbtndisabled] = React.useState(true)

  const [likes, setlikes] = React.useState(0);

  const handleChange = (e) => setinputValue(e.target.value)

  const handleDblClick = (e) => setinputValue(thisvalue)


  const handleKeyPress = (e) => setbtndisabled(false)

  const handleClick = (e) => console.log(`likes ${likes+1}`)
 /* */
  const submitInput = async () => {
        const prompt = document.querySelector("#prompt");
        const promptValue = inputvalue+"\r\n"+"\r\n";  
        setbtndisabled(false)
        setinputValue("")

        let interval1 = setInterval(() => {
            setinputValue(inputvalue + ".")
            if (inputvalue === "....") setinputValue("")
            }, 200)
    
        let res = await fetch("/chatGPT", {
            method: 'POST', 
                  headers: {
                     'Content-Type': 'application/json'
                    },
                  body: JSON.stringify({ prompt: promptValue })
                  })

        let answer = await res.json()
        let answerText = answer["answer"]
        clearInterval(interval1)
        setinputValue("")

        let finalText = promptValue + answerText;
        let index = 0;

        let interval2 = setInterval(() => {
             if (index < finalText.length){
              setinputValue(inputvalue+finalText.charAt(index))
              index++
             } else {
              clearInterval(interval2)
             }  
        }, 20)
      }

  return (
      <>
        <h3>
           ChatGPT人工智慧 - 精通各國語言並知天下事
        </h3>

        <textarea 
          value={inputValue} 
          onChange= {handleChange}
          onKeyPress = {handleKeyPress}
          onDoubleClick= {handleDblClick}
          id="prompt" rows="12" cols="40" resizeable="true">
        </textarea>
        <button 
            onClick = {handleClick}  id="btn" 
            disabled = {btndisabled ? true : false}>
            <i className="fas fa-paper-plane"></i>
        </button>
      </>
    )
  }
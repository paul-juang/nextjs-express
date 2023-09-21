import React, { useState } from 'react';

export default function Home(props) {

  const thisvalue = "How many languages do you understand, and are you also " + 
  "knowledgeable about the subjects of Art, Literature, and History, "+
  "and well-versed in various fields of Science, such as Newtonian " + 
  "Physics, the theory of General Relativity, and Quantum Mechanics? " +
  "Please answer the above question in traditional Chinese and English."
  
  const [inputValue, setinputValue] = React.useState("")

  const [btndisabled, setbtndisabled] = React.useState(false)

  const handleChange = (e) => setinputValue(e.target.value)

  const handleDblClick = (e) => setinputValue(thisvalue)

  //const handleKeyPress = (e) => setbtndisabled(false)

  const handleClick = async () => {
    const promptValue = inputValue.trim()
    setinputValue('')

    let tempValue = ''
    let interval1 = setInterval(() => {
      tempValue += "."
      setinputValue(tempValue)
      if (tempValue === "...") tempValue = ""
     }, 300)
    
    let res = await fetch("/api/chatgpt", {
            method: 'POST', 
                  headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*',
                     'Access-Control-Allow-Headers': 'Authorization,Content-Type ',
                    },
                  body: JSON.stringify({ prompt: promptValue })
                  })
    
        let answer = await res.json();
        let answerText = answer["prompt"];
        clearInterval(interval1);

        setinputValue('')

        let finalText = promptValue +"\r\n"+"\r\n"+answerText

        let index = 0;
        let tempValue2 = ''
        let interval2 = setInterval(() => {
             if (index < finalText.length) {
              tempValue2 += finalText.charAt(index);
              setinputValue(tempValue2)
              index++
             } else {
              clearInterval(interval2)
             }  
        }, 20)
    }

  return (
      <>
        <h3>ChatGPT</h3>
        <h3>OpenAI 人工智慧 - 精通各國語言並知天下事</h3>
        <textarea 
          value={inputValue} 
          onChange= {handleChange}
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
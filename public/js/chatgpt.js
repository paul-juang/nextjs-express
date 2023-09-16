//chatGPT-OpenAi
document.addEventListener('DOMContentLoaded', () => {
  const prompt = document.querySelector("#prompt");

  const thisvalue = "How many languages do you understand, and are you also " + 
  "knowledgeable about the subjects of Art, Literature, and History, "+
  "and well-versed in various fields of Science, such as Newtonian " + 
  "Physics, the theory of General Relativity, and Quantum Mechanics? " +
  "Please answer the above question in English and traditional Chinese."
  
  prompt.addEventListener("dblclick", (e) => e.target.value = thisvalue)

  prompt.addEventListener("keyup", () => button.disabled = false)

  const button = document.querySelector("#btn")

  button.addEventListener("click", async function(e) {
    e.preventDefault()
    
    const promptValue = prompt.value.trim()+"\r\n";
    prompt.value = "";
    prompt.placeholder = "";

    let interval1 = setInterval(() => {
      prompt.value += ".";
      if (prompt.value === "....") prompt.value = ""
    }, 300)
    
    let res = await fetch("/chatGPT", {
            method: 'POST', 
                  headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*',
                     'Access-Control-Allow-Headers': 'Authorization,Content-Type ',
                    },
                  body: JSON.stringify({ prompt: promptValue })
                  })
        let answer = await res.json();
        let answerText = answer["answer"];
        clearInterval(interval1);

        prompt.value = "";

        let finalText = promptValue+answerText

        index = 0;

        let interval2 = setInterval(() => {
             if (index < finalText.length) {
              prompt.value += finalText.charAt(index);
              index++
             } else {
              clearInterval(interval2)
             }  
        }, 20)
    })
})
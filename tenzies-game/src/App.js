import React, { useState } from "react"
import Die from "./Components/Die"
import {nanoid} from "nanoid"
import "./style.css"


export default function App() {
    const [dice, setDice] = useState(allNewDice())
   
    function generateNewDie(){
        return {
            value:  Math.ceil(Math.random()*6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice(){
        const newDice = []
        for(let i = 0; i<10; i++){
            newDice.push(generateNewDie())
        }
        return newDice
    }


    function rollDice(){
        setDice(oldDice=>oldDice.map(die=>{
                return die.isHeld ? 
                die : generateNewDie()
            }))
    }

    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
            return die.id == id ? 
            {...die, isHeld: !die.isHeld} :
             die
         }))
    }
    
    const diceElements = dice.map(die=> <Die isHeld={die.isHeld} key={die.id} value={die.value} id={die.id} holdDice={()=>holdDice(die.id)}/>)



  return (
      <main>
         <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
              {diceElements}
          </div>
          <button className="roll-dice" onClick={rollDice}>Roll</button>
      </main>
  )
}
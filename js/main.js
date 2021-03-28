let numbers = (num) => {
    let str = ""
    switch(num){
        case 1: return str = "первый"
        case 2: return str = "второй"
        case 3: return str = "третий"
        case 4: return str = "четвертый"
        case 5: return str = "пятый"
        case 6: return str = "шестой"
        case 7: return str = "седьмой"
        case 8: return str = "восьмой"
        case 9: return str = "девятый"
        case 10: return str = "десятый"
        case 11: return str = "одиннадцатый"
        case 12: return str = "двенадцадый"
        case 13: return str = "тринадцатый"
        case 14: return str = "четырнадцатый"
        case 15: return str = "пятнадцатый"
        case 16: return str = "шестнадцатый"
    }
    return str
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let upIcon = "&#9650;"
let downIcon = 	"&#9660;"

let elevator = {
    currentFloor: 1,
    minFloor: 1,
    maxFloor: 16,
    printFloor(icon = "&#9754;") {
        $("#current-floor__span").html(`${this.currentFloor} ${icon}`)
    },
    async upOneFloor() {
        if (this.currentFloor < this.maxFloor) {
            this.currentFloor++
            this.printFloor(upIcon)
        }
        else {
            this.error()
        }
    },
    downOneFloor() {
        if (this.currentFloor > this.minFloor) {
            this.currentFloor--
            this.printFloor(downIcon)
        }
        else {
            this.error()
        }
    },
    async toFloor(getFloor) {
        this.printFloor
        while (this.currentFloor !== getFloor) {
            if (getFloor > this.currentFloor && getFloor <= this.maxFloor) {
                await sleep(1000)
                this.upOneFloor()
            }
            else if (getFloor < this.currentFloor && getFloor >= this.minFloor) {
                await sleep(1000)
                this.downOneFloor()
            }
            else {
                this.error()
            }
        }
        this.printFloor()
        speak(`${numbers(this.currentFloor)} этаж. Двери открываются`)
    },
    error() {
        speak('Такого этажа не существует')
    }
}

$(".floor-number").on("click", async (e) => {
    let floor = +(e.target.id)
    if(floor === elevator.currentFloor) {
        speak(`Вы находитесь в данном этаже`)
        return
    }
    if(floor > elevator.currentFloor){
        speak(`Двери закрываются. Поднимаемся на ${numbers(floor)} этаж`)
    }
    else if(floor < elevator.currentFloor){
        speak(`Двери закрываются. Спускаемся на ${numbers(floor)} этаж`)
    }
    await sleep(5000)
    elevator.toFloor(floor)
})

// наследуемся от обьекта SpeechSynthesisUtterance()
const message = new SpeechSynthesisUtterance()
console.log(speechSynthesis)
const speak = (text) => {
    message.text = text.trim();
    if (message.text !== "") {
        speechSynthesis.speak(message);
    }
}
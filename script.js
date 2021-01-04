window.onload = function () {
    let dataTask = document.querySelector("#dataTask")
    let dayTask = document.querySelector("#dayTask")
    let timeTask = document.querySelector("#timeTask")
    let sendTask = document.querySelector("#sendTask")
    let resetTask = document.querySelector("#resetTask")
    let form = document.querySelector("form")
    let footer = document.querySelector("footer")
    let alr = document.querySelector("#alr")
    let notes = []
    //The function that will work at the login page:
    checkStorge()
    //Form reset button:
    resetTask.addEventListener("click", function (e) {
        form.reset()
        e.preventDefault()
    })
    dataTask.addEventListener("click", function (e) {
        dataTask.style.backgroundColor="white"
        })
    //If your storage is full of content its displayed on the site
    function checkStorge() {
        if (localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                notes[i] = JSON.parse(localStorage.getItem(i, notes[i]))
            }
            createNoteStyle(notes, 0, localStorage.length)
        }
    }
    //Creating an object from  the input user
    function createNoteData(data, day, time) {
        return {
            data,
            day,
            time
        }
    }
    //copy  new task an object from  the input user to localStorage in JSON format
    function copyToStoreg(notes) {
        for (let i = localStorage.length; i < notes.length; i++) {
            localStorage.setItem(i, JSON.stringify(notes[i]))
            createNoteStyle(notes, i, notes.length)
        }
    }
    //create new notes include Input tests
    //using click event
    sendTask.addEventListener("click", function (e) {
        //for background-color: inherit; to text area fo data task
        dataTask.style.backgroundColor="inherit"
        //Use an array to drop a line if 2 messages are needed...
        let msg = ["", ""]
        if (!dataTask.value || !dataTask.value.replace(/\s/g, '').length) {
            msg[0] = "Task details must be filled out"
        }
        if (!dayTask.value) {
            msg[1] = "deadline must be filled out"
        }
        if (msg[0] != "" || msg[1] != "") {
            let par = document.createElement("p")
            alr.appendChild(par)
            //line drop and show mesege
            par.innerHTML = msg[0] + "<br>" + msg[1]
            alr.style.display = "block"

            let ok = document.createElement("button")
            ok.className = "ok"
            alr.appendChild(ok)
            ok.textContent = "OK"
            e.preventDefault()
            ok.addEventListener("click", function (e) {
                alr.style.display = "none"
                alr.removeChild(par)
            })
            return
        }
        let x = createNoteData(dataTask.value, dayTask.value, timeTask.value)
        notes.push(x)
        e.preventDefault()
        form.reset()
        copyToStoreg(notes)
    })
    //create general function to styles for notes 
    //Function to create a new note or create notes from storage:
    function createNoteStyle(notes, num, mis) {
        for (let i = num; i < mis; i++) {
            //create  note div inside footer
            let newDiv = document.createElement("div")
            newDiv.className = "noteShow"
            footer.appendChild(newDiv)
            // create div area inside note div to text task
            //include get data from local storage
            let dataDiv = document.createElement("div")
            dataDiv.className = "text"
            newDiv.appendChild(dataDiv)
            dataDiv.textContent = JSON.parse(localStorage.getItem(i)).data
            // create div area inside note div to date task
            //include get date from local storage
            let dayDiv = document.createElement("div")
            dayDiv.className = "day"
            newDiv.appendChild(dayDiv)
            let y1 = JSON.parse(localStorage.getItem(i)).day
            //for format dd:mm:yyyy
            let forDate = y1.substring(8, 10) + ":" + y1.substring(5, 7) + ":" + y1.substring(0, 4)
            dayDiv.textContent = forDate
            // create div area inside note div to time task
            //include get date from local storage
            let timeDiv = document.createElement("div")
            timeDiv.className = "time"
            newDiv.appendChild(timeDiv)
            timeDiv.textContent += JSON.parse(localStorage.getItem(i)).time
            // create icon area inside note div to delete noth
            let materialIcon = document.createElement("span")
            materialIcon.className = "material-icons"
            materialIcon.innerText = "cancel"
            newDiv.appendChild(materialIcon)
            //event click on icon to delete note 
            //include delete from local storeg and notes array
            //update array notes and local storage after delete
            materialIcon.addEventListener("click", function (e) {
                footer.removeChild(e.target.parentElement)
                localStorage.removeItem(i)
                notes.splice(i, 1)
                localStorage.clear()
                for (j = 0; j < notes.length; j++) {
                    localStorage.setItem(j, JSON.stringify(notes[j]))
                }
            })
        }
    }
}
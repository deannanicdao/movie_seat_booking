const container = document.querySelector('.container') // only selects the first element match
const seats = document.querySelectorAll('.row .seat:not(.occupied)') // grabs all of them and puts them into a nodes list (array)

const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

populateUI()

let ticketPrice = +movieSelect.value // the + sign changes it into a number type

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

// Update total and count
function updateSelectedCountAndTotal() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    // Copy selected seats into arr
    // Map through array
    // Return new array of indexes

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat))

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    const selectedSeatsCount = selectedSeats.length

    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice

}

// Get data from localstorage and populate UI
function populateUI () {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    
    
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if(selectedMovieIndex !== null) {
        movieSelect.selectIndex = selectedMovieIndex
    }
}

// Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCountAndTotal()
})

//Seat click event
// First check is the hitbox of the seat, make sure it's the correct container
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')

        updateSelectedCountAndTotal()
    }
})

// Initial count and total set
updateSelectedCountAndTotal()
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

// Keep Track Of Current Card
let currentActiveCard = 0;

// Store DOM Card
const cardsEl = [];

// Store Card Data
const cardsData = getCardsData();

// Create All Cards
createCards = () => {
  cardsData.forEach((data, index) => createCard(data, index));
}

// Create A Single Card In The DOM
function createCard(data, index) {
  const card = document.createElement('div');
  card.classList.add('card');

  if(index === 0) {
    card.classList.add('active');
  }

  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${data.question}</p>
      </div>
      <div class="inner-card-back">
        <p>${data.answer}</p>
      </div>
    </div>
  `;

  // Flip Card EventListener
  card.addEventListener('click', () => card.classList.toggle('show-answer'));

  // Add To DOM Cards
  cardsEl.push(card);

  cardsContainer.appendChild(card);

  updateCurrentText();
}

// Show Number Of Cards
function updateCurrentText(){
  currentEl.innerText = `${ currentActiveCard + 1 }/${cardsEl.length}`;
}

// Get Cards From Local Storage
function getCardsData() {
  const cards = JSON.parse(localStorage.getItem('cards'));
  return cards === null ? [] : cards;
}

// Add Card To Local Storage
function setCardsData(cards){
  localStorage.setItem('cards', JSON.stringify(cards));
  window.location.reload();
}

createCards();

// Event Listeners

// Next Button
nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left';

  currentActiveCard = currentActiveCard + 1;

  if(currentActiveCard > cardsEl.length - 1){
    currentActiveCard = cardsEl.length - 1;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Previous Button
prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right';

  currentActiveCard = currentActiveCard - 1;

  if(currentActiveCard < 0){
    currentActiveCard = 0;
  }

  cardsEl[currentActiveCard].className = 'card active';

  updateCurrentText();
});

// Show Add Container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

// Hide Add Container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Add New Card
addCardBtn.addEventListener('click', () => {
  const question = questionEl.value;
  const answer = answerEl.value;

  if(question.trim() && answer.trim()) {
    const newCard = { question, answer };

    createCard(newCard);
    
    questionEl.value = '';
    answerEl.value = '';

    addContainer.classList.remove('show');

    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

// Clear Card Button
clearBtn.addEventListener('click', () => {
  localStorage.clear();
  cardsContainer.innerHTML = '';
  window.location.reload();
})
async function fetchData() {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
  }
  
  function updateTimecards(data, timeframe) {
  const cardsContainer = document.querySelector('.timecards');
    cardsContainer.innerHTML = '';
      data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');
  
      const title = document.createElement('h3');
      title.textContent = item.title;
      card.appendChild(title);
  
      const current = document.createElement('p');
      current.textContent = `Current: ${item.timeframes[timeframe].current} hrs`;
      card.appendChild(current);
  
      const previous = document.createElement('p');
      previous.textContent = `Previous: ${item.timeframes[timeframe].previous} hrs`;
      card.appendChild(previous);

      cardsContainer.appendChild(card);
    });
  }
  
  document.getElementById('dailyBtn').addEventListener('click', async () => {
    const data = await fetchData();
    updateTimecards(data, 'daily');
    setActiveButton('daily');
  });
  
  document.getElementById('weeklyBtn').addEventListener('click', async () => {
    const data = await fetchData();
    updateTimecards(data, 'weekly');
    setActiveButton('weekly');
  });
  
  document.getElementById('monthlyBtn').addEventListener('click', async () => {
    const data = await fetchData();
    updateTimecards(data, 'monthly');
    setActiveButton('monthly');
  });
  
  function setActiveButton(timeframe) {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => button.classList.remove('active'));
    document.getElementById(`${timeframe}Btn`).classList.add('active');
  }

  window.onload = async () => {
    const data = await fetchData();
    updateTimecards(data, 'monthly');
    setActiveButton('monthly');
  };
  
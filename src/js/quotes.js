const quotes = [
  `"Seja um padrão de qualidade. Algumas pessoas não estão acostumadas a um ambiente onde a excelência é esperada." – Steve Jobs`,
  `"Se você está nascendo pobre, não é sua culpa. Mas se você morrer pobre, aí sim é culpa sua." – Bill Gates`,
  `"O maior risco é não correr nenhum risco." – Mark Zuckerberg`,
  `"Fracassar é uma opção aqui. Se as coisas não estão falhando, você não está inovando o suficiente." – Elon Musk`,
  `"As pessoas não sabem o que querem até mostrarmos a elas." – Steve Jobs`,
  `"A persistência é o caminho do êxito." – Charles Chaplin`,
  `"A lógica pode levar de A a B. A imaginação pode te levar a qualquer lugar." – Albert Einstein`,
  `"Meça o que é mensurável e torne mensurável o que não é." – Galileo Galilei`,
  `"A maneira de começar é parar de falar e começar a fazer." – Walt Disney`,
];

// Seleciona o elemento da quote
const quoteElement = document.querySelector(".quote");

if (quoteElement) {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteElement.textContent = randomQuote;
}

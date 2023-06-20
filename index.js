let name = prompt('Как Вас зовут?');
alert(`Здравствуй ${name} !`); 


function multi(){
  let b = document.getElementById('num1').value * document.getElementById('num2').value;
  document.getElementById("ans").innerHTML = b;
}



function Radius() {
    let radius = document.getElementById("rad1").value;
    let answer = 2 * Math.PI * radius;
    document.getElementById("Radius").innerHTML = answer;
}


/* JavaScript код*/
function showOverlay() {
  const overlay = document.getElementById("overlay"); // Получить элемент заставки из HTML разметки
  const date = new Date().toLocaleDateString(); // Получить текущую дату строкой в формате дд.мм.гггг
  const dateElement = document.getElementById("date"); // Получить элемент даты из HTML разметки
  dateElement.innerHTML = date; // Добавить текущую дату в элемент даты
  overlay.style.display = "block"; // Показать заставку
}



    
var span = document.getElementsByClassName("close");
    

span.onclick = function() {
    overlay.style.display = "none";
}
    
window.onclick = function(event) {
    if (event.target == overlay) {
        overlay.style.display = "none";
    }
}
const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Вам многому нужно научиться", 2),
	new Result("Вы уже неплохо разбираетесь", 4),
	new Result("Ваш уровень выше среднего", 6),
	new Result("Вы в совершенстве знаете тему", 10)
];

//Массив с вопросами
const questions = 
[
	new Question("После какого HTML тега нужно вставить JavaScript?", 
	[
		new Answer("js", 0),
		new Answer("scripting", 0),
		new Answer("javascript", 0),
		new Answer("script", 1)
	]),

	new Question("JavaScript и Java это одно и тоже.", 
	[
		new Answer("Да", 0),
		new Answer("Нет", 1)
        
		
	]),

	new Question("В каком разделе можно вставить JavaScript? ", 
	[
		new Answer("head и body", 1),
		new Answer("head", 0),
		new Answer("body", 0)
	]),

	new Question("Внешний JavaScript файл должен содержать script тег?", 
	[
		new Answer(" Нет", 1),
		new Answer("Да", 0),
		new Answer("Палавина на Палавина", 0)
	]),

	new Question("Какой правильный способ использование IF оператора в JavaScript? ", 
	[
		new Answer("if i = 2", 0),
		new Answer("if (i == 2)", 1),
		new Answer("if i = 2 then", 0),
		new Answer(" if i == 2 then", 0)
	]),

	new Question(" Как начать WHILE цикл?", 
	[
		new Answer("while i = 1 to 7", 0),
		new Answer("while (i <= 7; i++)", 0),
		new Answer("while (i <= 7)", 1)

	]),

    new Question("Как начать FOR цикл?", 
	[
		new Answer("for (i = 0; i <= 10)", 0),
		new Answer("for (i <= 10; i++)", 0),
        new Answer("for (i = 0; i <= 10))", 0),
		new Answer("for (i = 0; i <= 10; i++)", 1)

	]),

    new Question("Как округляется число 3.14 до ближайшего целого числа?", 
	[
		new Answer("Math.rnd(3.14)", 0),
		new Answer("round(3.14)", 0),
		new Answer("Math.round(3.14)", 1),
        new Answer("rnd(3.14)", 0)

	]),

    new Question(" Как найти наибольшее из двух чисел?", 
	[
		new Answer("Math.max(x, y)", 1),
		new Answer("Math.ceil(x, y", 0),
		new Answer("top(x, y)", 0),
        new Answer("ceil(x, y)", 0)

	]),

    new Question("Как через JavaScript можем получить имя клиентского браузера?", 
	[
		new Answer("navigator.appName", 1),
		new Answer("browser.name", 0),
		new Answer("client.navName", 0)

	])
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

    setTimeout(Update, 1000);

}
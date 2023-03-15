const formNode = document.querySelector('.form');
const inputData = document.querySelector('.input__data');
const inputTitle = document.querySelector('.input__title');
const inputDescription = document.querySelector('.input__description');

// Слушатель на форме
formNode.addEventListener('submit', (evt) => {
    evt.preventDefault();

    // Массив дат
    const dateArr = [];

    // Задачи сгруппированные по дате
    const taskWrapperNode = document.querySelectorAll('.task__date');
    taskWrapperNode.forEach(el => {
        const outputDate = el.querySelector('.output__date').textContent;
        dateArr.push(outputDate);
    });
    console.log(dateArr);


    // Получает значение из инпута
    const dataValue = inputData.value;
    const dataArr = dataValue.split('-')

    // Приводит дату в формат: 00.00.0000
    let formatDataStr = '';
    const formatDataArr = [];
    for (let i = dataArr.length - 1; i >= 0; i--) {
        formatDataArr.push(dataArr[i])
    }

    formatDataStr += formatDataArr.join('.');

    console.log(formatDataStr);


    // Проверяет есть ли эта дата в списке задач
    const isSimilar = dateArr.includes(formatDataStr); // Возвращает true, если есть совпадение
    const getIndex = dateArr.indexOf(formatDataStr); // Возвращает index совпадащего элемента

    console.log(isSimilar);
    console.log(getIndex);

    if (isSimilar) {
        // Сохраняет в переменную: создание 1 задачи
        const itemNode = createEl();

        // Вставляет задачу в нужную группу
        const outputList = taskWrapperNode[getIndex].querySelector('.task__list');
        console.log(taskWrapperNode[getIndex]);
        outputList.append(itemNode);
    } else {
        const taskWrapper = document.querySelector('.task__wrapper');
        const taskGroup = document.querySelector('.task__date').cloneNode(true);

        console.log(taskGroup);

        // Добавляет дату
        taskGroup.querySelector('.output__date').textContent = `${formatDataStr}`;


        taskWrapper.append(taskGroup);

        // Сохраняет в переменную: создание 1 задачи
        const itemNode = createEl();
        const outputList = taskGroup.querySelector('.task__list');
        const ItemsOfList = outputList.querySelectorAll('.task__item');

        // Удаляет элементы
        ItemsOfList.forEach(el => {
            el.remove();
        });

        // Добавляет группу задач
        taskGroup.append(outputList);

        // Добавляет задачу
        outputList.append(itemNode);
    }
});


// Создает элемент на основе имеющегося
function createEl() {
    // Клонирует элемент
    const itemNode = document.querySelector('.task__item').cloneNode(true);

    // Наполнение элемента
    itemNode.querySelector('.task__item-title').innerText = inputTitle.value;
    itemNode.querySelector('.task__item-text').innerText = inputDescription.value;

    // Очищает инпут 
    inputData.value = '';
    inputTitle.value = '';
    inputDescription.value = '';

    return itemNode;
}


// Удалить задачу
const taskWrapper = document.querySelector('.task__wrapper');

// Слушатель на расписании
taskWrapper.addEventListener('click', (e) => {
    // Очищает выбранные задачи
    const activeItem = document.querySelectorAll('.task__item--current');
    activeItem.forEach(el => {
        console.log(el);
        el.classList.remove('task__item--current');
        el.querySelector('.button__del').remove();
    });

    // Нажатый элемент
    const targetEl = e.target;

    // Добавляет клас для выбранной задачи
    const nearestItem = targetEl.closest('.task__item');
    nearestItem.classList.toggle('task__item--current');

    // // Создает кнопку DEL
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('button__del');

    nearestItem.append(buttonDel);

    // Удаляет задачу
    buttonDel.addEventListener('click', (evt) => {
        evt.stopPropagation();
        nearestItem.remove();

        // Находит группы задач на день
        const outputList = document.querySelectorAll('.task__list');

        // Обходит массив групп
        outputList.forEach((el, id) => {
            // Находит все задачи на день
            const item = outputList[id].querySelectorAll('.task__item').length;

            // Если задач на день нет, то удаляет группу
            if (item === 0) {
                const taskWrapper = el.closest('.task__date');
                taskWrapper.remove();
            }
        })
    });
});


// Кнопка меню
const buttonBurger = document.querySelector('.button__burger');

buttonBurger.addEventListener('click', () => {
    taskWrapper.classList.toggle('task__wrapper--open');

    const isOpen = taskWrapper.classList.contains('task__wrapper--open');

    if (isOpen) {
        buttonBurger.style.zIndex = '2';
    } else {        
        buttonBurger.style.zIndex = '0';
    }
});

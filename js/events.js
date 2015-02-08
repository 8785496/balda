var events = {
    chars: 'абвгдежзийклмнопрстуфхцчшщъыьэюя',
    answers: [],
    bakArr: new Array(25),
    track: [],
    numChar: null,
    scorePlayer: [],
    scoreBot: [],
    result: '',
    error: '',
    newGame: function() {
        for (var i = 0; i < events.bakArr.length; i++)
            events.bakArr[i] = '';
        // удаляем задание пути
        document.getElementById('content').removeEventListener('click', events.setTrack, false);
        events.track = [];
        events.numChar = null;
        events.scorePlayer = [];
        events.scoreBot = [];
        events.getBak();
        events.result = '';
        events.error = '';
        events.change();
        events.start();
    },
    endGame: function() {
        if (events.answers.length >= 21) {
            var nPlayer = 0, nBot = 0;
            for (var i = 0; i < events.scorePlayer.length; i++)
                nPlayer += events.answers[events.scorePlayer[i]].length;
            for (var i = 0; i < events.scoreBot.length; i++)
                nBot += events.answers[events.scoreBot[i]].length;
            if (nPlayer === nBot)
                alert('Ничья');
            else if (nPlayer > nBot)
                alert('Вы победили :)');
            else
                alert('Вы проиграли :(');
            // удаляем событие ход
            document.getElementById('test').removeEventListener('click', events.validate, false);
            return true;
        } else {
            return false;
        }
    },
    change: function() {
        var arrInput = document.querySelectorAll('input');
        for (var k = 0; k < arrInput.length; k++) {
            if (events.track.indexOf(parseInt(arrInput[k].name)) !== -1)
                arrInput[k].classList.add('select');
            else
                arrInput[k].classList.remove('select');
            if (events.numChar !== null && events.numChar === parseInt(arrInput[k].name))
                arrInput[k].classList.add('add');
            else
                arrInput[k].classList.remove('add');
        }
        var str = '', word = '', n = 0;
        for (var i = 0; i < events.scorePlayer.length; i++) {
            word = events.answers[events.scorePlayer[i]];
            str += word + ' (' + word.length + ')<br>';
            n += word.length;
        }
        document.getElementById('player-score').innerHTML = n;
        document.getElementById('player-words').innerHTML = str;

        str = '';
        n = 0;
        for (var i = 0; i < events.scoreBot.length; i++) {
            word = events.answers[events.scoreBot[i]];
            str += word + ' (' + word.length + ')<br>';
            n += word.length;
        }
        document.getElementById('bot-score').innerHTML = n;
        document.getElementById('bot-words').innerHTML = str;
        document.getElementById('result').innerHTML = events.result;
        document.getElementById('error').innerHTML = events.error;
    },
    setBak: function() {
        var arrInput = document.querySelectorAll('input');
        // заполняем массив данными из таблицы
        for (var k = 0; k < arrInput.length; k++)
            events.bakArr[parseInt(arrInput[k].name)] = arrInput[k].value;
    },
    getBak: function() {
        var arrInput = document.querySelectorAll('input');
        for (var k = 0; k < arrInput.length; k++)
            arrInput[k].value = events.bakArr[parseInt(arrInput[k].name)];
    },
    validate: function() {
        if (events.numChar !== null && events.track.indexOf(events.numChar) === -1) {
            events.error = "Слово должно содержать добавленную букву";
            events.track = [];
            events.change();
            return false;
        }
        var result = '';
        for (var i = 0; i < events.track.length; i++)
            result += document.getElementsByName(events.track[i])[0].value;
        if (events.answers.indexOf(result) !== -1) {
            events.error = 'Слово "' + result + '" уже использовано';
            events.track = [];
            events.change();
            return false;
        }
        if (dic.findWord(result)) {
            // вешаем обработчик выбора буквы
            document.getElementById('content').addEventListener('click', events.setChar, false);
            // удаляем задание пути
            document.getElementById('content').removeEventListener('click', events.setTrack, false);
            // удаляем отмена
            document.getElementById('cancel').removeEventListener('click', events.cancel, false);
            events.track = [];
            events.numChar = null;
            // добавляем слово в ответы
            events.answers.push(result);
            events.scorePlayer.push(events.answers.length - 1);
            if (events.endGame())
                return null;
            // ход компьютера
            var answer = finder.iter(events.answers, events.chars);
            document.getElementById('time').innerHTML = answer.time;
            document.getElementsByName(answer.index)[0].value = answer.char;
            events.answers.push(answer.word);
            events.scoreBot.push(events.answers.length - 1);
            events.error = '';
            if (events.answers.length === 21)
                events.endGame();
        } else {
            events.track = [];
            if (events.numChar === null)
                events.error = 'Добавьте букву';
            else if (result.length > 1)
                events.error = 'Слово "' + result + '" не найдено';
            else
                events.error = 'Выберите слово';
        }
        events.change();
    },
    setTrack: function(event) {
        if (event.target.nodeName === 'INPUT') {
            var i = parseInt(event.target.name);
            if (event.target.value !== '')
                if (events.track.indexOf(i) === -1)
                    if (events.track.length > 0) {
                        if ((i < 20 && document.getElementsByName(i + 5)[0].value) ||
                                (i > 5 && document.getElementsByName(i - 5)[0].value) ||
                                (i % 5 < 4 && document.getElementsByName(i + 1)[0].value) ||
                                (i % 5 > 0 && document.getElementsByName(i - 1)[0].value)) {
                            var lastI = events.track[events.track.length - 1];
                            if ((lastI === i + 5) || (lastI === i - 5) || (lastI === i + 1) || (lastI === i - 1))
                                events.track.push(i);
                        }
                    } else {
                        events.track.push(i);
                    }
        }
        var result = '';
        for (var i = 0; i < events.track.length; i++)
            result += document.getElementsByName(events.track[i])[0].value;
        events.change();
        document.getElementById('result').innerHTML = result;
    },
    select: function() {
    },
    setChar: function(event) {
        if (event.target.nodeName === 'INPUT' && event.target.value === '') {
            var kb = document.getElementById('keyboard');
            kb.removeEventListener('click', events.select, false);
            // вешаем обработчик события нажатия кнопки на клавиатуре
            events.select = function(e) {
                if (e.target.nodeName === "BUTTON") {
                    // ячейке таблицы присвоить выбраную букву на клавиатуре
                    event.target.value = e.target.firstChild.nodeValue;
                    // номер выбранной букве в таблице (подсвечивается красным)
                    events.numChar = parseInt(event.target.name);
                    // рендерим
                    events.change();
                    // скрывем клавиатуру
                    document.getElementById('substrate').className = 'hide';
                    document.getElementById('content').removeEventListener('click', events.setChar, false);
                    // вешаем обработчик задания пути
                    document.getElementById('content').addEventListener('click', events.setTrack, false);
                    // удаляем обработчик выбора буквы

                }
            };
            kb.addEventListener('click', events.select, false);
            // вешаем обработчик отмены
            events.setBak();
            document.getElementById('cancel').addEventListener('click', events.cancel, false);
            // показываем клавиатуру
            document.getElementById('substrate').className = 'show';
        }
    },
    cancel: function() {
        events.getBak();
        events.track = [];
        // вешаем обработчик выбора буквы
        document.getElementById('content').addEventListener('click', events.setChar, false);
        // удаляем обработчик задания пути
        document.getElementById('content').removeEventListener('click', events.setTrack, false);
        //document.getElementById('result').innerHTML = '';
        events.result = '';
        events.error = '';
        events.change();
    },
    start: function() {
        events.answers = ['балда'];
        document.getElementsByName('10')[0].value = events.answers[0][0];
        document.getElementsByName('11')[0].value = events.answers[0][1];
        document.getElementsByName('12')[0].value = events.answers[0][2];
        document.getElementsByName('13')[0].value = events.answers[0][3];
        document.getElementsByName('14')[0].value = events.answers[0][4];
        // удаляем событие Старт
        document.getElementById('start').removeEventListener('click', events.start, false);
        // вешаем событие Заново
        document.getElementById('start').firstChild.nodeValue = 'Заново';
        document.getElementById('start').addEventListener('click', events.newGame, false);
        // вешаем обработчик выбора буквы
        document.getElementById('content').addEventListener('click', events.setChar, false);
        // вешаем обработчик проверки слова (Ход)
        document.getElementById('test').addEventListener('click', events.validate, false);
    },
    emulator: function() {
        // ход игрока
        if (!events.endGame()) {
            var answer = finder.iter(events.answers, events.chars);
            document.getElementById('time').innerHTML = answer.time;
            document.getElementsByName(answer.index)[0].value = answer.char;
            events.answers.push(answer.word);
            events.scorePlayer.push(events.answers.length - 1);
            events.change();
        } else {
            return null;
        }
        // ход компьютера
        if (!events.endGame()) {
            var answer = finder.iter(events.answers, events.chars);
            document.getElementById('time').innerHTML = answer.time;
            document.getElementsByName(answer.index)[0].value = answer.char;
            events.answers.push(answer.word);
            events.scoreBot.push(events.answers.length - 1);
            events.change();
            events.endGame();
        } else {
            return null;
        }
    }
};
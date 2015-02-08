(function(exports) {
    var gWord = '';
    var gChar = new Array(2);
    var wordsAnswer = []; // слова уже использованные в ответах
    // рекурсивный поиск путей
    function findTrack(arrData, arrWord, cur, ins) {
        // arrData данные таблицы
        // arrWord координаты пути
        // cur номер текущей ячейки
        // ins номер ячейки с подставленной буквой
        if (arrData[cur] === '') // если текущая ячейка пустая
            return false;
        // проверяем не пересекается ли путь
        if (arrWord.length > 0 && arrWord.indexOf(cur) !== -1)
            return false;
        // добавляем текущую ячейку в путь
        arrWord.push(cur);
        // ищем слова в словаре, начиная с 2 букв
        if (arrWord.length > 1) { 
            var word = '';
            for (var k = 0; k < arrWord.length; k++)
                word += arrData[arrWord[k]];
            if (arrWord.length > gWord.length) // если слова длиннее ранее найденного
                // проверяем содержит ли путь добавленную букву    
                if (arrWord.indexOf(ins) !== -1)
                    if (dic.findWord(word))
                        if (wordsAnswer.indexOf(word) === -1) {
                            gWord = word;
                            gChar[0] = arrData[ins];
                            gChar[1] = ins;
                        }
            // проверяем нужно ли продолжать искать слова
            if (!dic.findPartTest2(word))
                return false;
        }
        // рекурсивный вызов в 4 направлениях
        if (cur < 20)
            findTrack(arrData, arrWord.slice(), cur + 5, ins);
        if (cur > 4)
            findTrack(arrData, arrWord.slice(), cur - 5, ins);
        if (cur % 5 < 4)
            findTrack(arrData, arrWord.slice(), cur + 1, ins);
        if (cur % 5 > 0)
            findTrack(arrData, arrWord.slice(), cur - 1, ins);
    };

    exports.iter = function (words, chars) {
        wordsAnswer = words;
        gWord = '';
        var start = Date.now();
        // получаем массив данных из таблицы
        var arrInput = document.querySelectorAll('input');
        // создаем пустой массив 25 элементов
        var arr = new Array(25);
        // заполняем массив данными из таблицы
        for (var k = 0; k < arrInput.length; k++)
            arr[parseInt(arrInput[k].name)] = arrInput[k].value;
        // цикл подстановок
        for (var i = 0; i < arr.length; i++) {
            // если пустая ячейка имеет смежные непустые ячейки
            if (!arr[i] && ((i < 20 && arr[i + 5]) || (i > 5 && arr[i - 5]) || (i % 5 < 4 && arr[i + 1]) || (i % 5 > 0 && arr[i - 1]))) {
                // подставляем буквы из строки chars
                for (var k = 0; k < chars.length; k++) {
                    var arrTemp = arr.slice();
                    arrTemp[i] = chars[k];
                    // ищем пути
                    for (var j = 0; j < arr.length; j++)
                        // начиная с непустых ячеек    
                        if (arrTemp[j] !== '')
                            findTrack(arrTemp, [], j, i);
                }
            }
        }
        return {
            word: gWord,
            char: gChar[0],
            index: gChar[1]
            , time: (Date.now() - start) / 1000
        };
    };
})(this.finder = {});


(function() {
    // таблица
    var content = document.getElementById('content');
    var k = 0;
    for (var i = 1; i <= 5; i++) {
        var div = document.createElement('div');
        for (var j = 1; j <= 5; j++) {
            var input = document.createElement('input');
            input.setAttribute('readonly', 'readonly');
            input.name = k;
            div.appendChild(input);
            k++;
        }
        content.appendChild(div);
    }
    // кнопки виртуальной клавиатуры
    var kb = document.getElementById('keyboard');
    for (var i = 0; i < events.chars.length; i++) {
        var b = document.createElement('button');
        var t = document.createTextNode(events.chars[i]);
        b.appendChild(t);
        kb.appendChild(b);
        if (i !== 0 && i % 8 === 7)
            kb.appendChild(document.createElement('br'));
    }
    kb.addEventListener('click', events.select, false);
    // вешаем обработчик эмулятроа
    document.getElementById('emulator').addEventListener('click', events.emulator, false);
    // вешаем обработчик начать игру
    document.getElementById('start').addEventListener('click', events.start, false);
}());
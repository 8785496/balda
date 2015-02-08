(function(exports) {
    var chars = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
    var dic_hash = [];
    var dic2_more_hash = [],
            dic3_more_hash = [],
            dic4_more_hash = [],
            dic5_more_hash = [],
            dic6_more_hash = [],
            dic7_more_hash = [],
            dic8_more_hash = [],
            dic9_more_hash = [];
    // хэшируем массивы
    for (var i = 0; i < dictionary.length; i++) {
        var n = 10;
        if (dictionary[i].length <= n) {
            // хэшируем словарь
            if (dictionary[i].length > 1)
                dic_hash.push(str2hash(dictionary[i]));

            // хэшируем ,больше 2 и меньше N букв
            if (dictionary[i].length > 2) {
                var hash = str2hash(dictionary[i].substr(0, 2));
                if (dic2_more_hash[dic2_more_hash.length - 1] !== hash)
                    dic2_more_hash.push(hash);
            }
            // хэшируем ,больше 3 и меньше N букв
            if (dictionary[i].length > 3) {
                var hash = str2hash(dictionary[i].substr(0, 3));
                if (dic3_more_hash[dic3_more_hash.length - 1] !== hash)
                    dic3_more_hash.push(hash);
            }
            // хэшируем ,больше 4 и меньше N букв
            if (dictionary[i].length > 4) {
                var hash = str2hash(dictionary[i].substr(0, 4));
                if (dic4_more_hash[dic4_more_hash.length - 1] !== hash)
                    dic4_more_hash.push(hash);
            }
            // хэшируем ,больше 5 и меньше N букв
            if (dictionary[i].length > 5) {
                var hash = str2hash(dictionary[i].substr(0, 5));
                if (dic5_more_hash[dic5_more_hash.length - 1] !== hash)
                    dic5_more_hash.push(hash);
            }
            // хэшируем ,больше 6 и меньше N букв
            if (dictionary[i].length > 6) {
                var hash = str2hash(dictionary[i].substr(0, 6));
                if (dic6_more_hash[dic6_more_hash.length - 1] !== hash)
                    dic6_more_hash.push(hash);
            }
            // хэшируем ,больше 7 и меньше N букв
            if (dictionary[i].length > 7) {
                var hash = str2hash(dictionary[i].substr(0, 7));
                if (dic7_more_hash[dic7_more_hash.length - 1] !== hash)
                    dic7_more_hash.push(hash);
            }
            // хэшируем ,больше 8 и меньше N букв
            if (dictionary[i].length > 8) {
                var hash = str2hash(dictionary[i].substr(0, 8));
                if (dic8_more_hash[dic8_more_hash.length - 1] !== hash)
                    dic8_more_hash.push(hash);
            }
            // хэшируем ,больше 9 и меньше N букв
            if (dictionary[i].length > 9) {
                var hash = str2hash(dictionary[i].substr(0, 9));
                if (dic9_more_hash[dic9_more_hash.length - 1] !== hash)
                    dic9_more_hash.push(hash);
            }
        }
    }
    // сортируем массивы
    function compareNumbers(a, b) {
        return a - b;
    }
    dic2_more_hash.sort(compareNumbers);
    dic3_more_hash.sort(compareNumbers);
    dic4_more_hash.sort(compareNumbers);
    dic5_more_hash.sort(compareNumbers);
    dic6_more_hash.sort(compareNumbers);
    dic7_more_hash.sort(compareNumbers);
    dic8_more_hash.sort(compareNumbers);
    dic9_more_hash.sort(compareNumbers);
    dic_hash.sort(compareNumbers);

    function findHash(searchKey, hash)
    {
        var lowerBound = 0;
        var upperBound = hash.length - 1;
        var curIn;
        while (true)
        {
            curIn = parseInt((lowerBound + upperBound) / 2);
            if (hash[curIn] === searchKey)
                return true; // Элемент найден
            else if (lowerBound > upperBound)
                return false; // Элемент не найден
            else // Деление диапазона
            {
                if (hash[curIn] < searchKey)
                    lowerBound = curIn + 1; // В верхней половине  
                else
                    upperBound = curIn - 1; // В нижней половине
            }
        }
    }

    function str2hash(str)
    {
        var id = 0;
        var len = str.length;
        for (var i = 0; i < len; i++) {
            var sym = str[len - i - 1];
            id += (chars.indexOf(sym) + 1) * Math.pow(32, i);
        }
        return id;
    }
    // поиск целого слова в словаре
    exports.findWord = function(word) {
        return findHash(str2hash(word), dic_hash);
    };
    // поиск части слова в хешированных массивах
    exports.findPartTest2 = function(req) {
        switch (req.length) {
            case 1:
                return (chars.indexOf(req) === -1) ? false : true;
            case 2:
                return findHash(str2hash(req), dic2_more_hash);
            case 3:
                return findHash(str2hash(req), dic3_more_hash);
            case 4:
                return findHash(str2hash(req), dic4_more_hash);
            case 5:
                return findHash(str2hash(req), dic5_more_hash);
            case 6:
                return findHash(str2hash(req), dic6_more_hash);
            case 7:
                return findHash(str2hash(req), dic7_more_hash);
            case 8:
                return findHash(str2hash(req), dic8_more_hash);
            case 9:
                return findHash(str2hash(req), dic9_more_hash);
            default:
                return false;
        }
    };

}(this.dic = {}));



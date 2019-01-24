function nicknameController()
{
    var config = require('../config');

    // 获取随机昵称
    this.getNickname = function () {
        var name = getAdjective() + getNoun();
        return name;
    }
    
    function getAdjective() {
        var adjectiveList = config.nickname.adjective;
        return adjectiveList[getRandom(adjectiveList.length)];
    }

    function getNoun() {
        var nounList = config.nickname.noun;
        return nounList[getRandom(nounList.length)];
    }

    // 获取 [0, max) 随机整数
    function getRandom(max) {
        return Math.floor(Math.random() * max);
    }
}

module.exports = new nicknameController();
// ==UserScript==
// @name         SteamHelpMarkets
// @description  Allows you to quickly see the subject on Dota2Wiki and Dota2Market
// @namespace    http://tampermonkey.net/
// @version      0.7
// @author       MegaRoks
// @match        *://steamcommunity.com/*/*/inventory/*
// @icon        https://raw.githubusercontent.com/MegaRoks/SteamHelpMarkets/master/favicon.jpg
// @updateURL   https://github.com/MegaRoks/SteamHelpMarkets/raw/master/SteamHelpMarkets.user.js
// @grant        none
// ==/UserScript==

(function() {
    console.log("Старт");
    document.getElementById("iteminfo0_item_name").addEventListener(
        "DOMSubtreeModified",
        function() {
            delete_for_button_green();
            var games = names_gemes();
            console.log(games);
            var val = document.getElementById("iteminfo0_item_name").innerHTML;
            var array_for_name = delete_for_array(val);
            var array_for_href = games[0](array_for_name, games);
            inventory_dota0(array_for_href, games);
            console.log(1);
        }
    );

    document.getElementById("iteminfo1_item_name").addEventListener(
        "DOMSubtreeModified",
        function() {
            delete_for_button_green();
            var games = names_gemes();
            console.log(games);
            var val = document.getElementById("iteminfo1_item_name").innerHTML;
            var array_for_name = delete_for_array(val);
            var array_for_href = games[0](array_for_name, games);
            inventory_dota1(array_for_href, games);
            console.log(2);
        }
    );
})();

function names_gemes(){
    console.log("Определение вкладки");
    var active_tab = document.getElementsByClassName("games_list_tab active")[0];
    var game_name = active_tab.getElementsByClassName("games_list_tab_name")[0].innerHTML;
    console.log(game_name);
    var games = {
        'Counter-Strike: Global Offensive': [add_for_href, "730_2", "https://market.csgo.com/?search="],
        'Team Fortress 2': [add_for_href, "440_2", "https://tf2.tm/?search="],
        'Dota 2': [add_for_href, "570_2", "https://market.dota2.net/?search="],
        'PLAYERUNKNOWN\'S BATTLEGROUNDS': [add_for_href, "578080_2", "https://pubg.tm/?search="],
        'Steam': [add_for_href, "753_6", "https://gifts.tm/?search="],
        'Just Survive': [add_for_href, "295110_1"],
        'H1Z1': [add_for_href, "433850_1"],
        'PAYDAY 2': [add_for_href, "218620_2"],
        'Unturned': [add_for_href, "304930_2"],
        'Rust': [add_for_href, "252490_2"],
        'Killing Floor 2': [add_for_href, "232090_2"],
        'BATTALION 1944': [add_for_href, "489940_2"],
        'Ballistic Overkill': [add_for_href, "296300_2"],
        'Depth': [add_for_href, "274940_2"],
        'Armello': [add_for_href, "290340_2"],
        'Golf With Your Friends': [add_for_href, "431240_2"],
        'Day of Infamy': [add_for_href, "447820_2"],
        'Space Engineers': [add_for_href, "244850_2"],
        'Business Tour': [add_for_href, "397900_2"],
        'Move or Die': [add_for_href, "323850_2"],
        'Euro Truck Simulator 2': [add_for_href, "227300_2"],
        'Golf it!': [add_for_href, "571740_2"],
        'Natural Selection 2': [add_for_href, "4920_2"],
        'SNOW': [add_for_href, "244930_2"],
        'INTERSHELTER': [add_for_href, "520530_2"],
        'CryptoKitties': [add_for_href, "1911_1"]
    };
    return games[game_name];
}

function add_for_href(array_for_name, games){
    console.log("Добавление в ссылку");
    var wiki_href = "https://dota2-ru.gamepedia.com/" + array_for_name[0];
    var market_href = games[2] + array_for_name[1];
    var opskins_href = "https://ru.opskins.com/?loc=shop_search&app=" + games[1] + "&search_item=" + array_for_name[2] + "&sort=lh";
    return [wiki_href, market_href, opskins_href];
}

function delete_for_button_green(){
    console.log("Удаление кнопок");
    var elem = document.getElementsByClassName("button_green");
    if (elem.length > 0) {
        for(var i = 0; i < elem.length; i++){
            elem[i].innerHTML = '';
        }
    }
}

function delete_for_array(val){
    console.log("Удаление пробелов");
    var market = val.replace(/ /g, '%20');
    var csm = market.replace(/\|/g, '%7C');
    var opskins = val.replace(/ /g, '+');
    var cso = opskins.replace(/\|/g, '%7C');
    var quality = ["Ascendant", "Auspicious", "Autographed", "Corrupted", "Elder", "Exalted", "Frozen", "Frozen", "Heroic", "Inscribed", "Inscribed", "Genuine"];
    var word = val.substr(0, val.indexOf(' '));
    if (quality.indexOf(word) !== -1){
        val = val.slice(word.length + 1);
    }
    var wiki = val.replace(/ /g, '_');
    return [wiki, market, opskins, csm, cso];
}

function inventory_dota0(array_for_href, games){
    console.log(3);
    console.log(games);
    var id_games_for_market = ["730_2", "440_2", "570_2", "578080_2", "753_6"];
    var iteminfo0 = document.getElementById('iteminfo0_item_tags');
    if(games[1] === "570_2"){
        iteminfo0.insertAdjacentHTML('afterend', `
            <a class="item_market_action_button item_market_action_button_green button_green" href="${array_for_href[0]}" target="_blank" id="quicksellbtn" style="margin-right: 12px; margin-bottom: 8px;">
                <span class="item_market_action_button_edge item_market_action_button_left"></span>
            <span class="item_market_action_button_contents">Wiki</span>
                <span class="item_market_action_button_edge item_market_action_button_right"></span>
                <span class="item_market_action_button_preload"></span>
            </a>`);
    }
    id_games_for_market.some(q => {
        if (games[1].startsWith(q)) {
            iteminfo0.insertAdjacentHTML('afterend', `
                <a class="item_market_action_button item_market_action_button_green button_green" href="${array_for_href[1]}" target="_blank" id="quicksellbtn" style="margin-right: 12px; margin-bottom: 8px;">
                    <span class="item_market_action_button_edge item_market_action_button_left"></span>
                    <span class="item_market_action_button_contents">Market</span>
                    <span class="item_market_action_button_edge item_market_action_button_right"></span>
                    <span class="item_market_action_button_preload"></span>
                </a>
            `);
        }
    });
    iteminfo0.insertAdjacentHTML('afterend', `
        <a class="item_market_action_button item_market_action_button_green button_green" href="${array_for_href[2]}&sort=lh" target="_blank" id="quicksellbtn" style="margin-right: 12px; margin-bottom: 8px;">
            <span class="item_market_action_button_edge item_market_action_button_left"></span>
            <span class="item_market_action_button_contents">Opskins</span>
            <span class="item_market_action_button_edge item_market_action_button_right"></span>
            <span class="item_market_action_button_preload"></span>
        </a>
    `);
}

function inventory_dota1(array_for_href, games){
    console.log(4);
    console.log(games);
    var id_games_for_market = ["730_2", "440_2", "570_2", "578080_2", "753_6"];
    var iteminfo1 = document.getElementById('iteminfo1_item_tags');
    if(games[1] === "570_2"){
        iteminfo1.insertAdjacentHTML('afterend', `
            <a class="item_market_action_button item_market_action_button_green button_green" href="${array_for_href[0]}" target="_blank" id="quicksellbtn" style="margin-right: 12px; margin-bottom: 8px;">
                <span class="item_market_action_button_edge item_market_action_button_left"></span>
            <span class="item_market_action_button_contents">Wiki</span>
                <span class="item_market_action_button_edge item_market_action_button_right"></span>
                <span class="item_market_action_button_preload"></span>
            </a>`);
    }
    id_games_for_market.some(q => {
        if (games[1].startsWith(q)) {
            iteminfo1.insertAdjacentHTML('afterend', `
                <a class="item_market_action_button item_market_action_button_green button_green" href="${array_for_href[1]}" target="_blank" id="quicksellbtn" style="margin-right: 12px; margin-bottom: 8px;">
                    <span class="item_market_action_button_edge item_market_action_button_left"></span>
                    <span class="item_market_action_button_contents">Market</span>
                    <span class="item_market_action_button_edge item_market_action_button_right"></span>
                    <span class="item_market_action_button_preload"></span>
                </a>
            `);
        }
    });
    iteminfo1.insertAdjacentHTML('afterend', `
        <a class="item_market_action_button item_market_action_button_green button_green" href="${array_for_href[2]}&sort=lh" target="_blank" id="quicksellbtn" style="margin-right: 12px; margin-bottom: 8px;">
            <span class="item_market_action_button_edge item_market_action_button_left"></span>
            <span class="item_market_action_button_contents">Opskins</span>
            <span class="item_market_action_button_edge item_market_action_button_right"></span>
            <span class="item_market_action_button_preload"></span>
        </a>
    `);
}
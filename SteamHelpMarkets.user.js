// ==UserScript==
// @name         SteamHelpMarkets
// @description  Allows you to quickly see the subject on Dota2Wiki and Dota2Market
// @namespace    http://tampermonkey.net/
// @version      0.6
// @author       MegaRoks
// @match        *://steamcommunity.com/*/*/inventory/*
// @icon        https://raw.githubusercontent.com/MegaRoks/SteamHelpMarkets/master/favicon.jpg
// @updateURL   https://github.com/MegaRoks/SteamHelpMarkets/raw/master/SteamHelpMarkets.user.js
// @grant        none
// ==/UserScript==

(function() {
    document.getElementById("iteminfo0_item_name").addEventListener(
        "DOMSubtreeModified",
        function() {
            delete_for_button_green();
            var active_tab = document.getElementsByClassName("games_list_tab active")[0];
            var game_name = active_tab.getElementsByClassName("games_list_tab_name")[0].innerHTML;
            if(game_name === 'Dota 2'){
                var val = document.getElementById("iteminfo0_item_name").innerHTML;
                var dfa = delete_for_array(val);
                inventory_dota0(dfa);
            }
            if(game_name === 'Counter-Strike: Global Offensive'){
                var val = document.getElementById("iteminfo0_item_name").innerHTML;
                var dfa = delete_for_array(val);
                inventory_csgo0(dfa);
            }
            if(game_name === 'PLAYERUNKNOWN\'S BATTLEGROUNDS'){
                var val = document.getElementById("iteminfo0_item_name").innerHTML;
                var dfa = delete_for_array(val);
                inventory_pubg0(dfa);
            }
        }
    );

    document.getElementById("iteminfo1_item_name").addEventListener(
        "DOMSubtreeModified",
        function() {
            delete_for_button_green();
            var active_tab = document.getElementsByClassName("games_list_tab active")[0];
            var game_name = active_tab.getElementsByClassName("games_list_tab_name")[0].innerHTML;
            if(game_name === 'Dota 2'){
                var val = document.getElementById("iteminfo1_item_name").innerHTML;
                var dfa = delete_for_array(val);
                inventory_dota1(dfa);
            }
            if(game_name === 'Counter-Strike: Global Offensive'){
                var val = document.getElementById("iteminfo1_item_name").innerHTML;
                var dfa = delete_for_array(val);
                inventory_csgo1(dfa);
            }
            if(game_name === 'PLAYERUNKNOWN\'S BATTLEGROUNDS'){
                var val = document.getElementById("iteminfo1_item_name").innerHTML;
                var dfa = delete_for_array(val);
                inventory_pubg1(dfa);
            }
        }
    );
})();

function delete_for_button_green(){
    var elem = document.getElementsByClassName("button_green");
    if (elem.length > 0) {
        for(var i = 0; i < elem.length; i++){
            elem[i].innerHTML = '';
        }
    }
}

function delete_for_array(val){
    var d2m = val.replace(/ /g, '%20');
    var csm = d2m.replace(/\|/g, '%7C');
    console.log(d2m);
    var d2o = val.replace(/ /g, '+');
    var cso = d2o.replace(/\|/g, '%7C');
    console.log(cso);
    var quality = ["Ascendant", "Auspicious", "Autographed", "Corrupted", "Elder", "Exalted", "Frozen", "Frozen", "Heroic", "Inscribed", "Inscribed", "Genuine"];
    var word = val.substr(0, val.indexOf(' '));
    if (quality.indexOf(word) !== -1){
        val = val.slice(word.length + 1);
    }
    var d2w = val.replace(/ /g, '_');
    return [d2w, d2m, d2o, csm, cso];
}

function inventory_dota0(dfa){
    var d0 = document.getElementById('iteminfo0_item_tags');
    d0.insertAdjacentHTML('afterend', `
        <a class="item_market_action_button item_market_action_button_green button_green" href="https://dota2-ru.gamepedia.com/${dfa[0]}" target="_blank" id="quicksellbtn" style="margin-right: 12px; margin-bottom: 8px;">
            <span class="item_market_action_button_edge item_market_action_button_left"></span>
            <span class="item_market_action_button_contents">Dota2Wiki</span>
            <span class="item_market_action_button_edge item_market_action_button_right"></span>
            <span class="item_market_action_button_preload"></span>
        </a>
        <a class="item_market_action_button item_market_action_button_green button_green" href="https://market.dota2.net/?search=${dfa[1]}" target="_blank" id="quicksellbtn" style="margin-right: 12px; margin-bottom: 8px;">
            <span class="item_market_action_button_edge item_market_action_button_left"></span>
            <span class="item_market_action_button_contents">Dota2Market</span>
            <span class="item_market_action_button_edge item_market_action_button_right"></span>
            <span class="item_market_action_button_preload"></span>
        </a>
        <a class="item_market_action_button item_market_action_button_green button_green" href="https://ru.opskins.com/?loc=shop_search&app=570_2&search_item=${dfa[2]}&sort=lh" target="_blank" id="quicksellbtn" style="margin-right: 12px; margin-bottom: 8px;">
            <span class="item_market_action_button_edge item_market_action_button_left"></span>
            <span class="item_market_action_button_contents">Dota2Opskins</span>
            <span class="item_market_action_button_edge item_market_action_button_right"></span>
            <span class="item_market_action_button_preload"></span>
        </a>
    `);
}

function inventory_dota1(dfa){
    var d1 = document.getElementById('iteminfo1_item_tags');
    d1.insertAdjacentHTML('afterend', `
        <a class="item_market_action_button item_market_action_button_green button_green" href="https://dota2-ru.gamepedia.com/${dfa[0]}" target="_blank" id="quicksellbtn" style="margin-right: 12px; margin-bottom: 8px;">
            <span class="item_market_action_button_edge item_market_action_button_left button_green"></span>
            <span class="item_market_action_button_contents button_green">Dota2Wiki</span>
            <span class="item_market_action_button_edge item_market_action_button_right button_green"></span>
            <span class="item_market_action_button_preload button_green"></span>
        </a>
        <a class="item_market_action_button item_market_action_button_green button_green" href="https://market.dota2.net/?search=${dfa[1]}" target="_blank" id="quicksellbtn" style="margin-right: 12px; margin-bottom: 8px;">
            <span class="item_market_action_button_edge item_market_action_button_left button_green"></span>
            <span class="item_market_action_button_contents button_green">Dota2Market</span>
            <span class="item_market_action_button_edge item_market_action_button_right button_green"></span>
            <span class="item_market_action_button_preload button_green"></span>
        </a>
        <a class="item_market_action_button item_market_action_button_green button_green" href="https://ru.opskins.com/?loc=shop_search&app=570_2&search_item=${dfa[2]}&sort=lh" target="_blank" id="quicksellbtn" style="margin-right: 12px; margin-bottom: 8px;">
            <span class="item_market_action_button_edge item_market_action_button_left"></span>
            <span class="item_market_action_button_contents">Dota2Opskins</span>
            <span class="item_market_action_button_edge item_market_action_button_right"></span>
            <span class="item_market_action_button_preload"></span>
        </a>
    `);
}

function inventory_csgo0(dfa){
    var d0 = document.getElementById('iteminfo0_item_tags');
    d0.insertAdjacentHTML('afterend', `
        <a class="item_market_action_button item_market_action_button_green button_green" href="https://market.csgo.com/?search=${dfa[3]}" target="_blank" id="quicksellbtn" style="margin-right: 12px; margin-bottom: 8px;">
            <span class="item_market_action_button_edge item_market_action_button_left"></span>
            <span class="item_market_action_button_contents">CSGOMarket</span>
            <span class="item_market_action_button_edge item_market_action_button_right"></span>
            <span class="item_market_action_button_preload"></span>
        </a>
    `);
}

function inventory_csgo1(dfa){
    var d0 = document.getElementById('iteminfo1_item_tags');
    d0.insertAdjacentHTML('afterend', `
        <a class="item_market_action_button item_market_action_button_green button_green" href="https://market.csgo.com/?search=${dfa[3]}" target="_blank" id="quicksellbtn" style="margin-right: 12px; margin-bottom: 8px;">
            <span class="item_market_action_button_edge item_market_action_button_left"></span>
            <span class="item_market_action_button_contents">CSGOMarket</span>
            <span class="item_market_action_button_edge item_market_action_button_right"></span>
            <span class="item_market_action_button_preload"></span>
        </a>
    `);
}

function inventory_pubg0(dfa){
    var d0 = document.getElementById('iteminfo0_item_tags');
    d0.insertAdjacentHTML('afterend', `
        <a class="item_market_action_button item_market_action_button_green button_green" href="https://pubg.tm/?search=${dfa[1]}" target="_blank" id="quicksellbtn" style="margin-right: 12px; margin-bottom: 8px;">
            <span class="item_market_action_button_edge item_market_action_button_left"></span>
            <span class="item_market_action_button_contents">PUBGMarket</span>
            <span class="item_market_action_button_edge item_market_action_button_right"></span>
            <span class="item_market_action_button_preload"></span>
        </a>
        <a class="item_market_action_button item_market_action_button_green button_green" href="https://ru.opskins.com/?loc=shop_search&app=578080_2&search_item=${dfa[2]}&sort=lh" target="_blank" id="quicksellbtn" style="margin-right: 12px; margin-bottom: 8px;">
            <span class="item_market_action_button_edge item_market_action_button_left"></span>
            <span class="item_market_action_button_contents">PUBGOpskins</span>
            <span class="item_market_action_button_edge item_market_action_button_right"></span>
            <span class="item_market_action_button_preload"></span>
        </a>
    `);
}

function inventory_pubg1(dfa){
    var d1 = document.getElementById('iteminfo1_item_tags');
    d1.insertAdjacentHTML('afterend', `
        <a class="item_market_action_button item_market_action_button_green button_green" href="https://pubg.tm/?search=${dfa[1]}" target="_blank" id="quicksellbtn" style="margin-right: 12px; margin-bottom: 8px;">
            <span class="item_market_action_button_edge item_market_action_button_left button_green"></span>
            <span class="item_market_action_button_contents button_green">PUBGMarket</span>
            <span class="item_market_action_button_edge item_market_action_button_right button_green"></span>
            <span class="item_market_action_button_preload button_green"></span>
        </a>
        <a class="item_market_action_button item_market_action_button_green button_green" href="https://ru.opskins.com/?loc=shop_search&app=578080_2&search_item=${dfa[2]}&sort=lh" target="_blank" id="quicksellbtn" style="margin-right: 12px; margin-bottom: 8px;">
            <span class="item_market_action_button_edge item_market_action_button_left"></span>
            <span class="item_market_action_button_contents">PUBGOpskins</span>
            <span class="item_market_action_button_edge item_market_action_button_right"></span>
            <span class="item_market_action_button_preload"></span>
        </a>
    `);
}
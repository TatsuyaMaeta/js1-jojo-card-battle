


let card_select = document.querySelector('#omikuji');
let bmp = document.querySelector("#echo");
let result_wrapper = document.querySelector('#result_wrapper');

// 承太郎チームの味方のバトルカード選択の時に機能
function display_cards(){
    var col1 = document.querySelector("#list1");

    col1.outerHTML=`<div class="cards">
                        <img id="1-5" src="img/mikata-card/hermit.png" alt="ジョセフ・ジョースター" onclick="after_selected(this.alt)">
                        <div class="card-name mask">
                            <div class="caption">ジョセフ・ジョースター<br><div class="stand-name"> スタンド名：ハーミットパープル</div></div>
                        </div>   
                    </div>


                    <div class="cards">
                        <img id="1-1" src="img/mikata-card/chariot.png" alt="ジャン・P・ポルナレフ" onclick="call_se2(this.alt);after_selected(this.alt);">
                        <audio src="se/se_stop_time.mp3" id="p_voice" preload="auto"></audio>
                        <div class="card-name mask">
                            <div class="caption">ジャン・P・ポルナレフ<br><div class="stand-name"> スタンド名：シルバーチャリオッツ</div></div>
                        </div>
                    </div>

                    <div class="cards">
                        <img id="1_2" src="img/mikata-card/star.jpg" alt="空条 承太郎" onclick="call_se3(this.alt);after_selected(this.alt);">
                        <audio src="se/se_oraoraora.mp3" id="jtr_voice" preload="auto"></audio>
                        <div class="card-name mask">
                            <div class="caption">空条 承太郎<br><div class="stand-name"> スタンド名：スタープラチナ</div></div>
                        </div>
                    </div>

                    <div class="cards">
                        <img id="1-3" src="img/mikata-card/hierofant.png" alt="花京院 典明" onclick="after_selected(this.alt)">                        
                        <div class="card-name mask">
                            <div class="caption">花京院 典明<br><div class="stand-name"> スタンド名：ハイエロファントグリーン</div></div>
                        </div>
                    </div>

                    <div class="cards">
                        <img id="1-4" src="img/mikata-card/magician.png" alt="モハメド・アヴゥドゥル" onclick="after_selected(this.alt)">
                        <div class="card-name mask">
                            <div class="caption">モハメド・アヴゥドゥル<br><div class="stand-name"> スタンド名：マジシャンズレッド</div></div>
                        </div>                    
                    </div>

                    <div class="cards">
                        <img id="1-6" src="img/mikata-card/fool.png" alt="イギー" onclick="after_selected(this.alt)">
                        <div class="card-name mask">
                            <div class="caption">イギー<br><div class="stand-name"> スタンド名：ザ・フール</div></div>
                        </div>   
                    </div>`; 

    card_select.outerHTML=`<div class="nodata"></div>`;
}



// 各カードを選択（クリック）した時に機能
function after_selected(alt_value) {
    // imgタグのaltに入っているキャラクター名が引数で渡ってくる
    console.log("alt_value :" + alt_value);

    // HTML内にdioのカードが選択されて表示されているかを識別
    let spacial_event = document.querySelector('#dio_text');
    
    if (spacial_event !== null) {
        console.log("spacial_event: " + spacial_event.id);

        if (spacial_event.id == "dio_text" && alt_value == "ジャン・P・ポルナレフ" ) {
            
            console.log("途中までok");
        }
    }
    
    var card_choice = confirm(`この${alt_value}のカードでよろしいですか？`);
    console.log(card_choice);

    const jojo_team = {
        0: 'ジョセフ・ジョースター',
        1: 'ジャン・P・ポルナレフ',
        2: '空条 承太郎',
        3: 'モハメド・アヴゥドゥル',
        4: '花京院 典明',
        5: 'イギー',
    };

    // console.log("alt_valueのconsole.logは" + alt_value);

    // 連想配列バリューから選択したカードを判定して割り当てた数字を拾う
    let result = null;
    const keys = Object.keys(jojo_team);
    for (let i = 0; i < keys.length; i++) {

        // 選択したカードの人物名が連想配列のバリューと一緒ならば
        if (jojo_team[keys[i]] === alt_value) {
            result = keys[i];
            break;
        }
    }


    // カードが選択されていたらバトルを始める
    if (card_choice) {
        console.log("result:"+result); //key3
        // 111行目のファンクション
        battle_start(result)
    }
} 

function battle_start(mikata_card) {
    console.log("mikata_card(result):" + mikata_card);

    const insert_img_1 =`<div class="teki_detail_wrapper">
                            <div class="teki_img_wrapper"><img src="img/teki-card/`;
    // 1と2の間に画像の名前(拡張子含む)を入れる。配列の1つ目 ex. dio_team[i][1]
    const insert_img_3 =`" alt="`;
    // 2と3の間にカードの名前を入れる。配列の２つ目 ex. dio_team[i][2]
    let insert_img_5 =`" srcset=""></div>
                            <div class="mask1"></div>
                            <div class="mask2"></div>
                            <div class="caption">
                                <p>`;
    // 2と3の間にカードの名前を入れる。配列の２つ目 ex. dio_team[i][2]
    let insert_img_7 =`</p>
                            </div>
                        </div>`;

    // 8行*19個 150行を23行に圧縮
    // ディオチームの敵カード
    const dio_team = [
        [0 , `tower.png`,`グレーフライ`],
        [1 , `moon.png`,`偽船長`],
        [2 , `strength.png`,`フォーエバー`],
        [3 , `devil.png`,`呪いのデーボ`],
        [4 , `temperance.png`,`ラバーソウル`],
        [5 , `emperor.png`,`ホル・ホース` ],
        [6 , `hanged_man.png`,`J・ガイル` ],
        [7 , `empress.png`,`ネーナ` ],
        [8 , `wheel.png`,`ズィー・ズィー` ],
        [9 , `justice.png`,`エンヤ婆`],
        [10, `sun.png`,`アラビア・ファッツ`],
        [11, `death.png`,`マニッシュ・ボーイ` ],
        [12, `judgement.png`,`カメオ` ],
        [13, `lovers.png`,`スティーリー・ダン`],
        [14, `highp.png`,`ミドラー` ],
        [15, `geb.png`,`ンドゥール` ],
        [16, `horus.png`,`ペットショップ`],
        [17, `osiris.png`,`D・ダービー`],
        [18, `atum.png`,`T・ダービー` ],
        [19, `world.png`,`ＤＩＯ`]
    ];


    // 敵のカードをランダムに選ぶ
    const teki_card = Math.floor(Math.random()*(dio_team.length));
    console.log("teki_cardは" + teki_card );

    let result2 = null;
    const keys = Object.keys(dio_team);

    // 敵カードと２次元配列の１つ目が同じ場合に画像のouterHTMLをHTMLに記述する
    for (let i = 0; i < dio_team.length; i++) {
        if (dio_team[i][0] == teki_card) {
            
            // カードがディオだった場合htmlを書き換え
            if (teki_card == "19") {
                insert_img_5=`" srcset=""></div>
                                <div class="mask1"></div>
                                <div class="mask2"></div>
                                <div class="caption" onclick="call_se();" id="dio_text">
                                    <p>`;
                
                insert_img_7=`</p>
                                <audio src="se/se_roadroaler.mp3" id="dio_voice" preload="auto"></audio>
                            </div>
                        </div>`;
            }

            result2 =   insert_img_1 + dio_team[i][1] 
                        + insert_img_3 + dio_team[i][2] 
                        + insert_img_5 + dio_team[i][2] + insert_img_7;

            console.log("dio_team[i][0]: " + dio_team[i][0]);

            break;
        }
    }

    // HTMLの方に画像を表示させる
    bmp.innerHTML=result2;


// bmp.outerHTML=
    kekka_hyoji(mikata_card,teki_card)


};


// 結果の表示
function kekka_hyoji(mikata_num,teki_num) {
    console.log("mikata_num + teki_num:" + mikata_num  + " / "+ teki_num);

// １：ジョセフ・ジョースター
// ２：ポルナレフ
// ３：承太郎
// ４：花京院
// ５：アブドゥル
// ６：イギー

// 勝ち：０
// 引き分け又は不明：１
// 負け、勝てなかった：２

   //0
   //1 
   //2
   //3
   //4
   //5 | 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19
    const WinLoseTable=[
        [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 0, 2],
        [1, 1, 1, 0, 1, 0, 0, 1, 1, 2, 1, 2, 2, 1, 1, 1, 1, 2, 1, 2],
        [2, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 2, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 2, 0, 1, 0, 1, 2, 1, 1, 2, 2],
        [1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 0, 1, 1, 2, 1, 1, 1, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 2],
    ];

    console.log("WinLoseTable[0][20]: "+ WinLoseTable[mikata_num][teki_num]);
    
    let result_message =[
        "W i n !",
        "To Be Continue...",
        "L o s e"
    ]

    let kekka_a = `<div id="battle-result" class="animate-callback">
                        <div class="result-mask">
                            <div class="result-caption">`;

    let kekka_b = result_message[WinLoseTable[mikata_num][teki_num]];

    let kekka_c = `</div>
                        </div>
                    </div>`;

    console.log("kekka_b : " + kekka_b);

    result_wrapper.innerHTML = kekka_a + kekka_b + kekka_c;

    if (result_message[WinLoseTable[mikata_num][teki_num]] == 1) {
        $("#battle-result").css("fontSize","60px");
    }

    $("#battle-result").css("display","block");
    $("#battle-result").fadeIn();
    // $("#echo").css("paddingTop","100px");
    $("#battle-result").fadeOut(6000);
    // $("#echo").css("paddingTop","90px");
    // $("#echo").css("marginTop","70px");
    // result_wrapper.innerHTML ="";



}




// ディオの音声をクリックイベントで流す
function call_se() {
    // document.getElementById('AnimalCry').play();
    document.querySelector('#dio_voice').play();
}

// ディオのカードが表示中にポルナレフのカードからサウンドオン
function call_se2() {
    let spacial_event = document.querySelector('#dio_text');
    console.log("spacial_event: " + spacial_event );

    // クエリーセレクターで id="dio_text"を検出できた場合のみ発動
    if (spacial_event !== null) {
        document.querySelector('#p_voice').play();
    }
}

// ディオのカードが表示中に承太郎のカードからサウンドオン
function call_se3() {
    // console.log("call_func: " + this.alt);
    let spacial_event = document.querySelector('#dio_text');

    // クエリーセレクターで id="dio_text"を検出できた場合のみ発動
    if (spacial_event !== null) {
        document.querySelector('#jtr_voice').play();
    }
}










'use strict'

//各要素を取得
const textNode = document.getElementById('text');
const btn = document.getElementById('btn');
const table = document.getElementById('table');
//カウント用の変数を宣言
let count = 0

//ボタンを押したときにイベントを発動
btn.addEventListener('click', function (e) {
  //ページ遷移を注視するためのイベント
  e.preventDefault();

  //Nodeからテキストの値を取得
  const text = textNode.value;

  //値が入ってるかどうか
  if (text) {
    count++;

    //trタグとtdタグをそれぞれ作成
    const tr = document.createElement('tr');
    const tdID = document.createElement('td');
    const tdComment = document.createElement('td');
    const tdFinished = document.createElement('td');
    const tdFinished2 = document.createElement('td');

    //ボタン用のテキストを作成
    const status1 = '作業中';
    const status2 = '削除';

    //各タグに必要なテキストまたはクラス名を追加
    tdID.textContent = count;
    tdComment.textContent = text;
    tdFinished.textContent = status1;
    tdFinished2.textContent = status2;
    tdFinished.classList.add('btn');
    tdFinished2.classList.add('btn');

    //trの各子要素を追加する関数
    function addTd(td) {
      tr.appendChild(td);
    }

    addTd(tdID);
    addTd(tdComment);
    addTd(tdFinished);
    addTd(tdFinished2);


    //tableタグ内,trの末尾に宣言したtr要素を追加
    table.insertBefore(tr, null);
  }
})

